import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/config';
import { trackEvent } from '../utils/analytics';
import { playClickSound, playHoverSound } from '../utils/audio';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    playClickSound();
    trackEvent('whatsapp_click', {
      source: 'floating_button',
      number: siteConfig.whatsappNumber
    });
  };

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.whatsappPrefilledMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      {/* Tooltip Badge */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mr-3 px-3 py-1.5 rounded-xl bg-[#030712]/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-mono shadow-xl hidden sm:flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Chat on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          playHoverSound();
        }}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chat with Roshan on WhatsApp"
        className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 p-[1.5px] shadow-[0_0_25px_rgba(16,185,129,0.45)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] transition-shadow duration-300 flex items-center justify-center group"
      >
        <div className="w-full h-full bg-[#030712] group-hover:bg-[#030712]/60 rounded-[14px] flex items-center justify-center transition-colors">
          <MessageCircle className="w-7 h-7 text-emerald-400 group-hover:text-emerald-300 transition-transform group-hover:scale-110" />
        </div>

        {/* Pulsing Outer Ping Ring */}
        <span className="absolute -inset-1 rounded-2xl bg-emerald-500/30 animate-ping pointer-events-none -z-10" />
      </motion.a>
    </div>
  );
}
