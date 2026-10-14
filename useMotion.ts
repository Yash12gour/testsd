import { useState, useEffect, useRef } from 'react';

/**
 * Global Motion hook respecting prefers-reduced-motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Reusable IntersectionObserver hook for scroll reveals
 */
export function useInView(options: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) {
  const [inView, setInView] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, options.threshold, options.rootMargin]);

  return [setElement, inView] as const;
}

/**
 * Hook to track scroll progress (0 to 1) for a specific element or whole page
 */
export function useScrollProgress(ref?: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    let rafId: number | null = null;

    const calculateProgress = () => {
      if (ref && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalHeight = rect.height + windowHeight;
        const current = windowHeight - rect.top;
        const p = Math.min(1, Math.max(0, current / totalHeight));
        setProgress(p);
      } else {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const p = Math.min(1, Math.max(0, window.scrollY / docHeight));
          setProgress(p);
        }
      }
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(calculateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [ref]);

  return progress;
}

/**
 * Hook for smooth transform parallax with lerp
 */
export function useParallax(speed = 0.1, maxOffset = 60) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOffset(0);
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!elementRef.current) {
          rafId = null;
          return;
        }

        const rect = elementRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const centerDelta = rect.top + rect.height / 2 - windowHeight / 2;
          const calculated = Math.max(-maxOffset, Math.min(maxOffset, centerDelta * speed));
          setOffset(calculated);
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
  }, [speed, maxOffset]);

  return { ref: elementRef, offset };
}
