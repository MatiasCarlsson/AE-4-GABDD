export type CensusRegion = 'Midwest' | 'Northeast' | 'South' | 'West';

export interface StateRecord {
  province: string;
  state_name: string;
  census_region: CensusRegion;
  trimestre: number;
  fecha: string;
  pop: number;
  loc: number;
  kcal: number;
  tpcd: number;
  ob: number;
  cities: number;
  zips: number;
  dlff: number;
  rank: number;
}

export interface CubeRow {
  p: string;
  cat: string;
  ch: string;
  n: number;
}

export interface CategoryStat {
  cat: string;
  marcas: number;
  locales: number;
  pct: number;
  top: string;
}

export interface TableDictMeta {
  eyebrow: string;
  rowsBadge: string;
  title: string;
  desc: string;
  cols: [string, string, string, string][];
}

export const REGION_COLORS: Record<CensusRegion, string> = {
  Midwest: '#6D28D9',
  Northeast: '#0D9488',
  South: '#4F46E5',
  West: '#A855F7',
};

export const ESTADOS_DATA: StateRecord[] = [
  {
    "province": "SD",
    "state_name": "South Dakota",
    "census_region": "Midwest",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 919318,
    "loc": 103,
    "kcal": 918.0,
    "tpcd": 37.2,
    "ob": 35.1,
    "cities": 22,
    "zips": 25,
    "dlff": 11.2,
    "rank": 1
  },
  {
    "province": "KY",
    "state_name": "Kentucky",
    "census_region": "South",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 4526154,
    "loc": 322,
    "kcal": 962.0,
    "tpcd": 40.5,
    "ob": 37.7,
    "cities": 90,
    "zips": 113,
    "dlff": 7.11,
    "rank": 2
  },
  {
    "province": "NM",
    "state_name": "New Mexico",
    "census_region": "West",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 2114371,
    "loc": 149,
    "kcal": 872.0,
    "tpcd": 35.6,
    "ob": 32.8,
    "cities": 33,
    "zips": 52,
    "dlff": 7.05,
    "rank": 3
  },
  {
    "province": "WY",
    "state_name": "Wyoming",
    "census_region": "West",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 584057,
    "loc": 41,
    "kcal": 850.0,
    "tpcd": 33.6,
    "ob": 31.1,
    "cities": 12,
    "zips": 17,
    "dlff": 7.02,
    "rank": 4
  },
  {
    "province": "VT",
    "state_name": "Vermont",
    "census_region": "Northeast",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 647464,
    "loc": 42,
    "kcal": 802.0,
    "tpcd": 29.4,
    "ob": 27.6,
    "cities": 14,
    "zips": 14,
    "dlff": 6.49,
    "rank": 5
  },
  {
    "province": "ND",
    "state_name": "North Dakota",
    "census_region": "Midwest",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 783926,
    "loc": 50,
    "kcal": 922.0,
    "tpcd": 37.4,
    "ob": 35.3,
    "cities": 12,
    "zips": 17,
    "dlff": 6.38,
    "rank": 6
  },
  {
    "province": "IN",
    "state_name": "Indiana",
    "census_region": "Midwest",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 6862199,
    "loc": 374,
    "kcal": 942.0,
    "tpcd": 39.1,
    "ob": 36.8,
    "cities": 110,
    "zips": 156,
    "dlff": 5.45,
    "rank": 7
  },
  {
    "province": "MO",
    "state_name": "Missouri",
    "census_region": "Midwest",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 6196156,
    "loc": 330,
    "kcal": 938.0,
    "tpcd": 38.7,
    "ob": 36.1,
    "cities": 96,
    "zips": 141,
    "dlff": 5.33,
    "rank": 8
  },
  {
    "province": "WV",
    "state_name": "West Virginia",
    "census_region": "South",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 1770071,
    "loc": 92,
    "kcal": 988.0,
    "tpcd": 42.4,
    "ob": 41.0,
    "cities": 36,
    "zips": 45,
    "dlff": 5.2,
    "rank": 9
  },
  {
    "province": "LA",
    "state_name": "Louisiana",
    "census_region": "South",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 4573749,
    "loc": 236,
    "kcal": 978.0,
    "tpcd": 41.6,
    "ob": 39.2,
    "cities": 63,
    "zips": 91,
    "dlff": 5.16,
    "rank": 10
  },
  {
    "province": "OK",
    "state_name": "Oklahoma",
    "census_region": "South",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 4053824,
    "loc": 207,
    "kcal": 968.0,
    "tpcd": 41.0,
    "ob": 38.6,
    "cities": 57,
    "zips": 98,
    "dlff": 5.11,
    "rank": 11
  },
  {
    "province": "IA",
    "state_name": "Iowa",
    "census_region": "Midwest",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 3207004,
    "loc": 163,
    "kcal": 934.0,
    "tpcd": 38.4,
    "ob": 36.4,
    "cities": 59,
    "zips": 73,
    "dlff": 5.08,
    "rank": 12
  },
  {
    "province": "ID",
    "state_name": "Idaho",
    "census_region": "West",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 1964726,
    "loc": 99,
    "kcal": 860.0,
    "tpcd": 34.1,
    "ob": 31.6,
    "cities": 21,
    "zips": 31,
    "dlff": 5.04,
    "rank": 13
  },
  {
    "province": "AR",
    "state_name": "Arkansas",
    "census_region": "South",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 3067732,
    "loc": 150,
    "kcal": 972.0,
    "tpcd": 41.2,
    "ob": 38.7,
    "cities": 56,
    "zips": 69,
    "dlff": 4.89,
    "rank": 14
  },
  {
    "province": "UT",
    "state_name": "Utah",
    "census_region": "West",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 3417734,
    "loc": 159,
    "kcal": 842.0,
    "tpcd": 33.0,
    "ob": 28.6,
    "cities": 46,
    "zips": 71,
    "dlff": 4.65,
    "rank": 15
  },
  {
    "province": "AL",
    "state_name": "Alabama",
    "census_region": "South",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 5108468,
    "loc": 236,
    "kcal": 965.0,
    "tpcd": 40.8,
    "ob": 38.3,
    "cities": 91,
    "zips": 126,
    "dlff": 4.62,
    "rank": 16
  },
  {
    "province": "NE",
    "state_name": "Nebraska",
    "census_region": "Midwest",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 1978379,
    "loc": 91,
    "kcal": 928.0,
    "tpcd": 37.9,
    "ob": 35.6,
    "cities": 29,
    "zips": 44,
    "dlff": 4.6,
    "rank": 17
  },
  {
    "province": "OH",
    "state_name": "Ohio",
    "census_region": "Midwest",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 11785935,
    "loc": 540,
    "kcal": 940.0,
    "tpcd": 38.9,
    "ob": 36.6,
    "cities": 152,
    "zips": 243,
    "dlff": 4.58,
    "rank": 18
  },
  {
    "province": "SC",
    "state_name": "South Carolina",
    "census_region": "South",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 5373555,
    "loc": 236,
    "kcal": 952.0,
    "tpcd": 39.6,
    "ob": 35.9,
    "cities": 81,
    "zips": 119,
    "dlff": 4.39,
    "rank": 19
  },
  {
    "province": "NV",
    "state_name": "Nevada",
    "census_region": "West",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 3194176,
    "loc": 133,
    "kcal": 880.0,
    "tpcd": 36.1,
    "ob": 31.2,
    "cities": 13,
    "zips": 47,
    "dlff": 4.16,
    "rank": 20
  },
  {
    "province": "VA",
    "state_name": "Virginia",
    "census_region": "South",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 8715698,
    "loc": 322,
    "kcal": 914.0,
    "tpcd": 36.4,
    "ob": 33.8,
    "cities": 105,
    "zips": 156,
    "dlff": 3.69,
    "rank": 21
  },
  {
    "province": "KS",
    "state_name": "Kansas",
    "census_region": "Midwest",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 2940546,
    "loc": 102,
    "kcal": 930.0,
    "tpcd": 38.2,
    "ob": 35.8,
    "cities": 45,
    "zips": 64,
    "dlff": 3.47,
    "rank": 22
  },
  {
    "province": "TN",
    "state_name": "Tennessee",
    "census_region": "South",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 7126489,
    "loc": 244,
    "kcal": 958.0,
    "tpcd": 40.2,
    "ob": 37.2,
    "cities": 94,
    "zips": 143,
    "dlff": 3.42,
    "rank": 23
  },
  {
    "province": "NC",
    "state_name": "North Carolina",
    "census_region": "South",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 10835491,
    "loc": 357,
    "kcal": 936.0,
    "tpcd": 38.5,
    "ob": 34.5,
    "cities": 133,
    "zips": 179,
    "dlff": 3.29,
    "rank": 24
  },
  {
    "province": "ME",
    "state_name": "Maine",
    "census_region": "Northeast",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 1395722,
    "loc": 44,
    "kcal": 835.0,
    "tpcd": 31.9,
    "ob": 31.8,
    "cities": 23,
    "zips": 23,
    "dlff": 3.15,
    "rank": 25
  },
  {
    "province": "GA",
    "state_name": "Georgia",
    "census_region": "South",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 11029227,
    "loc": 344,
    "kcal": 948.0,
    "tpcd": 39.4,
    "ob": 34.8,
    "cities": 117,
    "zips": 187,
    "dlff": 3.12,
    "rank": 26
  },
  {
    "province": "WI",
    "state_name": "Wisconsin",
    "census_region": "Midwest",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 5910955,
    "loc": 183,
    "kcal": 916.0,
    "tpcd": 37.1,
    "ob": 34.9,
    "cities": 77,
    "zips": 100,
    "dlff": 3.1,
    "rank": 27
  },
  {
    "province": "DE",
    "state_name": "Delaware",
    "census_region": "South",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 1031890,
    "loc": 32,
    "kcal": 944.9,
    "tpcd": 36.9,
    "ob": 35.7,
    "cities": 13,
    "zips": 15,
    "dlff": 3.1,
    "rank": 28
  },
  {
    "province": "DC",
    "state_name": "District of Columbia",
    "census_region": "South",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 678972,
    "loc": 21,
    "kcal": 815.0,
    "tpcd": 31.0,
    "ob": 24.3,
    "cities": 1,
    "zips": 13,
    "dlff": 3.09,
    "rank": 29
  },
  {
    "province": "IL",
    "state_name": "Illinois",
    "census_region": "Midwest",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 12549689,
    "loc": 358,
    "kcal": 915.0,
    "tpcd": 36.8,
    "ob": 33.4,
    "cities": 148,
    "zips": 202,
    "dlff": 2.85,
    "rank": 30
  },
  {
    "province": "HI",
    "state_name": "Hawaii",
    "census_region": "West",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 1435138,
    "loc": 40,
    "kcal": 810.0,
    "tpcd": 30.2,
    "ob": 25.9,
    "cities": 15,
    "zips": 21,
    "dlff": 2.79,
    "rank": 31
  },
  {
    "province": "MS",
    "state_name": "Mississippi",
    "census_region": "South",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 2939690,
    "loc": 81,
    "kcal": 985.0,
    "tpcd": 42.1,
    "ob": 39.5,
    "cities": 26,
    "zips": 29,
    "dlff": 2.76,
    "rank": 32
  },
  {
    "province": "CO",
    "state_name": "Colorado",
    "census_region": "West",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 5877610,
    "loc": 162,
    "kcal": 795.0,
    "tpcd": 29.5,
    "ob": 25.0,
    "cities": 42,
    "zips": 93,
    "dlff": 2.76,
    "rank": 33
  },
  {
    "province": "AZ",
    "state_name": "Arizona",
    "census_region": "West",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 7431344,
    "loc": 203,
    "kcal": 868.0,
    "tpcd": 35.2,
    "ob": 31.3,
    "cities": 45,
    "zips": 115,
    "dlff": 2.73,
    "rank": 34
  },
  {
    "province": "CT",
    "state_name": "Connecticut",
    "census_region": "Northeast",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 3617176,
    "loc": 96,
    "kcal": 820.0,
    "tpcd": 30.8,
    "ob": 29.4,
    "cities": 39,
    "zips": 46,
    "dlff": 2.65,
    "rank": 35
  },
  {
    "province": "OR",
    "state_name": "Oregon",
    "census_region": "West",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 4233358,
    "loc": 112,
    "kcal": 832.0,
    "tpcd": 32.2,
    "ob": 30.4,
    "cities": 46,
    "zips": 71,
    "dlff": 2.65,
    "rank": 36
  },
  {
    "province": "WA",
    "state_name": "Washington",
    "census_region": "West",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 7812880,
    "loc": 206,
    "kcal": 836.0,
    "tpcd": 32.5,
    "ob": 29.6,
    "cities": 64,
    "zips": 102,
    "dlff": 2.64,
    "rank": 37
  },
  {
    "province": "MN",
    "state_name": "Minnesota",
    "census_region": "Midwest",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 5737915,
    "loc": 148,
    "kcal": 892.0,
    "tpcd": 34.5,
    "ob": 31.9,
    "cities": 44,
    "zips": 80,
    "dlff": 2.58,
    "rank": 38
  },
  {
    "province": "MD",
    "state_name": "Maryland",
    "census_region": "South",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 6180253,
    "loc": 158,
    "kcal": 905.0,
    "tpcd": 35.8,
    "ob": 33.2,
    "cities": 67,
    "zips": 91,
    "dlff": 2.56,
    "rank": 39
  },
  {
    "province": "NH",
    "state_name": "New Hampshire",
    "census_region": "Northeast",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 1402054,
    "loc": 35,
    "kcal": 825.0,
    "tpcd": 31.2,
    "ob": 30.2,
    "cities": 20,
    "zips": 23,
    "dlff": 2.5,
    "rank": 40
  },
  {
    "province": "MI",
    "state_name": "Michigan",
    "census_region": "Midwest",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 10037261,
    "loc": 249,
    "kcal": 926.0,
    "tpcd": 37.6,
    "ob": 35.2,
    "cities": 105,
    "zips": 143,
    "dlff": 2.48,
    "rank": 41
  },
  {
    "province": "MT",
    "state_name": "Montana",
    "census_region": "West",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 1132812,
    "loc": 25,
    "kcal": 845.0,
    "tpcd": 32.8,
    "ob": 29.8,
    "cities": 11,
    "zips": 17,
    "dlff": 2.21,
    "rank": 42
  },
  {
    "province": "RI",
    "state_name": "Rhode Island",
    "census_region": "Northeast",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 1095962,
    "loc": 24,
    "kcal": 830.0,
    "tpcd": 31.7,
    "ob": 30.5,
    "cities": 16,
    "zips": 18,
    "dlff": 2.19,
    "rank": 43
  },
  {
    "province": "PA",
    "state_name": "Pennsylvania",
    "census_region": "Northeast",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 12961683,
    "loc": 281,
    "kcal": 852.0,
    "tpcd": 33.6,
    "ob": 33.1,
    "cities": 133,
    "zips": 175,
    "dlff": 2.17,
    "rank": 44
  },
  {
    "province": "FL",
    "state_name": "Florida",
    "census_region": "South",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 22610726,
    "loc": 468,
    "kcal": 918.0,
    "tpcd": 36.5,
    "ob": 30.1,
    "cities": 124,
    "zips": 284,
    "dlff": 2.07,
    "rank": 45
  },
  {
    "province": "TX",
    "state_name": "Texas",
    "census_region": "South",
    "trimestre": 4,
    "fecha": "2024-12-31",
    "pop": 30503301,
    "loc": 624,
    "kcal": 954.0,
    "tpcd": 39.8,
    "ob": 35.5,
    "cities": 210,
    "zips": 399,
    "dlff": 2.05,
    "rank": 46
  },
  {
    "province": "AK",
    "state_name": "Alaska",
    "census_region": "West",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 733406,
    "loc": 14,
    "kcal": 855.0,
    "tpcd": 33.4,
    "ob": 32.1,
    "cities": 6,
    "zips": 11,
    "dlff": 1.91,
    "rank": 47
  },
  {
    "province": "MA",
    "state_name": "Massachusetts",
    "census_region": "Northeast",
    "trimestre": 2,
    "fecha": "2024-06-30",
    "pop": 7001399,
    "loc": 129,
    "kcal": 808.0,
    "tpcd": 29.8,
    "ob": 27.1,
    "cities": 78,
    "zips": 89,
    "dlff": 1.84,
    "rank": 48
  },
  {
    "province": "CA",
    "state_name": "California",
    "census_region": "West",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 38965193,
    "loc": 675,
    "kcal": 838.0,
    "tpcd": 33.8,
    "ob": 28.1,
    "cities": 259,
    "zips": 421,
    "dlff": 1.73,
    "rank": 49
  },
  {
    "province": "NJ",
    "state_name": "New Jersey",
    "census_region": "Northeast",
    "trimestre": 3,
    "fecha": "2024-09-30",
    "pop": 9290841,
    "loc": 149,
    "kcal": 828.0,
    "tpcd": 31.5,
    "ob": 28.9,
    "cities": 96,
    "zips": 99,
    "dlff": 1.6,
    "rank": 50
  },
  {
    "province": "NY",
    "state_name": "New York",
    "census_region": "Northeast",
    "trimestre": 1,
    "fecha": "2024-03-31",
    "pop": 19571216,
    "loc": 265,
    "kcal": 824.0,
    "tpcd": 31.4,
    "ob": 28.0,
    "cities": 121,
    "zips": 186,
    "dlff": 1.35,
    "rank": 51
  }
];

