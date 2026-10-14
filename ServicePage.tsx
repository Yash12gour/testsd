import React, { useState } from 'react';
import {
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  ArrowRight,
  Building2,
  Clock,
  Briefcase,
} from 'lucide-react';
import { brandName } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Tilt3D } from './Tilt3D';
import { Scroll3D, ScrollCard3D, ScrollImageDepth, ScrollParallax3D } from './motion';
import { SEO } from './SEO';
import { CountUpNumber } from './CountUpNumber';

interface ServicePageProps {
  onBookTourClick: (workspaceId?: string) => void;
  onExploreSpacesClick: () => void;
  onNavigateHome: () => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({
  onBookTourClick,
  onNavigateHome,
}) => {
  const [activeServiceTab, setActiveServiceTab] = useState(0);

  // 3. Tab labels in exact required order:
  // Private Office Suite, Dedicated Desk, Managed Office, Private Cabin, Meeting Room, Conference Room
  const services = [
    {
      id: 'private-office-suite',
      title: 'Private Office Suite',
      tabLabel: 'Private Office Suite',
      smallLabel: 'For Growing Companies',
      price: '₹50,000 / month',
      buttonText: 'Book This Space Tour',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=85',
      paragraph: 'A fully customized workspace for growing companies and branch offices, with dedicated facility support from our team.',
      checklist: [
        'Customized layout for your team',
        'Dedicated facility support',
        'Fast dual fiber internet with full power backup',
      ],
      workspaceId: 'private-office-suite',
    },
    {
      id: 'dedicated-desk',
      title: 'Dedicated Desk',
      tabLabel: 'Dedicated Desk',
      smallLabel: 'For Solo Creators & Remote Pros',
      price: '₹5,000 / month',
      buttonText: 'Book This Space Tour',
      image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1400&q=85',
      paragraph: 'Your own reserved desk in our open collaborative zone, ready for you every morning.',
      checklist: [
        'Ergonomic chair and storage locker',
        'Meeting room credits',
        '24/7 access',
      ],
      workspaceId: 'dedicated-desk',
    },
    {
      id: 'managed-office',
      title: 'Managed Office',
      tabLabel: 'Managed Office',
      smallLabel: 'For Enterprises & Teams',
      price: '₹75,000 / month',
      buttonText: 'Book This Space Tour',
      image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=85',
      paragraph: 'A fully managed, custom-built office tailored for enterprises and growing companies with dedicated operations support.',
      checklist: [
        'Tailored layout & branding',
        'Dedicated operations & facility manager',
        'High-speed enterprise fiber & backup',
      ],
      workspaceId: 'managed-office',
    },
    {
      id: 'private-cabin',
      title: 'Private Cabin',
      tabLabel: 'Private Cabin',
      smallLabel: 'For Startups & Small Teams',
      price: '₹25,000 / month',
      buttonText: 'Book This Space Tour',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
      paragraph: 'A lockable cabin for your small team, with acoustic privacy and your own whiteboard.',
      checklist: [
        'Lockable, private cabin',
        'Acoustic privacy and whiteboards',
        'Space for your own branding',
      ],
      workspaceId: 'private-cabin',
    },
    {
      id: 'meeting-room',
      title: 'Meeting Room',
      tabLabel: 'Meeting Room',
      smallLabel: 'For Pitches & Reviews',
      price: 'Ask for rates',
      buttonText: 'Ask About This Space',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1400&q=85',
      paragraph: 'A soundproof room for client pitches, internal reviews and video conferences.',
      checklist: [
        'Soundproof space',
        'Smart presentation display',
        'High-definition conferencing equipment',
      ],
      workspaceId: 'meeting-room',
    },
    {
      id: 'conference-room',
      title: 'Conference Room',
      tabLabel: 'Conference Room',
      smallLabel: 'For Workshops & Events',
      price: 'Custom / hourly rates',
      buttonText: 'Ask About This Space',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1400&q=85',
      paragraph: 'A large conference setup that fits up to 25 people, built for seminars and workshops.',
      checklist: [
        'Seats up to 25 attendees',
        'Surround sound, dual monitors and projector support',
        'Executive seating',
      ],
      workspaceId: 'conference-room',
    },
  ];

  return (
    <div className="w-full font-[var(--font-sans)] bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] fade-in-up">
      {/* SEO META */}
      <SEO
        title="Workspace Services in Bhopal | SpaceDesk Co-Working"
        description="Day pass from ₹499, dedicated desks, private cabins, meeting and conference rooms in Misrod, Bhopal. Fast fiber internet and full power backup. Book a free tour."
        ogTitle="Workspace Services in Bhopal | SpaceDesk Co-Working"
        ogDescription="Day pass from ₹499, dedicated desks, private cabins, meeting and conference rooms in Misrod, Bhopal. Fast fiber internet and full power backup. Book a free tour."
        ogImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85"
        canonicalUrl="/#services"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Coworking and Flexible Office Space',
          provider: {
            '@type': 'Organization',
            name: brandName,
          },
          areaServed: 'Bhopal, India',
          description: 'Day pass from ₹499, dedicated desks, private cabins, meeting and conference rooms in Misrod, Bhopal.',
        }}
      />

