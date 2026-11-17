import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
}

export default class ViewErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // Error capturado limpiamente por el boundary de vista
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-shell">
          <div className="ed-panel" style={{ maxWidth: 640, margin: '40px auto', textAlign: 'center' }}>
            <span className="panel-kicker">Recuperación de Vista</span>
            <h2 className="panel-heading">{this.props.fallbackTitle ?? 'Ocurrió un error al renderizar esta vista'}</h2>
            <p className="panel-text">Podés reintentar cargar el componente sin perder tu avance en la presentación.</p>
            <button
              type="button"
              className="hdr-btn"
              style={{ background: 'var(--violet-600)', color: '#fff', border: 'none', alignSelf: 'center', padding: '10px 18px' }}
              onClick={() => this.setState({ hasError: false })}
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
