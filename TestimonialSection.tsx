import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { testimonialsSection, brandName } from '../data/content';
import { ScrollReveal } from './ScrollReveal';

export interface TestimonialItem {
  id: string | number;
  metric: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  personImage: string;
  badgeLogo: string;
}

// 5 rich testimonials preserving all existing data while matching the 5-card carousel in the reference video
const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    metric: "Zero office management headaches",
    quote:
      "SpaceDesk gave our team the perfect private office setup. Having fast internet, uninterrupted power, and zero daily office management headaches lets us focus completely on client requirements and daily work.",
    author: "Abhinandan Parmar",
    role: "Private Cabin Member",
    company: "Parth Associates",
    personImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    badgeLogo: "Parth Associates",
  },
  {
    id: 2,
    metric: "99.9% power & network uptime",
    quote:
      "Handling daily transactions and partner support needs fast, uninterrupted systems. SpaceDesk gives our operations and support team a professional cabin setup, reliable power backup, and great meeting rooms to train partners and manage operations.",
    author: "Vivek Patel",
    role: "Dedicated Desk Member",
    company: "Dogma Soft",
    personImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    badgeLogo: "DOGMA SOFT",
  },
  {
    id: 3,
    metric: "100% presentation-ready suites",
    quote:
      "The meeting and conference rooms are fully equipped for our client presentations. Our enterprise clients are always impressed by the corporate setup and hospitality.",
    author: "Sumit Pradhan",
    role: "Enterprise Suite Member",
    company: "Energy Hub",
    personImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    badgeLogo: "Energy Hub",
  },
];

// Virtual circular buffer of cards so visible transitions remain continuous without mid-screen wrapping
const DISPLAY_ITEMS: (TestimonialItem & { virtualId: string; originalIndex: number })[] = [
  ...DEFAULT_TESTIMONIALS.map((item, i) => ({
    ...item,
    virtualId: `v0-${item.id}`,
    originalIndex: i,
  })),
  ...DEFAULT_TESTIMONIALS.map((item, i) => ({
    ...item,
    virtualId: `v1-${item.id}`,
    originalIndex: i,
  })),
];

