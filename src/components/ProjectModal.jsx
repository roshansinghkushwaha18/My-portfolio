import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl glass-panel bg-[#0b0f19] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/60 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Image Banner */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                {project.category} &bull; {project.year}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-2">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                Client / Brand: {project.client}
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Quantified Results Grid */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Verified Growth Metrics</span>
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {project.results.map((res, rIdx) => (
                  <div
                    key={rIdx}
                    className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center"
                  >
                    <div className="text-lg sm:text-2xl font-black font-display text-cyan-300">
                      {res.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-slate-400 mt-0.5">
                      {res.label}
                    </div>
                    <span className="text-[10px] font-mono text-purple-400 font-bold block mt-1">
                      {res.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem Statement */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <h4 className="text-xs font-mono uppercase tracking-wider text-pink-400 mb-1.5 font-bold">
                The Bottleneck / Challenge
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution & Execution */}
            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1.5 font-bold">
                The AI & Strategic Solution
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Tools Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Technologies & Platforms Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-white/5 border border-white/10 text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 border border-white/10"
              >
                Close
              </button>
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 flex items-center gap-1.5 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <span>Live Case Study</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