export const CUBE_DATA: CubeRow[] = [{"p": "AK", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 3}, {"p": "AK", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 1}, {"p": "AK", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 1}, {"p": "AK", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 1}, {"p": "AK", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 2}, {"p": "AK", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "AK", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 3}, {"p": "AK", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 1}, {"p": "AL", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 4}, {"p": "AL", "cat": "Burgers & Grill", "ch": "Burger King", "n": 30}, {"p": "AL", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 9}, {"p": "AL", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 42}, {"p": "AL", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 7}, {"p": "AL", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 15}, {"p": "AL", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 13}, {"p": "AL", "cat": "Chicken & Wings", "ch": "KFC", "n": 9}, {"p": "AL", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 26}, {"p": "AL", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 14}, {"p": "AL", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 1}, {"p": "AL", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 3}, {"p": "AL", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 25}, {"p": "AL", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 1}, {"p": "AL", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 1}, {"p": "AL", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 4}, {"p": "AL", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 1}, {"p": "AL", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 31}, {"p": "AR", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 3}, {"p": "AR", "cat": "Burgers & Grill", "ch": "Burger King", "n": 5}, {"p": "AR", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 4}, {"p": "AR", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 28}, {"p": "AR", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 9}, {"p": "AR", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 28}, {"p": "AR", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 11}, {"p": "AR", "cat": "Chicken & Wings", "ch": "KFC", "n": 8}, {"p": "AR", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 7}, {"p": "AR", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 2}, {"p": "AR", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 5}, {"p": "AR", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 4}, {"p": "AR", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 10}, {"p": "AR", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 2}, {"p": "AR", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 3}, {"p": "AR", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 8}, {"p": "AR", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 13}, {"p": "AZ", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 6}, {"p": "AZ", "cat": "Burgers & Grill", "ch": "Burger King", "n": 16}, {"p": "AZ", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 13}, {"p": "AZ", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 34}, {"p": "AZ", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 13}, {"p": "AZ", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 8}, {"p": "AZ", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 12}, {"p": "AZ", "cat": "Chicken & Wings", "ch": "KFC", "n": 10}, {"p": "AZ", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 10}, {"p": "AZ", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 3}, {"p": "AZ", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 5}, {"p": "AZ", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 15}, {"p": "AZ", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 10}, {"p": "AZ", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 7}, {"p": "AZ", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 2}, {"p": "AZ", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 6}, {"p": "AZ", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 9}, {"p": "AZ", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 8}, {"p": "AZ", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 16}, {"p": "CA", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 11}, {"p": "CA", "cat": "Burgers & Grill", "ch": "Burger King", "n": 58}, {"p": "CA", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 65}, {"p": "CA", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 133}, {"p": "CA", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 80}, {"p": "CA", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 2}, {"p": "CA", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 26}, {"p": "CA", "cat": "Chicken & Wings", "ch": "KFC", "n": 24}, {"p": "CA", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 10}, {"p": "CA", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "CA", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 40}, {"p": "CA", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 16}, {"p": "CA", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 27}, {"p": "CA", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 3}, {"p": "CA", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 1}, {"p": "CA", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 6}, {"p": "CA", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 36}, {"p": "CA", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 66}, {"p": "CA", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 70}, {"p": "CO", "cat": "Burgers & Grill", "ch": "Burger King", "n": 25}, {"p": "CO", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 26}, {"p": "CO", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 10}, {"p": "CO", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 16}, {"p": "CO", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 8}, {"p": "CO", "cat": "Chicken & Wings", "ch": "KFC", "n": 5}, {"p": "CO", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 1}, {"p": "CO", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 4}, {"p": "CO", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 4}, {"p": "CO", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 6}, {"p": "CO", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 12}, {"p": "CO", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 5}, {"p": "CO", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 3}, {"p": "CO", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 4}, {"p": "CO", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 16}, {"p": "CO", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "CO", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 15}, {"p": "CT", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "CT", "cat": "Burgers & Grill", "ch": "Burger King", "n": 12}, {"p": "CT", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 38}, {"p": "CT", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 5}, {"p": "CT", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 1}, {"p": "CT", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 9}, {"p": "CT", "cat": "Chicken & Wings", "ch": "KFC", "n": 3}, {"p": "CT", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 2}, {"p": "CT", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 2}, {"p": "CT", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 8}, {"p": "CT", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 3}, {"p": "CT", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 1}, {"p": "CT", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 3}, {"p": "CT", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 8}, {"p": "DC", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 4}, {"p": "DC", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 2}, {"p": "DC", "cat": "Chicken & Wings", "ch": "KFC", "n": 1}, {"p": "DC", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 2}, {"p": "DC", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 3}, {"p": "DC", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 1}, {"p": "DC", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "DC", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 3}, {"p": "DC", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "DC", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 1}, {"p": "DE", "cat": "Burgers & Grill", "ch": "Burger King", "n": 3}, {"p": "DE", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 1}, {"p": "DE", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 6}, {"p": "DE", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 1}, {"p": "DE", "cat": "Chicken & Wings", "ch": "KFC", "n": 1}, {"p": "DE", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 5}, {"p": "DE", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 6}, {"p": "DE", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 1}, {"p": "DE", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 4}, {"p": "DE", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 1}, {"p": "DE", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 1}, {"p": "DE", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 2}, {"p": "FL", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 5}, {"p": "FL", "cat": "Burgers & Grill", "ch": "Burger King", "n": 91}, {"p": "FL", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 2}, {"p": "FL", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 95}, {"p": "FL", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 39}, {"p": "FL", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 6}, {"p": "FL", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 36}, {"p": "FL", "cat": "Chicken & Wings", "ch": "KFC", "n": 35}, {"p": "FL", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 24}, {"p": "FL", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 4}, {"p": "FL", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 29}, {"p": "FL", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 21}, {"p": "FL", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 16}, {"p": "FL", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 7}, {"p": "FL", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 9}, {"p": "FL", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 4}, {"p": "FL", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 19}, {"p": "FL", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "FL", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 24}, {"p": "GA", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 7}, {"p": "GA", "cat": "Burgers & Grill", "ch": "Burger King", "n": 40}, {"p": "GA", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 11}, {"p": "GA", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 62}, {"p": "GA", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 18}, {"p": "GA", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 10}, {"p": "GA", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 32}, {"p": "GA", "cat": "Chicken & Wings", "ch": "KFC", "n": 12}, {"p": "GA", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 39}, {"p": "GA", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 4}, {"p": "GA", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 33}, {"p": "GA", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 13}, {"p": "GA", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 5}, {"p": "GA", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 15}, {"p": "GA", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 3}, {"p": "GA", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 2}, {"p": "GA", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 12}, {"p": "GA", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 1}, {"p": "GA", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 25}, {"p": "HI", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "HI", "cat": "Burgers & Grill", "ch": "Burger King", "n": 5}, {"p": "HI", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 4}, {"p": "HI", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 1}, {"p": "HI", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 2}, {"p": "HI", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 1}, {"p": "HI", "cat": "Chicken & Wings", "ch": "KFC", "n": 1}, {"p": "HI", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "HI", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 4}, {"p": "HI", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 4}, {"p": "HI", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 5}, {"p": "HI", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 1}, {"p": "HI", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 1}, {"p": "HI", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 5}, {"p": "HI", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "HI", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 2}, {"p": "IA", "cat": "Burgers & Grill", "ch": "Burger King", "n": 23}, {"p": "IA", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 9}, {"p": "IA", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 37}, {"p": "IA", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 5}, {"p": "IA", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 2}, {"p": "IA", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 10}, {"p": "IA", "cat": "Chicken & Wings", "ch": "KFC", "n": 8}, {"p": "IA", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 2}, {"p": "IA", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "IA", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 5}, {"p": "IA", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 5}, {"p": "IA", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 1}, {"p": "IA", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 10}, {"p": "IA", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 8}, {"p": "IA", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 2}, {"p": "IA", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 8}, {"p": "IA", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 15}, {"p": "IA", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 12}, {"p": "ID", "cat": "Burgers & Grill", "ch": "Burger King", "n": 7}, {"p": "ID", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 9}, {"p": "ID", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 14}, {"p": "ID", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 4}, {"p": "ID", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 4}, {"p": "ID", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 7}, {"p": "ID", "cat": "Chicken & Wings", "ch": "KFC", "n": 4}, {"p": "ID", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 1}, {"p": "ID", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "ID", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 4}, {"p": "ID", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 7}, {"p": "ID", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 6}, {"p": "ID", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 8}, {"p": "ID", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 7}, {"p": "ID", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 1}, {"p": "ID", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 1}, {"p": "ID", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 4}, {"p": "ID", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 10}, {"p": "IL", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 9}, {"p": "IL", "cat": "Burgers & Grill", "ch": "Burger King", "n": 56}, {"p": "IL", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 12}, {"p": "IL", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 3}, {"p": "IL", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 82}, {"p": "IL", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 20}, {"p": "IL", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 3}, {"p": "IL", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 22}, {"p": "IL", "cat": "Chicken & Wings", "ch": "KFC", "n": 16}, {"p": "IL", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 5}, {"p": "IL", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 5}, {"p": "IL", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 28}, {"p": "IL", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 8}, {"p": "IL", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 3}, {"p": "IL", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 7}, {"p": "IL", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 8}, {"p": "IL", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 4}, {"p": "IL", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 18}, {"p": "IL", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "IL", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 47}, {"p": "IN", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 6}, {"p": "IN", "cat": "Burgers & Grill", "ch": "Burger King", "n": 41}, {"p": "IN", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 11}, {"p": "IN", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 1}, {"p": "IN", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 85}, {"p": "IN", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 21}, {"p": "IN", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 2}, {"p": "IN", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 44}, {"p": "IN", "cat": "Chicken & Wings", "ch": "KFC", "n": 24}, {"p": "IN", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 8}, {"p": "IN", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "IN", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 8}, {"p": "IN", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 9}, {"p": "IN", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 1}, {"p": "IN", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 44}, {"p": "IN", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 11}, {"p": "IN", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 3}, {"p": "IN", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 4}, {"p": "IN", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "IN", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 48}, {"p": "KS", "cat": "Burgers & Grill", "ch": "Burger King", "n": 14}, {"p": "KS", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 11}, {"p": "KS", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 1}, {"p": "KS", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 21}, {"p": "KS", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 3}, {"p": "KS", "cat": "Chicken & Wings", "ch": "KFC", "n": 6}, {"p": "KS", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 9}, {"p": "KS", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "KS", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 4}, {"p": "KS", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 1}, {"p": "KS", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 3}, {"p": "KS", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 5}, {"p": "KS", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 2}, {"p": "KS", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 1}, {"p": "KS", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 12}, {"p": "KS", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 5}, {"p": "KS", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 3}, {"p": "KY", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 9}, {"p": "KY", "cat": "Burgers & Grill", "ch": "Burger King", "n": 21}, {"p": "KY", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 10}, {"p": "KY", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 77}, {"p": "KY", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 16}, {"p": "KY", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 9}, {"p": "KY", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 36}, {"p": "KY", "cat": "Chicken & Wings", "ch": "KFC", "n": 11}, {"p": "KY", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 6}, {"p": "KY", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 6}, {"p": "KY", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 21}, {"p": "KY", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 8}, {"p": "KY", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 3}, {"p": "KY", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 33}, {"p": "KY", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 6}, {"p": "KY", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 6}, {"p": "KY", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 10}, {"p": "KY", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 4}, {"p": "KY", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 30}, {"p": "LA", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 3}, {"p": "LA", "cat": "Burgers & Grill", "ch": "Burger King", "n": 26}, {"p": "LA", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 1}, {"p": "LA", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 62}, {"p": "LA", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 10}, {"p": "LA", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 30}, {"p": "LA", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 21}, {"p": "LA", "cat": "Chicken & Wings", "ch": "KFC", "n": 3}, {"p": "LA", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 15}, {"p": "LA", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 3}, {"p": "LA", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 11}, {"p": "LA", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 4}, {"p": "LA", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "LA", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 10}, {"p": "LA", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 4}, {"p": "LA", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 7}, {"p": "LA", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 24}, {"p": "MA", "cat": "Burgers & Grill", "ch": "Burger King", "n": 30}, {"p": "MA", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 27}, {"p": "MA", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 6}, {"p": "MA", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 10}, {"p": "MA", "cat": "Chicken & Wings", "ch": "KFC", "n": 2}, {"p": "MA", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 3}, {"p": "MA", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 5}, {"p": "MA", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 11}, {"p": "MA", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 14}, {"p": "MA", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "MA", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 1}, {"p": "MA", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 5}, {"p": "MA", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 6}, {"p": "MA", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MA", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 6}, {"p": "MD", "cat": "Burgers & Grill", "ch": "Burger King", "n": 16}, {"p": "MD", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 2}, {"p": "MD", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 34}, {"p": "MD", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 13}, {"p": "MD", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 3}, {"p": "MD", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 11}, {"p": "MD", "cat": "Chicken & Wings", "ch": "KFC", "n": 3}, {"p": "MD", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 12}, {"p": "MD", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 14}, {"p": "MD", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 5}, {"p": "MD", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "MD", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 5}, {"p": "MD", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 4}, {"p": "MD", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 17}, {"p": "MD", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 6}, {"p": "MD", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 11}, {"p": "ME", "cat": "Burgers & Grill", "ch": "Burger King", "n": 8}, {"p": "ME", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 12}, {"p": "ME", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 3}, {"p": "ME", "cat": "Chicken & Wings", "ch": "KFC", "n": 4}, {"p": "ME", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 3}, {"p": "ME", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 4}, {"p": "ME", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 1}, {"p": "ME", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 3}, {"p": "ME", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 4}, {"p": "ME", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 1}, {"p": "ME", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 1}, {"p": "MI", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MI", "cat": "Burgers & Grill", "ch": "Burger King", "n": 55}, {"p": "MI", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 3}, {"p": "MI", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 49}, {"p": "MI", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 20}, {"p": "MI", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 1}, {"p": "MI", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 26}, {"p": "MI", "cat": "Chicken & Wings", "ch": "KFC", "n": 14}, {"p": "MI", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 6}, {"p": "MI", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MI", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 6}, {"p": "MI", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 1}, {"p": "MI", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 21}, {"p": "MI", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 14}, {"p": "MI", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 2}, {"p": "MI", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 2}, {"p": "MI", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 27}, {"p": "MN", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MN", "cat": "Burgers & Grill", "ch": "Burger King", "n": 23}, {"p": "MN", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 6}, {"p": "MN", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 29}, {"p": "MN", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 9}, {"p": "MN", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 10}, {"p": "MN", "cat": "Chicken & Wings", "ch": "KFC", "n": 5}, {"p": "MN", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MN", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 2}, {"p": "MN", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MN", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 6}, {"p": "MN", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 5}, {"p": "MN", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 9}, {"p": "MN", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 5}, {"p": "MN", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 3}, {"p": "MN", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 9}, {"p": "MN", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 15}, {"p": "MN", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 9}, {"p": "MO", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 7}, {"p": "MO", "cat": "Burgers & Grill", "ch": "Burger King", "n": 16}, {"p": "MO", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 10}, {"p": "MO", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 9}, {"p": "MO", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 78}, {"p": "MO", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 23}, {"p": "MO", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 39}, {"p": "MO", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 20}, {"p": "MO", "cat": "Chicken & Wings", "ch": "KFC", "n": 9}, {"p": "MO", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 11}, {"p": "MO", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 2}, {"p": "MO", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 11}, {"p": "MO", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 8}, {"p": "MO", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MO", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 18}, {"p": "MO", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 11}, {"p": "MO", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 4}, {"p": "MO", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 11}, {"p": "MO", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MO", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 41}, {"p": "MS", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MS", "cat": "Burgers & Grill", "ch": "Burger King", "n": 5}, {"p": "MS", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 6}, {"p": "MS", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 10}, {"p": "MS", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 3}, {"p": "MS", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 14}, {"p": "MS", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 8}, {"p": "MS", "cat": "Chicken & Wings", "ch": "KFC", "n": 4}, {"p": "MS", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MS", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 4}, {"p": "MS", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 13}, {"p": "MS", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "MS", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 1}, {"p": "MS", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MS", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 8}, {"p": "MT", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 2}, {"p": "MT", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 3}, {"p": "MT", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 2}, {"p": "MT", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 5}, {"p": "MT", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 1}, {"p": "MT", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 1}, {"p": "MT", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 1}, {"p": "MT", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 2}, {"p": "MT", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 4}, {"p": "MT", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "MT", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 2}, {"p": "NC", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "NC", "cat": "Burgers & Grill", "ch": "Burger King", "n": 24}, {"p": "NC", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 16}, {"p": "NC", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 2}, {"p": "NC", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 79}, {"p": "NC", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 4}, {"p": "NC", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 12}, {"p": "NC", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 37}, {"p": "NC", "cat": "Chicken & Wings", "ch": "KFC", "n": 14}, {"p": "NC", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 59}, {"p": "NC", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "NC", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 20}, {"p": "NC", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 8}, {"p": "NC", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 3}, {"p": "NC", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 27}, {"p": "NC", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 3}, {"p": "NC", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 3}, {"p": "NC", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 7}, {"p": "NC", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 37}, {"p": "ND", "cat": "Burgers & Grill", "ch": "Burger King", "n": 6}, {"p": "ND", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 6}, {"p": "ND", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 7}, {"p": "ND", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 2}, {"p": "ND", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 1}, {"p": "ND", "cat": "Chicken & Wings", "ch": "KFC", "n": 1}, {"p": "ND", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 1}, {"p": "ND", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 5}, {"p": "ND", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 3}, {"p": "ND", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 3}, {"p": "ND", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 1}, {"p": "ND", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 2}, {"p": "ND", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 9}, {"p": "ND", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 3}, {"p": "NE", "cat": "Burgers & Grill", "ch": "Burger King", "n": 8}, {"p": "NE", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 13}, {"p": "NE", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NE", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 5}, {"p": "NE", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 2}, {"p": "NE", "cat": "Chicken & Wings", "ch": "KFC", "n": 1}, {"p": "NE", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NE", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "NE", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 13}, {"p": "NE", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 6}, {"p": "NE", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NE", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 12}, {"p": "NE", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 4}, {"p": "NE", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 3}, {"p": "NE", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 7}, {"p": "NE", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 5}, {"p": "NE", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 5}, {"p": "NH", "cat": "Burgers & Grill", "ch": "Burger King", "n": 4}, {"p": "NH", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 9}, {"p": "NH", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NH", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 4}, {"p": "NH", "cat": "Chicken & Wings", "ch": "KFC", "n": 2}, {"p": "NH", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NH", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NH", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 3}, {"p": "NH", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NH", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 1}, {"p": "NH", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 1}, {"p": "NH", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 3}, {"p": "NJ", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 3}, {"p": "NJ", "cat": "Burgers & Grill", "ch": "Burger King", "n": 23}, {"p": "NJ", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 1}, {"p": "NJ", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 38}, {"p": "NJ", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 9}, {"p": "NJ", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 1}, {"p": "NJ", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 9}, {"p": "NJ", "cat": "Chicken & Wings", "ch": "KFC", "n": 8}, {"p": "NJ", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 3}, {"p": "NJ", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 4}, {"p": "NJ", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 16}, {"p": "NJ", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 8}, {"p": "NJ", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 4}, {"p": "NJ", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 2}, {"p": "NJ", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 1}, {"p": "NJ", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 6}, {"p": "NJ", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 6}, {"p": "NJ", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NJ", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 5}, {"p": "NM", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "NM", "cat": "Burgers & Grill", "ch": "Burger King", "n": 7}, {"p": "NM", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 23}, {"p": "NM", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 12}, {"p": "NM", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 26}, {"p": "NM", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 6}, {"p": "NM", "cat": "Chicken & Wings", "ch": "KFC", "n": 4}, {"p": "NM", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 1}, {"p": "NM", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NM", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 6}, {"p": "NM", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 22}, {"p": "NM", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 5}, {"p": "NM", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 7}, {"p": "NM", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 1}, {"p": "NM", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NM", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 6}, {"p": "NM", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 3}, {"p": "NM", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 15}, {"p": "NV", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "NV", "cat": "Burgers & Grill", "ch": "Burger King", "n": 10}, {"p": "NV", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 9}, {"p": "NV", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 16}, {"p": "NV", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 12}, {"p": "NV", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 3}, {"p": "NV", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 7}, {"p": "NV", "cat": "Chicken & Wings", "ch": "KFC", "n": 4}, {"p": "NV", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 1}, {"p": "NV", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 6}, {"p": "NV", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 10}, {"p": "NV", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 9}, {"p": "NV", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 10}, {"p": "NV", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 2}, {"p": "NV", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 2}, {"p": "NV", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 6}, {"p": "NV", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 6}, {"p": "NV", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 12}, {"p": "NV", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 7}, {"p": "NY", "cat": "Burgers & Grill", "ch": "Burger King", "n": 58}, {"p": "NY", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 72}, {"p": "NY", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 11}, {"p": "NY", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 15}, {"p": "NY", "cat": "Chicken & Wings", "ch": "KFC", "n": 15}, {"p": "NY", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 4}, {"p": "NY", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 11}, {"p": "NY", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 6}, {"p": "NY", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 12}, {"p": "NY", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 7}, {"p": "NY", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 8}, {"p": "NY", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NY", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 19}, {"p": "NY", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "NY", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 23}, {"p": "OH", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 7}, {"p": "OH", "cat": "Burgers & Grill", "ch": "Burger King", "n": 72}, {"p": "OH", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 5}, {"p": "OH", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 2}, {"p": "OH", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 119}, {"p": "OH", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 39}, {"p": "OH", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 5}, {"p": "OH", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 70}, {"p": "OH", "cat": "Chicken & Wings", "ch": "KFC", "n": 26}, {"p": "OH", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 10}, {"p": "OH", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 3}, {"p": "OH", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 49}, {"p": "OH", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 5}, {"p": "OH", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "OH", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 48}, {"p": "OH", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 14}, {"p": "OH", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 6}, {"p": "OH", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 2}, {"p": "OH", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 3}, {"p": "OH", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 53}, {"p": "OK", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 3}, {"p": "OK", "cat": "Burgers & Grill", "ch": "Burger King", "n": 6}, {"p": "OK", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 2}, {"p": "OK", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 53}, {"p": "OK", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 11}, {"p": "OK", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 30}, {"p": "OK", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 6}, {"p": "OK", "cat": "Chicken & Wings", "ch": "KFC", "n": 12}, {"p": "OK", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 9}, {"p": "OK", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 9}, {"p": "OK", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 9}, {"p": "OK", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 3}, {"p": "OK", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 18}, {"p": "OK", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 4}, {"p": "OK", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 8}, {"p": "OK", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 4}, {"p": "OK", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 20}, {"p": "OR", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "OR", "cat": "Burgers & Grill", "ch": "Burger King", "n": 14}, {"p": "OR", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 4}, {"p": "OR", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 24}, {"p": "OR", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 9}, {"p": "OR", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 6}, {"p": "OR", "cat": "Chicken & Wings", "ch": "KFC", "n": 3}, {"p": "OR", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 2}, {"p": "OR", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 4}, {"p": "OR", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 5}, {"p": "OR", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 6}, {"p": "OR", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 4}, {"p": "OR", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 2}, {"p": "OR", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 8}, {"p": "OR", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 8}, {"p": "OR", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 12}, {"p": "PA", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 4}, {"p": "PA", "cat": "Burgers & Grill", "ch": "Burger King", "n": 52}, {"p": "PA", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 3}, {"p": "PA", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 71}, {"p": "PA", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 9}, {"p": "PA", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 3}, {"p": "PA", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 42}, {"p": "PA", "cat": "Chicken & Wings", "ch": "KFC", "n": 23}, {"p": "PA", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 5}, {"p": "PA", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 4}, {"p": "PA", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 17}, {"p": "PA", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 4}, {"p": "PA", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "PA", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 21}, {"p": "PA", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 3}, {"p": "PA", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 6}, {"p": "PA", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 12}, {"p": "RI", "cat": "Burgers & Grill", "ch": "Burger King", "n": 5}, {"p": "RI", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 3}, {"p": "RI", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 1}, {"p": "RI", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 4}, {"p": "RI", "cat": "Chicken & Wings", "ch": "KFC", "n": 3}, {"p": "RI", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 1}, {"p": "RI", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 2}, {"p": "RI", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 1}, {"p": "RI", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 4}, {"p": "SC", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 4}, {"p": "SC", "cat": "Burgers & Grill", "ch": "Burger King", "n": 27}, {"p": "SC", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 8}, {"p": "SC", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 3}, {"p": "SC", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 45}, {"p": "SC", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 5}, {"p": "SC", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 11}, {"p": "SC", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 13}, {"p": "SC", "cat": "Chicken & Wings", "ch": "KFC", "n": 10}, {"p": "SC", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 31}, {"p": "SC", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 2}, {"p": "SC", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 26}, {"p": "SC", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 8}, {"p": "SC", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 4}, {"p": "SC", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 11}, {"p": "SC", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 2}, {"p": "SC", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 2}, {"p": "SC", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 11}, {"p": "SC", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 13}, {"p": "SD", "cat": "Burgers & Grill", "ch": "Burger King", "n": 10}, {"p": "SD", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 4}, {"p": "SD", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 18}, {"p": "SD", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 4}, {"p": "SD", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 2}, {"p": "SD", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 5}, {"p": "SD", "cat": "Chicken & Wings", "ch": "KFC", "n": 2}, {"p": "SD", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 1}, {"p": "SD", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 6}, {"p": "SD", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 11}, {"p": "SD", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 2}, {"p": "SD", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 8}, {"p": "SD", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 3}, {"p": "SD", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 1}, {"p": "SD", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 8}, {"p": "SD", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 14}, {"p": "SD", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 4}, {"p": "TN", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 2}, {"p": "TN", "cat": "Burgers & Grill", "ch": "Burger King", "n": 25}, {"p": "TN", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 11}, {"p": "TN", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 1}, {"p": "TN", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 42}, {"p": "TN", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 16}, {"p": "TN", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 23}, {"p": "TN", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 17}, {"p": "TN", "cat": "Chicken & Wings", "ch": "KFC", "n": 10}, {"p": "TN", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 17}, {"p": "TN", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "TN", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 30}, {"p": "TN", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 6}, {"p": "TN", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 4}, {"p": "TN", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 12}, {"p": "TN", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 2}, {"p": "TN", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 5}, {"p": "TN", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 2}, {"p": "TN", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "TN", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 16}, {"p": "TX", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 6}, {"p": "TX", "cat": "Burgers & Grill", "ch": "Burger King", "n": 47}, {"p": "TX", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 53}, {"p": "TX", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 164}, {"p": "TX", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 88}, {"p": "TX", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 30}, {"p": "TX", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 26}, {"p": "TX", "cat": "Chicken & Wings", "ch": "KFC", "n": 20}, {"p": "TX", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 39}, {"p": "TX", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 8}, {"p": "TX", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 30}, {"p": "TX", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 6}, {"p": "TX", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 4}, {"p": "TX", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 7}, {"p": "TX", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 5}, {"p": "TX", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 4}, {"p": "TX", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 17}, {"p": "TX", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 9}, {"p": "TX", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 61}, {"p": "UT", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "UT", "cat": "Burgers & Grill", "ch": "Burger King", "n": 8}, {"p": "UT", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 27}, {"p": "UT", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 16}, {"p": "UT", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 5}, {"p": "UT", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 16}, {"p": "UT", "cat": "Chicken & Wings", "ch": "KFC", "n": 7}, {"p": "UT", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 4}, {"p": "UT", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "UT", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 8}, {"p": "UT", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 17}, {"p": "UT", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 1}, {"p": "UT", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 10}, {"p": "UT", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 7}, {"p": "UT", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 1}, {"p": "UT", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 12}, {"p": "UT", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 10}, {"p": "UT", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 8}, {"p": "VA", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 7}, {"p": "VA", "cat": "Burgers & Grill", "ch": "Burger King", "n": 40}, {"p": "VA", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 26}, {"p": "VA", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 72}, {"p": "VA", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 5}, {"p": "VA", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 11}, {"p": "VA", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 33}, {"p": "VA", "cat": "Chicken & Wings", "ch": "KFC", "n": 18}, {"p": "VA", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 31}, {"p": "VA", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "VA", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 7}, {"p": "VA", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 1}, {"p": "VA", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 6}, {"p": "VA", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 21}, {"p": "VA", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 3}, {"p": "VA", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 4}, {"p": "VA", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 7}, {"p": "VA", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 3}, {"p": "VA", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 26}, {"p": "VT", "cat": "Burgers & Grill", "ch": "Burger King", "n": 3}, {"p": "VT", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 17}, {"p": "VT", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 2}, {"p": "VT", "cat": "Chicken & Wings", "ch": "KFC", "n": 2}, {"p": "VT", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 2}, {"p": "VT", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 6}, {"p": "VT", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 6}, {"p": "VT", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 4}, {"p": "WA", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 2}, {"p": "WA", "cat": "Burgers & Grill", "ch": "Burger King", "n": 29}, {"p": "WA", "cat": "Burgers & Grill", "ch": "Jack in the Box", "n": 21}, {"p": "WA", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 44}, {"p": "WA", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 9}, {"p": "WA", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 3}, {"p": "WA", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 10}, {"p": "WA", "cat": "Chicken & Wings", "ch": "KFC", "n": 12}, {"p": "WA", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 4}, {"p": "WA", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 2}, {"p": "WA", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 8}, {"p": "WA", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 2}, {"p": "WA", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 3}, {"p": "WA", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 9}, {"p": "WA", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 5}, {"p": "WA", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 2}, {"p": "WA", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 9}, {"p": "WA", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 13}, {"p": "WA", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 19}, {"p": "WI", "cat": "Burgers & Grill", "ch": "Burger King", "n": 27}, {"p": "WI", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 10}, {"p": "WI", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 47}, {"p": "WI", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 8}, {"p": "WI", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 4}, {"p": "WI", "cat": "Chicken & Wings", "ch": "KFC", "n": 10}, {"p": "WI", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 3}, {"p": "WI", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "WI", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 5}, {"p": "WI", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 1}, {"p": "WI", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 4}, {"p": "WI", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 19}, {"p": "WI", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 9}, {"p": "WI", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 6}, {"p": "WI", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 5}, {"p": "WI", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 6}, {"p": "WI", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 18}, {"p": "WV", "cat": "Asian & Seafood", "ch": "Otras Marcas (454)", "n": 1}, {"p": "WV", "cat": "Burgers & Grill", "ch": "Burger King", "n": 10}, {"p": "WV", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 4}, {"p": "WV", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 19}, {"p": "WV", "cat": "Burgers & Grill", "ch": "Otras Marcas (454)", "n": 2}, {"p": "WV", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 12}, {"p": "WV", "cat": "Chicken & Wings", "ch": "KFC", "n": 3}, {"p": "WV", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 4}, {"p": "WV", "cat": "Otros / Regional", "ch": "Otras Marcas (454)", "n": 4}, {"p": "WV", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 7}, {"p": "WV", "cat": "Pizza & Italian", "ch": "Otras Marcas (454)", "n": 3}, {"p": "WV", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 10}, {"p": "WV", "cat": "Sandwiches & Subs", "ch": "Otras Marcas (454)", "n": 2}, {"p": "WV", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 7}, {"p": "WV", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 4}, {"p": "WY", "cat": "Burgers & Grill", "ch": "Burger King", "n": 4}, {"p": "WY", "cat": "Burgers & Grill", "ch": "Hardee's", "n": 1}, {"p": "WY", "cat": "Burgers & Grill", "ch": "McDonald's", "n": 5}, {"p": "WY", "cat": "Burgers & Grill", "ch": "SONIC Drive In", "n": 2}, {"p": "WY", "cat": "Burgers & Grill", "ch": "Wendy's", "n": 3}, {"p": "WY", "cat": "Chicken & Wings", "ch": "Otras Marcas (454)", "n": 1}, {"p": "WY", "cat": "Coffee, Bakery & Ice Cream", "ch": "Otras Marcas (454)", "n": 1}, {"p": "WY", "cat": "Pizza & Italian", "ch": "Domino's Pizza", "n": 6}, {"p": "WY", "cat": "Sandwiches & Subs", "ch": "Arby's", "n": 3}, {"p": "WY", "cat": "Sandwiches & Subs", "ch": "Jimmy John's", "n": 2}, {"p": "WY", "cat": "Sandwiches & Subs", "ch": "Subway", "n": 7}, {"p": "WY", "cat": "Tex-Mex", "ch": "Otras Marcas (454)", "n": 2}, {"p": "WY", "cat": "Tex-Mex", "ch": "Taco Bell", "n": 4}];

