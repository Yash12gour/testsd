import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { spacesSection } from '../data/content';
import { WORKSPACES } from '../data/mockData';
import { WorkspaceItem } from '../types';
import { Reveal } from './Reveal';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { Scroll3D } from './motion';

interface ExploreSpacesSectionProps {
  onOpenBooking: (workspaceId?: string) => void;
  onNavigate?: (page: 'contact' | 'home' | string) => void;
  onSelectWorkspace?: (workspace: WorkspaceItem) => void;
  isModalOpen?: boolean;
}

interface SpeedTransition {
  startMultiplier: number;
  targetMultiplier: number;
  startTime: number;
  duration: number; // 500ms decel, 600ms accel
}

// Cubic bezier (0.22, 1, 0.36, 1) evaluator
function easeCubicBezier(t: number): number {
  let x = t;
  for (let i = 0; i < 8; i++) {
    const currentX = 3 * (1 - x) * (1 - x) * x * 0.22 + 3 * (1 - x) * x * x * 0.36 + x * x * x;
    const dx = 3 * (1 - x) * (1 - x) * 0.22 + 6 * (1 - x) * x * (0.36 - 0.22) + 3 * x * x * (1 - 0.36);
    if (Math.abs(currentX - t) < 1e-5 || dx === 0) break;
    x -= (currentX - t) / dx;
  }
  x = Math.max(0, Math.min(1, x));
  return 3 * (1 - x) * (1 - x) * x + 3 * (1 - x) * x * x + x * x * x;
}

const getSpaceImageAlt = (space: { id?: string; title: string; alt?: string; description?: string }) => {
  if (space.alt) return space.alt;
  const altMap: Record<string, string> = {
    'flexible-day-pass': 'People working at shared tables in an open workspace',
    'dedicated-desk': 'Desk with a laptop beside a tall window',
    'private-cabin': 'Bright corridor with glass-fronted private rooms',
    'private-office-suite': 'Office space with glass partitions and desks',
    'managed-office': 'Custom managed office space with modern workstations',
    'meeting-room': 'Meeting room with a long wooden table and large windows',
    'conference-room': 'Large open room with rows of desks and people working',
  };
  return (space.id && altMap[space.id]) || space.description || space.title;
};

