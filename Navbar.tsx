import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Calendar, ChevronDown } from 'lucide-react';
import { logo, brandName } from '../data/content';

export type AppPageType =
  | 'home'
  | 'about'
  | 'service'
  | 'pricing'
  | 'contact'
  | 'events'
  | 'amenities'
  | 'blogs'
  | 'gallery'
  | 'faqs'
  | 'privacy'
  | 'terms'
  | 'cookies';

interface NavbarProps {
  onBookTourClick: () => void;
  onDayPassClick: () => void;
  currentPage?: AppPageType;
  onNavigate?: (page: AppPageType, targetSectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBookTourClick,
  onDayPassClick,
  currentPage = 'home',
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileMoreExpanded, setMobileMoreExpanded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nextScrolled = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close More dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services', page: 'service' as AppPageType },
    { label: 'Pricing', href: '#pricing-page', page: 'pricing' as AppPageType },
    { label: 'About Us', href: '#about-page', page: 'about' as AppPageType },
    { label: 'Contact Us', href: '#contact-page', page: 'contact' as AppPageType },
  ];

  const moreSubLinks = [
    { label: 'Events', href: '#events-page', page: 'events' as AppPageType },
    { label: 'Amenities & Perks', href: '#amenities-page', page: 'amenities' as AppPageType },
    { label: 'Blogs & Articles', href: '#blog-page', page: 'blogs' as AppPageType },
    { label: 'Gallery', href: '#gallery-page', page: 'gallery' as AppPageType },
    { label: 'FAQs', href: '#faq-page', page: 'faqs' as AppPageType },
  ];

  const isMoreActive = ['events', 'amenities', 'blogs', 'gallery', 'faqs', 'privacy', 'terms', 'cookies'].includes(currentPage);

