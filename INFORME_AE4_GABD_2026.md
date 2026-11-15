# Trabajo Integrador AE4 — Gestión Avanzada de Bases de Datos
## “Integración de datos y analítica: Oferta Comercial de Comida Rápida, Patrones de Consumo Calórico y Prevalencia de Obesidad en Estados Unidos”

- **Carrera:** Ingeniería en Sistemas de Información
- **Materia:** Gestión Avanzada de Bases de Datos (2026)
- **Profesores:** Gabriel del Rosario, Portel Marcos, Fernández Victoria
- **Fecha de entrega:** 16/11/2026

---

## 1. Contexto y Definición del Negocio

### 1.1 Contexto Organizacional y Sanitario
El presente trabajo realiza un análisis integral de la **oferta comercial de restaurantes de comida rápida (*fast food*) y los patrones de consumo nutricional y prevalencia de obesidad en Estados Unidos**. El estudio cruza la distribución geográfica y concentración de **9.904 sucursales pertenecientes a 466 cadenas** con indicadores demográficos, de ingesta calórica diaria y de prevalencia de obesidad adulta por estado (provenientes del *U.S. Census Bureau* y reportes epidemiológicos del *CDC / NHANES* relevados durante 2024). El propósito es identificar desequilibrios territoriales entre la densidad de locales disponibles por habitante y el impacto calórico/sanitario en la población, permitiendo fundamentar tanto estrategias de expansión comercial como políticas preventivas de salud nutricional pública.

### 1.2 Preguntas de Negocio
Las cuatro preguntas de negocio específicas y verificables que estructuran el proceso ETL, el modelo dimensional del Data Warehouse y el dashboard son:

