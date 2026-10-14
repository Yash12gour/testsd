import React, { useRef } from 'react';
import { getStackConfig } from './stackConstants';

interface StackCardProps {
  children: React.ReactNode;
  index: number;
  total: number;
}

export const StackCard: React.FC<StackCardProps> = ({ children, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const config = getStackConfig();
  const initialTop = config.baseTop + Math.min(index, config.maxStrips) * config.step;
  const radiusVal = `${config.radius}px`;

  return (
    <div
      ref={cardRef}
      data-stack-index={index}
      className="stack-card transition-none"
      style={{
        position: 'sticky',
        top: `${initialTop}px`,
        zIndex: index + 1,
        width: '100%',
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: radiusVal,
        boxShadow: '0 -10px 30px rgba(31, 32, 34, 0.08), 0 1px 2px rgba(31, 32, 34, 0.04)',
        overflow: 'clip',
        marginBottom: '24px',
        contain: 'paint',
        ['--notch-bg' as string]: 'var(--color-white)',
        ['--sticky-top' as string]: `${initialTop}px`,
      }}
    >
      <div
        ref={innerRef}
        className="stack-card-inner"
        style={{
          paddingTop: '28px',
          paddingBottom: '56px',
        }}
      >
        {children}
      </div>
    </div>
  );
};


