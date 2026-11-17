# AE4 GABD (2026) — Oferta Comercial de Fast Food, Consumo Calórico y Obesidad Adulta en EE. UU.

Trabajo Práctico Integrador de **Gestión Avanzada de Bases de Datos (UCP — Ingeniería en Sistemas)** que integra un flujo completo de analítica de datos: extracción y limpieza en **Python / pandas**, modelado dimensional en **PostgreSQL (`dw_fastfood`)**, análisis ponderado en **Power BI (DAX)** y una **presentación web interactiva en React + TypeScript + Vite + Three.js + ECharts**.

---

## Estructura Principal del Repositorio

- `presentacion-web/`: Aplicación web interactiva (Presentación de 18 diapositivas, Dashboard con filtros en tiempo real e Inspector de Base de Datos / Diagrama ER).
- `etl/`: Scripts Python y notebook (`etl_fastfood_dw.py`, `comun.py`, `generar_fuente_complementaria.py`, `ETL_COMPLETO_AE4_GABD.ipynb`).
- `sql/`: Scripts DDL, carga y consultas analíticas SQL (`01_creacion_dw.sql`, `02_carga_dw.sql`, `03_consultas_analiticas.sql`).
- `datos/`: Datasets originales y CSV limpios listos para el Data Warehouse (`dim_tiempo.csv`, `dim_geografia.csv`, `dim_cadena.csv`, `fact_locales_consumo.csv`).
- `INFORME_AE4_GABD_2026.md` / `.pdf`: Informe técnico completo del proyecto.

---

## 1. Obtener o Actualizar el Repositorio

### Caso A: Si NO tenés el repositorio (Clonar por primera vez)

1. Abrí una terminal en la carpeta donde quieras guardar el proyecto.
2. Ejecutá el comando de clonación:
   ```bash
   git clone https://github.com/MatiasCarlsson/AE-4-GABDD.git
   ```
3. Entrá en la carpeta del proyecto:
   ```bash
   cd AE-4-GABDD
   ```

### Caso B: Si YA tenés el repositorio (Actualizar a la última versión)

1. Abrí una terminal dentro de la carpeta del repositorio (`AE-4-GABDD`).
2. Verificá que estés en la rama `main`:
   ```bash
   git checkout main
   ```
3. Descargá y aplicá los últimos cambios del remoto:
   ```bash
   git pull origin main
   ```
   > **Nota:** Si modificaste archivos locales sin hacer commit y `git pull` te lo impide, guardá temporalmente tus cambios antes de actualizar:
   > ```bash
   > git stash
   > git pull origin main
   > git stash pop
   > ```

---

## 2. Ejecución del Proyecto (Paso a Paso)

### A. Presentación Web, Dashboard e Inspector de BD (`presentacion-web/`)

**Requisitos previos:** Node.js `>= 20` y `npm` (o `pnpm`).

1. Entrá a la carpeta de la aplicación web:
   ```bash
   cd presentacion-web
   ```
2. Instalá las dependencias (solo la primera vez o luego de un `git pull` que modifique `package.json`):
   ```bash
   npm install
   ```
3. Iniciá el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
4. Abrí en tu navegador la URL que muestra la terminal (por defecto `http://localhost:5173`).

**Para compilar y probar la versión de producción:**
```bash
npm run build
npm run preview
```

**Controles útiles durante la exposición:**
- `↓` / `↑` / `→` / `←` / `Space`: avanzar o retroceder entre las 18 diapositivas.
- `F`: activar o salir de **Pantalla Completa**.
- `O`: mostrar u ocultar las etiquetas de **Oradores** en cada diapositiva.
- Pestañas superiores: alternar entre **Presentación (18)**, **Dashboard** (filtros DAX interactivos) y **Base de Datos** (Esquema Estrella, DER en Mermaid y scripts).

---

### B. Re-ejecutar el Pipeline ETL en Python (`etl/`) *(opcional)*

Los CSV limpios ya están generados en `datos/procesados/`. Si querés correr el ETL desde cero:

