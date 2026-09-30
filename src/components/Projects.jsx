import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, ExternalLink, ArrowRight, TrendingUp, Layers, Eye, BookOpen } from 'lucide-react';
import { projectsData } from '../data/projects';
import ProjectModal from './ProjectModal';
import { playClickSound } from '../utils/audio';

// Interactive 3D Tilt Card Component - GPU Accelerated with zero React re-renders
function TiltProjectCard({ project, onOpenModal }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, transparent 60%)`;
        glareRef.current.style.opacity = '1';
      }
    });
  };

  const handleMouseLeave = () => {
    cancelAnimationFrame(rafId.current);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transformStyle: 'preserve-3d'
      }}
      className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_35px_rgba(0,240,255,0.2)]"
    >
      {/* Glare Overlay */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 opacity-0"
      />

      {/* Card Image Banner */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter contrast-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent" />
        
        {/* Category Tag */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-[#030712]/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300">
            {project.category}
          </span>
        </div>

        {/* Featured Pill */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/30 border border-purple-500/60 text-purple-300">
              FEATURED
            </span>
          </div>
        )}
      </div>

      {/* Card Details Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
            {project.title}
          </h3>
          <p className="text-xs text-slate-400 font-mono mb-4 line-clamp-1">
            {project.tagline}
          </p>

          {/* Results Metric Pills */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {project.results.map((res, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-white/5 border border-white/5 text-center group-hover:border-cyan-500/20 transition-colors"
              >
                <div className="text-sm font-black font-display text-cyan-300">
                  {res.value}
                </div>
                <div className="text-[9px] font-mono text-slate-400 truncate">
                  {res.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {project.overview}
          </p>
        </div>

        {/* Footer: Tools & CTA */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tools.slice(0, 3).map((tool, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/10 text-slate-400"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 text-slate-500">
                +{project.tools.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <Link
              to={`/project/${project.id}`}
              onClick={() => playClickSound()}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group/btn"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Case Study</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
            </Link>

            <div className="flex items-center gap-1.5">
              {project.demoLink && project.demoLink !== '#' && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                  }}
                  title="Open Live Application"
                  className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 hover:text-cyan-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={() => onOpenModal(project)}
                title="Quick Modal View"
                className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Rocket className="w-3.5 h-3.5" />
          <span>PORTFOLIO & CASE STUDIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Featured <span className="gradient-text">Growth Projects</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Interactive 3D cards detailing data-backed results, verified ROAS, search rankings, and autonomous AI automation pipelines.
        </p>
      </div>

      {/* 3D Tilt Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <TiltProjectCard
            key={project.id}
            project={project}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {/* Detailed Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
