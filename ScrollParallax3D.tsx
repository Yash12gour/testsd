import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';

export interface ScrollParallax3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: number; // e.g. -0.2 (slower) to +0.2 (faster)
  depth?: number; // e.g. -40 to 40 px translateZ
  rotateXAmount?: number;
  rotateYAmount?: number;
  className?: string;
}

export const ScrollParallax3D: React.FC<ScrollParallax3DProps> = ({
  children,
  speed = 0.1,
  depth = 0,
  rotateXAmount = 1.5,
  rotateYAmount = 0,
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const springConfig = {
    damping: 26,
    stiffness: 110,
    mass: 0.45,
  };

  const yTravel = speed * 250;
  const rawY = useTransform(scrollYProgress, [0, 1], [yTravel, -yTravel]);
  const rawZ = useTransform(scrollYProgress, [0, 0.5, 1], [-depth, depth * 0.2, depth]);
  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [`${rotateXAmount}deg`, '0deg', `-${rotateXAmount}deg`]);
  const rawRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [`${rotateYAmount}deg`, '0deg', `-${rotateYAmount}deg`]);

  const springY = useSpring(rawY, springConfig);
  const springZ = useSpring(rawZ, springConfig);
  const springRotateX = useSpring(rawRotateX, springConfig);
  const springRotateY = useSpring(rawRotateY, springConfig);

  const motionStyle = prefersReduced || !isInView
    ? { ...style }
    : {
        ...style,
        y: springY,
        z: springZ,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d' as const,
        willChange: 'transform',
      };

  return (
    <div ref={ref} className={`relative ${className}`} {...props}>
      <motion.div style={motionStyle} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};
