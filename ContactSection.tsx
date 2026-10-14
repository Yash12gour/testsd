import React, { useState, useRef } from 'react';
import { contactSection, brandName } from '../data/content';
import { Reveal } from './Reveal';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { Scroll3D, ScrollCard3D } from './motion';

export const ContactSection: React.FC = React.memo(() => {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [photoError, setPhotoError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoModalRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // Pause card background video when not in viewport
  React.useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Newsletter submission
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setFormState('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setFormState('loading');
    setStatusMessage('');

    const whatsappNumber = '919232942092';
    const messageText = `Hello SpaceDesk,\n\nI would like to connect regarding SpaceDesk Coworking:\n• Email: ${email}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    try {
      const endpoint = import.meta.env?.VITE_FORM_ENDPOINT || '/api/newsletter';
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'newsletter',
          email,
          whatsapp: '+91 92329 42092',
          to: 'info@spacedesk.in',
        }),
      }).catch(() => {});
    } catch {
      // Fallback
    }

    setFormState('success');
    setStatusMessage('Thank you! Opening WhatsApp (+91 92329 42092)...');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setEmail('');
  };

  const handleCloseVideo = () => {
    if (videoModalRef.current) {
      videoModalRef.current.pause();
    }
    setIsVideoModalOpen(false);
  };

  // Close video modal on Escape key and lock body scroll
  React.useEffect(() => {
    if (!isVideoModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVideoModalOpen]);

  return (
    <ScrollReveal as="section" id="contact" aria-labelledby="contact-heading" className="py-16 md:py-24 font-[var(--font-sans)]">
      <Scroll3D preset="section" className="w-full">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Two-column grid (42% / 58%, 40px gap) on desktop, 1 col <900px */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column (42% approx -> lg:col-span-5) */}
          <ScrollRevealItem delay={40} className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Heading: Gelasio 400 clamp(1.75rem, 3vw, 2.5rem), line-height 1.15, charcoal */}
              <h2
                id="contact-heading"
                className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-normal text-[var(--color-charcoal)] leading-[1.15] tracking-tight text-balance"
              >
                {contactSection.heading}
              </h2>

              {/* Paragraph, 16px below: Montserrat 400 0.75rem var(--color-text), max-w 360px */}
              <p className="mt-4 text-[0.75rem] font-normal text-[var(--color-text)] leading-relaxed max-w-[360px]">
                {contactSection.paragraph}
              </p>

              {/* Three contact rows (margin-top 32px): phone, email, address */}
              <div className="mt-8 space-y-3.5 max-w-[360px]">
                {/* Phone */}
                <div className="flex items-center justify-between text-[var(--color-charcoal)] border-b border-[var(--color-border)]/40 pb-2.5">
                  <svg
                    className="w-4 h-4 stroke-[1.5] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a
                    href="tel:+919232942092"
                    className="text-[0.8125rem] font-medium text-right hover:underline"
                  >
                    {contactSection.details.phone}
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between text-[var(--color-charcoal)] border-b border-[var(--color-border)]/40 pb-2.5">
                  <svg
                    className="w-4 h-4 stroke-[1.5] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a
                    href={`mailto:${contactSection.details.email}`}
                    className="text-[0.8125rem] font-medium text-right hover:underline"
                  >
                    {contactSection.details.email}
                  </a>
                </div>

                {/* Address */}
                <div className="flex items-center justify-between text-[var(--color-charcoal)] border-b border-[var(--color-border)]/40 pb-2.5">
                  <svg
                    className="w-4 h-4 stroke-[1.5] shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-[0.8125rem] font-medium text-right">
                    {contactSection.details.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Three Link Columns (margin-top auto, 32px top margin) */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)] grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Company */}
              <div>
                <h4 className="text-[0.75rem] font-semibold text-[var(--color-charcoal)] uppercase tracking-wider mb-2.5 sm:mb-3">
                  {contactSection.links.company.title}
                </h4>
                <ul className="space-y-2">
                  {contactSection.links.company.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.6875rem] font-normal text-[var(--color-text)] hover:text-[var(--color-charcoal)] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community */}
              <div>
                <h4 className="text-[0.75rem] font-semibold text-[var(--color-charcoal)] uppercase tracking-wider mb-2.5 sm:mb-3">
                  {contactSection.links.community.title}
                </h4>
                <ul className="space-y-2">
                  {contactSection.links.community.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.6875rem] font-normal text-[var(--color-text)] hover:text-[var(--color-charcoal)] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-[0.75rem] font-semibold text-[var(--color-charcoal)] uppercase tracking-wider mb-2.5 sm:mb-3">
                  {contactSection.links.resources.title}
                </h4>
                <ul className="space-y-2">
                  {contactSection.links.resources.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.6875rem] font-normal text-[var(--color-text)] hover:text-[var(--color-charcoal)] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollRevealItem>

          {/* Right Column: Photo card (58% approx -> lg:col-span-7) with 3D depth */}
          <ScrollRevealItem delay={110} className="lg:col-span-7 h-full">
            <ScrollCard3D index={1} total={2} className="h-full">
              <div className="relative rounded-[28px] overflow-hidden min-h-[480px] max-sm:min-h-[360px] bg-[var(--color-charcoal)] border border-[var(--color-border)] shadow-md flex flex-col justify-between h-full">
            {/* Background video with fallback + rgba(31, 32, 34, 0.35) overlay */}
            {!videoError ? (
              <video
                ref={bgVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                onError={() => setVideoError(true)}
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
              >
                <source src={contactSection.video || contactSection.companyVideoSrc} type="video/mp4" />
              </video>
            ) : !photoError ? (
              <img
                src={contactSection.photo}
                alt="Workspace environment"
                loading="lazy"
                decoding="async"
                onError={() => setPhotoError(true)}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-[var(--color-charcoal)] z-0" />
            )}

            <div
              className="absolute inset-0 bg-[rgba(31,32,34,0.35)] z-[1] pointer-events-none"
              aria-hidden="true"
            />

            {/* Top-Right: Rotating Circular Text Badge (responsive size) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center select-none pointer-events-none">
              <svg
                className="w-16 h-16 sm:w-24 sm:h-24 animate-spin-slow text-white"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="font-semibold text-[0.625rem] tracking-[0.2em] fill-current uppercase">
                  <textPath href="#circlePath" startOffset="0%">
                    {brandName} • {brandName} • {brandName} •
                  </textPath>
                </text>
              </svg>
              {/* Thin white location icon in center */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <svg
                  className="w-5 h-5 stroke-[1.5]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </div>

            {/* Spacer */}
            <div className="h-24" />

            {/* Bottom-Left: Newsletter block over the image */}
            <div className="relative z-10 p-5 sm:p-10 pb-16 sm:pb-10 max-w-md">
              <h3 className="font-heading text-2xl font-normal text-white leading-tight">
                {contactSection.newsletterLabel}
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="mt-4 relative">
                <div className="flex items-center border-b border-white/60 pb-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={contactSection.newsletterPlaceholder}
                    disabled={formState === 'loading'}
                    aria-label="Newsletter email address"
                    className="w-full bg-transparent text-xs text-white placeholder:text-[var(--color-text-on-dark)] focus:outline-none font-[var(--font-sans)]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    disabled={formState === 'loading'}
                    className="w-8 h-8 flex items-center justify-center text-white hover:text-[var(--color-primary)] transition-colors shrink-0"
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
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
                {statusMessage && (
                  <p
                    className={`mt-2 text-[0.6875rem] font-medium ${
                      formState === 'error' ? 'text-[var(--color-primary)]' : 'text-[var(--color-primary)]'
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>

            {/* Bottom-Right Notch (fill var(--color-bg-warm)): "Play Company Video" */}
            <div
              onClick={() => setIsVideoModalOpen(true)}
              className="absolute bottom-0 right-0 z-10 bg-[var(--color-bg-warm)] py-3 px-5 sm:px-6 rounded-tl-[24px] flex items-center gap-2 cursor-pointer hover:bg-[var(--color-tile)] transition-colors select-none"
            >
              {/* Concave fillet top */}
              <div
                className="absolute bottom-full right-0 w-6 h-6 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle 24px at 0 0, transparent 23.5px, var(--color-bg-warm) 24px)',
                }}
                aria-hidden="true"
              />
              {/* Concave fillet left */}
              <div
                className="absolute bottom-0 right-full w-6 h-6 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle 24px at 0 0, transparent 23.5px, var(--color-bg-warm) 24px)',
                }}
                aria-hidden="true"
              />

              <span className="text-[0.75rem] font-medium text-[var(--color-charcoal)]">
                {contactSection.companyVideoText}
              </span>
              <svg
                className="w-2.5 h-2.5 fill-[var(--color-charcoal)] text-[var(--color-charcoal)] shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            </div>
          </ScrollCard3D>
        </ScrollRevealItem>
        </div>
      </div>
      </Scroll3D>

      {/* Video Modal Dialog */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Company Video"
          className="fixed inset-0 z-50 bg-[var(--color-charcoal)]/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleCloseVideo}
        >
          <div
            className="relative w-full max-w-4xl bg-[var(--color-charcoal)] rounded-[28px] overflow-hidden border border-[var(--color-border)]/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <video
              ref={videoModalRef}
              src={contactSection.companyVideoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-auto aspect-video object-cover"
            />
          </div>
        </div>
      )}
    </ScrollReveal>
  );
});

