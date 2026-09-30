import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Send, MessageCircle, Copy, Check, Sparkles, MapPin, Phone, Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LinkedinIcon, InstagramIcon, GithubIcon, TwitterIcon } from './SocialIcons';
import { personalData } from '../data/personal';
import { trackEvent } from '../utils/analytics';
import { playSuccessSound, playClickSound } from '../utils/audio';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    let sentViaApi = false;

    // 1. Try Web3Forms API if access key is present
    if (accessKey && accessKey.trim().length > 5) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `Portfolio Message from ${formData.name}`,
            message: formData.message,
            from_name: formData.name,
            reply_to: formData.email
          })
        });
        const data = await res.json();
        if (data.success) {
          sentViaApi = true;
        }
      } catch (err) {
        console.warn('Web3Forms direct delivery failed, falling back to mail client:', err);
      }
    }

    // 2. If no Web3Forms key, open visitor's email client draft directly to roshanku7521@gmail.com
    if (!sentViaApi) {
      const mailtoUrl = `mailto:${personalData.email}?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Hi Roshan,\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject || 'Direct Inquiry'}\n\nMessage:\n${formData.message}\n`
      )}`;
      window.location.href = mailtoUrl;
    }

    setLastSubmitted({ ...formData, sentViaApi });
    setLoading(false);
    setSubmitted(true);
    playSuccessSound();
    trackEvent('contact_form_submit', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Direct Inquiry'
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#a855f7', '#ec4899', '#3b82f6']
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      url: personalData.socials.linkedin,
      color: '#0077b5',
      label: 'Connect Professionally'
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      url: personalData.socials.instagram,
      color: '#e4405f',
      label: 'Marketing & Campus Life'
    },
    {
      name: 'GitHub',
      icon: GithubIcon,
      url: personalData.socials.github,
      color: '#ffffff',
      label: 'AI Scripts & Projects'
    },
    {
      name: 'Twitter / X',
      icon: TwitterIcon,
      url: personalData.socials.twitter,
      color: '#1da1f2',
      label: 'Growth & SEO Insights'
    }
  ];

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>START A CONVERSATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Let’s Connect & <span className="gradient-text">Build Something Great</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Open to Summer 2025/2026 internships, full-time digital marketing roles, agency collaborations, and AI growth consulting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Reach & Social Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
            <h3 className="text-xl font-bold font-display text-white mb-2">
              Direct Contact Channels
            </h3>

            {/* Email Card with Copy Feature */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${personalData.email}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors break-all"
                    >
                      {personalData.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  title="Copy email"
                  className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors shrink-0 ml-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 block">
                      Direct WhatsApp
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      Instant Quick Chat
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${personalData.whatsapp}?text=Hi%20Roshan,%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-md"
                >
                  Chat Now
                </a>
              </div>
            </div>

            {/* Location & Availability Pills */}
            <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{personalData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Response Time: Typically under 24 hours</span>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3">
            {socialLinks.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 hover:bg-white/5 transition-all duration-300 flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform text-slate-300 group-hover:text-cyan-400">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 block line-clamp-1">
                      {item.label}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h3 className="text-xl font-bold font-display text-white">
                Send a Direct Message
              </h3>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Direct to {personalData.email}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Have a project, role, or discussion in mind? Fill out the details below.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 sm:p-8 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-center py-8"
              >
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mx-auto mb-3 text-cyan-300">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
                  Message Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6">
                  {lastSubmitted?.sentViaApi
                    ? `Thank you, ${lastSubmitted.name}! Your message was delivered directly to ${personalData.email}.`
                    : `Your draft message for ${personalData.email} has been prepared. You can also confirm or send via Gmail Web or WhatsApp:`}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  {/* Gmail Direct Link */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalData.email}&su=${encodeURIComponent(
                      lastSubmitted?.subject || `Portfolio Inquiry from ${lastSubmitted?.name || 'Visitor'}`
                    )}&body=${encodeURIComponent(
                      `Hi Roshan,\n\nName: ${lastSubmitted?.name || ''}\nEmail: ${lastSubmitted?.email || ''}\n\nMessage:\n${lastSubmitted?.message || ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Gmail Web</span>
                  </a>

                  {/* WhatsApp Quick Link */}
                  <a
                    href={`https://wa.me/${personalData.whatsapp}?text=${encodeURIComponent(
                      `Hi Roshan, I sent a message from your portfolio website!\nName: ${lastSubmitted?.name || ''}\nEmail: ${lastSubmitted?.email || ''}\nMessage: ${lastSubmitted?.message || ''}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Quick WhatsApp</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs text-slate-400 hover:text-cyan-400 underline underline-offset-4 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Henderson"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                    Subject / Goal
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Internship Opportunity / Campaign Audit"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                    Your Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your business goals, target timelines, or opportunity details..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-sm tracking-wide text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
