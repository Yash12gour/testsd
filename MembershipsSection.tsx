import React from 'react';
import { Clock, Monitor, Lock, Video, Users, Building, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { WORKSPACES } from '../data/mockData';
import { WorkspaceItem } from '../types';

interface MembershipsSectionProps {
  onSelectWorkspace: (workspace: WorkspaceItem) => void;
  onBookTourClick: () => void;
  onDayPassClick: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  'flexible-day-pass': Clock,
  'dedicated-desk': Monitor,
  'private-cabin': Lock,
  'private-office': Video,
  'conference-room': Users,
  'enterprise-suite': Building,
  'built-to-suit': Layers,
  'virtual-office': ShieldCheck,
};

export const MembershipsSection: React.FC<MembershipsSectionProps> = ({
  onSelectWorkspace,
  onBookTourClick,
  onDayPassClick,
}) => {
  return (
    <section id="memberships" className="py-20 md:py-28 bg-[#FAFAFA] text-zinc-900 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-widest text-[#B48200] uppercase font-sans">
            MEMBERSHIPS
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-normal text-zinc-900 mt-2">
            Plans to Suit Everyone
          </h2>
          <div className="yellow-accent-bar" />
          <p className="mt-4 text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
            Whether you're flying solo, working with a team, or just need a desk for the day to get that pitch finished, we've got you.
          </p>
        </div>

        {/* 8-Card Grid (Exact Reference Reproduction with Featured Dark Dedicated Desk Card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKSPACES.map((item) => {
            const Icon = iconMap[item.id] || Monitor;
            const isFeatured = item.isPopular; // Dedicated Desk is the signature dark card in reference

            if (isFeatured) {
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectWorkspace(item)}
                  className="relative p-7 rounded-2xl bg-[#1C1C1E] text-white border border-zinc-800 shadow-xl flex flex-col justify-between cursor-pointer hover:border-zinc-700 transition-all hover:-translate-y-1"
                >
                  {/* Yellow Most Popular Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#FED000] text-black font-sans font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                      Most Popular
                    </span>
                  </div>

                  <div>
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-full bg-white/10 text-[#FED000] flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-serif-heading text-xl font-normal text-white mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-zinc-800 flex items-baseline justify-between">
                    <div>
                      <span className="font-serif-heading text-2xl font-bold text-[#FED000]">
                        {item.price}
                      </span>
                      <span className="text-xs text-zinc-400 font-sans ml-1">
                        {item.period}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#FED000] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Details →
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.id === 'flexible-day-pass') {
                    onDayPassClick();
                  } else {
                    onSelectWorkspace(item);
                  }
                }}
                className="p-7 rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-zinc-300 transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1"
              >
                <div>
                  {/* Yellow Circle Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#FED000]/15 text-[#B48200] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <h3 className="font-serif-heading text-xl font-normal text-zinc-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                    {item.shortDesc}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-zinc-100 flex items-baseline justify-between">
                  <div>
                    <span className="font-serif-heading text-xl font-bold text-zinc-900">
                      {item.price}
                    </span>
                    <span className="text-xs text-zinc-500 font-sans ml-1">
                      {item.period}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-600 hover:text-black">
                    Details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
