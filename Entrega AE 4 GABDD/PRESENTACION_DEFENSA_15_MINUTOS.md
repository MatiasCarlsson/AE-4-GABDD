# Guión y Estructura de la Defensa Oral (15 Minutos)
## Trabajo Integrador AE4, Gestión Avanzada de Bases de Datos (2026)
### “Oferta Comercial de Fast Food, Consumo Calórico y Prevalencia de Obesidad en EE. UU.”

- **Modalidad:** Exposición grupal (2 o 3 integrantes), **Duración total:** 15 minutos + preguntas individuales.
- **Hilo conductor evaluado por la cátedra:**
  *Preguntas de Negocio y KPIs → Fuentes y ETL en Python/pandas → Modelo Estrella en PostgreSQL (`dw_fastfood`) → Dashboard en Power BI → Hallazgos y Decisión.*

---

## Distribución de Tiempos Sugerida (15 Minutos)

| Bloque | Tiempo | Contenido | Responsable Sugerido |
| :---: | :---: | :--- | :--- |
| **Bloque 1** | `00:00 - 02:30` (2,5 min) | Contexto sanitario/comercial, 4 preguntas de negocio y 3 KPIs (`DLFF`, `PMC`, `TPCD`) | Integrante 1 |
| **Bloque 2** | `02:30 - 06:00` (3,5 min) | Fuentes de datos, limpieza en Python/pandas y validaciones del `merge` por `province` | Integrante 2 (Matias) |
| **Bloque 3** | `06:00 - 09:30` (3,5 min) | Modelo Estrella en PostgreSQL (`dim_tiempo`, `dim_geografia`, `dim_cadena`, `fact_locales_consumo`) | Integrante 1 o 2 |
| **Bloque 4** | `09:30 - 13:00` (3,5 min) | Demostración del Dashboard en Power BI (medidas DAX, 2 filtros y las 4 visualizaciones) | Integrante 3 (Compañera Windows) |
| **Bloque 5** | `13:00 - 15:00` (2,0 min) | Hallazgos cuantitativos, recomendación dual (comercial y salud pública) y cierre | Todo el grupo |

---

## Contenido por Diapositiva y Qué Explicar

### Diapositiva 1: Portada
- **Título:** Análisis de la Oferta Comercial de Comida Rápida, Patrones de Consumo Calórico y Prevalencia de Obesidad en EE. UU.
- **Qué decir:** *"Buenas tardes profesores. Nuestro trabajo integrador cruza la oferta geolocalizada de 9.904 locales de comida rápida en EE. UU. con los indicadores demográficos, calóricos y de obesidad adulta por estado del Censo y del CDC, integrando el ETL en Python, el Data Warehouse en PostgreSQL y la visualización en Power BI."*

### Diapositiva 2: Contexto, las 4 Preguntas y los 3 KPIs
- **Preguntas:**
  - **P1:** ¿Cuáles son los 5 estados con mayor densidad de locales cada 100.000 habitantes (`DLFF`) vs. el promedio nacional?
  - **P2:** ¿Existe relación entre la densidad regional de locales y el porcentaje de consumo diario (`TPCD`) y obesidad?
  - **P3:** ¿Cómo se distribuye la cuota de mercado (`PMC`) de las principales cadenas según las 4 regiones censales?
  - **P4:** ¿Qué regiones superan en los relevamientos 2024 las `900 kcal` diarias de *fast food* y cuántas sucursales operan en ellas?
- **KPIs:**
  - **KPI 1 (Principal, `DLFF`):** `2,96` locales cada 100.000 habitantes.
  - **KPI 2 (`PMC`):** *McDonald's* lidera con `21,29%` de participación nacional.
  - **KPI 3 (`TPCD`):** `36,13%` de consumo diario ponderado (con `32,60%` de obesidad adulta nacional).

### Diapositiva 3: Fuentes de Datos y Proceso ETL (`etl/etl_fastfood_dw.py`)
- **Fuente 1 (Externa):** `FastFoodRestaurants.csv` (`10.000` locales). Limpieza: reparación de `20` filas con comas internas en la dirección, descarte de `51` locales con coordenadas fuera de EE. UU., unificación de nombres de cadenas (`540` a `466`), corrección de `Co Spgs` → `CO`, `postalCode` a 5 dígitos y eliminación de `45` domicilios duplicados → **`9.904` locales limpios**.
- **Fuente 2 (Construida):** `us_states_consumption_demographics.csv` (`54` filas iniciales). Limpieza: normalización de códigos de estado y región, eliminación de `3` duplicados e imputación de `2` nulos por promedio regional → **`51` jurisdicciones limpias**.
- **Merge y Validaciones:** `INNER JOIN` por `province` (`validate="many_to_one"`), integrando los **`9.904` locales** en las **`51` jurisdicciones** con `0` nulos y `0` duplicados.

### Diapositiva 4: Esquema Estrella en PostgreSQL (`dw_fastfood`)
- **4 Tablas físicas:**
  1. `dim_tiempo` (`366` filas: calendario 2024 completo).
  2. `dim_geografia` (`5.189` filas: ciudad, código postal, estado, región censal y población estatal).
  3. `dim_cadena` (`466` filas: cadena normalizada y categoría gastronómica principal).
  4. `fact_locales_consumo` (`9.904` filas: claves foráneas, coordenadas, `cantidad_locales = 1`, calorías diarias, `%` consumo diario y `%` obesidad).

### Diapositiva 5: Hallazgos y Recomendaciones
1. **Top 5 Densidad (`P1`):** South Dakota (`11,20`), Kentucky (`7,11`), New Mexico (`7,05`), Wyoming (`7,02`) y Vermont (`6,49`) duplican o triplican el promedio nacional (`2,96`).
2. **Correlación Regional (`P2` y `P4`):** **South (`944,9 kcal`, `4.130` locales)** y **Midwest (`925,1 kcal`, `2.691` locales)** son las únicas regiones que superan las `900 kcal/día`, concentrando el **`68,87%` de los locales** y las mayores tasas de obesidad (`~35%`) frente a West y Northeast (`~29%`).
3. **Market Share (`P3`):** *McDonald's* lidera en todas las regiones (`21,29%` nacional y `26,95%` en Northeast), mientras cadenas como *SONIC Drive In* son fuertemente regionales (`232` locales en el South vs. `5` en el Northeast).
4. **Decisión:** Focalizar políticas preventivas nutricionales en el *South* y *Midwest*, y orientar nuevas aperturas de formatos saludables hacia estados de baja densidad en el *Northeast* (`1,87` locales/100k hab.) y *West* (`2,56`).