export const TOP_CHAINS: string[] = ["McDonald's", "Burger King", "Taco Bell", "Wendy's", "Arby's", "KFC", "Subway", "SONIC Drive In", "Domino's Pizza", "Jack in the Box", "Hardee's", "Jimmy John's"];

export const SAMPLES_DATA: Record<string, Record<string, string | number>[]> = {
  "fact_locales_consumo": [
    {
      "hecho_id": 1,
      "tiempo_id": 91,
      "geografia_id": 3299,
      "cadena_id": 263,
      "latitude": 44.9213,
      "longitude": -74.89021,
      "cantidad_locales": 1,
      "calorias_diarias_promedio_ff": 824.0,
      "pct_consumo_diario": 31.4,
      "tasa_obesidad_pct": 28.0
    },
    {
      "hecho_id": 2,
      "tiempo_id": 366,
      "geografia_id": 3620,
      "cadena_id": 446,
      "latitude": 39.53255,
      "longitude": -83.44526,
      "cantidad_locales": 1,
      "calorias_diarias_promedio_ff": 940.0,
      "pct_consumo_diario": 38.9,
      "tasa_obesidad_pct": 36.6
    },
    {
      "hecho_id": 3,
      "tiempo_id": 182,
      "geografia_id": 2007,
      "cadena_id": 161,
      "latitude": 38.62736,
      "longitude": -83.79141,
      "cantidad_locales": 1,
      "calorias_diarias_promedio_ff": 962.0,
      "pct_consumo_diario": 40.5,
      "tasa_obesidad_pct": 37.7
    },
    {
      "hecho_id": 4,
      "tiempo_id": 91,
      "geografia_id": 3299,
      "cadena_id": 263,
      "latitude": 44.95008,
      "longitude": -74.84553,
      "cantidad_locales": 1,
      "calorias_diarias_promedio_ff": 824.0,
      "pct_consumo_diario": 31.4,
      "tasa_obesidad_pct": 28.0
    },
    {
      "hecho_id": 5,
      "tiempo_id": 366,
      "geografia_id": 3400,
      "cadena_id": 287,
      "latitude": 39.35155,
      "longitude": -82.09728,
      "cantidad_locales": 1,
      "calorias_diarias_promedio_ff": 940.0,
      "pct_consumo_diario": 38.9,
      "tasa_obesidad_pct": 36.6
    },
    {
      "hecho_id": 6,
      "tiempo_id": 366,
      "geografia_id": 3518,
      "cadena_id": 131,
      "latitude": 39.4176,
      "longitude": -84.47641,
      "cantidad_locales": 1,
      "calorias_diarias_promedio_ff": 940.0,
      "pct_consumo_diario": 38.9,
      "tasa_obesidad_pct": 36.6
    }
  ],
  "dim_geografia": [
    {
      "geografia_id": 1,
      "province": "AK",
      "state_name": "Alaska",
      "census_region": "West",
      "city": "Anchorage",
      "postal_code": 99501,
      "population_total": 733406
    },
    {
      "geografia_id": 2,
      "province": "AK",
      "state_name": "Alaska",
      "census_region": "West",
      "city": "Anchorage",
      "postal_code": 99502,
      "population_total": 733406
    },
    {
      "geografia_id": 3,
      "province": "AK",
      "state_name": "Alaska",
      "census_region": "West",
      "city": "Anchorage",
      "postal_code": 99503,
      "population_total": 733406
    },
    {
      "geografia_id": 4,
      "province": "AK",
      "state_name": "Alaska",
      "census_region": "West",
      "city": "Anchorage",
      "postal_code": 99504,
      "population_total": 733406
    },
    {
      "geografia_id": 5,
      "province": "AK",
      "state_name": "Alaska",
      "census_region": "West",
      "city": "Anchorage",
      "postal_code": 99515,
      "population_total": 733406
    },
    {
      "geografia_id": 6,
      "province": "AK",
      "state_name": "Alaska",
      "census_region": "West",
      "city": "Eagle River",
      "postal_code": 99577,
      "population_total": 733406
    }
  ],
  "dim_cadena": [
    {
      "cadena_id": 1,
      "nombre_cadena": "31st Avenue Gyro",
      "categoria_principal": "Otros / Regional"
    },
    {
      "cadena_id": 2,
      "nombre_cadena": "7-11",
      "categoria_principal": "Otros / Regional"
    },
    {
      "cadena_id": 3,
      "nombre_cadena": "7-Eleven",
      "categoria_principal": "Otros / Regional"
    },
    {
      "cadena_id": 4,
      "nombre_cadena": "A & W Family Restaurant",
      "categoria_principal": "Otros / Regional"
    },
    {
      "cadena_id": 5,
      "nombre_cadena": "A&W",
      "categoria_principal": "Burgers & Grill"
    },
    {
      "cadena_id": 6,
      "nombre_cadena": "A&W All-American Food",
      "categoria_principal": "Burgers & Grill"
    }
  ],
  "dim_tiempo": [
    {
      "tiempo_id": 1,
      "fecha": "2024-01-01",
      "dia": 1,
      "mes": 1,
      "nombre_mes": "January",
      "trimestre": 1,
      "anio": 2024
    },
    {
      "tiempo_id": 60,
      "fecha": "2024-02-29",
      "dia": 29,
      "mes": 2,
      "nombre_mes": "February",
      "trimestre": 1,
      "anio": 2024
    },
    {
      "tiempo_id": 91,
      "fecha": "2024-03-31",
      "dia": 31,
      "mes": 3,
      "nombre_mes": "March",
      "trimestre": 1,
      "anio": 2024
    },
    {
      "tiempo_id": 182,
      "fecha": "2024-06-30",
      "dia": 30,
      "mes": 6,
      "nombre_mes": "June",
      "trimestre": 2,
      "anio": 2024
    },
    {
      "tiempo_id": 274,
      "fecha": "2024-09-30",
      "dia": 30,
      "mes": 9,
      "nombre_mes": "September",
      "trimestre": 3,
      "anio": 2024
    },
    {
      "tiempo_id": 366,
      "fecha": "2024-12-31",
      "dia": 31,
      "mes": 12,
      "nombre_mes": "December",
      "trimestre": 4,
      "anio": 2024
    }
  ]
};

