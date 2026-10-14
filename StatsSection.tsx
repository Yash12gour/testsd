import React, { useState } from 'react';
import { STATS } from '../data/mockData';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { Scroll3D, ScrollCard3D } from './motion';
import { Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { CountUpNumber } from './CountUpNumber';

const STAT_ICONS = [TrendingUp, ShieldCheck, Sparkles, Zap];

export const StatsSection: React.FC = React.memo(() => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <ScrollReveal as="section" id="stats" className="py-16 md:py-24 font-[var(--font-sans)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <Scroll3D preset="section" className="w-full">
          <div className="relative group/stats bg-[var(--color-white)] rounded-[28px] border-y border-x-transparent border-[var(--color-border)] p-6 sm:p-12 shadow-sm hover:shadow-xl hover:border-[var(--color-gold)]/40 transition-all duration-500 ease-out overflow-hidden">
            {/* Ambient subtle glow background effect */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover/stats:opacity-100 opacity-40" />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[var(--color-gold)]/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover/stats:opacity-100 opacity-40" />

            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
              {STATS.map((stat, i) => {
                const IconComponent = STAT_ICONS[i % STAT_ICONS.length];
                const isHovered = hoveredIndex === i;

                return (
                  <ScrollRevealItem
                    key={stat.label}
                    index={i}
                    delay={60 + i * 80}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`pt-6 sm:pt-0 ${
                      i !== 0 ? 'sm:pl-8 lg:pl-10' : ''
                    } group/stat cursor-default transition-all duration-300 hover:-translate-y-1.5`}
                  >
                    <ScrollCard3D index={i} total={STATS.length}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] opacity-70 group-hover/stat:scale-150 group-hover/stat:opacity-100 transition-all duration-300" />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]/80 font-mono">
                          Metric 0{i + 1}
                        </span>
                      </div>

                      <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--color-gold)] tabular-nums leading-[1.15] transition-transform duration-300 origin-left group-hover/stat:scale-105 inline-flex items-baseline gap-1">
                        <CountUpNumber value={stat.value} delay={i * 120} duration={1600} />
                        {IconComponent && (
                          <IconComponent className={`w-5 h-5 text-[var(--color-gold)] transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0 scale-110' : 'opacity-0 translate-y-1 scale-75'}`} />
                        )}
                      </div>

                      <div className="mt-2 text-sm text-[var(--color-text)] font-medium font-[var(--font-sans)] transition-colors duration-300 group-hover/stat:text-black">
                        {stat.label}
                      </div>
                    </ScrollCard3D>
                  </ScrollRevealItem>
                );
              })}
            </div>
          </div>
        </Scroll3D>
      </div>
    </ScrollReveal>
  );
});

