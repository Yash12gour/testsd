import React, { useRef, useEffect } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMotion';

export const ScrollProgressIndicator: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    let rafId: number | null = null;

    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && barRef.current) {
        const p = Math.min(1, Math.max(0, window.scrollY / docHeight));
        barRef.current.style.transform = `scaleX(${p})`;
      }
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none origin-left bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-primary)] to-[var(--color-gold)] will-change-transform"
        style={{
          transform: 'scaleX(0)',
          transformOrigin: '0% 50%',
        }}
      />
    </div>
  );
};

