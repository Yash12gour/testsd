import React from 'react';
import { Moon, ShieldCheck, Users, Coffee, Wifi, Tv, Car, Printer } from 'lucide-react';
import { AMENITIES } from '../data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Moon,
  ShieldCheck,
  Users,
  Coffee,
  Wifi,
  Tv,
  Car,
  Printer,
};

export const AmenitiesSection: React.FC = () => {
  return (
    <section id="amenities" className="py-20 md:py-28 bg-[#FFFFFF] border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-widest text-[#B48200] uppercase font-sans">
            AMENITIES & PERKS
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-normal text-zinc-900 mt-2">
            What We Offer
          </h2>
          <div className="yellow-accent-bar" />
        </div>

        {/* 8 Clean Cards Grid (Reference Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES.map((item) => {
            const Icon = iconMap[item.iconName] || Coffee;
            return (
              <div
                key={item.id}
                className="p-7 rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-zinc-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Yellow Circle Icon */}
                  <div className="w-11 h-11 rounded-full bg-[#FED000]/15 text-[#B48200] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <h3 className="font-serif-heading text-xl font-normal text-zinc-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-500 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
