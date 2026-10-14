import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface WhoWeAreProps {
  onBookTourClick: () => void;
}

export const WhoWeAre: React.FC<WhoWeAreProps> = ({ onBookTourClick }) => {
  return (
    <section id="about-us" className="py-20 md:py-28 bg-[#FAFAFA] text-zinc-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-widest text-[#B48200] uppercase font-sans">
            WHO WE ARE
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-normal text-zinc-900 mt-2">
            Redefining the Work Environment
          </h2>
          <div className="yellow-accent-bar" />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text & Bullet Points */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal text-zinc-900 leading-snug">
              The Best Coworking Space in Bhopal Built for Your Growth
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-zinc-600 font-sans leading-relaxed">
              <p>
                At SpaceDesk Co-Working, we believe a great workspace makes everyday work easy and exciting. We offer more than just standard desks and chairs. We provide a calm, modern shared office where you can focus, think clearly, and get your best work done.
              </p>
              <p>
                Whether you are a freelancer looking for a daily desk, a remote employee needing a quiet corner, or a growing startup team, our space has everything ready for you. Just bring your laptop, plug in, and start working without any setup hassle.
              </p>
            </div>

            {/* Checkmark Bullets with Yellow Rounded Icons */}
            <div className="space-y-3 pt-2">
              {[
                'High-speed internet with full power backup so your workday never stops.',
                'Quiet focus zones and modern meeting rooms for private calls and team discussions.',
                'Dedicated parking facility and relaxed breakout zones for easy everyday visits.',
                'Ergonomic seating and biophilic greenery to maintain focus throughout the day.',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FED000] flex items-center justify-center text-black shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-700 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onBookTourClick}
                className="px-6 py-3 rounded-md bg-zinc-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
              >
                Schedule a Visit
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Photography with "2+ Years of Excellence" Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[24px] overflow-hidden shadow-lg border border-zinc-200 bg-white">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80"
                alt="Coworkers collaborating at SpaceDesk Bhopal"
                fallbackTitle="SpaceDesk Main Atrium"
                containerClassName="w-full h-[400px] sm:h-[460px]"
                className="hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* 2+ Years of Excellence Dark Corner Badge */}
              <div className="absolute bottom-6 left-6 bg-zinc-950/90 backdrop-blur-md text-white p-5 rounded-2xl border border-white/10 shadow-xl max-w-[190px]">
                <div className="font-serif-heading text-3xl font-bold text-[#FED000]">
                  2+
                </div>
                <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-zinc-200 mt-1">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
