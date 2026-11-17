import type { EChartsOption } from 'echarts';
import {
  CAT_TABLE6,
  ESTADOS_DATA,
  P3_MATRIX,
  type CensusRegion,
} from './ae4Data';

const DARK_LABEL = '#EDE9FE';
const DARK_MUTED = '#C4B5FD';
const DARK_GRID = 'rgba(167, 139, 250, 0.14)';

const DARK_REGION_COLORS: Record<CensusRegion, string> = {
  Midwest: '#A78BFA',
  South: '#6366F1',
  West: '#F472B6',
  Northeast: '#2DD4BF',
};

export function buildCategoryChartOption(catMode: 'locales' | 'marcas'): EChartsOption {
  const sorted = [...CAT_TABLE6].sort((a, b) => a[catMode] - b[catMode]);
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#120A24',
      borderColor: '#8B5CF6',
      textStyle: { color: '#F8F7FC', fontSize: 13 },
    },
    grid: { left: 195, right: 98, top: 16, bottom: 28 },
    xAxis: {
      type: 'value',
      axisLabel: { color: DARK_MUTED, fontFamily: 'Fira Code', fontSize: 11 },
      splitLine: { lineStyle: { color: DARK_GRID, type: 'dashed' } },
    },
    yAxis: {
      type: 'category',
      data: sorted.map((d) => d.cat),
      axisLabel: { fontWeight: 600, fontSize: 13, color: DARK_LABEL },
      axisLine: { lineStyle: { color: DARK_GRID } },
    },
    series: [
      {
        type: 'bar',
        barWidth: '56%',
        data: sorted.map((d) => ({
          value: d[catMode],
          itemStyle: {
            color:
              d.cat === 'Burgers & Grill'
                ? '#A78BFA'
                : catMode === 'locales'
                  ? '#7C3AED'
                  : '#2DD4BF',
            borderRadius: [0, 6, 6, 0],
          },
        })),
        label: {
          show: true,
          position: 'right',
          fontFamily: 'Fira Code',
          fontSize: 12,
          fontWeight: 600,
          color: DARK_MUTED,
          formatter: (p) => {
            const item = sorted[p.dataIndex];
            if (!item) return '';
            return catMode === 'locales'
              ? `${item.locales.toLocaleString('es-AR')} (${item.pct}%)`
              : `${item.marcas} marcas`;
          },
        },
      },
    ],
  };
}

export function buildP1ChartOption(p1Mode: 'top5' | 'compare'): EChartsOption {
  const top5 = ESTADOS_DATA.slice(0, 5);
  const bot3 = ESTADOS_DATA.slice(-3);
  const rows =
    p1Mode === 'top5'
      ? [...top5].reverse().map((s) => ({ ...s, isMean: false }))
      : [
        ...bot3.slice().reverse().map((s) => ({ ...s, isMean: false })),
        { state_name: 'MEDIA EE. UU.', province: 'US', dlff: 2.96, loc: 9904, ob: 32.6, isMean: true },
        ...top5.slice().reverse().map((s) => ({ ...s, isMean: false })),
      ];

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#120A24',
      borderColor: '#8B5CF6',
      textStyle: { color: '#F8F7FC', fontSize: 13 },
    },
    grid: { left: 165, right: 65, top: 24, bottom: 32 },
    xAxis: {
      type: 'value',
      max: 12.5,
      axisLabel: { color: DARK_MUTED, fontFamily: 'Fira Code', fontSize: 11 },
      splitLine: { lineStyle: { color: DARK_GRID, type: 'dashed' } },
    },
    yAxis: {
      type: 'category',
      data: rows.map((r) => (r.isMean ? 'MEDIA EE. UU.' : `${r.state_name} (${r.province})`)),
      axisLabel: { fontWeight: 600, fontSize: 13, color: DARK_LABEL },
      axisLine: { lineStyle: { color: DARK_GRID } },
    },
    series: [
      {
        type: 'bar',
        barWidth: '54%',
        data: rows.map((r) => ({
          value: r.dlff,
          itemStyle: {
            color: r.isMean ? '#2DD4BF' : r.dlff >= 2.96 ? '#8B5CF6' : '#6366F1',
            borderRadius: [0, 6, 6, 0],
          },
        })),
        label: {
          show: true,
          position: 'right',
          fontFamily: 'Fira Code',
          fontWeight: 700,
          fontSize: 12.5,
          color: DARK_LABEL,
          formatter: (p) => Number(p.value).toFixed(2).replace('.', ','),
        },
        markLine: {
          symbol: 'none',
          lineStyle: { color: '#FB7185', width: 2, type: 'dashed' },
          label: {
            formatter: 'Media: 2,96',
            fontFamily: 'Fira Code',
            fontWeight: 700,
            color: '#FDA4AF',
          },
          data: [{ xAxis: 2.96 }],
        },
      },
    ],
  };
}

