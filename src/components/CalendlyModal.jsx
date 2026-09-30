import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ExternalLink, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/config';
import { trackEvent } from '../utils/analytics';

export default function CalendlyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleOpenExternal = () => {
    trackEvent('book_a_call_click', { mode: 'external' });
    window.open(siteConfig.calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030712]/85 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl glass-panel bg-[#0b0f19] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  Schedule a 1-on-1 Call with Roshan
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  Discuss marketing campaigns, internships, or AI workflows
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Calendly modal"
              className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Embedded Calendly or Launchpad */}
          <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-full max-w-lg text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                <Sparkles className="w-8 h-8 text-black" />
              </div>

              <div>
                <h4 className="text-2xl font-bold font-display text-white mb-2">
                  Direct Discovery Session
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  Pick a 15-30 minute slot directly on Roshan's calendar. Perfect for recruiters, marketing managers, and founders looking to explore growth strategies.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-slate-400 space-y-1.5 text-left max-w-md mx-auto">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <span className="text-white font-bold">30 Minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Platform:</span>
                  <span className="text-cyan-300 font-bold">Google Meet / Zoom</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Configured URL:</span>
                  <span className="text-purple-300 truncate max-w-[200px]">{siteConfig.calendlyUrl}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleOpenExternal}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Calendar Scheduler</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/5 border border-white/10"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
