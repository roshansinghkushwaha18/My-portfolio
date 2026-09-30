import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, ExternalLink, Calendar, 
  Sparkles, CheckCircle2, TrendingUp, Building2, 
  ArrowRight, ShieldCheck 
} from 'lucide-react';
import { projectsData } from '../data/projects';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import CalendlyModal from '../components/CalendlyModal';
import { trackEvent } from '../utils/analytics';
import { playClickSound } from '../utils/audio';

export default function CaseStudyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = projectsData.find((p) => p.id === id) || projectsData[0];
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  const handleDownloadPdf = () => {
    playClickSound();
    trackEvent('download_case_study_pdf', { project: project.title });
    alert(`Downloading case study for "${project.title}". (Replace placeholder link in src/data/projects.js)`);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-[#030712]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors py-1.5 px-3 rounded-xl bg-white/5 border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2.5">
            {project.demoLink && project.demoLink !== '#' && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <span>Live Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => setCalendlyOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-400 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:scale-105 transition-transform"
            >
              Book Strategy Call
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-24 space-y-12">
        {/* Title & Category Badge */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              {project.category}
            </span>
            <span className="text-xs font-mono text-purple-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.year} &bull; Client: {project.client}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-mono mb-4">
            {project.tagline}
          </p>

          {project.demoLink && project.demoLink !== '#' && (
            <div className="pt-2">
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all"
              >
                <span>Launch Live Application</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Quantified Metrics Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.results.map((res, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-white/10 text-center shadow-lg"
            >
              <div className="text-2xl sm:text-3xl font-black font-display text-cyan-300">
                {res.value}
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                {res.label}
              </div>
              <span className="text-xs font-mono text-purple-400 font-bold block mt-1">
                {res.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Before / After Comparison Interactive Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Campaign Visual & Funnel Comparison</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Drag the slider handle horizontally to view the before & after transformation
              </p>
            </div>
          </div>

          <BeforeAfterSlider
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
            beforeStats={project.beforeStats}
            afterStats={project.afterStats}
          />
        </div>

        {/* Problem and Solution Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-3">
            <h3 className="text-base font-bold font-mono uppercase tracking-wider text-pink-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-400" />
              <span>The Client's Challenge</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-cyan-500/5 shadow-xl space-y-3">
            <h3 className="text-base font-bold font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>The AI Strategic Solution</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Technologies and Tools Used */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4">
            Platforms, AI Workflows & Tooling Stack
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {project.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Downloadable PDF & CTA Actions */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              Download Full Case Study Report
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Includes comprehensive ad sets, keyword lists, prompt templates & attribution breakdown.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPdf}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => setCalendlyOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 text-black font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Discussion</span>
            </button>
          </div>
        </div>

        {/* Next Project Footer Link */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            to="/"
            className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            &larr; Back to Portfolio
          </Link>

          <Link
            to={`/project/${nextProject.id}`}
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <CalendlyModal isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </div>
  );
}
