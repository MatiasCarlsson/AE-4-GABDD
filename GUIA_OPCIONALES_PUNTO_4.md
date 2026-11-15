# Guía de Implementación de Requisitos Opcionales (Punto 4 — AE4 GABD 2026)

Como acordamos, el proyecto principal quedó 100% enfocado en cumplir con excelencia todos los **requisitos obligatorios** (Puntos 3.1 a 3.6). Si más adelante vos o tu grupo deciden sumar alguno de los **3 ítems opcionales del Punto 4**, acá tenés las instrucciones exactas y el código listo para agregarlos en minutos.

---

## Opción 1: MongoDB como Fuente Documental Anidada (JSON) y Capa Raw

La consigna indica:
> *"MongoDB: uso como fuente documental (JSON), capa raw o repositorio de logs, documentando la transformación de documentos anidados a formato tabular."*

### ¿Cómo activarlo?
1. Transformar la Fuente 2 (`operaciones_franquicias_2023_2024.csv`) en una colección de documentos JSON anidados donde cada documento tenga subdocumentos para `franquicia`, `geografia_censo` y `metricas_operativas`:
   ```json
   {
     "id_operacion": "OP-2024-000001",
     "sucursal_key": "us/ny/massena/324mainst/-1161002137",
     "fecha_reporte": "2024-07-15",
     "franquicia": {
       "cadena_reportada": "McDonald's",
       "categoria_comida": "Burgers & Grill",
       "segmento_precio": "Económico (QSR)"
     },
     "geografia_censo": {
       "estado_codigo": "NY",
       "estado_nombre": "New York",
       "region_eeuu": "Northeast",
       "poblacion_estado": 19571216
     },
     "metricas_operativas": {
       "cantidad_ordenes": 6420,
       "ventas_usd": 84102.00,
       "costo_operativo_usd": 53825.28
     }
   }
   ```
2. Importar el archivo JSON a MongoDB local:
   ```bash
   mongoimport --db raw_fastfood --collection operaciones_anidadas --file datos/originales/operaciones_anidadas.json --jsonArray
   ```
3. En el script ETL (`etl/etl_fastfood_dw.py`), leer desde MongoDB con `pymongo` y aplanar los documentos anidados a formato tabular usando `pd.json_normalize()`:
   ```python
   from pymongo import MongoClient
   import pandas as pd

   client = MongoClient("mongodb://localhost:27017/")
   docs = list(client["raw_fastfood"]["operaciones_anidadas"].find({}, {"_id": 0}))
   df_aplanado = pd.json_normalize(docs, sep="_")
   # Renombrar columnas aplanadas (franquicia_categoria_comida -> categoria_comida, etc.)
   ```

---

## Opción 2: Vistas, Índices Compuestos y Validaciones `CHECK` Adicionales en PostgreSQL

La consigna indica:
> *"Vistas, índices o validaciones de integridad adicionales en PostgreSQL."*

### Código SQL listo para agregar al final de `sql/01_creacion_dw.sql`:

```sql
-- 1. Restricciones CHECK de integridad contable y geográfica
ALTER TABLE fact_ventas
    ADD CONSTRAINT chk_ventas_positivas CHECK (ventas_usd > 0),
    ADD CONSTRAINT chk_ordenes_positivas CHECK (cantidad_ordenes > 0),
    ADD CONSTRAINT chk_costo_no_negativo CHECK (costo_operativo_usd >= 0);

ALTER TABLE dim_tiempo
    ADD CONSTRAINT chk_trimestre_valido CHECK (trimestre BETWEEN 1 AND 4),
    ADD CONSTRAINT chk_mes_valido CHECK (mes BETWEEN 1 AND 12);

-- 2. Índice Compuesto con INCLUDE (Index-Only Scan para consultas por tiempo y cadena)
CREATE INDEX idx_fact_tiempo_cadena_inc
    ON fact_ventas (tiempo_id, cadena_id)
    INCLUDE (ventas_usd, cantidad_ordenes, costo_operativo_usd);

-- 3. Vista Analítica Pre-integrada para BI (vw_resumen_ejecutivo_fastfood)
CREATE OR REPLACE VIEW vw_resumen_ejecutivo_fastfood AS
SELECT
    f.venta_id,
    f.id_operacion,
    f.sucursal_key,
    t.fecha,
    t.año,
    t.trimestre,
    t.nombre_mes,
    c.nombre_cadena,
    c.categoria_comida,
    c.segmento_precio,
    u.ciudad,
    u.estado_codigo,
    u.estado_nombre,
    u.region_eeuu,
    u.poblacion_estado,
    f.cantidad_ordenes,
    f.ventas_usd,
    f.costo_operativo_usd,
    f.ganancia_neta_usd
FROM fact_ventas f
JOIN dim_tiempo t ON f.tiempo_id = t.tiempo_id
JOIN dim_cadena c ON f.cadena_id = c.cadena_id
JOIN dim_ubicacion u ON f.ubicacion_id = u.ubicacion_id;
```

---

## Opción 3: DAX Avanzado en Power BI

La consigna indica:
> *"Power Query o DAX avanzado en Power BI."*

### Medidas DAX Avanzadas listas para pegar en Power BI:

```dax
-- 1. Crecimiento Interanual de Ingresos (YoY %) usando Time Intelligence
Ventas_Año_Anterior_USD = 
CALCULATE(
    [KPI_1_Ingreso_Total_USD],
    SAMEPERIODLASTYEAR(dim_tiempo[fecha])
)

Crecimiento_Interanual_YoY_Pct = 
DIVIDE(
    [KPI_1_Ingreso_Total_USD] - [Ventas_Año_Anterior_USD],
    [Ventas_Año_Anterior_USD],
    0
)

-- 2. Ranking Dinámico de Cadenas según Facturación dentro de cada Categoría (RANKX + ALLSELECTED)
Ranking_Cadena_Facturacion = 
IF(
    HASONEVALUE(dim_cadena[nombre_cadena]),
    RANKX(
        ALLSELECTED(dim_cadena[nombre_cadena]),
        [KPI_1_Ingreso_Total_USD],
        ,
        DESC,
        Dense
    )
)

-- 3. Participación de Mercado (% Market Share sobre el total nacional sin importar filtros de cadena)
Market_Share_Nacional_Pct = 
DIVIDE(
    [KPI_1_Ingreso_Total_USD],
    CALCULATE([KPI_1_Ingreso_Total_USD], ALL(dim_cadena)),
    0
)
```

