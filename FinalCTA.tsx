import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface FinalCTAProps {
  onBookTourClick: () => void;
  onExploreSpacesClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onBookTourClick, onExploreSpacesClick }) => {
  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 bg-[var(--color-charcoal)] text-[var(--color-white)] overflow-hidden font-[var(--font-sans)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <span className="section-label text-xs block">
              Ready When You Are
            </span>
            <h2 className="font-heading text-[clamp(2.125rem,6vw,4.5rem)] font-normal tracking-tight text-[var(--color-white)] leading-[1.12] sm:leading-[1.15] text-balance">
              Make space for{' '}
              <span className="italic text-[var(--color-primary)]">
                better work.
              </span>
            </h2>
            <p className="text-base sm:text-xl text-[var(--color-text-on-dark)] max-w-xl leading-relaxed font-[var(--font-sans)]">
              Take a tour of SpaceDesk and discover a workspace built around the way you work. No long-term commitments, transparent pricing, and instant move-in.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 font-[var(--font-sans)]">
              <button
                onClick={onBookTourClick}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-sm hover:opacity-90 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Book a Tour</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[var(--color-charcoal)]" />
              </button>

              <button
                onClick={onExploreSpacesClick}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-[var(--color-border)]/30 text-[var(--color-white)] hover:bg-[var(--color-white)]/10 font-semibold text-sm transition-all"
              >
                <span>Explore Spaces</span>
                <ArrowRight className="w-4 h-4 text-[var(--color-white)]/70" />
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-[var(--color-text-on-dark)] font-[var(--font-sans)]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                <span>Complimentary test day with every tour</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                <span>Zero deposit on hot desks</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Rounded Architectural Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[36px] overflow-hidden border border-[var(--color-border)]/20 shadow-[0_30px_70px_rgba(31,32,34,0.5)] min-h-[380px] sm:min-h-[460px] group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80"
                alt="Modern architectural entrance of SpaceDesk"
                fallbackTitle="SpaceDesk Architecture"
                fallbackSubtitle="Warm interior glow and biophilic atrium"
                theme="dark"
                containerClassName="w-full h-full min-h-[380px] sm:min-h-[460px]"
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-[var(--color-white)] flex items-end justify-between font-[var(--font-sans)]">
                <div>
                  <span className="section-label text-[10px] block">
                    Welcome Desk
                  </span>
                  <p className="font-heading text-lg font-normal text-[var(--color-white)]">
                    Step inside tomorrow.
                  </p>
                </div>
                <div className="text-right text-xs text-[var(--color-text-on-dark)]">
                  Open Tours Mon – Sat
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
