import React, { useState } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { COMMUNITY_EVENTS } from '../data/mockData';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Parallax } from './Parallax';

interface CommunitySectionProps {
  onBookTourClick: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onBookTourClick }) => {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <section id="community" className="relative py-16 md:py-24 font-[var(--font-sans)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-[28px] overflow-hidden border border-[var(--color-border)]/20 bg-[var(--color-charcoal)] text-[var(--color-white)] p-6 sm:p-12">
          {/* Background Atmosphere with subtle scroll parallax */}
          <Parallax speed={0.06} className="absolute inset-0 z-0 pointer-events-none">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85"
              alt="Community members collaborating"
              fallbackTitle="Community Collective"
              theme="dark"
              containerClassName="w-full h-full"
              className="opacity-25 object-cover object-center filter grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/85 to-[var(--color-charcoal)]/90 pointer-events-none" />
          </Parallax>

          <div className="relative z-10">
            <Reveal variant="up" className="max-w-3xl">
              <span className="section-label text-xs block mb-3">
                The SpaceDesk Network
              </span>
              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--color-white)] leading-[1.15] text-balance">
                Great work happens{' '}
                <span className="italic text-[var(--color-primary)]">
                  around great people.
                </span>
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-[var(--color-text-on-dark)] leading-relaxed max-w-2xl font-[var(--font-sans)] font-normal">
                Meet founders, freelancers, creatives, and teams who are building what's next. A warm, ego-free community where casual kitchen coffee turns into multi-million dollar collaborations.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 font-[var(--font-sans)]">
                <button
                  onClick={() => setShowEvents(!showEvents)}
                  className="btn-primary-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <Calendar className="w-4 h-4 text-[var(--color-charcoal)]" />
                  <span>{showEvents ? 'Hide Upcoming Events' : 'View Member Events (3 this month)'}</span>
                </button>

                <button
                  onClick={onBookTourClick}
                  className="btn-outline-hover inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[var(--color-border)]/30 text-[var(--color-white)] font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Join as a Member</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-white)]" />
                </button>
              </div>
            </Reveal>

            {/* Member Profile Micro Showcase */}
            <Reveal variant="up" delay={150} className="mt-14 pt-10 border-t border-[var(--color-border)]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 font-[var(--font-sans)]">
              <div>
                <span className="text-3xl sm:text-4xl font-heading font-normal text-[var(--color-primary)] block tabular-nums leading-[1.15]">
                  52%
                </span>
                <span className="text-xs text-[var(--color-text-on-dark)] mt-1 block">
                  Tech & Digital Startups
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-heading font-normal text-[var(--color-primary)] block tabular-nums leading-[1.15]">
                  28%
                </span>
                <span className="text-xs text-[var(--color-text-on-dark)] mt-1 block">
                  Design & Architecture Studios
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-heading font-normal text-[var(--color-primary)] block tabular-nums leading-[1.15]">
                  20%
                </span>
                <span className="text-xs text-[var(--color-text-on-dark)] mt-1 block">
                  Independent Consultants & Writers
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-heading font-normal text-[var(--color-primary)] block tabular-nums leading-[1.15]">
                  84%
                </span>
                <span className="text-xs text-[var(--color-text-on-dark)] mt-1 block">
                  Say SpaceDesk Expanded Their Network
                </span>
              </div>
            </Reveal>

        {/* Dynamic Events Drawer */}
        {showEvents && (
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[var(--color-white)]/10 backdrop-blur-md border border-[var(--color-border)]/20 animate-fadeIn font-[var(--font-sans)]">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]/20 mb-6">
              <h3 className="font-heading text-xl font-normal text-[var(--color-white)]">
                Upcoming Community Gatherings
              </h3>
              <span className="text-xs text-[var(--color-primary)] font-semibold">Open to members & guests</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COMMUNITY_EVENTS.map((event) => (
                <div key={event.id} className="p-5 rounded-2xl bg-[var(--color-charcoal)] border border-[var(--color-border)]/20 flex flex-col justify-between">
                  <div>
                    <span className="section-label text-[11px] block">
                      {event.category}
                    </span>
                    <h4 className="font-semibold text-base text-[var(--color-white)] mt-1 font-[var(--font-sans)]">
                      {event.title}
                    </h4>
                    <p className="text-xs text-[var(--color-text-on-dark)] mt-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[var(--color-border)]/20 flex items-center justify-between text-xs text-[var(--color-text-on-dark)]">
                    <span>{event.date} · {event.time}</span>
                    <span className="font-semibold text-[var(--color-primary)]">{event.attendees} attending</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </section>
  );
};
