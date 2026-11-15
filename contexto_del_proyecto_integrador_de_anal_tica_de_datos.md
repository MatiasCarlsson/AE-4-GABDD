# Contexto del Proyecto: Trabajo Práctico Integrador de Analítica de Datos

> **Instrucción para la IA:** Actúa como un arquitecto de datos y tutor técnico senior. Utiliza este documento como contexto maestro para ayudarme a desarrollar paso a paso mi Trabajo Práctico Integrador universitario. Todas las soluciones técnicas (código Python, scripts SQL, diseño de dashboard y redacción de informe) deben respetar estrictamente las reglas de negocio, el stack tecnológico y la rúbrica de evaluación detallados a continuación.

---

## 1. Objetivo y Reglas de la Cátedra

* **Objetivo:** Integrar en un caso real de analítica de datos el flujo completo de Ingeniería y Visualización de Datos:
  1. Ingestión, limpieza, transformación y cruce (`merge`) con **Python / pandas** (ETL).
  2. Modelado dimensional e implementación de un **Data Warehouse en PostgreSQL**.
  3. Visualización interactiva en **Power BI** o **Streamlit** (a elección, solo una herramienta).
* **Restricciones clave:**
  * Se evalúa la **coherencia del hilo conductor** entre preguntas de negocio $\rightarrow$ datos procesados $\rightarrow$ modelo DW $\rightarrow$ dashboard.
  * Todos los entregables deben ser **100% reproducibles localmente** (no depender de enlaces externos ni APIs en vivo al momento de evaluar).
  * **Informe final:** PDF de máximo 15 páginas (sin contar portada, índice ni anexos). No debe llevar bloques de código completo (el código va en scripts separados dentro de un `.zip`).
  * **Defensa oral:** 15 minutos + preguntas individuales sobre cualquier parte del proyecto.

---

## 2. Definición del Negocio (Etapa 3.1)

### Contexto
Análisis integral de la **oferta comercial y los patrones de consumo de comida rápida (*fast food*) en Estados Unidos**. El estudio cruza la distribución geográfica y concentración de restaurantes de cadenas de comida rápida con indicadores demográficos, nutricionales y de prevalencia de consumo por estado. El propósito es identificar desequilibrios territoriales entre la densidad de locales disponibles y el impacto calórico/sanitario en la población, permitiendo fundamentar tanto estrategias de expansión comercial como políticas preventivas de salud nutricional.

### Las 4 Preguntas de Negocio (Eje del Dashboard)
1. **¿Cuáles son los 5 estados con mayor densidad de locales de comida rápida por cada 100.000 habitantes y cómo se comparan con el promedio nacional?**
2. **¿Existe relación entre la densidad regional de restaurantes y el porcentaje de población adulta que consume comida rápida diariamente?**
3. **¿Cómo se distribuye la cuota de mercado (*market share*) de las principales cadenas (McDonald's, Burger King, Subway, Taco Bell, Wendy's, etc.) según las 4 regiones censales de EE. UU. (*West, South, Midwest, Northeast*)?**
4. **¿Qué regiones presentan una ingesta calórica diaria promedio proveniente de *fast food* superior a las $900\text{ kcal}$ y cuántas sucursales operan en ellas?**

### Los 3 KPIs Definidos
1. **Densidad de Locales de Fast Food ($DLFF$)**
   $$DLFF = \left( \frac{\text{Cantidad Total de Locales en el Estado}}{\text{Población Total del Estado}} \right) \times 100.000$$
   * **Unidad de medida:** Locales por cada $100.000$ habitantes.

2. **Participación de Mercado por Cadena ($PMC$)**
   $$PMC = \left( \frac{\text{Locales de la Cadena } X}{\text{Total de Locales Analizados}} \right) \times 100$$
   * **Unidad de medida:** Porcentaje ($\%$).

3. **Tasa Promedio de Consumo Diario de Fast Food ($TPCD$)**
   $$TPCD = \frac{\sum (\text{Porcentaje de Consumo Diario por Estado} \times \text{Población del Estado})}{\sum \text{Población Total de la Región}}$$
   * **Unidad de medida:** Porcentaje ($\%$) ponderado poblacionalmente.

### Criterios, Supuestos y Alcance
* **Criterios de inclusión:** Se incluyen únicamente registros con código de estado válido dentro de los 50 estados de EE. UU. (y D.C.) y nombres de cadenas normalizados.
* **Supuesto de cruce:** La oferta física de locales registrada en el dataset externo se cruza a nivel estatal (`province` = código de 2 letras del estado) con los indicadores poblacionales y nutricionales oficiales de referencia.
* **Alcance y limitaciones:** El dataset de locales aporta información de *oferta y geolocalización* (no contiene tickets de venta individuales), mientras que la segunda fuente aporta indicadores agregados de *consumo y salud a nivel estatal* (encuestas CDC / Censo). Por ende, las conclusiones establecen correlaciones geográficas y poblacionales, no historiales médicos individuales.

---

## 3. Fuentes de Datos y Estrategia de Merge (Etapa 3.2)

### Fuente 1: Real y Externa (Oferta de Locales)
* **Nombre:** *Fast Food Restaurants Across America* (Datafiniti).
* **Formato y origen:** CSV público descargado de repositorio abierto en GitHub:
  `https://raw.githubusercontent.com/JonnyFLDN/US-Fast-Food-Restaurants/master/FastFoodRestaurants.csv`
* **Volumen:** $10.000$ registros de sucursales.
* **Columnas relevantes:** `id`, `name` (cadena), `address`, `city`, `province` (código de estado, ej. `CA`, `TX`, `NY`), `postalCode`, `latitude`, `longitude`, `categories`.