export const CAT_TABLE6: CategoryStat[] = [
  { cat: 'Burgers & Grill', marcas: 74, locales: 5381, pct: 54.33, top: "McDonald's, Burger King, Wendy's, SONIC" },
  { cat: 'Sandwiches & Subs', marcas: 38, locales: 1218, pct: 12.30, top: "Arby's, Subway, Jimmy John's, Panera" },
  { cat: 'Tex-Mex', marcas: 31, locales: 1108, pct: 11.19, top: 'Taco Bell, Chipotle, Del Taco, Qdoba' },
  { cat: 'Chicken & Wings', marcas: 39, locales: 866, pct: 8.74, top: "KFC, Chick-fil-A, Popeyes, Zaxby's" },
  { cat: 'Otros / Regional', marcas: 231, locales: 554, pct: 5.59, top: 'Formatos regionales e independientes' },
  { cat: 'Pizza & Italian', marcas: 28, locales: 552, pct: 5.57, top: "Domino's, Pizza Hut, Papa John's" },
  { cat: 'Asian & Seafood', marcas: 11, locales: 119, pct: 1.20, top: "Panda Express, Long John Silver's" },
  { cat: 'Coffee, Bakery & Ice Cream', marcas: 14, locales: 106, pct: 1.07, top: "Dairy Queen, Dunkin', Starbucks" },
];

