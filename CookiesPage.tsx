import React, { useState, useEffect } from 'react';
import {
  Cookie,
  Shield,
  CheckCircle2,
  Lock,
  Sliders,
  BarChart3,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Clock,
  Calendar,
  Mail,
  Zap,
  Check,
  Info,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Layers,
  SlidersHorizontal,
} from 'lucide-react';
import { brandName } from '../data/content';
import { Reveal } from './Reveal';
import { AppPageType } from './Navbar';
import { Scroll3D, ScrollCard3D, ScrollParallax3D } from './motion';
import { SEO } from './SEO';

interface CookiesPageProps {
  onBookTourClick?: () => void;
  onNavigateHome: () => void;
  onNavigatePage?: (page: AppPageType) => void;
  onNavigateContact?: () => void;
}

interface CookiePreferenceState {
  essential: boolean; // Always true
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'spacedesk_cookie_preferences_v1';

export const CookiesPage: React.FC<CookiesPageProps> = ({
  onBookTourClick,
  onNavigateHome,
  onNavigatePage,
  onNavigateContact,
}) => {
  const [preferences, setPreferences] = useState<CookiePreferenceState>({
    essential: true,
    preferences: true,
    analytics: true,
    marketing: false,
  });

  const [savedSuccessMessage, setSavedSuccessMessage] = useState<string | null>(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({
          essential: true, // Always enforced
          preferences: Boolean(parsed.preferences),
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
        });
      }
    } catch {
      // Ignore storage read error
    }
  }, []);

  const handleToggle = (key: keyof CookiePreferenceState) => {
    if (key === 'essential') return; // Cannot toggle essential
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      setSavedSuccessMessage('Cookie preferences saved successfully!');
      setTimeout(() => setSavedSuccessMessage(null), 3500);
    } catch {
      setSavedSuccessMessage('Preferences updated for this session.');
      setTimeout(() => setSavedSuccessMessage(null), 3500);
    }
  };

  const handleAcceptAll = () => {
    const allEnabled = {
      essential: true,
      preferences: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allEnabled);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allEnabled));
      setSavedSuccessMessage('All cookies accepted and saved!');
      setTimeout(() => setSavedSuccessMessage(null), 3500);
    } catch {
      setSavedSuccessMessage('All cookies accepted.');
      setTimeout(() => setSavedSuccessMessage(null), 3500);
    }
  };

  const handleRejectNonEssential = () => {
    const minimal = {
      essential: true,
      preferences: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(minimal);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
      setSavedSuccessMessage('Only essential cookies will be used.');
      setTimeout(() => setSavedSuccessMessage(null), 3500);
    } catch {
      setSavedSuccessMessage('Non-essential cookies disabled.');
      setTimeout(() => setSavedSuccessMessage(null), 3500);
    }
  };

  const scrollToSettings = () => {
    const el = document.getElementById('cookie-preference-center');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full font-[var(--font-sans)] bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] fade-in-up">
      <SEO
        title="Cookie Policy – SpaceDesk Website & Digital Preferences"
        description="Understand how we use cookies and tracking technologies to ensure optimal performance, security, and a personalized browsing experience."
        ogTitle="Cookie Policy – SpaceDesk"
        ogDescription="Understand how we use cookies and tracking technologies to ensure optimal performance, security, and a personalized browsing experience."
        ogImage="/images/hero-modern-coworking-office.jpg"
        canonicalUrl="/#cookies"
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
            className="hover:text-[var(--color-charcoal)] transition-colors underline-offset-4 hover:underline focus-ring rounded"
          >
            Home
          </a>
          <span>/</span>
          <span className="font-semibold text-[var(--color-charcoal)]">Cookie Policy</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Cookie Usage & Controls
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
        <Reveal variant="fade">
          <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-6 sm:p-12 lg:p-16 border border-[var(--color-border)]/20 shadow-xl">
            {/* Background Accent Gradients */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[var(--color-gold)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-[var(--color-primary)] text-xs font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm border border-white/10">
                  <Cookie className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  <span>Cookie Policy</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal tracking-tight text-white mb-4 leading-tight">
                  How We Use Cookies
                </h1>
                <p className="text-base sm:text-lg text-[var(--color-text-on-dark)] font-normal leading-relaxed mb-6 max-w-xl">
                  Cookies help {brandName} run smoothly, remember your preferred workspace choices, and give you a seamless booking experience.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <button
                    type="button"
                    onClick={scrollToSettings}
                    className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-sm rounded-full hover:bg-yellow-300 transition-colors shadow-md flex items-center gap-2 focus-ring"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Manage Preferences</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-full transition-colors border border-white/20 backdrop-blur-sm flex items-center gap-2 focus-ring"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Accept All</span>
                  </button>
                </div>
              </div>

              {/* Minimal Hero Visual Element */}
              <div className="w-full sm:w-auto shrink-0 flex justify-center">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xs text-center shadow-2xl relative">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-primary)]">
                    <Cookie className="w-8 h-8" />
                  </div>
                  <h2 className="text-base font-semibold text-white mb-1">Your Privacy Control</h2>
                  <p className="text-xs text-[var(--color-text-on-dark)] mb-4">
                    Full transparency over session data, functional filters, and analytics.
                  </p>
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>GDPR & CCPA Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 2. COOKIE OVERVIEW (4 Cards) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <p className="section-label mb-2">Cookie Categories</p>
          <h2 className="text-2xl sm:text-3xl font-heading font-normal text-[var(--color-charcoal)]">
            Four Simple Cookie Types
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Essential */}
          <Reveal variant="fade" delay={0.05}>
            <div className="h-full bg-[var(--color-white)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Always Active
                  </span>
                </div>
                <h3 className="card-title text-lg font-semibold mb-2">Essential</h3>
                <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed mb-4">
                  Required for security, account login, and workspace tour modal navigation.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--color-border)] text-[11px] text-[var(--color-muted)] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Cannot be disabled</span>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Preferences */}
          <Reveal variant="fade" delay={0.1}>
            <div className="h-full bg-[var(--color-white)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      preferences.preferences
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {preferences.preferences ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <h3 className="card-title text-lg font-semibold mb-2">Preferences</h3>
                <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed mb-4">
                  Remembers your location choices, language, and selected workspace filters.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--color-border)] text-[11px] text-[var(--color-muted)] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Customizable in settings</span>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Analytics */}
          <Reveal variant="fade" delay={0.15}>
            <div className="h-full bg-[var(--color-white)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      preferences.analytics
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {preferences.analytics ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <h3 className="card-title text-lg font-semibold mb-2">Analytics</h3>
                <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed mb-4">
                  Helps us measure page load speeds, popular amenities, and site optimization.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--color-border)] text-[11px] text-[var(--color-muted)] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Anonymized aggregate metrics</span>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Marketing */}
          <Reveal variant="fade" delay={0.2}>
            <div className="h-full bg-[var(--color-white)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center border border-pink-200">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      preferences.marketing
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {preferences.marketing ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <h3 className="card-title text-lg font-semibold mb-2">Marketing</h3>
                <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed mb-4">
                  Delivers relevant membership offers and event invitations tailored to your desk search.
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--color-border)] text-[11px] text-[var(--color-muted)] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                <span>Optional promotional privacy</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. HOW COOKIES WORK (Visual Process Flow Diagram) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-[var(--color-white)] p-6 sm:p-10 rounded-3xl border border-[var(--color-border)] shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <p className="section-label mb-2">Simple Flow</p>
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-[var(--color-charcoal)]">
              How Cookies Work Behind the Scenes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {/* Step 1 */}
            <div className="relative p-5 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col items-start justify-between">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs flex items-center justify-center mb-3 shadow-xs">
                1
              </div>
              <h3 className="font-semibold text-base mb-1 text-[var(--color-charcoal)]">Visit Website</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                You open {brandName} to explore desks or schedule a tour.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-5 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col items-start justify-between">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs flex items-center justify-center mb-3 shadow-xs">
                2
              </div>
              <h3 className="font-semibold text-base mb-1 text-[var(--color-charcoal)]">Cookie Stored</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                A tiny text file is saved locally in your secure browser cache.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-5 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col items-start justify-between">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs flex items-center justify-center mb-3 shadow-xs">
                3
              </div>
              <h3 className="font-semibold text-base mb-1 text-[var(--color-charcoal)]">Website Remembers</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Your selected office locations and dark/light settings persist.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative p-5 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col items-start justify-between">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs flex items-center justify-center mb-3 shadow-xs">
                4
              </div>
              <h3 className="font-semibold text-base mb-1 text-[var(--color-charcoal)]">Better Experience</h3>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                Pages load faster without requesting repetitive preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COOKIE PREFERENCE CENTER (Interactive Panel) */}
      <section id="cookie-preference-center" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-[var(--color-white)] p-6 sm:p-10 rounded-3xl border-2 border-[var(--color-primary)] shadow-lg relative overflow-hidden">
          {/* Top Banner Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[var(--color-primary)]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[var(--color-border)]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Interactive Preference Center</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-[var(--color-charcoal)]">
                Manage Your Cookie Settings
              </h2>
            </div>

            {/* Notification Toast */}
            {savedSuccessMessage && (
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-4 py-2.5 rounded-full shadow-sm animate-fade-in-up">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{savedSuccessMessage}</span>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {/* Row 1: Essential */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 max-w-xl">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base text-[var(--color-charcoal)]">Essential Cookies</h3>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      Required
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text)] mt-1">
                    Necessary for essential site features, security checks, and tour bookings.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Always Active
                </span>
                <button
                  type="button"
                  disabled
                  aria-label="Essential Cookies Always Active"
                  className="relative inline-flex h-6 w-11 shrink-0 cursor-not-allowed rounded-full border-2 border-transparent bg-emerald-500 transition-colors duration-200 ease-in-out opacity-80"
                >
                  <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out" />
                </button>
              </div>
            </div>

            {/* Row 2: Preferences */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 max-w-xl">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Sliders className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--color-charcoal)]">Preference Cookies</h3>
                  <p className="text-xs text-[var(--color-text)] mt-1">
                    Stores custom filter settings, preferred workspace amenities, and view modes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-xs font-medium text-[var(--color-text)]">
                  {preferences.preferences ? 'Active' : 'Disabled'}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggle('preferences')}
                  aria-label="Toggle Preference Cookies"
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-ring ${
                    preferences.preferences ? 'bg-[var(--color-charcoal)]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`${
                      preferences.preferences ? 'translate-x-5' : 'translate-x-0'
                    } inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            </div>

            {/* Row 3: Analytics */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 max-w-xl">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 mt-0.5">
                  <BarChart3 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--color-charcoal)]">Analytics Cookies</h3>
                  <p className="text-xs text-[var(--color-text)] mt-1">
                    Collects aggregated statistics on page loading speeds and navigation flow.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-xs font-medium text-[var(--color-text)]">
                  {preferences.analytics ? 'Active' : 'Disabled'}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggle('analytics')}
                  aria-label="Toggle Analytics Cookies"
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-ring ${
                    preferences.analytics ? 'bg-[var(--color-charcoal)]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`${
                      preferences.analytics ? 'translate-x-5' : 'translate-x-0'
                    } inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            </div>

            {/* Row 4: Marketing */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5 max-w-xl">
                <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[var(--color-charcoal)]">Marketing Cookies</h3>
                  <p className="text-xs text-[var(--color-text)] mt-1">
                    Allows us to show relevant desk pricing offers and special community passes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-xs font-medium text-[var(--color-text)]">
                  {preferences.marketing ? 'Active' : 'Disabled'}
                </span>
                <button
                  type="button"
                  onClick={() => handleToggle('marketing')}
                  aria-label="Toggle Marketing Cookies"
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-ring ${
                    preferences.marketing ? 'bg-[var(--color-charcoal)]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`${
                      preferences.marketing ? 'translate-x-5' : 'translate-x-0'
                    } inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Action Control Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[var(--color-charcoal)] font-medium text-xs transition-colors focus-ring"
            >
              Reject Non-Essential
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] hover:bg-yellow-300 text-[var(--color-charcoal)] font-semibold text-xs transition-colors shadow-xs focus-ring"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-6 py-2.5 rounded-full bg-[var(--color-charcoal)] hover:bg-black text-white font-semibold text-xs transition-colors shadow-xs focus-ring"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY WE USE COOKIES (Visual Benefits) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <p className="section-label mb-2">Key Benefits</p>
          <h2 className="text-2xl sm:text-3xl font-heading font-normal text-[var(--color-charcoal)]">
            Why We Use Cookies
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[var(--color-white)] p-6 rounded-2xl border border-[var(--color-border)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2 text-[var(--color-charcoal)]">Keep Things Working</h3>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              Maintains secure sessions so booking forms and tour requests submit without error.
            </p>
          </div>

          <div className="bg-[var(--color-white)] p-6 rounded-2xl border border-[var(--color-border)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2 text-[var(--color-charcoal)]">Remember Preferences</h3>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              Remembers your last searched location and preferred desk filter options.
            </p>
          </div>

          <div className="bg-[var(--color-white)] p-6 rounded-2xl border border-[var(--color-border)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2 text-[var(--color-charcoal)]">Understand Usage</h3>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              Provides insights on popular amenities, helping us optimize workspace layouts.
            </p>
          </div>

          <div className="bg-[var(--color-white)] p-6 rounded-2xl border border-[var(--color-border)] shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-base mb-2 text-[var(--color-charcoal)]">Improve Experience</h3>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              Ensures fast page load times and eliminates repetitive navigation prompts.
            </p>
          </div>
        </div>
      </section>

      {/* 6. COOKIE LIFESPAN (Visual Timeline) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-[var(--color-white)] p-6 sm:p-10 rounded-3xl border border-[var(--color-border)] shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <p className="section-label mb-2">Duration</p>
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-[var(--color-charcoal)]">
              Cookie Lifespan & Retention
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Lifespan 1: Session */}
            <div className="p-6 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                    Temporary
                  </span>
                  <Clock className="w-4 h-4 text-amber-700" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--color-charcoal)] mb-1">Session Cookies</h3>
                <p className="text-xs text-[var(--color-text)] leading-relaxed mb-4">
                  Stored temporarily while browsing. Automatically erased when you close your browser tab.
                </p>
              </div>
              <div className="text-[11px] font-medium text-[var(--color-muted)] pt-3 border-t border-[var(--color-border)]">
                Duration: Single Visit
              </div>
            </div>

            {/* Lifespan 2: Short Term */}
            <div className="p-6 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full">
                    Short Term
                  </span>
                  <Calendar className="w-4 h-4 text-blue-700" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--color-charcoal)] mb-1">Functional Cookies</h3>
                <p className="text-xs text-[var(--color-text)] leading-relaxed mb-4">
                  Remembers tour dates and form inputs if you navigate between workspace location pages.
                </p>
              </div>
              <div className="text-[11px] font-medium text-[var(--color-muted)] pt-3 border-t border-[var(--color-border)]">
                Duration: Up to 30 Days
              </div>
            </div>

            {/* Lifespan 3: Persistent */}
            <div className="p-6 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full">
                    Long Term
                  </span>
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                </div>
                <h3 className="font-semibold text-lg text-[var(--color-charcoal)] mb-1">Persistent Cookies</h3>
                <p className="text-xs text-[var(--color-text)] leading-relaxed mb-4">
                  Stores your explicit cookie consent selection so you aren't prompted on every visit.
                </p>
              </div>
              <div className="text-[11px] font-medium text-[var(--color-muted)] pt-3 border-t border-[var(--color-border)]">
                Duration: 1 Year
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. THIRD-PARTY COOKIES */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <p className="section-label mb-2">Integrations</p>
          <h2 className="text-2xl sm:text-3xl font-heading font-normal text-[var(--color-charcoal)]">
            Third-Party Services
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text)] max-w-lg mx-auto mt-2">
            Some embedded elements utilize trusted external providers to function seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[var(--color-white)] p-5 rounded-2xl border border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-[var(--color-charcoal)] flex items-center justify-center mb-3">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Analytics</h3>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              Provides aggregated traffic and performance measurement.
            </p>
          </div>

          <div className="bg-[var(--color-white)] p-5 rounded-2xl border border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-[var(--color-charcoal)] flex items-center justify-center mb-3">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Payments & Billing</h3>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              Ensures secure tokenized day pass and plan transactions.
            </p>
          </div>

          <div className="bg-[var(--color-white)] p-5 rounded-2xl border border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-[var(--color-charcoal)] flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Embedded Content</h3>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              Powers interactive location maps and virtual tour viewports.
            </p>
          </div>

          <div className="bg-[var(--color-white)] p-5 rounded-2xl border border-[var(--color-border)]">
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-[var(--color-charcoal)] flex items-center justify-center mb-3">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm mb-1">Communication</h3>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              Manages tour scheduling notifications and member inquiry forms.
            </p>
          </div>
        </div>
      </section>

      {/* 8. YOUR CHOICES & 9. PRIVACY CONNECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Your Choices Flow */}
          <div className="bg-[var(--color-white)] p-6 sm:p-8 rounded-3xl border border-[var(--color-border)] flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                Control Flow
              </span>
              <h3 className="text-xl font-semibold text-[var(--color-charcoal)] mt-1 mb-2">
                Your Right to Choose
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed mb-6">
                You can update your cookie preferences at any time during your session.
              </p>

              <div className="flex items-center gap-2 mb-6 text-xs text-[var(--color-charcoal)] font-medium">
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200">1. Review</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 border border-gray-200">2. Choose</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="px-2.5 py-1 rounded-lg bg-[var(--color-tile)] border border-amber-300">3. Save</span>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToSettings}
              className="w-full sm:w-auto px-6 py-3 bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-yellow-300 transition-colors shadow-xs flex items-center justify-center gap-2 focus-ring"
            >
              <span>Manage Cookie Preferences</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Privacy Connection */}
          <div className="bg-[var(--color-charcoal)] text-white p-6 sm:p-8 rounded-3xl border border-[var(--color-border)]/20 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Want to know more?</h3>
              <p className="text-xs sm:text-sm text-[var(--color-text-on-dark)] leading-relaxed mb-6">
                Learn how we protect your personal data, member records, and privacy in our Privacy Policy.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onNavigatePage) {
                  onNavigatePage('privacy');
                } else {
                  onNavigateHome();
                }
              }}
              className="w-full sm:w-auto px-6 py-3 bg-white text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-gray-100 transition-colors shadow-xs flex items-center justify-center gap-2 focus-ring"
            >
              <span>View Privacy Policy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. LAST UPDATED & 11. CONTACT SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="bg-[var(--color-white)] p-6 sm:p-8 rounded-3xl border border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-gold)] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">Last Updated</p>
              <p className="text-xs text-[var(--color-muted)]">Effective Date: October 2026</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="text-center sm:text-right">
              <h4 className="text-sm font-semibold text-[var(--color-charcoal)]">Questions about cookies?</h4>
              <p className="text-xs text-[var(--color-muted)]">privacy@{brandName.toLowerCase()}.com</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (onNavigateContact) {
                  onNavigateContact();
                } else if (onNavigatePage) {
                  onNavigatePage('contact');
                }
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-yellow-300 transition-colors shadow-xs focus-ring"
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
