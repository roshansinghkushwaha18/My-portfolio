import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';
import { educationData } from '../data/education';

export default function Education() {
  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Ambient background light */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>ACADEMIC FOUNDATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Education & <span className="gradient-text-purple">Academic Background</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Comprehensive business and technology training with specialization in Digital Marketing and Artificial Intelligence.
        </p>
      </div>

      {/* Education Cards Grid */}
      <div className="space-y-8">
        {educationData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className={`glass-panel rounded-3xl p-6 sm:p-8 border transition-all duration-300 relative overflow-hidden group hover:shadow-[0_0_35px_rgba(168,85,247,0.2)] ${
              item.featured
                ? 'border-cyan-500/40 bg-[#0b0f19]/90 ring-1 ring-cyan-500/20'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {/* Top Glowing Accent Line */}
            {item.featured && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Institution Emblem / Header */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-purple-400">
                      {item.score}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {item.institution}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{item.duration} &bull; {item.status}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="text-xs font-bold text-slate-200">
                    {item.degree}
                  </div>
                  <div className="text-xs text-cyan-400 font-mono mt-0.5">
                    {item.specialization}
                  </div>
                </div>
              </div>

              {/* Coursework & Key Highlights */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                {/* Coursework Chips */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Key Coursework & Competencies</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.coursework.map((course, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate-300 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                    <span>Academic Highlights & Involvement</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
