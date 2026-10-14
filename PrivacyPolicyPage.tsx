import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Database,
  Eye,
  FileCheck,
  Server,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Calendar,
  Mail,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Globe,
  Cookie,
  Key,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { brandName } from '../data/content';
import { Reveal } from './Reveal';
import { ImageWithFallback } from './ImageWithFallback';
import { Scroll3D, ScrollCard3D, ScrollParallax3D } from './motion';
import { SEO } from './SEO';

interface PrivacyPolicyPageProps {
  onBookTourClick: () => void;
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
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
        title="Privacy Policy – SpaceDesk Flexible Workspaces"
        description="Learn how SpaceDesk protects and handles your personal information, membership details, and privacy across all our services."
        ogTitle="Privacy Policy – SpaceDesk"
        ogDescription="Learn how SpaceDesk protects and handles your personal information, membership details, and privacy across all our services."
        ogImage="/images/hero-modern-coworking-office.jpg"
        canonicalUrl="/#privacy"
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
          <span className="font-semibold text-[var(--color-charcoal)]">Privacy Policy</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Data Governance & Protection
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
                alt="SpaceDesk architectural facility"
                fallbackTitle="SpaceDesk Privacy Governance"
                theme="dark"
                containerClassName="w-full h-full"
                className="object-cover object-center filter brightness-40 contrast-125 opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/60 pointer-events-none" />
            </div>

