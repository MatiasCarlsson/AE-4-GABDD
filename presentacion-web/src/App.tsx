import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import Header, { type AppView } from './components/Header';
import PresentationDeck from './components/PresentationDeck';
import ViewErrorBoundary from './components/ViewErrorBoundary';

const DashboardView = lazy(() => import('./components/DashboardView'));
const DatabaseView = lazy(() => import('./components/DatabaseView'));

const TOTAL_SLIDES = 18;

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('deck');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSpeakers, setShowSpeakers] = useState(true);
  const [selectedDbTable, setSelectedDbTable] = useState('fact_locales_consumo');

  const goToSlide = useCallback((index: number, instant = false) => {
    const slides = document.querySelectorAll<HTMLElement>('.deck-slide');
    const targetIdx = Math.max(0, Math.min(index, slides.length - 1));
    setCurrentSlide(targetIdx);
    const el = slides[targetIdx];
    if (el) {
      const top = targetIdx === 0 ? 0 : Math.max(0, el.offsetTop - 68);
      window.scrollTo({ top, behavior: instant ? 'instant' : 'smooth' });
    }
  }, []);

  const handleSelectView = useCallback((view: AppView) => {
    setActiveView(view);
    if (view !== 'deck') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'view=dashboard') {
      setActiveView('dashboard');
    } else if (hash === 'view=database') {
      setActiveView('database');
    } else if (hash.startsWith('slide=')) {
      const n = parseInt(hash.split('=')[1] ?? '', 10);
      if (!Number.isNaN(n)) {
        requestAnimationFrame(() => goToSlide(n - 1, true));
      }
    }
  }, [goToSlide]);

  useEffect(() => {
    if (activeView !== 'deck') return;
    const slides = document.querySelectorAll<HTMLElement>('.deck-slide');
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-slide-index'));
            if (!Number.isNaN(idx)) setCurrentSlide(idx);
          }
        }
      },
      { rootMargin: '-32% 0px -46% 0px', threshold: 0.01 }
    );
    slides.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [activeView]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'select' || tag === 'textarea') return;

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        handleToggleFullscreen();
        return;
      }
      if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        setShowSpeakers((prev) => !prev);
        return;
      }

      if (activeView === 'deck') {
        if (['ArrowDown', 'PageDown', 'ArrowRight', ' '].includes(e.key)) {
          e.preventDefault();
          goToSlide(currentSlide + 1);
        } else if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(e.key)) {
          e.preventDefault();
          goToSlide(currentSlide - 1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          goToSlide(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          goToSlide(TOTAL_SLIDES - 1);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeView, currentSlide, goToSlide, handleToggleFullscreen]);

  return (
    <>
      <Header
        activeView={activeView}
        onSelectView={handleSelectView}
        currentSlide={currentSlide}
        totalSlides={TOTAL_SLIDES}
        showSpeakers={showSpeakers}
        onToggleSpeakers={() => setShowSpeakers((s) => !s)}
        onToggleFullscreen={handleToggleFullscreen}
        onGoToSlide={(idx) => goToSlide(idx)}
      />

      {activeView === 'deck' ? (
        <PresentationDeck
          currentSlide={currentSlide}
          showSpeakers={showSpeakers}
          onSelectView={handleSelectView}
          onGoToSlide={(idx) => goToSlide(idx)}
          onSelectDbTable={setSelectedDbTable}
        />
      ) : null}

      {activeView === 'dashboard' ? (
        <ViewErrorBoundary fallbackTitle="Error al cargar el Dashboard interactivo">
          <Suspense fallback={<div className="page-shell">Cargando Dashboard...</div>}>
            <DashboardView onBackToDeck={() => handleSelectView('deck')} />
          </Suspense>
        </ViewErrorBoundary>
      ) : null}

      {activeView === 'database' ? (
        <ViewErrorBoundary fallbackTitle="Error al cargar la Base de Datos y Diagramas">
          <Suspense fallback={<div className="page-shell">Cargando Base de Datos y Diagramas...</div>}>
            <DatabaseView
              selectedTable={selectedDbTable}
              onSelectTable={setSelectedDbTable}
              onGoToDashboard={() => handleSelectView('dashboard')}
              onBackToDeck={() => handleSelectView('deck')}
            />
          </Suspense>
        </ViewErrorBoundary>
      ) : null}
    </>
  );
}