  const handleNavigatePage = (page: AppPageType, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMoreDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isStickyVisible = isScrolled || currentPage !== 'home';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out transform ${
          isStickyVisible
            ? 'translate-y-0 opacity-100 bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)] py-3 shadow-[0_4px_20px_rgba(31,32,34,0.06)]'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Brand Logo */}
          <a
            href="#"
            onClick={(e) => handleNavigatePage('home', e)}
            className="flex items-center gap-2 group focus:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 rounded"
            aria-label={`${brandName} Home`}
          >
            {!logoError ? (
              <img
                src={logo}
                alt={brandName}
                width="144"
                height="28"
                decoding="async"
                onError={() => setLogoError(true)}
                className="h-[28px] w-auto max-w-[150px] object-contain block"
                style={{ imageRendering: 'auto' }}
              />
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-gold)] group-hover:scale-125 transition-transform" />
                <span className="font-[var(--font-sans)] text-xl font-semibold tracking-tight text-[var(--color-charcoal)]">
                  {brandName.toUpperCase()}
                </span>
              </div>
            )}
          </a>

          {/* Zone 2: Navigation Links with More Dropdown */}
          <nav className="hidden lg:flex items-center gap-8 font-[var(--font-sans)]">
            {navLinks.map((link) => {
              const isCurrentActive = currentPage === link.page;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavigatePage(link.page, e)}
                  className={`text-sm font-medium transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[var(--color-primary)] after:transition-all after:duration-200 ${
                    isCurrentActive
                      ? 'text-[var(--color-charcoal)] font-semibold after:w-full'
                      : 'text-[var(--color-text)] hover:text-[var(--color-charcoal)] after:w-0 hover:after:w-full'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* MORE DROPDOWN (Desktop) */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={moreDropdownOpen}
                className={`text-sm font-medium transition-colors flex items-center gap-1.5 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-sm relative group/more after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-[var(--color-primary)] after:transition-all after:duration-200 ${
                  isMoreActive
                    ? 'text-[var(--color-charcoal)] font-semibold after:w-full'
                    : 'text-[var(--color-text)] hover:text-[var(--color-charcoal)] after:w-0 hover:after:w-full'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180 text-[var(--color-charcoal)]' : 'text-[var(--color-muted)] group-hover/more:text-[var(--color-charcoal)]'
                  }`}
                />
              </button>

              {/* Dropdown Panel with top padding bridge to prevent mouse cursor gap disconnect */}
              <div
                className={`absolute top-full right-0 pt-2 w-56 z-50 transition-all duration-200 origin-top-right ${
                  moreDropdownOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="bg-white rounded-2xl border border-[var(--color-border)] shadow-xl py-2">
                  {moreSubLinks.map((subLink) => {
                    const isSubActive = currentPage === subLink.page;
                    return (
                      <a
                        key={subLink.label}
                        href={subLink.href}
                        onClick={(e) => handleNavigatePage(subLink.page, e)}
                        className={`block px-4 py-2.5 text-xs font-medium transition-colors ${
                          isSubActive
                            ? 'bg-[var(--color-bg-warm)] text-[var(--color-primary)] font-semibold border-l-2 border-[var(--color-primary)]'
                            : 'text-[var(--color-charcoal)] hover:bg-[var(--color-bg-warm)] hover:text-[var(--color-primary)]'
                        }`}
                      >
                        {subLink.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3 font-[var(--font-sans)]">
            <button
              onClick={onBookTourClick}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[var(--color-charcoal)] bg-[var(--color-primary)] hover:opacity-90 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <span>Book a Free Tour</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[var(--color-charcoal)]" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2 font-[var(--font-sans)]">
            <button
              onClick={onBookTourClick}
              className="px-3.5 py-1.5 text-xs font-semibold text-[var(--color-charcoal)] bg-[var(--color-primary)] rounded-full whitespace-nowrap"
            >
              Tour
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--color-charcoal)] hover:bg-[var(--color-border)] rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with smooth slide-down animation */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed inset-0 z-50 lg:hidden font-[var(--font-sans)] transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer content sliding down from top */}
        <div
          className={`relative w-full max-h-[90vh] overflow-y-auto bg-[var(--color-charcoal)] text-[var(--color-white)] pt-16 px-6 pb-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out transform ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="space-y-6">
            <div className="section-label text-xs pb-2 border-b border-[var(--color-border)]/20">
              Navigation
            </div>
            <nav className="flex flex-col space-y-4 font-[var(--font-heading)]">
              {navLinks.map((link) => {
                const isCurrentActive = currentPage === link.page;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavigatePage(link.page, e)}
                    className={`text-2xl font-normal transition-colors ${
                      isCurrentActive
                        ? 'text-[var(--color-primary)] font-semibold'
                        : 'text-[var(--color-white)] hover:text-[var(--color-primary)]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* Mobile "More" Accordion */}
              <div className="pt-2 border-t border-[var(--color-border)]/20">
                <button
                  type="button"
                  onClick={() => setMobileMoreExpanded(!mobileMoreExpanded)}
                  className="w-full flex items-center justify-between text-2xl font-normal text-[var(--color-white)] hover:text-[var(--color-primary)] transition-colors py-1"
                >
                  <span className={isMoreActive ? 'text-[var(--color-primary)] font-semibold' : ''}>
                    More
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--color-primary)] transition-transform duration-300 ${
                      mobileMoreExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileMoreExpanded && (
                  <div className="mt-3 pl-4 space-y-3 border-l-2 border-[var(--color-primary)]/40 font-[var(--font-sans)] animate-in fade-in duration-200">
                    {moreSubLinks.map((subLink) => {
                      const isSubActive = currentPage === subLink.page;
                      return (
                        <a
                          key={subLink.label}
                          href={subLink.href}
                          onClick={(e) => handleNavigatePage(subLink.page, e)}
                          className={`block text-base font-normal transition-colors ${
                            isSubActive
                              ? 'text-[var(--color-primary)] font-semibold'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          {subLink.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-[var(--color-border)]/20 mt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookTourClick();
              }}
              className="w-full py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all"
            >
              <Calendar className="w-4 h-4 text-[var(--color-charcoal)]" />
              <span>Book a Free Tour</span>
            </button>
            <div className="text-center pt-2 text-xs text-[var(--color-text-on-dark)]">
              Open 24/7 for members · Drop-ins welcome
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

