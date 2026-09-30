import React from 'react';
import { motion } from 'framer-motion';
import { BookMarked, Clock, Calendar, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { blogsData } from '../data/blogs';

export default function Blog() {
  return (
    <section id="insights" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <BookMarked className="w-3.5 h-3.5" />
          <span>THOUGHT LEADERSHIP</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
          Marketing Insights & <span className="gradient-text">AI Perspectives</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Breakdowns of algorithmic changes, generative search engine optimization (GEO), and performance ad mechanics.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogsData.map((blog, idx) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group shadow-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col justify-between"
          >
            <div>
              {/* Image Banner */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#030712]/85 backdrop-blur-md border border-cyan-500/30 text-cyan-300">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 sm:p-7">
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors mb-3 line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 line-clamp-3">
                  {blog.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {blog.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/5 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-white/5 flex items-center justify-between">
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group/link"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
              </a>

              <span className="text-[10px] font-mono text-slate-500">
                [Editable in blogs.js]
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
