import React, { useState } from 'react';
import {
  ChevronDown,
  Search,
  HelpCircle,
  Sparkles,
  Phone,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Parallax } from './Parallax';
import { Scroll3D, ScrollImageDepth, ScrollParallax3D } from './motion';
import { SEO } from './SEO';
import { CountUpNumber } from './CountUpNumber';

interface FAQsPageProps {
  onBookTourClick: () => void;
  onDayPassClick: () => void;
  onExploreSpacesClick: () => void;
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

interface FAQItem {
  id: string;
  categoryKey: string;
  categoryLabel: string;
  question: string;
  answer: string;
  badge?: string;
}

const FAQ_DATABASE: FAQItem[] = [
  {
    id: 'faq-1',
    categoryKey: 'General',
    categoryLabel: 'General',
    question: 'What is SpaceDesk and where is it in Bhopal?',
    answer:
      'SpaceDesk Co-Working is a coworking space on the 4th floor of Jaswant Tower, Narmadapuram Road, Misrod, Bhopal, Madhya Pradesh 462026. We offer day passes, dedicated desks, private cabins, private office suites, a meeting room and a conference room for up to 25 people.',
    badge: 'Popular',
  },
  {
    id: 'faq-2',
    categoryKey: 'Membership & Plans',
    categoryLabel: 'Plans & Pricing',
    question: 'What is included in each plan?',
    answer:
      'It depends on the plan. A Day Pass (₹499 per day) includes an open desk, high-speed Wi-Fi and premium tea and coffee. A Dedicated Desk (₹5,000 per month) includes a reserved desk, 24/7 access, meeting room credits and a locker. A Private Cabin (₹25,000 per month) is a lockable cabin with acoustic privacy. A Private Office Suite (₹50,000 per month) is a fully customized workspace with dedicated facility support. Fast fiber internet, power backup, biometric security and daily housekeeping are part of the workspace. If you want to check a specific benefit, call or WhatsApp us on +91 92329 42092.',
    badge: 'Plan details',
  },
  {
    id: 'faq-3',
    categoryKey: 'Membership & Plans',
    categoryLabel: 'Plans & Pricing',
    question: 'Can I change my plan as my team grows?',
    answer:
      "SpaceDesk has plans from a Day Pass to a Private Office Suite, so you can start with what fits today and talk to us when your needs change. Call or WhatsApp us on +91 92329 42092 and we'll explain how moving to a different plan works.",
  },
  {
    id: 'faq-4',
    categoryKey: 'General',
    categoryLabel: 'General',
    question: 'Are there any hidden charges?',
    answer:
      'No. Our pricing is transparent, with no hidden charges. Plans start at ₹499 per day for a Day Pass, ₹5,000 per month for a Dedicated Desk, ₹25,000 per month for a Private Cabin and ₹50,000 per month for a Private Office Suite. Meeting room and conference room rates are custom or hourly, so please ask us for a quote before you book.',
  },
  {
    id: 'faq-5',
    categoryKey: 'Access & Parking',
    categoryLabel: 'Access & Parking',
    question: 'Is parking available at SpaceDesk?',
    answer:
      'Yes. SpaceDesk has dedicated parking for two-wheelers and four-wheelers, with security surveillance.',
    badge: 'On-site',
  },
  {
    id: 'faq-6',
    categoryKey: 'Access & Parking',
    categoryLabel: 'Access & Parking',
    question: 'What are your opening hours?',
    answer:
      'We are open Monday to Saturday, 8:00 AM to 9:00 PM. Dedicated Desk and Private Cabin members get 24/7 access with keycard and biometric entry.',
  },
  {
    id: 'faq-7',
    categoryKey: 'Workspaces & Cabins',
    categoryLabel: 'Workspaces',
    question: 'Can I bring clients or guests to meet me?',
    answer:
      'Yes. Our front desk welcomes your clients and guests. For pitches, reviews and video calls you can use our soundproof meeting room, which has a smart presentation display and high-definition conferencing equipment. A Dedicated Desk includes meeting room credits. For larger sessions, our conference room seats up to 25 people.',
  },
  {
    id: 'faq-8',
    categoryKey: 'Amenities & Facilities',
    categoryLabel: 'Amenities',
    question: 'How fast is the internet at SpaceDesk?',
    answer:
      'We run dual fiber lines at 300 Mbps with load balancing and failover, so a problem on one line does not stop your work. A generator and an online UPS keep the internet and power running during power cuts. You are welcome to test the speed on your own laptop when you visit.',
  },
  {
    id: 'faq-9',
    categoryKey: 'Booking & Payments',
    categoryLabel: 'Booking',
    question: 'How do I get a Day Pass?',
    answer:
      'Walk in during opening hours, or call or WhatsApp us on +91 92329 42092 and tell us the day you would like to come. A Day Pass is ₹499 per day and includes an open desk, high-speed Wi-Fi and premium tea and coffee.',
  },
  {
    id: 'faq-10',
    categoryKey: 'Workspaces & Cabins',
    categoryLabel: 'Workspaces',
    question: 'Do you have a conference room for workshops and events?',
    answer:
      'Yes. Our conference room seats up to 25 people and is set up for seminars and workshops, with surround sound, dual monitors, projector support and executive seating. Rates are custom or hourly, so call or WhatsApp us on +91 92329 42092 for a quote.',
  },
];

export const FAQsPage: React.FC<FAQsPageProps> = ({
  onBookTourClick,
  onDayPassClick: _onDayPassClick,
  onExploreSpacesClick: _onExploreSpacesClick,
  onNavigateHome,
  onNavigateContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAccordionIds, setOpenAccordionIds] = useState<string[]>(['faq-1', 'faq-2']);

  const categories = [
    { key: 'All', label: 'All' },
    { key: 'General', label: 'General' },
    { key: 'Membership & Plans', label: 'Plans & Pricing' },
    { key: 'Workspaces & Cabins', label: 'Workspaces' },
    { key: 'Amenities & Facilities', label: 'Amenities' },
    { key: 'Access & Parking', label: 'Access & Parking' },
    { key: 'Booking & Payments', label: 'Booking' },
  ];

  const filteredFaqs = FAQ_DATABASE.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.categoryKey === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full bg-[var(--color-bg-warm)] min-h-screen text-[var(--color-charcoal)] font-[var(--font-sans)] pb-24 fade-in-up">
      <SEO
        title="FAQs | SpaceDesk Co-Working Space in Bhopal"
        description="Answers about plans, pricing, day pass, private cabins, internet, parking and opening hours at SpaceDesk Co-Working in Misrod, Bhopal. Call +91 92329 42092."
        ogTitle="FAQs | SpaceDesk Co-Working Space in Bhopal"
        ogDescription="Answers about plans, pricing, day pass, private cabins, internet, parking and opening hours at SpaceDesk Co-Working in Misrod, Bhopal. Call +91 92329 42092."
        ogImage="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1920&q=80"
        canonicalUrl="/#faq-page"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_DATABASE.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />

      {/* 0. BREADCRUMB NAVIGATION */}
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
          <span className="font-semibold text-[var(--color-charcoal)]">Frequently Asked Questions</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Bhopal · Help &amp; Support
        </span>
      </div>

      {/* 1. HERO SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 md:pb-24 relative">
        <div className="absolute -top-10 -right-12 w-72 h-72 rounded-full bg-gradient-to-tr from-[var(--color-primary)]/10 via-[var(--color-gold)]/10 to-transparent blur-2xl pointer-events-none hidden md:block">
          <ScrollParallax3D speed={-0.12} depth={30} rotateXAmount={4} rotateYAmount={6}>
            <div className="w-full h-full rounded-3xl border border-[var(--color-gold)]/20 transform rotate-12" />
          </ScrollParallax3D>
        </div>

        <Scroll3D preset="hero" perspective={1400} intensity="subtle">
          <Reveal variant="fade">
            <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-6 sm:p-12 lg:p-16 border border-[var(--color-border)] shadow-xl group">
              {/* Background Ambient Imagery with Dark Overlay */}
              <div className="absolute inset-0 z-0">
                <ScrollImageDepth depth={14} rotateAmount={1.2}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=2000&q=85"
                    alt="SpaceDesk coworking space FAQs Bhopal"
                    fallbackTitle="SpaceDesk FAQs"
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
                  Help &amp; Answers
                </span>
              </div>

              {/* Main Headline */}
              <div className="relative z-10 mt-10 sm:mt-16 max-w-3xl">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                  Everything you need to{' '}
                  <span className="italic text-[var(--color-primary)]">
                    know before you join.
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-xl text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                  Plans, transparent pricing, private team cabins, 300 Mbps dual fiber, parking, and 24/7 keycard access: direct answers from the SpaceDesk team in Bhopal.
                </p>

                {/* Search Bar inside Hero */}
                <div className="mt-8 sm:mt-10 max-w-xl">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/60" aria-hidden="true" />
                    <input
                      id="faq-search-input"
                      type="text"
                      placeholder="Search questions (e.g. pricing, internet, parking, hours)..."
                      aria-label="Search questions"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-16 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xs text-white placeholder-white/60 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all shadow-inner"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[var(--color-primary)] font-semibold hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-[var(--color-text-on-dark)]">
                    <span>
                      Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
                    </span>
                    <button
                      type="button"
                      onClick={() => onBookTourClick()}
                      className="underline hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                    >
                      Need custom info? Book a tour →
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="relative z-10 mt-12 pt-8 border-t border-[var(--color-border)]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[var(--color-text-on-dark)]">
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="25+ Q&amp;As" delay={0} duration={1400} />
                  </span>
                  <span className="mt-1 block">Answered In Detail</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="100%" delay={100} duration={1600} />
                  </span>
                  <span className="mt-1 block">Zero Hidden Fees</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="< 2 Hrs" delay={200} duration={1600} />
                  </span>
                  <span className="mt-1 block">Desk Reply Guarantee</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="24/7" delay={300} duration={1400} />
                  </span>
                  <span className="mt-1 block">Biometric Member Entry</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Scroll3D>
      </section>

      {/* 2. CATEGORY PILLS */}
      <section className="py-8 max-w-5xl mx-auto px-6 sm:px-8">
        <Reveal variant="up">
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none" role="tablist" aria-label="FAQ categories">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap hover:scale-105 active:scale-95 transition-all duration-200 ${
                  selectedCategory === cat.key
                    ? 'bg-[var(--color-charcoal)] text-white shadow'
                    : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-charcoal)] hover:bg-[var(--color-bg-warm)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 3. ACCORDION LIST */}
        <div className="mt-6 space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openAccordionIds.includes(faq.id);
            return (
              <Reveal key={faq.id} delay={idx * 50} variant="up">
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[var(--color-primary)]/50 shadow-md'
                      : 'bg-white border-[var(--color-border)] hover:border-[var(--color-primary)]/40 hover:-translate-y-0.5 hover:shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    id={`faq-question-${faq.id}`}
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <HelpCircle
                        className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${
                          isOpen ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)] group-hover:text-[var(--color-primary)]'
                        }`}
                        aria-hidden="true"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider block mb-0.5">
                          {faq.categoryLabel}
                        </span>
                        <h3 className="font-heading text-base sm:text-lg font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {faq.badge && (
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-[10px] font-bold uppercase">
                          {faq.badge}
                        </span>
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 ${
                          isOpen
                            ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)] rotate-180 shadow-xs'
                            : 'bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] group-hover:bg-[var(--color-primary)]/20'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[var(--color-text)] font-light leading-relaxed border-t border-[var(--color-border)]/50 animate-in fade-in duration-200"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-[var(--color-border)] mt-6">
            <HelpCircle className="w-12 h-12 text-[var(--color-muted)] mx-auto opacity-40 mb-3" aria-hidden="true" />
            <h3 className="font-heading text-lg font-medium text-[var(--color-charcoal)] max-w-md mx-auto">
              No questions match your search. Try another word, or call us on +91 92329 42092.
            </h3>
            <div className="mt-5 flex items-center justify-center gap-3">
              <a
                href="tel:+919232942092"
                className="px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Call +91 92329 42092</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateContact) onNavigateContact();
                  else onBookTourClick();
                }}
                className="px-5 py-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-charcoal)] text-xs font-semibold hover:bg-[var(--color-bg-warm)] transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 4. STILL HAVE QUESTIONS BANNER */}
      <section className="py-16 max-w-5xl mx-auto px-6 sm:px-8">
        <Reveal>
          <div className="rounded-3xl bg-[var(--color-charcoal)] text-white p-8 sm:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                  Ask Us
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-normal text-white mt-2 leading-tight">
                  Still have a question? Talk to our team.
                </h2>
                <p className="text-xs sm:text-sm text-[var(--color-text-on-dark)] mt-3 font-light leading-relaxed">
                  Call, WhatsApp or drop by at Jaswant Tower, Narmadapuram Road, Misrod, Bhopal. We&apos;re happy to help.
                </p>
              </div>

              <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
                <a
                  href="tel:+919232942092"
                  className="w-full py-3 px-5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--color-charcoal)]" aria-hidden="true" />
                  <span>Call +91 92329 42092</span>
                </a>
                <button
                  type="button"
                  onClick={onBookTourClick}
                  className="w-full py-3 px-5 rounded-full border border-white/20 text-white font-semibold text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                  <span>Book a Free Tour</span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};
