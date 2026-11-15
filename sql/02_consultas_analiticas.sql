-- ============================================================================
-- Trabajo integrador ae4 de gestión avanzada de bases de datos (2026)
-- Script 02: verificación, indicadores y consultas analíticas del negocio
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Verificación de la cantidad de filas cargadas en cada tabla del data warehouse
-- ----------------------------------------------------------------------------
SELECT 'dim_tiempo' AS tabla, COUNT(*) AS filas FROM dim_tiempo
UNION ALL SELECT 'dim_cadena', COUNT(*) FROM dim_cadena
UNION ALL SELECT 'dim_ubicacion', COUNT(*) FROM dim_ubicacion
UNION ALL SELECT 'fact_ventas', COUNT(*) FROM fact_ventas;

-- ----------------------------------------------------------------------------
-- Cálculo de los 3 indicadores clave de desempeño del proyecto
-- ----------------------------------------------------------------------------
SELECT
    COUNT(DISTINCT sucursal_key)                                                       AS sucursales,
    SUM(cantidad_ordenes)                                                              AS total_ordenes,
    ROUND(SUM(ventas_usd), 2)                                                          AS kpi1_ingreso_total_usd,
    ROUND(SUM(ventas_usd) / SUM(cantidad_ordenes), 2)                                  AS kpi2_ticket_promedio_usd,
    ROUND((SUM(ventas_usd) - SUM(costo_operativo_usd)) / SUM(ventas_usd) * 100, 2)     AS kpi3_margen_pct
FROM fact_ventas;

-- ----------------------------------------------------------------------------
-- Consulta 1 para responder la pregunta de negocio 1 usando la dimensión tiempo
-- ----------------------------------------------------------------------------
SELECT
    t.año,
    t.trimestre,
    SUM(f.cantidad_ordenes)                                AS total_ordenes,
    ROUND(SUM(f.ventas_usd), 2)                            AS ingresos_usd,
    ROUND(SUM(f.ganancia_neta_usd), 2)                     AS ganancia_neta_usd,
    ROUND(SUM(f.ventas_usd) / SUM(f.cantidad_ordenes), 2)  AS ticket_promedio_usd
FROM fact_ventas f
JOIN dim_tiempo t ON f.tiempo_id = t.tiempo_id
GROUP BY t.año, t.trimestre
ORDER BY t.año, t.trimestre;

-- ----------------------------------------------------------------------------
-- Consulta 2 para responder la pregunta de negocio 2 usando la dimensión cadena
-- ----------------------------------------------------------------------------
SELECT
    c.categoria_comida,
    c.segmento_precio,
    COUNT(DISTINCT f.sucursal_key)                                                   AS sucursales,
    ROUND(SUM(f.ventas_usd), 2)                                                      AS facturacion_usd,
    ROUND(SUM(f.ventas_usd) / COUNT(DISTINCT f.sucursal_key), 2)                     AS ingreso_por_sucursal_usd,
    ROUND((SUM(f.ventas_usd) - SUM(f.costo_operativo_usd)) / SUM(f.ventas_usd) * 100, 2) AS margen_pct
FROM fact_ventas f
JOIN dim_cadena c ON f.cadena_id = c.cadena_id
GROUP BY c.categoria_comida, c.segmento_precio
ORDER BY facturacion_usd DESC;

-- ----------------------------------------------------------------------------
-- Consulta 3 para responder la pregunta de negocio 3 usando la dimensión ubicación
-- ----------------------------------------------------------------------------
SELECT
    u.region_eeuu,
    u.estado_codigo,
    u.estado_nombre,
    MAX(u.poblacion_estado)                                                          AS poblacion,
    COUNT(DISTINCT f.sucursal_key)                                                   AS sucursales,
    ROUND(SUM(f.ventas_usd), 2)                                                      AS ventas_usd,
    ROUND(SUM(f.ventas_usd) / COUNT(DISTINCT f.sucursal_key), 2)                     AS ventas_por_sucursal_usd,
    ROUND(COUNT(DISTINCT f.sucursal_key) * 1000000.0 / MAX(u.poblacion_estado), 2)   AS sucursales_por_millon_hab
FROM fact_ventas f
JOIN dim_ubicacion u ON f.ubicacion_id = u.ubicacion_id
GROUP BY u.region_eeuu, u.estado_codigo, u.estado_nombre
ORDER BY ventas_usd DESC
LIMIT 15;

-- ----------------------------------------------------------------------------
-- Consulta 4 para responder la pregunta de negocio 4 cruzando las tres dimensiones
-- ----------------------------------------------------------------------------
WITH ventas_2024 AS (
    SELECT f.*
    FROM fact_ventas f
    JOIN dim_tiempo t ON f.tiempo_id = t.tiempo_id
    WHERE t.año = 2024
),
top_cadenas AS (
    SELECT cadena_id
    FROM ventas_2024
    GROUP BY cadena_id
    ORDER BY SUM(ventas_usd) DESC
    LIMIT 10
)
SELECT
    c.nombre_cadena,
    u.region_eeuu,
    COUNT(DISTINCT v.sucursal_key)                                                   AS sucursales,
    ROUND(SUM(v.ventas_usd), 2)                                                      AS ventas_usd,
    ROUND(SUM(v.ventas_usd) / SUM(v.cantidad_ordenes), 2)                            AS ticket_promedio_usd,
    ROUND((SUM(v.ventas_usd) - SUM(v.costo_operativo_usd)) / SUM(v.ventas_usd) * 100, 2) AS margen_pct
FROM ventas_2024 v
JOIN top_cadenas tc ON v.cadena_id = tc.cadena_id
JOIN dim_cadena c ON v.cadena_id = c.cadena_id
JOIN dim_ubicacion u ON v.ubicacion_id = u.ubicacion_id
GROUP BY c.nombre_cadena, u.region_eeuu
ORDER BY c.nombre_cadena, ventas_usd DESC;
