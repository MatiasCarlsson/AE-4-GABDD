# Guía Paso a Paso para Armar el Dashboard en Power BI (Windows)

Esta guía está pensada para tu compañera de grupo que usa **Windows + Power BI Desktop**. Cumple al 100% con los requisitos del **Punto 3.5 (Visualización)** de la consigna [AE4 GABD 2026.pdf](file:///home/matias/Downloads/Descargas%20de%20Materias/4to-2do%20Cuatrimestre/Gesti%C3%B3n%20Avanzada%20de%20Base%20de%20Datos/Mes%204/AE4%20GABD%202026.pdf):
- **Relaciones entre tablas** (Modelo Estrella de 4 tablas).
- **Uso de Power Query** (transformación documentada).
- **Al menos 1 medida DAX** (incluimos las 3 medidas DAX de los KPIs listas para copiar y pegar).
- **4 visualizaciones como mínimo**, cada una indicando en su título o subtítulo qué pregunta de negocio responde.
- **Los 3 KPIs definidos visibles** (con 1 KPI principal destacado).
- **2 filtros interactivos (Segmentadores de datos / Slicers)** como mínimo.

---

## 1. ¿Qué archivos tenés que pasarle a tu compañera?

Pasale la subcarpeta **`datos/procesados/`** que contiene las **4 tablas físicas del Data Warehouse** ya limpiadas y exportadas desde PostgreSQL:

1. `datos/procesados/dim_tiempo.csv` (`731` filas)
2. `datos/procesados/dim_cadena.csv` (`516` filas)
3. `datos/procesados/dim_ubicacion.csv` (`5.191` filas)
4. `datos/procesados/fact_ventas.csv` (`19.858` filas)

> **Alternativa si ella también tiene PostgreSQL instalado en Windows:** Puede correr `sql/01_creacion_dw.sql` y `etl/etl_fastfood_dw.py` (o importar los CSV directamente desde Power BI Desktop con **Obtener datos -> Texto o CSV**, que es mucho más rápido y no depende de que tenga el servidor levantado al guardar el `.pbix`).

---

## 2. Importación y Uso de Power Query (Requisito obligatorio de Power BI)

1. Abrir **Power BI Desktop** en Windows.
2. Ir a **Inicio -> Obtener datos -> Texto o CSV** y cargar los 4 archivos:
   - `dim_tiempo.csv`
   - `dim_cadena.csv`
   - `dim_ubicacion.csv`
   - `fact_ventas.csv`
3. Antes de hacer clic en "Cargar", hacer clic en **"Transformar datos"** para abrir el editor de **Power Query** y aplicar estos pasos (así queda registrado en el `.pbix` el uso de Power Query que pide la cátedra):
   - **En `dim_tiempo`**:
     - Verificar que `fecha` tenga tipo de dato **Fecha (`Date`)** y `tiempo_id`, `dia`, `mes`, `trimestre`, `año` tengan tipo **Número entero (`Whole Number`)**.
     - Agregar una **Columna personalizada** (pestaña *Agregar columna -> Columna personalizada*) llamada `Periodo_Trimestral` con la fórmula:
       ```powerquery
       "T" & Number.ToText([trimestre]) & " " & Number.ToText([año])
       ```
     - Agregar otra **Columna personalizada** llamada `Orden_Trimestre` (para ordenar cronológicamente el eje X) con la fórmula:
       ```powerquery
       [año] * 10 + [trimestre]
       ```
       *(Cambiar el tipo de `Orden_Trimestre` a Número entero)*.
   - **En `fact_ventas`**:
     - Verificar que `ventas_usd`, `costo_operativo_usd` y `ganancia_neta_usd` tengan tipo **Número decimal fijo / Moneda (`$`)** (usando configuración regional `Inglés (Estados Unidos)` si los decimales tienen punto `.`).
     - Verificar que `cantidad_ordenes`, `tiempo_id`, `cadena_id`, `ubicacion_id` sean **Número entero**.
   - **En `dim_ubicacion`**:
     - Verificar que `codigo_postal` esté como **Texto (`Text`)** (para no perder el cero inicial en códigos postales como `02115`).
4. Hacer clic en **Inicio -> Cerrar y aplicar**.

---

## 3. Configurar las Relaciones del Modelo Estrella (Vista de Modelo)

1. En la barra lateral izquierda de Power BI, ir al ícono **Vista de modelo** (el diagrama de 3 tablas conectadas).
2. Verificar (o arrastrar y soltar) las **3 relaciones `1 a muchos (1:*)`** con **Dirección de filtro cruzado: Único (`Single`)**:
   - `dim_tiempo[tiempo_id]` (`1`) $\longrightarrow$ `fact_ventas[tiempo_id]` (`*`)
   - `dim_cadena[cadena_id]` (`1`) $\longrightarrow$ `fact_ventas[cadena_id]` (`*`)
   - `dim_ubicacion[ubicacion_id]` (`1`) $\longrightarrow$ `fact_ventas[ubicacion_id]` (`*`)
3. En la vista de datos, seleccionar la columna `Periodo_Trimestral` de `dim_tiempo`, ir arriba a **Herramientas de columnas -> Ordenar por columna** y elegir `Orden_Trimestre`.

---

## 4. Crear las Medidas DAX (Los 3 KPIs + Métrica Auxiliar)

Hacer clic derecho sobre la tabla `fact_ventas` en el panel **Datos** -> **Nueva medida**, y pegar una por una estas fórmulas DAX:

### KPI 1 (KPI Principal Destacado): Ingreso Total Acumulado (USD)
```dax
KPI_1_Ingreso_Total_USD = SUM(fact_ventas[ventas_usd])
```
*(En Herramientas de medición, darle formato **Moneda `$`**, con 0 o 2 decimales).*

### KPI 2: Ticket Promedio por Orden (USD / orden)
```dax
KPI_2_Ticket_Promedio_USD = 
DIVIDE(
    SUM(fact_ventas[ventas_usd]),
    SUM(fact_ventas[cantidad_ordenes]),
    0
)
```
*(Darle formato **Moneda `$`**, con 2 decimales. Valor global esperado: **`$12,27`**).*

### KPI 3: Margen Operativo Bruto (%)
```dax
KPI_3_Margen_Operativo_Pct = 
DIVIDE(
    SUM(fact_ventas[ventas_usd]) - SUM(fact_ventas[costo_operativo_usd]),
    SUM(fact_ventas[ventas_usd]),
    0
)
```
*(En Herramientas de medición, hacer clic en el ícono **`%`** con 2 decimales. Valor global esperado: **`35,50%`**).*

### Medida DAX Adicional: Ingreso Promedio por Sucursal (USD / local)
```dax
Ingreso_Promedio_Por_Sucursal_USD = 
DIVIDE(
    [KPI_1_Ingreso_Total_USD],
    DISTINCTCOUNT(fact_ventas[sucursal_key]),
    0
)
```
*(Darle formato **Moneda `$`**).*

---

## 5. Diseño del Lienzo: Filtros, Tarjetas de KPIs y las 4 Visualizaciones

### A. Encabezado y los 2 Filtros Interactivos (Segmentadores / Slicers)
Arriba a la derecha (o en un panel lateral izquierdo), insertar **2 objetos visuales de Segmentación de datos (Slicer)**:
1. **Filtro 1 — Año / Trimestre:** campo `dim_tiempo[año]` (estilo Botones o Menú desplegable).
2. **Filtro 2 — Región de EE. UU. / Categoría Gastronómica:** campo `dim_ubicacion[region_eeuu]` (y opcionalmente un 3er filtro con `dim_cadena[categoria_comida]`).

### B. Fila Superior: Las 3 Tarjetas de KPIs (con el KPI 1 destacado)
Insertar **3 objetos visuales de Tarjeta (Card)**:
1. **Tarjeta Grande Destacada (KPI Principal — color de fondo o borde resaltado):**
   - Campo: `[KPI_1_Ingreso_Total_USD]`
   - Etiqueta: `KPI 1 (Principal): Ingreso Total Acumulado (USD)` (`$1.389,93 M` / `$1,39 mil M`).
2. **Tarjeta Mediana (KPI 2):**
   - Campo: `[KPI_2_Ticket_Promedio_USD]`
   - Etiqueta: `KPI 2: Ticket Promedio por Orden ($12,27 USD/orden)`.
3. **Tarjeta Mediana (KPI 3):**
   - Campo: `[KPI_3_Margen_Operativo_Pct]`
   - Etiqueta: `KPI 3: Margen Operativo Bruto (35,50%)`.

---

### C. Las 4 Visualizaciones Obligatorias (Cada una con la Pregunta que responde en Título/Subtítulo)

> **Regla clave de la consigna (Punto 3.5):** *"4 visualizaciones como mínimo, cada una indicando en su título o subtítulo qué pregunta de negocio responde."* Copiá exactamente estos títulos y subtítulos en **Formato visual -> General -> Título**:

#### Visualización 1 (Arriba Izquierda): Gráfico de Columnas Agrupadas y Líneas
- **Título:** `Evolución Trimestral de Ingresos (USD) y Ticket Promedio (2023–2024)`
- **Subtítulo:** `P1: ¿Cómo evolucionaron los ingresos trimestrales entre 2023 y 2024, y qué trimestre concentra el pico estacional?`
- **Eje X:** `dim_tiempo[Periodo_Trimestral]`
- **Eje Y de columnas:** `[KPI_1_Ingreso_Total_USD]`
- **Eje Y de líneas:** `[KPI_2_Ticket_Promedio_USD]`

#### Visualización 2 (Arriba Derecha): Gráfico de Barras Horizontales Agrupadas
- **Título:** `Facturación Total e Ingreso Promedio por Local según Categoría Gastronómica`
- **Subtítulo:** `P2: ¿Qué categorías gastronómicas lideran la facturación total y cuál presenta el mayor ingreso promedio por local?`
- **Eje Y:** `dim_cadena[categoria_comida]`
- **Eje X:** `[KPI_1_Ingreso_Total_USD]`
- **Información sobre herramientas (Tooltips):** `[Ingreso_Promedio_Por_Sucursal_USD]` y `Recuento distintivo de sucursal_key`.

#### Visualización 3 (Abajo Izquierda): Mapa Coroplético / Mapa de Burbujas (o Gráfico de Dispersión por Estado)
- **Título:** `Volumen de Ventas (USD) vs. Cantidad de Sucursales por Región y Estado de EE. UU.`
- **Subtítulo:** `P3: ¿Qué estados y regiones generan mayor volumen de ventas en relación con su cantidad de sucursales?`
- **Opción Mapa o Dispersión (Scatter chart):**
  - **Valores / Detalles:** `dim_ubicacion[estado_nombre]`
  - **Leyenda:** `dim_ubicacion[region_eeuu]`
  - **Eje X:** `Recuento distintivo de fact_ventas[sucursal_key]` (Cantidad de Sucursales)
  - **Eje Y:** `[KPI_1_Ingreso_Total_USD]`
  - **Tamaño de burbuja:** `[Ingreso_Promedio_Por_Sucursal_USD]`

#### Visualización 4 (Abajo Derecha): Matriz (Matrix) con Formato Condicional
- **Título:** `Ticket Promedio y Margen Operativo (%) de las Principales Cadenas por Región`
- **Subtítulo:** `P4: ¿Cómo varía el ticket promedio y el margen operativo entre las principales cadenas según la región geográfica?`
- **Filas:** `dim_cadena[nombre_cadena]` *(aplicar Filtro de nivel visual: Top N = 10 por `[KPI_1_Ingreso_Total_USD]`)*
- **Columnas:** `dim_ubicacion[region_eeuu]`
- **Valores:** `[KPI_2_Ticket_Promedio_USD]` y `[KPI_3_Margen_Operativo_Pct]`

---

## 6. Guardar para la Entrega

Guardar el archivo como **`Dashboard_FastFood_AE4.pbix`** y colocarlo en la carpeta del proyecto para comprimirlo junto con los scripts y datos en la entrega final.

