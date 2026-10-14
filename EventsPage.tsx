import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowUpRight,
  ArrowRight,
  Search,
  CheckCircle2,
  CalendarCheck,
  Send,
  X,
  Phone,
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Parallax } from './Parallax';
import { Scroll3D, ScrollCard3D, ScrollImageDepth, ScrollParallax3D } from './motion';
import { SEO } from './SEO';
import { CountUpNumber } from './CountUpNumber';

interface EventsPageProps {
  onBookTourClick: () => void;
  onDayPassClick: () => void;
  onExploreSpacesClick: () => void;
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

/**
 * Event data structure shape:
 * {
 *   id: string;
 *   title: string;
 *   category: "Community" | "Workshop" | "Networking" | "Founders";
 *   dateISO: string; // YYYY-MM-DD
 *   startTime: string;
 *   endTime: string;
 *   location: string;
 *   description: string;
 *   highlights: string[];
 *   image: string;
 *   imageAlt?: string;
 *   attendeeCount?: number;
 *   capacity?: number;
 *   rsvpHref?: string;
 * }
 * Past events use the same shape.
 */

export type EventCategory = 'Community' | 'Workshop' | 'Networking' | 'Founders';

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  dateISO: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt?: string;
  attendeeCount?: number;
  capacity?: number;
  rsvpHref?: string;
}

const upcomingEvents: EventItem[] = [];
const pastEvents: EventItem[] = [];

const formatEventDate = (dateISO: string) => {
  if (!dateISO) return { day: '', month: '', year: '', formatted: '' };
  const parts = dateISO.split('-');
  const y = parts[0] || '';
  const m = Number(parts[1] || '1');
  const d = parts[2] || '';
  const dateObj = new Date(Number(y), m - 1, Number(d));
  const monthStr = isNaN(dateObj.getTime())
    ? ''
    : dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const formatted = isNaN(dateObj.getTime())
    ? dateISO
    : `${d} ${dateObj.toLocaleString('en-US', { month: 'short' })} ${y}`;
  return { day: d, month: monthStr, year: y, formatted };
};

