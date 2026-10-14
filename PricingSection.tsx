import React from 'react';
import { Check } from 'lucide-react';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { Scroll3D, ScrollCard3D } from './motion';
import { Tilt3D } from './Tilt3D';

interface PricingSectionProps {
  onSelectPlan: (planId: string) => void;
}

interface PlanItem {
  id: string;
  badge: string;
  badgeType: 'starter' | 'professional' | 'enterprise';
  price: string;
  period?: string;
  targetAudience: string;
  ctaText: string;
  features: string[];
  isHighlighted?: boolean;
}

const PLANS: PlanItem[] = [
  {
    id: 'managed-office',
    badge: 'Managed Office',
    badgeType: 'enterprise',
    price: '₹75,000',
    period: '/month',
    targetAudience: 'For growing teams and enterprises',
    ctaText: 'Enquire Managed Office',
    features: [
      'Tailored private office suite',
      'High-speed enterprise Wi-Fi & backup',
      'Dedicated operations & facility manager',
      'Meeting room credits & cabins',
      'Daily housekeeping & reception support',
    ],
  },
  {
    id: 'dedicated-desk',
    badge: 'Dedicated Desk',
    badgeType: 'professional',
    price: '₹5,000',
    period: '/month',
    targetAudience: 'For solo creators and remote pros',
    ctaText: 'Choose Dedicated Desk',
    isHighlighted: true,
    features: [
      'Reserved desk',
      'Ergonomic chair',
      '24/7 access',
      'Meeting room credits',
      'Storage locker',
    ],
  },
  {
    id: 'private-cabin',
    badge: 'Private Cabin',
    badgeType: 'enterprise',
    price: '₹25,000',
    period: '/month',
    targetAudience: 'For startups and small teams',
    ctaText: 'Ask About Cabins',
    features: [
      'Lockable private cabin',
      'Acoustic privacy',
      'Whiteboards',
      'Space for your own branding',
      'Fast internet and power backup',
    ],
  },
];

export const PricingSection: React.FC<PricingSectionProps> = React.memo(({ onSelectPlan }) => {
  const plans = PLANS;

  return (
    <ScrollReveal as="section" id="pricing" aria-labelledby="pricing-plans-title" className="py-20 md:py-28 font-[var(--font-sans)] bg-[var(--color-bg-warm)] relative">
      <div id="plans" className="sr-only" aria-hidden="true" />
      <Scroll3D preset="section" className="w-full">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching reference */}
        <ScrollRevealItem delay={40} className="text-center max-w-xl mx-auto mb-14 sm:mb-16">
          <h2
            id="pricing-plans-title"
            className="text-[clamp(1.75rem,4.5vw,3rem)] font-bold tracking-tight text-[var(--color-charcoal)] leading-tight font-[var(--font-sans)] text-balance"
          >
            Coworking Space Pricing in Bhopal
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-[var(--color-text)] font-normal text-balance">
            Simple daily and monthly plans, with no hidden charges.
          </p>
        </ScrollRevealItem>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-[1120px] mx-auto">
          {plans.map((plan, idx) => {
            const isProfessional = plan.badgeType === 'professional';

            return (
              <ScrollRevealItem key={plan.id} index={idx} delay={120 + idx * 90} className="h-full">
                <ScrollCard3D index={idx} total={plans.length} className="h-full">
                  <Tilt3D
                    maxTilt={isProfessional ? 3.5 : 2.5}
                    scale={isProfessional ? 1.02 : 1.01}
                    className="h-full bg-white rounded-[28px] border border-[var(--color-border)] p-6 sm:p-7 shadow-[0_10px_35px_rgba(31,32,34,0.05)] hover:shadow-[0_20px_45px_rgba(31,32,34,0.09)] transition-all duration-300 flex flex-col justify-between"
                  >
                  <div>
                    {/* Top Block Container */}
                    <div
                      className={`rounded-[22px] p-6 transition-colors ${
                        isProfessional
                          ? 'bg-gradient-to-b from-[#E0E7FF]/80 to-[#EEF2FF] border border-[#C7D2FE]/60'
                          : 'bg-[#F4F5F7] border border-[var(--color-border)]/60'
                      }`}
                    >
                      {/* Pill Badge */}
                      <div className="flex items-center justify-start">
                        <span
                          className={`px-3.5 py-1 rounded-full text-xs font-semibold shadow-sm inline-block ${
                            isProfessional
                              ? 'bg-white text-[#3730A3] tracking-wider uppercase'
                              : plan.badgeType === 'enterprise'
                              ? 'bg-white text-[var(--color-charcoal)] tracking-wider uppercase'
                              : 'bg-white text-[var(--color-charcoal)] capitalize'
                          }`}
                        >
                          {plan.badge}
                        </span>
                      </div>

                      {/* Price and Period */}
                      <div className="mt-6 flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-charcoal)]">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-sm font-medium text-[var(--color-muted)]">
                            {plan.period}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Target Audience Line */}
                    <div className="mt-5 mb-4 text-left">
                      <p className="text-xs sm:text-sm font-medium text-[var(--color-charcoal)]">
                        {plan.targetAudience}
                      </p>
                    </div>

                    {/* Dark Pill CTA Button */}
                    <button
                      type="button"
                      onClick={() => onSelectPlan(plan.id)}
                      className="w-full py-3.5 px-6 rounded-full bg-gradient-to-b from-[#2B2C30] to-[#121316] text-white font-semibold text-xs sm:text-sm shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:opacity-95 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer focus-ring"
                    >
                      {plan.ctaText}
                    </button>

                    {/* Feature Checklist */}
                    <div className="mt-6 pt-2 space-y-3.5">
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#374151] font-medium">
                          <Check className="w-4 h-4 text-[#9CA3AF] stroke-[2.2] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tilt3D>
              </ScrollCard3D>
            </ScrollRevealItem>
            );
          })}
        </div>
      </div>
      </Scroll3D>
    </ScrollReveal>
  );
});
