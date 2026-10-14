import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export interface Scroll3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  preset?: 'section' | 'hero' | 'card' | 'image' | 'layer' | 'subtle';
  perspective?: number;
  intensity?: 'subtle' | 'medium' | 'gentle';
  rotateXRange?: [number, number, number]; // [entry, center, exit] in degrees
  rotateYRange?: [number, number, number];
  translateZRange?: [number, number, number]; // [entry, center, exit] in px
  scaleRange?: [number, number, number];
  yRange?: [number, number, number];
  opacityRange?: [number, number, number];
  className?: string;
  depth?: number;
}

export const Scroll3D: React.FC<Scroll3DProps> = ({
  children,
  preset = 'section',
  perspective = 1200,
  intensity = 'subtle',
  rotateXRange,
  rotateYRange,
  translateZRange,
  scaleRange,
  yRange,
  opacityRange,
  className = '',
  depth = 0,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isInView, setIsInView] = React.useState(true);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track scroll progress of this container across viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: preset === 'hero' ? ['start start', 'end start'] : ['start end', 'end start'],
  });

  // Spring physics configuration for buttery-smooth motion settling
  const springConfig = {
    damping: 28,
    stiffness: 110,
    mass: 0.45,
    restDelta: 0.001,
  };

  // Sensitivity multiplier based on intensity
  const mult = intensity === 'gentle' ? 0.6 : intensity === 'medium' ? 1.4 : 1.0;

  let rx = rotateXRange;
  let ry = rotateYRange;
  let tz = translateZRange;
  let sc = scaleRange;
  let yr = yRange;
  let op = opacityRange;

  if (preset === 'hero') {
    rx = rx || [0, 1.2 * mult, 2.5 * mult];
    tz = tz || [0, -10 * mult, -30 * mult];
    sc = sc || [1, 0.99, 0.97];
    yr = yr || [0, 20 * mult, 50 * mult];
    op = op || [1, 0.96, 0.88];
  } else if (preset === 'card') {
    rx = rx || [3 * mult, 0, -2 * mult];
    tz = tz || [-20 * mult, 0, -15 * mult];
    sc = sc || [0.97, 1, 0.98];
    yr = yr || [30 * mult, 0, -25 * mult];
    op = op || [0.85, 1, 0.9];
  } else if (preset === 'image') {
    rx = rx || [2.5 * mult, 0, -2 * mult];
    tz = tz || [-15 * mult, 10 * mult, -10 * mult];
    sc = sc || [0.98, 1.015, 1.0];
    yr = yr || [35 * mult, 0, -35 * mult];
    op = op || [0.9, 1, 0.92];
  } else if (preset === 'layer') {
    const layerFactor = depth !== 0 ? depth : 0.1;
    rx = rx || [1.5 * mult * layerFactor, 0, -1.5 * mult * layerFactor];
    tz = tz || [-30 * layerFactor * mult, 0, 20 * layerFactor * mult];
    sc = sc || [1 - 0.02 * layerFactor, 1, 1 + 0.02 * layerFactor];
    yr = yr || [50 * layerFactor * mult, 0, -50 * layerFactor * mult];
    op = op || [0.92, 1, 0.95];
  } else if (preset === 'subtle') {
    rx = rx || [1.0 * mult, 0, -0.8 * mult];
    tz = tz || [-10 * mult, 0, -8 * mult];
    sc = sc || [0.992, 1, 0.992];
    yr = yr || [12 * mult, 0, -12 * mult];
    op = op || [0.96, 1, 0.96];
  } else {
    // Default 'section' preset: subtle, organic 3D rotation and translateZ depth
    rx = rx || [2.0 * mult, 0, -1.6 * mult];
    tz = tz || [-25 * mult, 0, -15 * mult];
    sc = sc || [0.98, 1, 0.985];
    yr = yr || [20 * mult, 0, -20 * mult];
    op = op || [0.92, 1, 0.94];
  }

  // Raw MotionValues from scroll progress
  const rawRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [`${rx[0]}deg`, `${rx[1]}deg`, `${rx[2]}deg`]
  );
  const rawRotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ry ? [`${ry[0]}deg`, `${ry[1]}deg`, `${ry[2]}deg`] : ['0deg', '0deg', '0deg']
  );
  const rawTranslateZ = useTransform(scrollYProgress, [0, 0.5, 1], tz);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], sc);
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], yr);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.5, 1], op);

  // Apply springs for natural settling and momentum
  const springRotateX = useSpring(rawRotateX, springConfig);
  const springRotateY = useSpring(rawRotateY, springConfig);
  const springTranslateZ = useSpring(rawTranslateZ, springConfig);
  const springScale = useSpring(rawScale, springConfig);
  const springY = useSpring(rawY, springConfig);
  const springOpacity = useSpring(rawOpacity, springConfig);

  // When prefers-reduced-motion is active or element is off-screen, disable 3D transformations
  const motionStyle = prefersReduced || !isInView
    ? { ...style }
    : {
        ...style,
        rotateX: springRotateX,
        rotateY: ry ? springRotateY : undefined,
        z: springTranslateZ,
        scale: springScale,
        y: springY,
        opacity: springOpacity,
        transformPerspective: perspective,
        transformStyle: 'preserve-3d' as const,
        willChange: 'transform, opacity',
      };

  return (
    <div
      ref={containerRef}
      style={{ perspective: `${perspective}px` }}
      className={`relative ${className}`}
      {...props}
    >
      <motion.div style={motionStyle} className="w-full">
        {children}
      </motion.div>
    </div>
  );
};

export default Scroll3D;
