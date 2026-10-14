import React from 'react';
import { Download } from 'lucide-react';

interface BrochureBannerProps {
  onDownloadClick: () => void;
}

export const BrochureBanner: React.FC<BrochureBannerProps> = ({ onDownloadClick }) => {
  return (
    <section className="bg-[#FED000] text-[#18181B] py-6 sm:py-7 transition-colors hover:bg-[#F0C400]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <button
          onClick={onDownloadClick}
          className="w-full flex items-center justify-center gap-3 font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] group focus:outline-none"
        >
          <span>Download SpaceDesk Brochure</span>
          <Download className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
