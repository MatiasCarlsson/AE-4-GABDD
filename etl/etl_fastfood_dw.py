# %% [markdown]
# # Proceso etl del trabajo integrador ae4
# Ingestión, limpieza, transformación, merge por estado y carga al data warehouse en postgresql.

# %%
from pathlib import Path
import pandas as pd
from sqlalchemy import create_engine, text
from comun import leer_fastfood_csv, clasificar_categoria

# Rutas del proyecto (funciona desde la carpeta raíz o desde la subcarpeta etl)
BASE_DIR = Path.cwd().parent if Path.cwd().name == "etl" else Path.cwd()
DIR_ORIGINALES = BASE_DIR / "datos" / "originales"
DIR_PROCESADOS = BASE_DIR / "datos" / "procesados"
DIR_PROCESADOS.mkdir(parents=True, exist_ok=True)

DB_URL = "postgresql+psycopg2://postgres:postgres@localhost:5432/dw_fastfood"

# %% [markdown]
# ## 1. Ingestión de cada fuente por separado
# - **Fuente 1 (real y externa):** padrón de 10.000 locales de comida rápida en estados unidos.
# - **Fuente 2 (construida por el grupo):** indicadores demográficos, calóricos y de obesidad por estado (censo y cdc).

# %%
suc_raw, filas_reparadas = leer_fastfood_csv(DIR_ORIGINALES / "FastFoodRestaurants.csv")
dem_raw = pd.read_csv(DIR_ORIGINALES / "us_states_consumption_demographics.csv")

print(f"Fuente 1 (locales): {len(suc_raw)} filas, {suc_raw.shape[1]} columnas")
print(f"Filas reparadas por comas dentro de la dirección: {filas_reparadas}")
print(f"Fuente 2 (demografía y obesidad): {len(dem_raw)} filas, {dem_raw.shape[1]} columnas")

# %% [markdown]
# ## 2. Limpieza de la fuente 1 (oferta de locales)
# Se filtran coordenadas fuera de estados unidos, se unifican nombres de cadenas, se formatea el código postal a 5 dígitos y se eliminan locales duplicados.

# %%
suc = suc_raw.replace("", pd.NA)
print(f"Nulos iniciales en fuente 1: {int(suc.isna().sum().sum())}")

# Coordenadas: se convierten a número y se descartan los registros fuera de estados unidos
suc["latitude"] = pd.to_numeric(suc["latitude"], errors="coerce").round(6)
suc["longitude"] = pd.to_numeric(suc["longitude"], errors="coerce").round(6)
dentro_de_eeuu = suc["latitude"].between(18, 72) & suc["longitude"].between(-170, -65)
print(f"Locales fuera de estados unidos eliminados: {(~dentro_de_eeuu).sum()}")
suc = suc[dentro_de_eeuu].copy()

# Unificación de nombres de cadenas que solo difieren en mayúsculas o signos
suc["name"] = suc["name"].str.strip()
clave_cadena = suc["name"].str.lower().str.replace(r"[^a-z0-9]", "", regex=True)
nombre_mas_frecuente = suc.groupby(clave_cadena)["name"].agg(lambda s: s.mode()[0])
cadenas_antes = suc["name"].nunique()
suc["name"] = clave_cadena.map(nombre_mas_frecuente)
print(f"Cadenas únicas: {cadenas_antes} antes, {suc['name'].nunique()} después de unificar")

# Estandarización de código de estado, ciudad, dirección y código postal de 5 dígitos
suc["province"] = suc["province"].str.strip().str.upper().replace({"CO SPGS": "CO"})
suc["city"] = suc["city"].str.strip().str.title()
suc["address"] = suc["address"].str.strip()
suc["postalCode"] = suc["postalCode"].str.strip().str[:5].str.zfill(5)

# Eliminación de locales duplicados por dirección, ciudad y estado
duplicados_f1 = suc.duplicated(["address", "city", "province"]).sum()
print(f"Locales duplicados por dirección, ciudad y estado eliminados: {duplicados_f1}")
suc = suc.drop_duplicates(["address", "city", "province"]).reset_index(drop=True)
print(f"Fuente 1 limpia: {len(suc)} locales, {int(suc.isna().sum().sum())} nulos")

