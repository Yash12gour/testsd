import React, { useRef, useEffect } from 'react';

export interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number; // -0.2 to 0.2
  direction?: 'vertical' | 'horizontal';
  scaleRange?: [number, number]; // e.g. [0.98, 1.02]
  className?: string;
  maxOffset?: number;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.08,
  direction = 'vertical',
  scaleRange,
  className = '',
  maxOffset = 80,
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!ref.current) {
          rafId = null;
          return;
        }

        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate position relative to viewport center
        if (rect.top < windowHeight + 100 && rect.bottom > -100) {
          const distanceFromCenter = rect.top + rect.height / 2 - windowHeight / 2;
          const calculatedOffset = Math.max(-maxOffset, Math.min(maxOffset, distanceFromCenter * speed));

          let scaleVal = 1;
          if (scaleRange) {
            const progress = Math.min(1, Math.max(0, 1 - Math.abs(distanceFromCenter) / (windowHeight / 1.2)));
            scaleVal = scaleRange[0] + (scaleRange[1] - scaleRange[0]) * progress;
          }

          const transformStyle =
            direction === 'vertical'
              ? `translate3d(0, ${calculatedOffset.toFixed(2)}px, 0) scale(${scaleVal.toFixed(3)})`
              : `translate3d(${calculatedOffset.toFixed(2)}px, 0, 0) scale(${scaleVal.toFixed(3)})`;

          ref.current.style.transform = transformStyle;
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed, direction, scaleRange, maxOffset]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

