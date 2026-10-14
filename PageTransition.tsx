import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  pageKey,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={`w-full ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1], // fluid cubic-bezier deceleration
      }}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
