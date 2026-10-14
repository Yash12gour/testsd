import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Train, CheckCircle2 } from 'lucide-react';
import { LOCATIONS } from '../data/mockData';
import { LocationItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Reveal } from './Reveal';
import { ScrollReveal, ScrollRevealItem } from './ScrollReveal';
import { Scroll3D, ScrollCard3D, ScrollImageDepth } from './motion';

interface LocationsSectionProps {
  onBookTourAtLocation: (locationId: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = React.memo(({ onBookTourAtLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationItem>(LOCATIONS[0]);

  return (
    <ScrollReveal as="section" id="locations" className="py-16 md:py-24 font-[var(--font-sans)]">
      <Scroll3D preset="section" className="w-full">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="bg-[var(--color-bg)] rounded-[28px] border border-[var(--color-border)] p-6 sm:p-12 relative overflow-hidden">
          {/* Section Header */}
        <ScrollRevealItem delay={40} className="max-w-2xl pb-12">
          <span className="section-label text-xs block mb-3">
            Visit SpaceDesk in Bhopal
          </span>
          <h2 className="font-heading text-[clamp(1.875rem,5vw,3.5rem)] font-normal tracking-tight text-[var(--color-charcoal)] leading-[1.12] sm:leading-[1.15] text-balance">
            Find Us on Narmadapuram Road, Bhopal
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-text)] font-[var(--font-sans)]">
            We're on the 4th floor of Jaswant Tower in Misrod, an easy drive from across Bhopal. Parking is available for bikes and cars, so you can arrive, park and get straight to work.
          </p>
        </ScrollRevealItem>

        {/* Location Selector Tabs */}
        <ScrollRevealItem delay={90} className="flex flex-wrap items-center gap-2 pb-8 font-[var(--font-sans)]">
          {LOCATIONS.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`max-w-full px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 text-left ${
                  isSelected
                    ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)] shadow-sm'
                    : 'bg-[var(--color-white)] text-[var(--color-text)] hover:text-[var(--color-charcoal)] hover:bg-[var(--color-tile)] border border-[var(--color-border)]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-[var(--color-gold)] shrink-0" />
                <span className="truncate sm:whitespace-normal">SpaceDesk Co-Working, Bhopal · Open Now</span>
              </button>
            );
          })}
        </ScrollRevealItem>

        {/* Dual Layout: Location Card + Stylized Architectural Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-[var(--font-sans)]">
          {/* Left Column: Selected Location Detail Card */}
          <ScrollRevealItem delay={130} className="lg:col-span-5 h-full">
            <ScrollCard3D index={0} total={2} className="h-full">
              <div className="h-full bg-[var(--color-white)] rounded-[32px] overflow-hidden border border-[var(--color-border)] shadow-sm flex flex-col justify-between">
                <div>
                  <ScrollImageDepth className="relative h-60 bg-[var(--color-bg)]">
                    <ImageWithFallback
                      src={selectedLocation.imageUrl}
                      alt={selectedLocation.name}
                      fallbackTitle={selectedLocation.name}
                      fallbackSubtitle={selectedLocation.neighborhood}
                      theme="cream"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-5 right-5 text-[var(--color-white)]">
                      <span className="section-label text-[10px] block">
                        {selectedLocation.neighborhood}
                      </span>
                      <h3 className="font-heading text-2xl font-normal text-[var(--color-white)] mt-0.5">
                        {selectedLocation.name}
                      </h3>
                    </div>
                  </ScrollImageDepth>

                  <div className="p-7 space-y-5">
                <div>
                  <div className="flex items-start gap-2.5 text-sm text-[var(--color-charcoal)]">
                    <MapPin className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[var(--color-charcoal)]">{selectedLocation.address}</p>
                      {selectedLocation.city && !selectedLocation.address.includes(selectedLocation.city) && (
                        <p className="text-xs text-[var(--color-text)]">{selectedLocation.city}, {selectedLocation.postalCode}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--color-border)] flex items-start gap-2.5 text-xs text-[var(--color-text)]">
                  <Train className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                  <span>{selectedLocation.transit}</span>
                </div>

                <div className="pt-3 border-t border-[var(--color-border)] flex items-start gap-2.5 text-xs text-[var(--color-text)]">
                  <Clock className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                  <span>{selectedLocation.hours}</span>
                </div>

                <div className="pt-3 border-t border-[var(--color-border)]">
                  <span className="section-label text-[11px] block mb-2">
                    What You Get
                  </span>
                  <div className="space-y-1.5">
                    {selectedLocation.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-[var(--color-text)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-gold)] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-7 pt-0 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onBookTourAtLocation(selectedLocation.id)}
                className="btn-primary-hover flex-1 py-3.5 px-5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider transition-colors text-center shadow-sm"
              >
                Book a Free Tour
              </button>
              <a
                href={selectedLocation.mapUrl || "https://share.google/AiVJ9O46t3o2ku7QI"}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-4 rounded-full border border-[var(--color-border)] text-[var(--color-charcoal)] hover:bg-[var(--color-tile)] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                <span>Get Directions</span>
              </a>
            </div>
            </div>
          </ScrollCard3D>
        </ScrollRevealItem>

        {/* Right Column: Google Map Embed & Location Details */}
        <ScrollRevealItem delay={190} className="lg:col-span-7 h-full">
          <ScrollCard3D index={1} total={2} className="h-full">
            <div className="h-full bg-[var(--color-white)] rounded-[32px] border border-[var(--color-border)] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[480px] shadow-sm">
            {/* Map Header */}
            <div className="flex items-center justify-between z-10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />
                <span className="section-label text-xs">
                  Location & Map View
                </span>
              </div>
              <a
                href="https://maps.app.goo.gl/mDcEbvsHwJAQgPux7"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--color-gold)] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Open in Google Maps</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>

            {/* Google Map Container */}
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center">
              <iframe
                title="SpaceDesk Bhopal Location Map"
                src="https://maps.google.com/maps?q=SpaceDesk%2C%20Jaswant%20Tower%2C%20Narmadapuram%20Rd%2C%20Misrod%2C%20Bhopal%2C%20Madhya%20Pradesh%20462026&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0 rounded-2xl"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Direct Floating Overlay Action */}
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href="https://maps.app.goo.gl/mDcEbvsHwJAQgPux7"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[var(--color-white)]/95 backdrop-blur-md px-4 py-2 rounded-full border border-[var(--color-border)] text-xs font-semibold text-[var(--color-charcoal)] shadow-md hover:bg-[var(--color-primary)] transition-all flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>

              <div className="pt-4 flex items-center justify-between text-xs text-[var(--color-text)]">
                <span>SpaceDesk Co-Working, Jaswant Tower, Narmadapuram Road, Bhopal</span>
                <a
                  href="https://maps.app.goo.gl/mDcEbvsHwJAQgPux7"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-gold)] underline transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </ScrollCard3D>
        </ScrollRevealItem>
        </div>
      </div>
    </div>
    </Scroll3D>
  </ScrollReveal>
);
});