export function buildP2ChartOption(p2Region: 'ALL' | CensusRegion): EChartsOption {
  const regions: CensusRegion[] = ['Midwest', 'South', 'West', 'Northeast'];
  return {
    legend: {
      top: 2,
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontWeight: 600, fontSize: 12.5, color: DARK_LABEL },
    },
    tooltip: {
      backgroundColor: '#120A24',
      borderColor: '#2DD4BF',
      textStyle: { color: '#F8F7FC', fontSize: 13 },
      formatter: (params: unknown) => {
        const p = params as {
          data?: {
            state_name: string;
            province: string;
            region: string;
            loc: number;
            kcal: number;
            value: number[];
          };
        };
        const d = p.data;
        if (!d) return '';
        const dlffStr = (d.value[0] ?? 0).toFixed(2).replace('.', ',');
        const tpcdStr = (d.value[1] ?? 0).toFixed(1).replace('.', ',');
        const obStr = (d.value[2] ?? 0).toFixed(1).replace('.', ',');
        return (
          `<strong>${d.state_name} (${d.province}) — ${d.region}</strong><br/>` +
          `DLFF: <b>${dlffStr}</b> c/100k • Locales: <b>${d.loc.toLocaleString('es-AR')}</b><br/>` +
          `Consumo diario: <b>${tpcdStr}%</b> • Obesidad: <b>${obStr}%</b> • <b>${d.kcal} kcal/día</b>`
        );
      },
    },
    grid: { left: 54, right: 26, top: 46, bottom: 48 },
    xAxis: {
      type: 'value',
      name: 'Densidad DLFF (locales c/100k hab.)',
      nameLocation: 'middle',
      nameGap: 28,
      nameTextStyle: { color: DARK_MUTED, fontFamily: 'Fira Code', fontSize: 11.5 },
      axisLabel: { color: DARK_MUTED, fontFamily: 'Fira Code', fontSize: 11 },
      axisLine: { lineStyle: { color: DARK_GRID } },
      min: 0.4,
      max: 12.2,
      splitLine: { lineStyle: { color: DARK_GRID, type: 'dashed' } },
    },
    yAxis: {
      type: 'value',
      name: 'TPCD (%)',
      nameGap: 12,
      nameTextStyle: { color: DARK_MUTED, fontFamily: 'Fira Code', fontSize: 11.5 },
      axisLabel: { color: DARK_MUTED, fontFamily: 'Fira Code', fontSize: 11 },
      axisLine: { lineStyle: { color: DARK_GRID } },
      min: 27,
      max: 44.5,
      interval: 3,
      splitLine: { lineStyle: { color: DARK_GRID, type: 'dashed' } },
    },
    series: [
      {
        name: 'Media EE. UU.',
        type: 'scatter' as const,
        silent: true,
        tooltip: { show: false },
        data: [],
        markLine: {
          symbol: 'none',
          silent: true,
          lineStyle: { color: 'rgba(251, 113, 133, 0.65)', width: 1.5, type: 'dashed' },
          data: [
            {
              xAxis: 2.96,
              label: {
                formatter: 'Media DLFF: 2,96',
                position: 'insideEndTop',
                fontFamily: 'Fira Code',
                fontSize: 10.5,
                fontWeight: 600,
                color: '#FDA4AF',
              },
            },
            {
              yAxis: 36.13,
              label: {
                formatter: 'TPCD: 36,1%',
                position: 'insideEndTop',
                fontFamily: 'Fira Code',
                fontSize: 10.5,
                fontWeight: 600,
                color: '#FDA4AF',
              },
            },
          ],
        },
      },
      ...regions
        .filter((reg) => p2Region === 'ALL' || reg === p2Region)
        .map((reg) => ({
          name: reg,
          type: 'scatter' as const,
          symbolSize: (val: number[]) => Math.max(13, Math.min(29, ((val[2] ?? 26) - 20) * 1.35)),
          itemStyle: {
            color: DARK_REGION_COLORS[reg],
            opacity: 0.86,
            borderColor: 'rgba(10, 6, 20, 0.85)',
            borderWidth: 1.2,
          },
          emphasis: {
            scale: 1.35,
            itemStyle: { opacity: 1, borderColor: '#FFFFFF', borderWidth: 2 },
            label: { show: true, fontSize: 11, color: '#FFFFFF' },
          },
          label: {
            show: true,
            formatter: (p: unknown) => (p as { data?: { province: string } }).data?.province ?? '',
            position: 'inside' as const,
            fontSize: 9.5,
            fontFamily: 'Fira Code',
            fontWeight: 700,
            color: '#FFFFFF',
            textBorderColor: 'rgba(8, 4, 18, 0.78)',
            textBorderWidth: 2,
          },
          labelLayout: { hideOverlap: true },
          data: ESTADOS_DATA.filter((s) => s.census_region === reg).map((s) => ({
            value: [s.dlff, s.tpcd, s.ob],
            province: s.province,
            state_name: s.state_name,
            region: s.census_region,
            loc: s.loc,
            kcal: s.kcal,
          })),
        })),
    ],
  };
}

