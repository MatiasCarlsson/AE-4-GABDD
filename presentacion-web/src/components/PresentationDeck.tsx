import { useMemo, useState } from 'react';
import AnimatedMetricBar from './AnimatedMetricBar';
import AnimatedStat from './AnimatedStat';
import EChartBox from './EChartBox';
import SlideShell from './SlideShell';
import ThreeBackdrop, { type SlideTone } from './ThreeBackdrop';
import ViewErrorBoundary from './ViewErrorBoundary';
import { type CensusRegion } from '../data/ae4Data';
import {
  buildCategoryChartOption,
  buildP1ChartOption,
  buildP2ChartOption,
  buildP3ChartOption,
  buildP4ChartOption,
  buildRadarComparisonOption,
} from '../data/presentationCharts';
import type { AppView } from './Header';

interface PresentationDeckProps {
  currentSlide: number;
  showSpeakers: boolean;
  onSelectView: (view: AppView) => void;
  onGoToSlide: (idx: number) => void;
  onSelectDbTable: (table: string) => void;
}

const SLIDE_LABELS = [
  '01. Portada',
  '02. Pregunta Disparadora',
  '03. Contexto y Sesgo',
  '04. Preguntas y KPIs',
  '05. Fuentes y Merge',
  '06. Pipeline ETL',
  '07. Esquema Estrella',
  '08. 8 Categorías',
  '09. Power BI y DAX',
  '10. P1: Top 5 DLFF',
  '11. P2: Dispersión Regional',
  '12. P3 (A): Cuota PMC',
  '13. P3 (B): Nichos',
  '14. P4: Umbral 900 kcal',
  '15. Trazabilidad',
  '16. Triple Alerta',
  '17. Recomendaciones',
  '18. Cierre',
];

const SLIDE_TONES: SlideTone[] = [
  'obsidian', // 01 Portada
  'plum',     // 02 Pregunta Disparadora
  'indigo',   // 03 Contexto y Sesgo
  'indigo',   // 04 Preguntas y KPIs
  'teal',     // 05 Fuentes y Merge
  'indigo',   // 06 Pipeline ETL
  'obsidian', // 07 Esquema Estrella
  'plum',     // 08 Categorías
  'indigo',   // 09 Power BI y DAX
  'plum',     // 10 P1
  'teal',     // 11 P2
  'plum',     // 12 P3 A
  'indigo',   // 13 P3 B
  'teal',     // 14 P4
  'indigo',   // 15 Trazabilidad
  'teal',     // 16 Triple Alerta
  'plum',     // 17 Recomendaciones
  'obsidian', // 18 Cierre
];

