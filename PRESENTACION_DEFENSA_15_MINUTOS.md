# Guión y Estructura de la Defensa Oral (15 Minutos)
## Trabajo Integrador AE4 — Gestión Avanzada de Bases de Datos (2026)
### “Integración de Datos y Analítica: Desempeño Comercial y Expansión Territorial de Fast Food en EE. UU.”

- **Modalidad:** Exposición grupal (2 o 3 integrantes) — **Duración total:** 15 minutos + ronda de preguntas individuales.
- **Enfoque clave de evaluación:** Los profesores (Gabriel del Rosario, Marcos Portel, Victoria Fernández) evaluarán el **hilo conductor verificable**:
  *Qué se quería conocer (Negocio) → Qué datos se procesaron (ETL) → Cómo se modeló (DW PostgreSQL) → Qué se muestra (Power BI) → Qué decisión permite tomar.*

---

## Estructura de Tiempos Recomendada (15 Minutos)

| Bloque | Minutos | Tema Principal | Responsable Sugerido |
| :---: | :---: | :--- | :--- |
| **Bloque 1** | `00:00 - 02:30` (2,5 min) | Contexto de Negocio, 4 Preguntas, 3 KPIs y Criterios | Integrante 1 |
| **Bloque 2** | `02:30 - 06:00` (3,5 min) | Fuentes de Datos, Pipeline ETL y Validaciones de Merge | Integrante 2 (Matias) |
| **Bloque 3** | `06:00 - 09:30` (3,5 min) | Data Warehouse en PostgreSQL (Modelo Estrella, DDL, Índices) | Integrante 1 o 2 |
| **Bloque 4** | `09:30 - 13:00` (3,5 min) | Dashboard Power BI (Demostración de los 4 Visuales y Filtros) | Integrante 3 (Compañera Windows) |
| **Bloque 5** | `13:00 - 15:00` (2,0 min) | Hallazgos Analíticos Concretos, Decisión de Negocio y Cierre | Todo el grupo |

---

## Diapositiva por Diapositiva: Contenido y Qué Decir

### Diapositiva 1: Portada
- **Título:** Desempeño Comercial y Expansión Territorial de Cadenas de Fast Food en EE. UU. (2023–2024).
- **Subtítulo:** Trabajo Integrador AE4 — Gestión Avanzada de Bases de Datos.
- **Qué decir:** *"Buenas tardes profesores. Hoy presentamos nuestro Trabajo Integrador AE4 donde integramos de punta a punta un flujo de analítica de datos: desde la ingestión de fuentes con Python, el modelado dimensional en PostgreSQL y la visualización analítica en Power BI, enfocado en responder decisiones estratégicas de expansión para un grupo franquiciante gastronómico."*

### Diapositiva 2: Contexto del Negocio y Definición del Problema
- **Contenido:**
  - Industria de comida rápida en EE. UU.: mercado masivo y altamente competitivo.
  - Alcance: `9.949` sucursales de `468` cadenas en las 4 regiones del país.
  - Objetivo: Responder dónde abrir nuevas sucursales, qué categorías priorizar y cómo amortiguar la estacionalidad.

### Diapositiva 3: Las 4 Preguntas de Negocio y los 3 KPIs
- **Contenido:**
  - **P1 (Tiempo):** ¿Cómo evolucionaron los ingresos trimestrales (2023–2024) y qué trimestre concentra el pico de demanda?
  - **P2 (Cadena):** ¿Qué categorías gastronómicas lideran la facturación y cuál logra el mayor ingreso promedio por local?
  - **P3 (Ubicación):** ¿Qué estados concentran mayor facturación vs. saturación de locales por habitante?
  - **P4 (Cruce Multidimensional):** ¿Cómo varía el ticket promedio y margen de las top 10 cadenas según la región en 2024?
  - **KPIs:**
    - **KPI 1 (Principal):** Ingreso Total Acumulado = `SUM(ventas_usd)` (**$55.439,69 M USD**).
    - **KPI 2:** Ticket Promedio por Orden = `SUM(ventas_usd) / SUM(cantidad_ordenes)` (**$12,27 USD/orden**).
    - **KPI 3:** Margen Operativo Bruto = `((SUM(ventas_usd) - SUM(costo_operativo_usd)) / SUM(ventas_usd)) * 100` (**35,53%**).