1. Desde la raíz del repositorio, creá y activá un entorno virtual:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate        # En Windows PowerShell: .venv\Scripts\Activate.ps1
   ```
2. Instalá las dependencias Python:
   ```bash
   pip install -r requirements.txt
   ```
3. Ejecutá el pipeline:
   ```bash
   python etl/etl_fastfood_dw.py
   ```

### C. Crear y Consultar el Data Warehouse en PostgreSQL (`sql/`) *(opcional)*

1. Creá la base de datos `dw_fastfood` en PostgreSQL.
2. Ejecutá los scripts en orden:
   - `sql/01_creacion_dw.sql` (crea tablas dimensionales, hechos e índices B-Tree).
   - `sql/02_carga_dw.sql` (carga los 4 CSV de `datos/procesados/`).
   - `sql/03_consultas_analiticas.sql` (responde P1–P4 con CTEs anti doble conteo).

---

## 3. Guía de Exposición y Speech para 2 Oradores

La defensa se divide en **2 roles complementarios**:
- **Matías Viana Carlsson — Ingeniería de Datos:** Fuentes, limpieza ETL en Python/pandas, Data Warehouse Estrella en PostgreSQL, clasificación de marcas y factibilidad técnica.
- **Hannah Bojanovich — Analítica de Negocio y Visualización:** Problemática inicial, preguntas de investigación, KPIs, modelado Power BI / DAX, lectura de gráficos (P1–P4) y recomendaciones sanitarias.

---

### ORADOR 1: Matías Viana Carlsson (ETL, Limpieza y Data Warehouse)

#### Diapositivas asignadas
- **Diapositiva 01** (*Portada* — co-apertura)
- **Diapositiva 02** (*Pregunta Disparadora* — cierre técnico del propósito)
- **Diapositiva 05** (*Fuentes y Merge por `province`*)
- **Diapositiva 06** (*Pipeline ETL: 5 Reglas de Limpieza y Auditoría*)
- **Diapositiva 07** (*Esquema Estrella `dw_fastfood` en PostgreSQL*)
- **Diapositiva 08** (*Anatomía de la Oferta: 466 Marcas en 8 Categorías*)
- **Diapositiva 15** (*Trazabilidad Completa* — columna ETL y DW)
- **Diapositiva 16** (*Triple Alerta vs. 4 Plazas de Oportunidad* — plazas comerciales)
- **Diapositiva 17** (*Recomendaciones y Limitaciones* — L1 a L4)
- **Diapositiva 18** (*Cierre* — despedida conjunta)

#### Conceptos que Matías tiene que dominar (posibles preguntas del tribunal)
1. **Reproducibilidad del ETL:** Nunca se editan los CSV crudos a mano; toda reparación vive en `etl/etl_fastfood_dw.py` para poder re-ejecutarse sin intervención manual.
2. **Parser CSV roto (20 filas):** Algunas direcciones en `FastFoodRestaurants.csv` traían comas internas mal entrecomilladas, desplazando columnas; se recompusieron programáticamente sin perder filas válidas.
3. **Validación geográfica (-51 sucursales):** Existían registros con longitudes positivas (ej. `+90°` en Asia Central); se filtró el bounding box continental + Alaska/Hawái de EE. UU.
4. **Normalización con Regex (`540 → 466` marcas):** Se unificaron variantes tipográficas (como 7 formas distintas de *McDonald's*, tildes o apóstrofos) normalizando una clave y eligiendo la etiqueta más frecuente (moda).
5. **Integración `INNER JOIN` con `validate="many_to_one"`:** Garantiza que muchas sucursales se cruzan contra **exactamente una** fila por estado (`province`) en la fuente demográfica, evitando multiplicación cartesiana de filas.
6. **Imputación regional en Fuente 2 (`54 → 51`):** Se eliminaron 3 jurisdicciones no comparables/duplicadas y se imputaron `DE` (Delaware) y `ND` (North Dakota) usando el promedio de su misma región censal para no sesgar los totales.
7. **Esquema Estrella (`dw_fastfood`) y doble conteo:** `fact_locales_consumo` (`9.904` filas) tiene granularidad **1 fila = 1 local físico**. Como `dim_geografia` (`5.189` filas) está al nivel ciudad/código postal, `population_total` se repite por código postal; por eso en SQL se usan `CTE` agrupando primero por `province` con `MAX(population_total)` antes de sumar poblaciones.
8. **Métricas aditivas vs. semi-aditivas:** `cantidad_locales = 1` se puede sumar libremente (`SUM`), mientras que `% consumo`, `% obesidad` y `calorías` son atributos estatales que no deben sumarse entre filas de sucursales.

#### Speech de Matías (diapositiva por diapositiva)

- **Diapositiva 01 — Portada *(turno después del saludo de Hannah)*:**
  > *"Como mencionaba Hannah, la arquitectura técnica parte de `10.000` registros crudos que depuramos en Python y pandas, consolidamos en un esquema estrella en PostgreSQL con `9.904` locales validados y `466` cadenas, y explotamos finalmente en un tablero ponderado en Power BI."*

- **Diapositiva 02 — Pregunta Disparadora *(complemento tras Hannah)*:**
  > *"Para responder si ese casi 70% refleja riesgo sanitario o saturación comercial sin caer en sesgos, no podíamos trabajar con archivos planos sueltos: necesitábamos un ETL auditable que integre geografía, población y salud en un único modelo estrella."*

- **Diapositiva 05 — Fuentes y Merge:**
  > *"Integramos dos fuentes heterogéneas mediante la clave estatal `province`. Por la izquierda tenemos la fuente externa de Datafiniti (`FastFoodRestaurants.csv`) con `10.000` locales georreferenciados, pero sin ningún dato de población ni salud. Por la derecha, construimos una fuente demográfica y epidemiológica de 2024 combinando Censo y CDC. El cruce lo realizamos con un `INNER JOIN` validado estrictamente con `validate='many_to_one'`, asegurando que las `9.904` sucursales limpias encajen en exactamente `51` jurisdicciones con cero nulos."*

- **Diapositiva 06 — Pipeline ETL:**
  > *"Toda la limpieza está automatizada en `etl/etl_fastfood_dw.py` en cinco reglas auditables: primero, reparamos `20` filas cuyo parser se corría por comas dentro de la dirección; segundo, descartamos `51` locales con coordenadas fuera de EE. UU. (como longitudes positivas en Asia); tercero, aplicamos expresiones regulares y moda para reducir `540` variantes ortográficas a `466` marcas reales; cuarto, corregimos abreviaturas como `Co Spgs` a `CO`, estandarizamos códigos postales a 5 dígitos y eliminamos `45` duplicados, llegando a `9.904` locales únicos; y quinto, en la segunda fuente bajamos de `54` a `51` jurisdicciones imputando los dos nulos (`DE` y `ND`) con la media de su región censal."*

- **Diapositiva 07 — Esquema Estrella (`dw_fastfood`):**
  > *"El Data Warehouse en PostgreSQL sigue un esquema estrella clásico con tres dimensiones indexadas con B-Tree y una tabla de hechos central: `dim_tiempo` con los `366` días de 2024, `dim_cadena` con las `466` franquicias categorizadas y `dim_geografia` con `5.189` áreas postales. En el centro, `fact_locales_consumo` tiene granularidad de un local por fila, separando nuestra métrica aditiva `cantidad_locales = 1` de las tres métricas semi-aditivas de salud. Un detalle técnico clave: como `population_total` vive en `dim_geografia` repetida por código postal, nuestras consultas SQL usan `CTE` agrupando por `province` con `MAX(population_total)` para evitar el doble conteo poblacional."*

- **Diapositiva 08 — 8 Categorías (`dim_cadena`):**
  > *"Al clasificar las `466` marcas en `8` rubros dentro de `dim_cadena`, vemos una concentración muy marcada: `Burgers & Grill` por sí sola explica el `54,33%` de las tiendas (`5.381` locales repartidos en apenas `74` cadenas). Le siguen `Sandwiches & Subs` y `Tex-Mex`, mientras que en el otro extremo tenemos `231` marcas locales —casi la mitad del catálogo— que apenas reúnen el `5,59%` del parque físico."*

- **Diapositiva 15 — Trazabilidad *(primera mitad)*:**
  > *"En esta matriz de trazabilidad verificamos que cada pregunta de negocio nace en una regla puntual del ETL y aterriza en tablas concretas del Data Warehouse: por ejemplo, limpiar coordenadas y duplicados habilita `P1`, la imputación regional hace completa a `P2`, el regex de marcas sostiene `P3` y el calendario 2024 permite evaluar `P4`."*

- **Diapositiva 16 — Triple Alerta vs. Oportunidad *(plazas comerciales)*:**
  > *"Mientras Hannah detalla los estados críticos, del lado comercial el modelo también revela cuatro plazas claramente sub-penetradas: Nueva York (`1,35`), Nueva Jersey (`1,60`), California (`1,73`) y Massachusetts (`1,84`–`1,88`). Con una densidad promedio de apenas `1,63` locales cada 100.000 habitantes —menos de un tercio que los estados críticos— representan mercado abierto con menor riesgo de canibalización."*

- **Diapositiva 17 — Limitaciones Metodológicas:**
  > *"Para interpretar con rigor estos resultados declaramos cuatro límites: primero, el análisis es a nivel estatal y no clínico individual, evitando la falacia ecológica; segundo, nuestra cuota `PMC` mide locales instalados y no facturación; tercero, trabajamos con un corte único de 2024; y cuarto, la muestra pública captura muy bien grandes cadenas nacionales pero tiene menor cobertura en zonas rurales."*

- **Diapositiva 18 — Cierre *(frase final)*:**
  > *"Con esto completamos el recorrido de extremo a extremo, dejando disponible tanto el Dashboard interactivo como el Inspector del DER. Muchas gracias por su atención y quedamos a disposición del tribunal."*

---

### ORADORA 2: Hannah Bojanovich (Problemática, DAX, Gráficos P1–P4 y Análisis)

#### Diapositivas asignadas
- **Diapositiva 01** (*Portada* — apertura)
- **Diapositiva 02** (*Pregunta Disparadora* — planteo principal)
- **Diapositiva 03** (*Contexto y Sesgo Demográfico*)
- **Diapositiva 04** (*4 Preguntas de Investigación y 3 KPIs*)
- **Diapositiva 09** (*Modelado en Power BI y Medidas DAX*)
- **Diapositiva 10** (*P1: Top 5 Estados por Densidad `DLFF`*)
- **Diapositiva 11** (*P2: Dispersión Regional `DLFF` vs. `TPCD` y Obesidad*)
- **Diapositiva 12** (*P3 Parte A: Cuota de Mercado `PMC %` por Región*)
- **Diapositiva 13** (*P3 Parte B: Duopolio, Fragmentación y Nichos*)
- **Diapositiva 14** (*P4: Regiones por Encima de `900 kcal/día` en 2024*)
- **Diapositiva 15** (*Trazabilidad Completa* — columna Power BI y hallazgos)
- **Diapositiva 16** (*Triple Alerta vs. Oportunidad* — 5 estados en Triple Alerta)
- **Diapositiva 17** (*Recomendaciones Operativas*)

#### Conceptos que Hannah tiene que dominar (posibles preguntas del tribunal)
1. **Sesgo de conteo absoluto vs. tasa relativizada (`DLFF`):** Contar sucursales brutas engaña porque los estados muy poblados (como California) parecen saturados cuando por habitante tienen poca oferta; `DLFF = (Locales / Población) × 100.000` normaliza por tamaño demográfico.
2. **Los 3 KPIs y sus fórmulas:**
   - **KPI 1 (`DLFF`):** `2,96` locales cada `100.000` habitantes (media nacional).
   - **KPI 2 (`PMC`):** Participación porcentual de locales de una cadena sobre el total (`ALL(dim_cadena)` en DAX); *McDonald's* lidera con `21,29%`.
   - **KPI 3 (`TPCD`):** Consumo diario ponderado por población estatal = `36,13%` (en vez de un promedio simple donde un estado chico valdría lo mismo que Texas o California).
3. **Por qué usar `SUMX(VALUES(dim_geografia[province]), CALCULATE(MAX(...)))` en DAX:** Al estar `population_total` repetida en las ciudades/ZIPs de cada estado, si hacés `SUM(population_total)` inflás la población artificialmente. `VALUES(province)` itera una sola vez por estado y toma un único valor con `MAX(...)`.
4. **Configuración regional `en-US` en Power Query:** Necesaria porque los CSV usan punto decimal; además se mantiene `postal_code` como texto para no perder ceros a la izquierda (ej. `"05201"`).
5. **Lectura del diagrama de dispersión (P2) y el caso atípico de Vermont (VT):** Aunque `VT` tiene alta densidad relativa (`6,49`), su población es pequeña y registra bajo consumo diario (`29,4%`) y baja obesidad (`27,6%`), demostrando que la oferta física no determina la obesidad de forma aislada sin contexto socioeconómico/hábito.
6. **Criterio del umbral de `900 kcal/día` (P4):** Representa el 45% de una dieta estándar de `2.000 kcal` aportado únicamente por comida rápida; `South` (`944,9`) y `Midwest` (`925,1`) lo superan y reúnen `6.821` locales (`68,87%`).

#### Speech de Hannah (diapositiva por diapositiva)

- **Diapositiva 01 — Portada *(apertura)*:**
  > *"Buenas tardes profesores. Nuestro trabajo integrador AE4 analiza la relación entre la oferta física de locales de comida rápida en Estados Unidos, la ingesta calórica diaria y la prevalencia de obesidad adulta en las 51 jurisdicciones del país, combinando ingeniería de datos en Python y PostgreSQL con modelado analítico en Power BI."*

- **Diapositiva 02 — Pregunta Disparadora:**
  > *"Antes de ver los datos técnicos, partimos de una pregunta disparadora que le da propósito a todo el estudio: si casi 7 de cada 10 locales —exactamente el `68,87%`— operan en regiones donde la ingesta diaria de fast food ya supera las `900 kcal`, ¿el mapa comercial explica un problema de salud pública o simplemente muestra saturación de mercado? Ese doble enfoque —sanitario y de expansión comercial— guía todo nuestro análisis."*

- **Diapositiva 03 — Contexto y Sesgo Demográfico:**
  > *"El primer error al analizar franquicias es mirar conteos absolutos. California, por ejemplo, encabeza el país con `675` sucursales, pero sobre casi 39 millones de habitantes equivale apenas a `1,73` locales cada `100.000` personas, puesto 49 de 51. En cambio, South Dakota con solo `103` locales llega a `11,20` cada `100.000` habitantes, casi cuatro veces la media nacional. Por eso relativizamos la oferta para separar mercados saturados de plazas sub-penetradas y cruzarlos con indicadores del CDC."*

- **Diapositiva 04 — 4 Preguntas y 3 KPIs:**
  > *"Tradujimos ese problema en cuatro preguntas concretas (`P1` sobre densidad estatal, `P2` sobre correlación con consumo y obesidad, `P3` sobre cuota regional de cadenas y `P4` sobre el umbral calórico de `900 kcal` en 2024) y tres KPIs matemáticos exactos: `DLFF` en `2,96` locales cada `100.000` habitantes, `PMC` liderado por McDonald's con `21,29%`, y `TPCD` ponderado por población en `36,13%` (junto a `32,60%` de obesidad adulta nacional)."*

- **Diapositiva 09 — Modelado en Power BI y DAX:**
  > *"Ya con las tablas limpias que explicó Matías, en Power Query importamos con configuración regional `en-US` para preservar decimales y conservar el código postal como texto. Conectamos las tres dimensiones con relaciones `1:*` de filtro único hacia `fact_locales_consumo`. Y en DAX resolvimos el cálculo ponderado usando iteradores `SUMX(VALUES(dim_geografia[province]), CALCULATE(MAX(...)))`: de ese modo garantizamos que la población y los porcentajes estatales se evalúen exactamente una vez por estado sin duplicarse por código postal."*

- **Diapositiva 10 — P1: Top 5 Densidad (`DLFF`):**
  > *"Pasando a los hallazgos, en la Pregunta 1 vemos los cinco estados de mayor densidad frente a la media nacional de `2,96`. South Dakota lidera por amplio margen con `11,20`, seguida por Kentucky (`7,11`), New Mexico (`7,05`), Wyoming (`7,02`) y Vermont (`6,49`). Kentucky llama especialmente la atención porque combina saturación comercial con `40,5%` de consumo diario y `37,7%` de obesidad. En el extremo opuesto, Nueva York (`1,35`) y California (`1,73`) cierran el ranking."*

- **Diapositiva 11 — P2: Dispersión Regional (`DLFF` vs. `TPCD` y Obesidad):**
  > *"En la Pregunta 2 el diagrama de dispersión con las líneas de media nacional divide claramente al país en cuadrantes. En el cuadrante superior derecho se agrupan `Midwest` (`3,91` de densidad y `35,14%` de obesidad) y `South` (`3,17` y `34,90%`), sacando unos `6` puntos porcentuales de obesidad sobre `West` y `Northeast`, que quedan en el cuadrante inferior izquierdo cerca del `29%`. Además aparece una excepción muy ilustrativa abajo a la derecha: Vermont tiene alta densidad por poca población (`6,49`), pero consumo y obesidad muy bajos (`29,4%` y `27,6%`), confirmando que la densidad física convive con factores culturales."*

- **Diapositiva 12 — P3 (Parte A): Cuota de Mercado (`PMC %`):**
  > *"Para la Pregunta 3 analizamos el Top 8 de cadenas, que concentra `6.587` locales, el `66,51%` de todo el país. McDonald's lidera de forma uniforme en las cuatro regiones censales (`21,29%` nacional), seguido por Burger King (`11,56%`) y Taco Bell (`8,66%`). Si cambiamos a vista 100% apilada, se aprecia cuánto pesa el resto de las `458` cadenas en cada territorio."*

- **Diapositiva 13 — P3 (Parte B): Patrones Competitivos Regionales:**
  > *"De esa matriz surgen tres dinámicas competitivas muy claras: primero, en el `Northeast` hay un duopolio marcado donde McDonald's y Burger King suman `45,26%` del mercado; segundo, en el `West` las 8 grandes pierden hegemonía frente a cadenas regionales de la costa oeste como Jack in the Box o Carl's Jr., mientras Subway alcanza allí su pico (`5,95%`); y tercero, los nichos regionales: SONIC concentra el 60% de sus locales en el `South` (`232` tiendas), y Arby's y Taco Bell destacan fuerte en el `Midwest`."*

- **Diapositiva 14 — P4: Umbral de `900 kcal/día` en 2024:**
  > *"En la Pregunta 4, al enlazar con `dim_tiempo` para 2024, comprobamos qué regiones superan el umbral crítico de `900 kcal/día` provenientes solo de comida rápida —el 45% de una dieta diaria estándar—. Únicamente `South` (`944,9 kcal`) y `Midwest` (`925,1 kcal`) cruzan esa línea roja, concentrando entre ambas `6.821` sucursales, es decir, el `68,87%` de todo el relevamiento nacional."*

- **Diapositiva 15 — Trazabilidad *(segunda mitad)*:**
  > *"Del lado analítico y visual, cada una de esas reglas termina verificándose en un objeto concreto del tablero: barras horizontales con línea de referencia para `P1`, dispersión con tamaño por obesidad para `P2`, barras agrupadas y apiladas para `P3` y columnas duales contra el umbral calórico para `P4`."*

- **Diapositiva 16 — Triple Alerta *(prioridad sanitaria)*:**
  > *"Al cruzar simultáneamente densidad mayor a `5`, consumo diario superior al `38%` y obesidad por encima del `36%`, identificamos cinco estados críticos en **Triple Alerta**: Kentucky, Indiana, Missouri, West Virginia —que alcanza el techo nacional con `41,0%` de obesidad— y Louisiana. Todos pertenecen al bloque `South + Midwest`."*

- **Diapositiva 17 — Decisiones Operativas:**
  > *"En síntesis, el proyecto arroja tres decisiones concretas: primero, evitar canibalización en `SD, KY, ND, IN` y orientar la expansión comercial hacia plazas abiertas como `NY, NJ, CA` y `MA`; segundo, aplicar ingeniería de menú con combos menores a `600 kcal` en los `6.821` locales de `South` y `Midwest`; y tercero, focalizar las políticas públicas de prevención nutricional en los 29 estados críticos de esas dos regiones."*
