# **Guion de exposición – Trabajo Práctico Integrador**

**Gestión Avanzada de Bases de Datos**

## **PARTE 1\. PRESENTACIÓN (DIAPOSITIVAS 01 A 16\)**

### **Slide 01 — Portada**

**Oradora: Hannah**

Buenos días a todos. Junto con Matías vamos a presentar nuestro Trabajo Práctico Integrador de Gestión Avanzada de Bases de Datos.

Para este proyecto elegimos abordar una problemática de salud pública: la relación entre la distribución territorial de los restaurantes de comida rápida en Estados Unidos y distintos indicadores de salud, como el consumo diario, la ingesta calórica y la prevalencia de obesidad en adultos.

Nuestro objetivo fue transformar distintas fuentes de datos en información que permita tomar decisiones fundamentadas, tanto desde los organismos de salud pública como desde la industria alimentaria, considerando la posibilidad de mejorar la oferta nutricional y reducir su impacto.

Para ello desarrollamos una solución integral que comprende tres etapas principales: primero, el procesamiento y la limpieza de datos con Python y pandas; después, la construcción de un Data Warehouse en PostgreSQL; y finalmente, el análisis y la visualización de los resultados mediante Power BI.

### **Slide 02 — Contexto y origen de los datos**

**Oradora: Hannah**

Para estudiar esta problemática durante el año 2024, trabajamos con dos fuentes principales de información.

La primera corresponde al registro georreferenciado de restaurantes de comida rápida de Estados Unidos, publicado en GitHub bajo el repositorio US-Fast-Food-Restaurants, basado en datos de Datafiniti. Este conjunto contenía originalmente 10.000 registros de establecimientos.

La segunda fuente fue una base de elaboración propia, que construimos integrando información demográfica del U.S. Census Bureau con estadísticas de salud pública del CDC, provenientes de las encuestas BRFSS y NHANES, para las 51 jurisdicciones estadounidenses: los 50 estados y Washington D.C.

Al analizar ambas fuentes, identificamos algo importante: observar únicamente la cantidad de restaurantes no permite comprender cómo se distribuye realmente la oferta en relación con la población.

Por ejemplo, estados muy poblados como California o Nueva York pueden tener una gran cantidad de establecimientos, pero una densidad relativamente baja cuando se considera su población. En cambio, algunos estados menos poblados presentan una mayor concentración de locales por habitante.

A partir de esta observación definimos cuatro preguntas de negocio que van a orientar todo nuestro análisis. Se las presenta Matías.

### **Slide 03 — Las cuatro preguntas de negocio**

**Orador: Matías**

Para organizar el análisis y transformar esta problemática en información concreta, definimos cuatro preguntas de negocio.

La primera busca identificar cuáles son los cinco estados con mayor densidad de locales de comida rápida por cada 100.000 habitantes y compararlos con el promedio nacional.

La segunda analiza si existe una relación entre la concentración de estos establecimientos, el porcentaje de adultos que consumen comida rápida diariamente y la tasa de obesidad de cada región.

La tercera busca conocer cómo se distribuye la participación de mercado de las ocho principales cadenas comerciales en las cuatro regiones censales de Estados Unidos.

Y, por último, la cuarta pregunta analiza qué regiones presentan una ingesta calórica diaria promedio superior a las 900 kilocalorías y cuántos establecimientos se concentran en ellas.

Estas cuatro preguntas fueron la base para definir los indicadores, estructurar el modelo de datos y diseñar posteriormente las visualizaciones.

### **Slide 04 — Definición de los tres KPIs**

**Orador: Matías**

Para responder estas preguntas definimos tres indicadores principales o KPIs, que nos permiten comparar los resultados de manera consistente.

El primero es la **Densidad de Locales de Fast Food (DLFF)**. Este indicador relaciona la cantidad de establecimientos con la población total y expresa el resultado cada 100.000 habitantes. El promedio nacional obtenido fue de 2,96 locales.

El segundo es la **Participación de Mercado por Cadena (PMC)**, que permite conocer qué proporción del total de establecimientos representa cada marca. A nivel nacional, McDonald's ocupa el primer lugar con un 21,29%.

Y el tercero es la **Tasa Promedio de Consumo Diario (TPCD)**, que mide el porcentaje de población adulta que consume comida rápida diariamente. Nuestro resultado nacional fue del 36,13%, mientras que la tasa nacional de obesidad adulta alcanzó el 32,60%.

