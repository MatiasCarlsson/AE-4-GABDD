# Guía Paso a Paso para Armar el Dashboard en Power BI (Windows)

Esta guía está diseñada para tu compañera de grupo que usa **Windows + Power BI Desktop**, alineada 100% con el proyecto de **Oferta de Comida Rápida, Consumo Calórico y Obesidad en EE. UU.** ([contexto_del_proyecto_integrador_de_anal_tica_de_datos.md](file:///home/matias/Downloads/Descargas%20de%20Materias/4to-2do%20Cuatrimestre/Gesti%C3%B3n%20Avanzada%20de%20Base%20de%20Datos/Mes%204/contexto_del_proyecto_integrador_de_anal_tica_de_datos.md)) y el **Punto 3.5** de [AE4 GABD 2026.pdf](file:///home/matias/Downloads/Descargas%20de%20Materias/4to-2do%20Cuatrimestre/Gesti%C3%B3n%20Avanzada%20de%20Base%20de%20Datos/Mes%204/AE4%20GABD%202026.pdf).

---

## 1. ¿Qué archivos tenés que pasarle a tu compañera?

Pasale los **4 archivos CSV limpios** que están en la carpeta **`datos/procesados/`**:

1. `datos/procesados/dim_tiempo.csv` (`366` filas)
2. `datos/procesados/dim_geografia.csv` (`5.189` filas)
3. `datos/procesados/dim_cadena.csv` (`466` filas)
4. `datos/procesados/fact_locales_consumo.csv` (`9.904` filas)

---

## 2. Importación y Transformación en Power Query (Requisito obligatorio)

1. Abrir **Power BI Desktop** en Windows -> **Inicio -> Obtener datos -> Texto o CSV** y seleccionar los 4 archivos.
2. Hacer clic en **"Transformar datos"** para abrir **Power Query** y verificar los tipos (usando Configuración regional `Inglés (Estados Unidos)` para los decimales con punto `.`):
   - **En `dim_tiempo`**:
     - `fecha`: tipo **Fecha (`Date`)**.
     - `tiempo_id`, `dia`, `mes`, `trimestre`, `anio`: tipo **Número entero (`Whole Number`)**.
     - Agregar una **Columna personalizada** llamada `Trimestre_Anio` con la fórmula:
       ```powerquery
       "Q" & Number.ToText([trimestre]) & " " & Number.ToText([anio])
       ```
   - **En `dim_geografia`**:
     - `postal_code`: tipo **Texto (`Text`)** (para conservar el cero inicial en códigos postales como `02115`).
     - `population_total` y `geografia_id`: tipo **Número entero**.
   - **En `fact_locales_consumo`**:
     - `latitude`, `longitude`, `calorias_diarias_promedio_ff`, `pct_consumo_diario`, `tasa_obesidad_pct`: tipo **Número decimal (`Decimal Number`)**.
     - `cantidad_locales`, `tiempo_id`, `geografia_id`, `cadena_id`: tipo **Número entero**.
3. Hacer clic en **Inicio -> Cerrar y aplicar**.

---

## 3. Relaciones del Esquema Estrella (Vista de Modelo)

En el ícono izquierdo **Vista de modelo**, verificar o arrastrar las **3 relaciones `1 a muchos (1:*)`** con filtro único (`Single`):
- `dim_tiempo[tiempo_id]` (`1`) $\longrightarrow$ `fact_locales_consumo[tiempo_id]` (`*`)
- `dim_geografia[geografia_id]` (`1`) $\longrightarrow$ `fact_locales_consumo[geografia_id]` (`*`)
- `dim_cadena[cadena_id]` (`1`) $\longrightarrow$ `fact_locales_consumo[cadena_id]` (`*`)

---

## 4. Medidas DAX para los 3 KPIs y Métricas de Salud (Copiar y Pegar)

Hacer clic derecho sobre `fact_locales_consumo` -> **Nueva medida** y pegar estas medidas DAX una por una:

### Medida Base 1: Total de Locales
```dax
Total_Locales = SUM(fact_locales_consumo[cantidad_locales])
```

### Medida Base 2: Población Total Correcta por Estado (evita sumar varias veces la población de las ciudades de un mismo estado)
```dax
Poblacion_Total_Estados = 
SUMX(
    VALUES(dim_geografia[province]),
    CALCULATE(MAX(dim_geografia[population_total]))
)
```

### KPI 1 (KPI Principal Destacado): Densidad de Locales de Fast Food (`DLFF` cada 100.000 hab.)
```dax
KPI_1_DLFF_Cada_100k = 
DIVIDE([Total_Locales], [Poblacion_Total_Estados], 0) * 100000
```
*(Formato: **Número decimal** con `2` decimales. Valor nacional sin filtros: **`2,96`**).*

### KPI 2: Participación de Mercado por Cadena (`PMC %`)
```dax
KPI_2_PMC_Pct = 
DIVIDE(
    [Total_Locales],
    CALCULATE([Total_Locales], ALL(dim_cadena)),
    0
)
```
*(Formato: **Porcentaje `%`** con `2` decimales. Para McDonald's muestra **`21,29%`**).*

### KPI 3: Tasa Promedio de Consumo Diario Ponderada (`TPCD %`)
```dax
KPI_3_TPCD_Ponderada_Pct = 
VAR Numerador = 
    SUMX(
        VALUES(dim_geografia[province]),
        CALCULATE(MAX(fact_locales_consumo[pct_consumo_diario])) * CALCULATE(MAX(dim_geografia[population_total]))
    )
RETURN
DIVIDE(Numerador, [Poblacion_Total_Estados], 0)
```
*(Formato: **Número decimal** con `2` decimales. Valor nacional sin filtros: **`36,13`** %).*

### Medidas Auxiliares para los Visuales 2 y 4 (Calorías y Obesidad)
```dax
Ingesta_Calorica_Promedio_Kcal = 
AVERAGEX(
    VALUES(dim_geografia[province]),
    CALCULATE(MAX(fact_locales_consumo[calorias_diarias_promedio_ff]))
)
```

```dax
Tasa_Obesidad_Ponderada_Pct = 
VAR Numerador = 
    SUMX(
        VALUES(dim_geografia[province]),
        CALCULATE(MAX(fact_locales_consumo[tasa_obesidad_pct])) * CALCULATE(MAX(dim_geografia[population_total]))
    )
RETURN
DIVIDE(Numerador, [Poblacion_Total_Estados], 0)
```

---

## 5. Diseño del Dashboard: Filtros, Tarjetas y las 4 Visualizaciones

### A. Los 2 Filtros Interactivos (Segmentadores / Slicers)
1. **Filtro 1, Región Censal:** campo `dim_geografia[census_region]`.
2. **Filtro 2, Cadena de Fast Food (o Categoría):** campo `dim_cadena[nombre_cadena]` (y opcionalmente `dim_cadena[categoria_principal]`).

### B. Las 3 Tarjetas de KPIs (Fila Superior)
1. **Tarjeta Principal Destacada (KPI 1):** `[KPI_1_DLFF_Cada_100k]` $\rightarrow$ Título: `KPI 1 (Principal): Densidad de Locales (DLFF cada 100k hab.)` (`2,96`).
2. **Tarjeta 2 (KPI 2):** `[KPI_2_PMC_Pct]` (o filtrada por la cadena Top 1 `McDonald's` = `21,29%`) y `[Total_Locales]` (`9.904`).
3. **Tarjeta 3 (KPI 3):** `[KPI_3_TPCD_Ponderada_Pct]` (`36,13%`) acompañada de `[Tasa_Obesidad_Ponderada_Pct]` (`32,60%`).

---

### C. Las 4 Visualizaciones Obligatorias (Con la Pregunta en el Título/Subtítulo)

#### Visualización 1 (Arriba Izquierda): Gráfico de Barras Horizontales + Línea Constante
- **Título:** `Top 5 Estados con Mayor Densidad de Locales cada 100.000 Habitantes (DLFF)`
- **Subtítulo:** `P1: ¿Cuáles son los 5 estados con mayor densidad de locales cada 100.000 hab. y cómo se comparan con el promedio nacional (2,96)?`
- **Eje Y:** `dim_geografia[state_name]` *(Filtro de nivel visual: Top N = 5 por `[KPI_1_DLFF_Cada_100k]`)*
- **Eje X:** `[KPI_1_DLFF_Cada_100k]`
- **Línea constante en el panel Análisis:** Valor `2.96` con etiqueta `Promedio Nacional (2,96)`.

#### Visualización 2 (Arriba Derecha): Gráfico de Dispersión (Scatter Plot)
- **Título:** `Relación entre Densidad de Restaurantes (DLFF), Consumo Diario (TPCD %) y Obesidad`
- **Subtítulo:** `P2: ¿Existe relación entre la densidad regional de restaurantes y el porcentaje de población adulta que consume comida rápida diariamente?`
- **Valores / Detalles:** `dim_geografia[state_name]`
- **Leyenda:** `dim_geografia[census_region]`
- **Eje X:** `[KPI_1_DLFF_Cada_100k]`
- **Eje Y:** `[KPI_3_TPCD_Ponderada_Pct]`
- **Tamaño de burbuja:** `[Tasa_Obesidad_Ponderada_Pct]`

#### Visualización 3 (Abajo Izquierda): Gráfico de Barras Agrupadas o Matriz por Región
- **Título:** `Cuota de Mercado (PMC %) de las Principales Cadenas por Región Censal`
- **Subtítulo:** `P3: ¿Cómo se distribuye la cuota de mercado (market share) de las principales cadenas según las 4 regiones censales de EE. UU.?`
- **Eje X / Filas:** `dim_cadena[nombre_cadena]` *(Filtro Top N = 8 por `[Total_Locales]`)*
- **Leyenda / Columnas:** `dim_geografia[census_region]`
- **Eje Y / Valores:** `[KPI_2_PMC_Pct]` y `[Total_Locales]`

#### Visualización 4 (Abajo Derecha): Gráfico de Columnas y Líneas por Región y Corte Temporal
- **Título:** `Regiones con Ingesta Calórica Diaria > 900 kcal y Sucursales Operativas (Relevamiento 2024)`
- **Subtítulo:** `P4: ¿Qué regiones presentan una ingesta calórica diaria promedio de fast food superior a 900 kcal y cuántas sucursales operan en ellas?`
- **Eje X:** `dim_geografia[census_region]` (con jerarquía hacia `dim_tiempo[Trimestre_Anio]`)
- **Eje Y de columnas:** `[Total_Locales]`
- **Eje Y de línea:** `[Ingesta_Calorica_Promedio_Kcal]` (con línea de referencia horizontal en `900 kcal`).

---

## 6. Guardar el Archivo para la Entrega

Guardar como **`Dashboard_FastFood_Salud_AE4.pbix`** para incluirlo en la carpeta comprimida `.zip` de la entrega final.
