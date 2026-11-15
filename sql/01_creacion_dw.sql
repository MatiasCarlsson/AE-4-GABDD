-- ============================================================================
-- Trabajo integrador ae4 de gestión avanzada de bases de datos (2026)
-- Script 01: creación del data warehouse en modelo estrella y carga de dim_tiempo
-- ============================================================================

-- Se borran las tablas previas para poder ejecutar el script desde cero
DROP TABLE IF EXISTS fact_ventas CASCADE;
DROP TABLE IF EXISTS dim_cadena CASCADE;
DROP TABLE IF EXISTS dim_ubicacion CASCADE;
DROP TABLE IF EXISTS dim_tiempo CASCADE;

-- ============================================================================
-- 1. Creación de las dimensiones
-- ============================================================================

-- Dimensión tiempo obligatoria con fecha, día, mes, trimestre y año
CREATE TABLE dim_tiempo (
    tiempo_id          SERIAL PRIMARY KEY,
    fecha              DATE UNIQUE NOT NULL,
    dia                INTEGER NOT NULL,
    mes                INTEGER NOT NULL,
    trimestre          INTEGER NOT NULL,
    año                INTEGER NOT NULL,
    dia_semana         INTEGER NOT NULL,
    nombre_mes         VARCHAR(20) NOT NULL,
    nombre_dia_semana  VARCHAR(20) NOT NULL,
    es_fin_de_semana   BOOLEAN NOT NULL
);

-- Dimensión cadena con nombre de franquicia, categoría gastronómica y segmento de precio
CREATE TABLE dim_cadena (
    cadena_id         SERIAL PRIMARY KEY,
    nombre_cadena     VARCHAR(150) NOT NULL,
    categoria_comida  VARCHAR(100) NOT NULL,
    segmento_precio   VARCHAR(50) NOT NULL,
    codigo_cadena     VARCHAR(50) UNIQUE NOT NULL
);

-- Dimensión ubicación con ciudad, código postal, estado, región y población estatal
CREATE TABLE dim_ubicacion (
    ubicacion_id      SERIAL PRIMARY KEY,
    pais              VARCHAR(50) NOT NULL DEFAULT 'US',
    estado_codigo     VARCHAR(10) NOT NULL,
    estado_nombre     VARCHAR(100) NOT NULL,
    ciudad            VARCHAR(120) NOT NULL,
    codigo_postal     VARCHAR(20) NOT NULL,
    region_eeuu       VARCHAR(50) NOT NULL,
    poblacion_estado  INTEGER NOT NULL,
    codigo_ubicacion  VARCHAR(100) UNIQUE NOT NULL
);

-- ============================================================================
-- 2. Creación de la tabla de hechos
-- Granularidad: un cierre trimestral de una sucursal en el último día del trimestre
-- ============================================================================

CREATE TABLE fact_ventas (
    venta_id             SERIAL PRIMARY KEY,
    tiempo_id            INTEGER NOT NULL REFERENCES dim_tiempo(tiempo_id),
    cadena_id            INTEGER NOT NULL REFERENCES dim_cadena(cadena_id),
    ubicacion_id         INTEGER NOT NULL REFERENCES dim_ubicacion(ubicacion_id),
    id_operacion         VARCHAR(50) UNIQUE NOT NULL,
    sucursal_key         VARCHAR(180) NOT NULL,
    cantidad_ordenes     INTEGER NOT NULL,        -- Métrica aditiva de cantidad de órdenes
    ventas_usd           DECIMAL(15,2) NOT NULL,  -- Métrica aditiva de ventas en dólares
    costo_operativo_usd  DECIMAL(15,2) NOT NULL,  -- Métrica aditiva de costo operativo
    ganancia_neta_usd    DECIMAL(15,2) NOT NULL   -- Métrica aditiva de ganancia neta
);

-- ============================================================================
-- 3. Carga de dim_tiempo con todos los días de 2023 y 2024 (731 filas)
-- Se genera el calendario completo para que existan todas las fechas posibles
-- ============================================================================

INSERT INTO dim_tiempo (fecha, dia, mes, trimestre, año, dia_semana, nombre_mes, nombre_dia_semana, es_fin_de_semana)
SELECT
    fecha::date,
    EXTRACT(DAY FROM fecha),
    EXTRACT(MONTH FROM fecha),
    EXTRACT(QUARTER FROM fecha),
    EXTRACT(YEAR FROM fecha),
    EXTRACT(ISODOW FROM fecha),          -- Del 1 (lunes) al 7 (domingo)
    TRIM(TO_CHAR(fecha, 'Month')),
    TRIM(TO_CHAR(fecha, 'Day')),
    EXTRACT(ISODOW FROM fecha) IN (6, 7)
FROM generate_series('2023-01-01'::date, '2024-12-31'::date, '1 day') AS fecha;

-- ============================================================================
-- 4. Índices sobre las claves foráneas para acelerar las consultas analíticas
-- ============================================================================

CREATE INDEX idx_fact_tiempo ON fact_ventas(tiempo_id);
CREATE INDEX idx_fact_cadena ON fact_ventas(cadena_id);
CREATE INDEX idx_fact_ubicacion ON fact_ventas(ubicacion_id);
