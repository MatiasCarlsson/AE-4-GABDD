# %% [markdown]
# # Proceso etl del trabajo integrador ae4
# Ingestión, limpieza, transformación, merge, validaciones y carga al data warehouse en postgresql.

# %%
from pathlib import Path

import pandas as pd
from sqlalchemy import create_engine, text

from comun import leer_fastfood_csv

# Rutas del proyecto (funciona tanto desde la raíz como desde la carpeta etl)
BASE_DIR = Path.cwd().parent if Path.cwd().name == "etl" else Path.cwd()
DIR_ORIGINALES = BASE_DIR / "datos" / "originales"
DIR_PROCESADOS = BASE_DIR / "datos" / "procesados"
DIR_PROCESADOS.mkdir(parents=True, exist_ok=True)

DB_URL = "postgresql+psycopg2://postgres:postgres@localhost:5432/dw_fastfood"

# %% [markdown]
# ## 1. Ingestión de cada fuente por separado
# - **Fuente 1 (real y externa):** catálogo de 10.000 sucursales de comida rápida en estados unidos.
# - **Fuente 2 (construida por el grupo):** cierres trimestrales de operaciones por sucursal entre 2023 y 2024.

# %%
suc_raw, filas_reparadas = leer_fastfood_csv(DIR_ORIGINALES / "FastFoodRestaurants.csv")
ope_raw = pd.read_csv(DIR_ORIGINALES / "operaciones_franquicias_2023_2024.csv")

print(f"Fuente 1 (sucursales): {len(suc_raw)} filas, {suc_raw.shape[1]} columnas")
print(f"Filas reparadas por comas dentro de la dirección: {filas_reparadas}")
print(f"Fuente 2 (operaciones): {len(ope_raw)} filas, {ope_raw.shape[1]} columnas")

# %% [markdown]
# ## 2. Limpieza de la fuente 1 (sucursales)
# Se filtran coordenadas fuera de estados unidos, se unifican nombres de cadenas, se corrigen estados y se quitan duplicados.

# %%
suc = suc_raw.replace("", pd.NA)
print(f"Nulos iniciales en fuente 1: {int(suc.isna().sum().sum())}")

# Coordenadas: se convierten a número y se descartan las que caen fuera de estados unidos
suc["latitude"] = pd.to_numeric(suc["latitude"], errors="coerce")
suc["longitude"] = pd.to_numeric(suc["longitude"], errors="coerce")
dentro_de_eeuu = suc["latitude"].between(18, 72) & suc["longitude"].between(-170, -65)
print(f"Sucursales fuera de estados unidos eliminadas: {(~dentro_de_eeuu).sum()}")
suc = suc[dentro_de_eeuu].copy()

# Nombres de cadena: si coinciden sin mayúsculas ni signos, se unifican con la forma más frecuente
suc["name"] = suc["name"].str.strip()
clave_cadena = suc["name"].str.lower().str.replace(r"[^a-z0-9]", "", regex=True)
nombre_mas_frecuente = suc.groupby(clave_cadena)["name"].agg(lambda s: s.mode()[0])
cadenas_antes = suc["name"].nunique()
suc["name"] = clave_cadena.map(nombre_mas_frecuente)
print(f"Cadenas únicas: {cadenas_antes} antes, {suc['name'].nunique()} después de unificar")

# Normalización de textos y códigos postales de 5 dígitos
suc["province"] = suc["province"].str.strip().str.upper().replace({"CO SPGS": "CO"})
suc["city"] = suc["city"].str.strip().str.title()
suc["postalCode"] = suc["postalCode"].str.strip().str[:5].str.zfill(5)
suc["keys"] = suc["keys"].str.strip().str.lower()

# Eliminación de duplicados por clave de sucursal
print(f"Sucursales duplicadas eliminadas: {suc.duplicated('keys').sum()}")
suc = suc.drop_duplicates("keys").reset_index(drop=True)
print(f"Fuente 1 limpia: {len(suc)} sucursales, {int(suc.isna().sum().sum())} nulos")

# %% [markdown]
# ## 3. Limpieza de la fuente 2 (operaciones)
# Se eliminan duplicados y montos negativos, se normalizan textos y se completan los valores nulos.

# %%
ope = ope_raw.copy()
print(f"Nulos iniciales en fuente 2: {int(ope.isna().sum().sum())}")

