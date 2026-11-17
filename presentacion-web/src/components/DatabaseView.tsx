import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import {
  CODE_REPO,
  DB_DICTIONARY,
  MERMAID_ERD_SRC,
  SAMPLES_DATA,
} from '../data/ae4Data';

interface DatabaseViewProps {
  selectedTable: string;
  onSelectTable: (table: string) => void;
  onGoToDashboard: () => void;
  onBackToDeck: () => void;
}

export default function DatabaseView({
  selectedTable,
  onSelectTable,
  onGoToDashboard,
  onBackToDeck,
}: DatabaseViewProps) {
  const [codeTab, setCodeTab] = useState<'ddl' | 'dml' | 'queries' | 'dax' | 'etl'>('ddl');
  const [copied, setCopied] = useState(false);
  const [mermaidSvg, setMermaidSvg] = useState<string>('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ dragging: boolean; startX: number; startY: number }>({
    dragging: false,
    startX: 0,
    startY: 0,
  });

  useEffect(() => {
    let active = true;
    mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' });
    mermaid
      .render('mermaidErSvgReact', MERMAID_ERD_SRC)
      .then(({ svg }) => {
        if (active) setMermaidSvg(svg);
      })
      .catch(() => {
        if (active) setMermaidSvg('<p style="padding:20px;color:#64748B;">No se pudo renderizar el diagrama Mermaid.</p>');
      });
    return () => {
      active = false;
    };
  }, []);

  const meta = DB_DICTIONARY[selectedTable] ?? DB_DICTIONARY.fact_locales_consumo!;
  const sampleRows = SAMPLES_DATA[selectedTable] ?? [];
  const firstSample = sampleRows[0];
  const sampleCols = firstSample ? Object.keys(firstSample) : [];

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_REPO[codeTab] || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    });
  };

  return (
    <div className="page-shell">
      <div
        className="view-banner"
        style={{ background: 'linear-gradient(125deg, var(--navy-950) 0%, var(--navy-900) 60%, var(--copper-fact) 100%)' }}
      >
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#FDE68A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Data Warehouse PostgreSQL • Modelo Estrella (dw_fastfood)
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.65rem, 2.5vw, 2.25rem)', marginTop: 4 }}>
            Esquema Estrella, Diagrama ER y Diccionario de Datos
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button type="button" className="hdr-btn" onClick={onGoToDashboard}>Ir al Dashboard &rarr;</button>
          <button type="button" className="hdr-btn" onClick={onBackToDeck}>&larr; Volver a Presentación</button>
        </div>
      </div>

      {/* Esquema Estrella a ancho completo */}
      <div className="star-canvas" style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          <div>
            <span className="panel-kicker" style={{ color: 'var(--copper-fact)' }}>Modelo Físico Interactivo</span>
            <h2 className="panel-heading" style={{ marginTop: 2 }}>Hacé clic en una tabla para inspeccionar su esquema y filas reales</h2>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, background: 'var(--navy-900)', color: '#fff', padding: '5px 12px', borderRadius: 99 }}>
            15.925 registros totales • 4 tablas físicas
          </span>
        </div>

        <div className="star-nodes-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <button
              type="button"
              className={`db-node-card ${selectedTable === 'dim_tiempo' ? 'active-node' : ''}`}
              onClick={() => onSelectTable('dim_tiempo')}
            >
              <div className="db-node-header"><span>dim_tiempo</span><span>366 filas</span></div>
              <div className="db-node-body">
                <div className="db-col-row"><span><b className="badge-pk">PK</b> tiempo_id</span><span>SERIAL</span></div>
                <div className="db-col-row"><span><b className="badge-uk">UK</b> fecha</span><span>DATE</span></div>
                <div className="db-col-row"><span>dia, mes, trimestre, anio</span><span>INT</span></div>
                <div className="db-col-row"><span>nombre_mes</span><span>VARCHAR</span></div>
              </div>
            </button>

            <button
              type="button"
              className={`db-node-card ${selectedTable === 'dim_cadena' ? 'active-node' : ''}`}
              onClick={() => onSelectTable('dim_cadena')}
            >
              <div className="db-node-header"><span>dim_cadena</span><span>466 filas</span></div>
              <div className="db-node-body">
                <div className="db-col-row"><span><b className="badge-pk">PK</b> cadena_id</span><span>SERIAL</span></div>
                <div className="db-col-row"><span><b className="badge-uk">UK</b> nombre_cadena</span><span>VARCHAR</span></div>
                <div className="db-col-row"><span>categoria_principal</span><span>VARCHAR</span></div>
              </div>
            </button>
          </div>

          <button
            type="button"
            className={`db-node-card fact-node ${selectedTable === 'fact_locales_consumo' ? 'active-node' : ''}`}
            onClick={() => onSelectTable('fact_locales_consumo')}
          >
            <div className="db-node-header"><span>fact_locales_consumo</span><span>9.904 filas</span></div>
            <div className="db-node-body">
              <div className="db-col-row"><span><b className="badge-pk">PK</b> hecho_id</span><span>SERIAL</span></div>
              <div className="db-col-row"><span><b className="badge-fk">FK</b> tiempo_id</span><span>IDX</span></div>
              <div className="db-col-row"><span><b className="badge-fk">FK</b> geografia_id</span><span>IDX</span></div>
              <div className="db-col-row"><span><b className="badge-fk">FK</b> cadena_id</span><span>IDX</span></div>
              <div className="db-col-row"><span>latitude / longitude</span><span>NUMERIC</span></div>
              <div className="db-col-row" style={{ background: 'var(--emerald-tint)' }}><span><strong>cantidad_locales</strong></span><span><strong>INT = 1</strong></span></div>
              <div className="db-col-row" style={{ background: 'var(--copper-tint)' }}><span>calorias_diarias_promedio_ff</span><span>NUMERIC</span></div>
              <div className="db-col-row" style={{ background: 'var(--copper-tint)' }}><span>pct_consumo_diario</span><span>NUMERIC</span></div>
              <div className="db-col-row" style={{ background: 'var(--copper-tint)' }}><span>tasa_obesidad_pct</span><span>NUMERIC</span></div>
            </div>
          </button>

          <button
            type="button"
            className={`db-node-card ${selectedTable === 'dim_geografia' ? 'active-node' : ''}`}
            onClick={() => onSelectTable('dim_geografia')}
          >
            <div className="db-node-header"><span>dim_geografia</span><span>5.189 filas</span></div>
            <div className="db-node-body">
              <div className="db-col-row"><span><b className="badge-pk">PK</b> geografia_id</span><span>SERIAL</span></div>
              <div className="db-col-row"><span>province</span><span>VARCHAR(2)</span></div>
              <div className="db-col-row"><span>state_name</span><span>VARCHAR</span></div>
              <div className="db-col-row"><span>census_region</span><span>VARCHAR</span></div>
              <div className="db-col-row"><span>city / postal_code</span><span>VARCHAR</span></div>
              <div className="db-col-row" style={{ background: 'var(--blue-tint)' }}><span><strong>population_total</strong></span><span><strong>BIGINT</strong></span></div>
            </div>
          </button>
        </div>
      </div>

      {/* Inspector de Tabla Seleccionada */}
      <div className="ed-panel" style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span className="panel-kicker" style={{ color: 'var(--copper-fact)' }}>{meta.eyebrow}</span>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 21, color: 'var(--navy-900)', marginTop: 2 }}>{meta.title}</h3>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--copper-tint)', color: 'var(--copper-fact)', fontWeight: 700, padding: '4px 12px', borderRadius: 99 }}>
            {meta.rowsBadge}
          </span>
        </div>
        <p className="panel-text" style={{ fontSize: 14 }}>{meta.desc}</p>

        <div className="split-2" style={{ alignItems: 'start' }}>
          <div className="ed-table-wrap">
            <table className="ed-table" style={{ fontSize: 12.5 }}>
              <thead>
                <tr><th>Columna</th><th>Tipo SQL</th><th>Restricción</th><th>Descripción</th></tr>
              </thead>
              <tbody>
                {meta.cols.map(([col, type, rest, desc]) => (
                  <tr key={col}>
                    <td><code><strong>{col}</strong></code></td>
                    <td><code>{type}</code></td>
                    <td><code>{rest}</code></td>
                    <td>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <strong style={{ fontSize: 13, color: 'var(--navy-900)', display: 'block', marginBottom: 8 }}>
              Muestra de filas reales (<code>datos/procesados/</code>):
            </strong>
            <div className="ed-table-wrap">
              <table className="ed-table" style={{ fontSize: 12 }}>
                <thead>
                  <tr>{sampleCols.map((k) => <th key={k}><code>{k}</code></th>)}</tr>
                </thead>
                <tbody>
                  {sampleRows.slice(0, 4).map((row, idx) => (
                    <tr key={idx}>{sampleCols.map((k) => <td key={k}><code>{row[k]}</code></td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mermaid DER + Scripts */}
      <div className="split-2">
        <div className="ed-panel">
          <div className="mini-toolbar">
            <div>
              <span className="panel-kicker">Diagrama Entidad-Relación (Mermaid.js)</span>
              <h3 className="panel-heading">Cardinalidades 1:N (Zoom y Arrastrar)</h3>
            </div>
            <div className="segmented-btns">
              <button type="button" className="seg-btn" onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.15).toFixed(2)))}>&#8722;</button>
              <button type="button" className="seg-btn active" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}>100%</button>
              <button type="button" className="seg-btn" onClick={() => setZoom((z) => Math.min(2.4, +(z + 0.15).toFixed(2)))}>&#43;</button>
            </div>
          </div>
          <div
            className="mermaid-viewport"
            onMouseDown={(e) => {
              dragRef.current = { dragging: true, startX: e.clientX - pan.x, startY: e.clientY - pan.y };
            }}
            onMouseMove={(e) => {
              if (!dragRef.current.dragging) return;
              setPan({ x: e.clientX - dragRef.current.startX, y: e.clientY - dragRef.current.startY });
            }}
            onMouseUp={() => { dragRef.current.dragging = false; }}
            onMouseLeave={() => { dragRef.current.dragging = false; }}
          >
            <div
              className="mermaid-render-target"
              style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.12s ease' }}
              dangerouslySetInnerHTML={{ __html: mermaidSvg }}
            />
          </div>
        </div>

        <div className="ed-panel card-navy">
          <div className="mini-toolbar">
            <div className="segmented-btns" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.16)' }}>
              {([
                ['ddl', '01_creacion.sql'],
                ['dml', '02_carga.sql'],
                ['queries', '03_consultas.sql'],
                ['dax', 'DAX'],
                ['etl', 'ETL Python'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`seg-btn ${codeTab === key ? 'active' : ''}`}
                  style={{ color: codeTab === key ? '#fff' : '#CBD5E1' }}
                  onClick={() => setCodeTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button type="button" className="hdr-btn" onClick={handleCopy}>{copied ? '✓ Copiado' : 'Copiar'}</button>
          </div>
          <pre className="code-snippet" style={{ height: 430, overflowY: 'auto', fontSize: 12 }}>{CODE_REPO[codeTab]}</pre>
        </div>
      </div>
    </div>
  );
}
