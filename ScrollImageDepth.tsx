import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export interface ScrollImageDepthProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  perspective?: number;
  depth?: number;
  rotateAmount?: number;
  scaleRange?: [number, number, number];
  rotateXRange?: [number, number, number];
  rotateYRange?: [number, number, number];
  yRange?: [number, number, number];
  className?: string;
}

export const ScrollImageDepth: React.FC<ScrollImageDepthProps> = ({
  children,
  perspective = 1200,
  depth,
  rotateAmount,
  scaleRange = [1.03, 1, 0.99],
  rotateXRange,
  rotateYRange = [-1.5, 0, 1.2],
  yRange,
  className = '',
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

  const computedYRange = yRange || (depth ? [depth, 0, -depth] : [30, 0, -30]);
  const computedRotateXRange = rotateXRange || (rotateAmount ? [rotateAmount, 0, -rotateAmount] : [2, 0, -1.8]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const springConfig = {
    damping: 28,
    stiffness: 110,
    mass: 0.5,
  };

  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange);
  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [`${computedRotateXRange[0]}deg`, `${computedRotateXRange[1]}deg`, `${computedRotateXRange[2]}deg`]);
  const rawRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [`${rotateYRange[0]}deg`, `${rotateYRange[1]}deg`, `${rotateYRange[2]}deg`]);
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], computedYRange);

  const springScale = useSpring(rawScale, springConfig);
  const springRotateX = useSpring(rawRotateX, springConfig);
  const springRotateY = useSpring(rawRotateY, springConfig);
  const springY = useSpring(rawY, springConfig);

  const motionStyle = prefersReduced || !isInView
    ? { ...style }
    : {
        ...style,
        scale: springScale,
        rotateX: springRotateX,
        rotateY: springRotateY,
        y: springY,
        transformPerspective: perspective,
        transformStyle: 'preserve-3d' as const,
        willChange: 'transform',
      };

  return (
    <div
      ref={ref}
      style={{ perspective: `${perspective}px` }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <motion.div style={motionStyle} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};
