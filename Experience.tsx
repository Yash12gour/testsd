import React, { useState } from 'react';
import { ArrowUpRight, Volume2, Armchair, Coffee } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';

interface ExperienceProps {
  onBookTourClick: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onBookTourClick }) => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: 'Designed for Focus',
      description: 'Engineered acoustics, designated quiet zones, and noise-damping felt panels allow you to enter deep cognitive flow without distraction.',
      icon: Volume2,
      stat: '<35 dB Quiet Level',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Built for Connection',
      description: 'Curated communal kitchens, informal conversation banquettes, and intentional serendipity where founders and freelancers naturally meet.',
      icon: Coffee,
      stat: '60+ Monthly Mixers',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Made for Flexibility',
      description: 'Move fluidly between standing desks, cozy lounge armchairs, outdoor terraces, and private phone booths throughout your working day.',
      icon: Armchair,
      stat: '7 Distinct Work Modes',
      image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=900&q=80',
    },
  ];

  return (
    <section id="experience" className="py-16 md:py-24 font-[var(--font-sans)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="bg-[var(--color-charcoal)] text-[var(--color-white)] rounded-[28px] border border-[var(--color-border)]/20 p-6 sm:p-12 relative overflow-hidden">
          {/* Section Header */}
          <Reveal variant="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[var(--color-border)]/20">
              <div className="max-w-2xl">
                <span className="section-label text-xs block mb-3">
                  The SpaceDesk Experience
                </span>
                <h2 className="font-heading text-[clamp(2rem,5.5vw,3.75rem)] font-normal tracking-tight text-[var(--color-white)] leading-[1.12] sm:leading-[1.15] text-balance">
                  More than a desk.{' '}
                  <span className="italic text-[var(--color-primary)]">
                    A better way to work.
                  </span>
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-base sm:text-lg text-[var(--color-text-on-dark)] leading-relaxed font-[var(--font-sans)]">
                  Thoughtfully designed spaces that help you focus when you need to, connect when you want to, and feel comfortable throughout the day.
                </p>
              </div>
            </div>
          </Reveal>

        {/* Asymmetric Image Composition */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center font-[var(--font-sans)]">
          {/* Left Column: Interactive Pillar Navigation */}
          <Reveal variant="up" delay={100} className="md:col-span-5 space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activePillar === idx;
              return (
                <div
                  key={pillar.title}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${pillar.title}: ${pillar.description}`}
                  onClick={() => setActivePillar(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivePillar(idx);
                    }
                  }}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 focus-ring outline-none ${
                    isActive
                      ? 'bg-[var(--color-white)]/10 border-[var(--color-gold)] shadow-lg translate-x-1'
                      : 'bg-[var(--color-white)]/[0.03] border-[var(--color-border)]/20 hover:bg-[var(--color-white)]/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)]' : 'bg-[var(--color-charcoal)] text-[var(--color-gold)] border border-[var(--color-border)]/20'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-[var(--font-sans)] font-semibold text-lg text-[var(--color-white)]">
                        {pillar.title}
                      </h3>
                    </div>
                    <span className="text-xs font-[var(--font-sans)] font-semibold text-[var(--color-primary)] tabular-nums">
                      {pillar.stat}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-on-dark)] leading-relaxed pl-11">
                    {pillar.description}
                  </p>
                </div>
              );
            })}

            <div className="pt-4 pl-2">
              <button
                onClick={onBookTourClick}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] hover:text-[var(--color-primary)] transition-colors group"
              >
                <span>Experience our spaces in person</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[var(--color-gold)]" />
              </button>
            </div>
          </Reveal>

          {/* Right Column: Dynamic Architectural Showcase */}
          <Reveal variant="scale" delay={200} className="md:col-span-7 relative">
            <div className="relative rounded-[32px] overflow-hidden border border-[var(--color-border)]/20 shadow-[0_25px_60px_rgba(31,32,34,0.35)] min-h-[460px] md:min-h-[540px]">
              <ImageWithFallback
                src={pillars[activePillar].image}
                alt={pillars[activePillar].title}
                fallbackTitle={pillars[activePillar].title}
                fallbackSubtitle="SpaceDesk architectural environment"
                theme="dark"
                containerClassName="w-full h-full min-h-[460px] md:min-h-[540px]"
                className="transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-transparent to-transparent pointer-events-none" />

              {/* Floating Architectural Badge */}
              <div className="absolute top-6 right-6 bg-[var(--color-charcoal)]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[var(--color-border)]/30 text-xs font-[var(--font-sans)] font-semibold text-[var(--color-primary)]">
                0{activePillar + 1} / 03
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 font-[var(--font-sans)]">
                <div>
                  <span className="section-label text-xs block">
                    Selected Environment
                  </span>
                  <p className="font-heading text-2xl font-normal text-[var(--color-white)] mt-1">
                    {pillars[activePillar].title}
                  </p>
                  <p className="text-xs text-[var(--color-text-on-dark)] mt-1 max-w-md">
                    Natural materials, bio-adaptive light, and acoustic serenity designed for human health.
                  </p>
                </div>
              </div>
            </div>

            {/* Overlapping smaller offset card */}
            <div className="hidden lg:block absolute -bottom-8 -left-12 w-48 h-48 rounded-[24px] overflow-hidden border-2 border-[var(--color-charcoal)] shadow-2xl z-10 group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80"
                alt="Acoustic materials detail"
                fallbackTitle="Acoustic Felt"
                theme="dark"
                containerClassName="w-full h-full"
                className="group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[var(--color-charcoal)]/30 pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 text-[10px] font-[var(--font-sans)] font-semibold text-[var(--color-primary)]">
                Biophilic Oak
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
};
