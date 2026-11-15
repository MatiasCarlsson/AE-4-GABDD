"""Generador de la fuente 2 complementaria construida por el grupo (punto 3.2 de la consigna)."""

import random
from pathlib import Path

import pandas as pd

from comun import leer_fastfood_csv

random.seed(2026)

BASE_DIR = Path(__file__).resolve().parent.parent
ARCHIVO_FUENTE_1 = BASE_DIR / "datos" / "originales" / "FastFoodRestaurants.csv"
ARCHIVO_SALIDA = BASE_DIR / "datos" / "originales" / "operaciones_franquicias_2023_2024.csv"

# Datos de cada estado: nombre, región del censo, población 2023 y factor económico
ESTADOS = {
    "AL": ("Alabama", "South", 5108468, 0.91),
    "AK": ("Alaska", "West", 733406, 1.18),
    "AZ": ("Arizona", "West", 7431344, 1.03),
    "AR": ("Arkansas", "South", 3067732, 0.89),
    "CA": ("California", "West", 38965193, 1.18),
    "CO": ("Colorado", "West", 5877610, 1.11),
    "CT": ("Connecticut", "Northeast", 3617176, 1.16),
    "DE": ("Delaware", "South", 1031890, 1.05),
    "DC": ("District of Columbia", "South", 678972, 1.25),
    "FL": ("Florida", "South", 22610726, 1.07),
    "GA": ("Georgia", "South", 11029227, 1.01),
    "HI": ("Hawaii", "West", 1435138, 1.22),
    "ID": ("Idaho", "West", 1964726, 0.97),
    "IL": ("Illinois", "Midwest", 12549689, 1.06),
    "IN": ("Indiana", "Midwest", 6862199, 0.94),
    "IA": ("Iowa", "Midwest", 3207004, 0.95),
    "KS": ("Kansas", "Midwest", 2940546, 0.94),
    "KY": ("Kentucky", "South", 4526154, 0.91),
    "LA": ("Louisiana", "South", 4573749, 0.92),
    "ME": ("Maine", "Northeast", 1395722, 0.99),
    "MD": ("Maryland", "South", 6180253, 1.13),
    "MA": ("Massachusetts", "Northeast", 7001399, 1.19),
    "MI": ("Michigan", "Midwest", 10037261, 0.96),
    "MN": ("Minnesota", "Midwest", 5737915, 1.05),
    "MS": ("Mississippi", "South", 2939690, 0.87),
    "MO": ("Missouri", "Midwest", 6196156, 0.94),
    "MT": ("Montana", "West", 1132812, 0.96),
    "NE": ("Nebraska", "Midwest", 1978379, 0.96),
    "NV": ("Nevada", "West", 3194176, 1.06),
    "NH": ("New Hampshire", "Northeast", 1402054, 1.10),
    "NJ": ("New Jersey", "Northeast", 9290841, 1.16),
    "NM": ("New Mexico", "West", 2114371, 0.92),
    "NY": ("New York", "Northeast", 19571216, 1.20),
    "NC": ("North Carolina", "South", 10835491, 1.00),
    "ND": ("North Dakota", "Midwest", 783926, 0.98),
    "OH": ("Ohio", "Midwest", 11785935, 0.96),
    "OK": ("Oklahoma", "South", 4053824, 0.92),
    "OR": ("Oregon", "West", 4233358, 1.07),
    "PA": ("Pennsylvania", "Northeast", 12961683, 1.02),
    "RI": ("Rhode Island", "Northeast", 1095962, 1.08),
    "SC": ("South Carolina", "South", 5373555, 0.95),
    "SD": ("South Dakota", "Midwest", 919318, 0.95),
    "TN": ("Tennessee", "South", 7126489, 0.97),
    "TX": ("Texas", "South", 30503301, 1.08),
    "UT": ("Utah", "West", 3417734, 1.04),
    "VT": ("Vermont", "Northeast", 647464, 1.03),
    "VA": ("Virginia", "South", 8715698, 1.09),
    "WA": ("Washington", "West", 7812880, 1.15),
    "WV": ("West Virginia", "South", 1770071, 0.88),
    "WI": ("Wisconsin", "Midwest", 5910955, 0.98),
    "WY": ("Wyoming", "West", 584057, 0.97),
}

# Corrección de estado mal cargado en la fuente 1
CORRECCIONES_ESTADO = {"CO SPGS": "CO"}

