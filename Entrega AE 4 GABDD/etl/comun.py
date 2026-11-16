"""Funciones auxiliares compartidas para lectura del csv y clasificación de cadenas."""

import csv
import pandas as pd

COLUMNAS = ["address", "city", "country", "keys", "latitude", "longitude", "name", "postalCode", "province"]

REGLAS_CATEGORIAS = [
    (["mcdonald", "burger", "wendy", "sonic", "hardee", "carl's", "jack in the box", "whataburger",
      "five guys", "in-n-out", "culver", "white castle", "checkers", "rally's", "steak 'n shake", "a&w", "freddy", "smashburger", "habit", "fuddruckers"],
     "Burgers & Grill"),
    (["taco", "chipotle", "qdoba", "moe's", "el pollo loco", "baja fresh", "tijuana", "rubio", "burrito", "mexican", "bueno"],
     "Tex-Mex"),
    (["domino", "pizza", "papa john", "little caesars", "cicis", "marco's", "sbarro"],
     "Pizza & Italian"),
    (["kfc", "chick-fil-a", "popeyes", "church's", "zaxby", "raising cane", "bojangl", "wingstop", "buffalo wild", "slim chickens", "kentucky", "chicken", "pollo", "wing"],
     "Chicken & Wings"),
    (["subway", "arby", "jimmy john", "jersey mike", "panera", "firehouse", "quiznos", "potbelly", "charleys", "blimpie", "jason's deli", "mcalister", "schlotzsky", "penn station", "sub", "deli", "sandwich"],
     "Sandwiches & Subs"),
    (["dairy queen", "dunkin", "baskin", "starbucks", "krispy kreme", "tim hortons", "smoothie", "jamba", "cold stone", "rita's", "einstein", "pretzel", "auntie anne", "cinnabon"],
     "Coffee, Bakery & Ice Cream"),
    (["panda express", "pei wei", "noodles", "teriyaki", "wok", "china", "asian", "sushi", "long john", "captain d", "seafood"],
     "Asian & Seafood"),
]


def leer_fastfood_csv(ruta):
    """Lee fastfoodrestaurants.csv reparando comillas y comas internas en la dirección."""
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


def clasificar_categoria(nombre):
    """Asigna la categoría gastronómica principal de una cadena según su nombre."""
    nombre_min = str(nombre).lower()
    for palabras, categoria in REGLAS_CATEGORIAS:
        if any(p in nombre_min for p in palabras):
            return categoria
    return "Otros / Regional"
