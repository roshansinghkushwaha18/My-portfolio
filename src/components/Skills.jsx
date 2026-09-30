import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Zap, Sparkles, Cpu, Search, Share2, Compass, 
  Target, TrendingUp, CheckCircle, Palette, PenTool, 
  BarChart3, PieChart, Layers, Orbit
} from 'lucide-react';
import { skillsData } from '../data/skills';

// Dynamic Icon Lookup
const iconMap = {
  Bot, Zap, Sparkles, Cpu, Search, Share2, Compass, 
  Target, TrendingUp, CheckCircle, Palette, PenTool, 
  BarChart3, PieChart, Layers
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all'
    ? skillsData.skills
    : skillsData.skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>CAPABILITIES & ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Skills & <span className="gradient-text">AI Tech Stack</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Mastering modern search engine algorithms, paid acquisition funnels, generative AI pipelines, and analytical tracking.
        </p>
      </div>

      {/* 3D Orbit Visualizer Banner */}
      <div className="mb-16 relative">
        <div className="relative glass-panel rounded-3xl p-8 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md text-center md:text-left">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5 mb-2">
                <Orbit className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                <span>3D Orbital Ecosystem</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                Core High-Impact Specializations
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Seamlessly converging paid ads, organic search dominance, generative AI workflows, and visual branding for unmatched growth.
              </p>
            </div>

            {/* Orbit Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
              {skillsData.orbitHighlights.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || Sparkles;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}40` }}
                    >
                      <IconComponent className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {item.tag}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {skillsData.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/25'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Skills Card Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredSkills.map((skill) => {
            const IconComp = iconMap[skill.icon] || Sparkles;
            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${skill.color}15`, border: `1px solid ${skill.color}40` }}
                    >
                      <IconComp className="w-6 h-6" style={{ color: skill.color }} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-purple-400">
                        {skill.level} Proficiency
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-300">
                    {skill.proficiency}%
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-5 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>

                {/* Animated Proficiency Bar */}
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, #a855f7)`
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
