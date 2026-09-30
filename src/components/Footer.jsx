import React from 'react';
import { ArrowUp, Sparkles, Heart, Mail } from 'lucide-react';
import { LinkedinIcon, InstagramIcon, GithubIcon, TwitterIcon } from './SocialIcons';
import { personalData } from '../data/personal';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#030712]/90 backdrop-blur-2xl text-slate-400 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <div className="w-full h-full bg-[#030712] rounded-[10px] flex items-center justify-center font-display font-black text-cyan-400 text-lg">
                  RS
                </div>
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base tracking-tight">
                  {personalData.name}
                </h3>
                <p className="text-xs font-mono font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400">
                  {personalData.roleTitle}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Combining algorithmic search engine optimization, paid customer acquisition on Meta & Google, and generative AI automations to drive exponential business growth.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-white/10 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-white/10 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-white/10 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={personalData.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-400 border border-white/10 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors">About & Bio</a>
              </li>
              <li>
                <a href="#education" className="hover:text-cyan-300 transition-colors">LPU Education</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-300 transition-colors">AI & Marketing Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-300 transition-colors">Case Studies & Growth</a>
              </li>
              <li>
                <a href="#certificates" className="hover:text-cyan-300 transition-colors">Certifications</a>
              </li>
              <li>
                <a href="#insights" className="hover:text-cyan-300 transition-colors">Blog & Perspectives</a>
              </li>
            </ul>
          </div>

          {/* Core Specializations & Back to Top */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4">
                Specializations
              </h4>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  Search Engine Optimization
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  Meta Advantage+ Ads
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  Google Search Ads
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  Generative Engine Opt (GEO)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  Make.com Automations
                </span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all duration-300 shadow-sm"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Built with React, Three.js, GSAP & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