export function buildP3ChartOption(p3Mode: 'grouped' | 'stacked'): EChartsOption {
  const regions: CensusRegion[] = ['Midwest', 'Northeast', 'South', 'West'];
  if (p3Mode === 'grouped') {
    const chainsRev = [...P3_MATRIX.chains].reverse();
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#120A24',
        borderColor: '#8B5CF6',
        textStyle: { color: '#F8F7FC', fontSize: 13 },
      },
      legend: { top: 4, textStyle: { fontWeight: 600, fontSize: 13, color: DARK_LABEL } },
      grid: { left: 145, right: 40, top: 44, bottom: 30 },
      xAxis: {
        type: 'value',
        max: 30,
        axisLabel: { formatter: '{value} %', fontFamily: 'Fira Code', color: DARK_MUTED },
        splitLine: { lineStyle: { color: DARK_GRID, type: 'dashed' } },
      },
      yAxis: {
        type: 'category',
        data: chainsRev,
        axisLabel: { fontWeight: 700, fontSize: 13, color: DARK_LABEL },
        axisLine: { lineStyle: { color: DARK_GRID } },
      },
      series: regions.map((reg) => ({
        name: reg,
        type: 'bar' as const,
        data: [...P3_MATRIX.pcts[reg]].reverse(),
        itemStyle: { color: DARK_REGION_COLORS[reg], borderRadius: [0, 4, 4, 0] },
      })),
    };
  }

  const palette = ['#6D28D9', '#7C3AED', '#8B5CF6', '#A78BFA', '#6366F1', '#2DD4BF', '#5EEAD4', '#C4B5FD'];
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: '#120A24',
      borderColor: '#8B5CF6',
      textStyle: { color: '#F8F7FC', fontSize: 12.5 },
    },
    legend: { top: 2, type: 'scroll', textStyle: { fontSize: 12, color: DARK_LABEL } },
    grid: { left: 60, right: 30, top: 44, bottom: 30 },
    xAxis: {
      type: 'category',
      data: regions,
      axisLabel: { fontWeight: 700, fontSize: 13, color: DARK_LABEL },
      axisLine: { lineStyle: { color: DARK_GRID } },
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: { formatter: '{value} %', fontFamily: 'Fira Code', color: DARK_MUTED },
      splitLine: { lineStyle: { color: DARK_GRID, type: 'dashed' } },
    },
    series: [
      ...P3_MATRIX.chains.map((ch, idx) => ({
        name: ch,
        type: 'bar' as const,
        stack: 'total',
        barWidth: '46%',
        itemStyle: { color: palette[idx] ?? '#8B5CF6' },
        data: regions.map((r) => P3_MATRIX.pcts[r][idx] ?? 0),
      })),
      {
        name: 'Resto (458)',
        type: 'bar' as const,
        stack: 'total',
        itemStyle: { color: 'rgba(167, 139, 250, 0.25)' },
        data: regions.map((r) => P3_MATRIX.restoPct[r]),
      },
    ],
  };
}