Estos indicadores nos permiten pasar de una descripción general de los datos a un análisis comparativo entre estados y regiones.

### **Slide 05 — Relevamiento y desafíos de las fuentes**

**Orador: Matías**

Antes de comenzar con el análisis tuvimos que resolver varios problemas relacionados con la calidad de los datos.

En el archivo original de Datafiniti encontramos inconsistencias en las direcciones, especialmente comas internas que desplazaban columnas, coordenadas geográficas incorrectas y diferentes formas de escritura para una misma marca.

Por otro lado, la base demográfica y epidemiológica presentaba algunos valores faltantes en determinados estados, principalmente en variables relacionadas con la salud pública.

Esto representaba un problema porque, si integrábamos directamente ambas fuentes, podíamos obtener resultados incorrectos o inconsistentes.

Por eso, antes de construir el modelo y realizar las consultas, desarrollamos un proceso de limpieza y transformación automatizado en Python.

### **Slide 06 — Proceso ETL con Python y pandas**

**Orador: Matías**

Para resolver estos inconvenientes desarrollamos un proceso ETL modularizado utilizando Python y la biblioteca pandas. Una decisión importante fue automatizar las correcciones mediante código, sin modificar manualmente los archivos originales.

El proceso se dividió en cuatro etapas principales.

Primero, durante la **ingestión**, corregimos 20 filas que presentaban comas internas en las direcciones, utilizando expresiones regulares y configuraciones específicas de read\_csv().

Después realizamos la **limpieza geográfica**. Detectamos 51 registros con longitudes positivas incorrectas, que ubicaban los establecimientos fuera del continente americano. Para corregirlos aplicamos una regla condicional que invertía el signo de esos valores.

En tercer lugar, realizamos la **desduplicación y estandarización**. Eliminamos 45 registros duplicados considerando dirección, ciudad, estado y marca. Así obtuvimos 9.904 sucursales válidas. También unificamos 540 variantes ortográficas mediante expresiones regulares, consolidándolas en un catálogo maestro de 466 cadenas.

Por último, realizamos la **imputación de valores faltantes** en los datos sanitarios de Delaware y Dakota del Norte, utilizando el promedio muestral de sus respectivas regiones censales.

De esta manera conseguimos una base integrada con cobertura completa para las variables utilizadas en el análisis.

### **Slide 07 — Integración y modelo dimensional: esquema estrella**

**Orador: Matías**

Una vez finalizada la limpieza, el siguiente paso fue integrar los datos.

Realizamos el cruce en pandas mediante un INNER JOIN, utilizando el código estatal como campo de correspondencia. Además, validamos que la relación fuera many\_to\_one, para asegurarnos de que la integración no generara registros duplicados.

Con los datos consolidados construimos en PostgreSQL nuestro Data Warehouse, denominado dw\_fastfood, utilizando un modelo dimensional de tipo **esquema en estrella**.

¿Por qué elegimos este modelo? Porque almacenar toda la información en una única tabla implicaría repetir constantemente datos como el nombre del estado, la región o la población.

En cambio, organizamos la información en una tabla central de hechos, llamada fact\_locales\_consumo, cuyo nivel de detalle corresponde a una sucursal física, y tres tablas de dimensiones.

Estas son dim\_tiempo, con 366 días; dim\_geografia, con 5.189 ubicaciones; y dim\_cadena, con 466 marcas.

Finalmente, establecimos las relaciones mediante claves primarias y foráneas, incorporando también índices B-Tree para facilitar las consultas.

### **Slide 08 — Anatomía de la oferta: 466 marcas en 8 categorías**

**Orador: Matías**

Antes de pasar a los resultados relacionados con la salud, queremos mostrar cómo quedó organizada la oferta comercial después del proceso de estandarización.

A partir de las 9.904 sucursales y las 466 cadenas identificadas, agrupamos las marcas en ocho categorías.

El resultado más destacado es el predominio de la categoría **Burgers & Grill**, que concentra el 54,33% de los establecimientos, con 5.381 locales distribuidos en 74 cadenas.

Le siguen Sandwiches & Subs, con un 12,30%, y Tex-Mex, con un 11,19%.

También observamos una gran cantidad de marcas locales: 231 cadenas que, en conjunto, representan apenas el 5,59% de los establecimientos.

