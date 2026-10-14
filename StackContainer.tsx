import React, { useEffect, useRef } from 'react';
import { getStackConfig } from './stackConstants';

interface StackContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const StackContainer: React.FC<StackContainerProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cards = Array.from(container.querySelectorAll<HTMLElement>('.stack-card'));
    if (cards.length === 0) return;

    let resizeRafId: number | null = null;
    let scrollRafId: number | null = null;
    let intersectionRafId: number | null = null;

    // Cache of current applied tops and static flags to avoid unnecessary DOM writes
    const cardState = new Map<HTMLElement, { top: number; isStatic: boolean }>();

    const calculateLayout = () => {
      const vh = window.innerHeight;
      const config = getStackConfig();
      const prefersReduced =
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // READ PHASE: Read all card heights in a single batch without mutating styles
      const measurements = cards.map((card, idx) => {
        const height = card.offsetHeight;
        return { card, idx, height };
      });

      // WRITE PHASE: Apply calculated sticky top and positioning in batch
      measurements.forEach(({ card, idx, height }) => {
        const isStatic = prefersReduced || height > config.tallThreshold * vh;
        const calculatedTop = config.baseTop + Math.min(idx, config.maxStrips) * config.step;
        const finalTop = Math.max(0, Math.min(calculatedTop, vh - height));

        const prev = cardState.get(card);
        if (!prev || prev.top !== finalTop || prev.isStatic !== isStatic) {
          cardState.set(card, {
            top: finalTop,
            isStatic,
          });

          card.style.position = isStatic ? 'static' : 'sticky';
          card.style.setProperty('--sticky-top', `${finalTop}px`);
          if (!isStatic) {
            card.style.top = `${finalTop}px`;
          } else {
            card.style.top = 'auto';
          }
        }
      });
    };

    const scheduleLayoutCalculation = () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        calculateLayout();
        resizeRafId = null;
      });
    };

    // 1. Unified ResizeObserver on all cards and container using requestAnimationFrame
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        scheduleLayoutCalculation();
      });

      cards.forEach((card) => resizeObserver?.observe(card));
      resizeObserver.observe(container);
    }

    // 2. IntersectionObserver for managing inert on cards covered by subsequent sticky cards
    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserver = new IntersectionObserver(
        () => {
          if (intersectionRafId !== null) cancelAnimationFrame(intersectionRafId);
          intersectionRafId = requestAnimationFrame(() => {
            // Read phase: check overlap between adjacent cards
            for (let i = 0; i < cards.length - 1; i++) {
              const currentCard = cards[i];
              const nextCard = cards[i + 1];
              const inner = currentCard.querySelector<HTMLElement>('.stack-card-inner');
              if (inner && nextCard) {
                const currentRect = currentCard.getBoundingClientRect();
                const nextRect = nextCard.getBoundingClientRect();
                const isCovered = nextRect.top <= currentRect.top + 80 && nextRect.bottom > 0;
                const wasInert = inner.hasAttribute('inert');
                if (isCovered !== wasInert) {
                  if (isCovered) {
                    inner.setAttribute('inert', '');
                  } else {
                    inner.removeAttribute('inert');
                  }
                }
              }
            }
            intersectionRafId = null;
          });
        },
        {
          root: null,
          threshold: [0, 0.25, 0.5, 0.75, 1.0],
        }
      );

      cards.forEach((card) => intersectionObserver?.observe(card));
    }

    // 3. Debounced/throttled scroll listener scheduled via requestAnimationFrame for inert updates
    let lastScrollTime = 0;
    const handleScroll = () => {
      const now = performance.now();
      // Throttle inert checking to at most once per 100ms during active scrolling
      if (now - lastScrollTime < 100) return;
      if (scrollRafId !== null) return;

      scrollRafId = requestAnimationFrame(() => {
        lastScrollTime = performance.now();
        for (let i = 0; i < cards.length - 1; i++) {
          const currentCard = cards[i];
          const nextCard = cards[i + 1];
          const inner = currentCard.querySelector<HTMLElement>('.stack-card-inner');
          if (inner && nextCard) {
            const currentRect = currentCard.getBoundingClientRect();
            const nextRect = nextCard.getBoundingClientRect();
            const isCovered = nextRect.top <= currentRect.top + 80 && nextRect.bottom > 0;
            const wasInert = inner.hasAttribute('inert');
            if (isCovered !== wasInert) {
              if (isCovered) {
                inner.setAttribute('inert', '');
              } else {
                inner.removeAttribute('inert');
              }
            }
          }
        }
        scrollRafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', scheduleLayoutCalculation, { passive: true });
    window.addEventListener('orientationchange', scheduleLayoutCalculation, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', scheduleLayoutCalculation, { passive: true });
    }

    // Initial calculation in next frame
    scheduleLayoutCalculation();

    return () => {
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
      if (intersectionRafId !== null) cancelAnimationFrame(intersectionRafId);

      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', scheduleLayoutCalculation);
      window.removeEventListener('orientationchange', scheduleLayoutCalculation);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', scheduleLayoutCalculation);
      }
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative bg-[var(--color-bg)] pb-6 overflow-x-clip ${className}`}
      style={{
        paddingInline: 'clamp(12px, 2vw, 24px)',
        isolation: 'isolate',
      }}
    >
      {children}
    </div>
  );
};
