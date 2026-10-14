import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export interface ScrollDrawerSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stickyTopOffset?: number; // e.g., 64px or 80px
  zIndex?: number;
  isStackedUnder?: boolean; // If true, shrinks & pushes back into Z-space as the next section slides over it
  className?: string;
}

export const ScrollDrawerSection: React.FC<ScrollDrawerSectionProps> = ({
  children,
  stickyTopOffset = 80,
  zIndex = 10,
  isStackedUnder = false,
  className = '',
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Track progress of section relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = {
    damping: 28,
    stiffness: 110,
    mass: 0.45,
  };

  // Scroll transforms for the drawer effect
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    isStackedUnder ? [0.98, 1, 0.98, 0.94] : [0.96, 1, 1, 0.98]
  );

  const rawY = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    isStackedUnder ? [30, 0, -40] : [50, 0, 0]
  );

  const rawZ = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    isStackedUnder ? [-20, 0, -35, -60] : [-30, 0, 0, -15]
  );

  const rawRotateX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    isStackedUnder ? ['2deg', '0deg', '-1.5deg', '-3deg'] : ['2.5deg', '0deg', '0deg', '-1deg']
  );

  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    isStackedUnder ? [0.8, 1, 0.95, 0.8] : [0.85, 1, 1, 0.95]
  );

  const springScale = useSpring(rawScale, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springZ = useSpring(rawZ, springConfig);
  const springRotateX = useSpring(rawRotateX, springConfig);
  const springOpacity = useSpring(rawOpacity, springConfig);

  const motionStyle = prefersReduced
    ? { ...style }
    : {
        ...style,
        scale: springScale,
        y: springY,
        z: springZ,
        rotateX: springRotateX,
        opacity: springOpacity,
        transformStyle: 'preserve-3d' as const,
        willChange: 'transform, opacity',
      };

  return (
    <div
      ref={containerRef}
      style={{ zIndex, perspective: '1200px' }}
      className={`relative sticky top-[${stickyTopOffset}px] transition-shadow duration-300 ${className}`}
      {...props}
    >
      <motion.div style={motionStyle} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};