            {/* Content Header */}
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
                <Shield className="w-3.5 h-3.5 text-[var(--color-charcoal)]" />
                <span>Privacy Policy</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                Your Privacy Matters.{' '}
                <span className="italic text-[var(--color-primary)]">
                  Total Transparency.
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                We safeguard your personal data, booking credentials, and digital footprint with the same architectural precision we apply to our physical workspaces.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-[var(--color-text-on-dark)] border-t border-white/10 pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <span>Zero Data Selling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                  <span>Biometric Key Security</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. PRIVACY OVERVIEW CARDS */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Reveal variant="up" className="text-center max-w-xl mx-auto mb-10">
          <span className="section-label text-xs block mb-2">
            Governance at a Glance
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
            How We Handle Your Data
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Reveal variant="up" delay={40}>
            <div className="bg-[var(--color-white)] rounded-[24px] border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-4">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">
                  Data We Collect
                </h3>
                <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                  Basic contact details, tour reservations, and workspace preferences required for membership.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                Purposeful Only
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <div className="bg-[var(--color-white)] rounded-[24px] border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">
                  Why We Collect It
                </h3>
                <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                  To issue digital turnstile keys, manage desk bookings, and process guest reservations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                Service Delivery
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={120}>
            <div className="bg-[var(--color-white)] rounded-[24px] border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">
                  How We Protect It
                </h3>
                <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                  AES-256 encrypted databases, isolated enterprise VLANs, and strict role access controls.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                Bank-Grade Security
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={160}>
            <div className="bg-[var(--color-white)] rounded-[24px] border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] flex items-center justify-center mb-4">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">
                  Your Choices
                </h3>
                <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                  Full control to request data exports, update information, or delete records anytime.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--color-border)]/60 text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider">
                100% User Control
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. INFORMATION WE COLLECT */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] p-6 sm:p-12 shadow-sm">
          <Reveal variant="up" className="max-w-xl mb-10">
            <span className="section-label text-xs block mb-2">
              Categories of Data
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
              Information Collected
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text)] mt-2">
              We restrict data collection strictly to what is necessary for operations.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal variant="up" delay={40}>
              <div className="p-6 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-charcoal)] flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="font-semibold text-base text-[var(--color-charcoal)]">Personal & Contact</h3>
                <p className="text-xs text-[var(--color-text)] leading-relaxed">
                  Name, corporate email, phone number, and company role submitted during tour bookings or membership inquiries.
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <div className="p-6 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-charcoal)] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="font-semibold text-base text-[var(--color-charcoal)]">Bookings & Facility</h3>
                <p className="text-xs text-[var(--color-text)] leading-relaxed">
                  Desk reservations, meeting room credits, tour scheduling timestamps, and turnstile access logs.
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={120}>
              <div className="p-6 rounded-[22px] bg-[var(--color-bg-warm)] border border-[var(--color-border)] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-charcoal)] flex items-center justify-center">
                  <Server className="w-5 h-5 text-[var(--color-gold)]" />
                </div>
                <h3 className="font-semibold text-base text-[var(--color-charcoal)]">Website & Technical</h3>
                <p className="text-xs text-[var(--color-text)] leading-relaxed">
                  Anonymized IP logs, browser type, device screen resolution, and session performance telemetry.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. HOW WE USE INFORMATION (CONNECTED PROCESS FLOW) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <Reveal variant="up" className="text-center max-w-xl mx-auto mb-12">
          <span className="section-label text-xs block mb-2">
            Data Lifecycle
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
            How Information Flows
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <Reveal variant="up" delay={40}>
            <div className="bg-[var(--color-white)] rounded-[26px] border border-[var(--color-border)] p-6 shadow-sm relative">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-normal text-[var(--color-gold)]">01</span>
                <span className="px-2.5 py-1 rounded-full bg-[var(--color-tile)] text-[10px] font-semibold text-[var(--color-charcoal)] uppercase">Collect</span>
              </div>
              <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">Secure Ingestion</h3>
              <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                Information is captured through encrypted HTTPS forms and authenticated biometric passes.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <div className="bg-[var(--color-white)] rounded-[26px] border border-[var(--color-border)] p-6 shadow-sm relative">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-normal text-[var(--color-gold)]">02</span>
                <span className="px-2.5 py-1 rounded-full bg-[var(--color-tile)] text-[10px] font-semibold text-[var(--color-charcoal)] uppercase">Use</span>
              </div>
              <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">Service Operation</h3>
              <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                Used to provision Wi-Fi keys, issue invoice receipts, and reserve conference rooms.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={120}>
            <div className="bg-[var(--color-white)] rounded-[26px] border border-[var(--color-border)] p-6 shadow-sm relative">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-normal text-[var(--color-gold)]">03</span>
                <span className="px-2.5 py-1 rounded-full bg-[var(--color-tile)] text-[10px] font-semibold text-[var(--color-charcoal)] uppercase">Protect</span>
              </div>
              <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">Encrypted Storage</h3>
              <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                Stored in isolated cloud partitions with automatic backup and continuous firewall auditing.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={160}>
            <div className="bg-[var(--color-white)] rounded-[26px] border border-[var(--color-border)] p-6 shadow-sm relative">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-normal text-[var(--color-gold)]">04</span>
                <span className="px-2.5 py-1 rounded-full bg-[var(--color-tile)] text-[10px] font-semibold text-[var(--color-charcoal)] uppercase">Improve</span>
              </div>
              <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">Refine Experience</h3>
              <p className="text-xs text-[var(--color-text)] mt-2 leading-relaxed">
                Anonymized insights help us optimize quiet zone lighting, Wi-Fi bandwidth, and deli hours.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. DATA PROTECTION & SECURITY */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-[var(--color-charcoal)] text-[var(--color-white)] rounded-[32px] p-8 sm:p-12 lg:p-16 border border-[var(--color-border)]/20 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="section-label text-xs block text-[var(--color-primary)]">
                Enterprise Standards
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-normal text-[var(--color-white)] leading-[1.15]">
                Bank-Grade Security Architecture
              </h2>
              <p className="text-sm text-[var(--color-text-on-dark)] leading-relaxed">
                Our physical and digital infrastructure is protected under multi-layer security protocols.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <Key className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="font-bold text-sm text-[var(--color-white)]">Encrypted Turnstiles</h3>
                <p className="text-xs text-[var(--color-text-on-dark)]">
                  Biometric and RFID keycard records stay isolated on local encrypted hardware.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <Globe className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="font-bold text-sm text-[var(--color-white)]">Private Member VLANs</h3>
                <p className="text-xs text-[var(--color-text-on-dark)]">
                  Private cabins receive dedicated VLAN subnets with hardware firewall isolation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="font-bold text-sm text-[var(--color-white)]">Zero Third-Party Sales</h3>
                <p className="text-xs text-[var(--color-text-on-dark)]">
                  We never sell, rent, or trade your personal information to data brokers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <Layers className="w-5 h-5 text-[var(--color-primary)]" />
                <h3 className="font-bold text-sm text-[var(--color-white)]">Restricted Access</h3>
                <p className="text-xs text-[var(--color-text-on-dark)]">
                  Only authorized community managers hold credentialed system access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COOKIES & WEBSITE USAGE */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] p-6 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--color-border)]">
            <div>
              <span className="section-label text-xs block mb-1">Browser Privacy</span>
              <h2 className="font-heading text-2xl sm:text-4xl font-normal text-[var(--color-charcoal)]">
                Cookies & Local Preferences
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-tile)] text-[var(--color-gold)] font-semibold text-xs">
              <Cookie className="w-4 h-4" />
              <span>Minimal Essential Cookies</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Essential Operations</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Remembers active page selection, booking calendar dates, and security tokens.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Performance Analytics</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Anonymized telemetry measures page loading speed and navigation flow without personal tracking.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-[var(--color-charcoal)]">Preference Memory</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Saves reduced motion preferences and preferred location filters locally on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THIRD-PARTY SERVICES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <Reveal variant="up" className="text-center max-w-xl mx-auto mb-10">
          <span className="section-label text-xs block mb-2">Trusted Ecosystem</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
            Third-Party Infrastructure
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] text-center space-y-2">
            <span className="text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider block">Payments</span>
            <p className="text-xs font-semibold text-[var(--color-charcoal)]">Encrypted Gateway</p>
            <p className="text-[11px] text-[var(--color-text)]">PCI-DSS Compliant</p>
          </div>

          <div className="p-5 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] text-center space-y-2">
            <span className="text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider block">Hosting</span>
            <p className="text-xs font-semibold text-[var(--color-charcoal)]">Enterprise Cloud</p>
            <p className="text-[11px] text-[var(--color-text)]">ISO 27001 Certified</p>
          </div>

          <div className="p-5 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] text-center space-y-2">
            <span className="text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider block">Messaging</span>
            <p className="text-xs font-semibold text-[var(--color-charcoal)]">Automated Dispatches</p>
            <p className="text-[11px] text-[var(--color-text)]">TLS Email & SMS</p>
          </div>

          <div className="p-5 rounded-[22px] bg-[var(--color-white)] border border-[var(--color-border)] text-center space-y-2">
            <span className="text-[11px] font-semibold text-[var(--color-gold)] uppercase tracking-wider block">Analytics</span>
            <p className="text-xs font-semibold text-[var(--color-charcoal)]">Privacy Analytics</p>
            <p className="text-[11px] text-[var(--color-text)]">No Cross-Site Tracking</p>
          </div>
        </div>
      </section>

      {/* 8. USER RIGHTS (EXPANDABLE/CARD ACCORDION) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <Reveal variant="up" className="text-center mb-10">
            <span className="section-label text-xs block mb-2">Your Control</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)]">
              Your Data Rights
            </h2>
          </Reveal>

          <div className="space-y-3">
            {[
              {
                id: 'r1',
                title: 'Right to Access',
                summary: 'Request a digital transcript of all personal data associated with your membership.',
                details: 'Send an email request to privacy@spacedesk.in to receive an exported JSON or PDF copy within 5 business days.'
              },
              {
                id: 'r2',
                title: 'Right to Rectification',
                summary: 'Update inaccurate contact details, billing information, or company branding.',
                details: 'You can modify details directly at the community manager desk or by contacting support.'
              },
              {
                id: 'r3',
                title: 'Right to Erasure (Forget Me)',
                summary: 'Request permanent deletion of your profile, tour records, and digital keys.',
                details: 'Upon membership termination, all biometric and phone logs are automatically purged after 30 days.'
              },
              {
                id: 'r4',
                title: 'Manage Communication Preferences',
                summary: 'Opt out of community newsletter dispatches or event invitations with one click.',
                details: 'Every dispatch email carries a 1-click unsubscribe link in the footer.'
              },
            ].map((right) => {
              const isOpen = expandedSection === right.id;
              return (
                <div
                  key={right.id}
                  className="bg-[var(--color-white)] rounded-[22px] border border-[var(--color-border)] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(right.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus-ring"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <h3 className="font-semibold text-sm sm:text-base text-[var(--color-charcoal)]">
                        {right.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text)] mt-1">
                        {right.summary}
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
                      {right.details}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. POLICY UPDATES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-[var(--color-tile)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-white)] text-[var(--color-gold)] flex items-center justify-center shrink-0 border border-[var(--color-border)]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)] block">Policy Version</span>
              <h3 className="font-bold text-base text-[var(--color-charcoal)] font-[var(--font-sans)]">
                Last Updated: October 2026
              </h3>
              <p className="text-xs text-[var(--color-text)] mt-0.5">
                We review policies annually to align with new data protection regulations.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 rounded-full bg-[var(--color-white)] text-[var(--color-charcoal)] text-xs font-semibold border border-[var(--color-border)] shrink-0">
            Version 2.4 · Active
          </span>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-20 md:pb-28">
        <Reveal variant="scale">
          <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-8 sm:p-14 text-center border border-[var(--color-border)] shadow-2xl">
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <span className="section-label text-xs block text-[var(--color-primary)]">
                Privacy Governance
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl font-normal text-[var(--color-white)] leading-tight">
                Questions About Privacy?
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-on-dark)] max-w-md mx-auto leading-relaxed">
                Our Community Officers and Data Security Lead are available to assist with data requests or access walkthroughs.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:privacy@spacedesk.in"
                  className="group px-8 py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[var(--color-charcoal)]" />
                  <span>Email Privacy Lead</span>
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
