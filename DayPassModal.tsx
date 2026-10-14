import React, { useState, useEffect, useRef } from 'react';
import { X, QrCode, CreditCard, Coffee, Wifi, Loader2 } from 'lucide-react';
import { LOCATIONS } from '../data/mockData';

interface DayPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DayPassModal: React.FC<DayPassModalProps> = ({ isOpen, onClose }) => {
  const [passType, setPassType] = useState<'single' | 'bundle'>('single');
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Reset state on open & handle scroll lock + escape key
  useEffect(() => {
    if (!isOpen) return;

    setIsSuccess(false);
    setIsSubmitting(false);
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || isSubmitting) return;
    setIsSubmitting(true);

    try {
      const endpoint = import.meta.env?.VITE_FORM_ENDPOINT || '/api/day-pass';
      await Promise.all([
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'day_pass_reservation',
            name,
            email,
            passType,
            location: selectedLoc.name,
            date,
            price,
          }),
        }).catch(() => {}),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
    } catch {
      // Gracefully continue
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const selectedLoc = LOCATIONS.find((l) => l.id === locationId) || LOCATIONS[0];
  const price = passType === 'single' ? '$29' : '$125';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="day-pass-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-charcoal)]/80 backdrop-blur-sm modal-backdrop-animate font-[var(--font-sans)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-[var(--color-white)] text-[var(--color-charcoal)] rounded-[32px] border border-[var(--color-border)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col modal-content-animate"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-between">
          <div>
            <span className="section-label text-[11px] block">
              Instant Access
            </span>
            <h3 id="day-pass-title" className="font-heading text-2xl font-normal text-[var(--color-white)] mt-0.5">
              SpaceDesk Day Pass
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/20 text-[var(--color-white)] flex items-center justify-center transition-colors focus-ring"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-[var(--font-sans)]">
          {isSuccess ? (
            <div className="py-4 text-center space-y-4">
              <div className="p-6 bg-[var(--color-white)] rounded-2xl border border-[var(--color-border)] shadow-sm max-w-xs mx-auto">
                <div className="flex justify-between items-center text-[10px] font-semibold text-[var(--color-muted)] pb-3 border-b border-[var(--color-border)]">
                  <span>SPACEDESK PASS</span>
                  <span className="text-[var(--color-gold)] font-semibold">VALIDATED</span>
                </div>

                {/* Simulated QR Code */}
                <div className="my-4 p-4 bg-[var(--color-bg-warm)] rounded-xl flex flex-col items-center justify-center border border-[var(--color-border)]">
                  <QrCode className="w-32 h-32 text-[var(--color-charcoal)]" />
                  <span className="text-[10px] mt-2 text-[var(--color-muted)] font-semibold tracking-wider">
                    SCAN AT TURNSTILE
                  </span>
                </div>

                <div className="text-left text-xs space-y-1">
                  <p className="font-semibold text-[var(--color-charcoal)]">{name}</p>
                  <p className="text-[var(--color-text)]">{selectedLoc.name}</p>
                  <p className="text-[11px] text-[var(--color-muted)]">Date: {date} · 8:00 AM – 8:00 PM</p>
                </div>
              </div>

              <div className="pt-2 text-xs text-[var(--color-text)] max-w-sm mx-auto">
                A digital pass key and Wi-Fi credentials have been dispatched to <strong>{email}</strong>.
              </div>

              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-colors shadow-sm"
              >
                Close Pass
              </button>
            </div>
          ) : (
            <form onSubmit={handlePurchase} className="space-y-5">
              {/* Pass Tier Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPassType('single')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    passType === 'single'
                      ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)] border-[var(--color-charcoal)] shadow-sm'
                      : 'bg-[var(--color-white)] border-[var(--color-border)] text-[var(--color-charcoal)] hover:bg-[var(--color-tile)]'
                  }`}
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]/80 block">Single Day</span>
                  <p className="text-2xl font-semibold font-[var(--font-sans)] mt-0.5 text-[var(--color-charcoal)]">$29</p>
                  <p className="text-[11px] mt-1 text-[var(--color-charcoal)]/70">1 Full Day of Access</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPassType('bundle')}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    passType === 'bundle'
                      ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)] border-[var(--color-charcoal)] shadow-sm'
                      : 'bg-[var(--color-white)] border-[var(--color-border)] text-[var(--color-charcoal)] hover:bg-[var(--color-tile)]'
                  }`}
                >
                  <span className="absolute top-2 right-2 text-[9px] font-semibold bg-[var(--color-charcoal)] text-[var(--color-primary)] px-1.5 py-0.5 rounded">
                    SAVE 15%
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]/80 block">5-Day Flex Pack</span>
                  <p className="text-2xl font-semibold font-[var(--font-sans)] mt-0.5 text-[var(--color-charcoal)]">$125</p>
                  <p className="text-[11px] mt-1 text-[var(--color-charcoal)]/70">Valid for 60 Days</p>
                </button>
              </div>

              {/* Location Select */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                  Select Hub Location
                </label>
                <select
                  value={locationId}
                  onChange={(e) => setLocationId(e.target.value)}
                  className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} — {loc.neighborhood}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                  Pass Date
                </label>
                <input
                  type="date"
                  value={date}
                  min="2026-10-05"
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                />
              </div>

              {/* Guest Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                    Email for Mobile QR *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@work.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                  />
                </div>
              </div>

              {/* Inclusions summary */}
              <div className="p-4 rounded-xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] text-xs text-[var(--color-text)] space-y-1.5">
                <div className="flex items-center gap-2">
                  <Wifi className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  <span>Includes 1 Gbps Wi-Fi, phone booths & standing desks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coffee className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  <span>Unlimited specialty espresso & oat milk on tap</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full py-4 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[var(--color-charcoal)] shrink-0" aria-hidden="true" />
                      <span>Reserving Day Pass...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 text-[var(--color-charcoal)]" />
                      <span>Reserve Day Pass ({price})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