      {/* Breadcrumb / Page Status Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-4 flex items-center justify-between text-xs text-[var(--color-muted)]">
        <div className="flex items-center gap-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            aria-label="Navigate to Home"
            className="hover:text-[var(--color-charcoal)] transition-colors underline-offset-4 hover:underline"
          >
            Home
          </a>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[var(--color-charcoal)]">Our Services</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Bhopal
        </span>
      </div>

      {/* 1. HERO */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 md:pb-24 relative">
        {/* Subtle Background 3D Parallax Accent Element */}
        <div className="absolute -top-10 -right-12 w-72 h-72 rounded-full bg-gradient-to-tr from-[var(--color-primary)]/10 via-[var(--color-gold)]/10 to-transparent blur-2xl pointer-events-none hidden md:block">
          <ScrollParallax3D speed={-0.12} depth={30} rotateXAmount={4} rotateYAmount={6}>
            <div className="w-full h-full rounded-3xl border border-[var(--color-gold)]/20 transform rotate-12" />
          </ScrollParallax3D>
        </div>

        <Scroll3D preset="hero" intensity="subtle">
          <Reveal variant="fade">
            <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-6 sm:p-12 lg:p-16 border border-[var(--color-border)] shadow-xl group">
              {/* Background Ambient Imagery */}
              <div className="absolute inset-0 z-0">
                <ScrollImageDepth depth={14} rotateAmount={1.2}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85"
                    alt="SpaceDesk coworking space services in Bhopal"
                    fallbackTitle="SpaceDesk Services"
                    theme="dark"
                    containerClassName="w-full h-full"
                    className="object-cover object-center filter brightness-90 transition-transform duration-1000 group-hover:scale-105"
                  />
                </ScrollImageDepth>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/60 pointer-events-none" />
              </div>

              {/* Eyebrow badge & Top-right small tag text */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-semibold uppercase tracking-wider shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
                  Workspace Services in Bhopal
                </span>
              </div>

              {/* Main Headline (H1 Hero Heading) */}
              <div className="relative z-10 mt-10 sm:mt-16 max-w-3xl">
                <h1 className="font-heading text-[clamp(2.125rem,6vw,4.5rem)] font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                  Coworking space services in Bhopal.{' '}
                  <span className="italic text-[var(--color-primary)]">
                    Built for how you work.
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-xl text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                  From a single day pass to a private office for your whole team. Pick the desk, cabin or room that fits your day, and get to work.
                </p>

                {/* CTAs */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onBookTourClick();
                    }}
                    className="group px-8 py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[var(--color-charcoal)] group-hover:rotate-6 transition-transform duration-300" aria-hidden="true" />
                    <span>Book a Free Tour</span>
                  </a>
                  <a
                    href="#directory"
                    className="group px-8 py-4 rounded-full border border-[var(--color-white)] text-[var(--color-white)] hover:bg-white/10 hover:border-white font-semibold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Explore Workspaces</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--color-white)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Stats row (four items: value then label) */}
              <div className="relative z-10 mt-12 pt-8 border-t border-[var(--color-border)]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[var(--color-text-on-dark)]">
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    6
                  </span>
                  <span className="mt-1 block">Workspace Types</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    24/7
                  </span>
                  <span className="mt-1 block">Access for Desk &amp; Cabin Members</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    300 Mbps
                  </span>
                  <span className="mt-1 block">Dual Fiber Internet</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="2+ Years" delay={300} duration={1600} />
                  </span>
                  <span className="mt-1 block">Running in Bhopal</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Scroll3D>
      </section>

      {/* 2. ECOSYSTEM INTRO SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Scroll3D preset="section" intensity="subtle">
          <Reveal variant="up" className="max-w-2xl mb-12">
            <span className="section-label text-xs block mb-3">
              Everything In One Place
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--color-charcoal)] leading-tight text-balance">
              A complete workspace for your growth.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* Card 1: Managed Office */}
            <Reveal variant="up" delay={50} className="h-full">
              <ScrollCard3D index={0} total={3} depth={15}>
                <Tilt3D maxTilt={3} scale={1.02} className="h-full bg-[var(--color-white)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[var(--color-gold)]/40 transition-all duration-300 group">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] transition-all duration-300">
                      <Clock className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-gold)] block mb-1">
                      Managed Office &amp; Desks
                    </span>
                    <h3 className="card-title text-xl mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                      Managed Office &amp; Dedicated Desks
                    </h3>
                    <p className="text-sm text-[var(--color-text)] leading-relaxed">
                      Walk in to reserve your own desk for the month. Fast Wi-Fi, tea and coffee included.
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[var(--color-border)]/60 text-xs font-semibold text-[var(--color-charcoal)] flex items-center justify-between">
                    <a
                      href="#comparison"
                      aria-label="See desk plans for Flexible Day Pass and Dedicated Desks"
                      className="hover:text-[var(--color-gold)] transition-colors flex items-center justify-between w-full"
                    >
                      <span>See desk plans</span>
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)] group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
                    </a>
                  </div>
                </Tilt3D>
              </ScrollCard3D>
            </Reveal>

            {/* Card 2: Private Spaces (dark highlighted middle card) */}
            <Reveal variant="up" delay={120} className="h-full">
              <ScrollCard3D index={1} total={3} depth={15}>
                <Tilt3D maxTilt={3} scale={1.02} className="h-full bg-[var(--color-charcoal)] text-[var(--color-white)] rounded-[28px] border border-[var(--color-border)]/20 p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-2xl hover:border-[var(--color-primary)]/40 transition-all duration-300 group">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)] text-[var(--color-charcoal)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Building2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-primary)] block mb-1">
                      Private Spaces
                    </span>
                    <h3 className="font-[var(--font-sans)] font-semibold text-xl text-[var(--color-white)] mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                      Lockable Cabins &amp; Office Suites
                    </h3>
                    <p className="text-sm text-[var(--color-text-on-dark)] leading-relaxed">
                      Private, lockable spaces with acoustic privacy for small teams and growing companies.
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[var(--color-border)]/20 text-xs font-semibold text-[var(--color-primary)] flex items-center justify-between">
                    <a
                      href="#comparison"
                      aria-label="See private spaces for Lockable Cabins and Office Suites"
                      className="hover:underline flex items-center justify-between w-full"
                    >
                      <span>See private spaces</span>
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
                    </a>
                  </div>
                </Tilt3D>
              </ScrollCard3D>
            </Reveal>

            {/* Card 3: Meet & Present */}
            <Reveal variant="up" delay={190} className="h-full">
              <ScrollCard3D index={2} total={3} depth={15}>
                <Tilt3D maxTilt={3} scale={1.02} className="h-full bg-[var(--color-white)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[var(--color-gold)]/40 transition-all duration-300 group">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] transition-all duration-300">
                      <Briefcase className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-gold)] block mb-1">
                      Meet &amp; Present
                    </span>
                    <h3 className="card-title text-xl mb-3 group-hover:text-[var(--color-gold)] transition-colors">
                      Meeting &amp; Conference Rooms
                    </h3>
                    <p className="text-sm text-[var(--color-text)] leading-relaxed">
                      Soundproof rooms for client pitches, team reviews and workshops for up to 25 people.
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[var(--color-border)]/60 text-xs font-semibold text-[var(--color-charcoal)] flex items-center justify-between">
                    <a
                      href="#comparison"
                      aria-label="See meeting rooms for pitches and workshops"
                      className="hover:text-[var(--color-gold)] transition-colors flex items-center justify-between w-full"
                    >
                      <span>See meeting rooms</span>
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)] group-hover:scale-125 transition-transform duration-300" aria-hidden="true" />
                    </a>
                  </div>
                </Tilt3D>
              </ScrollCard3D>
            </Reveal>
          </div>
        </Scroll3D>
      </section>

      {/* 3. EXPLORE OUR 6 CORE WORKSPACE SERVICES TABS SECTION */}
      <section id="directory" className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-24 md:pb-32">
        <Scroll3D preset="section" intensity="subtle">
          <Reveal variant="up" className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-label text-xs block mb-3">
              Service Directory
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--color-charcoal)] leading-tight">
              Explore our 6 core workspace services.
            </h2>
          </Reveal>

          {/* Service Navigation Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-6">
            {services.map((svc, idx) => (
              <button
                key={svc.id}
                type="button"
                onClick={() => setActiveServiceTab(idx)}
                aria-label={`View details for ${svc.tabLabel}`}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeServiceTab === idx
                    ? 'bg-[var(--color-charcoal)] text-[var(--color-white)] shadow-md scale-105'
                    : 'bg-[var(--color-white)] text-[var(--color-text)] hover:bg-[var(--color-tile)] hover:text-[var(--color-charcoal)] hover:scale-105 border border-[var(--color-border)]'
                }`}
              >
                {svc.tabLabel}
              </button>
            ))}
          </div>

          {/* Line under the tabs */}
          <div className="text-center text-xs text-[var(--color-muted)] font-medium mb-10">
            Pick a space to see what&apos;s included.
          </div>

          {/* Selected Service Detailed Showcase */}
          <ScrollCard3D index={0} total={1} depth={18}>
            <Reveal variant="scale" className="bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 group">
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[500px] overflow-hidden">
                <ScrollImageDepth depth={16} rotateAmount={1.5}>
                  <ImageWithFallback
                    src={services[activeServiceTab].image}
                    alt={`${services[activeServiceTab].title} at SpaceDesk coworking space, Misrod, Bhopal`}
                    fallbackTitle={services[activeServiceTab].title}
                    theme="cream"
                    containerClassName="w-full h-full min-h-[380px] sm:min-h-[500px]"
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </ScrollImageDepth>
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[var(--color-charcoal)]/90 backdrop-blur-md text-[var(--color-primary)] font-semibold text-xs border border-white/20 transition-transform duration-300 hover:scale-105">
                  {services[activeServiceTab].smallLabel}
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-[var(--color-white)]">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="section-label text-xs">
                      {services[activeServiceTab].smallLabel}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl text-[var(--color-charcoal)] mb-2 font-normal">
                    {services[activeServiceTab].title}
                  </h3>

                  <div className="text-sm font-semibold text-[var(--color-charcoal)] mb-4">
                    {services[activeServiceTab].price}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed mb-6">
                    {services[activeServiceTab].paragraph}
                  </p>

                  <div className="space-y-3 pt-2">
                    {services[activeServiceTab].checklist.map((item, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[var(--color-text)] hover:text-[var(--color-charcoal)] transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-[var(--color-border)] mt-8">
                  <button
                    type="button"
                    onClick={() => onBookTourClick(services[activeServiceTab].workspaceId)}
                    aria-label={`${services[activeServiceTab].buttonText} - ${services[activeServiceTab].title}`}
                    className="group w-full py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>{services[activeServiceTab].buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--color-charcoal)] group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Reveal>
          </ScrollCard3D>
        </Scroll3D>
      </section>
    </div>
  );
};
