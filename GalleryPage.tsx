import React, { useState } from 'react';
import {
  Maximize2,
  ArrowUpRight,
  Camera,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Parallax } from './Parallax';
import { Scroll3D, ScrollCard3D, ScrollImageDepth, ScrollParallax3D } from './motion';
import { SEO } from './SEO';
import { CountUpNumber } from './CountUpNumber';

interface GalleryPageProps {
  onBookTourClick: () => void;
  onDayPassClick: () => void;
  onExploreSpacesClick: () => void;
  onNavigateHome: () => void;
}

interface GalleryPhoto {
  id: string;
  badge: string;
  caption: string;
  alt: string;
  category: 'workspaces' | 'meeting' | 'lounges' | 'architecture';
  spanClass: string;
  aspectClass: string;
  imageUrl: string;
}

const GALLERY_COLLECTION: GalleryPhoto[] = [
  {
    id: 'gal-1',
    badge: 'Desks',
    caption: 'Open and dedicated desks',
    alt: 'Desk with a laptop beside a tall window and a large plant',
    category: 'workspaces',
    spanClass: 'md:col-span-8 lg:col-span-8',
    aspectClass: 'aspect-[16/10]',
    imageUrl:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'gal-2',
    badge: 'Meeting Rooms',
    caption: 'Meeting room',
    alt: 'Meeting room with a long wooden table, chairs and a large window',
    category: 'meeting',
    spanClass: 'md:col-span-4 lg:col-span-4',
    aspectClass: 'aspect-[4/5]',
    imageUrl:
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-3',
    badge: 'Lounge & Deli',
    caption: 'Shared tables',
    alt: 'People working on laptops at a shared table',
    category: 'lounges',
    spanClass: 'md:col-span-4 lg:col-span-4',
    aspectClass: 'aspect-[4/5]',
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-4',
    badge: 'Desks',
    caption: 'Private cabins',
    alt: 'Bright corridor with glass-fronted private rooms',
    category: 'workspaces',
    spanClass: 'md:col-span-8 lg:col-span-8',
    aspectClass: 'aspect-[16/10]',
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'gal-5',
    badge: 'Lounge & Deli',
    caption: 'Lounge seating',
    alt: 'Lounge area with armchairs, a sofa and a floor lamp',
    category: 'lounges',
    spanClass: 'md:col-span-6 lg:col-span-6',
    aspectClass: 'aspect-[16/10]',
    imageUrl:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-6',
    badge: 'Desks',
    caption: 'Open workspace',
    alt: 'Open workspace with long shared tables and hanging lights',
    category: 'workspaces',
    spanClass: 'md:col-span-6 lg:col-span-6',
    aspectClass: 'aspect-[16/10]',
    imageUrl:
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'gal-7',
    badge: 'Whole Space',
    caption: 'Meeting area',
    alt: 'Meeting table and chairs beside large windows',
    category: 'architecture',
    spanClass: 'md:col-span-6 lg:col-span-6',
    aspectClass: 'aspect-[16/10]',
    imageUrl:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'gal-8',
    badge: 'Whole Space',
    caption: 'Open floor',
    alt: 'Large open workspace with rows of desks',
    category: 'architecture',
    spanClass: 'md:col-span-6 lg:col-span-6',
    aspectClass: 'aspect-[16/10]',
    imageUrl:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
  },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onBookTourClick,
  onDayPassClick: _onDayPassClick,
  onExploreSpacesClick: _onExploreSpacesClick,
  onNavigateHome,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'workspaces', label: 'Desks' },
    { id: 'meeting', label: 'Meeting Rooms' },
    { id: 'lounges', label: 'Lounge & Space Deli' },
    { id: 'architecture', label: 'Whole Space' },
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? GALLERY_COLLECTION
      : GALLERY_COLLECTION.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full bg-[var(--color-bg-warm)] min-h-screen text-[var(--color-charcoal)] font-[var(--font-sans)] pb-24 fade-in-up">
      <SEO
        title="Gallery | Photos of SpaceDesk Coworking Space in Bhopal"
        description="Take a look inside SpaceDesk Co-Working in Misrod, Bhopal: open desks, private cabins, meeting rooms and the Space Deli. Book a free tour to see it in person."
        ogTitle="Gallery | Photos of SpaceDesk Coworking Space in Bhopal"
        ogDescription="Take a look inside SpaceDesk Co-Working in Misrod, Bhopal: open desks, private cabins, meeting rooms and the Space Deli. Book a free tour to see it in person."
        ogImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
        canonicalUrl="/#gallery-page"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: 'Gallery | Photos of SpaceDesk Coworking Space in Bhopal',
          description:
            'Take a look inside SpaceDesk Co-Working in Misrod, Bhopal: open desks, private cabins, meeting rooms and the Space Deli. Book a free tour to see it in person.',
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
          <span className="font-semibold text-[var(--color-charcoal)]">Visual Gallery</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Bhopal · Campus Showcase
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <section
        id="gallery-page-hero"
        className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 md:pb-24 relative"
      >
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
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85"
                    alt="SpaceDesk coworking space gallery Bhopal"
                    fallbackTitle="SpaceDesk Gallery"
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
                  Visual Gallery
                </span>
              </div>

              {/* Main Headline */}
              <div className="relative z-10 mt-10 sm:mt-16 max-w-3xl">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                  Take a look inside{' '}
                  <span className="italic text-[var(--color-primary)]">
                    our workspace.
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-xl text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                  Open desks, soundproof private cabins, collaborative boardrooms, and the Space Deli at Jaswant Tower, Misrod. Click any photo to inspect details in full resolution.
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
                    href="#gallery-filter"
                    className="group px-8 py-4 rounded-full border border-[var(--color-white)] text-[var(--color-white)] hover:bg-white/10 hover:border-white font-semibold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Browse All Photos</span>
                    <ArrowRight className="w-4 h-4 text-[var(--color-white)] group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="relative z-10 mt-12 pt-8 border-t border-[var(--color-border)]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[var(--color-text-on-dark)]">
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="25+ Shots" delay={0} duration={1400} />
                  </span>
                  <span className="mt-1 block">High-Resolution Photos</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="4 Zones" delay={100} duration={1600} />
                  </span>
                  <span className="mt-1 block">Desks, Cabins, Deli &amp; Lounge</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="100%" delay={200} duration={1600} />
                  </span>
                  <span className="mt-1 block">Real On-Campus Photos</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="360°" delay={300} duration={1400} />
                  </span>
                  <span className="mt-1 block">In-Person Tours Available</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Scroll3D>
      </section>

      {/* 2. CATEGORY FILTER BAR */}
      <section className="py-8 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal variant="up">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Photo filter categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap hover:scale-105 active:scale-95 transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--color-charcoal)] text-white shadow'
                    : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-charcoal)] hover:bg-[var(--color-bg-warm)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 3. EDITORIAL / MASONRY GRID with Scroll-linked 3D Perspective */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div key={photo.id} className={`${photo.spanClass}`}>
              <ScrollCard3D index={idx} total={filteredPhotos.length} rotateXIntensity={2.8} rotateYIntensity={2} className="h-full">
                <Reveal delay={idx * 40} variant="scale">
                  <div
                    className="group relative rounded-3xl overflow-hidden bg-white border border-[var(--color-border)] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between h-full"
                  >
                    <div className={`relative w-full ${photo.aspectClass} overflow-hidden`}>
                      <ImageWithFallback
                        src={photo.imageUrl}
                        alt={photo.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Category pill */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[var(--color-charcoal)] text-[10px] font-bold uppercase tracking-wider shadow group-hover:scale-105 transition-transform">
                          {photo.badge}
                        </span>
                      </div>
                    </div>

                    {/* Visible Caption under the image */}
                    <div className="p-4 sm:p-5 bg-white border-t border-[var(--color-border)]/60 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)] block mb-0.5">
                          {photo.badge}
                        </span>
                        <h3 className="font-heading text-base sm:text-lg font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                          {photo.caption}
                        </h3>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full bg-[var(--color-bg-warm)] flex items-center justify-center text-[var(--color-charcoal)] group-hover:bg-[var(--color-primary)] group-hover:scale-110 transition-all shrink-0 ml-2"
                        aria-hidden="true"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </ScrollCard3D>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <div className="rounded-3xl bg-[var(--color-charcoal)] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center space-y-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-primary)]/15 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                See It in Person
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-normal text-white mt-2 leading-tight">
                Photos help. A visit shows more.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-on-dark)] mt-4 font-light leading-relaxed">
                Walk in, have a coffee, try the chairs and test the Wi-Fi on your own laptop. No pressure.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
                <button
                  type="button"
                  onClick={onBookTourClick}
                  className="px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-all shadow-md"
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
