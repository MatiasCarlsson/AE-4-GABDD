-- ============================================================================
-- Trabajo integrador ae4 de gestión avanzada de bases de datos (2026)
-- Script 03: verificación, indicadores y consultas analíticas del negocio
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Verificación de la cantidad de registros en las 4 tablas físicas del data warehouse
-- ----------------------------------------------------------------------------
SELECT 'dim_tiempo' AS tabla, COUNT(*) AS filas FROM dim_tiempo
UNION ALL SELECT 'dim_geografia', COUNT(*) FROM dim_geografia
UNION ALL SELECT 'dim_cadena', COUNT(*) FROM dim_cadena
UNION ALL SELECT 'fact_locales_consumo', COUNT(*) FROM fact_locales_consumo;

-- ----------------------------------------------------------------------------
-- Resumen nacional de los 3 indicadores clave (dlff, pmc de la cadena líder y tpcd)
-- ----------------------------------------------------------------------------
WITH resumen_estatal AS (
    SELECT
        g.province,
        MAX(g.population_total) AS poblacion_estado,
        SUM(f.cantidad_locales) AS locales_estado,
        MAX(f.pct_consumo_diario) AS pct_consumo_estado,
        MAX(f.tasa_obesidad_pct) AS tasa_obesidad_estado
    FROM fact_locales_consumo f
    JOIN dim_geografia g ON f.geografia_id = g.geografia_id
    GROUP BY g.province
),
cadena_lider AS (
    SELECT
        c.nombre_cadena,
        ROUND(SUM(f.cantidad_locales) * 100.0 / (SELECT SUM(cantidad_locales) FROM fact_locales_consumo), 2) AS pmc_lider_pct
    FROM fact_locales_consumo f
    JOIN dim_cadena c ON f.cadena_id = c.cadena_id
    GROUP BY c.nombre_cadena
    ORDER BY SUM(f.cantidad_locales) DESC
    LIMIT 1
)
SELECT
    SUM(r.locales_estado) AS total_locales_analizados,
    SUM(r.poblacion_estado) AS poblacion_total_eeuu,
    ROUND(SUM(r.locales_estado) * 100000.0 / SUM(r.poblacion_estado), 2) AS kpi1_dlff_nacional_cada_100k,
    (SELECT nombre_cadena FROM cadena_lider) AS cadena_numero_1,
    (SELECT pmc_lider_pct FROM cadena_lider) AS kpi2_pmc_cadena_lider_pct,
    ROUND(SUM(r.pct_consumo_estado * r.poblacion_estado) / SUM(r.poblacion_estado), 2) AS kpi3_tpcd_nacional_ponderada_pct,
    ROUND(SUM(r.tasa_obesidad_estado * r.poblacion_estado) / SUM(r.poblacion_estado), 2) AS tasa_obesidad_nacional_ponderada_pct
FROM resumen_estatal r;

-- ----------------------------------------------------------------------------
-- Consulta 1 para responder la pregunta de negocio 1:
-- ¿cuáles son los 5 estados con mayor densidad de locales cada 100.000 habitantes y cómo se comparan con el promedio nacional?
-- ----------------------------------------------------------------------------
WITH estados AS (
    SELECT
        g.province,
        g.state_name,
        g.census_region,
        MAX(g.population_total) AS poblacion_estado,
        SUM(f.cantidad_locales) AS cantidad_locales,
        ROUND(SUM(f.cantidad_locales) * 100000.0 / MAX(g.population_total), 2) AS dlff_estado,
        MAX(f.tasa_obesidad_pct) AS tasa_obesidad_pct
    FROM fact_locales_consumo f
    JOIN dim_geografia g ON f.geografia_id = g.geografia_id
    GROUP BY g.province, g.state_name, g.census_region
),
promedio_nacional AS (
    SELECT ROUND(SUM(cantidad_locales) * 100000.0 / SUM(poblacion_estado), 2) AS dlff_nacional
    FROM estados
)
SELECT
    e.province,
    e.state_name,
    e.census_region,
    e.cantidad_locales,
    e.poblacion_estado,
    e.dlff_estado,
    p.dlff_nacional,
    ROUND(e.dlff_estado - p.dlff_nacional, 2) AS diferencia_vs_nacional,
    e.tasa_obesidad_pct
FROM estados e
CROSS JOIN promedio_nacional p
ORDER BY e.dlff_estado DESC
LIMIT 5;

