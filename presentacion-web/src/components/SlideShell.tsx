import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SlideShellProps {
  index: number;
  currentSlide: number;
  etapa: string;
  speaker?: string;
  showSpeakers: boolean;
  hero?: boolean;
  title?: ReactNode;
  lead?: ReactNode;
  toolbarRight?: ReactNode;
  centered?: boolean;
  children: ReactNode;
}

export default function SlideShell({
  index,
  currentSlide,
  etapa,
  speaker,
  showSpeakers,
  hero = false,
  title,
  lead,
  toolbarRight,
  centered = false,
  children,
}: SlideShellProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const meta = el.querySelector('.slide-meta-row');
      const heading = el.querySelector('.slide-title');
      const leadEl = el.querySelector('.slide-lead');
      const cards = el.querySelectorAll('.ed-panel, .ed-table-wrap, .cols-4 > div, .cols-5 > div');
      const listItems = el.querySelectorAll('.clean-list li');
      const tableRows = el.querySelectorAll('.ed-table tbody tr');

      const tl = gsap.timeline({
        paused: index !== 0,
      });

      if (meta) {
        tl.from(meta, { x: -20, opacity: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform,opacity' }, 0);
      }
      if (heading) {
        tl.from(
          heading,
          { y: 24, opacity: 0, duration: 0.52, ease: 'power4.out', clearProps: 'transform,opacity' },
          0.05
        );
      }
      if (leadEl) {
        tl.from(
          leadEl,
          { y: 16, opacity: 0, duration: 0.44, ease: 'power3.out', clearProps: 'transform,opacity' },
          0.11
        );
      }
      if (cards.length > 0) {
        tl.from(
          cards,
          {
            y: 22,
            scale: 0.975,
            opacity: 0,
            duration: 0.48,
            stagger: 0.065,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
          0.16
        );
      }
      if (listItems.length > 0) {
        tl.from(
          listItems,
          {
            x: -12,
            opacity: 0,
            duration: 0.34,
            stagger: 0.04,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          },
          0.26
        );
      }
      if (tableRows.length > 0) {
        tl.from(
          tableRows,
          {
            y: 10,
            opacity: 0,
            duration: 0.32,
            stagger: 0.035,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          },
          0.24
        );
      }

      timelineRef.current = tl;

      if (index !== 0) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => tl.play(),
        });
      }
    }, sectionRef);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, [index]);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (currentSlide === index && tl.progress() === 0) {
      tl.play();
    } else if (currentSlide > index && tl.progress() < 1) {
      tl.progress(1);
    }
  }, [currentSlide, index]);

  const slideClass = `deck-slide ${hero ? 'slide-hero' : ''} ${
    currentSlide === index ? 'slide-active' : ''
  }`.trim();

  return (
    <section ref={sectionRef} className={slideClass} data-slide-index={index}>
      <div
        className="slide-inner"
        style={centered ? { textAlign: 'center', alignItems: 'center' } : undefined}
      >
        <div className="slide-meta-row" style={centered ? { width: '100%' } : undefined}>
          <span className="etapa-tag">{etapa}</span>
          {showSpeakers && speaker ? <span className="speaker-pill">{speaker}</span> : null}
        </div>

        {title ? (
          <div
            className={toolbarRight ? 'mini-toolbar slide-head-divider' : 'slide-head-divider'}
            style={{ width: centered ? '100%' : undefined }}
          >
            <div>
              <h2 className="slide-title">{title}</h2>
              {lead ? <p className="slide-lead">{lead}</p> : null}
            </div>
            {toolbarRight}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
