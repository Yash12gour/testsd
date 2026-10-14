import React, { useState } from 'react';
import {
  FileText,
  Building2,
  Calendar,
  CreditCard,
  Users,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Clock,
  Key,
  Globe,
  HelpCircle,
  Mail,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Lock,
  Sparkles,
  Award,
} from 'lucide-react';
import { brandName } from '../data/content';
import { Reveal } from './Reveal';
import { ImageWithFallback } from './ImageWithFallback';
import { Scroll3D, ScrollCard3D, ScrollParallax3D } from './motion';
import { SEO } from './SEO';

interface TermsOfServicePageProps {
  onBookTourClick: () => void;
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({
  onBookTourClick,
  onNavigateHome,
  onNavigateContact,
}) => {
  const [expandedSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full font-[var(--font-sans)] bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] fade-in-up">
      <SEO
        title="Terms of Service – SpaceDesk Membership & Facility Agreement"
        description="Read our terms and conditions regarding workspace usage, guest policies, membership plans, and community guidelines."
        ogTitle="Terms of Service – SpaceDesk"
        ogDescription="Read our terms and conditions regarding workspace usage, guest policies, membership plans, and community guidelines."
        ogImage="/images/hero-modern-coworking-office.jpg"
        canonicalUrl="/#terms"
      />
      {/* Breadcrumb Header */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-4 flex items-center justify-between text-xs text-[var(--color-muted)]">
        <div className="flex items-center gap-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="hover:text-[var(--color-charcoal)] transition-colors underline-offset-4 hover:underline"
          >
            Home
          </a>
          <span>/</span>
          <span className="font-semibold text-[var(--color-charcoal)]">Terms of Service</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Facility & Digital Agreement
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <Reveal variant="fade">
          <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-6 sm:p-12 lg:p-16 border border-[var(--color-border)]/20 shadow-xl">
            {/* Background Ambient Overlay */}
            <div className="absolute inset-0 z-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85"
                alt="SpaceDesk architectural office"
                fallbackTitle="SpaceDesk Member Agreement"
                theme="dark"
                containerClassName="w-full h-full"
                className="object-cover object-center filter brightness-40 contrast-125 opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/60 pointer-events-none" />
            </div>

            {/* Content Header */}
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
                <FileText className="w-3.5 h-3.5 text-[var(--color-charcoal)]" />
                <span>Terms of Service</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                Simple Terms.{' '}
                <span className="italic text-[var(--color-primary)]">
                  Clear Expectations.
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                These terms govern your access to SpaceDesk physical coworking facilities, dedicated workstations, meeting suites, and digital booking services.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-[var(--color-text-on-dark)] border-t border-white/10 pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <span>Month-to-Month Flexibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <span>Fair House Rules</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. QUICK OVERVIEW CARDS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Reveal variant="up" className="text-center max-w-xl mx-auto mb-10">
          <span className="section-label text-xs block mb-2">Key Highlights</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
            Agreement Overview
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Reveal variant="up" delay={40}>
            <div className="bg-[var(--color-white)] rounded-[24px] border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">Use of Space</h3>
                <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                  Access workstations, quiet zones, and deli lounges respectfully during allocated hours.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                Fair Access
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <div className="bg-[var(--color-white)] rounded-[24px] border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">Bookings</h3>
                <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                  Reserve day passes and conference suites instantly with real-time confirmation.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                Instant Pass
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={120}>
            <div className="bg-[var(--color-white)] rounded-[24px] border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-4">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">Payments</h3>
                <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                  Transparent monthly billing with zero setup fees or surprise utility surcharges.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                Zero Hidden Fees
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={160}>
            <div className="bg-[var(--color-white)] rounded-[24px] border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">Community</h3>
                <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                  Maintain professional courtesy, reasonable acoustic levels, and clean shared amenities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                Mutual Respect
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. USING OUR SPACE */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] p-6 sm:p-12 shadow-sm">
          <Reveal variant="up" className="max-w-xl mb-10">
            <span className="section-label text-xs block mb-2">Space Code</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
              Using Our Facilities
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text)] mt-2">
              Simple guidelines designed so everyone enjoys a productive work environment.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-charcoal)] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)]" />
              </div>
              <h3 className="font-semibold text-sm text-[var(--color-charcoal)]">Respect the Space</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Treat desks, task chairs, screens, and deli fixtures with care so facilities remain pristine.
              </p>
            </div>

            <div className="p-5 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-charcoal)] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)]" />
              </div>
              <h3 className="font-semibold text-sm text-[var(--color-charcoal)]">Respect Others</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Use soundproof phone booths for long calls and keep headphone audio contained in open zones.
              </p>
            </div>

            <div className="p-5 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-charcoal)] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)]" />
              </div>
              <h3 className="font-semibold text-sm text-[var(--color-charcoal)]">House Rules</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Follow safety, biometric entry, guest check-in, and parking policies at [Jaswant Tower].
              </p>
            </div>

            <div className="p-5 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-charcoal)] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)]" />
              </div>
              <h3 className="font-semibold text-sm text-[var(--color-charcoal)]">Responsible Utility</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Utilize high-speed symmetric Wi-Fi and power strips strictly for legitimate business activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEMBERSHIP & BOOKINGS (PROCESS TIMELINE) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <Reveal variant="up" className="text-center max-w-xl mx-auto mb-12">
          <span className="section-label text-xs block mb-2">Member Journey</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
            Bookings & Access Flow
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[var(--color-white)] rounded-[26px] border border-[var(--color-border)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-2xl font-normal text-[var(--color-gold)]">01</span>
              <span className="px-2.5 py-1 rounded-full bg-[var(--color-tile)] text-[10px] font-semibold text-[var(--color-charcoal)] uppercase">Select Plan</span>
            </div>
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Choose Your Setup</h3>
            <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
              Select Day Pass, Dedicated Desk, or Private Cabin based on your team size [Plan Details].
            </p>
          </div>

          <div className="bg-[var(--color-white)] rounded-[26px] border border-[var(--color-border)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-2xl font-normal text-[var(--color-gold)]">02</span>
              <span className="px-2.5 py-1 rounded-full bg-[var(--color-tile)] text-[10px] font-semibold text-[var(--color-charcoal)] uppercase">Confirmation</span>
            </div>
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Instant Key Generation</h3>
            <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
              Receive digital QR pass and Wi-Fi credentials dispatched immediately to your email.
            </p>
          </div>

          <div className="bg-[var(--color-white)] rounded-[26px] border border-[var(--color-border)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-2xl font-normal text-[var(--color-gold)]">03</span>
              <span className="px-2.5 py-1 rounded-full bg-[var(--color-tile)] text-[10px] font-semibold text-[var(--color-charcoal)] uppercase">Check In</span>
            </div>
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Turnstile Scan</h3>
            <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
              Scan pass at turnstile for 24/7 biometric/RFID access to your designated workspace.
            </p>
          </div>

          <div className="bg-[var(--color-white)] rounded-[26px] border border-[var(--color-border)] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-2xl font-normal text-[var(--color-gold)]">04</span>
              <span className="px-2.5 py-1 rounded-full bg-[var(--color-tile)] text-[10px] font-semibold text-[var(--color-charcoal)] uppercase">Work & Scale</span>
            </div>
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Flexible Terms</h3>
            <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
              Upgrade seating or modify reservation dates easily under [Cancellation Policy].
            </p>
          </div>
        </div>
      </section>

      {/* 5. PAYMENTS & BILLING */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] p-6 sm:p-12 shadow-sm">
          <Reveal variant="up" className="max-w-xl mb-10">
            <span className="section-label text-xs block mb-2">Billing Transparency</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)]">
              Payments & Refund Terms
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <CreditCard className="w-5 h-5 text-[var(--color-gold)]" />
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Upfront Pricing</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                All rates displayed include standard amenities, Wi-Fi, and power backup with zero hidden surcharges.
              </p>
            </div>

            <div className="p-5 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <Clock className="w-5 h-5 text-[var(--color-gold)]" />
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Billing Cycles</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Monthly memberships recur on the 1st of each month. Invoices sent 7 days in advance.
              </p>
            </div>

            <div className="p-5 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <ShieldCheck className="w-5 h-5 text-[var(--color-gold)]" />
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Refund Policy</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Day passes are 100% refundable up to 24 hours prior to reservation time under [Refund Terms].
              </p>
            </div>

            <div className="p-5 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <AlertCircle className="w-5 h-5 text-[var(--color-gold)]" />
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Late Payments</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                A 3-day grace period is extended before biometric turnstile access is temporarily paused.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ACCEPTABLE USE (ALLOWED VS NOT ALLOWED) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <Reveal variant="up" className="text-center max-w-xl mx-auto mb-10">
          <span className="section-label text-xs block mb-2">Code of Conduct</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
            Acceptable Use Standard
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ALLOWED */}
          <div className="bg-[var(--color-white)] rounded-[28px] border border-emerald-200/60 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm mb-6 pb-3 border-b border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
              <span>Allowed & Encouraged</span>
            </div>
            <ul className="space-y-3 text-xs text-[var(--color-text)]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Hosting registered clients and guests in reception lounges and meeting rooms.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Utilizing artisanal tea, coffee, and Space Deli seating for informal chats.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Customizing private cabin interiors with non-permanent branding.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Participating in community networking sessions and founder mixers.</span>
              </li>
            </ul>
          </div>

          {/* NOT ALLOWED */}
          <div className="bg-[var(--color-white)] rounded-[28px] border border-amber-200/60 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm mb-6 pb-3 border-b border-amber-100">
              <XCircle className="w-5 h-5" />
              <span>Not Permitted</span>
            </div>
            <ul className="space-y-3 text-xs text-[var(--color-text)]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Sharing biometric turnstile credentials or keycards with unregistered individuals.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Loud speakerphone calls in designated quiet workstation bays.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Unauthorized alteration of facility electrical or architectural fixtures.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Engaging in unlawful activities or disruptive commercial practices.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. MEMBER RESPONSIBILITIES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <Reveal variant="up" className="text-center max-w-xl mx-auto mb-10">
          <span className="section-label text-xs block mb-2">Member Role</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)]">
            Member Responsibilities
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-6 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] shadow-sm space-y-2">
            <Lock className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Secure Belongings</h3>
            <p className="text-xs text-[var(--color-text)]">Use lockable pedestals provided with dedicated desks for personal valuables.</p>
          </div>

          <div className="p-6 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] shadow-sm space-y-2">
            <Key className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Protect Access Keys</h3>
            <p className="text-xs text-[var(--color-text)]">Keep RFID passes and mobile QR credentials secure at all times.</p>
          </div>

          <div className="p-6 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] shadow-sm space-y-2">
            <Sparkles className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Clean Shared Spaces</h3>
            <p className="text-xs text-[var(--color-text)]">Clear deli tables and phone booths promptly after finish for the next member.</p>
          </div>

          <div className="p-6 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] shadow-sm space-y-2">
            <AlertCircle className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Report Issues</h3>
            <p className="text-xs text-[var(--color-text)]">Notify community desk staff immediately if maintenance or Wi-Fi issues arise.</p>
          </div>

          <div className="p-6 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] shadow-sm space-y-2">
            <Users className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Register Visitors</h3>
            <p className="text-xs text-[var(--color-text)]">Log all external guests at the front desk prior to entering meeting suites.</p>
          </div>

          <div className="p-6 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] shadow-sm space-y-2">
            <ShieldCheck className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Follow Safety Guidance</h3>
            <p className="text-xs text-[var(--color-text)]">Adhere to emergency exit routes and building security instructions.</p>
          </div>
        </div>
      </section>

      {/* 8. CANCELLATION & TERMINATION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] p-6 sm:p-12 shadow-sm">
          <Reveal variant="up" className="max-w-xl mb-8">
            <span className="section-label text-xs block mb-2">Flexibility Terms</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)]">
              Cancellation & Termination
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-[20px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <span className="text-[10px] font-semibold text-[var(--color-gold)] uppercase tracking-wider block">Step 01</span>
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Written Notice</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Submit a cancellation request via email to [Support Email] 30 days prior to monthly renewal date.
              </p>
            </div>

            <div className="p-5 rounded-[20px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <span className="text-[10px] font-semibold text-[var(--color-gold)] uppercase tracking-wider block">Step 02</span>
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Account Reconciliation</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Outstanding meeting room credits or keycard deposits are settled under [Deposit Policy].
              </p>
            </div>

            <div className="p-5 rounded-[20px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-2">
              <span className="text-[10px] font-semibold text-[var(--color-gold)] uppercase tracking-wider block">Step 03</span>
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Smooth Offboarding</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Biometric keys are deactivated at cycle end with zero lock-in penalties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. LIABILITY & RESPONSIBILITY (EXPANDABLE DETAILS) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Reveal variant="up" className="text-center mb-10">
            <span className="section-label text-xs block mb-2">Legal Boundaries</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)]">
              Liability & Service Scope
            </h2>
          </Reveal>

          <div className="space-y-3">
            {[
              {
                id: 'l1',
                title: 'Personal Belongings & Equipment',
                summary: 'Members maintain responsibility for personal laptops, devices, and personal property.',
                details: 'SpaceDesk provides lockable storage pedestals and 24/7 CCTV surveillance, but is not liable for loss or damage to unattended personal equipment under [Liability Terms].'
              },
              {
                id: 'l2',
                title: 'Service Uptime & Utilities',
                summary: 'We maintain 300 Mbps fiber line and 100% DG backup for continuous operations.',
                details: 'In the rare event of regional telecom outages or municipal power events, automated failover routes engage immediately to minimize disruption.'
              },
              {
                id: 'l3',
                title: 'Third-Party Services',
                summary: 'External catering, courier dispatches, and guest tools operate under their respective terms.',
                details: 'SpaceDesk facilitates vendor access to the building but is not directly responsible for third-party courier or catering performance.'
              },
            ].map((item) => {
              const isOpen = expandedSection === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-[var(--color-white)] rounded-[22px] border border-[var(--color-border)] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(item.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus-ring"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-[var(--color-charcoal)]">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text)] mt-1">
                        {item.summary}
                      </p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[var(--color-gold)] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[var(--color-text)] leading-relaxed border-t border-[var(--color-border)]/50 animate-fadeIn">
                      {item.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. INTELLECTUAL PROPERTY & BRANDING */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] p-6 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="space-y-2 md:col-span-2">
              <span className="section-label text-xs block">Brand Assets</span>
              <h2 className="font-heading text-2xl sm:text-3xl font-normal text-[var(--color-charcoal)]">
                Intellectual Property & Media
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed">
                All SpaceDesk logos, architectural designs, website content, and custom interior imagery are protected trademarks. Members retain 100% intellectual property rights over all work created within our spaces.
              </p>
            </div>
            <div className="p-5 rounded-[22px] bg-[var(--color-tile)] border border-[var(--color-border)] text-center space-y-2">
              <Award className="w-6 h-6 text-[var(--color-gold)] mx-auto" />
              <p className="text-xs font-semibold text-[var(--color-charcoal)]">Your IP Stays Yours</p>
              <p className="text-[11px] text-[var(--color-text)]">Zero claim on member startup code or creative work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. TERMS UPDATES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-[var(--color-tile)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-white)] text-[var(--color-gold)] flex items-center justify-center shrink-0 border border-[var(--color-border)]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)] block">Terms Version</span>
              <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">
                Last Updated: October 2026
              </h3>
              <p className="text-xs text-[var(--color-text)] mt-0.5">
                Terms may be updated periodically to reflect facility additions or regulatory updates.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-[var(--color-white)] text-[var(--color-charcoal)] text-xs font-semibold border border-[var(--color-border)] shrink-0">
            Version 3.1 · Active
          </span>
        </div>
      </section>

      {/* 12. CONTACT SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-20 md:pb-28">
        <Reveal variant="scale">
          <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-8 sm:p-14 text-center border border-[var(--color-border)] shadow-2xl">
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <span className="section-label text-xs block text-[var(--color-primary)]">
                Member Clarification
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-normal text-[var(--color-white)] leading-tight">
                Need Clarification?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-on-dark)] max-w-md mx-auto leading-relaxed">
                Our community team is happy to walk you through house rules, plan terms, or booking policies.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:legal@spacedesk.in"
                  className="group px-8 py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[var(--color-charcoal)]" />
                  <span>Email Member Desk</span>
                </a>
                <button
                  type="button"
                  onClick={onBookTourClick}
                  className="group px-8 py-4 rounded-full border border-[var(--color-white)] text-[var(--color-white)] hover:bg-white/10 font-semibold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                >
                  <span>Book Facility Tour</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--color-white)]" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
