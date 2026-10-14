import React from 'react';
import {
  Calendar,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { brandName } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Tilt3D } from './Tilt3D';
import { Scroll3D, ScrollCard3D, ScrollImageDepth, ScrollParallax3D } from './motion';
import { SEO } from './SEO';
import { CountUpNumber } from './CountUpNumber';

interface PricingPageProps {
  onBookTourClick: (workspaceId?: string) => void;
  onDayPassClick: () => void;
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onBookTourClick,
  onDayPassClick,
  onNavigateHome,
  onNavigateContact,
}) => {
  // Core Membership Plans (Verified from Spacedesk application specs)
  const membershipPlans = [
    {
      id: 'dedicated-desk',
      title: 'Dedicated Desk',
      tagline: 'Your personal permanent desk',
      badge: 'Most Popular',
      price: '₹5,000',
      period: '/ month',
      desc: 'Your own reserved desk ready every morning. Built for solo creators, coders, consultants, and remote pros.',
      isPopular: true,
      buttonText: 'Reserve Your Desk',
      actionType: 'tour',
      workspaceId: 'dedicated-desk',
      features: [
        'Personal reserved desk with ergonomic chair',
        'Lockable private storage locker',
        '24/7 biometric keycard access',
        'Meeting room credits included each month',
        '300 Mbps high-speed dual fiber Wi-Fi',
        'Full power backup with zero cutover lag',
        'Cafeteria refreshments & front desk mail support',
        'GST invoice & business address use',
      ],
      notIncluded: [
        'Lockable soundproof private cabin walls',
      ],
    },
    {
      id: 'private-cabin',
      title: 'Private Cabin',
      tagline: 'Acoustic privacy for your team',
      badge: 'Small Teams',
      price: '₹25,000',
      period: '/ month',
      desc: 'A dedicated, sound-insulated private cabin with whiteboards and custom branding space for startups and teams of 4–8.',
      isPopular: false,
      buttonText: 'Book Cabin Tour',
      actionType: 'tour',
      workspaceId: 'private-cabin',
      features: [
        'Lockable soundproof private team cabin',
        '4 to 8 ergonomic workstations inside',
        'Magnetic whiteboard & internal glass branding space',
        '24/7 biometric access for all team members',
        'Generous monthly meeting room booking credits',
        'Dual fiber internet with failover lines',
        'Priority front desk, mail & client hosting support',
        'Daily dedicated housekeeping & sanitization',
      ],
      notIncluded: [],
    },
    {
      id: 'managed-office',
      title: 'Managed Office',
      tagline: 'Custom enterprise suite',
      badge: 'Enterprises & Scaleups',
      price: '₹75,000',
      period: '/ month',
      desc: 'A fully managed, custom-built office suite tailored for growing companies and branch offices with dedicated facility management.',
      isPopular: false,
      buttonText: 'Enquire Managed Office',
      actionType: 'tour',
      workspaceId: 'managed-office',
      features: [
        'Custom layout tailored for 10–50+ persons',
        'Executive cabins, internal breakout & private rooms',
        'Dedicated on-site facility & operations manager',
        'Custom enterprise corporate branding & reception',
        'Enterprise-grade security, CCTV & biometric access',
        'Unlimited meeting room & conference access',
        'Daily hospitality, sanitization & housekeeping',
      ],
      notIncluded: [],
    },
  ];

  return (
    <div className="w-full bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] font-[var(--font-sans)]">
      <SEO
        title="Coworking Space Pricing & Plans in Bhopal | SpaceDesk Co-Working"
        description="Transparent coworking pricing in Bhopal: Dedicated Desks at ₹5,000/month, Private Cabins at ₹25,000/month, and Managed Offices at ₹75,000/month. Fast 300 Mbps fiber & power backup."
        ogTitle="SpaceDesk Coworking Pricing & Memberships | Bhopal"
        ogDescription="Explore simple, transparent pricing for dedicated desks, private cabins, managed offices, and meeting rooms at SpaceDesk, Misrod, Bhopal."
        ogImage="/images/hero-modern-coworking-office.jpg"
        canonicalUrl="/pricing"
      />

      {/* Breadcrumb Navigation */}
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
          <span className="font-semibold text-[var(--color-charcoal)]">Pricing &amp; Plans</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Bhopal · 0% Hidden Charges
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 md:pb-24 relative">
        <div className="absolute -top-10 -right-12 w-72 h-72 rounded-full bg-gradient-to-tr from-[var(--color-primary)]/10 via-[var(--color-gold)]/10 to-transparent blur-2xl pointer-events-none hidden md:block">
          <ScrollParallax3D speed={-0.12} depth={30} rotateXAmount={4} rotateYAmount={6}>
            <div className="w-full h-full rounded-3xl border border-[var(--color-gold)]/20 transform rotate-12" />
          </ScrollParallax3D>
        </div>

        <Scroll3D preset="hero" intensity="subtle">
          <Reveal variant="fade">
            <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-6 sm:p-12 lg:p-16 border border-[var(--color-border)] shadow-xl group">
              {/* Ambient Background */}
              <div className="absolute inset-0 z-0">
                <ScrollImageDepth depth={14} rotateAmount={1.2}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85"
                    alt="SpaceDesk Coworking Pricing in Bhopal"
                    fallbackTitle="SpaceDesk Pricing"
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
                  Simple, Transparent Pricing
                </span>
              </div>

              {/* Main Headline */}
              <div className="relative z-10 mt-10 sm:mt-16 max-w-3xl">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                  Find your space to{' '}
                  <span className="italic text-[var(--color-primary)]">
                    do your best work.
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-xl text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                  From dedicated ergonomic desks to fully managed enterprise team suites. High-speed dual fiber, ergonomic chairs, uninterrupted power, and premium coffee included with every plan.
                </p>

                {/* CTAs */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="#membership-plans"
                    className="group px-8 py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Explore Memberships</span>
                    <ArrowRight className="w-4 h-4 text-[var(--color-charcoal)] group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onBookTourClick()}
                    className="group px-8 py-4 rounded-full border border-[var(--color-white)] text-[var(--color-white)] hover:bg-white/10 hover:border-white font-semibold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[var(--color-white)] group-hover:rotate-6 transition-transform duration-300" aria-hidden="true" />
                    <span>Book a Free Tour</span>
                  </button>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="relative z-10 mt-12 pt-8 border-t border-[var(--color-border)]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[var(--color-text-on-dark)]">
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="₹5,000" delay={0} duration={1400} />
                  </span>
                  <span className="mt-1 block">Starting Monthly Plan</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="300 Mbps" delay={100} duration={1600} />
                  </span>
                  <span className="mt-1 block">Dual Fiber Internet</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="24/7" delay={200} duration={1600} />
                  </span>
                  <span className="mt-1 block">Biometric Member Access</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="0%" delay={300} duration={1400} />
                  </span>
                  <span className="mt-1 block">Hidden Fees or Lock-in</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Scroll3D>
      </section>

      {/* 2. MEMBERSHIP PLANS SECTION */}
      <section id="membership-plans" className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-24 md:pb-32">
        <Scroll3D preset="section" intensity="subtle">
          <Reveal variant="up" className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label text-xs block mb-3">
              Membership Plans
            </span>
            <h2 className="font-heading text-[clamp(1.75rem,4.5vw,3rem)] font-normal text-[var(--color-charcoal)] leading-tight text-balance">
              Pick the plan tailored for your work style.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[var(--color-muted)] font-normal text-balance">
              All plans include high-speed Wi-Fi, electricity, 100% power backup, and pantry refreshments.
            </p>
          </Reveal>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            {membershipPlans.map((plan, idx) => {
              const isPopular = plan.isPopular;
              return (
                <Reveal key={plan.id} variant="up" delay={idx * 70} className="h-full">
                  <ScrollCard3D index={idx} total={membershipPlans.length} depth={18} className="h-full">
                    <Tilt3D
                      maxTilt={isPopular ? 3.5 : 2.5}
                      scale={isPopular ? 1.02 : 1.01}
                      className={`h-full rounded-[28px] border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl ${
                        isPopular
                          ? 'bg-[var(--color-white)] border-[var(--color-gold)] shadow-xl ring-2 ring-[var(--color-gold)]/30 hover:ring-[var(--color-gold)]/50'
                          : 'bg-[var(--color-white)] border-[var(--color-border)] shadow-sm hover:border-[var(--color-gold)]/40'
                      }`}
                    >
                      <div>
                        {/* Plan Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                              isPopular
                                ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)]'
                                : 'bg-[var(--color-tile)] text-[var(--color-charcoal)] group-hover:bg-[var(--color-primary)]'
                            }`}
                          >
                            {plan.badge}
                          </span>
                        </div>

                        {/* Plan Title & Tagline */}
                        <h3 className="card-title text-2xl mb-1 group-hover:text-[var(--color-gold)] transition-colors">
                          {plan.title}
                        </h3>
                        <p className="text-xs text-[var(--color-muted)] mb-5">
                          {plan.tagline}
                        </p>

                        {/* Price Block */}
                        <div className="flex items-baseline gap-1 pb-5 mb-5 border-b border-[var(--color-border)]/60">
                          <span className="font-heading text-3xl sm:text-4xl text-[var(--color-charcoal)] font-normal">
                            {plan.price}
                          </span>
                          <span className="text-xs text-[var(--color-muted)] font-medium">
                            {plan.period}
                          </span>
                        </div>

                        <p className="text-xs text-[var(--color-text)] leading-relaxed mb-6">
                          {plan.desc}
                        </p>

                        {/* Checklist */}
                        <div className="space-y-2.5 pt-1 mb-8">
                          {plan.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[var(--color-text)]">
                              <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4 border-t border-[var(--color-border)]/60">
                        <button
                          type="button"
                          onClick={() => {
                            if (plan.actionType === 'dayPass') {
                              onDayPassClick();
                            } else {
                              onBookTourClick(plan.workspaceId);
                            }
                          }}
                          aria-label={`${plan.buttonText} for ${plan.title}`}
                          className={`w-full py-3.5 px-4 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                            isPopular
                              ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)] hover:opacity-95 hover:scale-[1.02] shadow-sm'
                              : 'bg-[var(--color-charcoal)] text-[var(--color-white)] hover:opacity-95 hover:scale-[1.02]'
                          }`}
                        >
                          <span>{plan.buttonText}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </Tilt3D>
                  </ScrollCard3D>
                </Reveal>
              );
            })}
          </div>
        </Scroll3D>
      </section>
    </div>
  );
};
