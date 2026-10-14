import React, { useRef, useState, useEffect, createContext, useContext } from 'react';

interface ScrollRevealContextType {
  inView: boolean;
  baseDelay: number;
  staggerStep: number;
}

const ScrollRevealContext = createContext<ScrollRevealContextType>({
  inView: false,
  baseDelay: 0,
  staggerStep: 80,
});

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  delay?: number; // ms
  duration?: number; // ms
  offset?: number; // px vertical translation, default 20
  threshold?: number; // intersection threshold, default 0.1
  rootMargin?: string;
  className?: string;
  stagger?: number; // ms delay increment for nested items
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  as: Component = 'div',
  delay = 0,
  duration = 600,
  offset = 20,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  className = '',
  stagger = 80,
  once = true,
  style,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    if (mediaQuery.matches) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  const dynamicStyle: React.CSSProperties = prefersReduced
    ? { ...style, opacity: 1, transform: 'none' }
    : {
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : `translate3d(0, ${offset}px, 0)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: inView ? 'auto' : 'opacity, transform',
      };

  return (
    <ScrollRevealContext.Provider value={{ inView, baseDelay: delay, staggerStep: stagger }}>
      <Component
        ref={ref}
        className={`${className} ${inView ? 'scroll-revealed' : ''}`}
        style={dynamicStyle}
        {...rest}
      >
        {children}
      </Component>
    </ScrollRevealContext.Provider>
  );
};

export interface ScrollRevealItemProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  index?: number;
  delay?: number;
  duration?: number;
  offset?: number;
  className?: string;
}

export const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  children,
  as: Component = 'div',
  index = 0,
  delay,
  duration = 600,
  offset = 20,
  className = '',
  style,
  ...rest
}) => {
  const { inView, baseDelay, staggerStep } = useContext(ScrollRevealContext);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
  }, []);

  const calculatedDelay = delay !== undefined ? delay : baseDelay + index * staggerStep;

  const dynamicStyle: React.CSSProperties = prefersReduced
    ? { ...style, opacity: 1, transform: 'none' }
    : {
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0)' : `translate3d(0, ${offset}px, 0)`,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${calculatedDelay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${calculatedDelay}ms`,
        willChange: inView ? 'auto' : 'opacity, transform',
      };

  return (
    <Component className={className} style={dynamicStyle} {...rest}>
      {children}
    </Component>
  );
};
