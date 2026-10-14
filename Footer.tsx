import React, { useState } from 'react';
import { footerSection, brandName, logo } from '../data/content';
import { AppPageType } from './Navbar';

interface FooterProps {
  onNavigate?: (page: AppPageType) => void;
  currentPage?: AppPageType;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentPage }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="w-full bg-[var(--color-bg-warm)] border-t border-[var(--color-border)] py-8 font-[var(--font-sans)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[0.75rem] font-normal text-[var(--color-muted)]">
        {/* Left: Brand Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <a
            href="#"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center focus-ring rounded shrink-0"
            aria-label={`${brandName} Home`}
          >
            {!logoError ? (
              <img
                src={logo}
                alt={brandName}
                width="206"
                height="40"
                decoding="async"
                onError={() => setLogoError(true)}
                className="h-[36px] sm:h-[40px] w-auto max-w-[180px] sm:max-w-[206px] object-contain block"
              />
            ) : (
              <span className="font-heading text-lg font-normal text-[var(--color-charcoal)]">
                {brandName}
              </span>
            )}
          </a>
          <p className="text-center sm:text-left leading-relaxed">
            {currentPage === 'service' || currentPage === 'about' || currentPage === 'events' || currentPage === 'amenities' || currentPage === 'gallery' || currentPage === 'faqs'
              ? '© 2026 SpaceDesk Co-Working. Coworking space in Bhopal. All rights reserved.'
              : footerSection.copyright || `© 2026 ${brandName}. All rights reserved.`}
          </p>
        </div>

        {/* Right: Policy Links */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2.5 text-center">
          <a
            href="#services"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('service');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="hover:text-[var(--color-charcoal)] transition-colors focus-ring rounded text-left"
          >
            Our Services
          </a>
          <a
            href="#pricing-page"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('pricing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="hover:text-[var(--color-charcoal)] transition-colors focus-ring rounded text-left"
          >
            Pricing &amp; Plans
          </a>
          <a
            href="#about-page"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="hover:text-[var(--color-charcoal)] transition-colors focus-ring rounded text-left"
          >
            About SpaceDesk
          </a>
          {footerSection.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.label.toLowerCase().includes('privacy') && onNavigate) {
                  e.preventDefault();
                  onNavigate('privacy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (link.label.toLowerCase().includes('terms') && onNavigate) {
                  e.preventDefault();
                  onNavigate('terms');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if ((link.label.toLowerCase().includes('cookie') || link.href === '#cookies') && onNavigate) {
                  e.preventDefault();
                  onNavigate('cookies');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="hover:text-[var(--color-charcoal)] transition-colors focus-ring rounded"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
