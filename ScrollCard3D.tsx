import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export interface ScrollCard3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  index?: number;
  total?: number;
  perspective?: number;
  rotateXIntensity?: number;
  rotateYIntensity?: number;
  className?: string;
  depth?: number;
}

export const ScrollCard3D: React.FC<ScrollCard3DProps> = ({
  children,
  index = 0,
  total = 3,
  perspective = 1000,
  rotateXIntensity = 2.5,
  rotateYIntensity = 2.0,
  className = '',
  depth = 10,
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isInView, setIsInView] = React.useState(true);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '80px 0px 80px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const springConfig = {
    damping: 24,
    stiffness: 110,
    mass: 0.4,
  };

  // Compute horizontal curve tilt based on index position relative to center
  const normalizedIndex = total > 1 ? (index - (total - 1) / 2) / ((total - 1) / 2 || 1) : 0;
  const initialRotateY = -normalizedIndex * rotateYIntensity;

  const rawRotateX = useTransform(scrollYProgress, [0, 0.45, 1], [`${rotateXIntensity}deg`, '0deg', `-${rotateXIntensity * 0.7}deg`]);
  const rawRotateY = useTransform(scrollYProgress, [0, 0.45, 1], [`${initialRotateY}deg`, '0deg', `${initialRotateY * 0.5}deg`]);
  const rawScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.97, 1, 0.985]);
  const rawY = useTransform(scrollYProgress, [0, 0.45, 1], [25, 0, -20]);
  const rawZ = useTransform(scrollYProgress, [0, 0.45, 1], [-depth, 0, -depth * 0.5]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.88, 1, 1, 0.9]);

  const springRotateX = useSpring(rawRotateX, springConfig);
  const springRotateY = useSpring(rawRotateY, springConfig);
  const springScale = useSpring(rawScale, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springZ = useSpring(rawZ, springConfig);
  const springOpacity = useSpring(rawOpacity, springConfig);

  const motionStyle = prefersReduced || !isInView
    ? { ...style }
    : {
        ...style,
        rotateX: springRotateX,
        rotateY: springRotateY,
        scale: springScale,
        y: springY,
        z: springZ,
        opacity: springOpacity,
        transformPerspective: perspective,
        transformStyle: 'preserve-3d' as const,
        willChange: 'transform, opacity',
      };

  return (
    <div
      ref={ref}
      style={{ perspective: `${perspective}px` }}
      className={`relative ${className}`}
      {...props}
    >
      <motion.div style={motionStyle} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
};