-- ----------------------------------------------------------------------------
-- Consulta 2 para responder la pregunta de negocio 2:
-- ¿existe relación entre la densidad regional de restaurantes y el porcentaje de consumo diario y obesidad?
-- ----------------------------------------------------------------------------
WITH estados AS (
    SELECT
        g.census_region,
        g.province,
        MAX(g.population_total) AS poblacion_estado,
        SUM(f.cantidad_locales) AS locales_estado,
        MAX(f.pct_consumo_diario) AS pct_consumo_estado,
        MAX(f.calorias_diarias_promedio_ff) AS calorias_estado,
        MAX(f.tasa_obesidad_pct) AS obesidad_estado
    FROM fact_locales_consumo f
    JOIN dim_geografia g ON f.geografia_id = g.geografia_id
    GROUP BY g.census_region, g.province
)
SELECT
    census_region,
    COUNT(province) AS cantidad_estados,
    SUM(locales_estado) AS total_locales,
    SUM(poblacion_estado) AS poblacion_regional,
    ROUND(SUM(locales_estado) * 100000.0 / SUM(poblacion_estado), 2) AS dlff_regional_cada_100k,
    ROUND(SUM(pct_consumo_estado * poblacion_estado) / SUM(poblacion_estado), 2) AS tpcd_consumo_diario_pct,
    ROUND(AVG(calorias_estado), 1) AS calorias_diarias_promedio_kcal,
    ROUND(SUM(obesidad_estado * poblacion_estado) / SUM(poblacion_estado), 2) AS tasa_obesidad_ponderada_pct
FROM estados
GROUP BY census_region
ORDER BY dlff_regional_cada_100k DESC;

-- ----------------------------------------------------------------------------
-- Consulta 3 para responder la pregunta de negocio 3:
-- ¿cómo se distribuye la cuota de mercado (pmc) de las principales cadenas según las 4 regiones censales?
-- ----------------------------------------------------------------------------
WITH top_cadenas AS (
    SELECT cadena_id
    FROM fact_locales_consumo
    GROUP BY cadena_id
    ORDER BY SUM(cantidad_locales) DESC
    LIMIT 8
),
totales_region AS (
    SELECT
        g.census_region,
        SUM(f.cantidad_locales) AS total_locales_region
    FROM fact_locales_consumo f
    JOIN dim_geografia g ON f.geografia_id = g.geografia_id
    GROUP BY g.census_region
)
SELECT
    c.nombre_cadena,
    c.categoria_principal,
    g.census_region,
    SUM(f.cantidad_locales) AS locales_cadena_en_region,
    ROUND(SUM(f.cantidad_locales) * 100.0 / tr.total_locales_region, 2) AS pmc_en_region_pct,
    ROUND(SUM(f.cantidad_locales) * 100.0 / (SELECT SUM(cantidad_locales) FROM fact_locales_consumo), 2) AS pmc_nacional_pct
FROM fact_locales_consumo f
JOIN top_cadenas tc ON f.cadena_id = tc.cadena_id
JOIN dim_cadena c ON f.cadena_id = c.cadena_id
JOIN dim_geografia g ON f.geografia_id = g.geografia_id
JOIN totales_region tr ON g.census_region = tr.census_region
GROUP BY c.nombre_cadena, c.categoria_principal, g.census_region, tr.total_locales_region
ORDER BY c.nombre_cadena, locales_cadena_en_region DESC;

-- ----------------------------------------------------------------------------
-- Consulta 4 para responder la pregunta de negocio 4 (vinculada con dim_tiempo):
-- ¿qué regiones presentan en los relevamientos 2024 una ingesta calórica diaria promedio superior a 900 kcal y cuántas sucursales operan en ellas?
-- ----------------------------------------------------------------------------
WITH estados_tiempo AS (
    SELECT
        g.census_region,
        g.province,
        t.anio,
        t.trimestre,
        SUM(f.cantidad_locales) AS locales_estado,
        MAX(f.calorias_diarias_promedio_ff) AS calorias_estado,
        MAX(f.tasa_obesidad_pct) AS obesidad_estado
    FROM fact_locales_consumo f
    JOIN dim_geografia g ON f.geografia_id = g.geografia_id
    JOIN dim_tiempo t ON f.tiempo_id = t.tiempo_id
    GROUP BY g.census_region, g.province, t.anio, t.trimestre
)
SELECT
    census_region,
    anio,
    COUNT(DISTINCT trimestre) AS trimestres_relevados,
    SUM(locales_estado) AS sucursales_operativas,
    ROUND(AVG(calorias_estado), 1) AS ingesta_calorica_diaria_kcal,
    ROUND(AVG(obesidad_estado), 2) AS tasa_obesidad_promedio_pct
FROM estados_tiempo
GROUP BY census_region, anio
HAVING AVG(calorias_estado) > 900
ORDER BY ingesta_calorica_diaria_kcal DESC;