### Diapositiva 4: Fuentes de Datos y Criterio de Construcción (Punto 3.2)
- **Contenido:**
  - **Fuente 1 (Real y Externa):** `FastFoodRestaurants.csv` (Kaggle/Datafiniti) → Padrón físico con `10.000` locales de comida rápida en EE. UU. (dirección, coordenadas, cadena, ciudad, estado).
  - **Fuente 2 (Construida por el Grupo):** `operaciones_franquicias_2023_2024.csv` → Complementa a la Fuente 1 con 8 cierres trimestrales por sucursal (`2023–2024`), clasificación gastronómica, población y regiones oficiales del *U.S. Census Bureau*, y métricas aditivas (`ventas_usd`, `cantidad_ordenes`, `costo_operativo_usd`).

### Diapositiva 5: Pipeline ETL y Calidad de Datos (Python/pandas)
- **Contenido:**
  - **Limpieza Fuente 1:** Reparación de 20 filas con comas internas en `address` que desplazaban columnas; filtrado de `51` sucursales con coordenadas fuera de EE. UU.; unificación de cadenas de `540` a `468` nombres únicos; corrección de estado `Co Spgs` → `CO`.
  - **Limpieza Fuente 2:** Eliminación de `150` duplicados exactos; descarte de `40` registros con ventas ≤ 0; imputación de `80` nulos en `segmento_precio` (por valor de la misma sucursal) y `120` nulos en `costo_operativo_usd` (por mediana del ratio de su categoría).

### Diapositiva 6: Estrategia de Merge y Validaciones Post-Merge
- **Contenido:**
  - Clave de cruce: `sucursal_key` (normalizada en minúsculas).
  - Justificación de `INNER JOIN`: Las `408` operaciones que no cruzan pertenecen exactamente a las `51` sucursales excluidas por estar fuera del territorio estadounidense ($51 \times 8 = 408$).
  - Validaciones: `79.552` hechos finales, `9.949` sucursales integradas, `0` nulos introducidos, `0` duplicados post-cruce.

### Diapositiva 7: Data Warehouse en PostgreSQL (`dw_fastfood`)
- **Contenido:**
  - **Modelo Estrella (Star Schema):** 1 tabla de hechos (`fact_ventas`, `79.552` filas) y 3 dimensiones físicas (`dim_tiempo` con `731` días, `dim_cadena` con `468` cadenas, `dim_ubicacion` con `5.189` ubicaciones).
  - Índices B-Tree en PostgreSQL sobre las 3 claves foráneas (`tiempo_id`, `cadena_id`, `ubicacion_id`) para acelerar joins analíticos.

### Diapositiva 8: Demostración del Dashboard en Power BI
- **Contenido:**
  - Relaciones 1 a muchos entre dimensiones y hechos, medidas DAX de los 3 KPIs y 2 segmentadores interactivos (Año y Región).
  - Los 4 visuales respondiendo P1, P2, P3 y P4 en sus respectivos títulos/subtítulos.

### Diapositiva 9: Hallazgos Clave del Negocio
- **Contenido:**
  1. **Estacionalidad (P1):** Crecimiento interanual del +9,66% en 2024. El **T3 (verano)** concentra el pico anual (**$7.821,16 M USD** en 2024), superando en **+20,5%** al T1 (invierno).
  2. **Formatos (P2):** *Burgers QSR* lidera en volumen ($31.712 M USD), pero **`Fast Casual`** lidera en ingreso por local (**$7,50 M USD/local** en *Chicken* y **$6,49 M USD/local** en *Tex-Mex* en el bienio).
  3. **Geografía (P3 y P4):** El **Midwest (Ohio, Indiana)** está saturado con `46–55` locales por millón de habitantes y menor ticket promedio ($11,45). En cambio, **West (California)** y **Northeast (Nueva York)** tienen baja densidad (`13–17` locales/M hab.) y los tickets más altos del país ($13 a $21,55 USD/orden).

### Diapositiva 10: Recomendaciones de Negocio y Conclusiones
- **Contenido:**
  - **Decisión 1 (Expansión):** Priorizar aperturas de cadenas *Fast Casual* (*Chicken & Wings* y *Tex-Mex*) en California y la región Northeast.
  - **Decisión 2 (Mitigación):** Frenar aperturas en el Midwest e implementar promociones de invierno en T1 para compensar la caída estacional.
