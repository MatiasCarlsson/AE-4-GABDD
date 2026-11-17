# AE4 GABD (2026) — Presentación y Aplicación Analítica (React + Vite)

Aplicación interactiva construida con **React 19 + TypeScript + Vite**, aplicando buenas prácticas de arquitectura (`React.lazy`, `useMemo` para el cálculo DAX `SUMX` derivado en render, `React.memo` con `ResizeObserver` en gráficos ECharts y renderizado bajo demanda de Mermaid.js).

## Ejecución local

```bash
cd presentacion-web
npm install
npm run dev
```

## Compilación para producción

```bash
npm run build
npm run preview
```

## Estructura principal

- `src/data/ae4Data.ts`: Datos reales extraídos de `datos/procesados/` (51 jurisdicciones, cubo de 9.904 sucursales, matriz Top 8 y diccionario de tablas de `dw_fastfood`).
- `src/components/Header.tsx`: Barra fija de navegación entre las 3 vistas (`Presentación`, `Dashboard`, `Base de Datos`) y controles de `Oradores` (`O`) y `Pantalla Completa` (`F`).
- `src/components/PresentationDeck.tsx`: Recorrido de 17 diapositivas con navegación por scroll, puntos laterales y atajos de teclado (`↓`/`↑`, `PageDown`/`PageUp`, `Espacio`).
- `src/components/DashboardView.tsx`: Réplica interactiva del dashboard de Power BI con 5 segmentadores y cálculo DAX en vivo.
- `src/components/DatabaseView.tsx`: Esquema Estrella interactivo, inspector de diccionario y filas reales, diagrama DER con zoom/pan en Mermaid.js y scripts SQL/DAX/Python.
