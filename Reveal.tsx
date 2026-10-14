import React, { useRef, useState, useEffect } from 'react';

export type RevealVariant =
  | 'up'
  | 'down'
  | 'fade'
  | 'scale'
  | 'slide-right'
  | 'slide-left'
  | 'blur'
  | 'mask-up';

export interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  variant?: RevealVariant;
  type?: string; // alias for variant
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  as: Component = 'div',
  variant,
  type,
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.12,
  once = true,
  style,
  ...rest
}) => {
  const selectedVariant = (variant || (type as RevealVariant) || 'up') as RevealVariant;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getInitialTransform = () => {
    switch (selectedVariant) {
      case 'up':
        return 'translate3d(0, 28px, 0)';
      case 'down':
        return 'translate3d(0, -28px, 0)';
      case 'scale':
        return 'scale(0.95) translate3d(0, 20px, 0)';
      case 'slide-right':
        return 'translate3d(-30px, 0, 0)';
      case 'slide-left':
        return 'translate3d(30px, 0, 0)';
      case 'mask-up':
        return 'translate3d(0, 36px, 0)';
      case 'blur':
        return 'translate3d(0, 16px, 0)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const getInitialFilter = () => {
    if (selectedVariant === 'blur') {
      return 'blur(8px)';
    }
    return undefined;
  };

  const dynamicStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    filter: isVisible ? 'blur(0px)' : getInitialFilter(),
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform, filter',
  };

  return (
    <Component ref={ref} className={className} style={dynamicStyle} {...rest}>
      {children}
    </Component>
  );
};

/**
 * Stagger Container component for auto-delaying child elements on scroll
 */
export interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerDelay?: number; // ms between each child
  initialDelay?: number; // ms before first child
  variant?: RevealVariant;
  duration?: number;
  className?: string;
}

export const StaggerReveal: React.FC<StaggerProps> = ({
  children,
  staggerDelay = 90,
  initialDelay = 0,
  variant = 'up',
  duration = 650,
  className = '',
  ...props
}) => {
  const count = React.Children.count(children);

  return (
    <div className={className} {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        const delay = initialDelay + index * staggerDelay;
        return (
          <Reveal
            variant={variant}
            delay={delay}
            duration={duration}
            className="w-full h-full"
          >
            {child}
          </Reveal>
        );
      })}
    </div>
  );
};
