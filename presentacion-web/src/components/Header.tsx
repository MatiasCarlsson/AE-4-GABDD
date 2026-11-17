import { memo } from 'react';
import logoUcp from '../assets/logo_ucp.png';

export type AppView = 'deck' | 'dashboard' | 'database';

interface HeaderProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  currentSlide: number;
  totalSlides: number;
  showSpeakers: boolean;
  onToggleSpeakers: () => void;
  onToggleFullscreen: () => void;
  onGoToSlide: (idx: number) => void;
}

const Header = memo(function Header({
  activeView,
  onSelectView,
  currentSlide,
  totalSlides,
  showSpeakers,
  onToggleSpeakers,
  onToggleFullscreen,
  onGoToSlide,
}: HeaderProps) {
  const progressPct = activeView === 'deck' ? ((currentSlide + 1) / totalSlides) * 100 : 100;

  return (
    <>
      <div className="top-progress-track" aria-hidden="true">
        <div className="top-progress-bar" style={{ width: `${progressPct}%` }} />
      </div>

      <header className="app-header">
        <button
          type="button"
          className="brand-cluster"
          onClick={() => {
            onSelectView('deck');
            onGoToSlide(0);
          }}
          title="Ir a Portada"
        >
          <img src={logoUcp} alt="Logo UCP" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-eyebrow">UCP • GABD AE4 (2026)</span>
            <span className="brand-title">Fast Food, Consumo y Obesidad EE. UU.</span>
          </div>
        </button>

        <nav className="nav-tabs" aria-label="Navegación principal">
          <button
            type="button"
            className={`nav-tab ${activeView === 'deck' ? 'active' : ''}`}
            onClick={() => onSelectView('deck')}
          >
            <span>Presentación</span>
            <span className="tab-pill">{totalSlides}</span>
          </button>
          <button
            type="button"
            className={`nav-tab ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => onSelectView('dashboard')}
          >
            <span>Dashboard</span>
          </button>
          <button
            type="button"
            className={`nav-tab ${activeView === 'database' ? 'active' : ''}`}
            onClick={() => onSelectView('database')}
          >
            <span>Base de Datos</span>
          </button>
        </nav>

        <div className="header-actions">
          {activeView === 'deck' ? (
            <span className="slide-counter-pill">
              {String(currentSlide + 1).padStart(2, '0')} / {totalSlides}
            </span>
          ) : null}
          <button
            type="button"
            className={`hdr-btn ${showSpeakers ? 'active-toggle' : ''}`}
            onClick={onToggleSpeakers}
            title="Mostrar/ocultar oradores (Atajo: O)"
          >
            <span>Oradores</span>
          </button>
          <button
            type="button"
            className="hdr-btn"
            onClick={onToggleFullscreen}
            title="Pantalla Completa (Atajo: F)"
          >
            <span>&#x26F6; Pantalla Completa</span>
          </button>
        </div>
      </header>
    </>
  );
});

export default Header;
