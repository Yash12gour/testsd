import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is included in the monthly membership fee at our coworking space in Bhopal?',
      a: 'All plans include 300 Mbps high-speed internet, power backup, ergonomic seating, unlimited artisanal coffee & tea, meeting room credits, access to breakout areas, housekeeping, and secure biometric entry.',
    },
    {
      q: 'Is it easy to switch my seating plan as my team grows?',
      a: 'Yes, absolutely. You can upgrade from a Day Pass or Hot Desk to a Dedicated Desk or Private Office Suite at any time without penalty. We scale flexibly alongside your team.',
    },
    {
      q: 'Are there any hidden costs or security deposits for coworking space in Bhopal?',
      a: 'No hidden fees. We believe in transparent month-to-month pricing. Dedicated desks and private cabins carry a standard refundable one-month deposit, with zero setup or utility surcharges.',
    },
    {
      q: 'Is on-site vehicle parking available at SpaceDesk Bhopal?',
      a: 'Yes, we have dedicated, guarded two-wheeler and four-wheeler parking at Jaswant Tower for all members and their registered guests.',
    },
    {
      q: 'Can I bring guests or clients to the workspace?',
      a: 'Yes, you can host clients in our welcoming reception lounge or book fully equipped conference rooms by the hour with presentation screens and guest beverage service.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white text-gray-900 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section Header with Yellow Underline */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-bold block mb-1">
            FAQ
          </span>
          <div className="w-10 h-0.5 bg-[#FFDE00] mx-auto mb-3" />
          <h2 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] font-bold tracking-tight text-gray-900 leading-tight text-balance">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion List matching Reference */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-gray-50/80 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900">
                    {faq.q}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-700">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-[#FAF8F5]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