# %% [markdown]
# ## 3. Limpieza de la fuente 2 (demografía, consumo y obesidad estatal)
# Se normalizan los textos de estado y región, se quitan filas repetidas y se imputan nulos con el promedio regional.

# %%
dem = dem_raw.copy()
print(f"Nulos iniciales en fuente 2: {int(dem.isna().sum().sum())}")

# Normalización de clave de estado y nombre de región censal
dem["province"] = dem["province"].astype(str).str.strip().str.upper()
dem["state_name"] = dem["state_name"].astype(str).str.strip()
dem["census_region"] = dem["census_region"].astype(str).str.strip().str.title()

# Eliminación de estados duplicados
duplicados_f2 = dem.duplicated("province").sum()
print(f"Filas duplicadas por estado eliminadas en fuente 2: {duplicados_f2}")
dem = dem.drop_duplicates("province").copy()

# Imputación de valores nulos en calorías y tasa de obesidad usando el promedio de la región censal
nulos_cal = dem["avg_daily_ff_calories"].isna().sum()
nulos_obe = dem["obesity_rate_pct"].isna().sum()
dem["avg_daily_ff_calories"] = dem["avg_daily_ff_calories"].fillna(
    dem.groupby("census_region")["avg_daily_ff_calories"].transform("mean").round(1)
)
dem["obesity_rate_pct"] = dem["obesity_rate_pct"].fillna(
    dem.groupby("census_region")["obesity_rate_pct"].transform("mean").round(1)
)
print(f"Nulos completados en fuente 2: {nulos_cal} en calorías y {nulos_obe} en tasa de obesidad")

# Conversión de la fecha de corte del relevamiento
dem["reference_date"] = pd.to_datetime(dem["reference_date"]).dt.date
dem = dem.sort_values("province").reset_index(drop=True)
print(f"Fuente 2 limpia: {len(dem)} jurisdicciones estatales, {int(dem.isna().sum().sum())} nulos")

# %% [markdown]
# ## 4. Merge entre fuentes por estado y validaciones posteriores
# Se realiza un inner join mediante la clave `province` vinculando cada local con los indicadores demográficos y sanitarios de su estado.

# %%
sin_estado = (~suc["province"].isin(dem["province"])).sum()
df = suc.merge(dem, on="province", how="inner", validate="many_to_one")

print(f"Filas en fuente 1 antes del merge: {len(suc)}")
print(f"Filas en fuente 2 antes del merge: {len(dem)}")
print(f"Locales sin estado válido descartados: {sin_estado}")
print(f"Filas totales integradas después del merge: {len(df)}")
print(f"Estados integrados en el cruce: {df['province'].nunique()} de {len(dem)}")
print(f"Nulos introducidos por el merge: {int(df.isna().sum().sum())}")
print(f"Duplicados de dirección, ciudad y estado tras el merge: {df.duplicated(['address', 'city', 'province']).sum()}")

# %% [markdown]
# ## 5. Construcción de las dimensiones de negocio
# Se generan las tablas `dim_geografia` y `dim_cadena` sin duplicados para cargar al esquema estrella.

# %%
# Dimensión geografía: una fila por combinación única de estado, ciudad y código postal
dim_geografia = (
    df[["province", "state_name", "census_region", "city", "postalCode", "population_total"]]
    .rename(columns={"postalCode": "postal_code"})
    .drop_duplicates(["province", "city", "postal_code"])
    .sort_values(["province", "city", "postal_code"])
    .reset_index(drop=True)
)

# Dimensión cadena: una fila por cadena normalizada con su categoría gastronómica principal
dim_cadena = (
    df[["name"]]
    .drop_duplicates()
    .rename(columns={"name": "nombre_cadena"})
    .sort_values("nombre_cadena")
    .reset_index(drop=True)
)
dim_cadena["categoria_principal"] = dim_cadena["nombre_cadena"].apply(clasificar_categoria)

print(f"Dimensión geografía generada: {len(dim_geografia)} filas")
print(f"Dimensión cadena generada: {len(dim_cadena)} filas")