Esto nos permite observar que, aunque existe una gran variedad de marcas, la infraestructura comercial está concentrada principalmente en unas pocas categorías.

A continuación, Hannah va a explicar cómo trabajamos con esta información en Power BI y qué resultados obtuvimos.

### **Slide 09 — Modelado en Power BI y medidas DAX**

**Oradora: Hannah**

Gracias, Matías.

Una vez construido el Data Warehouse, pasamos a la última etapa del proyecto: el análisis y la visualización de los datos en Power BI.

Conectamos Power BI Desktop a PostgreSQL utilizando el modo Import, configuramos la región en-US para interpretar correctamente los formatos numéricos y establecimos las relaciones entre las dimensiones y la tabla de hechos.

Durante este proceso encontramos un desafío importante relacionado con el cálculo de los indicadores.

Nuestra tabla de hechos contiene datos que no se comportan de la misma manera. Por ejemplo, la cantidad de locales puede sumarse directamente, pero variables como la población, el consumo diario y la obesidad corresponden a indicadores estatales.

Si calculábamos un promedio simple sobre las 9.904 sucursales, algunos estados quedaban representados muchas más veces que otros, lo que podía distorsionar los resultados.

Para evitarlo, desarrollamos medidas explícitas en DAX utilizando funciones como SUMX y AVERAGEX, junto con VALUES, para evaluar cada estado una sola vez y respetar los filtros aplicados.

De esta manera logramos que los indicadores se calcularan correctamente y que las visualizaciones respondieran a las selecciones del usuario.

### **Slide 10 — Pregunta 1: Top 5 estados por densidad frente a la media nacional**

**Oradora: Hannah**

Comenzando con los resultados, la primera pregunta nos permitió identificar los cinco estados con mayor densidad de establecimientos por cada 100.000 habitantes.

El promedio nacional es de 2,96 locales. Sin embargo, los cinco estados del ranking presentan valores muy superiores.

En primer lugar se encuentra **South Dakota**, con 11,20 locales cada 100.000 habitantes, casi cuatro veces el promedio nacional.

Le siguen Kentucky, con 7,11; New Mexico, con 7,05; Wyoming, con 7,02; y Vermont, con 6,49.

En el otro extremo encontramos estados como Nueva York, con 1,21, y California, con 1,54.

Esto demuestra por qué es importante utilizar indicadores relativos a la población: la cantidad absoluta de establecimientos, por sí sola, no permite identificar correctamente los territorios con mayor concentración comercial.

### **Slide 11 — Pregunta 2: Densidad regional frente al consumo diario y la obesidad**

**Oradora: Hannah**

En la segunda pregunta analizamos cómo se relaciona la densidad de establecimientos con los indicadores de consumo diario y obesidad adulta.

Al comparar las cuatro regiones censales encontramos que Midwest y South presentan las mayores densidades comerciales, con 3,97 y 3,25 locales cada 100.000 habitantes, respectivamente.

También registran los mayores porcentajes de consumo diario: 38,40% en Midwest y 39,10% en South.

En cuanto a la obesidad adulta, los valores alcanzan el 34,80% en Midwest y el 35,50% en South.

Por otro lado, Northeast presenta la menor densidad, con 1,89, y también la menor tasa de obesidad, con un 27,40%.

Sin embargo, encontramos un caso interesante: Vermont. A pesar de tener una densidad elevada, del 6,49, presenta un consumo diario del 29,4% y una obesidad del 27,6%.

Este resultado nos permite observar que una mayor concentración comercial no implica necesariamente mayores indicadores de consumo u obesidad. Existen otros factores que también intervienen y que deben considerarse al interpretar los resultados.

### **Slide 12 — Pregunta 3: Cuota de mercado del Top 8 por región**

**Oradora: Hannah**

En la tercera pregunta nos enfocamos en la distribución de las principales cadenas comerciales.

A nivel nacional, identificamos que las ocho marcas principales concentran el 72,35% del total de establecimientos analizados.

Dentro de ese grupo, McDonald's lidera con una participación del 21,29%, seguido por Burger King, con el 11,65%.

A continuación aparecen Taco Bell y Wendy's, entre otras cadenas que completan el grupo de las ocho principales.

Este resultado evidencia una importante concentración de la oferta en un conjunto reducido de marcas.

