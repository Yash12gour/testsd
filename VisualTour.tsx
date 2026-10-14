import React, { useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';

export const VisualTour: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'office' | 'garden' | 'parking'>('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'office', label: 'Office Areas' },
    { id: 'garden', label: 'Garden Workspace' },
    { id: 'parking', label: 'Parking Facilities' },
  ];

  const photos = [
    {
      id: 'p1',
      category: 'office',
      title: 'Communal Work Tables',
      subtitle: 'Sunlit timber benches with ergonomic task chairs',
      imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'p2',
      category: 'office',
      title: 'Acoustic Boardroom',
      subtitle: '4K display presentation suite',
      imageUrl: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'p3',
      category: 'garden',
      title: 'Outdoor Garden Cafe',
      subtitle: 'Courtyard seating with high-speed Wi-Fi',
      imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'p4',
      category: 'parking',
      title: 'Guarded Parking',
      subtitle: 'Dedicated parking for two-wheelers and cars',
      imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filteredPhotos = photos.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] text-gray-900 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Yellow Underline */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-bold block mb-1">
            VISUAL TOUR
          </span>
          <div className="w-10 h-0.5 bg-[#FFDE00] mx-auto mb-3" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Explore SpaceDesk
          </h2>
        </div>

        {/* Filter Pills matching Reference (Active has #FFDE00) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#FFDE00] text-gray-950 shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:text-gray-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Gallery Grid matching Reference Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={photo.imageUrl}
                  alt={photo.title}
                  fallbackTitle={photo.title}
                  theme="neutral"
                  containerClassName="w-full h-full"
                  className="group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-gray-900">
                  {photo.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {photo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