export const P3_MATRIX = {
  chains: ["McDonald's", 'Burger King', 'Taco Bell', "Wendy's", "Arby's", 'KFC', 'Subway', 'SONIC Drive In'],
  pcts: {
    Midwest:   [21.37, 13.04, 10.03, 8.06, 7.58, 4.53, 3.27, 2.97],
    Northeast: [26.95, 18.31,  5.82, 9.20, 3.47, 5.82, 5.16, 0.47],
    South:     [21.65, 10.07,  8.38, 7.60, 5.21, 4.21, 3.41, 5.62],
    West:      [17.49,  9.07,  8.92, 5.20, 3.12, 3.67, 5.95, 3.42],
  } as Record<CensusRegion, number[]>,
  restoPct: { Midwest: 29.13, Northeast: 24.79, South: 33.85, West: 43.16 } as Record<CensusRegion, number>,
};

export const DB_DICTIONARY: Record<string, TableDictMeta> = {
  fact_locales_consumo: {
    eyebrow: 'TABLA DE HECHOS CENTRAL • SECCIÓN 5.4',
    rowsBadge: '9.904 registros',
    title: 'public.fact_locales_consumo',
    desc: '1 fila por cada sucursal física activa en EE. UU., con 3 claves foráneas indexadas (B-Tree), métrica aditiva (cantidad_locales = 1) y 3 métricas semi-aditivas estatales.',
    cols: [
      ['hecho_id', 'SERIAL', 'PK', 'Clave subrogada del hecho (1..9.904)'],
      ['tiempo_id', 'INTEGER', 'FK (IDX)', 'Referencia a dim_tiempo (corte 2024)'],
      ['geografia_id', 'INTEGER', 'FK (IDX)', 'Referencia a dim_geografia (ZIP/estado)'],
      ['cadena_id', 'INTEGER', 'FK (IDX)', 'Referencia a dim_cadena (466 marcas)'],
      ['latitude / longitude', 'NUMERIC(10,6)', 'NOT NULL', 'Coordenadas GPS validadas en EE. UU.'],
      ['cantidad_locales', 'INTEGER', 'DEFAULT 1', 'Métrica aditiva pura (= 1 por sucursal)'],
      ['calorias_diarias_promedio_ff', 'NUMERIC(8,2)', 'NOT NULL', 'Ingesta calórica diaria media (kcal/día)'],
      ['pct_consumo_diario', 'NUMERIC(6,2)', 'NOT NULL', '% de adultos con consumo diario'],
      ['tasa_obesidad_pct', 'NUMERIC(6,2)', 'NOT NULL', 'Prevalencia de obesidad adulta (%)'],
    ],
  },
  dim_geografia: {
    eyebrow: 'DIMENSIÓN GEOGRÁFICA • SECCIÓN 5.2',
    rowsBadge: '5.189 registros',
    title: 'public.dim_geografia',
    desc: 'Jerarquía postal y censal desnormalizada (postal_code -> city -> province -> census_region) junto a la población oficial del Censo.',
    cols: [
      ['geografia_id', 'SERIAL', 'PK', 'Clave subrogada de ubicación (1..5.189)'],
      ['province', 'VARCHAR(2)', 'NOT NULL', 'Código postal estatal de 2 letras'],
      ['state_name', 'VARCHAR(100)', 'NOT NULL', 'Nombre oficial del estado o D.C.'],
      ['census_region', 'VARCHAR(50)', 'NOT NULL', 'West, South, Midwest o Northeast'],
      ['city', 'VARCHAR(120)', 'NOT NULL', 'Ciudad normalizada en formato título'],
      ['postal_code', 'VARCHAR(10)', 'NOT NULL', 'Código ZIP a 5 dígitos con zfill(5)'],
      ['population_total', 'BIGINT', 'NOT NULL', 'Población estatal (334.914.895 total)'],
    ],
  },
  dim_cadena: {
    eyebrow: 'DIMENSIÓN DE FRANQUICIAS • SECCIÓN 5.3',
    rowsBadge: '466 registros',
    title: 'public.dim_cadena',
    desc: 'Catálogo normalizado desde 540 variantes ortográficas a 466 marcas reales, clasificadas en 8 rubros gastronómicos.',
    cols: [
      ['cadena_id', 'SERIAL', 'PK', 'Clave subrogada de la cadena (1..466)'],
      ['nombre_cadena', 'VARCHAR(150)', 'UNIQUE', "Nombre comercial unificado (ej. McDonald's)"],
      ['categoria_principal', 'VARCHAR(100)', 'NOT NULL', 'Rubro gastronómico (8 categorías)'],
    ],
  },
  dim_tiempo: {
    eyebrow: 'DIMENSIÓN TEMPORAL • SECCIÓN 5.1',
    rowsBadge: '366 registros',
    title: 'public.dim_tiempo',
    desc: 'Calendario bisiesto 2024 completo generado con generate_series en PostgreSQL y vinculado a los 4 cortes trimestrales.',
    cols: [
      ['tiempo_id', 'SERIAL', 'PK', 'Clave subrogada diaria (1..366)'],
      ['fecha', 'DATE', 'UNIQUE', 'Fecha YYYY-MM-DD (2024-01-01..12-31)'],
      ['dia / mes', 'INTEGER', 'NOT NULL', 'Día del mes (1..31) y mes (1..12)'],
      ['nombre_mes', 'VARCHAR(20)', 'NOT NULL', 'Nombre del mes calendario'],
      ['trimestre / anio', 'INTEGER', 'NOT NULL', 'Trimestre (1..4) y año (2024)'],
    ],
  },
};

