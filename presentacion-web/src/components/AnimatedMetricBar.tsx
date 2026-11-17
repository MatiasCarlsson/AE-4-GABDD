import { memo } from 'react';

interface AnimatedMetricBarProps {
  label: string;
  valueLabel: string;
  ratio: number; // 0 a 1
  accent?: 'violet' | 'teal' | 'rose' | 'indigo';
  active: boolean;
  subtext?: string;
}

const ACCENT_GRADIENTS: Record<NonNullable<AnimatedMetricBarProps['accent']>, string> = {
  violet: 'linear-gradient(90deg, #7C3AED 0%, #C4B5FD 100%)',
  teal: 'linear-gradient(90deg, #0D9488 0%, #5EEAD4 100%)',
  rose: 'linear-gradient(90deg, #E11D48 0%, #FDA4AF 100%)',
  indigo: 'linear-gradient(90deg, #4F46E5 0%, #A5B4FC 100%)',
};

/** Barra de métrica acelerada por GPU (transform: scaleX) con transición suave al entrar en escena */
const AnimatedMetricBar = memo(function AnimatedMetricBar({
  label,
  valueLabel,
  ratio,
  accent = 'violet',
  active,
  subtext,
}: AnimatedMetricBarProps) {
  const clamped = Math.max(0, Math.min(1, ratio));

  return (
    <div className="metric-bar-item">
      <div className="metric-bar-head">
        <span className="metric-bar-label">{label}</span>
        <span className="metric-bar-val">{valueLabel}</span>
      </div>
      <div className="metric-bar-track" role="progressbar" aria-valuenow={Math.round(clamped * 100)} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="metric-bar-fill"
          style={{
            background: ACCENT_GRADIENTS[accent],
            transform: `scaleX(${active ? clamped : 0.04})`,
          }}
        />
      </div>
      {subtext ? <div className="metric-bar-sub">{subtext}</div> : null}
    </div>
  );
});

export default AnimatedMetricBar;