export const TestimonialSection: React.FC = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const prevIndexRef = useRef(currentIndex);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const items = DISPLAY_ITEMS;
  const total = items.length;
  const originalTotal = DEFAULT_TESTIMONIALS.length;
  const activeDotIndex = currentIndex % originalTotal;

  // Window resize tracking for crisp responsive layout
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update previous index ref
  useEffect(() => {
    prevIndexRef.current = currentIndex;
  }, [currentIndex]);

  const AUTO_LOOP_DURATION = 2200; // Snappy continuous viewing duration matching reference video

  const resetTimer = useCallback(() => {
    setTimerKey((k) => k + 1);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
    resetTimer();
  }, [total, resetTimer]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    resetTimer();
  }, [total, resetTimer]);

  const handleSelect = useCallback(
    (dotIdx: number) => {
      setCurrentIndex((curr) => {
        const currMod = curr % originalTotal;
        let delta = dotIdx - currMod;
        if (delta > originalTotal / 2) delta -= originalTotal;
        if (delta < -originalTotal / 2) delta += originalTotal;
        return (curr + delta + total) % total;
      });
      resetTimer();
    },
    [total, originalTotal, resetTimer]
  );

  const [isInView, setIsInView] = useState(false);

  // IntersectionObserver to only autoplay when visible on screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous auto-looping animation with hover/off-screen pause and fresh timer on manual interaction
  useEffect(() => {
    if (!isAutoPlaying || isHovered || !isInView) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, AUTO_LOOP_DURATION);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, isInView, timerKey, total]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  // Circular offset relative to baseIndex (-3, -2, -1, 0, 1, 2)
  const getOffset = (index: number, base = currentIndex) => {
    let diff = index - base;
    while (diff > total / 2) diff -= total;
    while (diff <= -total / 2) diff += total;
    return diff;
  };

  // Dimensions based on viewport
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const activeWidth = isMobile
    ? Math.min(windowWidth - 32, 420)
    : isTablet
    ? 680
    : 840;

  const sideWidth = isMobile ? 80 : isTablet ? 150 : 190;
  const cardHeight = isMobile ? 440 : isTablet ? 360 : 380;

  // Calculates exact X pixel transform for continuous 3D ribbon positioning
  const getTransform = (diff: number) => {
    if (diff === 0) {
      return {
        x: -activeWidth / 2,
        width: activeWidth,
        scale: 1,
        opacity: 1,
        zIndex: 30,
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === 1) {
      return {
        x: activeWidth / 2 + (isMobile ? 10 : 16),
        width: sideWidth,
        scale: 0.88,
        opacity: isMobile ? 0.35 : 0.7,
        zIndex: 20,
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === -1) {
      return {
        x: -(activeWidth / 2 + (isMobile ? 10 : 16) + sideWidth),
        width: sideWidth,
        scale: 0.88,
        opacity: isMobile ? 0.35 : 0.7,
        zIndex: 20,
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === 2) {
      return {
        x: activeWidth / 2 + (isMobile ? 10 : 16) + sideWidth + (isMobile ? 8 : 14),
        width: sideWidth,
        scale: 0.74,
        opacity: isMobile ? 0 : 0.3,
        zIndex: 10,
        pointerEvents: 'auto' as const,
      };
    }
    if (diff === -2) {
      return {
        x: -(activeWidth / 2 + (isMobile ? 10 : 16) + 2 * sideWidth + (isMobile ? 8 : 14)),
        width: sideWidth,
        scale: 0.74,
        opacity: isMobile ? 0 : 0.3,
        zIndex: 10,
        pointerEvents: 'auto' as const,
      };
    }
    return {
      x: diff > 0 ? 1200 : -1200,
      width: sideWidth,
      scale: 0.6,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none' as const,
    };
  };

  return (
    <ScrollReveal
      as="section"
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-16 md:py-24 font-[var(--font-sans)] relative select-none"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
        {/* Continuous looping atmospheric aura behind slider */}
        <div
          className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            animate={
              isInView && !prefersReduced
                ? {
                    scale: [1, 1.05, 0.98, 1],
                    opacity: [0.35, 0.45, 0.38, 0.35],
                  }
                : { scale: 1, opacity: 0.35 }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-[880px] h-[380px] rounded-full transform -translate-y-8 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 65% 45% at 50% 50%, rgba(254, 208, 0, 0.22), rgba(37, 99, 235, 0.1), transparent 70%)',
            }}
          />
        </div>

        {/* Section Header matching Reference Video with looping badge */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-zinc-200/90 bg-white/80 backdrop-blur-md text-zinc-600 shadow-xs mb-3.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
            </span>
            Case studies • Auto Loop
          </div>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-charcoal)] font-heading leading-tight"
          >
            Real members. Real results.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 font-sans max-w-lg mx-auto">
            {testimonialsSection.title || 'What Our Members Say'} — see how teams, creators, and enterprises scale in Bhopal.
          </p>
        </div>

        {/* Carousel Viewport Stage */}
        <div
          ref={stageRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Member testimonials slider"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full overflow-hidden flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[36px]"
          style={{ height: `${cardHeight + 40}px` }}
        >
          {items.map((item, index) => {
            const diff = getOffset(index, currentIndex);
            const prevDiff = getOffset(index, prevIndexRef.current);
            const didWrap = Math.abs(diff - prevDiff) > 2.5;
            const isCenter = diff === 0;
            const style = getTransform(diff);
            const displayQuote = item.quote.replace('[Brand name]', brandName);

            return (
              <motion.div
                key={item.virtualId}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${item.originalIndex + 1} of ${originalTotal}: ${item.author}`}
                aria-hidden={!isCenter}
                initial={false}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  width: style.width,
                }}
                transition={{
                  duration: didWrap ? 0 : prefersReduced ? 0 : 0.13,
                  ease: [0.22, 1, 0.36, 1], // fluid, natural quintic deceleration matching reference video pacing
                }}
                onClick={() => {
                  if (!isCenter) handleSelect(item.originalIndex);
                }}
                className={`absolute top-5 left-1/2 rounded-[28px] md:rounded-[32px] bg-white border border-zinc-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden ${
                  !isCenter ? 'cursor-pointer hover:border-zinc-300' : 'cursor-default'
                }`}
                style={{
                  height: `${cardHeight}px`,
                  pointerEvents: style.pointerEvents,
                  willChange: 'transform, width, opacity',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Side Preview Card Layer: Photo + Badge (Visible when card is on the side) */}
                <div
                  className={`absolute inset-0 w-full h-full overflow-hidden bg-zinc-100 transition-opacity duration-200 ${
                    isCenter ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
                  }`}
                  aria-hidden={isCenter}
                >
                  <img
                    src={item.personImage}
                    alt={item.author}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider text-zinc-800 shadow-xs border border-white/50 flex items-center gap-1 whitespace-nowrap">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-primary)]" />
                    {item.badgeLogo}
                  </div>
                </div>

                {/* Center Active Card Layer: 2-Column Split Layout (Smoothly revealed when centered) */}
                <div
                  className={`absolute inset-0 w-full h-full flex flex-col sm:flex-row items-stretch justify-between p-6 sm:p-7 md:p-8 gap-5 sm:gap-6 overflow-hidden transition-opacity duration-200 ${
                    isCenter ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                  aria-hidden={!isCenter}
                >
                  {/* Left Column: Metric Headline + Quote + Member Attribution */}
                  <div className="flex-1 flex flex-col justify-between h-full select-text min-w-0 pr-0 sm:pr-2 overflow-hidden">
                    {/* Top Metric Highlight & Quote */}
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[var(--color-charcoal)] font-heading tracking-tight leading-snug">
                        {item.metric}
                      </h3>

                      <blockquote className="mt-3 sm:mt-5 text-[13px] sm:text-[15px] md:text-base text-zinc-600 font-sans leading-relaxed italic line-clamp-4 sm:line-clamp-none">
                        &ldquo;{displayQuote}&rdquo;
                      </blockquote>
                    </div>

                    {/* Bottom Member Attribution */}
                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-4">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-[13px] font-bold text-[var(--color-charcoal)] tracking-wide uppercase font-mono truncate">
                          {item.author}
                        </p>
                        <p className="text-[11px] sm:text-xs text-zinc-500 font-sans mt-0.5 truncate">
                          {item.role} • {item.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Member Photo with Bottom Brand Badge */}
                  <div className="relative w-full sm:w-[46%] h-[190px] sm:h-full min-h-[190px] rounded-[20px] md:rounded-[24px] overflow-hidden bg-zinc-100 shadow-inner flex-shrink-0">
                    <img
                      src={item.personImage}
                      alt={item.author}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    {/* Company/Brand Badge Overlay */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider text-zinc-900 shadow-md border border-white/60 flex items-center gap-1.5 whitespace-nowrap select-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                      {item.badgeLogo}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Navigation Controls with Visual Loop Progress */}
        <div className="relative flex items-center justify-center mt-6 sm:mt-8">
          {/* Centered Controls: < [Dots with Loop Progress] > */}
          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-3 py-2 rounded-full border border-zinc-200/80 shadow-xs">
            {/* Previous Arrow Button */}
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={handlePrev}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-zinc-950 flex items-center justify-center shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Indicator Dots / Capsule Pills with Loop Progress Animation */}
            <div className="flex items-center gap-2 px-1" role="tablist" aria-label="Slider navigation">
              {DEFAULT_TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeDotIndex}
                  aria-label={`Go to slide ${idx + 1}`}
                  onClick={() => handleSelect(idx)}
                  className="relative flex items-center justify-center p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-full"
                >
                  {idx === activeDotIndex ? (
                    <div className="relative w-7 sm:w-9 h-2 bg-zinc-200 rounded-full overflow-hidden">
                      <motion.div
                        key={`dot-progress-${activeDotIndex}-${timerKey}-${isAutoPlaying && !isHovered}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                          duration: isAutoPlaying && !isHovered ? AUTO_LOOP_DURATION / 1000 : 0.12,
                          ease: isAutoPlaying && !isHovered ? 'linear' : [0.22, 1, 0.36, 1],
                        }}
                        className="h-full bg-[var(--color-charcoal)] rounded-full"
                      />
                    </div>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-zinc-300 hover:bg-zinc-400 transition-all duration-150 block" />
                  )}
                </button>
              ))}
            </div>

            {/* Next Arrow Button */}
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={handleNext}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 hover:text-zinc-950 flex items-center justify-center shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Autoplay Play/Pause Toggle at Bottom-Right */}
          <div className="absolute right-0 sm:right-4 flex items-center">
            <button
              type="button"
              aria-label={isAutoPlaying ? 'Pause autoplay loop' : 'Resume autoplay loop'}
              onClick={() => setIsAutoPlaying((prev) => !prev)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 hover:bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 flex items-center justify-center shadow-xs transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              title={isAutoPlaying ? 'Pause autoplay loop' : 'Resume autoplay loop'}
            >
              {isAutoPlaying ? (
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg
                  className="w-3.5 h-3.5 fill-current ml-0.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
});

export default TestimonialSection;