export const MERMAID_ERD_SRC = "erDiagram\n    DIM_TIEMPO ||--o{ FACT_LOCALES_CONSUMO : \"tiempo_id (1:N)\"\n    DIM_GEOGRAFIA ||--o{ FACT_LOCALES_CONSUMO : \"geografia_id (1:N)\"\n    DIM_CADENA ||--o{ FACT_LOCALES_CONSUMO : \"cadena_id (1:N)\"\n    DIM_TIEMPO {\n        serial tiempo_id PK\n        date fecha UK\n        integer dia\n        integer mes\n        varchar nombre_mes\n        integer trimestre\n        integer anio\n    }\n    DIM_GEOGRAFIA {\n        serial geografia_id PK\n        varchar province\n        varchar state_name\n        varchar census_region\n        varchar city\n        varchar postal_code\n        bigint population_total\n    }\n    DIM_CADENA {\n        serial cadena_id PK\n        varchar nombre_cadena UK\n        varchar categoria_principal\n    }\n    FACT_LOCALES_CONSUMO {\n        serial hecho_id PK\n        integer tiempo_id FK\n        integer geografia_id FK\n        integer cadena_id FK\n        numeric latitude\n        numeric longitude\n        integer cantidad_locales\n        numeric calorias_diarias_promedio_ff\n        numeric pct_consumo_diario\n        numeric tasa_obesidad_pct\n    }";

