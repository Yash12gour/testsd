import React, { useState, useEffect, useRef, useMemo } from 'react';

export interface CountUpNumberProps {
  value: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  delay = 0,
  duration = 1600,
  className = '',
}) => {
  const parsed = useMemo(() => {
    const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) {
      return { prefix: '', targetNum: 0, suffix: value, hasDecimals: false, decimalPlaces: 0 };
    }
    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const targetNum = parseFloat(numStr);
    const suffix = match[3];
    const decimalMatch = numStr.match(/\.(\d+)/);
    const decimalPlaces = decimalMatch ? decimalMatch[1].length : 0;
    return {
      prefix,
      targetNum: isNaN(targetNum) ? 0 : targetNum,
      suffix,
      hasDecimals: decimalPlaces > 0,
      decimalPlaces,
    };
  }, [value]);

  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (parsed.targetNum === 0) return value;
    return `${parsed.prefix}0${parsed.suffix}`;
  });
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplayValue(value);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    let rafId: number;
    let timeoutId: number;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          observer.disconnect();

          timeoutId = window.setTimeout(() => {
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Smooth ease-out cubic curve: quick start, smooth settle
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentNum = easeOut * parsed.targetNum;

              if (progress < 1) {
                const formattedNum = parsed.hasDecimals
                  ? currentNum.toFixed(parsed.decimalPlaces)
                  : Math.round(currentNum).toString();
                setDisplayValue(`${parsed.prefix}${formattedNum}${parsed.suffix}`);
                rafId = requestAnimationFrame(animate);
              } else {
                setDisplayValue(value);
              }
            };

            rafId = requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [value, delay, duration, parsed]);

  return (
    <span ref={containerRef} className={`tabular-nums ${className}`.trim()}>
      {displayValue}
    </span>
  );
};
