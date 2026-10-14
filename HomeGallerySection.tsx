import React, { useState } from 'react';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { Scroll3D } from './motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Maximize2 } from 'lucide-react';
import { brandName } from '../data/content';

interface HomeGallerySectionProps {
  onExploreSpacesClick?: () => void;
  onBookTourClick?: () => void;
}

interface GalleryCollection {
  id: string;
  name: string;
  tagline: string;
  headline: string;
  description: string;
  buttonText: string;
  images: {
    heroLarge: {
      title: string;
      subtitle: string;
      url: string;
    };
    bottomWide: {
      title: string;
      url: string;
    };
    tallCenter: {
      title: string;
      subtitle: string;
      url: string;
    };
    tallRightTop: {
      title: string;
      url: string;
    };
    tallRightBottom: {
      title: string;
      subtitle: string;
      url: string;
    };
    stayCard: {
      title: string;
      subtitle: string;
      url: string;
    };
  };
}

const COLLECTIONS: GalleryCollection[] = [
  {
    id: 'nordic',
    name: 'Reykjavik Hub',
    tagline: 'Acoustic sanctuary · Natural larchwood finishes',
    headline: 'Unleash your productive spirit in light.',
    description:
      'Witness the soft northern light in sound-insulated private cabins, open standing desks, and curated focus lounges designed for sustained deep work.',
    buttonText: 'Discover Space',
    images: {
      heroLarge: {
        title: 'Larchwood Quiet Atrium',
        subtitle: 'Dual-monitor ergonomic bays',
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      },
      bottomWide: {
        title: 'Sunlit Executive Wing',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      },
      tallCenter: {
        title: 'Glass Focus Pods',
        subtitle: 'Acoustic rating 42dB · Ultra-fast fiber line',
        url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
      },
      tallRightTop: {
        title: 'Botanical Breakout Nook',
        url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      },
      tallRightBottom: {
        title: 'Deli Bar & Roastery',
        subtitle: 'Bean-to-cup pour over',
        url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
      },
      stayCard: {
        title: 'Community Lounge',
        subtitle: 'Sweeping city panorama',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
    },
  },
  {
    id: 'zen',
    name: 'Kyoto Pavilion',
    tagline: 'Minimalist lines · Organic tatami texture',
    headline: 'Where tranquility meets high focus.',
    description:
      'Master intense engineering cycles and creative direction in calming spaces inspired by timeless architectural proportion and gentle indirect lighting.',
    buttonText: 'Explore Pavilion',
    images: {
      heroLarge: {
        title: 'Acoustic Boardroom Suite',
        subtitle: 'Frameless glass & native timber',
        url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80',
      },
      bottomWide: {
        title: 'Courtyard Terrace Seating',
        url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      },
      tallCenter: {
        title: 'Silent Library Gallery',
        subtitle: 'Warm ambient glow · Herman Miller seating',
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      },
      tallRightTop: {
        title: 'Boutique Call Cabins',
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      },
      tallRightBottom: {
        title: 'Matcha & Tea Bar',
        subtitle: 'Artisanal wellness lounge',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
      stayCard: {
        title: 'Zen Mezzanine',
        subtitle: 'Private phone pods & standing areas',
        url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
      },
    },
  },
  {
    id: 'aegean',
    name: 'Santorini Terrace',
    tagline: 'Breezy coastal palette · Panoramic daylight',
    headline: 'A sun-drenched escape for modern teams.',
    description:
      'Collaborative open lounges, rooftop breakout patios, and private executive suites bathed in bright ambient sunlight for inspired product design.',
    buttonText: 'Plan Your Visit',
    images: {
      heroLarge: {
        title: 'Open Panorama Floor',
        subtitle: 'Floor-to-ceiling glass exposure',
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
      },
      bottomWide: {
        title: 'Rooftop Pergola Desks',
        url: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
      },
      tallCenter: {
        title: 'Biophilic Atrium',
        subtitle: 'Fresh air filtration & live flora',
        url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      },
      tallRightTop: {
        title: 'Sunken Discussion Pit',
        url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      },
      tallRightBottom: {
        title: 'Espresso Bar & Bistro',
        subtitle: 'Artisanal roasts & pastries',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
      stayCard: {
        title: 'Sunset Breakout Deck',
        subtitle: 'Evening team mixers & social hours',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      },
    },
  },
];

export const HomeGallerySection: React.FC<HomeGallerySectionProps> = ({
  onExploreSpacesClick,
  onBookTourClick,
}) => {
  const [activeCollectionIdx, setActiveCollectionIdx] = useState(0);
  const [activeLightbox, setActiveLightbox] = useState<{ url: string; title: string } | null>(null);

  const current = COLLECTIONS[activeCollectionIdx];

  const handlePrev = () => {
    setActiveCollectionIdx((prev) => (prev - 1 + COLLECTIONS.length) % COLLECTIONS.length);
  };

  const handleNext = () => {
    setActiveCollectionIdx((prev) => (prev + 1) % COLLECTIONS.length);
  };

  return (
    <ScrollReveal
      as="section"
      id="gallery"
      aria-labelledby="gallery-section-title"
      className="py-16 md:py-24 font-[var(--font-sans)] bg-transparent"
    >
      <Scroll3D preset="section" className="w-full">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <ScrollRevealItem delay={40} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <span className="section-label text-xs block mb-2 tracking-wider">
                Visual Experience
              </span>
              <h2
                id="gallery-section-title"
                className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-[var(--color-charcoal)] leading-[1.15] tracking-tight"
              >
                Atmosphere & Architecture
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text)] max-w-sm leading-relaxed">
              Explore thoughtfully composed workspaces calibrated for deep focus, creative collaboration, and daily renewal.
            </p>
          </ScrollRevealItem>

          {/* Reference Video Layout Container: Dark warm frame with rounded-3xl container */}
          <ScrollRevealItem delay={80}>
            <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-transparent text-white p-0 shadow-none border-none">
              {/* Mosaic Bento Grid matching the reference video layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-stretch">
                {/* ----------------- LEFT COLUMN (md:col-span-6) ----------------- */}
                <div className="md:col-span-6 flex flex-col gap-3 sm:gap-4 lg:gap-5">
                  {/* Top: Large Landscape Image with Title Notch overlay */}
                  <div
                    onClick={() => setActiveLightbox({ url: current.images.heroLarge.url, title: current.images.heroLarge.title })}
                    className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden h-[220px] sm:h-[260px] lg:h-[290px] bg-[#2A2B30] cursor-pointer"
                  >
                    <img
                      src={current.images.heroLarge.url}
                      alt={current.images.heroLarge.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    
                    {/* Location Badge + Title overlay bottom-left */}
                    <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 z-10">
                      <h3 className="font-heading text-2xl sm:text-3xl lg:text-[2rem] font-medium text-white tracking-tight leading-tight">
                        {current.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/70 font-sans mt-0.5">
                        {current.tagline}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label="View larger"
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Middle Row: Left text card + Right photo tile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 flex-1">
                    {/* Description Editorial Card */}
                    <div className="rounded-[20px] sm:rounded-[24px] bg-[#28292E] p-5 sm:p-6 flex flex-col justify-between border border-white/5">
                      <div>
                        <h4 className="font-heading text-lg sm:text-xl font-medium text-white leading-snug tracking-tight mb-2">
                          {current.headline}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed font-sans line-clamp-4">
                          {current.description}
                        </p>
                      </div>
                      
                      <div className="pt-4 mt-auto">
                        <button
                          type="button"
                          onClick={() => {
                            if (onExploreSpacesClick) onExploreSpacesClick();
                            else if (onBookTourClick) onBookTourClick();
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-1.5 focus-ring"
                        >
                          <span>{current.buttonText}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Wide Image */}
                    <div
                      onClick={() => setActiveLightbox({ url: current.images.bottomWide.url, title: current.images.bottomWide.title })}
                      className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#2A2B30] h-[190px] sm:h-auto min-h-[190px] cursor-pointer"
                    >
                      <img
                        src={current.images.bottomWide.url}
                        alt={current.images.bottomWide.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-xs text-white/90 font-medium truncate">
                        {current.images.bottomWide.title}
                      </div>
                    </div>
                  </div>

                  {/* Left Controls Bar (Previous / Next matching reference video buttons) */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 focus-ring"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 focus-ring"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* ----------------- RIGHT COLUMN (md:col-span-6) ----------------- */}
                <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
                  {/* Sub-column 1: Explore Card Top + Center Tall Architecture Image + Stay card */}
                  <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
                    {/* "Explore" Info Card */}
                    <div className="rounded-[20px] sm:rounded-[24px] bg-[#28292E] p-5 border border-white/5">
                      <span className="text-[10px] uppercase font-semibold text-[var(--color-primary)] tracking-widest block mb-1">
                        Explore
                      </span>
                      <p className="text-xs text-white/80 leading-relaxed font-sans">
                        Quiet focus cabins, managed conference boardrooms, and natural light zones.
                      </p>
                    </div>

                    {/* Center Tall Photo (like the wooden house in Iceland video) */}
                    <div
                      onClick={() => setActiveLightbox({ url: current.images.tallCenter.url, title: current.images.tallCenter.title })}
                      className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden flex-1 min-h-[220px] sm:min-h-[260px] bg-[#2A2B30] cursor-pointer"
                    >
                      <img
                        src={current.images.tallCenter.url}
                        alt={current.images.tallCenter.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-xs text-white">
                        <span className="font-medium block truncate">{current.images.tallCenter.title}</span>
                        <span className="text-[10px] text-white/60 block truncate">{current.images.tallCenter.subtitle}</span>
                      </div>
                    </div>

                    {/* "Stay" Mini Card */}
                    <div
                      onClick={() => setActiveLightbox({ url: current.images.stayCard.url, title: current.images.stayCard.title })}
                      className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden h-[110px] bg-[#28292E] border border-white/5 p-4 flex flex-col justify-between cursor-pointer"
                    >
                      <img
                        src={current.images.stayCard.url}
                        alt={current.images.stayCard.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="relative z-10">
                        <span className="text-[10px] uppercase font-semibold text-[var(--color-primary)] tracking-widest block">
                          Stay & Focus
                        </span>
                        <p className="text-xs text-white/90 font-medium mt-1 truncate">
                          {current.images.stayCard.title}
                        </p>
                      </div>
                      <span className="relative z-10 text-[10px] text-white/60">
                        {current.images.stayCard.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Sub-column 2: Top Tall Image (like the puffin bird) + Cuisine/Lounge Card + Bottom Photo */}
                  <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5">
                    {/* Top Tall Image */}
                    <div
                      onClick={() => setActiveLightbox({ url: current.images.tallRightTop.url, title: current.images.tallRightTop.title })}
                      className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden h-[210px] sm:h-[240px] bg-[#2A2B30] cursor-pointer"
                    >
                      <img
                        src={current.images.tallRightTop.url}
                        alt={current.images.tallRightTop.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-xs text-white/90 font-medium truncate">
                        {current.images.tallRightTop.title}
                      </div>
                    </div>

                    {/* "Cuisine" / Deli Information Box */}
                    <div className="rounded-[20px] sm:rounded-[24px] bg-[#28292E] p-5 border border-white/5">
                      <span className="text-[10px] uppercase font-semibold text-[var(--color-primary)] tracking-widest block mb-1">
                        Deli & Cafe
                      </span>
                      <p className="text-xs text-white/80 leading-relaxed font-sans">
                        Artisanal pour-over coffee, fresh roasts, and organic teas served daily.
                      </p>
                    </div>

                    {/* Bottom Food/Lounge Photo (like the table food in video) */}
                    <div
                      onClick={() => setActiveLightbox({ url: current.images.tallRightBottom.url, title: current.images.tallRightBottom.title })}
                      className="group relative rounded-[20px] sm:rounded-[24px] overflow-hidden flex-1 min-h-[140px] bg-[#2A2B30] cursor-pointer"
                    >
                      <img
                        src={current.images.tallRightBottom.url}
                        alt={current.images.tallRightBottom.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 text-xs text-white/90 font-medium truncate">
                        {current.images.tallRightBottom.title}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollRevealItem>
        </div>
      </Scroll3D>

      {/* Lightweight Image Lightbox Dialog */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightbox.title}
          onClick={() => setActiveLightbox(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 modal-backdrop-animate cursor-zoom-out"
        >
          <div
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden bg-black shadow-2xl modal-content-animate"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightbox.url}
              alt={activeLightbox.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="p-4 bg-[var(--color-charcoal)] text-white flex items-center justify-between">
              <span className="text-sm font-medium">{activeLightbox.title}</span>
              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
                className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-xs font-semibold uppercase tracking-wider text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ScrollReveal>
  );
};

export default HomeGallerySection;