# %% [markdown]
# ## 6. Carga al data warehouse en postgresql
# Se ejecuta el script ddl, se insertan las dimensiones y se vinculan las claves foráneas para poblar `fact_locales_consumo`.

# %%
engine = create_engine(DB_URL)

# Creación del esquema estrella y población de la dimensión tiempo (año 2024 completo)
with engine.begin() as conn:
    conn.execute(text((BASE_DIR / "sql" / "01_creacion_dw.sql").read_text(encoding="utf-8")))

# Inserción de las dimensiones de negocio
dim_geografia.to_sql("dim_geografia", engine, if_exists="append", index=False, method="multi", chunksize=1000)
dim_cadena.to_sql("dim_cadena", engine, if_exists="append", index=False, method="multi", chunksize=1000)

# Lectura de las claves subrogadas desde postgresql para armar la tabla de hechos
ids_tiempo = pd.read_sql(text("SELECT tiempo_id, fecha FROM dim_tiempo"), engine)
ids_geografia = pd.read_sql(text("SELECT geografia_id, province, city, postal_code FROM dim_geografia"), engine)
ids_cadena = pd.read_sql(text("SELECT cadena_id, nombre_cadena FROM dim_cadena"), engine)

fact = (
    df.rename(columns={
        "reference_date": "fecha",
        "postalCode": "postal_code",
        "name": "nombre_cadena",
        "avg_daily_ff_calories": "calorias_diarias_promedio_ff",
        "pct_daily_fastfood_consumption": "pct_consumo_diario",
        "obesity_rate_pct": "tasa_obesidad_pct",
    })
    .merge(ids_tiempo, on="fecha")
    .merge(ids_geografia, on=["province", "city", "postal_code"])
    .merge(ids_cadena, on="nombre_cadena")
)
fact["cantidad_locales"] = 1
print(f"Hechos vinculados con sus tres claves foráneas: {len(fact)} de {len(df)}")

columnas_fact = [
    "tiempo_id",
    "geografia_id",
    "cadena_id",
    "latitude",
    "longitude",
    "cantidad_locales",
    "calorias_diarias_promedio_ff",
    "pct_consumo_diario",
    "tasa_obesidad_pct",
]
fact[columnas_fact].to_sql("fact_locales_consumo", engine, if_exists="append", index=False, method="multi", chunksize=1000)

# %% [markdown]
# ## 7. Verificación de la carga y exportación de archivos csv para power bi
# Se exportan las 4 tablas físicas del data warehouse a `datos/procesados/` y se verifican los 3 indicadores clave.

# %%
for tabla in ["dim_tiempo", "dim_geografia", "dim_cadena", "fact_locales_consumo"]:
    datos = pd.read_sql(text(f"SELECT * FROM {tabla}"), engine)
    datos.to_csv(DIR_PROCESADOS / f"{tabla}.csv", index=False, encoding="utf-8")
    print(f"Tabla {tabla}: {len(datos)} filas cargadas y exportadas")

resumen_kpis = pd.read_sql(text("""
    WITH est AS (
        SELECT g.province, MAX(g.population_total) AS pob, SUM(f.cantidad_locales) AS loc,
               MAX(f.pct_consumo_diario) AS cons, MAX(f.tasa_obesidad_pct) AS obe
        FROM fact_locales_consumo f JOIN dim_geografia g ON f.geografia_id = g.geografia_id
        GROUP BY g.province
    )
    SELECT SUM(loc) AS locales,
           ROUND(SUM(loc) * 100000.0 / SUM(pob), 2) AS dlff_nacional,
           ROUND(SUM(cons * pob) / SUM(pob), 2) AS tpcd_nacional,
           ROUND(SUM(obe * pob) / SUM(pob), 2) AS obesidad_nacional
    FROM est
"""), engine)
print(f"Indicadores nacionales: {resumen_kpis['locales'][0]} locales, densidad {resumen_kpis['dlff_nacional'][0]} cada 100k hab, consumo diario {resumen_kpis['tpcd_nacional'][0]}%, obesidad {resumen_kpis['obesidad_nacional'][0]}%")
