import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Tilt3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number; // max degrees, default 3.5
  scale?: number; // hover scale, default 1.01
  perspective?: number; // default 1000px
  className?: string;
  disabled?: boolean;
}

export const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  maxTilt = 3.5,
  scale = 1.01,
  perspective = 1000,
  className = '',
  disabled = false,
  style,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  const targetRotateX = useRef(0);
  const targetRotateY = useRef(0);
  const currentRotateX = useRef(0);
  const currentRotateY = useRef(0);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const updateMotion = useCallback(() => {
    if (!cardRef.current) return;

    // Smooth lerp (0.1) toward target angles
    currentRotateX.current += (targetRotateX.current - currentRotateX.current) * 0.12;
    currentRotateY.current += (targetRotateY.current - currentRotateY.current) * 0.12;

    const currentScale = isHovered ? scale : 1;
    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${currentRotateX.current.toFixed(2)}deg) rotateY(${currentRotateY.current.toFixed(2)}deg) scale3d(${currentScale}, ${currentScale}, 1)`;

    // Continue loop if still moving or hovered
    if (
      isHovered ||
      Math.abs(targetRotateX.current - currentRotateX.current) > 0.05 ||
      Math.abs(targetRotateY.current - currentRotateY.current) > 0.05
    ) {
      rafIdRef.current = requestAnimationFrame(updateMotion);
    } else {
      rafIdRef.current = null;
    }
  }, [isHovered, perspective, scale]);

  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const handleMouseEnter = () => {
    if (disabled || isTouchDevice) return;
    setIsHovered(true);
    if (cardRef.current) {
      const r = cardRef.current.getBoundingClientRect();
      rectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
    }
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(updateMotion);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouchDevice) return;

    if (!rectRef.current && cardRef.current) {
      const r = cardRef.current.getBoundingClientRect();
      rectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
    }

    const rect = rectRef.current;
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Invert X for natural tilt
    targetRotateX.current = ((y - centerY) / centerY) * -maxTilt;
    targetRotateY.current = ((x - centerX) / centerX) * maxTilt;

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(updateMotion);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetRotateX.current = 0;
    targetRotateY.current = 0;
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(updateMotion);
    }
  };

  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-shadow duration-300 ${className}`}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
        willChange: isHovered ? 'transform' : 'auto',
      }}
      {...props}
    >
      {children}
    </div>
  );
};
