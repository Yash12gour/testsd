import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Send,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Building2,
  MessageSquare,
  Instagram,
  Facebook,
} from 'lucide-react';
import { brandName } from '../data/content';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { Tilt3D } from './Tilt3D';
import { Scroll3D, ScrollCard3D, ScrollImageDepth, ScrollParallax3D } from './motion';
import { SEO } from './SEO';

interface ContactPageProps {
  onBookTourClick: (locationId?: string) => void;
  onDayPassClick: () => void;
  onExploreSpacesClick: () => void;
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onBookTourClick,
  onDayPassClick,
  onExploreSpacesClick,
  onNavigateHome,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Schedule a Tour',
    message: '',
  });

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormState('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setFormState('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setFormState('loading');
    setStatusMessage('');

    const whatsappNumber = '919232942092';
    const messageLines = [
      `*New Inquiry via SpaceDesk Website*`,
      `• Name: ${formData.name}`,
      `• Email: ${formData.email}`,
      `• Phone: ${formData.phone || 'Not provided'}`,
      `• Subject: ${formData.subject}`,
      `• Message: ${formData.message}`,
    ];
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`;
    setWhatsappRedirectUrl(whatsappUrl);

    try {
      const endpoint = import.meta.env?.VITE_FORM_ENDPOINT || '/api/contact';
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          whatsapp: '+91 92329 42092',
          to: 'info@spacedesk.in',
        }),
      }).catch(() => {});
    } catch {
      // In local static prototype preview without live proxy backend, simulate success cleanly
    }

    setFormState('success');
    setStatusMessage('Thank you! Your message is connected to WhatsApp (+91 92329 42092). Opening WhatsApp chat...');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setFormData({ name: '', email: '', phone: '', subject: 'Schedule a Tour', message: '' });
  };

  const quickActions = [
    {
      id: 'tour',
      title: 'Schedule a Private Tour',
      subtitle: 'Experience our acoustics & daylight in person',
      badge: 'Free Walkthrough',
      actionText: 'Book a Campus Visit',
      onClick: () => onBookTourClick(),
      icon: Calendar,
    },
    {
      id: 'custom',
      title: 'Discuss Enterprise Suites',
      subtitle: 'Customized layout for 10–50+ members',
      badge: 'Custom Architecture',
      actionText: 'Send Custom Inquiry',
      onClick: () => {
        const el = document.getElementById('contact-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setFormData((prev) => ({ ...prev, subject: 'Enterprise & Managed Suites' }));
      },
      icon: Building2,
    },
  ];

  const contactFaqs = [
    {
      q: 'How quickly will I receive a response after submitting this form?',
      a: 'Our on-site campus concierge team monitors all inquiries from Monday to Saturday and typically replies within 1 to 2 hours during business hours.',
    },
    {
      q: 'Can I visit SpaceDesk without booking an appointment?',
      a: 'Walk-ins are warmly welcome Monday through Saturday between 8:00 AM and 8:00 PM. However, scheduling a tour guarantees a dedicated workspace manager will guide you and show private office suites.',
    },
    {
      q: 'Is parking available on-site at the Jaswant Tower location?',
      a: 'Yes, we provide ample on-premise parking for both two-wheelers and four-wheelers with round-the-clock security and CCTV coverage.',
    },
    {
      q: 'What is the nearest transit stop to SpaceDesk Bhopal?',
      a: 'SpaceDesk is located right on the Narmadapuram Main Corridor in Misrod. The local bus stop is directly outside the tower, and the metro station is just 3 minutes away.',
    },
  ];

  return (
    <div className="w-full font-[var(--font-sans)] bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] fade-in-up">
      <SEO
        title="Contact Us & Book a Space Tour – SpaceDesk Coworking"
        description="Schedule an in-person tour, claim a day pass, or talk to our community managers at Jaswant Tower, Misrod, Bhopal. We are here to help."
        ogTitle="Contact SpaceDesk – Schedule a Tour or Day Pass"
        ogDescription="Schedule an in-person tour, claim a day pass, or talk to our community managers at Jaswant Tower, Misrod, Bhopal."
        ogImage="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=85"
        canonicalUrl="/#contact-page"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact SpaceDesk',
          description: 'Get in touch with the SpaceDesk team to book a tour, request pricing, or claim a day pass.',
          mainEntity: {
            '@type': 'LocalBusiness',
            name: brandName,
            telephone: '+91 92329 42092',
            email: 'info@spacedesk.in',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Jaswant Tower, 4th Floor, Narmadapuram Road, Misrod',
              addressLocality: 'Bhopal',
              addressRegion: 'Madhya Pradesh',
              postalCode: '462026',
              addressCountry: 'IN',
            },
          },
        }}
      />
      {/* Breadcrumb / Page Status Bar */}
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
          <span className="font-semibold text-[var(--color-charcoal)]">Contact Us</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
          Direct Campus Concierge
        </span>
      </div>

      {/* 1. CONTACT HERO */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-16 md:pb-24">
        <Scroll3D preset="hero" perspective={1400} intensity="medium">
          <Reveal variant="fade">
            <div className="relative rounded-[32px] overflow-hidden bg-[var(--color-charcoal)] text-[var(--color-white)] p-6 sm:p-12 lg:p-16 border border-[var(--color-border)] shadow-xl group">
              {/* Background Ambient Imagery */}
              <div className="absolute inset-0 z-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=85"
                  alt="SpaceDesk contact concierge"
                  fallbackTitle="SpaceDesk Reception"
                  theme="dark"
                  containerClassName="w-full h-full"
                  className="object-cover object-center filter brightness-90 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-[var(--color-charcoal)]/60 pointer-events-none" />
              </div>

              {/* Decorative 3D Communication Spatial Ring Accent */}
              <div className="absolute top-10 right-10 z-0 pointer-events-none hidden lg:block opacity-20 transform rotate-12 scale-110">
                <div className="w-56 h-64 border-2 border-[var(--color-primary)] rounded-full flex items-center justify-center backdrop-blur-3xs">
                  <div className="w-36 h-44 border border-white/40 rounded-full transform -rotate-12" />
                </div>
              </div>

            {/* Top Eyebrow Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] text-xs font-semibold uppercase tracking-wider shadow-sm transition-transform duration-300 hover:scale-105 cursor-default">
                Get In Touch
              </span>
            </div>

            {/* Main Headline */}
            <div className="relative z-10 mt-10 sm:mt-16 max-w-3xl">
              <h1 className="font-heading text-[clamp(2.125rem,6vw,4.5rem)] font-normal text-[var(--color-white)] leading-[1.08] tracking-tight text-balance">
                Let’s make your next workday{' '}
                <span className="italic text-[var(--color-primary)]">
                  significantly better.
                </span>
              </h1>
              <p className="mt-6 text-base sm:text-xl text-[var(--color-text-on-dark)] max-w-2xl font-normal leading-relaxed">
                Have questions about memberships, want to book a private campus walkthrough, or need a customized corporate space? We are here to help.
              </p>

              {/* CTAs */}
              <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onBookTourClick()}
                  className="group px-8 py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[var(--color-charcoal)] group-hover:rotate-6 transition-transform duration-300" />
                  <span>Book a Private Tour</span>
                </button>
                <a
                  href="#contact-form"
                  className="group px-8 py-4 rounded-full border border-[var(--color-white)] text-[var(--color-white)] hover:bg-white/10 hover:border-white font-semibold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2"
                >
                  <span>Send a Message</span>
                  <ArrowRight className="w-4 h-4 text-[var(--color-white)] group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Ambient Highlights Bar */}
            <div className="relative z-10 mt-12 pt-8 border-t border-[var(--color-border)]/20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[var(--color-text-on-dark)]">
              <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                  24/7
                </span>
                <span className="mt-1 block">Member Access</span>
              </div>
              <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                  &lt; 2 Hrs
                </span>
                <span className="mt-1 block">Response Time</span>
              </div>
              <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                  Jaswant Tower
                </span>
                <span className="mt-1 block">Bhopal</span>
              </div>
              <div className="p-2 rounded-xl transition-colors hover:bg-white/5">
                <span className="font-heading text-2xl sm:text-3xl text-[var(--color-primary)] block font-normal">
                  100% DG
                </span>
                <span className="mt-1 block">Power Backup</span>
              </div>
            </div>
          </div>
        </Reveal>
        </Scroll3D>
      </section>

      {/* 2. VISUAL CONTACT INFORMATION (4 Cards) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Reveal variant="up" className="max-w-2xl mb-12">
          <span className="section-label text-xs block mb-3">
            Direct Reach Channels
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal text-[var(--color-charcoal)] leading-tight text-balance">
            Connect with our team directly.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Phone */}
          <ScrollCard3D index={0} total={4} depth={15} className="h-full">
            <Reveal variant="up" delay={50} className="h-full">
              <Tilt3D maxTilt={3} scale={1.02} className="h-full bg-[var(--color-white)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[var(--color-gold)]/40 transition-all duration-300 group">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] flex items-center justify-center mb-6 transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-gold)] block mb-1">
                    Call or WhatsApp
                  </span>
                  <h3 className="card-title text-base mb-2">
                    +91 92329 42092
                  </h3>
                  <p className="text-xs text-[var(--color-text)] leading-relaxed">
                    Available Mon – Sat, 8:00 AM to 9:00 PM for bookings and inquiries.
                  </p>
                </div>
                <a
                  href="tel:+919232942092"
                  className="mt-6 pt-4 border-t border-[var(--color-border)]/60 text-xs font-semibold text-[var(--color-charcoal)] flex items-center justify-between group-hover:text-[var(--color-gold)] transition-colors"
                >
                  <span>Call Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Tilt3D>
            </Reveal>
          </ScrollCard3D>

          {/* Email */}
          <ScrollCard3D index={1} total={4} depth={15} className="h-full">
            <Reveal variant="up" delay={100} className="h-full">
              <Tilt3D maxTilt={3} scale={1.02} className="h-full bg-[var(--color-white)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[var(--color-gold)]/40 transition-all duration-300 group">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] flex items-center justify-center mb-6 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-gold)] block mb-1">
                    Email Concierge
                  </span>
                  <h3 className="card-title text-base mb-2">
                    info@spacedesk.in
                  </h3>
                  <p className="text-xs text-[var(--color-text)] leading-relaxed">
                    Send requests for private office floor plans, pricing quotes, and GST registration.
                  </p>
                </div>
                <a
                  href="mailto:info@spacedesk.in"
                  className="mt-6 pt-4 border-t border-[var(--color-border)]/60 text-xs font-semibold text-[var(--color-charcoal)] flex items-center justify-between group-hover:text-[var(--color-gold)] transition-colors"
                >
                  <span>Send Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Tilt3D>
            </Reveal>
          </ScrollCard3D>

          {/* Location */}
          <ScrollCard3D index={2} total={4} depth={15} className="h-full">
            <Reveal variant="up" delay={150} className="h-full">
              <Tilt3D maxTilt={3} scale={1.02} className="h-full bg-[var(--color-white)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[var(--color-gold)]/40 transition-all duration-300 group">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] flex items-center justify-center mb-6 transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-gold)] block mb-1">
                    Campus Address
                  </span>
                  <h3 className="card-title text-base mb-2">
                    Jaswant Tower, 4th Floor
                  </h3>
                  <p className="text-xs text-[var(--color-text)] leading-relaxed">
                    Narmadapuram Rd, Misrod, Bhopal, MP 462026.
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Jaswant+Tower+Misrod+Bhopal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 pt-4 border-t border-[var(--color-border)]/60 text-xs font-semibold text-[var(--color-charcoal)] flex items-center justify-between group-hover:text-[var(--color-gold)] transition-colors"
                >
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--color-gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Tilt3D>
            </Reveal>
          </ScrollCard3D>

          {/* Working Hours */}
          <ScrollCard3D index={3} total={4} depth={15} className="h-full">
            <Reveal variant="up" delay={200} className="h-full">
              <Tilt3D maxTilt={3} scale={1.02} className="h-full bg-[var(--color-white)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[var(--color-gold)]/40 transition-all duration-300 group">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] flex items-center justify-center mb-6 transition-all duration-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--color-gold)] block mb-1">
                    Hours of Operation
                  </span>
                  <h3 className="card-title text-base mb-2">
                    24/7 for Members
                  </h3>
                  <p className="text-xs text-[var(--color-text)] leading-relaxed">
                    Visitors & Day Pass: Mon – Sat 8:00 AM – 9:00 PM.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[var(--color-border)]/60 text-xs font-semibold text-[var(--color-muted)] flex items-center justify-between">
                  <span>Biometric Access</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                </div>
              </Tilt3D>
            </Reveal>
          </ScrollCard3D>
        </div>
      </section>

      {/* 3. CONTACT FORM + LARGE EDITORIAL VISUAL */}
      <section id="contact-form" className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24">
        <Scroll3D preset="card" depth={18}>
          <div className="bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <Reveal variant="up">
                <div>
                  <span className="section-label text-xs block mb-2">
                    Send a Message
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] mb-3">
                    How can we help you?
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed mb-8 max-w-lg">
                    Fill out the details below and our campus team will get back to you with custom floor plans, availability, and tour scheduling.
                  </p>

                  {formState === 'success' && (
                    <div className="mb-6 p-4 rounded-2xl bg-[#ECFDF5] border border-[#10B981]/30 text-[#065F46] text-xs sm:text-sm flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                        <div>{statusMessage}</div>
                      </div>
                      {whatsappRedirectUrl && (
                        <a
                          href={whatsappRedirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 max-w-full px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-95 shadow-sm transition-all text-center"
                        >
                          <span className="break-safe">Open in WhatsApp (+91 92329 42092)</span>
                          <ArrowUpRight className="w-4 h-4 shrink-0" />
                        </a>
                      )}
                    </div>
                  )}

                  {formState === 'error' && (
                    <div className="mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#EF4444]/30 text-[#991B1B] text-xs sm:text-sm">
                      {statusMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 font-[var(--font-sans)]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] text-xs sm:text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:bg-white focus-ring outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com"
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] text-xs sm:text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:bg-white focus-ring outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1.5">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] text-xs sm:text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:bg-white focus-ring outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1.5">
                          Reason for Contact
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] text-xs sm:text-sm text-[var(--color-charcoal)] focus:bg-white focus-ring outline-none transition-all cursor-pointer"
                        >
                          <option value="Schedule a Tour">Schedule a Private Tour</option>
                          <option value="Dedicated Desk Inquiry">Dedicated Desk Inquiry</option>
                          <option value="Private Office Suites">Private Office Suites</option>
                          <option value="Enterprise & Managed Suites">Enterprise & Managed Floors</option>
                          <option value="Conference Room Booking">Conference Room Booking</option>
                          <option value="Virtual Office & GST">Virtual Office & GST</option>
                          <option value="General Question">General Question</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-[var(--color-charcoal)] mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your team size, expected move-in date, or questions..."
                        className="w-full px-4 py-3 rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] text-xs sm:text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:bg-white focus-ring outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="group w-full py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-[var(--color-charcoal)] group-hover:translate-x-0.5 transition-transform" />
                      <span>{formState === 'loading' ? 'Sending Message...' : 'Send Message'}</span>
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Google Map Location */}
            <div className="lg:col-span-5 relative min-h-[400px] bg-[var(--color-charcoal)] overflow-hidden flex flex-col justify-between group">
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  title="SpaceDesk Location Map"
                  src="https://maps.google.com/maps?q=23.1828377,77.4527682&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.1) saturate(1.1)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[400px]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/80 to-transparent pointer-events-none flex flex-col justify-end">
                <div className="relative z-10 space-y-3 pointer-events-auto">
                  <span style={{ color: '#ffffff', fontWeight: 'bold', lineHeight: '0px' }} className="section-label text-xs block">
                    Flagship Campus · Bhopal
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-normal text-[var(--color-white)]">
                   Space Desk ,Jaswant Tower, 4th Floor
                  </h3>
                  <a
                    href="https://www.google.com/maps/place/Space+Desk/@23.1828377,77.4527682,17z/data=!3m1!4b1!4m6!3m5!1s0x397c436a1dad5205:0xa547f7799e01ed38!8m2!3d23.1828377!4d77.4527682!16s%2Fg%2F11zf5kqvx4?entry=ttu&g_ep=EgoyMDI2MTAxMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Scroll3D>
      </section>

      {/* 4. QUICK ACTIONS SECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Reveal variant="up" className="max-w-xl mb-12">
          <span className="section-label text-xs block mb-3">
            Quick Actions
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
            How would you like to get started?
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {quickActions.map((qa, idx) => {
            const Icon = qa.icon;
            return (
              <ScrollCard3D key={qa.id} index={idx} total={quickActions.length} depth={15} className="h-full">
                <Reveal variant="up" delay={idx * 80} className="h-full">
                  <Tilt3D maxTilt={3} scale={1.02} className="h-full bg-[var(--color-white)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-[var(--color-gold)]/40 transition-all duration-300 group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-[var(--color-tile)] text-[var(--color-charcoal)] text-[11px] font-semibold uppercase tracking-wider group-hover:bg-[var(--color-primary)] transition-colors">
                          {qa.badge}
                        </span>
                        <Icon className="w-5 h-5 text-[var(--color-gold)]" />
                      </div>
                      <h3 className="card-title text-xl mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                        {qa.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text)] leading-relaxed">
                        {qa.subtitle}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[var(--color-border)]/60">
                      <button
                        type="button"
                        onClick={qa.onClick}
                        className="group/btn w-full py-3.5 rounded-full bg-[var(--color-charcoal)] text-[var(--color-white)] font-semibold text-xs uppercase tracking-wider hover:bg-[var(--color-primary)] hover:text-[var(--color-charcoal)] transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <span>{qa.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </Tilt3D>
                </Reveal>
              </ScrollCard3D>
            );
          })}
        </div>
      </section>

      {/* 7. SOCIAL & COMMUNITY CONNECTION */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Reveal variant="up" className="max-w-xl mb-10">
          <span className="section-label text-xs block mb-3">
            Community Channels
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-normal text-[var(--color-charcoal)] leading-tight">
            Follow our vibrant ecosystem.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          <ScrollCard3D index={0} total={3} depth={10}>
            <a
              href="https://www.instagram.com/spacedesk_bhopal?cplk=eWZrZ2Q1MTV2YzNi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-[24px] bg-[var(--color-white)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] flex items-center justify-center mb-3 transition-all duration-300">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[var(--color-charcoal)]">Instagram</span>
              <span className="text-[11px] text-[var(--color-muted)] mt-0.5">@spacedesk.bhopal</span>
            </a>
          </ScrollCard3D>

          <ScrollCard3D index={1} total={3} depth={10}>
            <a
              href="https://wa.me/919232942092"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-[24px] bg-[var(--color-white)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] flex items-center justify-center mb-3 transition-all duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[var(--color-charcoal)]">WhatsApp</span>
              <span className="text-[11px] text-[var(--color-muted)] mt-0.5">Instant Messaging</span>
            </a>
          </ScrollCard3D>

          <ScrollCard3D index={2} total={3} depth={10}>
            <a
              href="https://www.facebook.com/spacedesk.bhopal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-[24px] bg-[var(--color-white)] border border-[var(--color-border)] hover:border-[var(--color-gold)]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group h-full"
            >
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-tile)] text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] flex items-center justify-center mb-3 transition-all duration-300">
                <Facebook className="w-6 h-6" />
              </div>
              <span className="font-semibold text-xs sm:text-sm text-[var(--color-charcoal)]">Facebook</span>
              <span className="text-[11px] text-[var(--color-muted)] mt-0.5">SpaceDesk Hub</span>
            </a>
          </ScrollCard3D>
        </div>
      </section>
    </div>
  );
};
