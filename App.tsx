/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navbar, AppPageType } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Scroll3D } from './components/Scroll3D';
import { PageTransition } from './components/PageTransition';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StackContainer } from './components/stack/StackContainer';
import { StackCard } from './components/stack/StackCard';
import { SEO } from './components/SEO';
import { AnimatePresence } from 'motion/react';
import { WorkspaceItem } from './types';
import { useLenis } from './hooks/useLenis';

// Lazy load all main section and page components for code splitting
const Hero = lazy(() => import('./components/Hero').then((m) => ({ default: m.Hero })));
const ValuesSection = lazy(() => import('./components/ValuesSection').then((m) => ({ default: m.ValuesSection })));
const ExploreSpacesSection = lazy(() => import('./components/ExploreSpacesSection').then((m) => ({ default: m.ExploreSpacesSection })));
const TestimonialSection = lazy(() => import('./components/TestimonialSection').then((m) => ({ default: m.TestimonialSection })));
const HomeGallerySection = lazy(() => import('./components/HomeGallerySection').then((m) => ({ default: m.HomeGallerySection })));
const PricingSection = lazy(() => import('./components/PricingSection').then((m) => ({ default: m.PricingSection })));
const LocationsSection = lazy(() => import('./components/LocationsSection').then((m) => ({ default: m.LocationsSection })));
const StatsSection = lazy(() => import('./components/StatsSection').then((m) => ({ default: m.StatsSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then((m) => ({ default: m.ContactSection })));
const AboutPage = lazy(() => import('./components/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicePage = lazy(() => import('./components/ServicePage').then((m) => ({ default: m.ServicePage })));
const PricingPage = lazy(() => import('./components/PricingPage').then((m) => ({ default: m.PricingPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then((m) => ({ default: m.ContactPage })));
const EventsPage = lazy(() => import('./components/EventsPage').then((m) => ({ default: m.EventsPage })));
const AmenitiesPage = lazy(() => import('./components/AmenitiesPage').then((m) => ({ default: m.AmenitiesPage })));
const BlogsPage = lazy(() => import('./components/BlogsPage').then((m) => ({ default: m.BlogsPage })));
const GalleryPage = lazy(() => import('./components/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const FAQsPage = lazy(() => import('./components/FAQsPage').then((m) => ({ default: m.FAQsPage })));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./components/TermsOfServicePage').then((m) => ({ default: m.TermsOfServicePage })));
const CookiesPage = lazy(() => import('./components/CookiesPage').then((m) => ({ default: m.CookiesPage })));
const BookTourModal = lazy(() => import('./components/BookTourModal').then((m) => ({ default: m.BookTourModal })));
const DayPassModal = lazy(() => import('./components/DayPassModal').then((m) => ({ default: m.DayPassModal })));
const SpaceDetailModal = lazy(() => import('./components/SpaceDetailModal').then((m) => ({ default: m.SpaceDetailModal })));

// Subtle fallback spinner for lazy components
const SectionFallback = () => (
  <div className="w-full py-12 flex items-center justify-center min-h-[120px]" aria-hidden="true">
    <div className="w-5 h-5 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin opacity-60" />
  </div>
);

export default function App() {
  useLenis();
  const [currentPage, setCurrentPage] = useState<AppPageType>('home');
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isDayPassModalOpen, setIsDayPassModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceItem | null>(null);
  const [targetLocationId, setTargetLocationId] = useState<string | undefined>(undefined);
  const [targetWorkspaceId, setTargetWorkspaceId] = useState<string | undefined>(undefined);

  // Sync hash routing if user enters via URL hash or uses back/forward
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#about-page' || hash === '#about-us' || hash === '#about') {
        return 'about';
      } else if (hash === '#service' || hash === '#services' || hash === '#private-office-suites') {
        return 'service';
      } else if (hash === '#pricing' || hash === '#pricing-page' || hash === '#plans') {
        return 'pricing';
      } else if (hash === '#contact-page' || hash === '#contact-us') {
        return 'contact';
      } else if (hash === '#events' || hash === '#events-page' || hash === '#community-events') {
        return 'events';
      } else if (hash === '#amenities' || hash === '#amenities-page' || hash === '#amenities-and-perks') {
        return 'amenities';
      } else if (
        hash === '#blogs' ||
        hash === '#blog-page' ||
        hash === '#articles' ||
        hash.startsWith('#blog/') ||
        hash.startsWith('#blogs/') ||
        hash.startsWith('#article/') ||
        hash.startsWith('#blogs?')
      ) {
        return 'blogs';
      } else if (hash === '#gallery' || hash === '#gallery-page') {
        return 'gallery';
      } else if (hash === '#faqs' || hash === '#faq-page' || hash === '#help') {
        return 'faqs';
      } else if (hash === '#privacy' || hash === '#privacy-policy') {
        return 'privacy';
      } else if (hash === '#terms' || hash === '#terms-of-service' || hash === '#terms-and-conditions' || hash === '#tos') {
        return 'terms';
      } else if (hash === '#cookies' || hash === '#cookie-policy' || hash === '#cookie-settings') {
        return 'cookies';
      }
      return null;
    };

    const handleHashChange = () => {
      const targetPage = parseHash();
      if (targetPage) {
        setCurrentPage(targetPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const initialTarget = parseHash();
    if (initialTarget) {
      setCurrentPage(initialTarget);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenTour = useCallback((locationId?: string, workspaceId?: string) => {
    setTargetLocationId(locationId);
    setTargetWorkspaceId(workspaceId);
    setIsTourModalOpen(true);
  }, []);

  const handleExploreSpaces = useCallback(() => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('spaces') || document.getElementById('workspaces');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      const el = document.getElementById('spaces') || document.getElementById('workspaces');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentPage]);

  const handleNavigate = useCallback((page: AppPageType, targetSectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home' && targetSectionId) {
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-warm)] text-[var(--color-charcoal)] flex flex-col font-[var(--font-sans)] selection:bg-[var(--color-primary)] selection:text-[var(--color-charcoal)]">
      {/* Visual Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Animated Architectural Preloader based on reference video */}
      <Preloader />

      {/* Sticky Minimal Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onBookTourClick={() => handleOpenTour()}
        onDayPassClick={() => setIsDayPassModalOpen(true)}
      />

      {/* Main Page Flow with ErrorBoundary Protection */}
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<SectionFallback />}>
            <AnimatePresence mode="wait">
            {currentPage === 'about' ? (
              <PageTransition pageKey="about" key="about">
                <AboutPage
                  onBookTourClick={() => handleOpenTour()}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'service' ? (
              <PageTransition pageKey="service" key="service">
                <ServicePage
                  onBookTourClick={(workspaceId) => handleOpenTour(undefined, workspaceId)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'pricing' ? (
              <PageTransition pageKey="pricing" key="pricing">
                <PricingPage
                  onBookTourClick={(workspaceId) => handleOpenTour(undefined, workspaceId)}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'contact' ? (
              <PageTransition pageKey="contact" key="contact">
                <ContactPage
                  onBookTourClick={(locationId) => handleOpenTour(locationId)}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'events' ? (
              <PageTransition pageKey="events" key="events">
                <EventsPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'amenities' ? (
              <PageTransition pageKey="amenities" key="amenities">
                <AmenitiesPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'blogs' ? (
              <PageTransition pageKey="blogs" key="blogs">
                <BlogsPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'gallery' ? (
              <PageTransition pageKey="gallery" key="gallery">
                <GalleryPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                />
              </PageTransition>
            ) : currentPage === 'faqs' ? (
              <PageTransition pageKey="faqs" key="faqs">
                <FAQsPage
                  onBookTourClick={() => handleOpenTour()}
                  onDayPassClick={() => setIsDayPassModalOpen(true)}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'privacy' ? (
              <PageTransition pageKey="privacy" key="privacy">
                <PrivacyPolicyPage
                  onBookTourClick={() => handleOpenTour()}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'terms' ? (
              <PageTransition pageKey="terms" key="terms">
                <TermsOfServicePage
                  onBookTourClick={() => handleOpenTour()}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : currentPage === 'cookies' ? (
              <PageTransition pageKey="cookies" key="cookies">
                <CookiesPage
                  onBookTourClick={() => handleOpenTour()}
                  onNavigateHome={() => handleNavigate('home')}
                  onNavigatePage={(page) => handleNavigate(page)}
                  onNavigateContact={() => handleNavigate('contact')}
                />
              </PageTransition>
            ) : (
              <PageTransition pageKey="home" key="home">
                <SEO
                  title="SpaceDesk Co-Working | Coworking Space in Bhopal, Misrod"
                  description="Coworking space in Bhopal with dedicated desks, private cabins and meeting rooms. Day pass from ₹499. 300 Mbps fiber and power backup. Book a free tour."
                  ogTitle="SpaceDesk Co-Working | Coworking Space in Bhopal, Misrod"
                  ogDescription="Coworking space in Bhopal with dedicated desks, private cabins and meeting rooms. Day pass from ₹499. 300 Mbps fiber and power backup. Book a free tour."
                  ogImage="/images/hero-modern-coworking-office.jpg"
                  canonicalUrl="/"
                  jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'LocalBusiness',
                    name: 'SpaceDesk Co-Working',
                    url: 'https://spacedesk.in',
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
                    openingHoursSpecification: {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                      opens: '08:00',
                      closes: '21:00',
                    },
                  }}
                />
                {/* Section 1: Hero & Partner Row */}
                <Hero
                  onBookTourClick={() => handleOpenTour()}
                  onExploreSpacesClick={handleExploreSpaces}
                  onNavigate={handleNavigate}
                />

                <StackContainer>
                  <StackCard index={0} total={7}>
                    <ValuesSection />
                  </StackCard>
                  <StackCard index={1} total={7}>
                    <ExploreSpacesSection
                      onOpenBooking={(spaceId) => handleOpenTour(undefined, spaceId)}
                      onNavigate={(page) => handleNavigate(page as AppPageType)}
                      onSelectWorkspace={(workspace) => setSelectedWorkspace(workspace)}
                      isModalOpen={isTourModalOpen || isDayPassModalOpen || selectedWorkspace !== null}
                    />
                  </StackCard>
                  <StackCard index={2} total={7}>
                    <TestimonialSection />
                  </StackCard>
                  <StackCard index={3} total={7}>
                    <PricingSection
                      onSelectPlan={(planId) => handleOpenTour(undefined, planId)}
                    />
                  </StackCard>
                  <StackCard index={4} total={7}>
                    <LocationsSection
                      onBookTourAtLocation={(locId) => handleOpenTour(locId)}
                    />
                  </StackCard>
                  <StackCard index={5} total={7}>
                    <StatsSection />
                  </StackCard>
                  <StackCard index={6} total={7}>
                    <ContactSection />
                  </StackCard>
                </StackContainer>
              </PageTransition>
            )}
          </AnimatePresence>
        </Suspense>
        </ErrorBoundary>
      </main>

      {/* Slim Minimal Footer */}
      <Footer onNavigate={handleNavigate} currentPage={currentPage} />

      {/* Floating Scroll to Top button */}
      <ScrollToTop />

      {/* Floating Responsive WhatsApp Button (Bottom-Left) */}
      <WhatsAppButton />

      {/* Accessible Interactive Modals (Lazy Loaded with Suspense) */}
      <Suspense fallback={null}>
        <BookTourModal
          isOpen={isTourModalOpen}
          onClose={() => setIsTourModalOpen(false)}
          initialLocationId={targetLocationId}
          initialWorkspaceId={targetWorkspaceId}
        />

        <DayPassModal
          isOpen={isDayPassModalOpen}
          onClose={() => setIsDayPassModalOpen(false)}
        />

        <SpaceDetailModal
          workspace={selectedWorkspace}
          onClose={() => setSelectedWorkspace(null)}
          onBookTourForSpace={(workspaceId) => handleOpenTour(undefined, workspaceId)}
        />
      </Suspense>
    </div>
  );
}
