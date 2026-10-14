import React, { useState } from 'react';
import { motion } from 'motion/react';

const WHATSAPP_NUMBER = '919232942092';
const DEFAULT_MESSAGE = encodeURIComponent(
  'Hi SpaceDesk, I would like to know more about your coworking spaces and book a free tour.'
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`;

export const WhatsAppButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with SpaceDesk (+91 92329 42092)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.8, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-300 focus-ring cursor-pointer"
      >
        {/* Subtle pulsing background glow ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none"
          style={{ animationDuration: '3s' }}
        />

        {/* WhatsApp Official Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10 transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.297-.883-.725-1.48-1.62-1.653-1.917-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.733 1.543h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.472-8.413" />
        </svg>

        {/* Desktop Tooltip Badge */}
        <span className="hidden md:block absolute left-full ml-3 px-3 py-1.5 rounded-full bg-[var(--color-charcoal)] text-white text-xs font-semibold whitespace-nowrap shadow-md pointer-events-none opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 border border-white/10">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