export default function PresentationDeck({
  currentSlide,
  showSpeakers,
  onSelectView,
  onGoToSlide,
  onSelectDbTable,
}: PresentationDeckProps) {
  const [catMode, setCatMode] = useState<'locales' | 'marcas'>('locales');
  const [p1Mode, setP1Mode] = useState<'top5' | 'compare'>('top5');
  const [p2Region, setP2Region] = useState<'ALL' | CensusRegion>('ALL');
  const [p3Mode, setP3Mode] = useState<'grouped' | 'stacked'>('grouped');
  const [p4Mode, setP4Mode] = useState<'region' | 'trimestre'>('region');

  const slideTone: SlideTone = SLIDE_TONES[currentSlide] ?? 'obsidian';

  const catOption = useMemo(() => buildCategoryChartOption(catMode), [catMode]);
  const p1Option = useMemo(() => buildP1ChartOption(p1Mode), [p1Mode]);
  const p2Option = useMemo(() => buildP2ChartOption(p2Region), [p2Region]);
  const p3Option = useMemo(() => buildP3ChartOption(p3Mode), [p3Mode]);
  const p4Option = useMemo(() => buildP4ChartOption(p4Mode), [p4Mode]);
  const radarOption = useMemo(() => buildRadarComparisonOption(), []);

  return (
    <>
      <ViewErrorBoundary>
        <ThreeBackdrop currentSlide={currentSlide} slideTone={slideTone} />
      </ViewErrorBoundary>

      <aside className="deck-dots-nav" aria-label="Navegación por diapositivas">
        {SLIDE_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={`deck-dot ${currentSlide === i ? 'active' : ''}`}
            data-title={label}
            onClick={() => onGoToSlide(i)}
            aria-label={label}
          />
        ))}
      </aside>

      <nav className="deck-stepper-pill" aria-label="Controles de diapositiva">
        <button
          type="button"
          className="stepper-btn"
          disabled={currentSlide === 0}
          onClick={() => onGoToSlide(currentSlide - 1)}
          title="Diapositiva anterior (↑)"
          aria-label="Diapositiva anterior"
        >
          &uarr;
        </button>
        <span className="stepper-label">
          {SLIDE_LABELS[currentSlide] ?? `${currentSlide + 1} / ${SLIDE_LABELS.length}`}
        </span>
        <button
          type="button"
          className="stepper-btn"
          disabled={currentSlide === SLIDE_LABELS.length - 1}
          onClick={() => onGoToSlide(currentSlide + 1)}
          title="Siguiente diapositiva (↓)"
          aria-label="Siguiente diapositiva"
        >
          &darr;
        </button>
      </nav>

      <main className="deck-stage">
        {/* 01. PORTADA */}
        <SlideShell
          index={0}
          currentSlide={currentSlide}
          hero
          etapa="01 / 18 • Universidad de la Cuenca del Plata • Ingeniería en Sistemas"
          speaker="Hannah Bojanovich & Matías Viana Carlsson"
          showSpeakers={showSpeakers}
        >
          <div className="hero-aura" aria-hidden="true" />
          <div style={{ maxWidth: 1020, padding: '8px 0 4px', position: 'relative' }}>
            <h1 className="slide-title" style={{ fontSize: 'clamp(2.4rem, 4.1vw, 3.8rem)', lineHeight: 1.07, letterSpacing: '-0.025em' }}>
              Oferta Comercial de Fast Food, Consumo Calórico y Obesidad Adulta en EE. UU.
            </h1>
            <p className="slide-lead" style={{ marginTop: 16, fontSize: 'clamp(1.06rem, 1.32vw, 1.22rem)' }}>
              Trabajo Práctico Integrador AE4 (2026): ETL en <strong>Python / pandas</strong>, Data Warehouse Estrella en <strong>PostgreSQL (<code>dw_fastfood</code>)</strong> y analítica ponderada en <strong>Power BI (DAX)</strong>.
            </p>
          </div>
          <div className="cols-4 hero-stats-strip">
            <div>
              <div className="hero-stat-label">Hechos Validados</div>
              <div className="hero-stat-num" style={{ color: '#EDE9FE' }}><AnimatedStat target={9904} durationMs={1150} active={currentSlide === 0} /></div>
              <div className="hero-stat-sub">Sucursales geolocalizadas</div>
            </div>
            <div className="hero-stat-col">
              <div className="hero-stat-label">Cobertura Estatal</div>
              <div className="hero-stat-num" style={{ color: '#FFFFFF' }}><AnimatedStat target={51} durationMs={950} active={currentSlide === 0} /></div>
              <div className="hero-stat-sub">Estados + Washington D.C.</div>
            </div>
            <div className="hero-stat-col">
              <div className="hero-stat-label">Catálogo Unificado</div>
              <div className="hero-stat-num" style={{ color: '#A5F3FC' }}><AnimatedStat target={466} durationMs={1050} active={currentSlide === 0} /></div>
              <div className="hero-stat-sub">Cadenas en 8 rubros</div>
            </div>
            <div className="hero-stat-col">
              <div className="hero-stat-label">Censo + CDC 2024</div>
              <div className="hero-stat-num" style={{ color: '#FFFFFF' }}><AnimatedStat target={334.9} decimals={1} durationMs={1150} suffix=" M" active={currentSlide === 0} /></div>
              <div className="hero-stat-sub">Población cubierta</div>
            </div>
          </div>
          <div className="hero-actions-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ fontSize: 14, color: '#C4B5FD' }}>
              <strong>Cátedra:</strong> Lic. Gabriel del Rosario • Lic. Marcos Portel • Ads. Victoria Fernández
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" className="hdr-btn" onClick={() => onGoToSlide(1)} style={{ padding: '10px 18px', fontSize: 13.5 }}>Comenzar Recorrido &darr;</button>
              <button type="button" className="hdr-btn" onClick={() => onSelectView('dashboard')} style={{ background: '#7C3AED', color: '#fff', border: 'none', padding: '10px 20px', fontSize: 13.5, fontWeight: 600 }}>Abrir Dashboard &rarr;</button>
            </div>
          </div>
        </SlideShell>

        {/* 02. PREGUNTA DISPARADORA Y PROPÓSITO DEL ESTUDIO */}
        <SlideShell
          index={1}
          currentSlide={currentSlide}
          etapa="02 / 18 • Propósito y Pregunta Disparadora"
          speaker="Hannah & Matías (Bloque Inicial)"
          showSpeakers={showSpeakers}
          title={
            <>
              Si casi <span className="text-accent-teal">7 de cada 10</span> locales operan en zonas críticas, ¿el mapa explica el riesgo o la saturación?
            </>
          }
          lead="La pregunta disparadora que da sentido al estudio: cruzar dónde abre el mercado con dónde crece la exposición calórica y la obesidad adulta."
        >
          <div className="split-2">
            <div className="ed-panel panel-luminous" style={{ gap: 20 }}>
              <div>
                <span className="panel-kicker">El Disparador Empírico</span>
                <h3 className="panel-heading" style={{ marginTop: 6 }}>
                  La paradoja territorial de la comida rápida
                </h3>
                <p className="panel-text" style={{ marginTop: 8 }}>
                  Un mapa comercial aislado solo muestra cantidad de tiendas. Al unirlo con datos censales y epidemiológicos, descubrimos que el <strong>68,87 %</strong> de las sucursales se concentra en regiones donde ya se superan las <strong>900 kcal/día</strong>.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <AnimatedMetricBar
                  label="Sucursales en zona > 900 kcal/día (South + Midwest)"
                  valueLabel="6.821 locales (68,87%)"
                  ratio={0.6887}
                  accent="rose"
                  active={currentSlide === 1}
                  subtext="Vs. 3.083 locales (31,13%) en West y Northeast"
                />
                <AnimatedMetricBar
                  label="Brecha de obesidad adulta en bloque crítico"
                  valueLabel="~35,0% vs. ~29,1%"
                  ratio={0.78}
                  accent="violet"
                  active={currentSlide === 1}
                  subtext="+6 puntos porcentuales respecto a las costas"
                />
                <AnimatedMetricBar
                  label="Densidad extrema: South Dakota vs. media EE. UU."
                  valueLabel="11,20 vs. 2,96 c/100k"
                  ratio={0.9}
                  accent="teal"
                  active={currentSlide === 1}
                  subtext="3,78× más oferta relativa por habitante"
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div className="ed-panel panel-teal" style={{ gap: 12 }}>
                <span className="panel-kicker">Propósito 1 • Salud Pública Basada en Evidencia</span>
                <h3 className="panel-heading">Identificar dónde coincide la hiper-oferta con el daño sanitario</h3>
                <p className="panel-text">
                  Señalar los estados de <strong>Triple Alerta</strong> (<code>KY, IN, MO, WV, LA</code>) para orientar políticas de etiquetado, nutrición y prevención sin caer en métricas engañosas.
                </p>
              </div>
              <div className="ed-panel panel-indigo" style={{ gap: 12 }}>
                <span className="panel-kicker">Propósito 2 • Decisión Comercial Responsable</span>
                <h3 className="panel-heading">Evitar canibalización y reformular la oferta</h3>
                <p className="panel-text">
                  Detectar plazas sub-penetradas (<code>NY 1,35</code>, <code>NJ 1,60</code>, <code>CA 1,73</code>) y justificar ingeniería de menús livianos en las <strong>6.821 tiendas</strong> de zonas críticas.
                </p>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* 03. CONTEXTO Y SESGO */}
        <SlideShell
          index={2}
          currentSlide={currentSlide}
          etapa="03 / 18 • Etapa 3.1 • Contexto y Problemática"
          speaker="Oradora: Hannah (Bloque 1)"
          showSpeakers={showSpeakers}
          title="¿Por qué contar solo locales distorsiona el análisis?"
          lead="Sin relativizar por población, los estados más poblados aparentan saturación cuando su disponibilidad real por habitante es mínima."
        >
          <div className="split-2">
            <div className="ed-panel panel-luminous" style={{ gap: 22 }}>
              <span className="panel-kicker">Contraste Demográfico Real</span>
              <div style={{ paddingBottom: 18, borderBottom: '1px solid rgba(109,40,217,0.14)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 19, color: '#1E113A' }}>California (CA)</strong>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: '#6D28D9', fontWeight: 600 }}>Puesto 49 de 51</span>
                </div>
                <p className="panel-text" style={{ marginTop: 8 }}>
                  Registra <strong>675 locales</strong> (el mayor parque bruto del país), pero sobre 38,96 M de habitantes equivale a apenas <strong>1,73 locales c/100k hab.</strong>
                </p>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: 19, color: '#4C1D95' }}>South Dakota (SD)</strong>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: '#0D9488', fontWeight: 700 }}>Top 1 Nacional</span>
                </div>
                <p className="panel-text" style={{ marginTop: 8 }}>
                  Con solo <strong>103 locales</strong> y 0,92 M de habitantes alcanza <strong>11,20 locales c/100k hab.</strong> (<strong>3,78×</strong> el promedio nacional).
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="ed-panel panel-indigo">
                <span className="panel-kicker">01 • Perspectiva Comercial</span>
                <h3 className="panel-heading">Prevenir canibalización y detectar plazas abiertas</h3>
                <p className="panel-text">Distinguir mercados estatales saturados en el <em>Midwest</em> y <em>South</em> frente a jurisdicciones sub-penetradas del <em>Northeast</em> (<code>1,87</code>) y <em>West</em> (<code>2,56</code>).</p>
              </div>
              <div className="ed-panel">
                <span className="panel-kicker">02 • Perspectiva Sanitaria (CDC 2024)</span>
                <h3 className="panel-heading">Exposición calórica y prevalencia de obesidad</h3>
                <p className="panel-text">Evaluar en qué bloques regionales la alta oferta física coincide con ingesta diaria superior a <code>900 kcal/día</code> y obesidad adulta (<code>IMC &ge; 30</code>).</p>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* 04. PREGUNTAS Y KPIS */}
        <SlideShell
          index={3}
          currentSlide={currentSlide}
          etapa="04 / 18 • Etapa 3.1 • Preguntas de Negocio e Indicadores"
          speaker="Oradora: Hannah (Bloque 1)"
          showSpeakers={showSpeakers}
          title="4 Preguntas de Investigación y 3 KPIs Matemáticos"
          lead="Cada pregunta justifica una tabla del Esquema Estrella y se traduce en un visual del tablero."
        >
          <div className="split-2">
            <div className="ed-panel" style={{ gap: 18 }}>
              <span className="panel-kicker">Ejes de Investigación (P1 – P4)</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                <div className="row-divider">
                  <strong className="accent-highlight">P1 • Densidad Estatal:</strong> ¿Cuáles son los 5 estados con mayor <code>DLFF</code> vs. la media nacional (<code>2,96</code>)?
                </div>
                <div className="row-divider">
                  <strong className="accent-highlight">P2 • Correlación Regional:</strong> ¿La densidad (<code>DLFF</code>) se asocia con el consumo diario (<code>TPCD</code>) y la obesidad?
                </div>
                <div className="row-divider">
                  <strong className="accent-highlight">P3 • Market Share:</strong> ¿Cómo se reparte la cuota (<code>PMC</code>) del Top 8 de cadenas en las 4 regiones censales?
                </div>
                <div>
                  <strong className="accent-highlight">P4 • Alerta 2024:</strong> ¿Qué regiones superan las <code>900 kcal/día</code> de fast food y cuántas sucursales operan allí?
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="ed-panel panel-indigo" style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                <div style={{ minWidth: 135 }}>
                  <span className="panel-kicker">KPI 1 • Principal</span>
                  <div className="big-stat" style={{ marginTop: 6 }}><AnimatedStat target={2.96} decimals={2} active={currentSlide === 3} /></div>
                </div>
                <div>
                  <strong className="panel-subheading">Densidad de Locales (DLFF)</strong>
                  <p className="panel-text-sm"><code>(Locales / Población) × 100.000</code> hab.</p>
                </div>
              </div>
              <div className="ed-panel" style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                <div style={{ minWidth: 135 }}>
                  <span className="panel-kicker">KPI 2 • Cuota</span>
                  <div className="big-stat" style={{ marginTop: 6 }}><AnimatedStat target={21.29} decimals={2} suffix="%" active={currentSlide === 3} /></div>
                </div>
                <div>
                  <strong className="panel-subheading">Participación por Cadena (PMC)</strong>
                  <p className="panel-text-sm">Lidera McDonald's (<code>2.109</code> de <code>9.904</code> locales).</p>
                </div>
              </div>
              <div className="ed-panel panel-teal" style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
                <div style={{ minWidth: 135 }}>
                  <span className="panel-kicker">KPI 3 • Hábito</span>
                  <div className="big-stat" style={{ marginTop: 6 }}><AnimatedStat target={36.13} decimals={2} suffix="%" active={currentSlide === 3} /></div>
                </div>
                <div>
                  <strong className="panel-subheading">Consumo Diario Ponderado (TPCD)</strong>
                  <p className="panel-text-sm">Ponderado por población estatal (Obesidad: <code>32,60%</code>).</p>
                </div>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* 05. FUENTES Y MERGE */}
        <SlideShell
          index={4}
          currentSlide={currentSlide}
          etapa="05 / 18 • Etapa 3.2 • Fuentes de Datos y Merge"
          speaker="Orador: Matías (Bloque 2)"
          showSpeakers={showSpeakers}
          title={<>Integración de 2 Fuentes Heterogéneas por <code>province</code></>}
          lead="El padrón georreferenciado externo se complementa con indicadores censales y epidemiológicos estatales de 2024."
        >
          <div className="merge-grid">
            <div className="ed-panel">
              <div>
                <span className="panel-kicker">Fuente 1 • Externa (Datafiniti)</span>
                <h3 className="panel-heading" style={{ fontFamily: 'var(--font-mono)', fontSize: 17, marginTop: 8 }}>FastFoodRestaurants.csv</h3>
                <p className="panel-text" style={{ marginTop: 4 }}>10.000 sucursales crudas en 9 columnas útiles.</p>
              </div>
              <ul className="clean-list">
                <li><strong>Ubicación:</strong> <code>address</code>, <code>city</code>, <code>postalCode</code>, <code>province</code>.</li>
                <li><strong>GPS:</strong> <code>latitude</code> y <code>longitude</code> para validar territorio EE. UU.</li>
                <li><strong>Franquicia:</strong> <code>name</code> con 540 variantes ortográficas.</li>
                <li><strong>Límite:</strong> Sin datos de población ni salud.</li>
              </ul>
            </div>
            <div className="ed-panel panel-teal pulse-join-card" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 14 }}>
              <span className="panel-kicker">Cruce Relacional</span>
              <div className="flow-badge-pulse">province</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: '#99F6E4' }}>INNER JOIN<br />many_to_one</div>
              <div style={{ fontSize: 14.5, color: '#F0FDFA' }}><strong>9.904 locales</strong><br />&times; <strong>51 estados</strong><br />(0 nulos)</div>
            </div>
            <div className="ed-panel">
              <div>
                <span className="panel-kicker">Fuente 2 • Construida (Censo + CDC)</span>
                <h3 className="panel-heading" style={{ fontFamily: 'var(--font-mono)', fontSize: 16, marginTop: 8 }}>us_states_consumption...csv</h3>
                <p className="panel-text" style={{ marginTop: 4 }}>54 filas crudas &rarr; 51 jurisdicciones limpias.</p>
              </div>
              <ul className="clean-list">
                <li><strong>Demografía:</strong> <code>population_total</code> y <code>census_region</code> (4).</li>
                <li><strong>Consumo:</strong> <code>pct_daily_fastfood_consumption</code> y <code>kcal</code>.</li>
                <li><strong>Epidemiología:</strong> <code>obesity_rate_pct</code> adulta.</li>
                <li><strong>Temporalidad:</strong> <code>reference_date</code> (cortes 2024).</li>
              </ul>
            </div>
          </div>
        </SlideShell>

        {/* 06. PIPELINE ETL */}
        <SlideShell
          index={5}
          currentSlide={currentSlide}
          etapa="06 / 18 • Etapa 3.3 • Pipeline ETL en Python y pandas"
          speaker="Orador: Matías (Bloque 2)"
          showSpeakers={showSpeakers}
          title="Pipeline ETL: 5 Reglas de Limpieza y Auditoría Automática"
          lead={<>Reparación reproducible sin edición manual de archivos crudos (<code>etl/etl_fastfood_dw.py</code>).</>}
        >
          <div className="cols-5">
            <div className="ed-panel" style={{ padding: '22px 20px' }}>
              <span className="panel-kicker">01 • Parser CSV</span>
              <div className="big-stat" style={{ fontSize: '2.05rem' }}>20 filas</div>
              <p className="panel-text" style={{ fontSize: 14 }}>Recompone comas internas en <code>address</code> que corrían columnas.</p>
            </div>
            <div className="ed-panel" style={{ padding: '22px 20px' }}>
              <span className="panel-kicker">02 • Coordenadas</span>
              <div className="big-stat" style={{ fontSize: '2.05rem' }}>-51 loc.</div>
              <p className="panel-text" style={{ fontSize: 14 }}>Descarta longitudes positivas (<code>+90°</code> en Asia Central).</p>
            </div>
            <div className="ed-panel panel-indigo" style={{ padding: '22px 20px' }}>
              <span className="panel-kicker">03 • Regex Marcas</span>
              <div className="big-stat" style={{ fontSize: '1.9rem' }}>540&rarr;466</div>
              <p className="panel-text" style={{ fontSize: 14 }}>Agrupa variantes (7 de <em>McDonald's</em>) por clave y moda.</p>
            </div>
            <div className="ed-panel" style={{ padding: '22px 20px' }}>
              <span className="panel-kicker">04 • Unicidad</span>
              <div className="big-stat" style={{ fontSize: '2.05rem' }}>9.904</div>
              <p className="panel-text" style={{ fontSize: 14 }}><code>Co Spgs&rarr;CO</code>, ZIP <code>zfill(5)</code> y baja de 45 duplicados.</p>
            </div>
            <div className="ed-panel" style={{ padding: '22px 20px' }}>
              <span className="panel-kicker">05 • Fuente 2</span>
              <div className="big-stat" style={{ fontSize: '1.9rem' }}>54&rarr;51</div>
              <p className="panel-text" style={{ fontSize: 14 }}>Quita 3 duplicados e imputa <code>DE</code> y <code>ND</code> por media regional.</p>
            </div>
          </div>
          <div className="ed-panel panel-luminous" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, padding: '18px 26px' }}>
            <div style={{ fontSize: 14.5 }}>
              <strong>Validación Post-Merge:</strong> <code>suc.merge(dem, on="province", how="inner", validate="many_to_one")</code>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, color: '#4C1D95', fontWeight: 600 }}>
              9.904 filas íntegras • 51 estados • 0 nulos • 0 duplicados
            </div>
          </div>
        </SlideShell>

        {/* 07. ESQUEMA ESTRELLA */}
        <SlideShell
          index={6}
          currentSlide={currentSlide}
          etapa="07 / 18 • Etapa 3.4 • Data Warehouse en PostgreSQL"
          speaker="Orador: Matías (Bloque 3)"
          showSpeakers={showSpeakers}
          title={<>Esquema Estrella (<code>dw_fastfood</code>): 3 Dimensiones y 1 Hecho Central</>}
          lead="Integridad referencial mediante claves foráneas indexadas con B-Tree y separación de métricas aditivas vs. semi-aditivas."
        >
          <div className="split-chart-left">
            <div className="ed-panel panel-luminous">
              <div className="mini-toolbar">
                <span className="panel-kicker">Modelo Físico PostgreSQL (Clic para inspeccionar)</span>
                <button type="button" className="seg-btn active" onClick={() => onSelectView('database')}>Abrir Inspector DER &rarr;</button>
              </div>
              <div className="star-nodes-grid" style={{ marginTop: 6 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <button type="button" className="db-node-card" onClick={() => { onSelectDbTable('dim_tiempo'); onSelectView('database'); }}>
                    <div className="db-node-header"><span>dim_tiempo</span><span>366</span></div>
                    <div className="db-node-body">
                      <div className="db-col-row"><span><b className="badge-pk">PK</b> tiempo_id</span></div>
                      <div className="db-col-row"><span>fecha, trimestre, anio</span></div>
                    </div>
                  </button>
                  <button type="button" className="db-node-card" onClick={() => { onSelectDbTable('dim_cadena'); onSelectView('database'); }}>
                    <div className="db-node-header"><span>dim_cadena</span><span>466</span></div>
                    <div className="db-node-body">
                      <div className="db-col-row"><span><b className="badge-pk">PK</b> cadena_id</span></div>
                      <div className="db-col-row"><span>nombre_cadena, rubro</span></div>
                    </div>
                  </button>
                </div>
                <button type="button" className="db-node-card fact-node pulse-fact-node" onClick={() => { onSelectDbTable('fact_locales_consumo'); onSelectView('database'); }}>
                  <div className="db-node-header"><span>fact_locales_consumo</span><span>9.904</span></div>
                  <div className="db-node-body">
                    <div className="db-col-row"><span><b className="badge-pk">PK</b> hecho_id</span></div>
                    <div className="db-col-row"><span><b className="badge-fk">FK</b> tiempo, geografia, cadena</span></div>
                    <div className="db-col-row" style={{ background: 'var(--violet-100)' }}><span><strong>cantidad_locales = 1</strong></span><span>Aditiva</span></div>
                    <div className="db-col-row"><span>calorias, % consumo, % obesidad</span></div>
                  </div>
                </button>
                <button type="button" className="db-node-card" onClick={() => { onSelectDbTable('dim_geografia'); onSelectView('database'); }}>
                  <div className="db-node-header"><span>dim_geografia</span><span>5.189</span></div>
                  <div className="db-node-body">
                    <div className="db-col-row"><span><b className="badge-pk">PK</b> geografia_id</span></div>
                    <div className="db-col-row"><span>province, state_name</span></div>
                    <div className="db-col-row"><span>census_region, city, zip</span></div>
                    <div className="db-col-row" style={{ background: 'var(--violet-100)' }}><span><strong>population_total</strong></span></div>
                  </div>
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="ed-panel panel-indigo">
                <span className="panel-kicker">Granularidad del Hecho</span>
                <h3 className="panel-heading">1 Fila = 1 Sucursal Física Activa</h3>
                <p className="panel-text">Combina una métrica aditiva pura (<code>cantidad_locales = 1</code>) con 3 métricas semi-aditivas estatales de calorías, consumo y obesidad.</p>
              </div>
              <div className="ed-panel">
                <span className="panel-kicker">Prevención de Doble Conteo</span>
                <p className="panel-text">Como <code>dim_geografia</code> tiene 5.189 áreas postales, las consultas SQL usan <code>CTE</code> agrupando primero por <code>province</code> con <code>MAX(population_total)</code>.</p>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* 08. 8 CATEGORÍAS */}
        <SlideShell
          index={7}
          currentSlide={currentSlide}
          etapa="08 / 18 • Etapa 3.3 / 3.4 • Clasificación en dim_cadena"
          speaker="Orador: Matías (Bloque 2/3)"
          showSpeakers={showSpeakers}
          title="Anatomía de la Oferta: 466 Marcas en 8 Categorías"
          lead={<>El rubro <em>Burgers &amp; Grill</em> domina más de la mitad de todo el parque físico analizado.</>}
          toolbarRight={
            <div className="segmented-btns">
              <button type="button" className={`seg-btn ${catMode === 'locales' ? 'active' : ''}`} onClick={() => setCatMode('locales')}>Locales (9.904)</button>
              <button type="button" className={`seg-btn ${catMode === 'marcas' ? 'active' : ''}`} onClick={() => setCatMode('marcas')}>Marcas (466)</button>
            </div>
          }
        >
          <div className="split-chart-left">
            <div className="ed-panel"><EChartBox option={catOption} height={370} active={currentSlide === 7} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="ed-panel">
                <span className="panel-kicker">Rubro Hegemónico</span>
                <div className="big-stat">54,33%</div>
                <AnimatedMetricBar
                  label="Burgers & Grill"
                  valueLabel="5.381 locales"
                  ratio={0.5433}
                  accent="violet"
                  active={currentSlide === 7}
                  subtext="En solo 74 cadenas (72,7 sucursales/marca)"
                />
              </div>
              <div className="ed-panel panel-indigo">
                <span className="panel-kicker">Escolta Diversificada</span>
                <p className="panel-text"><strong>Sandwiches &amp; Subs</strong> (<code>12,30%</code>) y <strong>Tex-Mex</strong> (<code>11,19%</code>) suman casi un cuarto del mercado nacional.</p>
              </div>
              <div className="ed-panel">
                <span className="panel-kicker">Larga Cola Regional</span>
                <p className="panel-text"><strong>231 marcas locales</strong> (el 49,6% del catálogo) apenas aportan el <strong>5,59%</strong> de las sucursales (<code>554</code>).</p>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* 09. POWER BI Y DAX */}
        <SlideShell
          index={8}
          currentSlide={currentSlide}
          etapa="09 / 18 • Etapa 3.5 • Power BI Desktop y Medidas DAX"
          speaker="Oradora: Hannah (Bloque 4)"
          showSpeakers={showSpeakers}
          title={<>Modelado en Power BI: Relaciones <code>1:*</code> e Iteradores DAX</>}
          lead="Cálculo exacto de densidades y tasas ponderadas sin duplicar la población estatal por ciudad."
        >
          <div className="split-2">
            <div className="ed-panel" style={{ justifyContent: 'center', gap: 20 }}>
              <span className="panel-kicker">Preparación en Power Query y Modelo</span>
              <ul className="clean-list" style={{ gap: 15 }}>
                <li><strong>Configuración regional <code>en-US</code>:</strong> preserva decimales con punto y mantiene <code>postal_code</code> como texto (ej. <code>"05201"</code>).</li>
                <li><strong>Columnas condicionales:</strong> clasificación sanitaria (<em>Crítico &ge;35%</em>, <em>Moderado</em>, <em>Bajo</em>) y alerta <code>&gt; 900 kcal</code>.</li>
                <li><strong>Relaciones <code>1:*</code> de filtro único:</strong> desde las 3 dimensiones hacia <code>fact_locales_consumo</code>.</li>
                <li><strong>Iteración <code>SUMX(VALUES(province))</code>:</strong> evalúa población y % de consumo una única vez por estado.</li>
              </ul>
            </div>
            <div className="ed-panel panel-indigo">
              <span className="panel-kicker">Tabla _Medidas_KPIs (DAX)</span>
              <pre className="code-snippet" style={{ padding: 16, fontSize: 12.5 }}>{`Poblacion Estados =
SUMX(VALUES(dim_geografia[province]),
     CALCULATE(MAX(dim_geografia[population_total])))

KPI 1 DLFF c/100k =
DIVIDE([Total Locales], [Poblacion Estados], 0) * 100000

KPI 2 PMC Cuota % =
DIVIDE([Total Locales],
       CALCULATE([Total Locales], ALL(dim_cadena)), 0) * 100

KPI 3 TPCD Ponderado % =
VAR Num = SUMX(VALUES(dim_geografia[province]),
    CALCULATE(MAX(fact_locales_consumo[pct_consumo_diario])
              * MAX(dim_geografia[population_total])))
RETURN DIVIDE(Num, [Poblacion Estados], 0)`}</pre>
            </div>
          </div>
        </SlideShell>

        {/* 10. P1 */}
        <SlideShell
          index={9}
          currentSlide={currentSlide}
          etapa="10 / 18 • Etapa 3.5 • Pregunta de Negocio 1 (KPI 1 DLFF)"
          speaker="Oradora: Hannah (Bloque 4)"
          showSpeakers={showSpeakers}
          title={<>P1: Top 5 Estados por Densidad (<code>DLFF</code>) vs. Media (<code>2,96</code>)</>}
          lead="South Dakota, Kentucky, New Mexico, Wyoming y Vermont duplican o triplican el promedio nacional."
          toolbarRight={
            <div className="segmented-btns">
              <button type="button" className={`seg-btn ${p1Mode === 'top5' ? 'active' : ''}`} onClick={() => setP1Mode('top5')}>Top 5 (P1)</button>
              <button type="button" className={`seg-btn ${p1Mode === 'compare' ? 'active' : ''}`} onClick={() => setP1Mode('compare')}>Top 5 vs. Bottom 3</button>
            </div>
          }
        >
          <div className="split-chart-left">
            <div className="ed-panel"><EChartBox option={p1Option} height={370} active={currentSlide === 9} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="ed-panel">
                <span className="panel-kicker">Top 1 • South Dakota (SD)</span>
                <div className="big-stat">11,20 <span className="stat-unit">c/100k hab.</span></div>
                <p className="panel-text"><code>+8,24</code> sobre la media nacional por concentración de <em>drive-thru</em> en corredores interestatales.</p>
              </div>
              <div className="ed-panel panel-teal">
                <span className="panel-kicker">Top 2 • Kentucky (KY)</span>
                <div className="big-stat">7,11 <span className="stat-unit">c/100k hab.</span></div>
                <p className="panel-text">Combina saturación comercial (<code>322</code> locales) con <strong>40,5%</strong> de consumo diario y <strong>37,7%</strong> de obesidad.</p>
              </div>
              <div className="ed-panel panel-luminous">
                <span className="panel-kicker">Menor Saturación • NY y CA</span>
                <p className="panel-text"><strong>New York (1,35)</strong> y <strong>California (1,73)</strong> cierran el ranking por su alta densidad urbana y oferta independiente.</p>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* 11. P2 */}
        <SlideShell
          index={10}
          currentSlide={currentSlide}
          etapa="11 / 18 • Etapa 3.5 • Pregunta de Negocio 2 (Correlación Regional)"
          speaker="Oradora: Hannah (Bloque 4)"
          showSpeakers={showSpeakers}
          title={<>P2: Densidad Regional (<code>DLFF</code>) vs. Consumo Diario y Obesidad</>}
          lead={<>El bloque <em>Midwest + South</em> supera la densidad nacional y registra ~6 puntos más de obesidad que <em>West + Northeast</em>.</>}
          toolbarRight={
            <div className="segmented-btns">
              {(['ALL', 'Midwest', 'South', 'West', 'Northeast'] as const).map((reg) => (
                <button key={reg} type="button" className={`seg-btn ${p2Region === reg ? 'active' : ''}`} onClick={() => setP2Region(reg)}>
                  {reg === 'ALL' ? 'Todas (51)' : reg}
                </button>
              ))}
            </div>
          }
        >
          <div className="split-chart-left">
            <div className="ed-panel"><EChartBox option={p2Option} height={335} active={currentSlide === 10} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="ed-table-wrap">
                <table className="ed-table">
                  <thead><tr><th>Región</th><th>DLFF</th><th>TPCD</th><th>Obesidad</th></tr></thead>
                  <tbody>
                    <tr className="row-alert"><td><strong style={{ color: '#C4B5FD' }}>&#9679; Midwest</strong></td><td><strong>3,91</strong></td><td>37,69%</td><td><strong>35,14%</strong></td></tr>
                    <tr className="row-alert"><td><strong style={{ color: '#A5B4FC' }}>&#9679; South</strong></td><td><strong>3,17</strong></td><td><strong>38,90%</strong></td><td><strong>34,90%</strong></td></tr>
                    <tr><td><strong style={{ color: '#F472B6' }}>&#9679; West</strong></td><td>2,56</td><td>33,43%</td><td>28,85%</td></tr>
                    <tr><td><strong style={{ color: '#2DD4BF' }}>&#9679; Northeast</strong></td><td>1,87</td><td>31,67%</td><td>29,48%</td></tr>
                    <tr className="row-summary">
                      <td>EE. UU.</td><td>2,96</td><td>36,13%</td><td>32,60%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="ed-panel panel-teal">
                <span className="panel-kicker">Excepción Estadística: Vermont (VT)</span>
                <p className="panel-text">Alta densidad (<code>6,49</code>) por su baja población residente, pero bajo consumo diario (<code>29,4%</code>) y baja obesidad (<code>27,6%</code>).</p>
              </div>
            </div>
          </div>
        </SlideShell>

        {/* 12. P3 A */}
        <SlideShell
          index={11}
          currentSlide={currentSlide}
          etapa="12 / 18 • Etapa 3.5 • Pregunta de Negocio 3 (KPI 2 PMC %)"
          speaker="Oradora: Hannah (Bloque 4)"
          showSpeakers={showSpeakers}
          title={<>P3 (Parte A): Cuota de Mercado (<code>PMC %</code>) del Top 8 por Región</>}
          lead={<>Las 8 cadenas líderes concentran <strong>6.587 locales (66,51 % del país)</strong>, encabezadas por McDonald's en las 4 regiones.</>}
          toolbarRight={
            <div className="segmented-btns">
              <button type="button" className={`seg-btn ${p3Mode === 'grouped' ? 'active' : ''}`} onClick={() => setP3Mode('grouped')}>Barras Agrupadas</button>
              <button type="button" className={`seg-btn ${p3Mode === 'stacked' ? 'active' : ''}`} onClick={() => setP3Mode('stacked')}>100% Apiladas</button>
            </div>
          }
        >
          <div className="ed-panel"><EChartBox option={p3Option} height={395} active={currentSlide === 11} /></div>
        </SlideShell>

        {/* 13. P3 B */}
        <SlideShell
          index={12}
          currentSlide={currentSlide}
          etapa="13 / 18 • Etapa 3.5 • Patrones Competitivos Regionales"
          speaker="Oradora: Hannah (Bloque 4)"
          showSpeakers={showSpeakers}
          title="P3 (Parte B): Duopolio en el Este, Fragmentación en el Oeste y Nichos"
          lead="Tres dinámicas territoriales identificadas en la matriz competitiva de las 8 franquicias principales."
        >
          <div className="cols-3">
            <div className="ed-panel panel-indigo">
              <span className="panel-kicker">01 • Northeast (1.065 loc.)</span>
              <div className="big-stat">45,26%</div>
              <h3 className="panel-heading">Duopolio McDonald's + Burger King</h3>
              <p className="panel-text">McDonald's alcanza su techo nacional (<code>26,95%</code>) junto a Burger King (<code>18,31%</code>). El Top 8 suma <code>75,21%</code>.</p>
            </div>
            <div className="ed-panel">
              <span className="panel-kicker">02 • West (2.018 loc.)</span>
              <div className="big-stat">43,16%</div>
              <h3 className="panel-heading">Peso de Cadenas Regionales</h3>
              <p className="panel-text">Menor dominio del Top 8 (<code>56,84%</code>) por marcas de costa oeste (<em>Jack in the Box</em>, <em>Carl's Jr.</em>) y pico de <strong>Subway</strong> (<code>5,95%</code>).</p>
            </div>
            <div className="ed-panel panel-teal">
              <span className="panel-kicker">03 • Nichos South &amp; Midwest</span>
              <div className="big-stat">232 / 386</div>
              <h3 className="panel-heading">SONIC en el Sur y Arby's en Medio Oeste</h3>
              <p className="panel-text"><strong>SONIC</strong> concentra el 60% de su red en el South (<code>5,62%</code> vs. <code>0,47%</code> en NE); <strong>Arby's</strong> (<code>7,58%</code>) y <strong>Taco Bell</strong> (<code>10,03%</code>) destacan en Midwest.</p>
            </div>
          </div>
          <div className="ed-table-wrap">
            <table className="ed-table">
              <thead><tr><th>Top 5 Cadenas</th><th>Midwest</th><th>Northeast</th><th>South</th><th>West</th><th>Total EE. UU.</th><th>PMC Nacional</th></tr></thead>
              <tbody>
                <tr className="row-alert"><td><strong>1. McDonald's</strong></td><td>21,37%</td><td><strong>26,95%</strong></td><td>21,65%</td><td>17,49%</td><td>2.109</td><td><strong>21,29%</strong></td></tr>
                <tr><td><strong>2. Burger King</strong></td><td>13,04%</td><td><strong>18,31%</strong></td><td>10,07%</td><td>9,07%</td><td>1.145</td><td>11,56%</td></tr>
                <tr><td><strong>3. Taco Bell</strong></td><td><strong>10,03%</strong></td><td>5,82%</td><td>8,38%</td><td>8,92%</td><td>858</td><td>8,66%</td></tr>
                <tr><td><strong>4. Wendy's</strong></td><td>8,06%</td><td><strong>9,20%</strong></td><td>7,60%</td><td>5,20%</td><td>734</td><td>7,41%</td></tr>
                <tr><td><strong>5. Arby's</strong></td><td><strong>7,58%</strong></td><td>3,47%</td><td>5,21%</td><td>3,12%</td><td>519</td><td>5,24%</td></tr>
              </tbody>
            </table>
          </div>
        </SlideShell>

        {/* 14. P4 */}
        <SlideShell
          index={13}
          currentSlide={currentSlide}
          etapa="14 / 18 • Etapa 3.5 • Pregunta de Negocio 4 (dim_tiempo 2024)"
          speaker="Oradora: Hannah (Bloque 4)"
          showSpeakers={showSpeakers}
          title={<>P4: Regiones por Encima de <code>900 kcal/día</code> en 2024</>}
          lead={<>South y Midwest superan el umbral del 45% de una dieta adulta y concentran el <strong>68,87 % de las sucursales</strong>.</>}
          toolbarRight={
            <div className="segmented-btns">
              <button type="button" className={`seg-btn ${p4Mode === 'region' ? 'active' : ''}`} onClick={() => setP4Mode('region')}>Por Región</button>
              <button type="button" className={`seg-btn ${p4Mode === 'trimestre' ? 'active' : ''}`} onClick={() => setP4Mode('trimestre')}>Cortes T1–T4 2024</button>
            </div>
          }
        >
          <div className="split-chart-left">
            <div className="ed-panel"><EChartBox option={p4Option} height={370} active={currentSlide === 13} /></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="ed-panel">
                <span className="panel-kicker">Región Crítica 1 • South</span>
                <div className="big-stat">944,9 <span className="stat-unit">kcal/día</span></div>
                <p className="panel-text"><code>+44,9 kcal</code> sobre el límite con <strong>4.130 locales activos</strong> en 17 jurisdicciones.</p>
              </div>
              <div className="ed-panel">
                <span className="panel-kicker">Región Crítica 2 • Midwest</span>
                <div className="big-stat">925,1 <span className="stat-unit">kcal/día</span></div>
                <p className="panel-text"><code>+25,1 kcal</code> sobre el límite con <strong>2.691 locales activos</strong> en 12 jurisdicciones.</p>
              </div>
              <div className="ed-panel panel-luminous">
                <span className="panel-kicker">Total en Zona Crítica</span>
                <div className="big-stat">6.821 <span style={{ fontSize: 15, fontWeight: 600 }}>locales (68,87%)</span></div>
                <AnimatedMetricBar
                  label="Peso de South + Midwest"
                  valueLabel="68,87% del país"
                  ratio={0.6887}
                  accent="rose"
                  active={currentSlide === 13}
                />
              </div>
            </div>
          </div>
        </SlideShell>

        {/* 15. TRAZABILIDAD */}
        <SlideShell
          index={14}
          currentSlide={currentSlide}
          etapa="15 / 18 • Etapa 3.6 • Trazabilidad Completa del Proyecto"
          speaker="Hannah & Matías (Bloque 5)"
          showSpeakers={showSpeakers}
          title="Hilo Conductor Verificable: De las Preguntas a la Decisión"
          lead="Coherencia de punta a punta entre reglas ETL, tablas del esquema estrella, SQL/DAX y visualización."
          toolbarRight={
            <button type="button" className="hdr-btn" onClick={() => onSelectView('dashboard')} style={{ background: '#7C3AED', color: '#fff', border: 'none', padding: '9px 18px' }}>
              Explorar en Dashboard &rarr;
            </button>
          }
        >
          <div className="ed-table-wrap">
            <table className="ed-table">
              <thead><tr><th>Pregunta</th><th>Regla Clave en ETL</th><th>Tablas del DW</th><th>Visual Power BI</th><th>Hallazgo Principal</th></tr></thead>
              <tbody>
                <tr><td><strong className="accent-highlight">P1. Top 5 DLFF</strong></td><td>Filtro EE. UU. (-51), <code>Co Spgs&rarr;CO</code>, -45 dup.</td><td><code>fact</code> + <code>dim_geografia</code></td><td>Barras horiz. vs. <code>2,96</code></td><td><strong>SD (11,20)</strong> triplica media; <strong>NY (1,35)</strong> mínimo</td></tr>
                <tr><td><strong className="accent-highlight">P2. Correlación</strong></td><td>Imputación regional en <code>DE</code> y <code>ND</code></td><td><code>fact</code> + <code>dim_geografia</code></td><td>Dispersión burbujas (51)</td><td><strong>Midwest + South</strong>: ~35% ob. vs. ~29% West/NE</td></tr>
                <tr><td><strong className="accent-highlight">P3. Cuota PMC</strong></td><td>Unificación regex <code>540&rarr;466</code> marcas</td><td><code>fact</code> + <code>dim_cadena</code> + <code>geo</code></td><td>Barras agrupadas / 100%</td><td><strong>McDonald's (21,29%)</strong> lidera; SONIC en South</td></tr>
                <tr><td><strong className="accent-highlight">P4. &gt;900 kcal</strong></td><td>Enlace trimestral con calendario 2024</td><td><code>fact</code> + <code>geo</code> + <code>dim_tiempo</code></td><td>Columnas + línea <code>900</code></td><td><strong>South + Midwest</strong> suman <strong>6.821 locales (68,9%)</strong></td></tr>
              </tbody>
            </table>
          </div>
        </SlideShell>

        {/* 16. TRIPLE ALERTA */}
        <SlideShell
          index={15}
          currentSlide={currentSlide}
          etapa="16 / 18 • Etapa 3.6 • Análisis Integrado Multivariado"
          speaker="Hannah & Matías (Bloque 5)"
          showSpeakers={showSpeakers}
          title="5 Estados de Triple Alerta vs. 4 Plazas de Oportunidad"
          lead={<>Cruce simultáneo de densidad (<code>DLFF</code>), hábito diario (<code>TPCD</code>), calorías y obesidad adulta.</>}
        >
          <div className="split-2">
            <div className="ed-panel">
              <div>
                <span className="panel-kicker">Prioridad Sanitaria (DLFF &gt; 5 • TPCD &gt; 38% • Ob. &gt; 36%)</span>
                <h3 className="panel-heading" style={{ marginTop: 4 }}>5 Jurisdicciones en Triple Alerta</h3>
              </div>
              <div className="ed-table-wrap">
                <table className="ed-table">
                  <thead><tr><th>Estado</th><th>DLFF</th><th>Consumo</th><th>Obesidad</th></tr></thead>
                  <tbody>
                    <tr className="row-alert"><td><strong>Kentucky (KY)</strong></td><td>7,11</td><td>40,5%</td><td>37,7%</td></tr>
                    <tr className="row-alert"><td><strong>Indiana (IN)</strong></td><td>5,45</td><td>39,1%</td><td>36,8%</td></tr>
                    <tr className="row-alert"><td><strong>Missouri (MO)</strong></td><td>5,33</td><td>38,7%</td><td>36,1%</td></tr>
                    <tr className="row-alert"><td><strong>West Virginia (WV)</strong></td><td>5,20</td><td>42,4%</td><td><strong>41,0%</strong></td></tr>
                    <tr className="row-alert"><td><strong>Louisiana (LA)</strong></td><td>5,16</td><td>41,6%</td><td>39,2%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="ed-panel panel-teal">
              <div>
                <span className="panel-kicker">Expansión Comercial (DLFF &lt; 1,90 • Alta Población)</span>
                <h3 className="panel-heading" style={{ marginTop: 4 }}>Plazas Sub-penetradas: NY, NJ, CA y MA</h3>
              </div>
              <EChartBox option={radarOption} height={255} active={currentSlide === 15} />
            </div>
          </div>
        </SlideShell>

        {/* 17. RECOMENDACIONES */}
        <SlideShell
          index={16}
          currentSlide={currentSlide}
          etapa="17 / 18 • Etapa 3.6 • Recomendaciones y Limitaciones"
          speaker="Hannah & Matías (Bloque 5)"
          showSpeakers={showSpeakers}
          title="3 Decisiones Operativas y 4 Límites de Interpretación"
          lead="Síntesis ejecutiva para la industria gastronómica, políticas de salud y transparencia metodológica."
        >
          <div className="cols-3">
            <div className="ed-panel panel-indigo">
              <span className="panel-kicker">01 • Expansión Comercial</span>
              <h3 className="panel-heading">Descomprimir Midwest/South</h3>
              <p className="panel-text">Evitar canibalización en <code>SD, KY, ND, IN</code>; orientar aperturas de <em>Taco Bell</em> y <em>Subs</em> hacia <code>NY (1,35)</code>, <code>NJ (1,60)</code> y <code>CA (1,73)</code>.</p>
            </div>
            <div className="ed-panel">
              <span className="panel-kicker">02 • Ingeniería de Menú</span>
              <h3 className="panel-heading">Combos &lt; 600 kcal</h3>
              <p className="panel-text">En los <strong>6.821 locales</strong> de <em>South</em> y <em>Midwest</em>, promover opciones grilladas y bebidas sin azúcar en paneles <em>drive-thru</em>.</p>
            </div>
            <div className="ed-panel panel-teal">
              <span className="panel-kicker">03 • Salud Pública</span>
              <h3 className="panel-heading">Alertas en 29 Estados</h3>
              <p className="panel-text">Focalizar etiquetado calórico y prevención en <em>South + Midwest</em>, priorizando <code>KY, WV, LA, IN, MO</code>.</p>
            </div>
          </div>
          <div className="ed-panel panel-luminous" style={{ padding: '20px 26px' }}>
            <span className="panel-kicker">Limitaciones Metodológicas (Sección 8)</span>
            <div className="cols-4" style={{ gap: 18, fontSize: 13.5, color: '#3B3254' }}>
              <div><strong style={{ color: '#130C24' }}>L1. Nivel Estatal:</strong> Correlación territorial sin diagnósticos clínicos (evita falacia ecológica).</div>
              <div><strong style={{ color: '#130C24' }}>L2. Sin Facturación:</strong> <code>PMC</code> mide parque físico instalado, no ventas ni tickets de caja.</div>
              <div><strong style={{ color: '#130C24' }}>L3. Corte 2024:</strong> Relevamiento de un único año; tendencias largas exigen series multianuales.</div>
              <div><strong style={{ color: '#130C24' }}>L4. Muestra Pública:</strong> 9.904 locales capturan bien cadenas nacionales; menor cobertura rural.</div>
            </div>
          </div>
        </SlideShell>

        {/* 18. CIERRE */}
        <SlideShell
          index={17}
          currentSlide={currentSlide}
          hero
          centered
          etapa="18 / 18 • Cierre del Trabajo Integrador AE4 GABD (2026)"
          speaker="Matías & Hannah"
          showSpeakers={showSpeakers}
        >
          <div style={{ maxWidth: 860, margin: '8px 0' }}>
            <h2 className="slide-title" style={{ fontSize: 'clamp(2.2rem, 3.6vw, 3.3rem)' }}>
              Del Dato Crudo al Esquema Estrella y la Decisión Basada en Evidencia
            </h2>
            <p className="slide-lead" style={{ margin: '14px auto 0' }}>
              10.000 registros &rarr; <strong>9.904 locales limpios</strong> &times; <strong>51 estados</strong> &rarr; <strong>4 tablas PostgreSQL</strong> &rarr; <strong>Dashboard Power BI</strong>.
            </p>
          </div>
          <div className="split-2" style={{ width: '100%', maxWidth: 1040, textAlign: 'left' }}>
            <div className="ed-panel panel-indigo" style={{ cursor: 'pointer' }} onClick={() => onSelectView('dashboard')}>
              <span className="panel-kicker">Vista Interactiva 1</span>
              <h3 className="panel-heading" style={{ fontSize: 22 }}>Dashboard de Gráficos en Vivo</h3>
              <p className="panel-text">Filtrá en tiempo real las preguntas P1–P4, las 8 categorías y los 51 estados con recálculo DAX <code>SUMX</code>.</p>
              <button type="button" className="hdr-btn" style={{ background: '#7C3AED', color: '#fff', border: 'none', alignSelf: 'flex-start', fontWeight: 600, padding: '10px 18px' }}>Abrir Dashboard &rarr;</button>
            </div>
            <div className="ed-panel panel-teal" style={{ cursor: 'pointer' }} onClick={() => onSelectView('database')}>
              <span className="panel-kicker">Vista Interactiva 2</span>
              <h3 className="panel-heading" style={{ fontSize: 22 }}>Base de Datos y Diagrama DER</h3>
              <p className="panel-text">Inspeccioná el Esquema Estrella <code>dw_fastfood</code>, el DER en Mermaid con zoom y los scripts SQL, DAX y Python.</p>
              <button type="button" className="hdr-btn" style={{ background: 'rgba(45, 212, 191, 0.2)', color: '#F0FDFA', borderColor: '#5EEAD4', alignSelf: 'flex-start', fontWeight: 600, padding: '10px 18px' }}>Inspeccionar Base de Datos &rarr;</button>
            </div>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, color: '#DDD6FE', marginTop: 10 }}>
            “Muchas gracias por su atención.”
          </p>
        </SlideShell>
      </main>
    </>
  );
}
