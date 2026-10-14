import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import content from '../data/content';
import { AppPageType } from './Navbar';

interface HeroProps {
  onBookTourClick?: () => void;
  onExploreSpacesClick?: () => void;
  onNavigate?: (page: AppPageType, targetSectionId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookTourClick, onExploreSpacesClick, onNavigate }) => {
  // Slides state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = content.slides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0];

  // Media playback & performance checks
  const heroCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [reduceMotionOrData, setReduceMotionOrData] = useState(false);

  // Missing images fallback state
  const [avatarErrors, setAvatarErrors] = useState<Record<number, boolean>>({});
  const [newLocationError, setNewLocationError] = useState(false);
  const [posterError, setPosterError] = useState(false);
  const [heroLogoError, setHeroLogoError] = useState(false);
  const [overlayLogoError, setOverlayLogoError] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);

  // Navigation Overlay & Search
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Reduced motion / connection check
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nav = navigator as unknown as {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const saveData = nav.connection?.saveData === true;
    const slowNet = ['2g', 'slow-2g'].includes(nav.connection?.effectiveType || '');

    if (motionQuery.matches || saveData || slowNet) {
      setReduceMotionOrData(true);
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReduceMotionOrData(e.matches || saveData || slowNet);
    };
    motionQuery.addEventListener?.('change', handleMotionChange);

    return () => {
      motionQuery.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  // IntersectionObserver & Visibility handling for Video
  useEffect(() => {
    if (reduceMotionOrData || videoError) return;

    const videoEl = videoRef.current;
    if (videoEl) {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silent fallback: keep poster visible
        });
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.intersectionRatio < 0.1) {
          videoRef.current.pause();
        } else if (!document.hidden) {
          try {
            videoRef.current.play().catch(() => {});
          } catch {
            // silent catch
          }
        }
      },
      { threshold: [0, 0.1, 1.0] }
    );

    if (heroCardRef.current) {
      observer.observe(heroCardRef.current);
    }

    const handleVisibility = () => {
      if (!videoRef.current) return;
      if (document.hidden) {
        videoRef.current.pause();
      } else {
        try {
          videoRef.current.play().catch(() => {});
        } catch {
          // silent catch
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [reduceMotionOrData, currentSlideIndex]);

  // Overlay Focus Trap & Body Scroll Lock
  useEffect(() => {
    if (!isOverlayOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    } else if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOverlayOpen(false);
        return;
      }
      if (e.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOverlayOpen, isSearchActive]);



  // Button actions
  const handleBookNow = (e: React.MouseEvent) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      e.preventDefault();
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onBookTourClick) {
      e.preventDefault();
      onBookTourClick();
    }
  };

  const handlePricingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingEl = document.getElementById('pricing') || document.getElementById('plans');
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTestimonials = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('testimonials');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered menu items for search
  const filteredMenuItems = useMemo(() => {
    if (!searchQuery.trim()) return content.menuItems;
    const q = searchQuery.toLowerCase();
    return content.menuItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [searchQuery]);

  // Unified 3D Scroll-Based Animation Logic
  const heroSectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const isMotionDisabled = prefersReduced || reduceMotionOrData;

  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });

  const springConfig = {
    damping: 28,
    stiffness: 100,
    mass: 0.45,
    restDelta: 0.001,
  };

  // Main hero card 3D spatial transforms
  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], ['0deg', '1.6deg', '3.2deg']);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.985, 0.965]);
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 24, 52]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.96, 0.88]);

  const cardRotateX = useSpring(rawRotateX, springConfig);
  const cardScale = useSpring(rawScale, springConfig);
  const cardY = useSpring(rawY, springConfig);
  const cardOpacity = useSpring(rawOpacity, springConfig);

  // Background media parallax depth layer
  const rawBgY = useTransform(scrollYProgress, [0, 1], ['-2%', '6%']);
  const rawBgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);
  const bgY = useSpring(rawBgY, springConfig);
  const bgScale = useSpring(rawBgScale, springConfig);

  // Foreground Left Headline 3D depth layer
  const rawHeadlineY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const rawHeadlineZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 15, 30]);
  const headlineY = useSpring(rawHeadlineY, springConfig);
  const headlineZ = useSpring(rawHeadlineZ, springConfig);

  // Foreground Right Notch B Announcement 3D depth layer
  const rawNotchY = useTransform(scrollYProgress, [0, 1], [0, -22]);
  const rawNotchZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 38]);
  const rawNotchScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.01, 1.02]);
  const notchY = useSpring(rawNotchY, springConfig);
  const notchZ = useSpring(rawNotchZ, springConfig);
  const notchScale = useSpring(rawNotchScale, springConfig);

  // Tablet/Mobile bottom card subtle elevation
  const rawTabletCardY = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const tabletCardY = useSpring(rawTabletCardY, springConfig);

  return (
    <section
      ref={heroSectionRef}
      aria-label="Hero Introduction"
      style={{ perspective: '1400px' }}
      className="w-full bg-[var(--color-bg-warm)] p-3 sm:p-6 font-[var(--font-sans)] relative"
    >
      {/* 2. Large Hero Card with continuous Scroll-linked 3D depth */}
      <motion.div
        ref={heroCardRef}
        style={
          isMotionDisabled
            ? undefined
            : {
                rotateX: cardRotateX,
                scale: cardScale,
                y: cardY,
                opacity: cardOpacity,
                transformPerspective: 1400,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }
        }
        className="relative overflow-hidden rounded-none w-full bg-[var(--color-charcoal)] h-[clamp(540px,76vh,740px)] sm:max-lg:h-[clamp(520px,70vh,680px)] max-sm:min-h-[580px] max-sm:h-auto border-none outline-none ring-0 shadow-none"
      >
        {/* Background Video (looping) with image fallback & subtle scroll parallax */}
        <motion.div
          style={
            isMotionDisabled
              ? undefined
              : {
                  y: bgY,
                  scale: bgScale,
                  willChange: 'transform',
                }
          }
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {!videoError && !reduceMotionOrData ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            >
              <source src="/videos/coworking-team-meeting.mp4" type="video/mp4" />
            </video>
          ) : !heroImageError ? (
            <img
              src={content.heroImage}
              alt="Colleagues working together around a computer screen"
              width={1400}
              height={740}
              fetchPriority="high"
              decoding="async"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
                display: 'block',
              }}
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              onError={() => setHeroImageError(true)}
            />
          ) : null}
        </motion.div>

        {/* Dark overlay: rgba(31, 32, 34, 0.5) (--color-charcoal at 50%) */}
        <div
          className="absolute inset-0 bg-[rgba(31,32,34,0.5)] pointer-events-none z-[1]"
          aria-hidden="true"
        />

        {/* 3. NOTCH A (top-left tab) */}
        <header
          className="absolute top-0 left-0 h-[72px] bg-[var(--color-bg-warm)] z-20 flex items-center px-6 rounded-br-[24px] border-none outline-none ring-0 shadow-none"
          aria-label="Brand and Award"
        >
          {/* Brand Logo: replaces text brand name with logo img */}
          <a
            href="#"
            className="flex items-center focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 rounded"
            aria-label="SpaceDesk Co-Working logo, coworking space in Bhopal"
          >
            {!heroLogoError ? (
              <img
                src={content.logo}
                alt="SpaceDesk Co-Working logo, coworking space in Bhopal"
                width="180"
                height="36"
                decoding="async"
                fetchPriority="high"
                onError={() => setHeroLogoError(true)}
                className="h-[28px] sm:h-[36px] w-auto max-w-[180px] object-contain block"
                style={{ imageRendering: 'auto' }}
              />
            ) : (
              <span className="font-heading text-[1.375rem] font-normal text-[var(--color-charcoal)] leading-none select-none tracking-tight">
                {content.brandName}
              </span>
            )}
          </a>

          {/* Notch A: Inverted corner at top-right outer edge meeting the hero card photo */}
          <div
            className="absolute top-0 left-full w-6 h-6 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle 24px at 24px 24px, transparent 23.5px, var(--color-bg-warm) 24px)',
            }}
            aria-hidden="true"
          />
        </header>

        {/* TOP-RIGHT CONTROLS (inside photo, 24px from top and right) */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-1 sm:gap-2">
          {/* Search Button (Hidden below 640px) */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => {
              setIsSearchActive(true);
              setIsOverlayOpen(true);
            }}
            className="hidden sm:flex w-11 h-11 items-center justify-center text-[var(--color-white)] hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>
        </div>

        {/* HEADLINE BLOCK (bottom-left of the photo, padding 40px) */}
        <motion.div
          style={
            isMotionDisabled
              ? undefined
              : {
                  y: headlineY,
                  z: headlineZ,
                  willChange: 'transform',
                }
          }
          className="absolute bottom-0 left-0 z-10 p-5 sm:p-10 max-w-[850px] flex flex-col justify-end"
        >
          {/* Avatar Pill on tablet/mobile (< 1024px) rendered above headline linked to testimonials */}
          <div className="block lg:hidden mb-4 -ml-3 mt-0">
            <a
              href="#testimonials"
              onClick={handleScrollToTestimonials}
              aria-label="Members of the SpaceDesk coworking community"
              className="inline-flex items-center bg-white/25 backdrop-blur-[8px] rounded-full p-[6px] hover:scale-105 hover:bg-white/35 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] cursor-pointer"
            >
              <div className="flex items-center" aria-label="Members of the SpaceDesk coworking community">
                {content.avatars.map((src, i) => (
                  <div
                    key={i}
                    style={{ marginLeft: i === 0 ? 0 : '-12px' }}
                    className="w-11 h-11 rounded-full border-2 border-[var(--color-white)] overflow-hidden shrink-0 relative bg-[var(--color-tile)]"
                  >
                    {!avatarErrors[i] ? (
                      <img
                        src={src}
                        alt=""
                        width={44}
                        height={44}
                        loading="lazy"
                        decoding="async"
                        onError={() => setAvatarErrors((prev) => ({ ...prev, [i]: true }))}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--color-tile)]" />
                    )}
                  </div>
                ))}
                {/* 44px circle matching avatar styling */}
                <div
                  style={{ marginLeft: '-12px' }}
                  className="w-11 h-11 rounded-full border-2 border-[var(--color-white)] bg-[var(--color-tile)] shrink-0 overflow-hidden"
                />
              </div>
            </a>
          </div>

          {/* Main <h1> Headline */}
          <h1 className="font-heading font-normal text-[var(--color-white)] leading-[1.08] sm:leading-[1.05] tracking-tight">
            <div
              className="text-[clamp(2.125rem,6vw,4.125rem)] ml-0 sm:ml-5 mt-8 sm:mt-24 lg:mt-28"
            >
              {content.headline.line1}
            </div>
            <div
              className="text-[clamp(1.75rem,5vw,3.125rem)] flex items-center flex-wrap gap-2.5 sm:gap-4 mt-1 ml-0 sm:ml-5"
            >
              {/* Desktop Avatar Pill (inline on Line 2, vertically centered, linked to testimonials) */}
              <a
                href="#testimonials"
                onClick={handleScrollToTestimonials}
                aria-label="Members of the SpaceDesk coworking community"
                className="hidden lg:inline-flex items-center bg-white/25 backdrop-blur-[8px] rounded-full p-[6px] hover:scale-105 hover:bg-white/35 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] cursor-pointer"
              >
                <div className="flex items-center" aria-label="Members of the SpaceDesk coworking community">
                  {content.avatars.map((src, i) => (
                    <div
                      key={i}
                      style={{ marginLeft: i === 0 ? 0 : '-12px' }}
                      className="w-11 h-11 rounded-full border-2 border-[var(--color-white)] overflow-hidden shrink-0 relative bg-[var(--color-tile)] aspect-square"
                    >
                      {!avatarErrors[i] ? (
                        <img
                          src={src}
                          alt=""
                          width={44}
                          height={44}
                          loading="lazy"
                          decoding="async"
                          onError={() => setAvatarErrors((prev) => ({ ...prev, [i]: true }))}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--color-tile)]" />
                      )}
                    </div>
                  ))}
                  <div
                    style={{ marginLeft: '-12px' }}
                    className="w-11 h-11 rounded-full border-2 border-[var(--color-white)] bg-[var(--color-tile)] shrink-0 overflow-hidden"
                  />
                </div>
              </a>

              <span>{content.headline.line2}</span>
            </div>
          </h1>

          {/* Subline on tablet/mobile (< 1024px) rendered above buttons */}
          <p className="block lg:hidden mt-4 text-[0.875rem] font-[var(--font-sans)] font-normal text-[var(--color-white)] leading-[1.6] max-w-[420px]">
            {content.subline}
          </p>

          {/* 24px below headline: Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 font-[var(--font-sans)]">
            <a
              href="/contact"
              onClick={handleBookNow}
              className="h-[52px] px-8 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-[0.9375rem] flex items-center justify-center hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            >
              {content.buttonLabels.bookNow}
            </a>
          </div>
        </motion.div>

        {/* SUBLINE on Desktop (bottom-right of photo, 40px from bottom, 40px left of Notch B) */}
        <p className="hidden lg:block absolute bottom-10 right-[calc(clamp(260px,25%,340px)+40px)] z-10 max-w-[280px] text-[0.875rem] font-[var(--font-sans)] font-normal text-[var(--color-white)] leading-[1.6]">
          {content.subline}
        </p>

        {/* 3. NOTCH B (bottom-right announcement card on Desktop) with 3D Depth */}
        <motion.aside
          style={
            isMotionDisabled
              ? undefined
              : {
                  y: notchY,
                  z: notchZ,
                  scale: notchScale,
                  willChange: 'transform',
                }
          }
          className="hidden lg:flex absolute bottom-0 right-0 z-20 w-[clamp(260px,25%,340px)] h-[52%] bg-[var(--color-bg)] p-5 rounded-tl-[24px] flex-col justify-between border-none"
          aria-label="New Location Announcement"
        >
          {/* Notch B Inverted Concave Corner (Top-Right outer edge) */}
          <div
            className="absolute bottom-full right-0 w-6 h-6 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle 24px at 0 0, transparent 23.5px, var(--color-bg-warm) 24px)',
            }}
            aria-hidden="true"
          />

          {/* Notch B Inverted Concave Corner (Bottom-Left outer edge) */}
          <div
            className="absolute bottom-0 right-full w-6 h-6 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle 24px at 0 0, transparent 23.5px, var(--color-bg-warm) 24px)',
            }}
            aria-hidden="true"
          />

          {/* Top text and 40px circle button */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="text-[0.8125rem] font-[var(--font-sans)] font-medium text-[var(--color-charcoal)] leading-[1.5]">
              {content.announcementText.text}
            </p>
            <a
              href="/contact"
              onClick={handleBookNow}
              aria-label="Book a free tour"
              className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] flex items-center justify-center shrink-0 hover:scale-105 transition-transform focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Thumbnail Image with "Visit Us" tab */}
          <div className="relative flex-1 rounded-[20px] overflow-hidden min-h-[120px] bg-[var(--color-tile)]">
            {!newLocationError && (
              <img
                src={content.newLocationImage}
                alt="Open workspace with desks and a view of the city"
                width={300}
                height={160}
                fetchPriority="high"
                decoding="async"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
                onError={() => setNewLocationError(true)}
              />
            )}

            {/* "New Location" tab sitting in thumbnail's bottom-left corner */}
            <div className="absolute bottom-0 left-0 bg-[var(--color-bg)] pt-2 pr-5 rounded-tr-[20px] z-10 select-none">
              <span
                style={{
                  textAlign: 'center',
                  marginLeft: '8px',
                  marginBottom: '4px',
                }}
                className="font-heading text-[1.5rem] font-normal text-[var(--color-charcoal)] leading-none block"
              >
                {content.announcementText.label}
              </span>

              {/* Concave inverted corner above the tab on thumbnail's left edge */}
              <div
                className="absolute bottom-full left-0 w-5 h-5 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle 20px at 20px 0, transparent 19.5px, var(--color-bg) 20px)',
                }}
                aria-hidden="true"
              />

              {/* Concave inverted corner to the right of the tab on thumbnail's bottom edge */}
              <div
                className="absolute bottom-0 left-full w-5 h-5 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle 20px at 0 0, transparent 19.5px, var(--color-bg) 20px)',
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.aside>
      </motion.div>

      {/* Notch B on Tablet / Mobile (< 1024px): Separate full-width card below hero card */}
      <motion.aside
        style={
          isMotionDisabled
            ? undefined
            : {
                y: tabletCardY,
                willChange: 'transform',
              }
        }
        className="block lg:hidden mt-6 max-w-[1400px] mx-auto bg-[var(--color-bg)] rounded-[24px] p-5 border border-[var(--color-border)]"
        aria-label="New Location Announcement"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <p className="text-[0.8125rem] font-[var(--font-sans)] font-medium text-[var(--color-charcoal)] leading-[1.5]">
            {content.announcementText.text}
          </p>
          <a
            href="/contact"
            onClick={handleBookNow}
            aria-label="Book a free tour"
            className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] flex items-center justify-center shrink-0 hover:scale-105 transition-transform focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="relative h-[200px] rounded-[20px] overflow-hidden bg-[var(--color-tile)]">
          {!newLocationError && (
            <img
              src={content.newLocationImage}
              alt="Open workspace with desks and a view of the city"
              width={340}
              height={200}
              fetchPriority="high"
              decoding="async"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
                display: 'block',
              }}
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              onError={() => setNewLocationError(true)}
            />
          )}

          <div className="absolute bottom-0 left-0 bg-[var(--color-bg)] pt-2 pr-5 rounded-tr-[20px] z-10 select-none">
            <span
              style={{
                marginLeft: '11px',
              }}
              className="font-heading text-[1.5rem] font-normal text-[var(--color-charcoal)] leading-none block"
            >
              {content.announcementText.label}
            </span>

            <div
              className="absolute bottom-full left-0 w-5 h-5 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle 20px at 20px 0, transparent 19.5px, var(--color-bg) 20px)',
              }}
              aria-hidden="true"
            />

            <div
              className="absolute bottom-0 left-full w-5 h-5 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle 20px at 0 0, transparent 19.5px, var(--color-bg) 20px)',
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.aside>

      {/* Full-Screen Menu / Search Overlay */}
      {isOverlayOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={isSearchActive ? 'Search Menu' : 'Navigation Menu'}
          className="fixed inset-0 z-50 bg-[var(--color-charcoal)] text-[var(--color-white)] flex flex-col justify-between p-8 sm:p-12 animate-fadeIn"
        >
          {/* Overlay Top Bar: Search Input (if active) + Close Button */}
          <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto w-full">
            {isSearchActive ? (
              <div className="flex-1 relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu..."
                  aria-label="Filter navigation links"
                  className="w-full bg-transparent border-b border-[var(--color-border)]/30 py-3 text-xl text-[var(--color-white)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] font-[var(--font-sans)]"
                />
              </div>
            ) : (
              <a
                href="#"
                onClick={() => setIsOverlayOpen(false)}
                className="flex items-center focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 rounded"
                aria-label={`${content.brandName} Home`}
              >
                {!overlayLogoError ? (
                  <img
                    src={content.logoLight || content.logo}
                    alt={content.brandName}
                    width="150"
                    height="30"
                    decoding="async"
                    onError={() => setOverlayLogoError(true)}
                    className="h-[30px] w-auto object-contain block"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : (
                  <span className="font-heading text-xl text-[var(--color-muted)]">
                    {content.brandName}
                  </span>
                )}
              </a>
            )}

            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={() => {
                setIsOverlayOpen(false);
                setIsSearchActive(false);
                setSearchQuery('');
              }}
              className="w-11 h-11 flex items-center justify-center text-[var(--color-white)] hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 shrink-0"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Centered List of Links in Gelasio 2.5rem white */}
          <nav className="my-auto max-w-2xl mx-auto w-full text-center py-6">
            <ul className="space-y-4 sm:space-y-6">
              {filteredMenuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      setIsOverlayOpen(false);
                      setIsSearchActive(false);
                      setSearchQuery('');
                      if (item.isAboutPage && onNavigate) {
                        e.preventDefault();
                        onNavigate('about');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="font-heading text-3xl sm:text-[2.5rem] font-normal text-[var(--color-white)] hover:text-[var(--color-primary)] transition-colors leading-[1.15] block py-1 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              {filteredMenuItems.length === 0 && (
                <li className="text-[var(--color-muted)] text-base font-[var(--font-sans)]">
                  No matching sections found.
                </li>
              )}
            </ul>
          </nav>

          {/* Overlay Bottom Footer Info */}
          <div className="max-w-4xl mx-auto w-full text-center text-xs text-[var(--color-text-on-dark)] pt-4 border-t border-[var(--color-border)]/10 font-[var(--font-sans)]">
            <span>{content.brandName} Flexible Workspaces & Coworking</span>
          </div>
        </div>
      )}
    </section>
  );
};
