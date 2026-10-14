import React, { useState } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const CommunityEvents: React.FC = () => {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      date: '15 AUG',
      title: 'Independence Day Community Meetup',
      description: 'Celebrating freedom and togetherness with fun office games, team quizzes, and open mic music for all our coworkers.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      tag: 'Celebration',
      location: 'Celebration, Bhopal',
    },
    {
      date: '8 MAR',
      title: "International Women's Day",
      description: 'A special networking session celebrating women entrepreneurs, freelancers, and creators with open discussions and meaningful connections.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
      tag: 'Networking',
      location: 'SpaceDesk Main Lounge, Bhopal',
    },
  ];

  const current = stories[activeStory];

  return (
    <section id="events" className="py-20 md:py-28 bg-[#FAFAFA] text-zinc-900 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold tracking-widest text-[#B48200] uppercase font-sans">
            OUR COMMUNITY
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-normal text-zinc-900 mt-2">
            Events & Functions
          </h2>
          <div className="yellow-accent-bar" />
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Collaboration statement and Event list */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal text-zinc-900">
              Collaboration is in our DNA
            </h3>

            <p className="text-sm sm:text-base text-zinc-600 font-sans leading-relaxed">
              At SpaceDesk, we host frequent events, seminars, and functions to bring our community members together. We believe in networking, learning, and celebrating success as one large family.
            </p>

            <p className="text-sm text-zinc-600 font-sans leading-relaxed">
              From tech workshops to happy hours, look at what has been happening in our spaces lately. Joining SpaceDesk means gaining access to a community that works, learns, and grows together.
            </p>

            {/* Event List with Dates */}
            <div className="space-y-4 pt-4">
              {stories.map((story, idx) => {
                const isSelected = activeStory === idx;
                return (
                  <div
                    key={story.title}
                    onClick={() => setActiveStory(idx)}
                    className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'border-l-4 border-l-[#FED000] border-zinc-300 shadow-md'
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    {/* Dark Date Badge */}
                    <div className="bg-[#1C1C1E] text-white px-3 py-2 rounded-lg text-center shrink-0 w-16">
                      <span className="font-serif-heading text-lg font-bold block leading-none">
                        {story.date.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-mono tracking-wider text-zinc-400 block mt-1 uppercase">
                        {story.date.split(' ')[1]}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-serif-heading text-base sm:text-lg font-bold text-zinc-900">
                        {story.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                        {story.description}
                      </p>
                      <span className="text-xs font-semibold text-[#B48200] hover:text-black mt-2 inline-flex items-center gap-1">
                        Read Full Story →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Featured Event Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-md">
              <div className="relative h-64 sm:h-72 bg-zinc-100">
                <ImageWithFallback
                  src={current.image}
                  alt={current.title}
                  fallbackTitle={current.title}
                  containerClassName="w-full h-full"
                />
                {/* Yellow Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#FED000] text-black font-sans font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
                    {current.tag}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-3">
                <h4 className="font-serif-heading text-2xl font-bold text-zinc-900">
                  {current.title}
                </h4>

                <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                  {current.description}
                </p>

                <div className="pt-3 border-t border-zinc-100 flex items-center gap-2 text-xs text-zinc-500">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{current.date}</span>
                  <span className="mx-1">·</span>
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{current.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