export function buildP4ChartOption(p4Mode: 'region' | 'trimestre'): EChartsOption {
  const items =
    p4Mode === 'region'
      ? [
        { label: 'South', kcal: 944.9, loc: 4081 },
        { label: 'Midwest', kcal: 925.1, loc: 2740 },
        { label: 'West', kcal: 845.6, loc: 2022 },
        { label: 'Northeast', kcal: 812.3, loc: 1061 },
      ]
      : [
        { label: 'T1 2024', kcal: 904.0, loc: 2464 },
        { label: 'T2 2024', kcal: 878.5, loc: 2615 },
        { label: 'T3 2024', kcal: 896.2, loc: 2614 },
        { label: 'T4 2024', kcal: 895.7, loc: 2211 },
      ];

  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#120A24',
      borderColor: '#2DD4BF',
      textStyle: { color: '#F8F7FC', fontSize: 13 },
    },
    legend: { top: 4, textStyle: { fontSize: 12.5, color: DARK_LABEL } },
    grid: { left: 60, right: 65, top: 44, bottom: 32 },
    xAxis: {
      type: 'category',
      data: items.map((i) => i.label),
      axisLabel: { fontWeight: 700, fontSize: 13, color: DARK_LABEL },
      axisLine: { lineStyle: { color: DARK_GRID } },
    },
    yAxis: [
      {
        type: 'value',
        min: 700,
        max: 1000,
        name: 'kcal/día',
        nameTextStyle: { color: DARK_MUTED, fontFamily: 'Fira Code', fontSize: 11 },
        axisLabel: { color: DARK_MUTED, fontFamily: 'Fira Code' },
        splitLine: { lineStyle: { color: DARK_GRID, type: 'dashed' } },
      },
      {
        type: 'value',
        min: 0,
        max: 4500,
        name: 'Locales',
        nameTextStyle: { color: '#5EEAD4', fontFamily: 'Fira Code', fontSize: 11 },
        axisLabel: { color: '#5EEAD4', fontFamily: 'Fira Code' },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: 'Ingesta Calórica (kcal/día)',
        type: 'bar',
        barWidth: '40%',
        data: items.map((i) => ({
          value: i.kcal,
          itemStyle: { color: i.kcal > 900 ? '#A78BFA' : '#6366F1', borderRadius: [6, 6, 0, 0] },
        })),
        label: {
          show: true,
          position: 'top',
          fontFamily: 'Fira Code',
          fontWeight: 700,
          fontSize: 12,
          color: DARK_LABEL,
          formatter: '{c}',
        },
        markLine: {
          symbol: 'none',
          lineStyle: { color: '#FB7185', width: 2, type: 'dashed' },
          label: {
            formatter: 'Umbral: 900 kcal',
            fontFamily: 'Fira Code',
            fontWeight: 700,
            color: '#FDA4AF',
          },
          data: [{ yAxis: 900 }],
        },
      },
      {
        name: 'Sucursales',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbolSize: 9,
        itemStyle: { color: '#2DD4BF' },
        lineStyle: { width: 3, color: '#2DD4BF' },
        data: items.map((i) => i.loc),
      },
    ],
  };
}

export function buildRadarComparisonOption(): EChartsOption {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#120A24',
      borderColor: '#2DD4BF',
      textStyle: { color: '#F8F7FC', fontSize: 12.5 },
    },
    legend: { top: 0, textStyle: { fontSize: 12, fontWeight: 600, color: DARK_LABEL } },
    grid: { left: 45, right: 20, top: 38, bottom: 26 },
    xAxis: {
      type: 'category',
      data: ['DLFF', 'Consumo %', 'Obesidad %'],
      axisLabel: { fontSize: 12, fontWeight: 600, color: DARK_LABEL },
      axisLine: { lineStyle: { color: DARK_GRID } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: DARK_MUTED, fontFamily: 'Fira Code', fontSize: 11 },
      splitLine: { lineStyle: { type: 'dashed', color: DARK_GRID } },
    },
    series: [
      {
        name: '5 Triple Alerta',
        type: 'bar',
        barWidth: '32%',
        itemStyle: { color: '#A78BFA', borderRadius: [5, 5, 0, 0] },
        data: [5.65, 40.46, 38.16],
      },
      {
        name: '4 Oportunidad (NY, CA, NJ, MA)',
        type: 'bar',
        barWidth: '32%',
        itemStyle: { color: '#2DD4BF', borderRadius: [5, 5, 0, 0] },
        data: [1.55, 31.63, 28.03],
      },
    ],
  };
}
