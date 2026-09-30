import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, Copy, Check, Terminal, Wand2, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { generateMarketingContent } from '../utils/aiService';
import { playClickSound, playSuccessSound } from '../utils/audio';

export default function MarketingTools() {
  const [activeTab, setActiveTab] = useState('seo'); // 'seo' | 'caption'
  const [inputTopic, setInputTopic] = useState('AI marketing workflows for e-commerce brands');
  const [tone, setTone] = useState('high-intent');
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputResult, setOutputResult] = useState('');
  const [copied, setCopied] = useState(false);

  const defaultSeoOutput = `1. [High CTR]: 7 AI Marketing Workflows to 3x E-Commerce ROAS in 2025
Meta: Learn how automated prompt pipelines and Meta Advantage+ cut customer acquisition costs by 38%.

2. [Search Intent]: The Ultimate Guide to AI E-Commerce Automation | Roshan Kushwaha
Meta: Step-by-step blueprint on scaling online sales with ChatGPT, Make.com, and predictive analytics.

3. [Authority Hook]: Why Leading D2C Brands are Switching to Generative AI Funnels
Meta: Discover how algorithmic audience segmentation and creative velocity drive record revenues.`;

  const defaultCaptionOutput = `Stop wasting 20+ hours a week manually drafting ad copy 🤯👇

Here is the exact 3-step AI pipeline we used to scale an e-commerce brand to 4.8x ROAS:

1️⃣ Audience Deep Dive with Claude
2️⃣ Midjourney Batch Asset Creation
3️⃣ Make.com Webhook Auto-Publishing

Save this post so you don't lose the blueprint! 💾

#DigitalMarketing #AIMarketing #GrowthHacking #EcommerceTips #MetaAds #SEOGrowth #RoshanKushwaha`;

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!inputTopic.trim() || isGenerating) return;

    playClickSound();
    setIsGenerating(true);
    try {
      const generated = await generateMarketingContent(activeTab, {
        topic: inputTopic,
        tone: tone
      });
      setOutputResult(generated);
      playSuccessSound();
    } catch {
      // Fallback to high quality curated templates if offline
      setOutputResult(activeTab === 'seo' ? defaultSeoOutput : defaultCaptionOutput);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = outputResult || (activeTab === 'seo' ? defaultSeoOutput : defaultCaptionOutput);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    playClickSound();
    setTimeout(() => setCopied(false), 2000);
  };

  const currentDisplay = outputResult || (activeTab === 'seo' ? defaultSeoOutput : defaultCaptionOutput);

  return (
    <section id="tools-demo" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Wand2 className="w-3.5 h-3.5" />
          <span>AI MARKETING WORKBENCH</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Live AI Tools <span className="gradient-text">Interactive Demo</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Test live generative AI marketing models powered by our secure serverless backend. Try creating high-CTR SEO titles and viral Instagram captions in real time.
        </p>
      </div>

      {/* Tools Container */}
      <div className="max-w-4xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
        {/* Tool Mode Tabs */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('seo');
              setOutputResult('');
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'seo'
                ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>SEO Title & Meta Generator</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveTab('caption');
              setOutputResult('');
            }}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'caption'
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] scale-105'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Instagram Caption & Hook AI</span>
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="space-y-4 mb-8">
          <div>
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
              {activeTab === 'seo' ? 'Target Topic / Seed Keywords' : 'Post Context / Campaign Theme'}
            </label>
            <input
              type="text"
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
              placeholder="e.g. B2B lead generation via Google Ads, summer apparel sale..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 transition-colors"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-mono text-slate-400">Tone:</span>
              {['high-intent', 'viral-hook', 'educational'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                    tone === t
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-white/5 text-slate-400 border border-white/5'
                  }`}
                >
                  {t.replace('-', ' ')}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs tracking-wider uppercase text-black bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Output...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Generate with AI</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Output Box */}
        <div className="relative rounded-2xl bg-[#030712] border border-cyan-500/30 p-5 font-mono text-xs sm:text-sm text-slate-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Terminal className="w-4 h-4" />
              <span>AI Output Stream</span>
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          <pre className="whitespace-pre-wrap font-mono leading-relaxed text-slate-300">
            {currentDisplay}
          </pre>
        </div>
      </div>
    </section>
  );
}