export const EventsPage: React.FC<EventsPageProps> = ({
  onBookTourClick,
  onDayPassClick: _onDayPassClick,
  onExploreSpacesClick: _onExploreSpacesClick,
  onNavigateHome,
  onNavigateContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rsvpEvent, setRsvpEvent] = useState<EventItem | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');

  // The featured event is the earliest upcoming event by dateISO
  const sortedUpcoming = [...upcomingEvents].sort((a, b) => a.dateISO.localeCompare(b.dateISO));
  const featuredEvent = sortedUpcoming.length > 0 ? sortedUpcoming[0] : null;

  // Filter chips generated from categories that appear in upcomingEvents plus 'All'
  const categories = ['All', ...Array.from(new Set(upcomingEvents.map((ev) => ev.category)))];

  const filteredEvents = upcomingEvents.filter((ev) => {
    const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      ev.title.toLowerCase().includes(q) ||
      ev.description.toLowerCase().includes(q) ||
      ev.location.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) return;
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpEvent(null);
      setRsvpName('');
      setRsvpEmail('');
      setRsvpPhone('');
    }, 2400);
  };

  return (
    <div className="w-full bg-[var(--color-bg-warm)] min-h-screen text-[var(--color-charcoal)] font-[var(--font-sans)] pb-24 fade-in-up">
      <SEO
        title="Events & Community | SpaceDesk Co-Working, Bhopal"
        description="Host your workshop, seminar or meetup at SpaceDesk Co-Working in Misrod, Bhopal. Conference room for up to 25 people. Ask about community events."
        ogTitle="Events & Community | SpaceDesk Co-Working, Bhopal"
        ogDescription="Host your workshop, seminar or meetup at SpaceDesk Co-Working in Misrod, Bhopal. Conference room for up to 25 people. Ask about community events."
        ogImage="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
        canonicalUrl="/#events-page"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'EventSeries',
          name: 'Events & Community | SpaceDesk Co-Working, Bhopal',
          description: 'Host your workshop, seminar or meetup at SpaceDesk Co-Working in Misrod, Bhopal. Conference room for up to 25 people. Ask about community events.',
          organizer: {
            '@type': 'Organization',
            name: 'SpaceDesk',
            url: 'https://spacedesk.in/#events-page',
          },
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
          <span className="font-semibold text-[var(--color-charcoal)]">Events &amp; Community</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Bhopal · Community Hub
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
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85"
                    alt="SpaceDesk community events and networking in Bhopal"
                    fallbackTitle="SpaceDesk Community"
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
                  Events &amp; Community
                </span>
              </div>

              {/* Main Headline */}
              <div className="relative z-10 mt-10 sm:mt-16 max-w-3xl">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                  Connect, create &amp;{' '}
                  <span className="italic text-[var(--color-primary)]">
                    collaborate together.
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-xl text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                  SpaceDesk is home to tech founders, creative freelancers and corporate teams. Stay in the loop on community meetups, pitch nights, and workshops, or host your own in our modern conference facility.
                </p>

                {/* CTAs */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.me/919232942092"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-8 py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                  >
                    <span>Host an Event</span>
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
                    <CountUpNumber value="25 Seats" delay={0} duration={1400} />
                  </span>
                  <span className="mt-1 block">Conference Room Capacity</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="60+" delay={100} duration={1600} />
                  </span>
                  <span className="mt-1 block">Active Community Members</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="4K Dual" delay={200} duration={1600} />
                  </span>
                  <span className="mt-1 block">Smart Presentation Displays</span>
                </div>
                <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                  <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                    <CountUpNumber value="100%" delay={300} duration={1400} />
                  </span>
                  <span className="mt-1 block">Power &amp; Wi-Fi Uptime</span>
                </div>
              </div>
            </div>
          </Reveal>
        </Scroll3D>
      </section>

      {/* C. FEATURED UPCOMING EVENT SECTION */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal variant="up">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                Upcoming
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[var(--color-charcoal)] mt-1">
                Upcoming events
              </h2>
            </div>
          </div>
        </Reveal>

        {upcomingEvents.length > 0 && featuredEvent ? (
          <Reveal delay={120} variant="scale">
            <Scroll3D preset="card" perspective={1200} className="w-full">
              <div className="group rounded-3xl bg-white border border-[var(--color-border)] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Image Side with 3D Image Depth */}
                  <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[480px] overflow-hidden">
                    <ScrollImageDepth className="w-full h-full">
                      <ImageWithFallback
                        src={featuredEvent.image}
                        alt={featuredEvent.imageAlt || `${featuredEvent.title} at SpaceDesk coworking space, Bhopal`}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                    </ScrollImageDepth>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden pointer-events-none" />
                    <div className="absolute top-5 left-5 pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-bold uppercase tracking-wider shadow group-hover:scale-105 transition-transform">
                        {featuredEvent.category}
                      </span>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 lg:hidden text-white pointer-events-none">
                      <div className="text-sm font-semibold text-[var(--color-primary)]">
                        {formatEventDate(featuredEvent.dateISO).formatted} · {featuredEvent.startTime}
                      </div>
                    </div>
                  </div>

                  {/* Details Side */}
                  <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-white">
                    <div>
                      <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-[var(--color-muted)]">
                        <span className="flex items-center gap-1.5 text-[var(--color-primary)] font-bold">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          {formatEventDate(featuredEvent.dateISO).formatted}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
                          {featuredEvent.startTime}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl sm:text-3xl font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors mt-3 leading-tight">
                        {featuredEvent.title}
                      </h3>
                      <p className="text-xs text-[var(--color-muted)] mt-2 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                        {featuredEvent.location}
                      </p>

                      <p className="text-sm text-[var(--color-text)] mt-4 leading-relaxed font-light">
                        {featuredEvent.description}
                      </p>

                      {featuredEvent.highlights && featuredEvent.highlights.length > 0 && (
                        <div className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-5">
                          <span className="text-xs font-semibold text-[var(--color-charcoal)] uppercase tracking-wider block">
                            Event Highlights:
                          </span>
                          {featuredEvent.highlights.map((hl, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-[var(--color-text)]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                      {featuredEvent.attendeeCount !== undefined && featuredEvent.capacity !== undefined ? (
                        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                          <Users className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
                          <span>
                            <strong className="text-[var(--color-charcoal)]">{featuredEvent.attendeeCount}</strong> /{' '}
                            {featuredEvent.capacity} seats filled
                          </span>
                        </div>
                      ) : featuredEvent.attendeeCount !== undefined ? (
                        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                          <Users className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
                          <span>
                            <strong className="text-[var(--color-charcoal)]">{featuredEvent.attendeeCount}</strong> going
                          </span>
                        </div>
                      ) : (
                        <div />
                      )}

                      {featuredEvent.rsvpHref ? (
                        <a
                          href={featuredEvent.rsvpHref}
                          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs tracking-wide hover:opacity-95 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          <span>Reserve a Seat</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setRsvpEvent(featuredEvent)}
                          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs tracking-wide hover:opacity-95 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          <span>Reserve a Seat</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Scroll3D>
          </Reveal>
        ) : (
          /* Empty state reusing existing card container style */
          <Reveal delay={120} variant="scale">
            <div className="rounded-3xl bg-white border border-[var(--color-border)] p-8 sm:p-12 shadow-md">
              <h3 className="font-heading text-2xl sm:text-3xl font-medium text-[var(--color-charcoal)] leading-tight">
                No events scheduled right now
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[var(--color-text)] leading-relaxed max-w-2xl font-light">
                We announce community meetups and workshops as they&apos;re confirmed. Message us on WhatsApp and we&apos;ll tell you when the next one is announced.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/919232942092"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs tracking-wide hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm inline-flex items-center gap-2"
                >
                  <span>Message Us on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('host-event');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-6 py-3.5 rounded-full border border-[var(--color-border)] text-[var(--color-charcoal)] font-semibold text-xs tracking-wide hover:bg-[var(--color-bg-warm)] hover:border-[var(--color-charcoal)] transition-all inline-flex items-center gap-2"
                >
                  <span>Ask About Hosting an Event</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* D. EVENT LIST (Filters, Search, Cards) - Shown only if upcomingEvents.length > 0 */}
      {upcomingEvents.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-6 sm:px-8">
          <Reveal variant="up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[var(--color-border)]">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold hover:scale-105 active:scale-95 transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-[var(--color-charcoal)] text-white shadow'
                        : 'bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-charcoal)] hover:bg-[var(--color-bg-warm)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[var(--color-border)] rounded-full text-xs text-[var(--color-charcoal)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                />
              </div>
            </div>
          </Reveal>

          {/* Events Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((ev, idx) => {
              const dateInfo = formatEventDate(ev.dateISO);
              return (
                <ScrollCard3D key={ev.id} index={idx} total={filteredEvents.length} className="h-full">
                  <Reveal delay={idx * 60} variant="up" className="h-full">
                    <div className="group rounded-2xl bg-white border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                      {/* Event Image */}
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={ev.image}
                          alt={ev.imageAlt || `${ev.title} at SpaceDesk coworking space, Bhopal`}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-3 left-3 bg-[var(--color-charcoal)]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-center leading-tight shadow group-hover:scale-105 transition-transform">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
                            {dateInfo.month}
                          </span>
                          <span className="block text-base font-bold">{dateInfo.day}</span>
                        </div>
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[var(--color-charcoal)] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                          {ev.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-xs text-[var(--color-muted)] mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                              {ev.startTime}
                            </span>
                          </div>
                          <h3 className="font-heading text-lg font-medium text-[var(--color-charcoal)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                            {ev.title}
                          </h3>
                          <p className="text-xs text-[var(--color-text)] mt-2 line-clamp-2 font-light leading-relaxed">
                            {ev.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                          {ev.attendeeCount !== undefined ? (
                            <span className="text-[11px] text-[var(--color-muted)] flex items-center gap-1">
                              <Users className="w-3 h-3 text-[var(--color-primary)]" aria-hidden="true" />
                              {ev.attendeeCount} going
                            </span>
                          ) : (
                            <span />
                          )}
                          <button
                            type="button"
                            onClick={() => setRsvpEvent(ev)}
                            className="text-xs font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-primary)] flex items-center gap-1 group-hover:gap-1.5 transition-all"
                          >
                            <span>View Details</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </ScrollCard3D>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[var(--color-border)] mt-8">
              <Calendar className="w-12 h-12 text-[var(--color-muted)] mx-auto opacity-40 mb-3" aria-hidden="true" />
              <h3 className="font-heading text-lg font-medium text-[var(--color-charcoal)]">
                No events match your search.
              </h3>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                Try selecting a different category or clearing your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-[var(--color-charcoal)] transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      )}

      {/* E. HOST YOUR NEXT WORKSHOP VENUE SECTION (Dark Section) */}
      <section id="host-event" className="py-16 max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <div className="rounded-3xl bg-[var(--color-charcoal)] text-[var(--color-white)] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
                  Host an Event
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-white mt-2 leading-tight">
                  Host your next workshop or meetup at SpaceDesk.
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[var(--color-text-on-dark)] max-w-xl font-light leading-relaxed">
                  Our conference room seats up to 25 people and is set up for seminars, workshops and presentations. You get surround sound, dual monitors, projector support and executive seating, plus tea, coffee and snacks from the Space Deli. Rates are custom and by the hour.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs text-[var(--color-text-on-dark)]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
                    <span>Up to 25 people</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
                    <span>Surround sound &amp; projector support</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
                    <span>Space Deli refreshments</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <button
                  type="button"
                  onClick={onBookTourClick}
                  className="px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow"
                >
                  <CalendarCheck className="w-4 h-4 text-[var(--color-charcoal)]" aria-hidden="true" />
                  <span>Ask About the Conference Room</span>
                </button>
                <a
                  href="tel:+919232942092"
                  className="px-6 py-3.5 rounded-full border border-white/20 text-white font-semibold text-xs tracking-wider uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
                  <span>Call +91 92329 42092</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* F. PAST COMMUNITY GATHERINGS SECTION - Shown only if pastEvents.length > 0 */}
      {pastEvents.length > 0 && (
        <section className="py-12 max-w-7xl mx-auto px-6 sm:px-8 border-t border-[var(--color-border)]">
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest">
                  Archive
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-medium text-[var(--color-charcoal)] mt-1">
                  Past community events
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((item, idx) => {
              const dateInfo = formatEventDate(item.dateISO);
              return (
                <Reveal key={item.id} delay={idx * 0.08}>
                  <div className="group rounded-2xl bg-white border border-[var(--color-border)] overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="relative h-44 overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.imageAlt || `${item.title} at SpaceDesk coworking space, Bhopal`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                        {item.attendeeCount !== undefined
                          ? `${dateInfo.formatted} · ${item.attendeeCount} attendees`
                          : dateInfo.formatted}
                      </span>
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="font-heading text-sm font-medium text-[var(--color-charcoal)] mt-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* RSVP MODAL (For real events from data) */}
      {rsvpEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="rsvp-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[var(--color-border)] shadow-2xl relative">
            <button
              type="button"
              onClick={() => setRsvpEvent(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-[var(--color-muted)] hover:text-[var(--color-charcoal)] hover:bg-[var(--color-bg-warm)] transition-colors"
              aria-label={`Close RSVP modal for ${rsvpEvent.title}`}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {rsvpSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[var(--color-primary)]" aria-hidden="true" />
                </div>
                <h3 className="font-heading text-2xl font-medium text-[var(--color-charcoal)]">
                  RSVP Confirmed!
                </h3>
                <p className="text-xs text-[var(--color-text)] max-w-xs mx-auto leading-relaxed">
                  We&apos;ve reserved your seat for <strong>{rsvpEvent.title}</strong>. A calendar invite
                  has been sent to your email.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-wider">
                  Reserve a Seat
                </span>
                <h3 id="rsvp-modal-title" className="font-heading text-xl sm:text-2xl font-medium text-[var(--color-charcoal)] mt-1">
                  {rsvpEvent.title}
                </h3>
                <p className="text-xs text-[var(--color-muted)] mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                  <span>
                    {formatEventDate(rsvpEvent.dateISO).formatted} · {rsvpEvent.startTime}
                  </span>
                </p>

                <form onSubmit={handleRsvpSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="rsvp-name" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      required
                      placeholder="e.g. Aditi Sharma"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[var(--color-bg-warm)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="rsvp-email" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1">
                      Email Address *
                    </label>
                    <input
                      id="rsvp-email"
                      type="email"
                      required
                      placeholder="aditi@example.com"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[var(--color-bg-warm)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div>
                    <label htmlFor="rsvp-phone" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1">
                      Phone Number
                    </label>
                    <input
                      id="rsvp-phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[var(--color-bg-warm)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-primary)]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs tracking-wide hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Confirm Registration</span>
                    </button>
                    <p className="text-[10px] text-center text-[var(--color-muted)] mt-2">
                      By registering, you agree to SpaceDesk community guidelines.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
