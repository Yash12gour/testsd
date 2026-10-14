import React, { useState } from 'react';
import {
  Wifi,
  Clock,
  Users,
  Armchair,
  Coffee,
  Printer,
  Sparkles,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { AMENITIES } from '../data/mockData';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';

const iconMap: Record<string, React.ElementType> = {
  Wifi,
  Clock,
  Users,
  Armchair,
  Coffee,
  Printer,
  Sparkles,
  MapPin,
};

export const WhySpacedesk: React.FC<{ onBookTourClick: () => void }> = ({ onBookTourClick }) => {
  const [hoveredAmenity, setHoveredAmenity] = useState<string | null>(null);

  return (
    <section id="amenities" className="py-16 md:py-24 font-[var(--font-sans)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-[var(--color-bg)] text-[var(--color-charcoal)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-12 relative overflow-hidden">
          {/* Split Layout Header and Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Large Typography Statement + Editorial Photo */}
          <Reveal variant="up" delay={50} className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div>
              <span className="section-label text-xs block mb-3">
                Why SpaceDesk
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--color-charcoal)] leading-[1.15] text-balance">
                Everything you need to{' '}
                <span className="italic">
                  work better.
                </span>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-[var(--color-text)] leading-relaxed font-[var(--font-sans)]">
                We obsess over the details that subtract friction from your day: ergonomic chairs that support posture, silent acoustic alcoves, reliable gigabit connectivity, and exceptional hospitality.
              </p>
            </div>

            {/* Editorial Image Card */}
            <div className="rounded-[28px] overflow-hidden border border-[var(--color-border)] shadow-md relative min-h-[300px]">
              <ImageWithFallback
                src="https://lh3.googleusercontent.com/d/1xZCVmVHVG7Ny4145HgOHvLK2Tofd2ia7"
                alt="Modern evening workspace with panoramic city skyline view"
                fallbackTitle="Metropolitan Skyline Studio"
                fallbackSubtitle="Panoramic floor-to-ceiling city views & ergonomic desks"
                theme="cream"
                containerClassName="w-full h-full min-h-[300px]"
                className="hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-[var(--color-white)]">
                <p className="section-label text-xs block">
                  Skyline Workspace
                </p>
                <p className="text-sm font-semibold mt-1 text-[var(--color-white)] font-[var(--font-sans)]">
                  Panoramic city views, ergonomic desks, and evening focus ambiance
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onBookTourClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-colors shadow-sm"
              >
                <span>Schedule a Walkthrough</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--color-charcoal)]" />
              </button>
            </div>
          </Reveal>

          {/* Right Column: Clean Amenities List with Thin Dividers */}
          <Reveal variant="up" delay={150} className="lg:col-span-7 bg-[var(--color-white)] rounded-[32px] p-6 sm:p-10 border border-[var(--color-border)] shadow-[0_10px_35px_rgba(31,32,34,0.04)] font-[var(--font-sans)]">
            <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border)]">
              <span className="section-label text-xs">
                Included with all memberships
              </span>
              <span className="text-xs font-semibold text-[var(--color-charcoal)]">
                8 Core Provisions
              </span>
            </div>

            <div className="divide-y divide-[var(--color-border)]">
              {AMENITIES.map((amenity) => {
                const IconComponent = iconMap[amenity.iconName] || Sparkles;

                return (
                  <div
                    key={amenity.id}
                    onMouseEnter={() => setHoveredAmenity(amenity.id)}
                    onMouseLeave={() => setHoveredAmenity(null)}
                    className="py-5 sm:py-6 group transition-colors flex items-start gap-5 cursor-default"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] flex items-center justify-center transition-all duration-300 shrink-0">
                      <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="card-title text-lg group-hover:text-[var(--color-gold)] transition-colors">
                          {amenity.title}
                        </h3>
                        <span className="text-[11px] uppercase tracking-wider text-[var(--color-muted)] font-semibold">
                          {amenity.category}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm text-[var(--color-text)] leading-relaxed font-[var(--font-sans)]">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
};