export const ExploreSpacesSection: React.FC<ExploreSpacesSectionProps> = ({
  onOpenBooking,
  onNavigate,
  onSelectWorkspace,
  isModalOpen,
}) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Persistent click-stopped state & screen reader announcements
  const [isClickStopped, setIsClickStopped] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotionScrollRef = useRef<HTMLDivElement>(null);

  const originalItems = spacesSection.items;
  // Repeat cards so there are at least 12 cards for seamless infinite 3D loop
  const repeatCount = Math.max(Math.ceil(12 / originalItems.length), 4);

  const cards = useMemo(() => {
    const result: Array<{ item: (typeof originalItems)[0]; isDuplicate: boolean; originalIndex: number; key: string }> = [];
    for (let r = 0; r < repeatCount; r++) {
      for (let i = 0; i < originalItems.length; i++) {
        result.push({
          item: originalItems[i],
          isDuplicate: r > 0,
          originalIndex: i,
          key: `${originalItems[i].id}-rep-${r}`,
        });
      }
    }
    return result;
  }, [originalItems, repeatCount]);

  // Dimensions & parameters based on viewport width
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const config = useMemo(() => {
    if (viewportWidth >= 1024) {
      const cardWidth = Math.min(290, Math.max(200, viewportWidth * 0.22));
      return {
        cardWidth,
        gap: 20,
        rotFactor: 22,
        clampAngle: 55,
        tzFactor: 60,
        speed: 36,
      };
    } else if (viewportWidth >= 640) {
      const cardWidth = Math.min(250, Math.max(190, viewportWidth * 0.34));
      return {
        cardWidth,
        gap: 20,
        rotFactor: 18,
        clampAngle: 45,
        tzFactor: 60,
        speed: 36,
      };
    } else {
      const cardWidth = Math.min(270, Math.max(165, viewportWidth * 0.68));
      return {
        cardWidth,
        gap: 20,
        rotFactor: 12,
        clampAngle: 35,
        tzFactor: 40,
        speed: 28,
      };
    }
  }, [viewportWidth]);

  const cardHeight = Math.ceil(config.cardWidth * 1.25 + 74);
  const containerHeight = Math.ceil(cardHeight * 1.06 + 48);

  // References for animation loop & state tracking
  const offsetRef = useRef(0);
  const isClickStoppedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const isModalOpenRef = useRef(Boolean(isModalOpen));
  const isPointerDownRef = useRef(false);
  const isVisibleRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);

  // Speed multiplier easing: 500ms ease-out to stop, 600ms ease-in-out to full speed
  const currentMultiplierRef = useRef(1.0);
  const targetMultiplierRef = useRef(1.0);
  const transitionRef = useRef<SpeedTransition | null>(null);

  const lastTimeRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const pointerVelocityRef = useRef(0);
  const hasMovedRef = useRef(false);
  const dragEndTimestampRef = useRef(0);

  const stepAnimationRef = useRef<{
    startOffset: number;
    targetOffset: number;
    startTime: number;
    duration: number;
  } | null>(null);

  const inertiaRef = useRef<{
    velocity: number;
    startTime: number;
    duration: number;
  } | null>(null);

  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Sync modal state from prop and DOM dialog presence
  useEffect(() => {
    isModalOpenRef.current = Boolean(isModalOpen);
  }, [isModalOpen]);

  // Sync click-stopped ref
  useEffect(() => {
    isClickStoppedRef.current = isClickStopped;
  }, [isClickStopped]);

  // Check prefers-reduced-motion & resize listener
  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener?.('change', handleMotionChange);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      mediaQuery.removeEventListener?.('change', handleMotionChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Previous & Next step navigation
  const handlePrev = useCallback(() => {
    const stride = config.cardWidth + config.gap;
    stepAnimationRef.current = {
      startOffset: offsetRef.current,
      targetOffset: offsetRef.current - stride,
      startTime: performance.now(),
      duration: 800,
    };
    inertiaRef.current = null;
  }, [config.cardWidth, config.gap]);

  const handleNext = useCallback(() => {
    const stride = config.cardWidth + config.gap;
    stepAnimationRef.current = {
      startOffset: offsetRef.current,
      targetOffset: offsetRef.current + stride,
      startTime: performance.now(),
      duration: 800,
    };
    inertiaRef.current = null;
  }, [config.cardWidth, config.gap]);

  // Automatic slide cycling in loop every 3.8s
  useEffect(() => {
    if (prefersReducedMotion || !isMounted) return;

    const autoplayInterval = setInterval(() => {
      const isInteracting =
        isPointerDownRef.current ||
        isHoveredRef.current ||
        isModalOpenRef.current ||
        isClickStoppedRef.current ||
        !isVisibleRef.current ||
        !isDocumentVisibleRef.current ||
        Boolean(stepAnimationRef.current) ||
        Boolean(inertiaRef.current);

      if (!isInteracting) {
        handleNext();
      }
    }, 3800);

    return () => clearInterval(autoplayInterval);
  }, [prefersReducedMotion, isMounted, handleNext]);

  // Reduced motion autoplay support
  useEffect(() => {
    if (!prefersReducedMotion || !isMounted) return;

    const interval = setInterval(() => {
      if (
        !isClickStoppedRef.current &&
        !isModalOpenRef.current &&
        isVisibleRef.current &&
        isDocumentVisibleRef.current &&
        reducedMotionScrollRef.current
      ) {
        const stride = config.cardWidth + config.gap;
        const maxScroll = reducedMotionScrollRef.current.scrollWidth - reducedMotionScrollRef.current.clientWidth;
        if (reducedMotionScrollRef.current.scrollLeft >= maxScroll - 10) {
          reducedMotionScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          reducedMotionScrollRef.current.scrollBy({ left: stride, behavior: 'smooth' });
        }
      }
    }, 4200);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isMounted, config.cardWidth, config.gap]);

  // Toggle persistent click-stopped state and announce change
  const toggleClickStopped = useCallback((nextState?: boolean) => {
    const newState = nextState !== undefined ? nextState : !isClickStoppedRef.current;
    isClickStoppedRef.current = newState;
    setIsClickStopped(newState);
    setLiveAnnouncement(newState ? 'Carousel paused' : 'Carousel playing');
  }, []);

  // Visibility and Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.05;
        if (isVisibleRef.current && isDocumentVisibleRef.current) {
          lastTimeRef.current = performance.now();
          if (!wasVisible && startLoopRef.current) {
            startLoopRef.current();
          }
        }
      },
      { threshold: [0, 0.05] }
    );

    observer.observe(container);

    const handleVisibilityChange = () => {
      isDocumentVisibleRef.current = !document.hidden;
      if (isDocumentVisibleRef.current && isVisibleRef.current) {
        lastTimeRef.current = performance.now();
        if (startLoopRef.current) {
          startLoopRef.current();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const startLoopRef = useRef<(() => void) | null>(null);

  // Main animation loop
  useEffect(() => {
    if (prefersReducedMotion || !isMounted) return;

    let animationFrameId: number | null = null;
    let isLoopRunning = false;

    const tick = (now: number) => {
      // If offscreen or tab hidden, completely sleep the rAF loop (0% idle CPU)
      if (!isVisibleRef.current || !isDocumentVisibleRef.current) {
        if (!stepAnimationRef.current && !inertiaRef.current && currentMultiplierRef.current <= 0.001) {
          isLoopRunning = false;
          lastTimeRef.current = null;
          animationFrameId = null;
          return;
        }
      }

      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const deltaTime = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // Determine desired speed multiplier target (continuous smooth infinite loop)
      const shouldRun =
        !isClickStoppedRef.current &&
        !isModalOpenRef.current &&
        !isPointerDownRef.current &&
        isVisibleRef.current &&
        isDocumentVisibleRef.current;

      const desiredTarget = shouldRun ? 1.0 : 0.0;

      // Start easing transition if target changed
      if (targetMultiplierRef.current !== desiredTarget) {
        targetMultiplierRef.current = desiredTarget;
        const duration = desiredTarget === 0.0 ? 500 : 600; // 500ms decel, 600ms accel
        transitionRef.current = {
          startMultiplier: currentMultiplierRef.current,
          targetMultiplier: desiredTarget,
          startTime: now,
          duration,
        };
      }

      // Smoothly ease current speed multiplier
      if (transitionRef.current) {
        const trans = transitionRef.current;
        const elapsed = now - trans.startTime;
        const p = Math.min(Math.max(elapsed / trans.duration, 0), 1);

        if (trans.targetMultiplier === 0.0) {
          // Decelerate over 500ms with ease-out: 1 - (1 - p)^2
          const eased = 1 - Math.pow(1 - p, 2);
          currentMultiplierRef.current = trans.startMultiplier + (0.0 - trans.startMultiplier) * eased;
        } else {
          // Accelerate over 600ms with ease-in-out
          const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
          currentMultiplierRef.current = trans.startMultiplier + (1.0 - trans.startMultiplier) * eased;
        }

        if (p >= 1) {
          currentMultiplierRef.current = trans.targetMultiplier;
          transitionRef.current = null;
        }
      }

      const stride = config.cardWidth + config.gap;
      const totalLength = cards.length * stride;
      const halfTotal = totalLength / 2;

      // 1. Step animation taking priority
      if (stepAnimationRef.current) {
        const step = stepAnimationRef.current;
        const elapsed = now - step.startTime;
        const progress = Math.min(elapsed / step.duration, 1);
        const eased = easeCubicBezier(progress);
        offsetRef.current = step.startOffset + (step.targetOffset - step.startOffset) * eased;

        if (progress >= 1) {
          stepAnimationRef.current = null;
        }
      }
      // 2. Inertia following drag release
      else if (inertiaRef.current) {
        const inertia = inertiaRef.current;
        const elapsed = now - inertia.startTime;
        if (elapsed < 600) {
          const decay = Math.pow(Math.max(0, 1 - elapsed / 600), 2);
          offsetRef.current -= inertia.velocity * (deltaTime * 1000) * decay;
        } else {
          inertiaRef.current = null;
        }
      }
      // 3. Normal continuous auto-scroll scaled by speed multiplier
      else if (currentMultiplierRef.current > 0.0001) {
        offsetRef.current += config.speed * currentMultiplierRef.current * deltaTime;
      }

      // Keep offset normalized
      offsetRef.current = ((offsetRef.current % totalLength) + totalLength) % totalLength;

      // Update card transforms and styles directly for 60/120Hz smooth rendering
      for (let i = 0; i < cards.length; i++) {
        const el = cardElementsRef.current[i];
        if (!el) continue;

        const basePos = i * stride - offsetRef.current;
        let rawX = ((basePos % totalLength) + totalLength) % totalLength;
        let x = rawX;
        if (x > halfTotal) x -= totalLength;

        const d = x / config.cardWidth;
        const absD = Math.abs(d);

        // Cylinder math: rotateY curves outer edges away like outside of a cylinder
        const clampedD = Math.max(-config.clampAngle / config.rotFactor, Math.min(config.clampAngle / config.rotFactor, d));
        const rotY = -(clampedD * config.rotFactor);

        // Scale: 1.06 at center, falling smoothly to 0.88 when |d| >= 2
        let scale = 0.88;
        if (absD < 2) {
          const t = absD / 2;
          scale = 0.88 + 0.18 * 0.5 * (1 + Math.cos(Math.PI * t));
        }

        // TranslateZ: -|d| * tzFactor
        const translateZ = -absD * config.tzFactor;

        // Opacity: 1 when |d| <= 1, falling smoothly to 0.35 when |d| >= 3
        let opacity = 0.35;
        if (absD <= 1) {
          opacity = 1.0;
        } else if (absD < 3) {
          const t = (absD - 1) / 2;
          opacity = 0.35 + 0.65 * 0.5 * (1 + Math.cos(Math.PI * t));
        }

        // Z-Index: higher for cards closer to center
        const zIndex = Math.round(100 - Math.min(absD * 10, 95));

        el.style.transform = `translate3d(${x}px, 0, ${translateZ}px) rotateY(${rotY}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    startLoopRef.current = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
        lastTimeRef.current = performance.now();
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    if (isVisibleRef.current && isDocumentVisibleRef.current) {
      isLoopRunning = true;
      animationFrameId = requestAnimationFrame(tick);
    }

    return () => {
      startLoopRef.current = null;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [prefersReducedMotion, isMounted, config, cards.length]);

  // Helper to retrieve full WorkspaceItem for modal/details
  const getWorkspaceItem = useCallback((spaceId?: string): WorkspaceItem => {
    const found = WORKSPACES.find((w) => w.id === spaceId);
    if (found) return found;
    const original = originalItems.find((item) => item.id === spaceId);
    return {
      id: spaceId || 'dedicated-desk',
      title: original?.title || 'Workspace',
      category: 'flexible',
      shortDesc: original?.description || '',
      fullDesc: original?.description || '',
      price: '₹5,000',
      period: '/ Month',
      capacity: '1–6 Persons',
      availability: 'Available',
      features: ['High-speed Wi-Fi', '24/7 Access', 'Ergonomic Desk & Chair', 'Pantry & Coffee'],
      imageUrl: original?.image || 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80',
    };
  }, [originalItems]);

  // Click on card: smooth 3D center rotate + trigger workspace detail modal
  const handleCardClick = useCallback((cardIndex: number, spaceId?: string, e?: React.MouseEvent) => {
    // If dragging just finished, suppress click
    if (hasMovedRef.current || (Date.now() - dragEndTimestampRef.current < 250)) {
      return;
    }

    // Smoothly rotate the carousel so this card is centered!
    const stride = config.cardWidth + config.gap;
    const totalLength = cards.length * stride;
    const halfTotal = totalLength / 2;
    const basePos = cardIndex * stride - offsetRef.current;
    let rawX = ((basePos % totalLength) + totalLength) % totalLength;
    let x = rawX;
    if (x > halfTotal) x -= totalLength;

    stepAnimationRef.current = {
      startOffset: offsetRef.current,
      targetOffset: offsetRef.current + x,
      startTime: performance.now(),
      duration: 650,
    };
    inertiaRef.current = null;

    // Temporarily pause autoplay so the user can inspect the card
    isHoveredRef.current = true;
    setTimeout(() => {
      if (!containerRef.current?.matches(':hover')) {
        isHoveredRef.current = false;
      }
    }, 2500);

    // Modal preview disabled
  }, [cards.length, config.cardWidth, config.gap]);

  // Arrow button click: triggers detail view directly
  const handleArrowClick = useCallback((spaceId?: string, e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (spaceId) {
      if (onSelectWorkspace) {
        onSelectWorkspace(getWorkspaceItem(spaceId));
      } else {
        onOpenBooking(spaceId);
      }
    }
  }, [getWorkspaceItem, onOpenBooking, onSelectWorkspace]);

  // Check Availability click: routes to contact page
  const handleAvailabilityClick = useCallback((spaceTitle?: string, e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onNavigate) {
      onNavigate('contact');
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/contact';
      }
    }
  }, [onNavigate]);

  // Pointer drag & swipe handling
  const handlePointerDown = (e: React.PointerEvent) => {
    if (prefersReducedMotion) return;
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    pointerVelocityRef.current = 0;
    hasMovedRef.current = false;

    stepAnimationRef.current = null;
    inertiaRef.current = null;
    // NOTE: Pointer capture is intentionally deferred until pointer actually moves > 5px,
    // so regular clicks/taps on cards and child buttons fire cleanly and are not swallowed.
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      isHoveredRef.current = true;
    }

    if (!isPointerDownRef.current) return;
    const dx = e.clientX - lastPointerXRef.current;
    const now = performance.now();
    const dt = Math.max(now - lastPointerTimeRef.current, 1);

    pointerVelocityRef.current = dx / dt;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;

    if (Math.abs(e.clientX - startXRef.current) > 5) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        try {
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {
          // Ignored if capture unsupported
        }
      }
    }

    // 1:1 movement with pointer
    offsetRef.current -= dx;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    if (hasMovedRef.current) {
      dragEndTimestampRef.current = Date.now();
      try {
        if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignored
      }

      if (Math.abs(pointerVelocityRef.current) > 0.08) {
        const clampedVel = Math.max(-2, Math.min(2, pointerVelocityRef.current));
        inertiaRef.current = {
          velocity: clampedVel,
          startTime: performance.now(),
          duration: 600,
        };
      }
    }

    // Non-mouse devices don't have hover
    if (e.pointerType !== 'mouse') {
      isHoveredRef.current = false;
    }
  };

  // Keyboard navigation & focus tracking
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Scroll for reduced motion mode
  const handleReducedMotionScroll = (direction: 'left' | 'right') => {
    if (!reducedMotionScrollRef.current) return;
    const stride = config.cardWidth + config.gap;
    reducedMotionScrollRef.current.scrollBy({
      left: direction === 'left' ? -stride : stride,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollReveal as="section" id="spaces" aria-labelledby="explore-spaces-title" className="py-16 md:py-24 font-[var(--font-sans)] relative">
      <Scroll3D preset="subtle" className="w-full">
        {/* Anchor alias so #workspaces links scroll accurately */}
        <span id="workspaces" className="absolute -top-16 left-0 pointer-events-none" aria-hidden="true" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Centered Heading */}
        <ScrollRevealItem delay={40} className="max-w-3xl mx-auto mb-10 text-center">
          <h2
            id="explore-spaces-title"
            className="font-heading text-center text-[clamp(1.75rem,3vw,2.5rem)] font-normal text-[var(--color-charcoal)] leading-[1.15] tracking-tight mb-3"
          >
            {spacesSection.title}
          </h2>
          <p className="text-center text-[var(--color-text)] text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            {spacesSection.subtitle || "A fully customized office for growing companies and branch offices, with dedicated facility support."}
          </p>
        </ScrollRevealItem>
      </div>

      {/* Visually hidden aria-live announcement for screen readers (only updates on click or button changes) */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Fallback before JavaScript mounts */}
      {!isMounted ? (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {originalItems.map((space) => (
              <div
                key={space.id}
                role="button"
                tabIndex={0}
                className="w-full shrink-0 card-lift flex flex-col cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[22px]"
                onClick={() => {
                  if (onSelectWorkspace) {
                    onSelectWorkspace(getWorkspaceItem(space.id));
                  } else {
                    onOpenBooking(space.id);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onSelectWorkspace) {
                      onSelectWorkspace(getWorkspaceItem(space.id));
                    } else {
                      onOpenBooking(space.id);
                    }
                  }
                }}
              >
                <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-[var(--color-tile)] border border-[var(--color-border)]">
                  <img src={space.image} alt={getSpaceImageAlt(space)} className="w-full h-full object-cover" />
                </div>
                <div className="mt-[14px]">
                  <h3 className="card-title text-[1rem] font-semibold text-[var(--color-charcoal)] leading-snug">
                    {space.title}
                  </h3>
                  <p className="mt-1 text-[0.75rem] font-normal text-[var(--color-text)] leading-relaxed">
                    {space.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : prefersReducedMotion ? (
        /* Reduced Motion Fallback: Plain horizontal scroll-snap row with hidden scrollbar */
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div
            ref={reducedMotionScrollRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Explore spaces"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {originalItems.map((space, idx) => {
              const hasError = imageErrors[space.id];
              return (
                <div
                  key={space.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${originalItems.length}`}
                  tabIndex={0}
                  onClick={() => {
                    if (onSelectWorkspace) {
                      onSelectWorkspace(getWorkspaceItem(space.id));
                    } else {
                      onOpenBooking(space.id);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (onSelectWorkspace) {
                        onSelectWorkspace(getWorkspaceItem(space.id));
                      } else {
                        onOpenBooking(space.id);
                      }
                    }
                  }}
                  className="w-[clamp(200px,34vw,280px)] shrink-0 snap-center card-lift flex flex-col cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[22px]"
                >
                  <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-[var(--color-tile)] border border-[var(--color-border)]">
                    {!hasError ? (
                      <img
                        src={space.image}
                        alt={getSpaceImageAlt(space)}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImageErrors((prev) => ({ ...prev, [space.id]: true }))}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-[var(--color-gold)] bg-[var(--color-tile)]">
                        <svg className="w-12 h-12 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        <span className="mt-2 text-xs font-semibold text-[var(--color-charcoal)]">{space.title}</span>
                      </div>
                    )}

                    {space.featured ? (
                      <div
                        className="absolute top-0 right-0 w-[104px] h-[104px] bg-[var(--color-bg-warm)] rounded-bl-[24px] z-10 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className="absolute top-0 right-full w-6 h-6 pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(circle 24px at 0 0, transparent 23.5px, var(--color-bg-warm) 24px)',
                          }}
                          aria-hidden="true"
                        />
                        <div
                          className="absolute top-full right-0 w-6 h-6 pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(circle 24px at 0 0, transparent 23.5px, var(--color-bg-warm) 24px)',
                          }}
                          aria-hidden="true"
                        />
                        <a
                          href="/contact"
                          onClick={(e) => handleAvailabilityClick(space.title, e)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleAvailabilityClick(space.title, e);
                            }
                          }}
                          aria-label={`Check availability for ${space.title}`}
                          className="w-20 h-20 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] flex flex-col items-center justify-center text-center p-1 font-semibold text-[0.625rem] leading-[1.15] shadow-md hover:scale-105 active:scale-95 transition-transform uppercase tracking-wider focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 cursor-pointer"
                        >
                          <span>Check</span>
                          <span>Availability</span>
                        </a>
                      </div>
                    ) : (
                      <div
                        className="absolute top-0 right-0 w-[56px] h-[56px] bg-[var(--color-bg-warm)] rounded-bl-[24px] z-10 flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div
                          className="absolute top-0 right-full w-6 h-6 pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(circle 24px at 0 0, transparent 23.5px, var(--color-bg-warm) 24px)',
                          }}
                          aria-hidden="true"
                        />
                        <div
                          className="absolute top-full right-0 w-6 h-6 pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(circle 24px at 0 0, transparent 23.5px, var(--color-bg-warm) 24px)',
                          }}
                          aria-hidden="true"
                        />
                        <button
                          type="button"
                          onClick={(e) => handleArrowClick(space.id, e)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleArrowClick(space.id, e);
                            }
                          }}
                          aria-label={`View ${space.title} details`}
                          className="w-10 h-10 rounded-full bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4 stroke-[1.5]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14" />
                            <path d="m13 6 6 6-6 6" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-[14px]">
                    <h3 className="card-title text-[1rem] font-semibold text-[var(--color-charcoal)] leading-snug">
                      {space.title}
                    </h3>
                    <p className="mt-1 text-[0.75rem] font-normal text-[var(--color-text)] leading-relaxed">
                      {space.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reduced Motion Controls (Previous and Next only) */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleReducedMotionScroll('left')}
              aria-label="Previous space"
              className="w-11 h-11 rounded-full bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-center shadow-md hover:opacity-90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            >
              <svg
                className="w-5 h-5 stroke-[1.5]"
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
            <button
              type="button"
              onClick={() => handleReducedMotionScroll('right')}
              aria-label="Next space"
              className="w-11 h-11 rounded-full bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-center shadow-md hover:opacity-90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            >
              <svg
                className="w-5 h-5 stroke-[1.5]"
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
        </div>
      ) : (
        /* 3D Curved, Auto-Scrolling Film-Strip Carousel */
        <ScrollRevealItem delay={100} className="w-full">
          {/* Viewport container: full width of section, overflow hidden, perspective: 1200px */}
          <div
            ref={containerRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Explore spaces"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerEnter={(e) => {
              // Only treat hover as pause for real mouse pointers
              if (e.pointerType === 'mouse') {
                isHoveredRef.current = true;
              }
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') {
                isHoveredRef.current = false;
              }
            }}
            onFocus={() => {
              isFocusedRef.current = true;
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                isFocusedRef.current = false;
              }
            }}
            style={{
              perspective: '1200px',
              perspectiveOrigin: '50% 50%',
              touchAction: 'pan-y',
              height: `${containerHeight}px`,
            }}
            className="relative w-full overflow-hidden select-none flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] cursor-pointer"
          >
            {/* The film-strip track: centered origin */}
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {cards.map((cardObj, idx) => {
                const space = cardObj.item;
                const hasError = imageErrors[space.id];

                return (
                  <div
                    key={cardObj.key}
                    ref={(el) => {
                      cardElementsRef.current[idx] = el;
                    }}
                    role={cardObj.isDuplicate ? undefined : 'group'}
                    aria-roledescription={cardObj.isDuplicate ? undefined : 'slide'}
                    aria-label={cardObj.isDuplicate ? undefined : `${cardObj.originalIndex + 1} of ${originalItems.length}`}
                    aria-hidden={cardObj.isDuplicate ? true : undefined}
                    tabIndex={cardObj.isDuplicate ? -1 : 0}
                    onClick={(e) => {
                      handleCardClick(idx, space.id, e);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(idx, space.id);
                      }
                    }}
                    className="absolute top-1/2 left-1/2 flex flex-col group select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-[22px] transition-shadow duration-300 hover:shadow-xl"
                    style={{
                      width: `${config.cardWidth}px`,
                      height: `${cardHeight}px`,
                      marginTop: `-${cardHeight / 2}px`,
                      marginLeft: `-${config.cardWidth / 2}px`,
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
                      transformOrigin: '50% 50%',
                      transformStyle: 'preserve-3d',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  >
                    {/* Image Tile: aspect-ratio 4/5, border-radius 22px, object-fit cover, overflow hidden, relative */}
                    <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-[var(--color-tile)] border border-[var(--color-border)] shadow-md">
                      {!hasError ? (
                        <img
                          src={space.image}
                          alt={getSpaceImageAlt(space)}
                          loading="lazy"
                          decoding="async"
                          onError={() => setImageErrors((prev) => ({ ...prev, [space.id]: true }))}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-[var(--color-gold)] bg-[var(--color-tile)] pointer-events-none">
                          <svg
                            className="w-12 h-12 stroke-[1.5]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                          <span className="mt-2 text-xs font-semibold text-[var(--color-charcoal)]">
                            {space.title}
                          </span>
                        </div>
                      )}

                    </div>

                    {/* Below image, 14px gap */}
                    <div className="mt-[14px]">
                      <h3 className="card-title text-[1rem] font-semibold text-[var(--color-charcoal)] leading-snug">
                        {space.title}
                      </h3>
                      <p className="mt-1 text-[0.75rem] font-normal text-[var(--color-text)] leading-relaxed">
                        {space.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Centered Controls Row: 24px below strip, three 44px circular buttons 12px apart */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous space"
              className="w-11 h-11 rounded-full bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-center shadow-md hover:opacity-90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            >
              <svg
                className="w-5 h-5 stroke-[1.5]"
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

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next space"
              className="w-11 h-11 rounded-full bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-center shadow-md hover:opacity-90 active:scale-95 transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            >
              <svg
                className="w-5 h-5 stroke-[1.5]"
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
        </ScrollRevealItem>
      )}
      </Scroll3D>
    </ScrollReveal>
  );
};
