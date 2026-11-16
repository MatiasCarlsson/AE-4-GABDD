-- ============================================================================
-- Trabajo integrador ae4 de gestión avanzada de bases de datos (2026)
-- Script 01: creación del data warehouse en esquema estrella y carga de dim_tiempo
-- ============================================================================

-- Se eliminan las tablas previas (incluyendo las de versiones anteriores) para recrear desde cero
DROP TABLE IF EXISTS fact_locales_consumo CASCADE;
DROP TABLE IF EXISTS fact_ventas CASCADE;
DROP TABLE IF EXISTS dim_geografia CASCADE;
DROP TABLE IF EXISTS dim_ubicacion CASCADE;
DROP TABLE IF EXISTS dim_cadena CASCADE;
DROP TABLE IF EXISTS dim_tiempo CASCADE;

-- ============================================================================
-- 1. Creación de las dimensiones
-- ============================================================================

-- Dimensión tiempo obligatoria con fecha, día, mes, nombre del mes, trimestre y año
CREATE TABLE dim_tiempo (
    tiempo_id   SERIAL PRIMARY KEY,
    fecha       DATE UNIQUE NOT NULL,
    dia         INTEGER NOT NULL,
    mes         INTEGER NOT NULL,
    nombre_mes  VARCHAR(20) NOT NULL,
    trimestre   INTEGER NOT NULL,
    anio        INTEGER NOT NULL
);

-- Dimensión geografía con estado, región censal, ciudad, código postal y población estatal
CREATE TABLE dim_geografia (
    geografia_id      SERIAL PRIMARY KEY,
    province          VARCHAR(2) NOT NULL,
    state_name        VARCHAR(100) NOT NULL,
    census_region     VARCHAR(50) NOT NULL,
    city              VARCHAR(120) NOT NULL,
    postal_code       VARCHAR(10) NOT NULL,
    population_total  BIGINT NOT NULL
);

-- Dimensión cadena con nombre normalizado de la franquicia y categoría principal
CREATE TABLE dim_cadena (
    cadena_id            SERIAL PRIMARY KEY,
    nombre_cadena        VARCHAR(150) UNIQUE NOT NULL,
    categoria_principal  VARCHAR(100) NOT NULL
);

-- ============================================================================
-- 2. Creación de la tabla de hechos
-- Granularidad: un local de comida rápida vinculado a su ubicación, cadena y corte temporal
-- ============================================================================

CREATE TABLE fact_locales_consumo (
    hecho_id                      SERIAL PRIMARY KEY,
    tiempo_id                     INTEGER NOT NULL REFERENCES dim_tiempo(tiempo_id),
    geografia_id                  INTEGER NOT NULL REFERENCES dim_geografia(geografia_id),
    cadena_id                     INTEGER NOT NULL REFERENCES dim_cadena(cadena_id),
    latitude                      NUMERIC(10,6) NOT NULL,
    longitude                     NUMERIC(10,6) NOT NULL,
    cantidad_locales              INTEGER NOT NULL DEFAULT 1,
    calorias_diarias_promedio_ff  NUMERIC(8,2) NOT NULL,
    pct_consumo_diario            NUMERIC(6,2) NOT NULL,
    tasa_obesidad_pct             NUMERIC(6,2) NOT NULL
);

-- ============================================================================
-- 3. Carga de dim_tiempo con todos los días del año 2024 (366 filas por año bisiesto)
-- ============================================================================

INSERT INTO dim_tiempo (fecha, dia, mes, nombre_mes, trimestre, anio)
SELECT
    fecha::date,
    EXTRACT(DAY FROM fecha),
    EXTRACT(MONTH FROM fecha),
    TRIM(TO_CHAR(fecha, 'Month')),
    EXTRACT(QUARTER FROM fecha),
    EXTRACT(YEAR FROM fecha)
FROM generate_series('2024-01-01'::date, '2024-12-31'::date, '1 day') AS fecha;

-- ============================================================================
-- 4. Índices sobre las claves foráneas para optimizar las consultas analíticas
-- ============================================================================

CREATE INDEX idx_fact_tiempo ON fact_locales_consumo(tiempo_id);
CREATE INDEX idx_fact_geografia ON fact_locales_consumo(geografia_id);
CREATE INDEX idx_fact_cadena ON fact_locales_consumo(cadena_id);
