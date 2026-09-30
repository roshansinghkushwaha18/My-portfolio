import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award, Zap, CheckCircle, Sparkles, Star } from 'lucide-react';
import { achievementsData } from '../data/achievements';

const iconMap = {
  Trophy, Award, Zap, CheckCircle, Star
};

// High-Performance Animated Number Counter (requestAnimationFrame, zero React re-renders)
function AnimatedCounter({ targetNumber, suffix = '', decimals = 0 }) {
  const spanRef = useRef(null);
  const isInView = useInView(spanRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || !spanRef.current) return;

    let startTime = null;
    let animFrame = null;
    const duration = 1800; // ms

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * targetNumber;

      if (spanRef.current) {
        const formatted = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
        spanRef.current.textContent = `${formatted}${suffix}`;
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isInView, targetNumber, suffix, decimals]);

  return (
    <span ref={spanRef}>
      0{suffix}
    </span>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>HONORS & IMPACT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Milestones & <span className="gradient-text">Key Achievements</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Quantified career metrics, university honors, and competitive marketing hackathon recognitions.
        </p>
      </div>

      {/* Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {achievementsData.counters.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-500/40 text-center group hover:-translate-y-1 transition-all duration-300 shadow-xl"
          >
            <div className="font-display font-black text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 mb-2">
              <AnimatedCounter
                targetNumber={item.targetNumber}
                suffix={item.suffix}
                decimals={item.decimals}
              />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {item.label}
            </h4>
            <p className="text-xs text-slate-400 leading-normal">
              {item.subtext}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Badges & Recognition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievementsData.badges.map((badge, idx) => {
          const IconComp = iconMap[badge.icon] || Trophy;
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex items-start gap-5 group shadow-lg hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 shadow-md"
                style={{ backgroundColor: `${badge.color}15`, border: `1px solid ${badge.color}40` }}
              >
                <IconComp className="w-7 h-7" style={{ color: badge.color }} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    {badge.year}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {badge.organization}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                  {badge.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
