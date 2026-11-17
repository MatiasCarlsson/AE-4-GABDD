import { useCallback, useMemo, useState } from 'react';
import type { EChartsOption } from 'echarts';
import EChartBox from './EChartBox';
import {
  CUBE_DATA,
  ESTADOS_DATA,
  P3_MATRIX,
  REGION_COLORS,
  TOP_CHAINS,
  type CensusRegion,
} from '../data/ae4Data';

interface DashboardViewProps {
  onBackToDeck: () => void;
}

const CATEGORIES = [
  'Burgers & Grill',
  'Sandwiches & Subs',
  'Tex-Mex',
  'Chicken & Wings',
  'Otros / Regional',
  'Pizza & Italian',
  'Asian & Seafood',
  'Coffee, Bakery & Ice Cream',
];

export default function DashboardView({ onBackToDeck }: DashboardViewProps) {
  const [regionFilter, setRegionFilter] = useState<'ALL' | CensusRegion>('ALL');
  const [stateFilter, setStateFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [chainFilter, setChainFilter] = useState<string>('ALL');
  const [quarterFilter, setQuarterFilter] = useState<string>('ALL');

  const [p1Mode, setP1Mode] = useState<'top5' | 'top10' | 'extremes'>('top5');
  const [p3Mode, setP3Mode] = useState<'grouped' | 'stacked'>('grouped');
  const [p4Mode, setP4Mode] = useState<'region' | 'trimestre'>('region');
  const [searchQuery, setSearchQuery] = useState('');

  const statesSortedAlpha = useMemo(
    () => [...ESTADOS_DATA].sort((a, b) => a.state_name.localeCompare(b.state_name)),
    []
  );

  /* Motor DAX derivado durante render (sin useEffect redundantes) */
  const computed = useMemo(() => {
    const activeStates = ESTADOS_DATA.filter((s) => {
      if (regionFilter !== 'ALL' && s.census_region !== regionFilter) return false;
      if (stateFilter !== 'ALL' && s.province !== stateFilter) return false;
      if (quarterFilter !== 'ALL' && String(s.trimestre) !== quarterFilter) return false;
      return true;
    });
    const activeProvSet = new Set(activeStates.map((s) => s.province));
    const provToReg = new Map<string, CensusRegion>();
    ESTADOS_DATA.forEach((s) => provToReg.set(s.province, s.census_region));

    const locByProv: Record<string, number> = {};
    const chainTotals: Record<string, number> = {};
    const catTotals: Record<string, number> = {};
    const regTotals: Record<CensusRegion, number> = { Midwest: 0, Northeast: 0, South: 0, West: 0 };
    const regChainCounts: Record<CensusRegion, Record<string, number>> = {
      Midwest: {},
      Northeast: {},
      South: {},
      West: {},
    };
    let totalLocales = 0;

    for (const r of CUBE_DATA) {
      if (!activeProvSet.has(r.p)) continue;
      if (categoryFilter !== 'ALL' && r.cat !== categoryFilter) continue;

      const rg = provToReg.get(r.p);
      if (rg) {
        regTotals[rg] += r.n;
        if (chainFilter === 'ALL' || r.ch === chainFilter) {
          regChainCounts[rg][r.ch] = (regChainCounts[rg][r.ch] || 0) + r.n;
        }
      }

      if (chainFilter !== 'ALL' && r.ch !== chainFilter) continue;
      locByProv[r.p] = (locByProv[r.p] || 0) + r.n;
      totalLocales += r.n;
      chainTotals[r.ch] = (chainTotals[r.ch] || 0) + r.n;
      catTotals[r.cat] = (catTotals[r.cat] || 0) + r.n;
    }

    let totalPop = 0;
    let weightedTpcdSum = 0;
    let weightedObSum = 0;
    let kcalSum = 0;

    const enrichedStates = activeStates.map((s) => {
      const filteredLoc = locByProv[s.province] || 0;
      const filteredDlff = s.pop > 0 ? +((filteredLoc * 100000) / s.pop).toFixed(2) : 0;
      totalPop += s.pop;
      weightedTpcdSum += s.tpcd * s.pop;
      weightedObSum += s.ob * s.pop;
      kcalSum += s.kcal;
      return { ...s, filteredLoc, filteredDlff };
    });

    const kpi1Dlff = totalPop > 0 ? (totalLocales * 100000) / totalPop : 0;
    const kpi3Tpcd = totalPop > 0 ? weightedTpcdSum / totalPop : 0;
    const kpiOb = totalPop > 0 ? weightedObSum / totalPop : 0;
    const meanKcal = activeStates.length > 0 ? kcalSum / activeStates.length : 0;

    let topChainName = 'Sin locales';
    let topChainCount = 0;
    Object.entries(chainTotals).forEach(([k, v]) => {
      if (k !== 'Otras Marcas (454)' && v > topChainCount) {
        topChainName = k;
        topChainCount = v;
      }
    });
    if (topChainCount === 0 && chainTotals['Otras Marcas (454)']) {
      topChainName = 'Otras Marcas (454)';
      topChainCount = chainTotals['Otras Marcas (454)'];
    }
    const kpi2Pmc = totalLocales > 0 ? (topChainCount * 100) / totalLocales : 0;

    const over900States = enrichedStates.filter((s) => s.kcal > 900);
    const over900Loc = over900States.reduce((acc, s) => acc + s.filteredLoc, 0);
    const over900Pct = totalLocales > 0 ? ((over900Loc * 100) / totalLocales).toFixed(1).replace('.', ',') : '0,0';

    return {
      activeStatesCount: activeStates.length,
      totalLocales,
      totalPop,
      kpi1Dlff,
      kpi2Pmc,
      topChainName,
      topChainCount,
      kpi3Tpcd,
      kpiOb,
      meanKcal,
      over900Loc,
      over900Count: over900States.length,
      over900Pct,
      enrichedStates,
      catTotals,
      regTotals,
      regChainCounts,
    };
  }, [regionFilter, stateFilter, categoryFilter, chainFilter, quarterFilter]);

  const resetFilters = useCallback(() => {
    setRegionFilter('ALL');
    setStateFilter('ALL');
    setCategoryFilter('ALL');
    setChainFilter('ALL');
    setQuarterFilter('ALL');
  }, []);

  const handleBubbleClick = useCallback((params: unknown) => {
    const p = params as { data?: { province?: string } };
    const prov = p?.data?.province;
    if (prov) {
      setStateFilter((prev) => (prev === prov ? 'ALL' : prov));
    }
  }, []);

  const p1Option = useMemo<EChartsOption>(() => {
    const sorted = [...computed.enrichedStates].sort((a, b) => b.filteredDlff - a.filteredDlff);
    const rows =
      p1Mode === 'top5'
        ? sorted.slice(0, 5).reverse()
        : p1Mode === 'top10'
          ? sorted.slice(0, 10).reverse()
          : [...sorted.slice(-5).reverse(), ...sorted.slice(0, 5).reverse()];

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#0F1E36',
        textStyle: { color: '#fff', fontSize: 12.5 },
      },
      grid: { left: 150, right: 55, top: 18, bottom: 28 },
      xAxis: { type: 'value', splitLine: { lineStyle: { color: '#E2E8F0', type: 'dashed' } } },
      yAxis: {
        type: 'category',
        data: rows.map((r) => `${r.state_name} (${r.province})`),
        axisLabel: { fontWeight: 600, fontSize: 12 },
      },
      series: [
        {
          type: 'bar',
          barWidth: '60%',
          data: rows.map((r) => ({
            value: r.filteredDlff,
            itemStyle: { color: r.filteredDlff >= 2.96 ? '#7C3AED' : '#64748B', borderRadius: [0, 5, 5, 0] },
          })),
          label: {
            show: true,
            position: 'right',
            fontFamily: 'Fira Code',
            fontSize: 11.5,
            fontWeight: 700,
            formatter: (p) => Number(p.value).toFixed(2).replace('.', ','),
          },
          markLine: {
            symbol: 'none',
            lineStyle: { color: '#DC2626', width: 2, type: 'dashed' },
            label: { formatter: '2,96', color: '#DC2626' },
            data: [{ xAxis: 2.96 }],
          },
        },
      ],
    };
  }, [computed.enrichedStates, p1Mode]);

  const p2Option = useMemo<EChartsOption>(() => {
    const regions: CensusRegion[] = ['Midwest', 'South', 'West', 'Northeast'];
    return {
      legend: { top: 4, data: regions, icon: 'circle', itemWidth: 10, itemHeight: 10, textStyle: { fontWeight: 600, fontSize: 12.5 } },
      tooltip: {
        backgroundColor: '#150D2A',
        borderColor: '#7C3AED',
        textStyle: { color: '#fff', fontSize: 13 },
        formatter: (params: unknown) => {
          const d = (params as { data?: { state_name: string; province: string; loc: number; kcal: number; value: number[] } }).data;
          if (!d) return '';
          return `<strong>${d.state_name} (${d.province})</strong><br/>DLFF: <b>${(d.value[0] ?? 0).toFixed(2).replace('.', ',')}</b> • Locales: <b>${d.loc}</b><br/>Consumo: <b>${d.value[1]}%</b> • Obesidad: <b>${d.value[2]}%</b> • <b>${d.kcal} kcal/d</b><br/><em>Clic para aislar este estado</em>`;
        },
      },
      grid: { left: 54, right: 26, top: 42, bottom: 44 },
      xAxis: {
        type: 'value',
        name: 'DLFF (locales c/100k)',
        nameLocation: 'middle',
        nameGap: 26,
        min: 0,
        splitLine: { lineStyle: { color: '#E2E8F0', type: 'dashed' } },
      },
      yAxis: {
        type: 'value',
        name: 'TPCD (%)',
        nameGap: 10,
        min: 27,
        max: 44.5,
        interval: 3,
        splitLine: { lineStyle: { color: '#E2E8F0', type: 'dashed' } },
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
            lineStyle: { color: '#E11D48', width: 1.5, type: 'dashed' },
            data: [
              { xAxis: 2.96, label: { formatter: 'Media: 2,96', position: 'end', distance: 4, fontSize: 10, color: '#E11D48' } },
              { yAxis: 36.13, label: { formatter: 'TPCD: 36,1%', position: 'insideEndBottom', fontSize: 10, color: '#E11D48' } },
            ],
          },
        },
        ...regions.map((reg) => ({
          name: reg,
          type: 'scatter' as const,
          symbolSize: (val: number[]) => Math.max(13, Math.min(28, ((val[2] ?? 26) - 20) * 1.35)),
          itemStyle: { color: REGION_COLORS[reg], opacity: 0.85, borderColor: '#fff', borderWidth: 1.4 },
          emphasis: { scale: 1.35, label: { show: true } },
          label: {
            show: true,
            formatter: (p: unknown) => (p as { data?: { province: string } }).data?.province ?? '',
            position: 'inside' as const,
            color: '#fff',
            textBorderColor: 'rgba(19, 12, 36, 0.55)',
            textBorderWidth: 2,
            fontFamily: 'Fira Code',
            fontSize: 9.5,
            fontWeight: 700,
          },
          labelLayout: { hideOverlap: true },
          data: computed.enrichedStates
            .filter((s) => s.census_region === reg)
            .map((s) => ({
              value: [s.filteredDlff, s.tpcd, s.ob],
              province: s.province,
              state_name: s.state_name,
              loc: s.filteredLoc,
              kcal: s.kcal,
            })),
        })),
      ],
    };
  }, [computed.enrichedStates]);

  const p3Option = useMemo<EChartsOption>(() => {
    const regions: CensusRegion[] = ['Midwest', 'Northeast', 'South', 'West'];
    const top8 = P3_MATRIX.chains;
    if (p3Mode === 'grouped') {
      const chainsRev = [...top8].reverse();
      return {
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: '#0F1E36', textStyle: { color: '#fff', fontSize: 12.5 } },
        legend: { top: 2, textStyle: { fontWeight: 600 } },
        grid: { left: 130, right: 30, top: 34, bottom: 26 },
        xAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
        yAxis: { type: 'category', data: chainsRev, axisLabel: { fontWeight: 700, fontSize: 12 } },
        series: regions.map((rg) => ({
          name: rg,
          type: 'bar' as const,
          itemStyle: { color: REGION_COLORS[rg], borderRadius: [0, 3, 3, 0] },
          data: chainsRev.map((c) => +(((computed.regChainCounts[rg][c] || 0) * 100) / (computed.regTotals[rg] || 1)).toFixed(2)),
        })),
      };
    }

    const palette = ['#3B0764', '#4C1D95', '#5B21B6', '#6D28D9', '#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD'];
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: '#150D2A', textStyle: { color: '#fff', fontSize: 12.5 } },
      legend: { top: 2, type: 'scroll' },
      grid: { left: 50, right: 20, top: 38, bottom: 26 },
      xAxis: { type: 'category', data: regions, axisLabel: { fontWeight: 700 } },
      yAxis: { type: 'value', max: 100, axisLabel: { formatter: '{value}%' } },
      series: top8.map((c, i) => ({
        name: c,
        type: 'bar' as const,
        stack: 'pmc',
        itemStyle: { color: palette[i] ?? '#7C3AED' },
        data: regions.map((rg) => +(((computed.regChainCounts[rg][c] || 0) * 100) / (computed.regTotals[rg] || 1)).toFixed(2)),
      })),
    };
  }, [computed.regChainCounts, computed.regTotals, p3Mode]);

  const p4Option = useMemo<EChartsOption>(() => {
    const order = p4Mode === 'region' ? ['South', 'Midwest', 'West', 'Northeast'] : ['1', '2', '3', '4'];
    const rows = order
      .map((k) => {
        const sub = computed.enrichedStates.filter((s) =>
          p4Mode === 'region' ? s.census_region === k : String(s.trimestre) === k
        );
        return {
          label: p4Mode === 'region' ? k : `T${k} 2024`,
          kcal: sub.length > 0 ? +(sub.reduce((a, b) => a + b.kcal, 0) / sub.length).toFixed(1) : 0,
          loc: sub.reduce((a, b) => a + b.filteredLoc, 0),
        };
      })
      .filter((r) => r.kcal > 0);

    return {
      tooltip: { trigger: 'axis', backgroundColor: '#0F1E36', textStyle: { color: '#fff', fontSize: 12.5 } },
      grid: { left: 55, right: 55, top: 34, bottom: 28 },
      xAxis: { type: 'category', data: rows.map((r) => r.label), axisLabel: { fontWeight: 700 } },
      yAxis: [
        { type: 'value', max: 1050, name: 'kcal/d' },
        { type: 'value', name: 'Locales', splitLine: { show: false } },
      ],
      series: [
        {
          name: 'Ingesta (kcal)',
          type: 'bar',
          barWidth: '44%',
          data: rows.map((r) => ({
            value: r.kcal,
            itemStyle: { color: r.kcal > 900 ? '#7C3AED' : '#64748B', borderRadius: [5, 5, 0, 0] },
          })),
          label: { show: true, position: 'top', fontFamily: 'Fira Code', fontWeight: 700, formatter: '{c}' },
          markLine: { symbol: 'none', lineStyle: { color: '#DC2626', width: 2, type: 'dashed' }, data: [{ yAxis: 900 }] },
        },
        { name: 'Sucursales', type: 'line', yAxisIndex: 1, symbolSize: 8, itemStyle: { color: '#C25E00' }, data: rows.map((r) => r.loc) },
      ],
    };
  }, [computed.enrichedStates, p4Mode]);

  const catOption = useMemo<EChartsOption>(() => {
    const entries = Object.entries(computed.catTotals).sort((a, b) => a[1] - b[1]);
    return {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: '#0F1E36', textStyle: { color: '#fff', fontSize: 12.5 } },
      grid: { left: 175, right: 75, top: 15, bottom: 25 },
      xAxis: { type: 'value' },
      yAxis: { type: 'category', data: entries.map((e) => e[0]), axisLabel: { fontWeight: 600, fontSize: 12 } },
      series: [
        {
          type: 'bar',
          barWidth: '60%',
          data: entries.map((e) => ({
            value: e[1],
            itemStyle: { color: e[0] === 'Burgers & Grill' ? '#C25E00' : '#1E40AF', borderRadius: [0, 5, 5, 0] },
          })),
          label: {
            show: true,
            position: 'right',
            fontFamily: 'Fira Code',
            fontSize: 11.5,
            formatter: (p) =>
              `${Number(p.value).toLocaleString('es-AR')} (${computed.totalLocales ? ((Number(p.value) * 100) / computed.totalLocales).toFixed(1) : '0.0'}%)`,
          },
        },
      ],
    };
  }, [computed.catTotals, computed.totalLocales]);

  const tableRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return [...computed.enrichedStates]
      .filter((s) => !q || s.state_name.toLowerCase().includes(q) || s.province.toLowerCase().includes(q))
      .sort((a, b) => b.filteredDlff - a.filteredDlff);
  }, [computed.enrichedStates, searchQuery]);

  return (
    <div className="page-shell">
      <div className="view-banner">
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FDE68A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Power BI Desktop Replica • Motor DAX SUMX por Provincia
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', marginTop: 4 }}>
            Dashboard Territorial y Epidemiológico del Fast Food en EE. UU. (2024)
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'rgba(255,255,255,0.12)', padding: '6px 13px', borderRadius: 99 }}>
            {computed.activeStatesCount} estados • {computed.totalLocales.toLocaleString('es-AR')} locales
          </span>
          <button type="button" className="hdr-btn" onClick={onBackToDeck}>&larr; Volver a Presentación</button>
        </div>
      </div>

      {/* 5 Segmentadores */}
      <div className="slicers-bar" role="region" aria-label="Segmentadores">
        <div className="slicer-group">
          <label className="slicer-label" htmlFor="slicerRegion">1. Región Censal</label>
          <select id="slicerRegion" className="slicer-select" value={regionFilter} onChange={(e) => setRegionFilter(e.target.value as 'ALL' | CensusRegion)}>
            <option value="ALL">Todas las Regiones (4)</option>
            <option value="Midwest">Midwest</option>
            <option value="South">South</option>
            <option value="West">West</option>
            <option value="Northeast">Northeast</option>
          </select>
        </div>

        <div className="slicer-group">
          <label className="slicer-label" htmlFor="slicerState">2. Estado / Jurisdicción</label>
          <select id="slicerState" className="slicer-select" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="ALL">Todos los Estados (51)</option>
            {statesSortedAlpha.map((s) => (
              <option key={s.province} value={s.province}>
                {s.state_name} ({s.province})
              </option>
            ))}
          </select>
        </div>

        <div className="slicer-group">
          <label className="slicer-label" htmlFor="slicerCategory">3. Categoría</label>
          <select id="slicerCategory" className="slicer-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="ALL">Todas las Categorías (8)</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="slicer-group">
          <label className="slicer-label" htmlFor="slicerChain">4. Cadena Líder</label>
          <select id="slicerChain" className="slicer-select" value={chainFilter} onChange={(e) => setChainFilter(e.target.value)}>
            <option value="ALL">Todas las Cadenas (466)</option>
            {TOP_CHAINS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="Otras Marcas (454)">Otras Marcas (454)</option>
          </select>
        </div>

        <div className="slicer-group">
          <label className="slicer-label" htmlFor="slicerQuarter">5. Trimestre 2024</label>
          <select id="slicerQuarter" className="slicer-select" value={quarterFilter} onChange={(e) => setQuarterFilter(e.target.value)}>
            <option value="ALL">Todos (T1–T4 2024)</option>
            <option value="1">T1 (2024-03-31)</option>
            <option value="2">T2 (2024-06-30)</option>
            <option value="3">T3 (2024-09-30)</option>
            <option value="4">T4 (2024-12-31)</option>
          </select>
        </div>

        <button type="button" className="hdr-btn" onClick={resetFilters} style={{ background: 'var(--navy-900)', color: '#fff', border: 'none', height: 40, padding: '0 16px' }}>
          &#x21BA; Limpiar
        </button>
      </div>

      {/* KPIs */}
      <div className="kpi-strip">
        <div className="kpi-card primary-kpi">
          <span className="panel-kicker">KPI 1 • Principal (DLFF c/100k hab.)</span>
          <div className="big-stat" style={{ color: 'var(--blue-dim)', margin: '8px 0 4px' }}>{computed.kpi1Dlff.toFixed(2).replace('.', ',')}</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-700)' }}>
            {computed.totalLocales.toLocaleString('es-AR')} locales / {(computed.totalPop / 1e6).toFixed(2).replace('.', ',')} M hab. ({computed.activeStatesCount} est.)
          </div>
        </div>

        <div className="kpi-card" style={{ borderTop: '4px solid var(--violet-pbi)' }}>
          <span className="panel-kicker" style={{ color: 'var(--violet-pbi)' }}>KPI 2 • Cuota Líder (PMC %)</span>
          <div className="big-stat" style={{ color: 'var(--violet-pbi)', margin: '8px 0 4px' }}>{computed.kpi2Pmc.toFixed(2).replace('.', ',')} %</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-700)' }}>
            {computed.topChainName} ({computed.topChainCount.toLocaleString('es-AR')} loc.)
          </div>
        </div>

        <div className="kpi-card" style={{ borderTop: '4px solid var(--copper-fact)' }}>
          <span className="panel-kicker" style={{ color: 'var(--copper-fact)' }}>KPI 3 • Consumo Diario (TPCD %)</span>
          <div className="big-stat" style={{ color: 'var(--copper-fact)', margin: '8px 0 4px' }}>{computed.kpi3Tpcd.toFixed(2).replace('.', ',')} %</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-700)' }}>
            Obesidad adulta ponderada: {computed.kpiOb.toFixed(2).replace('.', ',')} %
          </div>
        </div>

        <div className="kpi-card" style={{ borderTop: '4px solid var(--emerald-ok)' }}>
          <span className="panel-kicker" style={{ color: 'var(--emerald-ok)' }}>Contexto Calórico (P4 • 2024)</span>
          <div className="big-stat" style={{ color: 'var(--navy-900)', margin: '8px 0 4px' }}>
            {computed.meanKcal.toFixed(1).replace('.', ',')} <span style={{ fontSize: 16 }}>kcal</span>
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-700)' }}>
            {computed.over900Loc.toLocaleString('es-AR')} loc. ({computed.over900Pct}%) en {computed.over900Count} est. &gt;900 kcal
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="dashboard-grid">
        <article className="dash-panel">
          <div className="mini-toolbar">
            <div>
              <span className="panel-kicker">Visual 1 • Pregunta de Negocio 1</span>
              <h3 className="panel-heading">Top Estados por Densidad (DLFF) vs. Promedio Nacional (2,96)</h3>
            </div>
            <div className="segmented-btns">
              <button type="button" className={`seg-btn ${p1Mode === 'top5' ? 'active' : ''}`} onClick={() => setP1Mode('top5')}>Top 5</button>
              <button type="button" className={`seg-btn ${p1Mode === 'top10' ? 'active' : ''}`} onClick={() => setP1Mode('top10')}>Top 10</button>
              <button type="button" className={`seg-btn ${p1Mode === 'extremes' ? 'active' : ''}`} onClick={() => setP1Mode('extremes')}>Top 5 vs. Bottom 5</button>
            </div>
          </div>
          <EChartBox option={p1Option} height={370} />
        </article>

        <article className="dash-panel">
          <div className="mini-toolbar">
            <div>
              <span className="panel-kicker" style={{ color: 'var(--violet-pbi)' }}>Visual 3 • Pregunta de Negocio 3</span>
              <h3 className="panel-heading">Cuota de Mercado (PMC %) de Cadenas Líderes por Región</h3>
            </div>
            <div className="segmented-btns">
              <button type="button" className={`seg-btn ${p3Mode === 'grouped' ? 'active' : ''}`} onClick={() => setP3Mode('grouped')}>Agrupadas</button>
              <button type="button" className={`seg-btn ${p3Mode === 'stacked' ? 'active' : ''}`} onClick={() => setP3Mode('stacked')}>100% Apiladas</button>
            </div>
          </div>
          <EChartBox option={p3Option} height={370} />
        </article>

        <article className="dash-panel full-span">
          <div>
            <span className="panel-kicker" style={{ color: 'var(--emerald-ok)' }}>Visual 2 • Pregunta de Negocio 2 (51 Jurisdicciones)</span>
            <h3 className="panel-heading">Relación entre Densidad (DLFF), Consumo Diario (TPCD %) y Tasa de Obesidad Adulta</h3>
            <p style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 2 }}>Hacé clic en cualquier burbuja para aislar ese estado en todo el tablero.</p>
          </div>
          <EChartBox option={p2Option} height={410} onPointClick={handleBubbleClick} />
        </article>

        <article className="dash-panel">
          <div className="mini-toolbar">
            <div>
              <span className="panel-kicker" style={{ color: 'var(--copper-fact)' }}>Visual 4 • Pregunta de Negocio 4</span>
              <h3 className="panel-heading">Ingesta Calórica Diaria vs. Umbral Crítico (900 kcal)</h3>
            </div>
            <div className="segmented-btns">
              <button type="button" className={`seg-btn ${p4Mode === 'region' ? 'active' : ''}`} onClick={() => setP4Mode('region')}>Por Región</button>
              <button type="button" className={`seg-btn ${p4Mode === 'trimestre' ? 'active' : ''}`} onClick={() => setP4Mode('trimestre')}>Por Trimestre</button>
            </div>
          </div>
          <EChartBox option={p4Option} height={370} />
        </article>

        <article className="dash-panel">
          <div>
            <span className="panel-kicker">Visual Complementario • Catálogo dim_cadena</span>
            <h3 className="panel-heading">Distribución por las 8 Categorías Gastronómicas</h3>
          </div>
          <EChartBox option={catOption} height={370} />
        </article>

        <article className="dash-panel full-span">
          <div className="mini-toolbar">
            <div>
              <span className="panel-kicker">Auditoría Estatal Completa • 51 Jurisdicciones</span>
              <h3 className="panel-heading">Explorador de Estados (Métricas Comerciales y Sanitarias)</h3>
            </div>
            <input
              type="search"
              placeholder="Buscar estado (ej. Kentucky, CA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '8px 13px', border: '1px solid var(--border-strong)', borderRadius: 8, fontSize: 13.5, width: 260 }}
            />
          </div>
          <div className="ed-table-wrap" style={{ maxHeight: 380 }}>
            <table className="ed-table">
              <thead>
                <tr>
                  <th>Pos.</th><th>Estado</th><th>Región</th><th>Corte 2024</th><th>Población</th>
                  <th>Locales</th><th>DLFF</th><th>Brecha</th><th>Consumo</th><th>Kcal/d</th><th>Obesidad</th><th>Nivel</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((s, idx) => {
                  const diff = +(s.filteredDlff - 2.96).toFixed(2);
                  return (
                    <tr key={s.province}>
                      <td><strong>#{idx + 1}</strong></td>
                      <td><strong>{s.state_name}</strong> (<code>{s.province}</code>)</td>
                      <td><span style={{ color: REGION_COLORS[s.census_region], fontWeight: 700 }}>&#9679; {s.census_region}</span></td>
                      <td><code>T{s.trimestre}</code></td>
                      <td>{s.pop.toLocaleString('es-AR')}</td>
                      <td><strong>{s.filteredLoc.toLocaleString('es-AR')}</strong></td>
                      <td><strong>{s.filteredDlff.toFixed(2).replace('.', ',')}</strong></td>
                      <td>{diff >= 0 ? `+${diff.toFixed(2)}` : diff.toFixed(2)}</td>
                      <td>{s.tpcd.toFixed(1).replace('.', ',')}%</td>
                      <td>{s.kcal.toFixed(1).replace('.', ',')}</td>
                      <td><strong>{s.ob.toFixed(1).replace('.', ',')}%</strong></td>
                      <td>
                        {s.ob >= 35 ? (
                          <span style={{ color: '#BE123C', fontWeight: 700 }}>Crítico</span>
                        ) : s.ob >= 30 ? (
                          <span style={{ color: '#C25E00', fontWeight: 600 }}>Moderado</span>
                        ) : (
                          <span style={{ color: '#15803D', fontWeight: 600 }}>Bajo</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  );
}
