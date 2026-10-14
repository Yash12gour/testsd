import React from 'react';
import { Wifi, Users, Zap, Coffee, LucideIcon } from 'lucide-react';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { Scroll3D, ScrollCard3D } from './motion';
import { Tilt3D } from './Tilt3D';

interface ObjectiveItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }> | LucideIcon | string;
  isDark?: boolean;
  points: string[];
}

const CardIconBadge: React.FC<{ icon: React.ComponentType<{ className?: string }> | LucideIcon | string; isDark?: boolean }> = ({ icon: Icon, isDark }) => (
  <div
    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
      isDark
        ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)]'
        : 'bg-[var(--color-primary)] text-[var(--color-charcoal)] ring-4 ring-[var(--color-primary)]/20'
    }`}
  >
    {typeof Icon === 'string' ? (
      <img src={Icon} alt="" className="w-6 h-6 object-contain" />
    ) : (
      <Icon
        className="w-5 h-5 stroke-[2.25]"
        strokeWidth={2.25}
        aria-hidden="true"
      />
    )}
  </div>
);

const PowerBankIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
    <path d="M12.667 8 10 12h4l-2.667 4"/>
  </svg>
);

const OBJECTIVES: ObjectiveItem[] = [
  {
    id: 'fast-internet',
    title: 'Fast Internet & Power Backup',
    icon: PowerBankIcon,
    points: [
      'Dual fiber lines at 300 Mbps with load balancing and failover.',
      'A generator and online UPS keep the power on during outages.',
    ],
  },
  {
    id: 'community',
    title: 'A Friendly Community',
    icon: Users,
    isDark: true,
    points: [
      'Share the space with tech founders, creative freelancers and corporate teams.',
      'A collaborative, friendly atmosphere with relaxed breakout zones.',
    ],
  },
  {
    id: 'safe-secure-access',
    title: 'Safe & Secure Access',
    icon: Zap,
    points: [
      'Keycard and biometric entry with round-the-clock CCTV.',
      '24/7 access for Dedicated Desk and Private Cabin members.',
    ],
  },
  {
    id: 'refreshments',
    title: 'Cafeteria & Refreshments',
    icon: Coffee,
    points: [
      'Premium tea, artisanal coffee and fresh snacks inside the building.',
      'A break never means a trip outside.',
    ],
  },
];

export const ValuesSection: React.FC = React.memo(() => {
  const objectives = OBJECTIVES;

  return (
    <ScrollReveal as="section" id="about" aria-labelledby="strategic-objectives-title" className="py-16 md:py-24 font-[var(--font-sans)] bg-[var(--color-bg)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Main Card Container with continuous Scroll-linked 3D depth */}
        <Scroll3D preset="section" className="w-full">
          <div className="bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] p-8 sm:p-12 lg:p-14 shadow-[0_10px_35px_rgba(31,32,34,0.06)]">
            {/* Header Split Row */}
            <ScrollRevealItem delay={40} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-12 sm:mb-16">
              <div className="lg:col-span-6">
                <span className="section-label text-xs block mb-3 font-semibold uppercase tracking-wider text-[var(--color-gold)] font-[var(--font-sans)]">
                  Why SpaceDesk
                </span>
                <h2
                  id="strategic-objectives-title"
                  className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-[var(--color-charcoal)] leading-[1.15] tracking-tight"
                >
                  Why Work at SpaceDesk
                </h2>
              </div>
              <div className="lg:col-span-6 lg:pt-1">
                <p className="text-sm sm:text-base text-[var(--color-charcoal)]/80 leading-relaxed font-normal">
                  Everything a Bhopal freelancer, startup or growing team needs is already set up. Bring your laptop, plug in and get on with your day.
                </p>
              </div>
            </ScrollRevealItem>

            {/* 4 Objective Cards Row with Scroll-linked 3D perspective */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch pt-2">
              {objectives.map((item, idx) => {
                const isDark = Boolean(item.isDark);

                return (
                  <ScrollRevealItem key={item.id} index={idx} delay={120 + idx * 80} className="h-full">
                    <ScrollCard3D index={idx} total={objectives.length} className="h-full">
                      <Tilt3D
                        maxTilt={isDark ? 4.5 : 2.5}
                        scale={isDark ? 1.02 : 1.01}
                        className={`h-full rounded-[26px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ease-out relative select-none hover:scale-[1.02] ${
                          isDark
                            ? 'bg-[var(--color-charcoal)] text-[var(--color-white)] shadow-2xl lg:-rotate-2 lg:scale-[1.03] z-10 hover:rotate-0 hover:scale-105 border border-[var(--color-border)]/20 hover:border-[var(--color-primary)]/60 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)]'
                            : 'bg-[#F8FAFC] text-[var(--color-charcoal)] border border-[var(--color-border)] hover:bg-white hover:border-[var(--color-charcoal)]/30 hover:-translate-y-1 hover:shadow-xl shadow-sm'
                        }`}
                      >
                        <div>
                          {/* Icon Badge */}
                          <CardIconBadge icon={item.icon} isDark={isDark} />

                          {/* Title */}
                          <h3
                            className={`text-lg sm:text-[20px] font-bold mt-5 sm:mt-7 mb-3 sm:mb-4 leading-snug tracking-tight font-[var(--font-sans)] ${
                              isDark ? 'text-[var(--color-white)]' : 'text-[var(--color-charcoal)]'
                            }`}
                          >
                            {item.title}
                          </h3>

                          {/* Bullet Points */}
                          <ul className="space-y-2.5 sm:space-y-3 font-[var(--font-sans)] font-semibold sm:font-bold text-sm sm:text-[15px] lg:text-[16px] leading-relaxed">
                            {item.points.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className={`leading-relaxed flex items-start gap-2 ${
                                  isDark ? 'text-[var(--color-text-on-dark)]' : 'text-[var(--color-charcoal)]/85'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                                    isDark ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-charcoal)]'
                                  }`}
                                />
                                <span className="text-[13px]">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Tilt3D>
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
