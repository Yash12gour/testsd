import React, { useState } from 'react';
import {
  Calendar,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { brandName } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Scroll3D, ScrollCard3D, ScrollImageDepth } from './motion';
import { SEO } from './SEO';
import { CountUpNumber } from './CountUpNumber';

interface AboutPageProps {
  onBookTourClick: () => void;
  onExploreSpacesClick: () => void;
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBookTourClick,
  onExploreSpacesClick,
  onNavigateHome,
}) => {
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('private-cabins');

  // 5. Six tiles mapped in order and assigned to filters:
  // All Spaces | Desks | Private Cabins | Meeting & Conference | Space Deli
  const galleryItems = [
    {
      id: 'g1',
      category: 'desks',
      title: 'Quiet Work Desks',
      subtitle: 'Ergonomic chairs and calm focus areas',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      span: 'md:col-span-8',
    },
    {
      id: 'g2',
      category: 'meeting-conference',
      title: 'Meeting Room',
      subtitle: 'Soundproof, with a smart presentation display',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-4',
    },
    {
      id: 'g3',
      category: 'space-deli',
      title: 'Cafeteria & Refreshments',
      subtitle: 'Tea, coffee and fresh snacks inside the building',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      span: 'md:col-span-4',
    },
    {
      id: 'g4',
      category: 'private-cabins',
      title: 'Private Team Cabins',
      subtitle: 'Lockable cabins with acoustic privacy',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      span: 'md:col-span-8',
    },
    {
      id: 'g5',
      category: 'desks',
      title: 'Open Workspace',
      subtitle: 'Open desks for day pass and dedicated desk members',
      image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80',
      span: 'md:col-span-6',
    },
    {
      id: 'g6',
      category: 'meeting-conference',
      title: 'Conference Room',
      subtitle: 'Seats up to 25 for workshops and seminars',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
      span: 'md:col-span-6',
    },
  ];

  const filteredGallery =
    selectedGalleryCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedGalleryCategory);

  return (
    <div className="w-full font-[var(--font-sans)] bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] fade-in-up">
      {/* SEO META */}
      <SEO
        title="About SpaceDesk Co-Working | Coworking Space in Bhopal"
        description="SpaceDesk is a coworking space in Misrod, Bhopal with 60+ workstations, private cabins, meeting rooms, 300 Mbps fiber and full power backup. Visit for a free tour."
        ogTitle="About SpaceDesk Co-Working | Coworking Space in Bhopal"
        ogDescription="SpaceDesk is a coworking space in Misrod, Bhopal with 60+ workstations, private cabins, meeting rooms, 300 Mbps fiber and full power backup. Visit for a free tour."
        ogImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
        canonicalUrl="/#about-page"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About SpaceDesk',
          description: 'SpaceDesk is a coworking space in Misrod, Bhopal with 60+ workstations, private cabins, meeting rooms, 300 Mbps fiber and full power backup.',
          publisher: {
            '@type': 'Organization',
            name: brandName,
          },
        }}
      />

      {/* 0. BREADCRUMB AND TOP TAG */}
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
          <span className="font-semibold text-[var(--color-charcoal)]">About SpaceDesk</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Coworking in Bhopal
        </span>
      </div>

      {/* 1. HERO */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 md:pb-24">
        <Scroll3D preset="hero" perspective={1400} intensity="medium">
          <Reveal variant="fade">
            <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-6 sm:p-12 lg:p-16 border border-[var(--color-border)] shadow-xl">
              {/* Background Ambient Imagery with Dark Overlay */}
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85"
                  alt="SpaceDesk coworking space in Bhopal"
                  fallbackTitle="SpaceDesk Flagship"
                  theme="dark"
                  containerClassName="w-full h-full"
                  className="object-cover object-center filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/75 to-[var(--color-charcoal)]/60 pointer-events-none" />
              </div>

              {/* Decorative Spatial Grid Geometry Accent */}
              <div className="absolute top-8 right-8 z-0 pointer-events-none hidden lg:block opacity-20 transform -rotate-12 scale-110" aria-hidden="true">
                <div className="w-64 h-64 border-2 border-[var(--color-primary)] rounded-3xl transform rotate-45 flex items-center justify-center backdrop-blur-3xs">
                  <div className="w-44 h-44 border border-white/40 rounded-2xl transform -rotate-12" />
                </div>
              </div>

              {/* Top Pill / Badge & Floating tag near heading */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-semibold uppercase tracking-wider shadow-sm">
                  About SpaceDesk
                </span>
              </div>

              {/* Editorial Headline (H1 Hero Heading) */}
              <div className="relative z-10 mt-12 sm:mt-20 max-w-3xl">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                  More than a place to work.{' '}
                  <span className="italic text-[var(--color-primary)]">
                    A coworking space in Bhopal that feels just right.
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-xl text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                  SpaceDesk is a calm, modern shared office in Misrod, Bhopal. Focus, collaborate and grow your business under one roof.
                </p>

                {/* CTAs */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      onBookTourClick();
                    }}
                    className="px-8 py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[var(--color-charcoal)]" aria-hidden="true" />
                    <span>Book a Free Tour</span>
                  </a>
                  <a
                    href="#visual-tour"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById('visual-tour');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        onExploreSpacesClick();
                      }
                    }}
                    className="px-8 py-4 rounded-full border border-[var(--color-white)] text-[var(--color-white)] hover:bg-white/10 font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <span>See Our Spaces</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--color-white)]" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Stats row (value then label) */}
              <div className="relative z-10 mt-12 pt-8 border-t border-[var(--color-border)]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[var(--color-text-on-dark)]">
                <div>
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="60+" delay={0} duration={1600} />
                  </span>
                  <span className="mt-1 block">Workstations &amp; Desks</span>
                </div>
                <div>
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="300 Mbps" delay={100} duration={1600} />
                  </span>
                  <span className="mt-1 block">Dual Fiber Internet</span>
                </div>
                <div>
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="24/7" delay={200} duration={1600} />
                  </span>
                  <span className="mt-1 block">Biometric Access</span>
                </div>
                <div>
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    Full
                  </span>
                  <span className="mt-1 block">Power Backup</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Scroll3D>
      </section>

      {/* 2. OUR STORY IN THREE CHAPTERS */}
      <section className="py-16 md:py-24 bg-[var(--color-bg)] border-y border-[var(--color-border)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <Reveal variant="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label text-xs block mb-3">
              The Story
            </span>
            <h2 className="font-heading text-[clamp(1.75rem,4.5vw,3rem)] font-normal text-[var(--color-charcoal)] leading-[1.15] text-balance">
              Our story in three parts.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--color-text)]">
              Why we built SpaceDesk, what&apos;s inside, and how we look after it every day.
            </p>
          </Reveal>

          {/* 3 Story Moments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Moment 1: WHY */}
            <ScrollCard3D index={0} total={3} depth={15} className="h-full">
              <Reveal variant="up" delay={50} className="h-full">
                <div className="bg-[var(--color-white)] h-full rounded-[28px] border border-[var(--color-border)] overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                  <div className="p-7">
                    <span className="section-label text-[11px] block">
                      Part 1 · Why We Exist
                    </span>
                    <h3 className="font-heading text-2xl font-normal text-[var(--color-charcoal)] mt-1">
                      Why We Exist
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[var(--color-text)] leading-relaxed">
                      We believe where you work matters as much as what you do. SpaceDesk gives Bhopal&apos;s freelancers, startups and teams a calm, well-equipped place to get their best work done.
                    </p>
                  </div>
                  <ScrollImageDepth className="h-56 relative bg-[var(--color-tile)] border-t border-[var(--color-border)]">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80"
                      alt="Open workspace with desks at SpaceDesk coworking, Bhopal"
                      fallbackTitle="Open Workspace"
                      theme="cream"
                      containerClassName="w-full h-full"
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                  </ScrollImageDepth>
                </div>
              </Reveal>
            </ScrollCard3D>

            {/* Moment 2: WHAT */}
            <ScrollCard3D index={1} total={3} depth={15} className="h-full">
              <Reveal variant="up" delay={120} className="h-full">
                <div className="bg-[var(--color-white)] h-full rounded-[28px] border border-[var(--color-border)] overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                  <div className="p-7">
                    <span className="section-label text-[11px] block">
                      Part 2 · What We Built
                    </span>
                    <h3 className="font-heading text-2xl font-normal text-[var(--color-charcoal)] mt-1">
                      What We Built
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[var(--color-text)] leading-relaxed">
                      60+ workstations, 5+ private cabins, meeting and conference rooms, and a Space Deli, all with fast fiber internet and full power backup.
                    </p>
                  </div>
                  <ScrollImageDepth className="h-56 relative bg-[var(--color-tile)] border-t border-[var(--color-border)]">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                      alt="Workstations and private cabins at SpaceDesk, Misrod, Bhopal"
                      fallbackTitle="Workstations and Cabins"
                      theme="cream"
                      containerClassName="w-full h-full"
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                  </ScrollImageDepth>
                </div>
              </Reveal>
            </ScrollCard3D>

            {/* Moment 3: HOW */}
            <ScrollCard3D index={2} total={3} depth={15} className="h-full">
              <Reveal variant="up" delay={190} className="h-full">
                <div className="bg-[var(--color-white)] h-full rounded-[28px] border border-[var(--color-border)] overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
                  <div className="p-7">
                    <span className="section-label text-[11px] block">
                      Part 3 · How We Run It
                    </span>
                    <h3 className="font-heading text-2xl font-normal text-[var(--color-charcoal)] mt-1">
                      How We Run It
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-[var(--color-text)] leading-relaxed">
                      Biometric access, CCTV, daily housekeeping and a front desk keep things running, backed by 2+ years of looking after our members.
                    </p>
                  </div>
                  <ScrollImageDepth className="h-56 relative bg-[var(--color-tile)] border-t border-[var(--color-border)]">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80"
                      alt="Meeting room at SpaceDesk coworking space, Bhopal"
                      fallbackTitle="Meeting Room"
                      theme="cream"
                      containerClassName="w-full h-full"
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                  </ScrollImageDepth>
                </div>
              </Reveal>
            </ScrollCard3D>
          </div>
        </div>
      </section>

      {/* 3. SPACEDESK IN REAL NUMBERS DARK PANEL */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <Reveal variant="scale">
            <div className="bg-[var(--color-charcoal)] text-[var(--color-white)] rounded-[32px] p-8 sm:p-12 lg:p-16 border border-[var(--color-border)]/20 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="section-label text-xs block text-[var(--color-primary)]">
                    SpaceDesk in Numbers
                  </span>
                  <h2 className="font-heading text-3xl sm:text-5xl font-normal text-[var(--color-white)] leading-[1.15]">
                    SpaceDesk in numbers.
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--color-text-on-dark)] leading-relaxed">
                    No inflated statistics. Here is what you&apos;ll find when you visit our space at Jaswant Tower, Misrod, Bhopal.
                  </p>
                  <div className="pt-2">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        onBookTourClick();
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] hover:underline"
                    >
                      <span>Come see it in person</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
                  {/* Tile 1 */}
                  <div className="p-6 rounded-2xl bg-white/[0.04] border border-[var(--color-border)]/20">
                    <span className="font-heading text-4xl sm:text-5xl text-[var(--color-primary)] font-normal block leading-tight">
                      <CountUpNumber value="60+" delay={0} duration={1600} />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[var(--color-white)] block mt-1">
                      Workstations
                    </span>
                    <span className="text-xs text-[var(--color-text-on-dark)] mt-1 block">
                      Open and dedicated desks
                    </span>
                  </div>

                  {/* Tile 2 */}
                  <div className="p-6 rounded-2xl bg-white/[0.04] border border-[var(--color-border)]/20">
                    <span className="font-heading text-4xl sm:text-5xl text-[var(--color-primary)] font-normal block leading-tight">
                      <CountUpNumber value="5+" delay={100} duration={1600} />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[var(--color-white)] block mt-1">
                      Private Cabins
                    </span>
                    <span className="text-xs text-[var(--color-text-on-dark)] mt-1 block">
                      Lockable team offices
                    </span>
                  </div>

                  {/* Tile 3 */}
                  <div className="p-6 rounded-2xl bg-white/[0.04] border border-[var(--color-border)]/20">
                    <span className="font-heading text-4xl sm:text-5xl text-[var(--color-primary)] font-normal block leading-tight">
                      <CountUpNumber value="300 Mbps" delay={200} duration={1600} />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[var(--color-white)] block mt-1">
                      Dual Fiber Internet
                    </span>
                    <span className="text-xs text-[var(--color-text-on-dark)] mt-1 block">
                      Load balancing and failover
                    </span>
                  </div>

                  {/* Tile 4 */}
                  <div className="p-6 rounded-2xl bg-white/[0.04] border border-[var(--color-border)]/20">
                    <span className="font-heading text-4xl sm:text-5xl text-[var(--color-primary)] font-normal block leading-tight">
                      <CountUpNumber value="24/7" delay={300} duration={1600} />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[var(--color-white)] block mt-1">
                      Biometric Access
                    </span>
                    <span className="text-xs text-[var(--color-text-on-dark)] mt-1 block">
                      For Dedicated Desk and Cabin members
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. VISUAL TOUR OF SPACEDESK */}
      <section id="visual-tour" className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <Reveal variant="up" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label text-xs block mb-3">
                Take a Look Around
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-normal text-[var(--color-charcoal)] leading-[1.15]">
                A look inside SpaceDesk.
              </h2>
            </div>

            {/* Filter Tabs in exact required order:
                All Spaces | Desks | Private Cabins | Meeting & Conference | Space Deli */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'private-cabins', label: 'Private Cabins' },
                { id: 'meeting-conference', label: 'Meeting & Conference' },
                { id: 'space-deli', label: 'Cafeteria & Refreshments' },
              ].map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setSelectedGalleryCategory(tab.id)}
                  aria-label={`Filter spaces by ${tab.label}`}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedGalleryCategory === tab.id
                      ? 'bg-[var(--color-charcoal)] text-[var(--color-white)] shadow-sm'
                      : 'bg-[var(--color-white)] text-[var(--color-text)] hover:text-[var(--color-charcoal)] border border-[var(--color-border)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Asymmetric Gallery Grid */}
          <Reveal variant="up" delay={100} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className={`${item.span} rounded-[26px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-white)] relative shadow-sm group h-72 sm:h-80`}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={`${item.title} at SpaceDesk coworking space, Misrod, Bhopal`}
                  fallbackTitle={item.title}
                  theme="cream"
                  containerClassName="w-full h-full"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-[var(--color-white)]">
                  <h3 className="font-heading text-xl font-normal text-[var(--color-white)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-on-dark)] mt-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
};
