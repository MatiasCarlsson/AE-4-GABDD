"""Funciones compartidas entre el generador de la fuente 2 y el etl."""

import csv

import pandas as pd

COLUMNAS = ["address", "city", "country", "keys", "latitude", "longitude", "name", "postalCode", "province"]


def leer_fastfood_csv(ruta):
    """Lee fastfoodrestaurants.csv y devuelve las columnas a hasta i (sin websites)."""
    with open(ruta, encoding="utf-8") as f:
        lineas = f.read().splitlines()[1:]  # Se omite el encabezado

    filas = []
    filas_reparadas = 0
    for linea in lineas:
        campos = next(csv.reader([linea]))
        if len(campos) == 1:  # Línea entre comillas completas, se vuelve a separar
            campos = next(csv.reader([campos[0]]))

        sobrantes = len(campos) - 10  # El archivo original tiene 10 columnas
        if sobrantes > 0:  # La dirección quedó partida en varias columnas, se vuelve a unir
            direccion = ", ".join(c.strip() for c in campos[: sobrantes + 1] if c.strip())
            campos = [direccion] + campos[sobrantes + 1 :]
            filas_reparadas += 1

        filas.append(campos[:9])  # Se descarta la columna j (websites)

    return pd.DataFrame(filas, columns=COLUMNAS), filas_reparadas
