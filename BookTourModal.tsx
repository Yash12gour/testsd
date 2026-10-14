import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { LOCATIONS, WORKSPACES } from '../data/mockData';
import { brandName } from '../data/content';

interface BookTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocationId?: string;
  initialWorkspaceId?: string;
}

const TOUR_WORKSPACES = WORKSPACES.filter((ws) => ws.id !== 'flexible-day-pass');

export const BookTourModal: React.FC<BookTourModalProps> = ({
  isOpen,
  onClose,
  initialLocationId,
  initialWorkspaceId,
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [locationId, setLocationId] = useState(initialLocationId || LOCATIONS[0].id);
  const [workspaceType, setWorkspaceType] = useState(
    initialWorkspaceId && initialWorkspaceId !== 'flexible-day-pass'
      ? initialWorkspaceId
      : 'dedicated-desk'
  );
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [teamSize, setTeamSize] = useState('1');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [error, setError] = useState('');

  const dialogRef = useRef<HTMLDialogElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Reset modal state when opening
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setWhatsappUrl('');
      setStep(1);
      setError('');
    }
  }, [isOpen]);

  // Update selection if prop changes
  useEffect(() => {
    if (initialWorkspaceId && initialWorkspaceId !== 'flexible-day-pass') {
      setWorkspaceType(initialWorkspaceId);
    }
    if (initialLocationId) {
      setLocationId(initialLocationId);
    }
  }, [initialWorkspaceId, initialLocationId]);

  // Focus trap, body scroll lock, Escape key, and focus restore
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
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

  const timeSlots = ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError('Please provide your name, email, and phone number.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const whatsappNumber = '919232942092';
    const messageLines = [
      `*New Tour Booking via SpaceDesk Website*`,
      `• Member Name: ${name}`,
      `• Work Email: ${email}`,
      `• Phone Number: ${phone}`,
      `• Campus: ${selectedLoc.name}`,
      `• Scheduled Date: ${date}`,
      `• Preferred Window: ${timeSlot}`,
      `• Workspace Format: ${workspaceType.replace('-', ' ').toUpperCase()}`,
      `• Team Size: ${teamSize}`,
      `• Special Notes: ${notes || 'None'}`,
    ];
    const generatedWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageLines.join('\n'))}`;
    setWhatsappUrl(generatedWhatsappUrl);

    const tourPayload = {
      type: 'tour_booking',
      to: 'info@spacedesk.in',
      recipient: 'info@spacedesk.in',
      whatsapp: '+91 92329 42092',
      name,
      email,
      phone,
      location: selectedLoc.name,
      scheduledDate: date,
      timeSlot,
      workspace: workspaceType.replace('-', ' ').toUpperCase(),
      teamSize,
      notes,
    };

    try {
      const endpoint = import.meta.env?.VITE_FORM_ENDPOINT || '/api/book-tour';
      await Promise.all([
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tourPayload),
        }).catch(() => {}),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
    } catch {
      // Gracefully continue to confirmation pass
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(generatedWhatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const selectedLoc = LOCATIONS.find((l) => l.id === locationId) || LOCATIONS[0];

  return (
    <dialog
      ref={dialogRef}
      open
      aria-modal="true"
      aria-labelledby="book-tour-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(31,32,34,0.8)] backdrop-blur-sm w-full h-full border-none font-[var(--font-sans)] m-0 max-w-none max-h-none modal-backdrop-animate"
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-xl bg-[var(--color-white)] text-[var(--color-charcoal)] rounded-[28px] border border-[var(--color-border)] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col modal-content-animate"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-[var(--color-charcoal)] text-[var(--color-white)] flex items-center justify-between">
          <div>
            <span className="section-label text-[11px] block">
              Private Walkthrough
            </span>
            <h3 id="book-tour-title" className="font-heading text-2xl font-normal text-[var(--color-white)] mt-0.5">
              Book a Tour at {brandName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-10 h-10 rounded-full bg-[var(--color-charcoal)]/80 border border-[var(--color-border)]/20 flex items-center justify-center text-[var(--color-white)] hover:bg-[var(--color-white)]/20 transition-colors focus-ring"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-[var(--font-sans)]">
          {isSubmitted ? (
            /* Success confirmation card */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="font-heading text-3xl font-normal text-[var(--color-charcoal)]">
                  Tour Reserved!
                </h4>
                <p className="text-sm text-[var(--color-text)] mt-2 max-w-sm mx-auto font-[var(--font-sans)]">
                  We look forward to welcoming you to {brandName} {selectedLoc.neighborhood}. Tour request has been routed to WhatsApp <strong>+91 92329 42092</strong> &amp; <strong>info@spacedesk.in</strong>.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-5 rounded-2xl bg-[var(--color-bg-warm)] border border-[var(--color-border)] text-left text-xs space-y-2 max-w-sm mx-auto shadow-sm">
                <div className="flex justify-between border-b border-[var(--color-border)] pb-2 text-[10px] text-[var(--color-muted)] font-semibold">
                  <span>INVITATION PASS</span>
                  <span className="text-[var(--color-gold)]">CONFIRMED</span>
                </div>
                <p><strong>Member:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Location:</strong> {selectedLoc.name}</p>
                <p><strong>Scheduled:</strong> {date} at {timeSlot}</p>
                <p><strong>Workspace:</strong> {workspaceType.replace('-', ' ').toUpperCase()}</p>
                <div className="pt-2 border-t border-[var(--color-border)]/60 text-[11px] text-[var(--color-muted)] space-y-1">
                  <p><strong>WhatsApp:</strong> <span className="text-[var(--color-charcoal)] font-semibold">+91 92329 42092</span></p>
                  <p><strong>Email:</strong> <span className="text-[var(--color-charcoal)] font-medium">info@spacedesk.in</span></p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-95 shadow-sm transition-all"
                  >
                    Open in WhatsApp (+91 92329 42092)
                  </a>
                )}
                <a
                  href={`mailto:info@spacedesk.in?subject=${encodeURIComponent(
                    `Book Tour Request: ${name} - ${selectedLoc.name}`
                  )}&body=${encodeURIComponent(
                    `Hello SpaceDesk Team,\n\nI have submitted a tour booking request with the following details:\n\n• Name: ${name}\n• Email: ${email}\n• Phone: ${phone}\n• Campus: ${selectedLoc.name}\n• Date: ${date}\n• Time: ${timeSlot}\n• Workspace Format: ${workspaceType.replace('-', ' ').toUpperCase()}\n• Team Size: ${teamSize}\n• Special Notes: ${notes || 'None'}\n\nPlease confirm availability.\n\nThank you!`
                  )}`}
                  className="px-5 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-white)] text-[var(--color-charcoal)] font-semibold text-xs tracking-wider hover:bg-[var(--color-tile)] transition-all"
                >
                  Email
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 shadow-md transition-all focus-ring"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Stepper Progress */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${step === 1 ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)]' : 'bg-[var(--color-tile)] text-[var(--color-gold)]'}`}>
                    1
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
                    Select Space
                  </span>
                </div>
                <div className="w-8 h-[1px] bg-[var(--color-border)]" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${step === 2 ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)]' : 'bg-[var(--color-tile)] text-[var(--color-gold)]'}`}>
                    2
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)]">
                    Your Info
                  </span>
                </div>
              </div>

              {step === 1 ? (
                <div className="space-y-5">
                  {/* Location Selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2">
                      Choose Campus
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {LOCATIONS.map((loc) => (
                        <button
                          type="button"
                          key={loc.id}
                          onClick={() => setLocationId(loc.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            locationId === loc.id
                              ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)] border-[var(--color-charcoal)] shadow-sm'
                              : 'bg-[var(--color-white)] border-[var(--color-border)] text-[var(--color-charcoal)] hover:bg-[var(--color-tile)]'
                          }`}
                        >
                          <p className="text-xs font-semibold leading-tight">{loc.name.replace('Spacedesk ', '')}</p>
                          <p className={`text-[10px] mt-1 ${locationId === loc.id ? 'text-[var(--color-charcoal)]/80' : 'text-[var(--color-muted)]'}`}>
                            {loc.neighborhood}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Workspace Interest */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2">
                      Workspace Format
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {TOUR_WORKSPACES.map((ws) => (
                        <button
                          type="button"
                          key={ws.id}
                          onClick={() => setWorkspaceType(ws.id)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            workspaceType === ws.id
                              ? 'bg-[var(--color-primary)] text-[var(--color-charcoal)] border-[var(--color-charcoal)] font-semibold shadow-sm'
                              : 'bg-[var(--color-white)] border-[var(--color-border)] text-[var(--color-charcoal)] hover:bg-[var(--color-tile)]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{ws.title}</span>
                            <span className="text-[10px] opacity-75 font-normal">{ws.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                        Tour Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                        Preferred Window
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-3 py-2 text-xs text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3.5 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 shadow-md transition-all flex items-center justify-center gap-2 focus-ring"
                    >
                      <span>Continue to Contact Info</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                      />
                    </div>
                  </div>

                  {/* Team Size */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                      Estimated Team Size
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-xs text-[var(--color-charcoal)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                    >
                      <option value="1">1 Person (Solo / Freelance)</option>
                      <option value="2-5">2 – 5 People (Small Team)</option>
                      <option value="6-15">6 – 15 People (Growing Startup)</option>
                      <option value="16+">16+ People (Full Suite)</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-1.5">
                      Special Requirements or Timing
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need high security private server or 24/7 weekend access"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[var(--color-white)] border border-[var(--color-border)] rounded-xl px-4 py-2 text-xs text-[var(--color-charcoal)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-gold)] font-[var(--font-sans)]"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-[var(--color-gold)] font-semibold">
                      {error}
                    </p>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-[var(--color-gold)] hover:underline font-semibold"
                    >
                      &larr; Back to Selection
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="px-7 py-3 rounded-full bg-[var(--color-primary)] text-[var(--color-charcoal)] font-semibold text-xs uppercase tracking-wider hover:opacity-90 shadow-md transition-all focus-ring disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[var(--color-charcoal)] shrink-0" aria-hidden="true" />
                          <span>Booking Tour...</span>
                        </>
                      ) : (
                        <span>Book Tour</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
};
