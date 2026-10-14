import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WORKSPACES } from '../data/mockData';
import { WorkspaceItem, WorkspaceCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface WorkspacesProps {
  onSelectWorkspace: (workspace: WorkspaceItem) => void;
  onBookTourClick: () => void;
  onDayPassClick: () => void;
}

export const Workspaces: React.FC<WorkspacesProps> = ({
  onSelectWorkspace,
  onBookTourClick,
  onDayPassClick,
}) => {
  const [activeFilter, setActiveFilter] = useState<WorkspaceCategory>('all');

  const filteredWorkspaces = WORKSPACES.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const filterTabs = [
    { id: 'all', label: 'All Spaces' },
    { id: 'solo', label: 'Solo & Desks' },
    { id: 'team', label: 'Teams & Suites' },
    { id: 'flexible', label: 'Day Passes & Virtual' },
  ];

  return (
    <section id="workspaces" className="py-24 md:py-32 bg-[var(--color-bg-warm)] relative font-[var(--font-sans)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--color-border)]">
          <div className="max-w-2xl">
            <span className="section-label text-xs block mb-3">
              Find Your Space
            </span>
            <h2 className="font-heading text-[clamp(2rem,5.5vw,3.75rem)] font-normal tracking-tight text-[var(--color-charcoal)] leading-[1.12] sm:leading-[1.15] text-balance">
              Choose the space that{' '}
              <span className="italic">
                works for you.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--color-text)] max-w-xl font-[var(--font-sans)]">
              From plug-and-play hot desks to acoustic team headquarters. Flexible month-to-month terms with zero hidden fees.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[var(--color-white)] rounded-full border border-[var(--color-border)] max-w-full overflow-x-auto no-scrollbar w-fit self-start md:self-end font-[var(--font-sans)] shadow-sm">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as WorkspaceCategory)}
                className={`px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)] shadow-sm'
                    : 'text-[var(--color-text)] hover:text-[var(--color-charcoal)] hover:bg-[var(--color-tile)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modular Asymmetric Bento Card Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 font-[var(--font-sans)]">
          {filteredWorkspaces.map((workspace) => {
            const isLarge = workspace.id === 'private-office' || workspace.id === 'hot-desk';
            const colSpan = isLarge ? 'md:col-span-7' : 'md:col-span-5';

            return (
              <div
                key={workspace.id}
                onClick={() => {
                  if (workspace.id === 'day-pass') {
                    onDayPassClick();
                  } else {
                    onSelectWorkspace(workspace);
                  }
                }}
                className={`${colSpan} group cursor-pointer flex flex-col justify-between rounded-[28px] overflow-hidden bg-[var(--color-white)] border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,32,34,0.06)]`}
              >
                {/* Image Section */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[var(--color-bg)]">
                  <ImageWithFallback
                    src={workspace.imageUrl}
                    alt={workspace.title}
                    fallbackTitle={workspace.title}
                    fallbackSubtitle={workspace.shortDesc}
                    theme="cream"
                    containerClassName="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/70 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed metadata or quiet top indicators */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-[var(--color-white)]">
                    <span className="bg-[var(--color-charcoal)]/85 backdrop-blur-md text-[var(--color-white)] px-3 py-1 rounded-full text-[11px] font-[var(--font-sans)] font-semibold uppercase tracking-wider border border-[var(--color-border)]/20">
                      {workspace.badge}
                    </span>
                    <span className="bg-[var(--color-charcoal)]/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-[var(--color-white)] border border-[var(--color-border)]/20">
                      {workspace.capacity}
                    </span>
                  </div>

                  {/* Price overlay on image bottom */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-[var(--color-white)]">
                    <div>
                      <span className="text-2xl sm:text-3xl font-semibold font-[var(--font-sans)] text-[var(--color-white)] tracking-tight">
                        {workspace.price}
                      </span>
                      <span className="text-xs text-[var(--color-white)]/80 ml-1.5 font-normal">
                        {workspace.period}
                      </span>
                    </div>
                    <span className="text-xs font-[var(--font-sans)] font-semibold text-[var(--color-primary)]">
                      {workspace.availability}
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="card-title text-2xl group-hover:text-[var(--color-gold)] transition-colors">
                        {workspace.title}
                      </h3>
                      <div className="w-9 h-9 rounded-full bg-[var(--color-tile)] text-[var(--color-gold)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-charcoal)] flex items-center justify-center transition-all duration-200 shrink-0">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[var(--color-text)] leading-relaxed font-[var(--font-sans)]">
                      {workspace.shortDesc}
                    </p>
                  </div>

                  {/* Features List with Thin Lines */}
                  <div className="mt-6 pt-5 border-t border-[var(--color-border)] space-y-2">
                    {workspace.features.slice(0, 3).map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-[var(--color-text)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Button */}
                  <div className="mt-6 pt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)] group-hover:underline">
                      View Space Specs & Availability →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom enterprise or bespoke suite callout */}
        <div className="mt-12 p-8 rounded-[28px] bg-[var(--color-white)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="font-heading text-xl font-normal text-[var(--color-charcoal)]">
              Need a full private floor or custom enterprise suite?
            </h4>
            <p className="text-sm text-[var(--color-text)] mt-1 font-[var(--font-sans)]">
              We design, build, and operate custom branded floors for teams of 20 to 120 people with dedicated servers, IT, and branding.
            </p>
          </div>
          <button
            onClick={onBookTourClick}
            className="px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-colors whitespace-nowrap self-start sm:self-auto shrink-0 shadow-sm"
          >
            Inquire Enterprise Suite
          </button>
        </div>
      </div>
    </section>
  );
};
