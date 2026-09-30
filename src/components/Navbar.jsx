import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Volume2, VolumeX, Languages, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import ThemeToggle from './ThemeToggle';
import CalendlyModal from './CalendlyModal';
import MagneticButton from './MagneticButton';
import { personalData } from '../data/personal';
import { siteConfig } from '../data/config';
import { useLanguage } from '../locales/LanguageContext';
import { isAudioMuted, toggleAudio, playClickSound, playSuccessSound } from '../utils/audio';
import { trackEvent } from '../utils/analytics';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [muted, setMuted] = useState(isAudioMuted());
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  const { lang, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav_about'), href: '#about' },
    { name: t('nav_education'), href: '#education' },
    { name: t('nav_skills'), href: '#skills' },
    { name: t('nav_experience'), href: '#experience' },
    { name: t('nav_projects'), href: '#projects' },
    { name: t('nav_certificates'), href: '#certificates' },
    { name: t('nav_achievements'), href: '#achievements' },
    { name: t('nav_insights'), href: '#insights' },
    { name: t('nav_contact'), href: '#contact' }
  ];

  useEffect(() => {
    // 1. Lightweight scroll listener for navbar background blur
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isNowScrolled = window.scrollY > 30;
          setIsScrolled((prev) => (prev !== isNowScrolled ? isNowScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. High-performance IntersectionObserver for active section highlighting (zero layout reflow)
    const sections = ['hero', 'about', 'education', 'skills', 'experience', 'projects', 'certificates', 'achievements', 'insights', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    playClickSound();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const isNowMuted = toggleAudio();
    setMuted(isNowMuted);
  };

  // Easter Egg: 5 rapid clicks on logo
  const handleLogoClick = (e) => {
    e.preventDefault();
    playClickSound();
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);

    if (newCount >= siteConfig.easterEgg.logoClickThreshold) {
      playSuccessSound();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.2 },
        colors: ['#00f0ff', '#a855f7', '#ec4899', '#38bdf8', '#fbbf24']
      });
      setLogoClicks(0);
    } else {
      setTimeout(() => setLogoClicks(0), 3000);
    }

    const hero = document.getElementById('hero');
    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-[#030712]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Easter Egg Counter */}
          <div
            onClick={handleLogoClick}
            className="group flex items-center gap-3 select-none cursor-pointer"
            title="Click 5 times for Easter Egg! 🚀"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center font-display font-black text-cyan-400 text-lg">
                RS
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                {personalData.name}
              </span>

              {/* Priority 1, Item 1: Controlled by siteConfig.availableForInternship */}
              {siteConfig.availableForInternship ? (
                <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
                  <span>Available for Internship</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono text-slate-400">
                  LPU BBA Digital Marketing & AI
                </span>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-400/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Controls: Sound, Language, Theme & Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Audio Mute/Unmute Toggle */}
            <button
              onClick={handleToggleSound}
              aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
              title={muted ? 'Enable futuristic sound effects' : 'Mute sound effects'}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500/15 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
            </button>

            {/* Language Toggle (Hindi / English) */}
            <button
              onClick={() => {
                playClickSound();
                toggleLanguage();
              }}
              title={`Switch language (Current: ${lang.toUpperCase()})`}
              className="px-2.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500/15 text-slate-300 hover:text-cyan-400 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'HI' : 'EN'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <ThemeToggle />

            {/* Book a Call Button */}
            <MagneticButton
              onClick={() => setCalendlyOpen(true)}
              className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Book Call</span>
            </MagneticButton>

            {/* Hire Me CTA Button */}
            <MagneticButton
              onClick={(e) => {
                trackEvent('hire_me_click', { location: 'navbar' });
                scrollToSection(e, '#contact');
              }}
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={handleToggleSound}
              aria-label="Toggle sound"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
            >
              {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            <button
              onClick={toggleLanguage}
              className="px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-cyan-300"
            >
              {lang.toUpperCase()}
            </button>

            <ThemeToggle />

            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="xl:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 overflow-hidden"
            >
              <div className="flex flex-col gap-1.5 pt-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-3 border-t border-white/10 mt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCalendlyOpen(true);
                    }}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white bg-white/10 border border-white/20 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>Book a Call</span>
                  </button>

                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  >
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Hire Me Now</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Calendly Booking Modal */}
      <CalendlyModal isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </>
  );
}