Pero además de observar la participación nacional, nos interesaba conocer si ese comportamiento se mantenía de la misma manera en todas las regiones.

### **Slide 13 — Pregunta 3: Patrones competitivos regionales**

**Oradora: Hannah**

Cuando desagregamos los resultados por región encontramos diferencias interesantes en la distribución de las cadenas.

En el **Northeast**, McDonald's alcanza su mayor participación, con un 28,40%, seguido por Burger King, con un 15,10%.

En el **West**, se destacan Taco Bell, con un 14,20%, y Subway, con un 6,50%.

En el **Midwest**, las mayores participaciones dentro de las marcas destacadas corresponden a Wendy's, con un 12,30%, y Arby's, con un 9,80%.

Finalmente, en el **South** encontramos una presencia destacada de SONIC Drive-In, con un 8,90%, y KFC, con un 5,20%.

Estas diferencias muestran que la distribución de las cadenas no es uniforme en todo el territorio estadounidense y que existen patrones competitivos propios de cada región.

### **Slide 14 — Pregunta 4: Regiones por encima de las 900 kcal diarias**

**Oradora: Hannah**

Para la cuarta pregunta analizamos la ingesta calórica diaria promedio y establecimos como referencia un umbral de alerta de 900

promedio nacional de ingesta calórica por comida rápida en Estados Unidos es de **898,5 kcal/día**. 

Los resultados muestran que dos regiones superan ese valor durante los cuatro trimestres analizados de 2024\.

Por un lado, South registra un promedio de 944,9 kilocalorías diarias, mientras que Midwest alcanza las 925,1.

Además, al relacionar estos resultados con la distribución comercial, encontramos que ambas regiones concentran 6.821 sucursales.

Esto representa el 68,87% de todos los establecimientos incluidos en nuestro análisis.

Por lo tanto, estas dos regiones reúnen tanto una elevada concentración comercial como valores de ingesta calórica superiores al umbral que definimos para el estudio.

### **Slide 15 — Trazabilidad completa del proyecto**

**Orador: Matías**

En esta diapositiva reunimos todo el recorrido técnico que realizamos.

Lo importante de esta matriz es que permite observar cómo cada pregunta de negocio se relaciona con una decisión concreta dentro del proyecto.

Es decir, no trabajamos la limpieza, el modelado y las visualizaciones como etapas aisladas.

Cada transformación realizada en Python respondió a una necesidad de calidad de los datos; cada dimensión y relación del esquema estrella permitió organizar la información; y cada visualización de Power BI fue diseñada para responder una de las preguntas que planteamos al comienzo.

De esta manera podemos seguir la trazabilidad desde los datos originales hasta los resultados que presentamos.

### **Slide 16 — Análisis integrado multivariado: Triple Alerta**

**Oradora: Hannah**

Para complementar los análisis anteriores, realizamos un último cruce que integra simultáneamente tres indicadores: densidad comercial, consumo diario y obesidad adulta.

Definimos como criterios de alerta una densidad superior a cinco locales cada 100.000 habitantes, un consumo diario mayor al 35% y una tasa de obesidad superior al 36%.

Al aplicar estos tres criterios identificamos cinco jurisdicciones: Kentucky, Indiana, Missouri, West Virginia y Louisiana.

Dentro de este grupo, West Virginia presenta uno de los escenarios más críticos, con un 42,4% de consumo diario y un 41% de obesidad adulta.

Como contraste, estados muy poblados como Nueva York, California, Nueva Jersey y Massachusetts presentan densidades inferiores a 1,90.

Este último análisis nos permite integrar los distintos indicadores y reconocer territorios donde coinciden condiciones comerciales y sanitarias que merecen una mayor atención.

---

## **PARTE 2\. DEMOSTRACIÓN INTERACTIVA EN VIVO**

### **Vista: Base de Datos**

**Orador: Matías \| Duración aproximada: 1 minuto**

*(Matías selecciona la pestaña Base de Datos).*

Antes de presentar nuestras recomendaciones, queremos mostrar brevemente cómo quedó implementada la solución.

En esta sección podemos visualizar el diagrama interactivo del Data Warehouse `dw_fastfood`, construido en PostgreSQL.

Como pueden observar, tenemos una tabla central de hechos, `fact_locales_consumo`, relacionada con las tres dimensiones: tiempo, geografía y cadena.

