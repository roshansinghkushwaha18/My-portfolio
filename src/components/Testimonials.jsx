import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, Star, ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-sliding interval
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>ENDORSEMENTS & FEEDBACK</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          What Mentors & <span className="gradient-text-purple">Collaborators Say</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Real feedback from university professors, agency directors, and marketing founders.
        </p>
      </div>

      {/* Carousel Container */}
      <div
        className="max-w-4xl mx-auto relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl min-h-[340px] flex flex-col justify-between overflow-hidden">
          {/* Subtle Cyber Quote Watermark */}
          <Quote className="absolute right-6 top-6 w-24 h-24 text-white/5 pointer-events-none" />

          {/* Slide Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col justify-between flex-1"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                    {current.tag}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-base sm:text-xl text-slate-200 font-display italic leading-relaxed mb-8">
                  "{current.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400/50 shadow-md"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-base font-bold font-display text-white">
                    {current.name}
                  </h4>
                  <p className="text-xs text-cyan-400 font-mono">
                    {current.role} &bull; <span className="text-slate-400">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonialsData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === dotIdx
                      ? 'w-8 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_#00f0ff]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
              <span className="text-[10px] font-mono text-slate-500 ml-2">
                {isPaused ? '(Paused on hover)' : '(Auto-playing)'}
              </span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
