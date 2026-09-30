import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Download, ChevronDown, Calendar } from 'lucide-react';
import CalendlyModal from './CalendlyModal';
import MagneticButton from './MagneticButton';
import { personalData } from '../data/personal';
import { siteConfig } from '../data/config';
import { useLanguage } from '../locales/LanguageContext';
import { trackEvent } from '../utils/analytics';
import { playClickSound } from '../utils/audio';

export default function Hero() {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const { t } = useLanguage();

  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // Pause 4K video when scrolled past hero section to save 100% GPU/CPU frame-rate
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const taglines = personalData.taglines;

  // Typing effect loop
  useEffect(() => {
    const fullText = taglines[currentTaglineIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === fullText) {
      speed = 1800;
      const timeout = setTimeout(() => setIsDeleting(true), speed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
      speed = 400;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTaglineIndex, taglines]);

  const scrollToSection = (id) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeClick = () => {
    trackEvent('download_resume_click', { source: 'hero' });
  };

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Serene Cherry Blossom Tree 4K Video Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] will-change-transform transform-gpu"
        >
          <source src="/serene-cherry-blossom-tree.mp4" type="video/mp4" />
        </video>
        {/* Soft Vignette: keeps tree branches & pink blossoms vivid while blending into dark theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/50 via-[#030712]/20 to-[#030712]" />
      </div>

      {/* Subtle Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)]">
        
        {/* Profile Avatar with Cyber Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-5 group cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-sm opacity-80 group-hover:opacity-100 transition duration-300 animate-pulse" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-cyan-400 p-0.5 bg-[#030712] shadow-2xl">
            <img
              src={personalData.profileImage}
              alt={personalData.name}
              className="w-full h-full object-cover object-top rounded-full filter contrast-105 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {siteConfig.availableForInternship && (
            <div
              className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#030712] shadow-[0_0_10px_#10b981] animate-pulse"
              title="Available for Internship"
            />
          )}
        </motion.div>

        {/* Priority 1, Item 1: Blinking Green Available for Internship Badge */}
        {siteConfig.availableForInternship && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-mono mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_8px_#10b981]" />
            <span>{siteConfig.internshipBadgeText}</span>
          </motion.div>
        )}

        {/* University Sub-Badge */}
        <div className="text-[11px] font-mono text-cyan-400/90 mb-3 tracking-wider uppercase">
          {t('badge_uni')}
        </div>

        {/* Main Title / Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white mb-3"
        >
          {t('hero_greeting')} <span className="gradient-text">{personalData.name}</span>
        </motion.h1>

        {/* Highlighted Role Title Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-purple-500/25 to-pink-500/20 border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.45)] backdrop-blur-md mb-4"
        >
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span className="text-sm sm:text-lg md:text-xl font-extrabold font-display tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-200 to-pink-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {personalData.roleTitle}
          </span>
          <Sparkles className="w-4 h-4 text-pink-300 animate-pulse" />
        </motion.div>

        {/* Typing Effect Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-10 sm:h-12 flex items-center justify-center text-lg sm:text-2xl md:text-3xl font-display font-medium text-slate-300 mb-6"
        >
          <span className="text-cyan-400 font-semibold">{displayText}</span>
          <span className="w-0.5 h-6 sm:h-8 bg-purple-400 ml-1.5 animate-pulse" />
        </motion.div>

        {/* Short Mission Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed mb-10 font-normal"
        >
          {t('hero_desc')}
        </motion.p>

        {/* CTA Buttons: Hire Me, View Work, Book a Call */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-14"
        >
          {/* Hire Me */}
          <MagneticButton
            onClick={() => {
              trackEvent('hire_me_click', { location: 'hero' });
              scrollToSection('contact');
            }}
            className="group px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{t('hero_btn_hire')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>

          {/* View Work */}
          <MagneticButton
            onClick={() => scrollToSection('projects')}
            className="px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide text-slate-200 hover:text-white glass-panel hover:border-cyan-500/50 hover:bg-white/10 transition-all flex items-center gap-2 shadow-md"
          >
            <span>{t('hero_btn_projects')}</span>
          </MagneticButton>

          {/* Priority 2, Item 5: Book a Call (Calendly) */}
          <MagneticButton
            onClick={() => {
              trackEvent('book_a_call_click', { location: 'hero' });
              setCalendlyOpen(true);
            }}
            className="px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide text-cyan-300 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 transition-all flex items-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>{t('hero_btn_call')}</span>
          </MagneticButton>

          {/* Resume Download */}
          <a
            href={personalData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleResumeClick}
            className="px-5 py-3.5 rounded-xl font-semibold text-xs tracking-wider text-slate-300 hover:text-cyan-300 bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>{t('hero_btn_resume')}</span>
          </a>
        </motion.div>

        {/* Floating Quick Metric Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
        >
          {personalData.quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              <div className="font-display font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          aria-label="Scroll to About section"
          className="mt-12 text-slate-500 hover:text-cyan-400 flex flex-col items-center gap-1 text-xs font-mono transition-colors"
        >
          <span>{t('hero_scroll')}</span>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </motion.button>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </section>
  );
}