export const CODE_REPO: Record<string, string> = {
  ddl: "-- Trabajo integrador ae4 de gestión avanzada de bases de datos (2026)\n-- Script 01: creación del data warehouse en esquema estrella y carga de dim_tiempo\n\n-- Se eliminan las tablas previas (incluyendo las de versiones anteriores) para recrear desde cero\nDROP TABLE IF EXISTS fact_locales_consumo CASCADE;\nDROP TABLE IF EXISTS fact_ventas CASCADE;\nDROP TABLE IF EXISTS dim_geografia CASCADE;\nDROP TABLE IF EXISTS dim_ubicacion CASCADE;\nDROP TABLE IF EXISTS dim_cadena CASCADE;\nDROP TABLE IF EXISTS dim_tiempo CASCADE;\n\n-- 1. Creación de las dimensiones\n-- Dimensión tiempo obligatoria con fecha, día, mes, nombre del mes, trimestre y año\nCREATE TABLE dim_tiempo (\n    tiempo_id   SERIAL PRIMARY KEY,\n    fecha       DATE UNIQUE NOT NULL,\n    dia         INTEGER NOT NULL,\n    mes         INTEGER NOT NULL,\n    nombre_mes  VARCHAR(20) NOT NULL,\n    trimestre   INTEGER NOT NULL,\n    anio        INTEGER NOT NULL\n);\n\n-- Dimensión geografía con estado, región censal, ciudad, código postal y población estatal\nCREATE TABLE dim_geografia (\n    geografia_id      SERIAL PRIMARY KEY,\n    province          VARCHAR(2) NOT NULL,\n    state_name        VARCHAR(100) NOT NULL,\n    census_region     VARCHAR(50) NOT NULL,\n    city              VARCHAR(120) NOT NULL,\n    postal_code       VARCHAR(10) NOT NULL,\n    population_total  BIGINT NOT NULL\n);\n\n-- Dimensión cadena con nombre normalizado de la franquicia y categoría principal\nCREATE TABLE dim_cadena (\n    cadena_id            SERIAL PRIMARY KEY,\n    nombre_cadena        VARCHAR(150) UNIQUE NOT NULL,\n    categoria_principal  VARCHAR(100) NOT NULL\n);\n\n-- 2. Creación de la tabla de hechos\n-- Granularidad: un local de comida rápida vinculado a su ubicación, cadena y corte temporal\n\nCREATE TABLE fact_locales_consumo (\n    hecho_id                      SERIAL PRIMARY KEY,\n    tiempo_id                     INTEGER NOT NULL REFERENCES dim_tiempo(tiempo_id),\n    geografia_id                  INTEGER NOT NULL REFERENCES dim_geografia(geografia_id),\n    cadena_id                     INTEGER NOT NULL REFERENCES dim_cadena(cadena_id),\n    latitude                      NUMERIC(10,6) NOT NULL,\n    longitude                     NUMERIC(10,6) NOT NULL,\n    cantidad_locales              INTEGER NOT NULL DEFAULT 1,\n    calorias_diarias_promedio_ff  NUMERIC(8,2) NOT NULL,\n    pct_consumo_diario            NUMERIC(6,2) NOT NULL,\n    tasa_obesidad_pct             NUMERIC(6,2) NOT NULL\n);\n\n-- 3. Carga de dim_tiempo con todos los días del año 2024 (366 filas por año bisiesto)\n\nINSERT INTO dim_tiempo (fecha, dia, mes, nombre_mes, trimestre, anio)\nSELECT\n    fecha::date,\n    EXTRACT(DAY FROM fecha),\n    EXTRACT(MONTH FROM fecha),\n    TRIM(TO_CHAR(fecha, 'Month')),\n    EXTRACT(QUARTER FROM fecha),\n    EXTRACT(YEAR FROM fecha)\nFROM generate_series('2024-01-01'::date, '2024-12-31'::date, '1 day') AS fecha;\n\n-- 4. Índices sobre las claves foráneas para optimizar las consultas analíticas\n\nCREATE INDEX idx_fact_tiempo ON fact_locales_consumo(tiempo_id);\nCREATE INDEX idx_fact_geografia ON fact_locales_consumo(geografia_id);\nCREATE INDEX idx_fact_cadena ON fact_locales_consumo(cadena_id);",
  dml: "-- Trabajo integrador ae4 de gestión avanzada de bases de datos (2026)\n-- Script 02: carga de dimensiones de negocio y tabla de hechos desde archivos csv\n\n-- Limpieza previa de las tablas de hechos y dimensiones de negocio antes de cargar\nTRUNCATE TABLE fact_locales_consumo, dim_geografia, dim_cadena RESTART IDENTITY CASCADE;\n\n-- Carga de la dimensión geografía desde el archivo csv procesado por el etl\n\\copy dim_geografia(geografia_id, province, state_name, census_region, city, postal_code, population_total) FROM 'datos/procesados/dim_geografia.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');\n\n-- Carga de la dimensión cadena desde el archivo csv procesado por el etl\n\\copy dim_cadena(cadena_id, nombre_cadena, categoria_principal) FROM 'datos/procesados/dim_cadena.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');\n\n-- Carga de la tabla de hechos desde el archivo csv procesado por el etl\n\\copy fact_locales_consumo(hecho_id, tiempo_id, geografia_id, cadena_id, latitude, longitude, cantidad_locales, calorias_diarias_promedio_ff, pct_consumo_diario, tasa_obesidad_pct) FROM 'datos/procesados/fact_locales_consumo.csv' WITH (FORMAT csv, HEADER true, ENCODING 'UTF8');\n\n-- Sincronización de las secuencias autonuméricas tras la carga masiva\nSELECT setval(pg_get_serial_sequence('dim_tiempo', 'tiempo_id'), (SELECT MAX(tiempo_id) FROM dim_tiempo));\nSELECT setval(pg_get_serial_sequence('dim_geografia', 'geografia_id'), (SELECT MAX(geografia_id) FROM dim_geografia));\nSELECT setval(pg_get_serial_sequence('dim_cadena', 'cadena_id'), (SELECT MAX(cadena_id) FROM dim_cadena));\nSELECT setval(pg_get_serial_sequence('fact_locales_consumo', 'hecho_id'), (SELECT MAX(hecho_id) FROM fact_locales_consumo));",
  queries: "-- Trabajo integrador ae4 de gestión avanzada de bases de datos (2026)\n-- Script 03: verificación, indicadores y consultas analíticas del negocio\n\n-- Verificación de la cantidad de registros en las 4 tablas físicas del data warehouse\nSELECT 'dim_tiempo' AS tabla, COUNT(*) AS filas FROM dim_tiempo\nUNION ALL SELECT 'dim_geografia', COUNT(*) FROM dim_geografia\nUNION ALL SELECT 'dim_cadena', COUNT(*) FROM dim_cadena\nUNION ALL SELECT 'fact_locales_consumo', COUNT(*) FROM fact_locales_consumo;\n\n-- Resumen nacional de los 3 indicadores clave (dlff, pmc de la cadena líder y tpcd)\nWITH resumen_estatal AS (\n    SELECT\n        g.province,\n        MAX(g.population_total) AS poblacion_estado,\n        SUM(f.cantidad_locales) AS locales_estado,\n        MAX(f.pct_consumo_diario) AS pct_consumo_estado,\n        MAX(f.tasa_obesidad_pct) AS tasa_obesidad_estado\n    FROM fact_locales_consumo f\n    JOIN dim_geografia g ON f.geografia_id = g.geografia_id\n    GROUP BY g.province\n),\ncadena_lider AS (\n    SELECT\n        c.nombre_cadena,\n        ROUND(SUM(f.cantidad_locales) * 100.0 / (SELECT SUM(cantidad_locales) FROM fact_locales_consumo), 2) AS pmc_lider_pct\n    FROM fact_locales_consumo f\n    JOIN dim_cadena c ON f.cadena_id = c.cadena_id\n    GROUP BY c.nombre_cadena\n    ORDER BY SUM(f.cantidad_locales) DESC\n    LIMIT 1\n)\nSELECT\n    SUM(r.locales_estado) AS total_locales_analizados,\n    SUM(r.poblacion_estado) AS poblacion_total_eeuu,\n    ROUND(SUM(r.locales_estado) * 100000.0 / SUM(r.poblacion_estado), 2) AS kpi1_dlff_nacional_cada_100k,\n    (SELECT nombre_cadena FROM cadena_lider) AS cadena_numero_1,\n    (SELECT pmc_lider_pct FROM cadena_lider) AS kpi2_pmc_cadena_lider_pct,\n    ROUND(SUM(r.pct_consumo_estado * r.poblacion_estado) / SUM(r.poblacion_estado), 2) AS kpi3_tpcd_nacional_ponderada_pct,\n    ROUND(SUM(r.tasa_obesidad_estado * r.poblacion_estado) / SUM(r.poblacion_estado), 2) AS tasa_obesidad_nacional_ponderada_pct\nFROM resumen_estatal r;\n\n-- Consulta 1 para responder la pregunta de negocio 1:\n-- ¿cuáles son los 5 estados con mayor densidad de locales cada 100.000 habitantes y cómo se comparan con el promedio nacional?\nWITH estados AS (\n    SELECT\n        g.province,\n        g.state_name,\n        g.census_region,\n        MAX(g.population_total) AS poblacion_estado,\n        SUM(f.cantidad_locales) AS cantidad_locales,\n        ROUND(SUM(f.cantidad_locales) * 100000.0 / MAX(g.population_total), 2) AS dlff_estado,\n        MAX(f.tasa_obesidad_pct) AS tasa_obesidad_pct\n    FROM fact_locales_consumo f\n    JOIN dim_geografia g ON f.geografia_id = g.geografia_id\n    GROUP BY g.province, g.state_name, g.census_region\n),\npromedio_nacional AS (\n    SELECT ROUND(SUM(cantidad_locales) * 100000.0 / SUM(poblacion_estado), 2) AS dlff_nacional\n    FROM estados\n)\nSELECT\n    e.province,\n    e.state_name,\n    e.census_region,\n    e.cantidad_locales,\n    e.poblacion_estado,\n    e.dlff_estado,\n    p.dlff_nacional,\n    ROUND(e.dlff_estado - p.dlff_nacional, 2) AS diferencia_vs_nacional,\n    e.tasa_obesidad_pct\nFROM estados e\nCROSS JOIN promedio_nacional p\nORDER BY e.dlff_estado DESC\nLIMIT 5;\n\n-- Consulta 2 para responder la pregunta de negocio 2:\n-- ¿existe relación entre la densidad regional de restaurantes y el porcentaje de consumo diario y obesidad?\nWITH estados AS (\n    SELECT\n        g.census_region,\n        g.province,\n        MAX(g.population_total) AS poblacion_estado,\n        SUM(f.cantidad_locales) AS locales_estado,\n        MAX(f.pct_consumo_diario) AS pct_consumo_estado,\n        MAX(f.calorias_diarias_promedio_ff) AS calorias_estado,\n        MAX(f.tasa_obesidad_pct) AS obesidad_estado\n    FROM fact_locales_consumo f\n    JOIN dim_geografia g ON f.geografia_id = g.geografia_id\n    GROUP BY g.census_region, g.province\n)\nSELECT\n    census_region,\n    COUNT(province) AS cantidad_estados,\n    SUM(locales_estado) AS total_locales,\n    SUM(poblacion_estado) AS poblacion_regional,\n    ROUND(SUM(locales_estado) * 100000.0 / SUM(poblacion_estado), 2) AS dlff_regional_cada_100k,\n    ROUND(SUM(pct_consumo_estado * poblacion_estado) / SUM(poblacion_estado), 2) AS tpcd_consumo_diario_pct,\n    ROUND(AVG(calorias_estado), 1) AS calorias_diarias_promedio_kcal,\n    ROUND(SUM(obesidad_estado * poblacion_estado) / SUM(poblacion_estado), 2) AS tasa_obesidad_ponderada_pct\nFROM estados\nGROUP BY census_region\nORDER BY dlff_regional_cada_100k DESC;\n\n-- Consulta 3 para responder la pregunta de negocio 3:\n-- ¿cómo se distribuye la cuota de mercado (pmc) de las principales cadenas según las 4 regiones censales?\nWITH top_cadenas AS (\n    SELECT cadena_id\n    FROM fact_locales_consumo\n    GROUP BY cadena_id\n    ORDER BY SUM(cantidad_locales) DESC\n    LIMIT 8\n),\ntotales_region AS (\n    SELECT\n        g.census_region,\n        SUM(f.cantidad_locales) AS total_locales_region\n    FROM fact_locales_consumo f\n    JOIN dim_geografia g ON f.geografia_id = g.geografia_id\n    GROUP BY g.census_region\n)\nSELECT\n    c.nombre_cadena,\n    c.categoria_principal,\n    g.census_region,\n    SUM(f.cantidad_locales) AS locales_cadena_en_region,\n    ROUND(SUM(f.cantidad_locales) * 100.0 / tr.total_locales_region, 2) AS pmc_en_region_pct,\n    ROUND(SUM(f.cantidad_locales) * 100.0 / (SELECT SUM(cantidad_locales) FROM fact_locales_consumo), 2) AS pmc_nacional_pct\nFROM fact_locales_consumo f\nJOIN top_cadenas tc ON f.cadena_id = tc.cadena_id\nJOIN dim_cadena c ON f.cadena_id = c.cadena_id\nJOIN dim_geografia g ON f.geografia_id = g.geografia_id\nJOIN totales_region tr ON g.census_region = tr.census_region\nGROUP BY c.nombre_cadena, c.categoria_principal, g.census_region, tr.total_locales_region\nORDER BY c.nombre_cadena, locales_cadena_en_region DESC;\n\n-- Consulta 4 para responder la pregunta de negocio 4 (vinculada con dim_tiempo):\n-- ¿qué regiones presentan en los relevamientos 2024 una ingesta calórica diaria promedio superior a 900 kcal y cuántas sucursales operan en ellas?\nWITH estados_tiempo AS (\n    SELECT\n        g.census_region,\n        g.province,\n        t.anio,\n        t.trimestre,\n        SUM(f.cantidad_locales) AS locales_estado,\n        MAX(f.calorias_diarias_promedio_ff) AS calorias_estado,\n        MAX(f.tasa_obesidad_pct) AS obesidad_estado\n    FROM fact_locales_consumo f\n    JOIN dim_geografia g ON f.geografia_id = g.geografia_id\n    JOIN dim_tiempo t ON f.tiempo_id = t.tiempo_id\n    GROUP BY g.census_region, g.province, t.anio, t.trimestre\n)\nSELECT\n    census_region,\n    anio,\n    COUNT(DISTINCT trimestre) AS trimestres_relevados,\n    SUM(locales_estado) AS sucursales_operativas,\n    ROUND(AVG(calorias_estado), 1) AS ingesta_calorica_diaria_kcal,\n    ROUND(AVG(obesidad_estado), 2) AS tasa_obesidad_promedio_pct\nFROM estados_tiempo\nGROUP BY census_region, anio\nHAVING AVG(calorias_estado) > 900\nORDER BY ingesta_calorica_diaria_kcal DESC;",
  dax: "-- Medidas DAX (_Medidas_KPIs en Power BI Desktop)\nTotal Locales = SUM(fact_locales_consumo[cantidad_locales])\n\nPoblacion Total =\nSUMX(\n    VALUES(dim_geografia[province]),\n    CALCULATE(MAX(dim_geografia[population_total]))\n)\n\nKPI 1 DLFF Densidad c/100k =\nDIVIDE([Total Locales], [Poblacion Total], 0) * 100000\n\nKPI 2 PMC Cuota Mercado % =\nDIVIDE(\n    [Total Locales],\n    CALCULATE([Total Locales], ALL(dim_cadena), ALL(dim_geografia), ALL(dim_tiempo)),\n    0\n) * 100\n\nKPI 3 TPCD Consumo Diario % =\nVAR TablaEstados =\n    ADDCOLUMNS(\n        VALUES(dim_geografia[province]),\n        \"@Pob\", CALCULATE(MAX(dim_geografia[population_total])),\n        \"@Cons\", CALCULATE(AVERAGE(fact_locales_consumo[pct_consumo_diario]))\n    )\nRETURN\n    DIVIDE(SUMX(TablaEstados, [@Pob] * [@Cons]), SUMX(TablaEstados, [@Pob]), 0)",
  etl: "# Extracto principal de etl/comun.py y etl/etl_fastfood_dw.py\n# 1. Reparación estructural de 20 filas con comas internas en address\nsobrantes = len(campos) - 10\nif sobrantes > 0:\n    direccion = \", \".join(c.strip() for c in campos[: sobrantes + 1] if c.strip())\n    campos = [direccion] + campos[sobrantes + 1 :]\n\n# 2. Filtro geográfico EE. UU. (descarta 51 locales con longitud positiva)\nsuc = suc[suc[\"latitude\"].between(18.0, 72.0) & suc[\"longitude\"].between(-170.0, -65.0)]\n\n# 3. Unificación de 540 variantes a 466 cadenas por clave alfanumérica y moda\nsuc[\"clave_marca\"] = suc[\"name\"].str.lower().str.replace(r\"[^a-z0-9]\", \"\", regex=True)\nmoda_marca = suc.groupby(\"clave_marca\")[\"name\"].agg(lambda s: s.mode().iloc[0])\nsuc[\"nombre_cadena\"] = suc[\"clave_marca\"].map(moda_marca)\n\n# 4. Corrección 'Co Spgs' -> 'CO', ZIP a 5 dígitos y desduplicación (9.904 locales)\nsuc[\"province\"] = suc[\"province\"].str.strip().str.upper().replace({\"CO SPGS\": \"CO\"})\nsuc[\"postal_code\"] = suc[\"postalCode\"].astype(str).str[:5].str.zfill(5)\nsuc = suc.drop_duplicates(subset=[\"address\", \"city\", \"province\"])\n\n# 5. Imputación regional en Fuente 2 (DE y ND) y Merge many_to_one\ndem = dem.drop_duplicates(subset=[\"province\"])\ndem[\"avg_daily_ff_calories\"] = dem[\"avg_daily_ff_calories\"].fillna(\n    dem.groupby(\"census_region\")[\"avg_daily_ff_calories\"].transform(\"mean\").round(1)\n)\ndf = suc.merge(dem, on=\"province\", how=\"inner\", validate=\"many_to_one\")",
};
