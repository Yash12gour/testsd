import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setDownloaded(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm modal-backdrop-animate">
      <div className="relative w-full max-w-md bg-white text-zinc-900 rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden modal-content-animate">
        {/* Header */}
        <div className="p-6 bg-zinc-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-[#FED000] flex items-center justify-center text-black font-bold text-xs">
              <Download className="w-4 h-4 stroke-[2.5]" />
            </span>
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-white">
                SpaceDesk Brochure
              </h3>
              <p className="text-[11px] text-zinc-400 font-sans">Official Rates & Floorplan Guide</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {downloaded ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif-heading text-xl font-bold text-zinc-900">
                Brochure Ready!
              </h4>
              <p className="text-xs text-zinc-600 max-w-xs mx-auto leading-relaxed">
                The SpaceDesk 2026 Facility & Pricing Guide has been downloaded and sent to <strong>{email}</strong>.
              </p>
              <div className="pt-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-zinc-900 text-white rounded-md text-xs font-bold uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleDownload} className="space-y-4">
              <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-600 space-y-1.5">
                <p className="font-semibold text-zinc-900 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#B48200]" />
                  What's inside the PDF brochure:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-500 pl-1">
                  <li>Floor plans & cabin seating layouts</li>
                  <li>Conference room hourly & day package rates</li>
                  <li>Enterprise managed floor specifications</li>
                  <li>Biometric security & power backup compliance</li>
                </ul>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Where should we email your copy? *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:border-[#FED000]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FED000] hover:bg-[#F0C400] text-black font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Free PDF Guide</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
