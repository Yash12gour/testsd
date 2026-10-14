import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { ImageWithFallback } from './ImageWithFallback';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prevIdx) => (prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setActiveIndex((prevIdx) => (prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg)] text-[var(--color-charcoal)] relative overflow-hidden font-[var(--font-sans)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between pb-8 border-b border-[var(--color-border)]">
          <span className="section-label text-xs">
            Member Stories · 0{activeIndex + 1} of 0{TESTIMONIALS.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous story"
              className="w-10 h-10 rounded-full border border-[var(--color-border)] text-[var(--color-charcoal)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              aria-label="Next story"
              className="w-10 h-10 rounded-full border border-[var(--color-border)] text-[var(--color-charcoal)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Large Editorial Quote */}
        <div className="pt-12 pb-8">
          <Quote className="w-8 sm:w-10 h-8 sm:h-10 text-[var(--color-gold)] mb-4 sm:mb-6" />
          <blockquote className="font-heading text-[clamp(1.375rem,4.5vw,3rem)] text-[var(--color-charcoal)] leading-[1.2] sm:leading-[1.15] font-normal tracking-tight max-w-4xl text-balance">
            “{current.quote}”
          </blockquote>

          {/* Member Profile */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-[var(--color-border)]">
                <ImageWithFallback
                  src={current.avatarUrl}
                  alt={current.author}
                  fallbackTitle={current.author}
                  theme="cream"
                  containerClassName="w-full h-full"
                />
              </div>
              <div>
                <p className="card-title text-lg text-[var(--color-charcoal)]">
                  {current.author}
                </p>
                <p className="text-xs text-[var(--color-text)]">
                  {current.role} · <span className="font-medium text-[var(--color-charcoal)]">{current.company}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="text-left sm:text-right">
                <span className="section-label text-[10px] block">
                  Membership Tier
                </span>
                <span className="text-xs font-semibold text-[var(--color-charcoal)]">
                  {current.spaceType}
                </span>
              </div>

              {current.metric && (
                <div className="bg-[var(--color-white)] px-3.5 sm:px-4 py-2 rounded-xl border border-[var(--color-border)] text-left sm:text-right shadow-sm">
                  <span className="section-label text-[10px] block">
                    Reported Impact
                  </span>
                  <span className="text-xs font-semibold text-[var(--color-charcoal)] font-[var(--font-sans)]">
                    {current.metric}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Carousel indicator pips */}
        <div className="flex items-center gap-2 pt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                i === activeIndex ? 'w-8 bg-[var(--color-primary)]' : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-gold)]'
              }`}
              aria-label={`Jump to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
