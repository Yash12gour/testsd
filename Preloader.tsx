import React, { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

interface LetterConfig {
  char: string;
  initialX: number;
  initialY: number;
  initialRotate: number;
}

// Compact, crisp scattered offsets for direct rAF transforms
const LETTERS: LetterConfig[] = [
  { char: 'S', initialX: -90, initialY: 55, initialRotate: -12 },
  { char: 'P', initialX: -65, initialY: 35, initialRotate: 8 },
  { char: 'A', initialX: -35, initialY: 65, initialRotate: -8 },
  { char: 'C', initialX: 70, initialY: -50, initialRotate: 12 },
  { char: 'E', initialX: 95, initialY: -35, initialRotate: -9 },
  { char: 'D', initialX: -75, initialY: -45, initialRotate: 10 },
  { char: 'E', initialX: 25, initialY: 60, initialRotate: -6 },
  { char: 'S', initialX: 65, initialY: 45, initialRotate: 8 },
  { char: 'K', initialX: 105, initialY: 65, initialRotate: -12 },
];

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  // Direct DOM refs to avoid React re-renders or style churn
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const brandPillRef = useRef<HTMLDivElement>(null);

  const handleDismiss = () => {
    document.body.style.overflow = '';
    setIsDone(true);
    onComplete?.();
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        document.body.style.overflow = prevOverflow;
        setIsDone(true);
        onComplete?.();
      }, 50);
      return () => {
        document.body.style.overflow = prevOverflow;
        clearTimeout(timer);
      };
    }

    // Safety fallback for slow connections
    const timeoutTimer = setTimeout(() => {
      setHasTimedOut(true);
    }, 7000);

    // Ultra-optimized unified requestAnimationFrame timeline
    // 0ms -> 450ms: letters assemble + progress reaches 100%
    // 450ms -> 800ms: pause & tagline display
    // 800ms -> 1100ms: exit fade out
    // 1100ms: cleanup & unmount
    let rafId: number | null = null;
    let startTime: number | null = null;

    const DURATION_ASSEMBLE = 460; // ms
    const DURATION_HOLD = 340;     // ms (showing assembled wordmark & tagline)
    const DURATION_EXIT = 260;     // ms (fade out)
    const TOTAL_DURATION = DURATION_ASSEMBLE + DURATION_HOLD + DURATION_EXIT; // ~1060ms

    // Fast ease-out cubic helper
    const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
    const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x);

    const frame = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      // 1. Brand pill & progress counter
      const progressT = Math.min(1, elapsed / DURATION_ASSEMBLE);
      const easedProgress = easeOutCubic(progressT);
      const percent = Math.min(100, Math.round(easedProgress * 100));

      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${percent}%`;
      }

      if (brandPillRef.current) {
        const pillOpacity = Math.min(1, elapsed / 150);
        brandPillRef.current.style.opacity = `${pillOpacity}`;
      }

      // 2. Letters Assembly (driven frame-by-frame via rAF, zero CSS transition calculation)
      const letterCount = LETTERS.length;
      for (let i = 0; i < letterCount; i++) {
        const el = letterRefs.current[i];
        if (!el) continue;

        // Slight stagger per letter (20ms each)
        const letterDelay = i * 16;
        const letterDuration = 360;
        const letterElapsed = Math.max(0, elapsed - letterDelay);
        const t = Math.min(1, letterElapsed / letterDuration);
        const eased = easeOutCubic(t);

        const config = LETTERS[i];
        const curX = config.initialX * (1 - eased);
        const curY = config.initialY * (1 - eased);
        const curRotate = config.initialRotate * (1 - eased);

        // Hardware-accelerated transform only
        el.style.transform = `translate3d(${curX.toFixed(1)}px, ${curY.toFixed(1)}px, 0) rotate(${curRotate.toFixed(1)}deg)`;
      }

      // 3. Dot on first letter & Tagline reveal
      if (elapsed >= DURATION_ASSEMBLE) {
        if (dotRef.current) {
          dotRef.current.style.opacity = '1';
          dotRef.current.style.transform = 'scale(1)';
        }
        if (taglineRef.current) {
          const tagT = Math.min(1, (elapsed - DURATION_ASSEMBLE) / 200);
          taglineRef.current.style.opacity = `${tagT * 0.9}`;
          taglineRef.current.style.transform = `translate3d(0, ${(1 - tagT) * 6}px, 0)`;
        }
      }

      // 4. Card subtle scale
      if (cardRef.current) {
        if (elapsed < DURATION_ASSEMBLE) {
          const cardScale = 0.98 + (0.02 * easedProgress);
          cardRef.current.style.transform = `scale3d(${cardScale.toFixed(3)}, ${cardScale.toFixed(3)}, 1)`;
        } else if (elapsed > DURATION_ASSEMBLE + DURATION_HOLD) {
          // Exit zoom
          const exitT = Math.min(1, (elapsed - (DURATION_ASSEMBLE + DURATION_HOLD)) / DURATION_EXIT);
          const cardScale = 1 + (0.02 * easeOutQuad(exitT));
          cardRef.current.style.transform = `scale3d(${cardScale.toFixed(3)}, ${cardScale.toFixed(3)}, 1)`;
        }
      }

      // 5. Exit fade
      if (elapsed > DURATION_ASSEMBLE + DURATION_HOLD) {
        const exitElapsed = elapsed - (DURATION_ASSEMBLE + DURATION_HOLD);
        const exitProgress = Math.min(1, exitElapsed / DURATION_EXIT);
        if (containerRef.current) {
          containerRef.current.style.opacity = `${1 - exitProgress}`;
        }
      }

      if (elapsed < TOTAL_DURATION) {
        rafId = requestAnimationFrame(frame);
      } else {
        document.body.style.overflow = prevOverflow;
        setIsDone(true);
        onComplete?.();
      }
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      document.body.style.overflow = prevOverflow;
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(timeoutTimer);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Loading SpaceDesk"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg-warm)] font-[var(--font-sans)] select-none"
      style={{
        contain: 'strict',
        isolation: 'isolate',
      }}
    >
      {/* Top minimal brand pill */}
      <div
        ref={brandPillRef}
        style={{ opacity: 0 }}
        className="absolute top-6 left-6 sm:left-8 z-20 flex items-center gap-2 pointer-events-none"
      >
        <span className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
        <span className="font-heading text-xs uppercase tracking-widest text-[var(--color-charcoal)] font-semibold">
          SpaceDesk
        </span>
      </div>

      {/* Top right progress number */}
      {!hasTimedOut && (
        <div className="absolute top-6 right-6 sm:right-8 z-20 font-mono text-xs text-[var(--color-muted)] pointer-events-none">
          <span ref={progressTextRef}>0%</span>
        </div>
      )}

      {/* Central Morphing Card: pure rAF transform, zero CSS transition overhead */}
      <div
        ref={cardRef}
        style={{
          transform: 'scale3d(0.98, 0.98, 1)',
          willChange: 'transform',
        }}
        className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#1F2022] text-[var(--color-white)] border border-[var(--color-border)]/20 shadow-xl flex items-center justify-center w-[min(92vw,1320px)] h-[clamp(320px,68vh,680px)]"
      >
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#26282B] via-[#1E1F21] to-[#141517] pointer-events-none" />

        {/* Coworking Visual Texture without filters */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/images/hero-modern-coworking-office.jpg"
            alt=""
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2022] via-[#1F2022]/60 to-transparent" />
        </div>

        {/* Lightweight radial ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 229, 0, 0.08) 0%, transparent 60%)',
          }}
        />

        {/* Fallback Error State after timeout */}
        {hasTimedOut ? (
          <div className="relative z-20 text-center px-6 max-w-md mx-auto flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)] flex items-center justify-center mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-normal text-[var(--color-white)] mb-2">
              Taking longer than usual
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-on-dark)] mb-5 font-[var(--font-sans)] leading-relaxed">
              We are loading resources over your network. You can jump directly to the site.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDismiss}
                className="bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs px-5 py-2.5 rounded-full hover:opacity-95 active:scale-95 shadow transition-all cursor-pointer"
              >
                Continue to Site
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="border border-[var(--color-border)]/40 text-[var(--color-white)] text-xs px-4 py-2.5 rounded-full hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              >
                Reload Page
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Scattered / Assembling Typography Canvas */}
            <div className="relative z-10 flex items-center justify-center tracking-tight px-4 pointer-events-none">
              <div className="flex items-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-normal leading-none text-[var(--color-white)]">
                {LETTERS.map((item, index) => {
                  return (
                    <span
                      key={index}
                      ref={(el) => {
                        letterRefs.current[index] = el;
                      }}
                      style={{
                        display: 'inline-block',
                        transform: `translate3d(${item.initialX}px, ${item.initialY}px, 0) rotate(${item.initialRotate}deg)`,
                        willChange: 'transform',
                      }}
                      className={`relative ${item.char === 'D' ? 'ml-1 sm:ml-2' : ''}`}
                    >
                      {item.char}
                      {/* Subtle accent dot on the first letter S */}
                      {index === 0 && (
                        <span
                          ref={dotRef}
                          style={{
                            opacity: 0,
                            transform: 'scale(0)',
                            willChange: 'transform, opacity',
                          }}
                          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--color-primary)] pointer-events-none"
                        />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bottom Subtitle / Tagline Reveal inside Card */}
            <div
              ref={taglineRef}
              style={{
                opacity: 0,
                transform: 'translate3d(0, 6px, 0)',
                willChange: 'transform, opacity',
              }}
              className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center px-6 pointer-events-none"
            >
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[var(--color-text-on-dark)]">
                Architectural Coworking · Bhopal
              </span>
            </div>
          </>
        )}
      </div>

      {/* Bottom Footer Inspiration Line */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--color-muted)] opacity-70 pointer-events-none">
        <span>Experience Modern Collaboration</span>
      </div>
    </div>
  );
};

