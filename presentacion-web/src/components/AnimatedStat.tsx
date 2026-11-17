import { useEffect, useState } from 'react';

interface AnimatedStatProps {
  target: number;
  decimals?: number;
  suffix?: string;
  active: boolean;
  durationMs?: number;
}

export default function AnimatedStat({
  target,
  decimals = 0,
  suffix = '',
  active,
  durationMs = 700,
}: AnimatedStatProps) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [active, target, durationMs]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals).replace('.', ',')
      : Math.round(value).toLocaleString('es-AR');

  return (
    <>
      {formatted}
      {suffix}
    </>
  );
}