1. **Pregunta 1 (Densidad Estatal — justifica `dim_geografia`):** ¿Cuáles son los 5 estados con mayor densidad de locales de comida rápida por cada 100.000 habitantes (`DLFF`) y cómo se comparan con el promedio nacional?
2. **Pregunta 2 (Correlación Oferta vs. Salud/Consumo — justifica `fact_locales_consumo` y `dim_geografia`):** ¿Existe relación entre la densidad regional de restaurantes y el porcentaje de población adulta que consume comida rápida diariamente (`TPCD`) junto con la tasa de obesidad estatal?
3. **Pregunta 3 (Competencia y Market Share — justifica `dim_cadena`):** ¿Cómo se distribuye la cuota de mercado (*market share*, `PMC`) de las principales cadenas (*McDonald's, Burger King, Taco Bell, Wendy's, Arby's, KFC, Subway, SONIC Drive In*) según las 4 regiones censales de EE. UU. (*West, South, Midwest, Northeast*)?
4. **Pregunta 4 (Umbral Calórico y Relevamiento Temporal — justifica `dim_tiempo`):** En los relevamientos trimestrales de 2024, ¿qué regiones presentan una ingesta calórica diaria promedio proveniente de *fast food* superior a las `900 kcal` y cuántas sucursales operan en ellas?

### 1.3 Indicadores Clave de Desempeño (KPIs)

| Código | Nombre del KPI | Rol | Fórmula Explícita | Unidad de Medida | Valor Nacional Obtenido |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **KPI 1** | **Densidad de Locales de Fast Food (`DLFF`)** | **KPI Principal Destacado** | `(SUM(cantidad_locales) / Población Total) * 100.000` | Locales cada `100.000` habitantes | **2,96 locales / 100k hab.** |
| **KPI 2** | **Participación de Mercado por Cadena (`PMC`)** | KPI Secundario | `(Locales de la Cadena X / Total de Locales Analizados) * 100` | Porcentaje (`%`) | **McDonald's: 21,29 %** (`2.109` locales) |
| **KPI 3** | **Tasa Promedio de Consumo Diario (`TPCD`)** | KPI Secundario | `SUM(% Consumo Diario Estatal * Población Estatal) / SUM(Población Estatal)` | Porcentaje (`%`) ponderado poblacionalmente | **36,13 %** (Obesidad nac.: **32,60 %**) |

### 1.4 Criterios y Supuestos Adoptados
1. **Criterios de inclusión geográfica:** Se incluyen únicamente sucursales con código de estado válido dentro de las 51 jurisdicciones de EE. UU. (los 50 estados y Washington D.C.), cuyas coordenadas geográficas se ubiquen dentro de los límites de EE. UU. (latitud entre `18°` y `72° N`, longitud entre `-170°` y `-65° O`) y sin duplicidad de domicilio (`address`, `city`, `province`).
2. **Supuesto de cruce (`merge` estatal):** La oferta física de locales registrada en el dataset externo se cruza a nivel jurisdiccional mediante la clave `province` (código postal de 2 letras del estado) contra los indicadores poblacionales, calóricos y de prevalencia de obesidad del estado correspondiente.
3. **Ponderación demográfica:** Para evitar sesgos por tamaño de estado (por ejemplo, comparar Wyoming con California sin ponderar), los indicadores regionales y nacionales de consumo diario (`TPCD`) y prevalencia de obesidad se ponderan por la población oficial de cada estado (`population_total`).

### 1.5 Alcance y Limitaciones Iniciales
- **Qué permite responder:** Densidad de oferta comercial por habitante a nivel estado y región, cuota de mercado de las cadenas gastronómicas por región censal y su relación geográfica con la ingesta calórica diaria y la tasa de obesidad adulta.
- **Qué no se puede responder con las fuentes elegidas:** El dataset de locales aporta información de *oferta y geolocalización* (no contiene tickets de venta individuales), mientras que la segunda fuente aporta indicadores agregados de *consumo y salud a nivel estatal*. Por ende, las conclusiones establecen correlaciones geográficas y poblacionales, no historiales clínicos individuales ni causalidad médica directa por persona.

---

## 2. Descripción de las Fuentes de Datos Utilizadas

El proyecto integra **dos fuentes de datos distintas** que exigen limpieza independiente y un trabajo real de cruce relacional (`merge`) mediante la clave estatal `province`:

### 2.1 Fuente 1 (Real y Externa): Oferta y Geolocalización de Locales (`FastFoodRestaurants.csv`)
- **Nombre y origen:** *Fast Food Restaurants Across America* (Datafiniti), descargado del repositorio público:
  `https://raw.githubusercontent.com/JonnyFLDN/US-Fast-Food-Restaurants/master/FastFoodRestaurants.csv`
- **Licencia y fecha de descarga:** *CC BY-NC-SA 4.0* — Descargado el 03/11/2026 (depurado el 10/11/2026).
- **Volumen y columnas:** `10.000` registros de sucursales. Conserva las 9 columnas (`A` a `I`): `address`, `city`, `country`, `keys`, `latitude`, `longitude`, `name` (nombre de la cadena), `postalCode` y `province` (código de estado de 2 letras).

### 2.2 Fuente 2 (Construida por el Grupo): Demografía, Consumo Calórico y Obesidad (`us_states_consumption_demographics.csv`)
- **Nombre y generador reproducible:** `datos/originales/us_states_consumption_demographics.csv` (construida mediante el script `etl/generar_fuente_complementaria.py`).
- **Criterio de construcción:** Tabla maestra elaborada por el grupo consolidando datos demográficos del *U.S. Census Bureau* (población total por estado y división en las 4 regiones censales oficiales: `West`, `South`, `Midwest`, `Northeast`) y reportes epidemiológicos estatales del *CDC / BRFSS / NHANES* sobre porcentaje de adultos con consumo diario de comida rápida (`pct_daily_fastfood_consumption`), ingesta calórica diaria promedio proveniente de *fast food* (`avg_daily_ff_calories`, en `kcal`) y tasa de prevalencia de obesidad adulta (`obesity_rate_pct`, en `%`), junto con la fecha de corte trimestral del relevamiento 2024 (`reference_date`).
- **Por qué era necesaria:** Sin esta segunda fuente sería imposible calcular la densidad de locales cada 100.000 habitantes (`DLFF`), agrupar estados por región censal o vincular la presencia de locales de comida rápida con la ingesta calórica y la tasa de obesidad.

---

## 3. Proceso ETL: Limpieza, Transformación, Merge y Validaciones

El proceso ETL fue desarrollado en Python con `pandas` y `SQLAlchemy` (`etl/comun.py`, `etl/etl_fastfood_dw.py` y `etl/ETL_COMPLETO_AE4_GABD.ipynb`), estructurado en etapas verificables:

### 3.1 Limpieza de la Fuente 1 (`FastFoodRestaurants.csv`)
1. **Reparación de comas internas en `address`:** Se detectaron y repararon `20` filas donde la presencia de comas dentro de la dirección desplazaba las columnas hacia la derecha, recomponiendo los 9 campos (`A` a `I`) sin valores nulos iniciales.
2. **Filtrado de coordenadas atípicas fuera de EE. UU.:** Se convirtieron `latitude` y `longitude` a punto flotante y se descartaron **`51` registros** mal geocodificados fuera del territorio estadounidense (direcciones en Europa con longitud cercana a 0° o +13°), quedando `9.949` locales dentro de EE. UU.
3. **Normalización de cadenas, códigos postales y estados:** Mediante una clave alfanumérica en minúsculas (`r"[^a-z0-9]"`), se unificaron las variantes de escritura de una misma franquicia (`McDonalds`, `Mcdonald's` → `McDonald's`; `Chick-Fil-A` → `Chick-fil-A`), reduciendo de **`540` a `468` nombres de cadena** antes de desduplicar locales (`466` cadenas finales). Se corrigieron `5` registros de Colorado Springs con `province = "Co Spgs"` → `"CO"`, y se formateó `postalCode` a 5 dígitos con ceros a la izquierda (`zfill(5)`).
4. **Eliminación de locales duplicados:** Se detectaron y eliminaron **`45` locales duplicados** con la misma combinación (`address`, `city`, `province`), obteniendo **`9.904` sucursales únicas y limpias**.

### 3.2 Limpieza de la Fuente 2 (`us_states_consumption_demographics.csv`)
1. **Normalización de textos y clave primaria:** Se limpiaron espacios laterales y se estandarizó `province` en mayúsculas (`" tx "` → `"TX"`) y `census_region` en formato título (`"  northeast "` → `"Northeast"`).
2. **Eliminación de duplicados estatales:** De las `54` filas iniciales, se eliminaron **`3` filas duplicadas** por `province`, quedando exactamente las **`51` jurisdicciones** (50 estados + D.C.).
3. **Imputación de valores nulos:** Se imputaron **`2` valores faltantes** (`1` en `avg_daily_ff_calories` para Delaware y `1` en `obesity_rate_pct` para North Dakota) utilizando el promedio de su respectiva `census_region`.

### 3.3 Estrategia de Merge y Validaciones Posteriores al Cruce
- **Clave de cruce y tipo de Join:** Se aplicó `suc.merge(dem, on="province", how="inner", validate="many_to_one")`, donde múltiples sucursales de la Fuente 1 se vinculan con el único registro demográfico y sanitario de su estado en la Fuente 2.

| Métrica de Validación Post-Merge | Valor Obtenido | Justificación / Resultado |
| :--- | :---: | :--- |
| Filas en Fuente 1 inicial (`FastFoodRestaurants.csv`) | `10.000` | Padrón original descargado |
| Locales fuera de EE. UU. / duplicados eliminados en Fuente 1 | `51` / `45` | Coordenadas fuera de rango y domicilios repetidos |
| **Filas limpias en Fuente 1 antes del merge** | **`9.904`** | 100% locales válidos y únicos en EE. UU. |
| **Filas limpias en Fuente 2 antes del merge** | **`51`** | 50 estados de EE. UU. + Washington D.C. |
| **Filas integradas después del `INNER JOIN`** | **`9.904`** | `0` locales perdidos en el cruce |
| **Jurisdicciones estatales integradas** | **`51` de `51`** | Cobertura nacional completa |
| **Valores nulos introducidos por el merge** | **`0`** | Integridad referencial del 100% |
| **Duplicados de (`address`, `city`, `province`) post-merge** | **`0`** | Validado con `validate="many_to_one"` |

---

## 4. Modelo Dimensional del Data Warehouse en PostgreSQL

Se implementó un **Esquema Estrella (Star Schema)** en la base de datos PostgreSQL `dw_fastfood` integrado por **4 tablas físicas**, respaldado por los scripts reproducibles `sql/01_creacion_dw.sql` y `sql/02_consultas_analiticas.sql`.

```mermaid
erDiagram
    dim_tiempo ||--o{ fact_locales_consumo : "tiempo_id (FK)"
    dim_geografia ||--o{ fact_locales_consumo : "geografia_id (FK)"
    dim_cadena ||--o{ fact_locales_consumo : "cadena_id (FK)"

    dim_tiempo {
        int tiempo_id PK
        date fecha UK
        int dia
        int mes
        varchar nombre_mes
        int trimestre
        int anio
    }

    dim_geografia {
        int geografia_id PK
        varchar province
        varchar state_name
        varchar census_region
        varchar city
        varchar postal_code
        bigint population_total
    }

    dim_cadena {
        int cadena_id PK
        varchar nombre_cadena UK
        varchar categoria_principal
    }

    fact_locales_consumo {
        int hecho_id PK
        int tiempo_id FK
        int geografia_id FK
        int cadena_id FK
        numeric latitude
        numeric longitude
        int cantidad_locales
        numeric calorias_diarias_promedio_ff
        numeric pct_consumo_diario
        numeric tasa_obesidad_pct
    }
```

### Criterio de Diseño y Justificación de las Dimensiones
1. **`dim_tiempo` (`366` filas):** Generada en PostgreSQL con todos los días del año bisiesto `2024`; se vincula con la fecha de corte trimestral del relevamiento epidemiológico (`reference_date`) y está justificada por la **Pregunta de Negocio 4**.
2. **`dim_geografia` (`5.189` filas):** Consolida la jerarquía territorial (`postal_code` → `city` → `province` / `state_name` → `census_region`) e incorpora la población estatal (`population_total`), indispensable para calcular la densidad `DLFF` y responder las **Preguntas 1, 2, 3 y 4**.
3. **`dim_cadena` (`466` filas):** Almacena el catálogo de franquicias normalizadas y su rubro gastronómico (`categoria_principal`), justificada directamente por la **Pregunta de Negocio 3** y el **KPI 2 (`PMC`)**.
4. **`fact_locales_consumo` (`9.904` filas):** Registra cada sucursal activa con la métrica aditiva `cantidad_locales = 1` (que permite sumar locales por cualquier eje dimensional), sus coordenadas (`latitude`, `longitude`) y las métricas nutricionales y sanitarias de su entorno (`calorias_diarias_promedio_ff`, `pct_consumo_diario`, `tasa_obesidad_pct`).

---

## 5. Diccionario de Datos del Data Warehouse (`dw_fastfood`)

### 5.1 Tabla `dim_tiempo` (366 registros)
| Columna | Tipo SQL | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `tiempo_id` | `SERIAL` | `PRIMARY KEY` | Clave subrogada de la dimensión tiempo. |
| `fecha` | `DATE` | `UNIQUE NOT NULL` | Fecha calendario (`2024-01-01` a `2024-12-31`). |
| `dia` | `INTEGER` | `NOT NULL` | Número de día del mes (`1` a `31`). |
| `mes` | `INTEGER` | `NOT NULL` | Número de mes (`1` a `12`). |
| `nombre_mes` | `VARCHAR(20)` | `NOT NULL` | Nombre del mes calendario. |
| `trimestre` | `INTEGER` | `NOT NULL` | Trimestre del año (`1` a `4`). |
| `anio` | `INTEGER` | `NOT NULL` | Año del relevamiento (`2024`). |

### 5.2 Tabla `dim_geografia` (5.189 registros)
| Columna | Tipo SQL | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `geografia_id` | `SERIAL` | `PRIMARY KEY` | Clave subrogada de la ubicación postal/ciudad. |
| `province` | `VARCHAR(2)` | `NOT NULL` | Código postal de 2 letras del estado (`CA`, `TX`, `NY`, etc.). |
| `state_name` | `VARCHAR(100)` | `NOT NULL` | Nombre completo del estado. |
| `census_region` | `VARCHAR(50)` | `NOT NULL` | Región oficial del Censo (`West`, `South`, `Midwest`, `Northeast`). |
| `city` | `VARCHAR(120)` | `NOT NULL` | Nombre normalizado de la ciudad. |
| `postal_code` | `VARCHAR(10)` | `NOT NULL` | Código ZIP de 5 dígitos. |
| `population_total` | `BIGINT` | `NOT NULL` | Población oficial del estado (*U.S. Census Bureau*). |

### 5.3 Tabla `dim_cadena` (466 registros)
| Columna | Tipo SQL | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `cadena_id` | `SERIAL` | `PRIMARY KEY` | Clave subrogada de la cadena de comida rápida. |
| `nombre_cadena` | `VARCHAR(150)` | `UNIQUE NOT NULL` | Nombre normalizado de la cadena (ej. `McDonald's`). |
| `categoria_principal` | `VARCHAR(100)` | `NOT NULL` | Rubro gastronómico (`Burgers & Grill`, `Tex-Mex`, `Pizza & Italian`, etc.). |

### 5.4 Tabla `fact_locales_consumo` (9.904 registros)
| Columna | Tipo SQL | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `hecho_id` | `SERIAL` | `PRIMARY KEY` | Clave subrogada del registro de hecho. |
| `tiempo_id` | `INTEGER` | `FK -> dim_tiempo` | Referencia a la fecha de corte del relevamiento. |
| `geografia_id` | `INTEGER` | `FK -> dim_geografia` | Referencia a la ubicación geográfica del local. |
| `cadena_id` | `INTEGER` | `FK -> dim_cadena` | Referencia a la cadena gastronómica. |
| `latitude` | `NUMERIC(10,6)` | `NOT NULL` | Latitud geográfica de la sucursal. |
| `longitude` | `NUMERIC(10,6)` | `NOT NULL` | Longitud geográfica de la sucursal. |
| `cantidad_locales` | `INTEGER` | `NOT NULL DEFAULT 1` | **Métrica aditiva:** Valor `1` por sucursal física activa. |
| `calorias_diarias_promedio_ff` | `NUMERIC(8,2)` | `NOT NULL` | Ingesta calórica diaria promedio de *fast food* en el estado (`kcal`). |
| `pct_consumo_diario` | `NUMERIC(6,2)` | `NOT NULL` | Porcentaje de adultos que consumen *fast food* diariamente (`%`). |
| `tasa_obesidad_pct` | `NUMERIC(6,2)` | `NOT NULL` | Prevalencia de obesidad adulta en el estado (`%`). |

---

## 6. Descripción del Dashboard en Power BI

El dashboard construido en **Power BI Desktop** importa las 4 tablas del modelo estrella (`dim_tiempo`, `dim_geografia`, `dim_cadena`, `fact_locales_consumo`), aplica tipado y columnas calculadas en **Power Query** y define medidas **DAX** para los 3 KPIs:

- **Tarjetas Superiores de KPIs:** Destaca como **KPI Principal la Densidad Nacional de Locales (`DLFF = 2,96 locales / 100k hab.`)**, acompañada por la **Participación de Mercado de la Cadena Líder (`PMC = 21,29% McDonald's`)** y la **Tasa Promedio de Consumo Diario Ponderada (`TPCD = 36,13%`)** junto con la tasa de obesidad nacional (`32,60%`).
- **2 Filtros Interactivos (Segmentadores):** Filtro por **Región Censal (`census_region`)** y Filtro por **Cadena / Categoría Principal (`nombre_cadena` / `categoria_principal`)**.
- **Las 4 Visualizaciones y la Pregunta de Negocio que responde cada una:**
  1. **Visual 1 (Gráfico de Barras Horizontales con Línea de Referencia Nacional):** Titulado con la **Pregunta 1**, muestra el Top 5 de estados con mayor `DLFF` comparados contra la línea constante del promedio nacional (`2,96`).
  2. **Visual 2 (Gráfico de Dispersión / Burbujas por Estado y Región):** Titulado con la **Pregunta 2**, cruza en el eje X la densidad `DLFF`, en el eje Y el consumo diario `TPCD` (`%`) y en el tamaño/color de burbuja la tasa de obesidad (`tasa_obesidad_pct`) por región censal.
  3. **Visual 3 (Gráfico de Columnas 100% Apiladas / Matriz por Región):** Titulado con la **Pregunta 3**, exhibe la distribución de la cuota de mercado (`PMC %`) de las principales cadenas en cada una de las 4 regiones censales.
  4. **Visual 4 (Gráfico Combinado de Columnas y Línea por Región y Trimestre):** Titulado con la **Pregunta 4**, muestra las regiones que superan el umbral de `900 kcal` diarias en los relevamientos 2024 (`South` y `Midwest`) junto con la cantidad de sucursales que operan en ellas.

---

## 7. Hallazgos Analíticos y Recomendación de Negocio / Salud Pública

A partir de las consultas SQL ejecutadas sobre `dw_fastfood` (`sql/02_consultas_analiticas.sql`), se obtuvieron los siguientes hallazgos cuantitativos:

1. **Hallazgo P1 — Los 5 estados con mayor densidad de oferta (`DLFF`) superan entre 2,2 y 3,8 veces la media nacional (`2,96`):**
   - El ranking nacional de concentración de locales cada 100.000 habitantes está liderado por **South Dakota (`SD`, `11,20` locales/100k hab., `+8,24` sobre la media nacional y `35,1%` de obesidad)**, seguido por **Kentucky (`KY`, `7,11` locales/100k hab. y `37,7%` de obesidad)**, **New Mexico (`NM`, `7,05`)**, **Wyoming (`WY`, `7,02`)** y **Vermont (`VT`, `6,49`)**.
2. **Hallazgo P2 — Fuerte asociación positiva entre densidad regional de locales, consumo diario (`TPCD`) y prevalencia de obesidad:**
   - Las regiones con mayor densidad de restaurantes cada 100.000 habitantes son **Midwest (`3,91` locales/100k hab.)** y **South (`3,17` locales/100k hab.)**. Ambas registran simultáneamente las tasas más altas de consumo diario de comida rápida (**`37,69%`** en Midwest y **`38,90%`** en South) y las mayores tasas ponderadas de obesidad adulta (**`35,14%`** en Midwest y **`34,90%`** en South).
   - En el extremo opuesto, **West (`2,56` locales/100k hab.)** y **Northeast (`1,87` locales/100k hab.)** exhiben un consumo diario significativamente menor (**`33,43%`** y **`31,67%`**) y tasas de obesidad casi 6 puntos porcentuales más bajas (**`28,85%`** y **`29,48%`**).
3. **Hallazgo P3 — Concentración oligopólica liderada por McDonald's (`21,29%` nacional) con marcados nichos regionales:**
   - Las 4 cadenas principales (*McDonald's* `21,29%`, *Burger King* `11,56%`, *Taco Bell* `8,66%` y *Wendy's* `7,41%`) concentran casi el **`49%`** de todos los locales del país.
   - *McDonald's* alcanza su mayor dominio relativo en el **Northeast (`26,95%` de los locales de esa región)**, mientras que cadenas como **SONIC Drive In** tienen una presencia fuertemente concentrada en el **South (`5,62%`, `232` locales)** frente a apenas `0,47%` (`5` locales) en el Northeast.
4. **Hallazgo P4 — Las regiones `South` y `Midwest` superan el umbral crítico de `900 kcal/día` y concentran el `68,87%` de las sucursales del país:**
   - Solo **dos regiones** superan las `900 kcal` diarias promedio provenientes de *fast food*: **`South` (`944,9 kcal/día`, con `4.130` sucursales operativas y `35,76%` de obesidad)** y **`Midwest` (`925,1 kcal/día`, con `2.691` sucursales operativas y `35,26%` de obesidad)**. Entre ambas reúnen **`6.821` locales sobre los `9.904` del país**.

### Recomendación Estratégica Dual (Comercial y Sanitaria)
1. **Desde la perspectiva de Expansión Comercial (Nuevas Franquicias Saludables / Fast Casual):** Evitar la sobre-expansión de formatos tradicionales hipercalóricos en estados saturados del **Midwest y South** (`SD`, `KY`, `OH`, `IN`) y priorizar la introducción de líneas de menú bajas en calorías (`< 600 kcal`) en las regiones **South y Midwest**, así como la apertura de nuevas sucursales en estados de baja densidad por habitante en el **Northeast (`1,87` locales/100k hab.)** y **West (`2,56` locales/100k hab.)**.
2. **Desde la perspectiva de Salud Pública Preventiva:** Focalizar las campañas de etiquetado nutricional calórico y regulación de entornos alimentarios en los **29 estados de las regiones `South` y `Midwest`** (especialmente en estados como *Kentucky, West Virginia, Mississippi, Louisiana y Oklahoma*, donde el consumo diario supera el `40%` y la obesidad adulta supera el `37%`).

---

## 8. Limitaciones del Trabajo
1. **Falacia ecológica / Granularidad estatal de los indicadores de salud:** Los datos de consumo diario (`pct_consumo_diario`), calorías (`calorias_diarias_promedio_ff`) y obesidad (`tasa_obesidad_pct`) están agregados a nivel estatal, por lo que reflejan el contexto epidemiológico donde opera cada sucursal pero no miden la dieta individual de cada cliente que ingresa a un local específico.
2. **Muestra de oferta física sin volumen de facturación por ticket:** La Fuente 1 provee una muestra representativa de `10.000` locales georreferenciados, pero no desagrega la cantidad de tickets vendidos por día en cada sucursal.
