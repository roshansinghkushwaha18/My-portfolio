import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import { experienceData } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>EXPERIENCE & INTERNSHIPS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Professional <span className="gradient-text-purple">Trajectory & Roles</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Measurable achievements in scaling paid media, engineering SEO topical authority, and campus marketing leadership.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-10 space-y-12">
        {experienceData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="relative"
          >
            {/* Timeline Pulsing Node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-6 h-6 rounded-full bg-[#030712] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_12px_#00f0ff]">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Experience Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl group hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold"
                      style={{
                        backgroundColor: `${item.badgeColor}15`,
                        color: item.badgeColor,
                        border: `1px solid ${item.badgeColor}40`
                      }}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {item.role}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300 mt-1">
                    <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                      <Building2 className="w-3.5 h-3.5" />
                      {item.company}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Impact Metric Chips */}
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  {item.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center"
                    >
                      <div className="font-display font-black text-sm sm:text-base text-cyan-300">
                        {metric.value}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                {item.description}
              </p>

              {/* Key Accomplishments */}
              <div className="mb-6 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Key Responsibilities & Deliverables</span>
                </h4>
                {item.keyAchievements.map((achieve, aIdx) => (
                  <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{achieve}</span>
                  </div>
                ))}
              </div>

              {/* Tools Used */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5">
                <span className="text-[11px] font-mono text-slate-400 mr-2">Tools:</span>
                {item.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 border border-white/10 text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