# Reglas de clasificación: palabras clave, categoría, segmento, ticket base, órdenes base y proporción de costo
REGLAS_CADENAS = [
    (["five guys", "smashburger", "habit", "culver", "fuddruckers"],
     "Burgers & Grill", "Fast Casual", 15.80, 42000, 0.68),
    (["mcdonald", "burger", "wendy", "sonic", "hardee", "carl's", "jack in the box", "whataburger",
      "in-n-out", "white castle", "checkers", "rally's", "steak 'n shake", "a&w", "freddy"],
     "Burgers & Grill", "Económico (QSR)", 11.40, 58000, 0.64),
    (["chipotle", "qdoba", "moe's", "baja fresh", "rubio"],
     "Tex-Mex", "Fast Casual", 14.90, 45000, 0.66),
    (["taco", "el pollo loco", "tijuana", "burrito", "mexican", "bueno"],
     "Tex-Mex", "Económico (QSR)", 10.60, 52000, 0.63),
    (["domino", "pizza", "papa john", "little caesars", "cicis", "marco's", "sbarro"],
     "Pizza & Italian", "Económico (QSR)", 18.50, 34000, 0.65),
    (["chick-fil-a", "raising cane", "wingstop"],
     "Chicken & Wings", "Fast Casual", 14.40, 59000, 0.65),
    (["kfc", "popeyes", "church's", "zaxby", "bojangl", "buffalo wild", "slim chickens",
      "kentucky", "chicken", "pollo", "wing"],
     "Chicken & Wings", "Económico (QSR)", 12.80, 46000, 0.67),
    (["panera", "jersey mike", "firehouse", "jason's deli", "mcalister", "potbelly"],
     "Sandwiches & Subs", "Fast Casual", 14.60, 41000, 0.66),
    (["subway", "arby", "jimmy john", "quiznos", "charleys", "blimpie", "schlotzsky",
      "penn station", "sub", "deli", "sandwich"],
     "Sandwiches & Subs", "Económico (QSR)", 10.90, 44000, 0.65),
    (["dairy queen", "dunkin", "baskin", "starbucks", "krispy kreme", "tim hortons", "smoothie",
      "jamba", "cold stone", "rita's", "einstein", "pretzel", "auntie anne", "cinnabon"],
     "Coffee, Bakery & Ice Cream", "Económico (QSR)", 8.90, 49000, 0.61),
    (["panda express", "pei wei", "noodles", "teriyaki", "wok", "china", "asian", "sushi",
      "long john", "captain d", "seafood"],
     "Asian & Seafood", "Fast Casual", 13.70, 43000, 0.66),
]
REGLA_POR_DEFECTO = ("Otros / Regional", "Estándar", 12.50, 38000, 0.67)

FIN_DE_TRIMESTRE = {1: "03-31", 2: "06-30", 3: "09-30", 4: "12-31"}
ESTACIONALIDAD = {1: 0.92, 2: 1.03, 3: 1.11, 4: 1.05}  # El verano (trimestre 3) es el pico y el invierno es el más bajo
CRECIMIENTO_ORDENES = {2023: 1.000, 2024: 1.065}
AUMENTO_TICKET = {2023: 1.00, 2024: 1.03}


def clasificar_cadena(nombre):
    """Devuelve categoría, segmento, ticket base, órdenes base y proporción de costo de una cadena."""
    nombre = nombre.lower()
    for palabras, *datos in REGLAS_CADENAS:
        if any(p in nombre for p in palabras):
            return tuple(datos)
    return REGLA_POR_DEFECTO


def generar_reportes(sucursales):
    """Genera 8 cierres trimestrales (2023 y 2024) por sucursal."""
    registros = []
    for _, suc in sucursales.iterrows():
        categoria, segmento, ticket_base, ordenes_base, prop_costo = clasificar_cadena(suc["name"])

        estado = suc["province"].strip().upper()
        estado = CORRECCIONES_ESTADO.get(estado, estado)
        nombre_estado, region, poblacion, factor_estado = ESTADOS[estado]

        factor_sucursal = random.uniform(0.82, 1.24)  # Cada local tiene su propio volumen de ventas

        for anio in (2023, 2024):
            for trimestre in (1, 2, 3, 4):
                ordenes = round(ordenes_base * factor_sucursal * ESTACIONALIDAD[trimestre]
                                * CRECIMIENTO_ORDENES[anio] * random.uniform(0.93, 1.08))
                ticket = ticket_base * factor_estado * AUMENTO_TICKET[anio] * random.uniform(0.95, 1.05)
                ventas = round(ordenes * ticket, 2)
                costo = round(ventas * (prop_costo + random.uniform(-0.04, 0.04)), 2)

                registros.append({
                    "id_operacion": f"OP-{len(registros) + 1:06d}",
                    "sucursal_key": suc["keys"],
                    "categoria_comida": categoria,
                    "segmento_precio": segmento,
                    "estado_codigo": estado,
                    "estado_nombre": nombre_estado,
                    "region_eeuu": region,
                    "poblacion_estado": poblacion,
                    "fecha_reporte": f"{anio}-{FIN_DE_TRIMESTRE[trimestre]}",
                    "cantidad_ordenes": ordenes,
                    "ventas_usd": ventas,
                    "costo_operativo_usd": costo,
                })
    return pd.DataFrame(registros)


def agregar_errores(df):
    """Agrega errores controlados para validar la etapa de limpieza del etl."""
    df = df.copy()
    df.loc[df.sample(120, random_state=1).index, "costo_operativo_usd"] = None  # Valores nulos en costo
    df.loc[df.sample(80, random_state=2).index, "segmento_precio"] = None  # Valores nulos en segmento
    filas = df.sample(40, random_state=3).index
    df.loc[filas, "ventas_usd"] = -df.loc[filas, "ventas_usd"]  # Montos negativos inválidos
    filas = df.sample(60, random_state=4).index
    df.loc[filas, "categoria_comida"] = "  " + df.loc[filas, "categoria_comida"].str.lower() + " "  # Texto con espacios
    df.loc[filas, "region_eeuu"] = " " + df.loc[filas, "region_eeuu"].str.upper() + "  "  # Texto en mayúsculas
    df = pd.concat([df, df.sample(150, random_state=5)])  # Filas duplicadas exactas
    return df.sample(frac=1, random_state=6)  # Se mezclan las filas


if __name__ == "__main__":
    sucursales, _ = leer_fastfood_csv(ARCHIVO_FUENTE_1)
    print(f"Sucursales leídas de la fuente 1: {len(sucursales)}")

    reportes = agregar_errores(generar_reportes(sucursales))
    reportes.to_csv(ARCHIVO_SALIDA, index=False, encoding="utf-8")
    print(f"Fuente 2 generada en: {str(ARCHIVO_SALIDA).lower()}")
    print(f"Filas generadas con errores controlados: {len(reportes)}")
