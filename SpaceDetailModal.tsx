import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, Calendar } from 'lucide-react';
import { WorkspaceItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface SpaceDetailModalProps {
  workspace: WorkspaceItem | null;
  onClose: () => void;
  onBookTourForSpace: (workspaceId: string) => void;
}

export const SpaceDetailModal: React.FC<SpaceDetailModalProps> = ({
  workspace,
  onClose,
  onBookTourForSpace,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!workspace) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [workspace, onClose]);

  if (!workspace) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="space-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-charcoal)]/80 backdrop-blur-sm modal-backdrop-animate font-[var(--font-sans)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-[var(--color-white)] text-[var(--color-charcoal)] rounded-[32px] border border-[var(--color-border)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col modal-content-animate"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-6 bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
            <span className="section-label text-xs">
              Workspace Dossier
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/20 text-[var(--color-white)] flex items-center justify-center transition-colors focus-ring"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 font-[var(--font-sans)]">
          {/* Main Visual */}
          <div className="relative rounded-2xl overflow-hidden h-64 bg-[var(--color-bg)] border border-[var(--color-border)]">
            <ImageWithFallback
              src={workspace.imageUrl}
              alt={workspace.title}
              fallbackTitle={workspace.title}
              theme="cream"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-charcoal)]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-[var(--color-white)]">
              <div>
                <span className="section-label text-[10px] block">
                  {workspace.badge}
                </span>
                <h3 className="font-heading text-3xl font-normal text-[var(--color-white)]">
                  {workspace.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="font-[var(--font-sans)] font-semibold text-2xl text-[var(--color-primary)]">
                  {workspace.price}
                </span>
                <span className="text-xs text-[var(--color-white)]/80 ml-1 block">{workspace.period}</span>
              </div>
            </div>
          </div>

          {/* Quick Specs Badges */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] text-center font-[var(--font-sans)]">
            <div>
              <span className="section-label text-[10px] block">
                Capacity
              </span>
              <span className="font-semibold text-sm text-[var(--color-charcoal)]">
                {workspace.capacity}
              </span>
            </div>
            <div>
              <span className="section-label text-[10px] block">
                Term Commitment
              </span>
              <span className="font-semibold text-sm text-[var(--color-charcoal)]">
                Month-to-Month
              </span>
            </div>
            <div>
              <span className="section-label text-[10px] block">
                Status
              </span>
              <span className="font-semibold text-sm text-[var(--color-gold)]">
                {workspace.availability}
              </span>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div>
            <h4 className="card-title text-base mb-2">
              Architectural Concept & Ergonomics
            </h4>
            <p className="text-sm text-[var(--color-text)] leading-relaxed font-[var(--font-sans)]">
              {workspace.fullDesc}
            </p>
          </div>

          {/* Included Features */}
          <div>
            <h4 className="card-title text-base mb-3">
              Included Amenities & Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-[var(--font-sans)]">
              {workspace.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--color-white)] border border-[var(--color-border)] text-xs text-[var(--color-text)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-gold)] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4 font-[var(--font-sans)]">
            <div className="text-xs text-[var(--color-muted)]">
              * Rates include high-speed utilities, janitorial services & coffee.
            </div>

            <button
              onClick={() => {
                onClose();
                onBookTourForSpace(workspace.id);
              }}
              className="px-7 py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 shadow-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[var(--color-charcoal)]" />
              <span>Book Tour for this Space</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