### Fuente 2: Secundaria / Construida por el Grupo (Demografía y Consumo)
* **Nombre:** `us_states_consumption_demographics.csv`
* **Criterio de construcción:** Tabla maestra elaborada por el grupo consolidando datos oficiales del *U.S. Census Bureau* (población por estado y región censal) y reportes estatales del *CDC / NHANES* (tasa de consumo diario de comida rápida, calorías promedio diarias de *fast food* y prevalencia de obesidad adulta).
* **Columnas:**
  * `province` (Clave primaria: `CA`, `TX`, `FL`, `NY`, etc.)
  * `state_name` (Nombre completo del estado)
  * `census_region` (`West`, `South`, `Midwest`, `Northeast`)
  * `population_total` (Entero)
  * `pct_daily_fastfood_consumption` (Decimal $\%$)
  * `avg_daily_ff_calories` (Numérico en $\text{kcal}$)
  * `obesity_rate_pct` (Decimal $\%$)
  * `reference_date` (Fecha de corte de referencia del relevamiento, formato `YYYY-MM-DD`, necesaria para vincular con `DimTiempo`).
* **Justificación:** Permite normalizar la cantidad de locales por habitante ($DLFF$) y cruzar la oferta comercial con métricas reales de consumo poblacional.

---

## 4. Arquitectura Técnica Requerida

### Etapa 3.3: ETL con Python / `pandas`
El script de Python debe ejecutar y documentar:
1. **Ingestión:** Lectura separada de `FastFoodRestaurants.csv` y `us_states_consumption_demographics.csv`.
2. **Limpieza:**
   * Normalización de texto en `name` (unificar variantes como `McDonalds`, `MCDONALD'S`, `McDonald's` $\rightarrow$ `McDonald's`).
   * Formateo de `postalCode` a cadena de 5 dígitos con ceros a la izquierda (`zfill(5)`).
   * Tratamiento de nulos y eliminación de locales duplicados por (`address`, `city`, `province`).
3. **Transformación:** Estandarización de la clave `province` (mayúsculas, sin espacios) y extracción de atributos temporales desde `reference_date`.
4. **Merge:** Unión mediante `pd.merge(..., on='province', how='inner')` (o `left` documentando el tratamiento de territorios no estatales).
5. **Validaciones post-merge:** Imprimir y registrar conteo de filas antes y después del cruce, verificación de nulos introducidos, control de duplicados y exportación de los CSV limpios listos para cargar al Data Warehouse.

### Etapa 3.4: Data Warehouse en PostgreSQL (Esquema Estrella)
Debe contener **mínimo 4 tablas físicas** respaldadas por scripts SQL reproducibles (`DDL` de creación, `DML` de carga y al menos 3 consultas analíticas):
1. **`DimTiempo` (Obligatoria):** `tiempo_id` (PK), `fecha` (`DATE`), `dia` (`INT`), `mes` (`INT`), `nombre_mes` (`VARCHAR`), `trimestre` (`INT`), `anio` (`INT`). *(Se alimenta con la fecha de corte/relevamiento de los datos para cumplir la granularidad exigida por la cátedra).*
2. **`DimGeografia`:** `geografia_id` (PK), `province` (`VARCHAR(2)`), `state_name` (`VARCHAR`), `census_region` (`VARCHAR`), `city` (`VARCHAR`), `postal_code` (`VARCHAR(10)`), `population_total` (`BIGINT`).
3. **`DimCadena`:** `cadena_id` (PK), `nombre_cadena` (`VARCHAR`), `categoria_principal` (`VARCHAR`).
4. **`FactLocalesConsumo` (Tabla de Hechos):**
   * Claves foráneas: `tiempo_id` (FK), `geografia_id` (FK), `cadena_id` (FK).
   * Atributos de detalle/coordenadas: `latitude`, `longitude`.
   * Métricas aditivas / semi-aditivas: `cantidad_locales` (`INT`, valor `1` por sucursal para agregación aditiva), `calorias_diarias_promedio_ff` (`NUMERIC`), `pct_consumo_diario` (`NUMERIC`), `tasa_obesidad_pct` (`NUMERIC`).

### Etapa 3.5: Visualización (Power BI o Streamlit)
* **Mínimo 4 visualizaciones:** Cada gráfico debe indicar explícitamente en su título o subtítulo qué pregunta de negocio (de la 1 a la 4) responde.
* **Tarjetas de KPIs:** Mostrar los **3 KPIs** definidos, destacando **1 KPI principal** (ej. *Densidad Nacional Promedio de Locales*).
* **Interactividad:** Mínimo **2 filtros interactivos** (ej. *Región Censal* y *Cadena de Fast Food*).

---

## 5. Cómo Empezar a Trabajar Conmigo

Cuando te pida ayuda, ayúdame a construir los artefactos de manera ordenada y modular:
1. **Paso 1:** Generar el dataset secundario completo de los 50 estados (`us_states_consumption_demographics.csv`) con datos realistas basados en el Censo de EE. UU. y el CDC.
2. **Paso 2:** Escribir el script ETL en Python (`etl_fastfood.py`) con todas las validaciones exigidas en la consigna 3.3.
3. **Paso 3:** Escribir los scripts SQL de PostgreSQL (`01_create_dw.sql`, `02_load_dw.sql`, `03_analytical_queries.sql`).
4. **Paso 4:** Construir el dashboard (en **Streamlit** en un único archivo `app.py` + `requirements.txt`, o guiar el armado en **Power BI** con medidas DAX).
5. **Paso 5:** Redactar la estructura y contenidos del informe final en PDF (máx. 15 páginas) y el guion para la defensa oral.