# Eliminación de filas duplicadas exactas
print(f"Filas duplicadas eliminadas: {ope.duplicated().sum()}")
ope = ope.drop_duplicates()

# Normalización de textos en categoría, región, estado y clave de sucursal
CATEGORIAS = ["Burgers & Grill", "Tex-Mex", "Pizza & Italian", "Chicken & Wings", "Sandwiches & Subs",
              "Coffee, Bakery & Ice Cream", "Asian & Seafood", "Otros / Regional"]
ope["categoria_comida"] = ope["categoria_comida"].str.strip().str.lower().map({c.lower(): c for c in CATEGORIAS})
ope["region_eeuu"] = ope["region_eeuu"].str.strip().str.title()
ope["estado_codigo"] = ope["estado_codigo"].str.strip().str.upper()
ope["sucursal_key"] = ope["sucursal_key"].str.strip().str.lower()

# Descarte de valores atípicos con ventas u órdenes menores o iguales a cero
validas = (ope["ventas_usd"] > 0) & (ope["cantidad_ordenes"] > 0)
print(f"Operaciones con ventas u órdenes menores o iguales a cero eliminadas: {(~validas).sum()}")
ope = ope[validas].copy()

# Imputación de nulos en segmento de precio usando el valor de la misma sucursal
print(f"Nulos completados en segmento de precio: {ope['segmento_precio'].isna().sum()}")
segmento_sucursal = ope.groupby("sucursal_key")["segmento_precio"].transform("first")
ope["segmento_precio"] = ope["segmento_precio"].fillna(segmento_sucursal)

# Imputación de nulos en costo operativo usando la mediana de la proporción costo sobre venta de su categoría
print(f"Nulos completados en costo operativo: {ope['costo_operativo_usd'].isna().sum()}")
proporcion_costo = ope["costo_operativo_usd"] / ope["ventas_usd"]
mediana_categoria = proporcion_costo.groupby(ope["categoria_comida"]).transform("median")
ope["costo_operativo_usd"] = ope["costo_operativo_usd"].fillna((ope["ventas_usd"] * mediana_categoria).round(2))

# Conversión de fecha y cálculo de ganancia neta
ope["fecha_reporte"] = pd.to_datetime(ope["fecha_reporte"]).dt.date
ope["ganancia_neta_usd"] = (ope["ventas_usd"] - ope["costo_operativo_usd"]).round(2)
print(f"Fuente 2 limpia: {len(ope)} operaciones, {int(ope.isna().sum().sum())} nulos")

# %% [markdown]
# ## 4. Merge entre fuentes y validaciones posteriores
# Se realiza un inner join por clave de sucursal para conservar solo operaciones de locales válidos dentro de estados unidos.

# %%
sucursales = suc.rename(columns={"keys": "sucursal_key", "name": "nombre_cadena", "city": "ciudad",
                                 "postalCode": "codigo_postal", "province": "estado_fuente_1"})
sucursales = sucursales[["sucursal_key", "nombre_cadena", "ciudad", "codigo_postal", "estado_fuente_1"]]

sin_sucursal = (~ope["sucursal_key"].isin(sucursales["sucursal_key"])).sum()
df = ope.merge(sucursales, on="sucursal_key", how="inner", validate="many_to_one")

print(f"Filas antes del merge en fuente 2: {len(ope)}")
print(f"Operaciones sin sucursal válida descartadas: {sin_sucursal}")
print(f"Filas después del merge: {len(df)}")
print(f"Sucursales integradas: {df['sucursal_key'].nunique()} de {len(sucursales)}")
print(f"Nulos introducidos por el merge: {int(df.isna().sum().sum())}")
print(f"Duplicados de operación después del merge: {df.duplicated('id_operacion').sum()}")
print(f"Estados que no coinciden entre fuentes: {(df['estado_codigo'] != df['estado_fuente_1']).sum()}")

# %% [markdown]
# ## 5. Construcción de las dimensiones de negocio
# Se arman las tablas de cadenas y ubicaciones sin duplicados y con sus códigos naturales.

# %%
# Dimensión cadena: una fila por cadena con su categoría y segmento
dim_cadena = (df.groupby("nombre_cadena")[["categoria_comida", "segmento_precio"]]
              .agg(lambda s: s.mode()[0])
              .reset_index())
