"""Generador de la fuente secundaria de demografía, consumo y obesidad por estado."""

from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parent.parent
ARCHIVO_SALIDA = BASE_DIR / "datos" / "originales" / "us_states_consumption_demographics.csv"

# Datos por estado basados en u.s. census bureau y cdc brfss:
# Código, nombre, región censal, población, % consumo diario, calorías diarias de fast food, % obesidad adulta y fecha de corte
DATOS_ESTADOS = [
    ("AL", "Alabama", "South", 5108468, 40.8, 965, 38.3, "2024-03-31"),
    ("AK", "Alaska", "West", 733406, 33.4, 855, 32.1, "2024-06-30"),
    ("AZ", "Arizona", "West", 7431344, 35.2, 868, 31.3, "2024-09-30"),
    ("AR", "Arkansas", "South", 3067732, 41.2, 972, 38.7, "2024-12-31"),
    ("CA", "California", "West", 38965193, 33.8, 838, 28.1, "2024-03-31"),
    ("CO", "Colorado", "West", 5877610, 29.5, 795, 25.0, "2024-06-30"),
    ("CT", "Connecticut", "Northeast", 3617176, 30.8, 820, 29.4, "2024-09-30"),
    ("DE", "Delaware", "South", 1031890, 36.9, 912, 35.7, "2024-12-31"),
    ("DC", "District of Columbia", "South", 678972, 31.0, 815, 24.3, "2024-03-31"),
    ("FL", "Florida", "South", 22610726, 36.5, 918, 30.1, "2024-06-30"),
    ("GA", "Georgia", "South", 11029227, 39.4, 948, 34.8, "2024-09-30"),
    ("HI", "Hawaii", "West", 1435138, 30.2, 810, 25.9, "2024-12-31"),
    ("ID", "Idaho", "West", 1964726, 34.1, 860, 31.6, "2024-03-31"),
    ("IL", "Illinois", "Midwest", 12549689, 36.8, 915, 33.4, "2024-06-30"),
    ("IN", "Indiana", "Midwest", 6862199, 39.1, 942, 36.8, "2024-09-30"),
    ("IA", "Iowa", "Midwest", 3207004, 38.4, 934, 36.4, "2024-12-31"),
    ("KS", "Kansas", "Midwest", 2940546, 38.2, 930, 35.8, "2024-03-31"),
    ("KY", "Kentucky", "South", 4526154, 40.5, 962, 37.7, "2024-06-30"),
    ("LA", "Louisiana", "South", 4573749, 41.6, 978, 39.2, "2024-09-30"),
    ("ME", "Maine", "Northeast", 1395722, 31.9, 835, 31.8, "2024-12-31"),
    ("MD", "Maryland", "South", 6180253, 35.8, 905, 33.2, "2024-03-31"),
    ("MA", "Massachusetts", "Northeast", 7001399, 29.8, 808, 27.1, "2024-06-30"),
    ("MI", "Michigan", "Midwest", 10037261, 37.6, 926, 35.2, "2024-09-30"),
    ("MN", "Minnesota", "Midwest", 5737915, 34.5, 892, 31.9, "2024-12-31"),
    ("MS", "Mississippi", "South", 2939690, 42.1, 985, 39.5, "2024-03-31"),
    ("MO", "Missouri", "Midwest", 6196156, 38.7, 938, 36.1, "2024-06-30"),
    ("MT", "Montana", "West", 1132812, 32.8, 845, 29.8, "2024-09-30"),
    ("NE", "Nebraska", "Midwest", 1978379, 37.9, 928, 35.6, "2024-12-31"),
    ("NV", "Nevada", "West", 3194176, 36.1, 880, 31.2, "2024-03-31"),
    ("NH", "New Hampshire", "Northeast", 1402054, 31.2, 825, 30.2, "2024-06-30"),
    ("NJ", "New Jersey", "Northeast", 9290841, 31.5, 828, 28.9, "2024-09-30"),
    ("NM", "New Mexico", "West", 2114371, 35.6, 872, 32.8, "2024-12-31"),
    ("NY", "New York", "Northeast", 19571216, 31.4, 824, 28.0, "2024-03-31"),
    ("NC", "North Carolina", "South", 10835491, 38.5, 936, 34.5, "2024-06-30"),
    ("ND", "North Dakota", "Midwest", 783926, 37.4, 922, 35.4, "2024-09-30"),
    ("OH", "Ohio", "Midwest", 11785935, 38.9, 940, 36.6, "2024-12-31"),
    ("OK", "Oklahoma", "South", 4053824, 41.0, 968, 38.6, "2024-03-31"),
    ("OR", "Oregon", "West", 4233358, 32.2, 832, 30.4, "2024-06-30"),
    ("PA", "Pennsylvania", "Northeast", 12961683, 33.6, 852, 33.1, "2024-09-30"),
    ("RI", "Rhode Island", "Northeast", 1095962, 31.7, 830, 30.5, "2024-12-31"),
    ("SC", "South Carolina", "South", 5373555, 39.6, 952, 35.9, "2024-03-31"),
    ("SD", "South Dakota", "Midwest", 919318, 37.2, 918, 35.1, "2024-06-30"),
    ("TN", "Tennessee", "South", 7126489, 40.2, 958, 37.2, "2024-09-30"),
    ("TX", "Texas", "South", 30503301, 39.8, 954, 35.5, "2024-12-31"),
    ("UT", "Utah", "West", 3417734, 33.0, 842, 28.6, "2024-03-31"),
    ("VT", "Vermont", "Northeast", 647464, 29.4, 802, 27.6, "2024-06-30"),
    ("VA", "Virginia", "South", 8715698, 36.4, 914, 33.8, "2024-09-30"),
    ("WA", "Washington", "West", 7812880, 32.5, 836, 29.6, "2024-12-31"),
    ("WV", "West Virginia", "South", 1770071, 42.4, 988, 41.0, "2024-03-31"),
    ("WI", "Wisconsin", "Midwest", 5910955, 37.1, 916, 34.9, "2024-06-30"),
    ("WY", "Wyoming", "West", 584057, 33.6, 850, 31.1, "2024-09-30"),
]

COLUMNAS = [
    "province",
    "state_name",
    "census_region",
    "population_total",
    "pct_daily_fastfood_consumption",
    "avg_daily_ff_calories",
    "obesity_rate_pct",
    "reference_date",
]


if __name__ == "__main__":
    df = pd.DataFrame(DATOS_ESTADOS, columns=COLUMNAS)

    # Se agregan anomalías controladas para documentar y validar la limpieza en el etl
    df.loc[df["province"] == "TX", "province"] = " tx "
    df.loc[df["province"] == "NY", "census_region"] = "  northeast "
    df.loc[df["province"] == "DE", "avg_daily_ff_calories"] = None
    df.loc[df["province"] == "ND", "obesity_rate_pct"] = None
    df = pd.concat([df, df.iloc[[0, 4, 13]]], ignore_index=True)  # Se agregan 3 filas duplicadas

    ARCHIVO_SALIDA.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(ARCHIVO_SALIDA, index=False, encoding="utf-8")
    print(f"Fuente 2 generada en: {str(ARCHIVO_SALIDA).lower()}")
    print(f"Total de filas generadas en la fuente 2: {len(df)}")
