import React from 'react';
import { TESTIMONIALS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] text-zinc-900 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-widest text-[#B48200] uppercase font-sans">
            REVIEWS
          </span>
          <h2 className="font-serif-heading text-[clamp(1.75rem,4.5vw,3rem)] font-normal text-zinc-900 mt-2 text-balance leading-tight">
            What Our Members Say
          </h2>
          <div className="yellow-accent-bar" />
        </div>

        {/* 3 Review Cards (Matching Reference Image) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="p-8 rounded-2xl bg-white border border-zinc-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                {/* Signature Yellow Double Quotation Mark */}
                <div className="text-[#FED000] font-serif-heading text-4xl font-bold leading-none mb-4 select-none">
                  “
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-zinc-100">
                <h4 className="font-sans font-bold text-sm text-zinc-900">
                  {review.author}
                </h4>
                <p className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase mt-0.5">
                  {review.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
