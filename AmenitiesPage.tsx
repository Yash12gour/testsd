import React, { useState } from 'react';
import {
  Wifi,
  Coffee,
  Tv,
  Car,
  Printer,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Key,
  Users,
  Layers,
  LucideIcon,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Parallax } from './Parallax';
import { Scroll3D, ScrollCard3D, ScrollImageDepth, ScrollParallax3D } from './motion';
import { SEO } from './SEO';
import { CountUpNumber } from './CountUpNumber';

interface AmenitiesPageProps {
  onBookTourClick: () => void;
  onDayPassClick: () => void;
  onExploreSpacesClick: () => void;
  onNavigateHome: () => void;
}

interface AmenityDetail {
  id: string;
  tabLabel: string;
  title: string;
  category: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  specs: string[];
  imageUrl: string;
  imageAlt: string;
  badge: string;
  priceLine: string;
}

const AMENITY_SHOWCASE: AmenityDetail[] = [
  {
    id: 'internet-power',
    tabLabel: 'Internet & Power',
    title: '300 Mbps Dual Fiber & Full Power Backup',
    category: 'Internet & Power',
    icon: Wifi,
    tagline: 'Stay online through the whole workday.',
    description:
      'Fast internet and steady power matter most when you work. SpaceDesk runs dual fiber lines at 300 Mbps with load balancing and failover, backed by a heavy generator and an online UPS, so your calls and uploads keep going.',
    specs: [
      '300 Mbps symmetrical fiber',
      'Dual lines with load balancing and failover',
      'Industrial-grade generator and online UPS',
      'High-speed Wi-Fi in the workspace',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Desks with laptops and fast internet at SpaceDesk coworking space, Bhopal',
    badge: 'Internet & Power',
    priceLine: 'Try it for ₹499/day',
  },
  {
    id: 'space-deli',
    tabLabel: 'Refreshments',
    title: 'Refreshment: Tea, Coffee & Snacks',
    category: 'Cafeteria & Refreshments',
    icon: Coffee,
    tagline: 'Refreshments without leaving the building.',
    description:
      'Premium tea, artisanal coffee and fresh snacks are available inside the building, so a break never means a trip outside. Day pass guests get tea and coffee included.',
    specs: [
      'Premium tea',
      'Artisanal coffee',
      'Fresh snacks',
      'Tea and coffee included with the day pass',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Space Deli tea and coffee area at SpaceDesk coworking space, Misrod, Bhopal',
    badge: 'Cafeteria & Refreshments',
    priceLine: 'Day pass from ₹499',
  },
  {
    id: 'comfort-cleaning',
    tabLabel: 'Comfort & Cleaning',
    title: 'Ergonomic Seating & Daily Housekeeping',
    category: 'Comfort & Cleaning',
    icon: Sparkles,
    tagline: 'A clean, comfortable space, every day.',
    description:
      "You'll work at ergonomic desks and chairs in a space that's cleaned every day, so you can focus on your work and not on your surroundings.",
    specs: [
      'Ergonomic chairs at open and dedicated desks',
      'Daily professional cleaning',
      'Waste management',
      'Maintained executive washrooms',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Ergonomic desks and chairs at SpaceDesk coworking space, Bhopal',
    badge: 'Comfort & Cleaning',
    priceLine: 'Dedicated desk from ₹5,000/month',
  },
  {
    id: 'meeting-rooms',
    tabLabel: 'Meeting & Work Rooms',
    title: 'Cabins, Meeting Rooms & Conference Room',
    category: 'Meeting & Work Rooms',
    icon: Tv,
    tagline: 'The right room for the job.',
    description:
      'Take calls in a quiet cabin, pitch to clients in a soundproof meeting room, or run a workshop in our conference room for up to 25 people.',
    specs: [
      'Lockable private cabins with acoustic privacy and whiteboards',
      'Soundproof meeting room with a smart display',
      'Conference room for up to 25 with surround sound, dual monitors and projector support',
      'Meeting room credits with a Dedicated Desk',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Meeting room and private cabins at SpaceDesk coworking space, Misrod, Bhopal',
    badge: 'Meeting & Work Rooms',
    priceLine: 'Private cabins from ₹25,000/month',
  },
  {
    id: 'safety-access',
    tabLabel: 'Safety & Access',
    title: 'Biometric Access & CCTV',
    category: 'Safety & Access',
    icon: ShieldCheck,
    tagline: 'Come and go with peace of mind.',
    description:
      'Keycard and biometric entry control who comes in, and round-the-clock CCTV keeps the workspace and parking area under watch.',
    specs: [
      'Keycard and biometric access',
      'Round-the-clock CCTV',
      'Security surveillance in the parking area',
      '24/7 access for Dedicated Desk and Private Cabin members',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Entrance and security at SpaceDesk coworking space, Misrod, Bhopal',
    badge: 'Safety & Access',
    priceLine: 'Dedicated desk from ₹5,000/month',
  },
  {
    id: 'convenience',
    tabLabel: 'Convenience',
    title: 'Parking, Printing & Front Desk',
    category: 'Convenience',
    icon: Car,
    tagline: 'The little things, taken care of.',
    description:
      'Park your bike or car on site, print and scan when you need to, and let our front desk welcome your clients and handle your mail.',
    specs: [
      'Dedicated parking for two-wheelers and four-wheelers',
      'High-speed laser printing and scanning',
      'Front desk to welcome your clients',
      'Everyday mail delivery handled',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Front desk and printing area at SpaceDesk coworking space, Bhopal',
    badge: 'Convenience',
    priceLine: 'Day pass from ₹499',
  },
];

const VacuumIcon: React.FC<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> = ({
  className,
  'aria-hidden': ariaHidden,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden={ariaHidden}
  >
    {/* Vacuum canister base */}
    <rect width="11" height="7" x="3" y="14" rx="2.5" />
    {/* Wheels on canister */}
    <circle cx="5.5" cy="17.5" r="1" />
    <circle cx="11.5" cy="17.5" r="1" />
    {/* Canister handle */}
    <path d="M6 14v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
    {/* Hose looping up from back of canister */}
    <path d="M14 16c2.5 0 4.5-1.5 4.5-4s-2-4-4.5-4h-2" />
    {/* Handle / wand tube pointing down towards floor */}
    <path d="M12 8l8 11" />
    {/* Vacuum head / nozzle at floor */}
    <path d="M18 20h4" />
  </svg>
);

const EVERYTHING_INCLUDED = [
  {
    category: 'Connectivity',
    title: 'Fast Dual Fiber Wi-Fi',
    text: '300 Mbps symmetrical fiber with load balancing and failover redundancy.',
    icon: Wifi,
  },
  {
    category: 'Power',
    title: 'Full Power Backup',
    text: 'An industrial-grade generator and an online UPS keep the power on.',
    icon: Zap,
  },
  {
    category: 'Reception',
    title: 'Front Desk & Mail Support',
    text: 'A professional front desk welcomes your clients, handles everyday mail and helps with daily workspace needs.',
    icon: Users,
  },
  {
    category: 'Parking',
    title: 'Secure Onsite Parking',
    text: 'Dedicated parking for two-wheelers and four-wheelers, with security surveillance.',
    icon: Car,
  },
  {
    category: 'Food & Drinks',
    title: 'Cafeteria & Refreshments',
    text: 'Premium tea, artisanal coffee and fresh snacks, right inside the building.',
    icon: Coffee,
  },
  {
    category: 'Security',
    title: 'Biometric Access & CCTV',
    text: 'Keycard and biometric entry with round-the-clock CCTV. 24/7 access for Dedicated Desk and Private Cabin members.',
    icon: ShieldCheck,
  },
  {
    category: 'Cleaning',
    title: 'Housekeeping & Sanitization',
    text: 'Daily professional cleaning, waste management and maintained executive washrooms.',
    icon: VacuumIcon as unknown as LucideIcon,
  },
  {
    category: 'Office Support',
    title: 'Printing & Scanning',
    text: 'High-speed laser printing and scanning, with help from our reception.',
    icon: Printer,
  },
];

const EVERYDAY_COMFORTS = [
  {
    icon: Coffee,
    title: 'Tea & Coffee',
    text: 'Premium tea and artisanal coffee at the Space Deli.',
  },
  {
    icon: Zap,
    title: 'Power Backup',
    text: 'A generator and online UPS keep your devices running.',
  },
  {
    icon: Key,
    title: 'Storage Locker',
    text: 'A locker comes with every Dedicated Desk.',
  },
  {
    icon: Printer,
    title: 'Printing & Scanning',
    text: 'High-speed laser printing and scanning on site.',
  },
  {
    icon: Users,
    title: 'Meeting Room Credits',
    text: 'Included with a Dedicated Desk.',
  },
  {
    icon: Layers,
    title: 'Ergonomic Seating',
    text: 'Comfortable chairs at open and dedicated desks.',
  },
];

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({
  onBookTourClick,
  onDayPassClick,
  onExploreSpacesClick: _onExploreSpacesClick,
  onNavigateHome,
}) => {
  const [activeShowcaseIdx, setActiveShowcaseIdx] = useState<number>(0);
  const currentShowcase = AMENITY_SHOWCASE[activeShowcaseIdx];

  return (
    <div className="w-full bg-[var(--color-bg-warm)] min-h-screen text-[var(--color-charcoal)] font-[var(--font-sans)] pb-24 fade-in-up">
      <SEO
        title="Coworking Amenities in Bhopal | SpaceDesk Co-Working"
        description="300 Mbps dual fiber, full power backup, Space Deli, parking, biometric security and printing at SpaceDesk coworking in Misrod, Bhopal. Day pass from ₹499."
        ogTitle="Coworking Amenities in Bhopal | SpaceDesk Co-Working"
        ogDescription="300 Mbps dual fiber, full power backup, Space Deli, parking, biometric security and printing at SpaceDesk coworking in Misrod, Bhopal. Day pass from ₹499."
        ogImage="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80"
        canonicalUrl="/#amenities-page"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Coworking Amenities in Bhopal | SpaceDesk Co-Working',
          description:
            '300 Mbps dual fiber, full power backup, Space Deli, parking, biometric security and printing at SpaceDesk coworking in Misrod, Bhopal. Day pass from ₹499.',
        }}
      />

      {/* 0. BREADCRUMB NAVIGATION */}
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
          <span className="font-semibold text-[var(--color-charcoal)]">Amenities &amp; Perks</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Bhopal · Full Infrastructure
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 md:pb-24 relative">
        <div className="absolute -top-10 -right-12 w-72 h-72 rounded-full bg-gradient-to-tr from-[var(--color-primary)]/10 via-[var(--color-gold)]/10 to-transparent blur-2xl pointer-events-none hidden md:block">
          <ScrollParallax3D speed={-0.12} depth={30} rotateXAmount={4} rotateYAmount={6}>
            <div className="w-full h-full rounded-3xl border border-[var(--color-gold)]/20 transform rotate-12" />
          </ScrollParallax3D>
        </div>

        <Scroll3D preset="hero" perspective={1400} intensity="subtle">
          <Reveal variant="fade">
            <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-6 sm:p-12 lg:p-16 border border-[var(--color-border)] shadow-xl group">
              {/* Background Ambient Imagery with Dark Overlay */}
              <div className="absolute inset-0 z-0">
                <ScrollImageDepth depth={14} rotateAmount={1.2}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=2000&q=85"
                    alt="SpaceDesk coworking amenities in Bhopal"
                    fallbackTitle="SpaceDesk Amenities"
                    theme="dark"
                    containerClassName="w-full h-full"
                    className="object-cover object-center filter brightness-90 transition-transform duration-1000 group-hover:scale-105"
                  />
                </ScrollImageDepth>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/85 to-[var(--color-charcoal)]/65 pointer-events-none" />
              </div>

              {/* Eyebrow badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-semibold uppercase tracking-wider shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
                  Amenities &amp; Services
                </span>
              </div>

              {/* Main Headline */}
              <div className="relative z-10 mt-10 sm:mt-16 max-w-3xl">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                  Every amenity you need to{' '}
                  <span className="italic text-[var(--color-primary)]">
                    work better.
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-xl text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                  From 300 Mbps dual fiber and full power backup to Space Deli cafeteria, reserved parking, and front-desk concierge. Fully managed so you can just plug in and build.
                </p>

                {/* CTAs */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onBookTourClick()}
                    className="group px-8 py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[var(--color-charcoal)] group-hover:rotate-6 transition-transform duration-300" aria-hidden="true" />
                    <span>Book a Free Tour</span>
                  </button>
                  <a
                    href="#amenities-overview"
                    className="group px-8 py-4 rounded-full border border-[var(--color-white)] text-[var(--color-white)] hover:bg-white/10 hover:border-white font-semibold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Explore Amenities</span>
                    <ArrowRight className="w-4 h-4 text-[var(--color-white)] group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="relative z-10 mt-12 pt-8 border-t border-[var(--color-border)]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[var(--color-text-on-dark)]">
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="300 Mbps" delay={0} duration={1400} />
                  </span>
                  <span className="mt-1 block">Dual Fiber Internet</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="100%" delay={100} duration={1600} />
                  </span>
                  <span className="mt-1 block">Online UPS &amp; Generator</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="24/7" delay={200} duration={1600} />
                  </span>
                  <span className="mt-1 block">Biometric Keycard Access</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="Free" delay={300} duration={1400} />
                  </span>
                  <span className="mt-1 block">Tea, Coffee &amp; Parking</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Scroll3D>
      </section>

      {/* 2. EXPLORE CORE AMENITIES TABBED SHOWCASE */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <Scroll3D preset="section" intensity="subtle">
          <Reveal variant="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                  Amenities
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[var(--color-charcoal)] mt-1">
                  Explore our amenities
                </h2>
              </div>
              <p className="text-xs text-[var(--color-muted)] max-w-md">
                Pick a category to see what&apos;s available.
              </p>
            </div>
          </Reveal>

          {/* Tab Selector */}
          <Reveal delay={100} variant="up">
            <div
              role="tablist"
              aria-label="Amenities Categories"
              className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6"
            >
              {AMENITY_SHOWCASE.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeShowcaseIdx === idx;
                return (
                  <button
                    key={item.id}
                    id={`amenity-tab-${item.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`amenity-panel-${item.id}`}
                    type="button"
                    onClick={() => setActiveShowcaseIdx(idx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 ${
                      isActive
                        ? 'bg-[var(--color-charcoal)] text-white shadow-md scale-[1.02]'
                        : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-charcoal)] hover:bg-[var(--color-bg-warm)]'
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'}`}
                      aria-hidden="true"
                    />
                    <span>{item.tabLabel}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Active Amenity Spotlight Card */}
          <Reveal delay={150} variant="scale">
            <ScrollCard3D index={0} total={1} depth={18}>
              <div
                id={`amenity-panel-${currentShowcase.id}`}
                role="tabpanel"
                aria-labelledby={`amenity-tab-${currentShowcase.id}`}
                className="group rounded-3xl bg-white border border-[var(--color-border)] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Image Side */}
                  <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[460px] overflow-hidden">
                    <ScrollImageDepth depth={16}>
                      <ImageWithFallback
                        src={currentShowcase.imageUrl}
                        alt={currentShowcase.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                    </ScrollImageDepth>
                    <div className="absolute top-5 left-5">
                      <span className="px-3.5 py-1 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-bold uppercase tracking-wider shadow group-hover:scale-105 transition-transform">
                        {currentShowcase.badge}
                      </span>
                    </div>
                  </div>

                  {/* Text Side */}
                  <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                        {currentShowcase.category}
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-medium text-[var(--color-charcoal)] mt-2 leading-tight">
                        {currentShowcase.title}
                      </h3>
                      <p className="text-xs font-medium text-[var(--color-text)] mt-2 italic">
                        &ldquo;{currentShowcase.tagline}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--color-text)] mt-4 font-light leading-relaxed">
                        {currentShowcase.description}
                      </p>

                      <div className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-5">
                        <span className="text-xs font-semibold text-[var(--color-charcoal)] uppercase tracking-wider block">
                          Key Highlights:
                        </span>
                        {currentShowcase.specs.map((spec, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[var(--color-text)]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollCard3D>
          </Reveal>
        </Scroll3D>
      </section>

      {/* 3. EVERYTHING INCLUDED GRID (8 Cards) */}
      <section className="py-12 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal variant="up">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
              What&apos;s at SpaceDesk
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] mt-2">
              Everything at SpaceDesk
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text)] mt-3 font-light">
              Flexible plans with no hidden charges.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EVERYTHING_INCLUDED.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollCard3D key={idx} index={idx} total={EVERYTHING_INCLUDED.length} depth={12}>
                <Reveal delay={idx * 60} variant="up">
                  <div className="group p-6 rounded-2xl bg-white border border-[var(--color-border)] hover:border-[var(--color-primary)] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-warm)] flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] group-hover:scale-110 transition-all duration-300 mb-4">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h3 className="font-heading text-lg font-medium text-[var(--color-charcoal)] mt-1 group-hover:text-[var(--color-primary)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text)] mt-2 font-light leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between text-[11px] text-[var(--color-muted)]">
                      <span>At SpaceDesk</span>
                      <span className="text-[var(--color-primary)] font-semibold">Available</span>
                    </div>
                  </div>
                </Reveal>
              </ScrollCard3D>
            );
          })}
        </div>
      </section>

      {/* 4. DESIGNED AROUND HUMAN FOCUS DARK SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <div className="rounded-3xl bg-[var(--color-charcoal)] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                Everyday Comforts
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-white mt-2 leading-tight">
                Small things that make the workday easier.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-on-dark)] mt-3 font-light leading-relaxed">
                Good internet, a comfortable chair, a decent coffee and a clean desk. We take care of the basics so you can get on with your work.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EVERYDAY_COMFORTS.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--color-primary)]/40 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-[var(--color-primary)] mb-3" aria-hidden="true" />
                    <h3 className="font-heading text-base font-medium text-white">{perk.title}</h3>
                    <p className="text-xs text-[var(--color-text-on-dark)] mt-1.5 font-light leading-relaxed">
                      {perk.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[var(--color-text-on-dark)] text-center sm:text-left">
                Want to test the Wi-Fi and the chairs before you commit?
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBookTourClick}
                  className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold text-xs tracking-wider uppercase hover:bg-white/10 transition-all"
                >
                  Book a Free Tour
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