dim_cadena["codigo_cadena"] = "CAD_" + (dim_cadena.index + 1).astype(str).str.zfill(5)

# Dimensión ubicación: una fila por combinación única de estado, ciudad y código postal
columnas_ubicacion = ["estado_codigo", "estado_nombre", "ciudad", "codigo_postal", "region_eeuu", "poblacion_estado"]
dim_ubicacion = (df[columnas_ubicacion]
                 .drop_duplicates(["estado_codigo", "ciudad", "codigo_postal"])
                 .sort_values(["estado_codigo", "ciudad", "codigo_postal"])
                 .reset_index(drop=True))
dim_ubicacion.insert(0, "pais", "US")
dim_ubicacion["codigo_ubicacion"] = "UBI_" + (dim_ubicacion.index + 1).astype(str).str.zfill(5)

print(f"Dimensión cadena generada: {len(dim_cadena)} filas")
print(f"Dimensión ubicación generada: {len(dim_ubicacion)} filas")

# %% [markdown]
# ## 6. Carga al data warehouse en postgresql
# Se recrean las tablas ejecutando el script sql, se insertan las dimensiones y luego la tabla de hechos.

# %%
engine = create_engine(DB_URL)

# Ejecución del script ddl que crea las 4 tablas y puebla la dimensión tiempo
with engine.begin() as conn:
    conn.execute(text((BASE_DIR / "sql" / "01_creacion_dw.sql").read_text(encoding="utf-8")))

# Carga de las dimensiones de negocio
dim_cadena.to_sql("dim_cadena", engine, if_exists="append", index=False, method="multi", chunksize=1000)
dim_ubicacion.to_sql("dim_ubicacion", engine, if_exists="append", index=False, method="multi", chunksize=1000)

# Lectura de las claves subrogadas generadas por postgresql para armar la tabla de hechos
ids_tiempo = pd.read_sql(text("SELECT tiempo_id, fecha FROM dim_tiempo"), engine)
ids_cadena = pd.read_sql(text("SELECT cadena_id, nombre_cadena FROM dim_cadena"), engine)
ids_ubicacion = pd.read_sql(text("SELECT ubicacion_id, estado_codigo, ciudad, codigo_postal FROM dim_ubicacion"), engine)

fact_ventas = (df.rename(columns={"fecha_reporte": "fecha"})
               .merge(ids_tiempo, on="fecha")
               .merge(ids_cadena, on="nombre_cadena")
               .merge(ids_ubicacion, on=["estado_codigo", "ciudad", "codigo_postal"]))
print(f"Hechos vinculados con sus tres claves foráneas: {len(fact_ventas)} de {len(df)}")

columnas_fact = ["tiempo_id", "cadena_id", "ubicacion_id", "id_operacion", "sucursal_key",
                 "cantidad_ordenes", "ventas_usd", "costo_operativo_usd", "ganancia_neta_usd"]
fact_ventas[columnas_fact].to_sql("fact_ventas", engine, if_exists="append", index=False,
                                  method="multi", chunksize=1000)

# %% [markdown]
# ## 7. Verificación de la carga y exportación de tablas procesadas
# Se exportan las 4 tablas a archivos csv para power bi y se verifican las cantidades cargadas.

# %%
for tabla in ["dim_tiempo", "dim_cadena", "dim_ubicacion", "fact_ventas"]:
    datos = pd.read_sql(text(f"SELECT * FROM {tabla}"), engine)
    datos.to_csv(DIR_PROCESADOS / f"{tabla}.csv", index=False, encoding="utf-8")
    print(f"Tabla {tabla}: {len(datos)} filas cargadas y exportadas")

kpis = pd.read_sql(text("""
    SELECT ROUND(SUM(ventas_usd), 2)                                          AS kpi1_ingreso_total_usd,
           ROUND(SUM(ventas_usd) / SUM(cantidad_ordenes), 2)                  AS kpi2_ticket_promedio_usd,
           ROUND((SUM(ventas_usd) - SUM(costo_operativo_usd)) / SUM(ventas_usd) * 100, 2) AS kpi3_margen_pct
    FROM fact_ventas
"""), engine)
print(f"Indicadores calculados: ingreso total {kpis['kpi1_ingreso_total_usd'][0]}, ticket promedio {kpis['kpi2_ticket_promedio_usd'][0]}, margen {kpis['kpi3_margen_pct'][0]}%")
