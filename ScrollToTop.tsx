import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const nextVisible = scrollY > 500;
          setIsVisible((prev) => (prev !== nextVisible ? nextVisible : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{
            duration: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed bottom-6 right-6 z-40 p-3 sm:p-3.5 rounded-full bg-[var(--color-charcoal)] text-[var(--color-primary)] border border-[var(--color-border)]/20 shadow-lg hover:shadow-xl hover:bg-[var(--color-charcoal)] hover:scale-105 active:scale-95 cursor-pointer focus-ring transition-transform"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