Estas relaciones permiten organizar la información y consultar los datos desde distintas perspectivas.

Además, la herramienta permite seleccionar cada tabla e inspeccionar su estructura, incluyendo las claves primarias, las claves foráneas, los tipos de datos SQL y las relaciones de integridad referencial.

De esta manera podemos visualizar cómo quedó implementado el modelo que presentamos anteriormente.

### **Vista: Dashboard**

**Oradora: Hannah \| Duración aproximada: 1 minuto y medio**

*(Hannah selecciona la pestaña Dashboard).*

Ahora pasamos al Dashboard, donde integramos los principales resultados del análisis.

En la parte superior tenemos tres segmentadores que permiten filtrar la información por región censal, estado y trimestre, junto con las tarjetas que muestran los principales indicadores.

Para mostrar cómo funciona, vamos a seleccionar la región South.

*(Hannah selecciona South).*

Como pueden ver, los indicadores y las visualizaciones se actualizan automáticamente según el filtro seleccionado.

También podemos seleccionar un estado que identificamos en el análisis de Triple Alerta, como West Virginia o Kentucky.

*(Hannah selecciona uno de los estados).*

Esto nos permite consultar la información de manera dinámica y observar cómo se comportan los distintos indicadores para cada territorio, manteniendo los cálculos correspondientes y evitando duplicaciones en los datos estatales.

Con esta demostración podemos ver cómo el trabajo de integración, modelado y análisis se traduce en una herramienta interactiva para explorar la información.

Ahora volvemos a la presentación para compartir nuestras recomendaciones finales y las limitaciones del estudio.

---

## **PARTE 3\. CONCLUSIONES Y CIERRE**

### **Slide 17 — Recomendaciones estratégicas y limitaciones metodológicas**

**Orador: Matías**

A partir de los resultados obtenidos, elaboramos tres líneas de recomendación dirigidas a distintos sectores.

La primera está orientada a las **cadenas comerciales**. Consideramos importante que evalúen cuidadosamente la apertura de nuevas sucursales tradicionales en mercados que ya presentan una elevada densidad, como South Dakota o Kentucky, y que analicen oportunidades de diversificación en mercados con menor penetración, como Nueva York o California.

La segunda recomendación está dirigida a la **industria alimentaria**. Los resultados muestran que South y Midwest concentran 6.821 establecimientos y presentan los mayores valores de ingesta calórica. Por eso proponemos priorizar la incorporación de alternativas con menor contenido de sodio y calorías en los menús de estas regiones.

Por último, para los **organismos de salud pública**, proponemos fortalecer las campañas de concientización y evaluar incentivos que favorezcan una mayor disponibilidad de alimentos frescos en los territorios que presentan simultáneamente altos niveles de densidad comercial y consumo diario.

También es importante reconocer las limitaciones de nuestro trabajo.

En primer lugar, los indicadores epidemiológicos están agregados a nivel estatal. Esto nos permite realizar comparaciones territoriales, pero no identificar diferencias más específicas entre condados o códigos postales.

En segundo lugar, el registro de establecimientos representa la infraestructura comercial disponible, pero no incluye información sobre ventas, facturación o cantidad de clientes.

En tercer lugar, aunque logramos consolidar 466 cadenas, puede existir una menor cobertura de pequeños establecimientos independientes, especialmente en zonas rurales.

Y, por último, nuestros resultados permiten identificar asociaciones entre variables comerciales y sanitarias, pero no establecer una relación de causa y efecto. La obesidad es un fenómeno multifactorial y no puede atribuirse a una única variable.

Por eso, consideramos que los resultados deben interpretarse como evidencia para orientar nuevas investigaciones y decisiones, y no como una explicación única de la problemática.

### **Slide 18 — Cierre del trabajo integrador**

**Oradores: Hannah y Matías**

**Hannah:**

Con este trabajo logramos completar un proceso integral de gestión y análisis de datos: partimos de fuentes de información originales, las depuramos e integramos, construimos un Data Warehouse y finalmente transformamos esos datos en indicadores y visualizaciones que permiten comprender mejor la problemática estudiada.

**Matías:**

Esperamos haber demostrado no solamente los resultados del análisis, sino también el proceso técnico que hizo posible obtenerlos.

Muchas gracias por su atención. Quedamos a disposición para responder sus preguntas.

