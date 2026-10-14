import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const BlogSection: React.FC = () => {
  const articles = [
    {
      id: 'art-1',
      tag: 'MEETING ROOMS',
      date: '07 Sept 2026',
      title: 'Meeting Room Rental Guide: How to Choose the Right Space for Your Business Meetings',
      excerpt: 'Choosing the right meeting room can make client discussions, interviews, presentations, workshops, and team sessions more productive.',
      imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'art-2',
      tag: 'MEETING ROOMS',
      date: '01 Sept 2026',
      title: 'How a Professional Conference Room Can Improve Your Business Meetings',
      excerpt: 'A professional conference room gives businesses a private, comfortable, and fully equipped setting for client meetings, team discussions, and presentations.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'art-3',
      tag: 'DEDICATED DESK',
      date: '18 Sept 2026',
      title: 'Co-working vs Working From Home: Which One Actually Works for You?',
      excerpt: 'Working from home looks great on paper: no commute, flexible hours, complete comfort. In reality? Constant home distractions and lack of boundary.',
      imageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] text-gray-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header with Arrow Controls matching Reference */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-bold block mb-1">
              NEWS & ARTICLES
            </span>
            <div className="w-10 h-0.5 bg-[#FFDE00] mb-3" />
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Latest From Our Blog
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* 3-Card Grid with Yellow Pill Tags */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={art.imageUrl}
                    alt={art.title}
                    fallbackTitle={art.title}
                    theme="neutral"
                    containerClassName="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Yellow category badge matching Reference */}
                  <span className="absolute top-3 left-3 bg-[#FFDE00] text-gray-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                    {art.tag}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-mono text-gray-400 block mb-2">
                    {art.date}
                  </span>
                  <h3 className="font-display text-lg font-bold text-gray-900 leading-snug group-hover:text-[#B45309] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-[#B45309] inline-flex items-center gap-1.5 transition-colors">
                  <span>READ ARTICLE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
