-- ============================================================================
-- Trabajo integrador ae4 de gestión avanzada de bases de datos (2026)
-- Script 02: carga de dimensiones de negocio y tabla de hechos desde archivos csv
-- ============================================================================

-- Limpieza previa de las tablas de hechos y dimensiones de negocio antes de cargar
TRUNCATE TABLE fact_locales_consumo, dim_geografia, dim_cadena RESTART IDENTITY CASCADE;

-- Carga de la dimensión geografía desde el archivo csv procesado por el etl
\copy dim_geografia(geografia_id, province, state_name, census_region, city, postal_code, population_total) FROM 'datos/procesados/dim_geografia.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Carga de la dimensión cadena desde el archivo csv procesado por el etl
\copy dim_cadena(cadena_id, nombre_cadena, categoria_principal) FROM 'datos/procesados/dim_cadena.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Carga de la tabla de hechos desde el archivo csv procesado por el etl
\copy fact_locales_consumo(hecho_id, tiempo_id, geografia_id, cadena_id, latitude, longitude, cantidad_locales, calorias_diarias_promedio_ff, pct_consumo_diario, tasa_obesidad_pct) FROM 'datos/procesados/fact_locales_consumo.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');

-- Sincronización de las secuencias autonuméricas tras la carga masiva
SELECT setval(pg_get_serial_sequence('dim_tiempo', 'tiempo_id'), (SELECT MAX(tiempo_id) FROM dim_tiempo));
SELECT setval(pg_get_serial_sequence('dim_geografia', 'geografia_id'), (SELECT MAX(geografia_id) FROM dim_geografia));
SELECT setval(pg_get_serial_sequence('dim_cadena', 'cadena_id'), (SELECT MAX(cadena_id) FROM dim_cadena));
SELECT setval(pg_get_serial_sequence('fact_locales_consumo', 'hecho_id'), (SELECT MAX(hecho_id) FROM fact_locales_consumo));
