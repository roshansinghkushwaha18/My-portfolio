import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, GraduationCap, Award, Download, Sparkles, CheckCircle2, Flame, Bot, TrendingUp } from 'lucide-react';
import { personalData } from '../data/personal';

export default function About() {
  const journeyMilestones = [
    {
      year: "2026",
      title: "Joined Lovely Professional University",
      desc: "Enrolled in BBA in Digital Marketing & AI, establishing a strong foundation in consumer behavior, web analytics, and business acumen."
    },
    {
      year: "2027",
      title: "Performance Ads & Agency Exposure",
      desc: "Managed live Meta & Google Ads campaigns, driving organic SEO growth and achieving up to 4.4x ROAS for e-commerce brands."
    },
    {
      year: "2026 - Present",
      title: "Pioneering AI-Driven Marketing Workflows",
      desc: "Automating creative generation, predictive lead scoring, and generative engine optimization (GEO) with modern LLM pipelines."
    }
  ];

  const corePillars = [
    {
      icon: TrendingUp,
      title: "ROI & Revenue Focused",
      desc: "Every campaign, creative, and keyword strategy is tied directly to customer acquisition cost and return on ad spend."
    },
    {
      icon: Bot,
      title: "AI-Native Workflow",
      desc: "Leveraging Claude, ChatGPT, and Make.com to compress days of manual creative work into minutes of automated output."
    },
    {
      icon: Flame,
      title: "Relentless Experimentation",
      desc: "Continuous A/B multivariate testing across copy hooks, landing pages, and search intent clusters."
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <User className="w-3.5 h-3.5" />
          <span>ABOUT ME</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Engineering Growth with <span className="gradient-text">Data & AI</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Get to know my journey, academic trajectory at LPU, and how I bridge marketing strategy with artificial intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Cyber Profile Card & Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="relative group w-full max-w-sm">
            {/* Glowing Border Rings */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-500" />

            <div className="relative rounded-3xl bg-[#0b0f19] border border-white/10 p-6 flex flex-col items-center text-center shadow-2xl">
              {/* Photo Container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-6 rounded-2xl overflow-hidden border-2 border-cyan-500/50 p-1 bg-gradient-to-b from-cyan-500/30 to-purple-600/30 shadow-[0_0_30px_rgba(0,240,255,0.25)]">
                <img
                  src={personalData.profileImage}
                  alt={personalData.name}
                  className="w-full h-full object-cover object-top rounded-xl filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-lg bg-[#030712]/85 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open for Roles</span>
                  </span>
                  <span className="text-purple-400 font-semibold">LPU '26</span>
                </div>
              </div>

              {/* Identity & Badges */}
              <h3 className="text-xl font-bold font-display text-white mb-1">
                {personalData.name}
              </h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/25 to-pink-500/20 border border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.35)] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span className="text-xs sm:text-sm font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-200 to-pink-300">
                  {personalData.roleTitle}
                </span>
              </div>

              <div className="w-full space-y-2.5 text-xs text-slate-300 text-left border-t border-white/10 pt-4 font-mono">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{personalData.university.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{personalData.university.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Spec: {personalData.university.specialization}</span>
                </div>
              </div>

              {/* Resume Download Action */}
              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Bio Narrative & Pillars */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            <p>
              I am a digital growth specialist currently completing my <strong>BBA in Digital Marketing and Artificial Intelligence</strong> at <strong>Lovely Professional University (LPU), Phagwara, Punjab</strong>.
            </p>
            <p className="text-slate-400">
              Unlike traditional marketers who rely purely on intuition, my approach fuses <strong>algorithmic SEO, performance ads (Meta & Google), and generative AI automations</strong>. I leverage artificial intelligence not just as a novelty, but as a force multiplier to accelerate keyword ranking, creative variant testing, and customer conversion.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-display font-bold text-white text-sm mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Journey Timeline */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Career & Learning Trajectory</span>
            </h4>
            <div className="relative border-l-2 border-white/10 ml-3 space-y-6">
              {journeyMilestones.map((item, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff]" />
                  <span className="text-xs font-mono text-purple-400 font-semibold">{item.year}</span>
                  <h5 className="text-sm font-bold text-white mt-0.5">{item.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
