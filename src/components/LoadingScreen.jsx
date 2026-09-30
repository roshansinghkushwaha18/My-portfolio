import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, Terminal } from 'lucide-react';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const statusMessages = [
    "Initializing Neural Kernel...",
    "Loading 3D Cyber Spatial Engine...",
    "Synthesizing Marketing Analytics...",
    "Calibrating Algorithmic SEO Models...",
    "Ready. Welcome to Roshan's Portfolio."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            if (onLoadingComplete) onLoadingComplete();
          }, 350);
          return 100;
        }
        // Accelerating curve
        const step = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + step, 100);

        if (next > 20 && next <= 45) setStatusIndex(1);
        else if (next > 45 && next <= 70) setStatusIndex(2);
        else if (next > 70 && next <= 90) setStatusIndex(3);
        else if (next > 90) setStatusIndex(4);

        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#030712] text-slate-100 px-6 select-none"
        >
          {/* Subtle Ambient Backing Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

          {/* Central Holographic Emblem */}
          <div className="relative mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-24 h-24 rounded-2xl border border-cyan-500/30 flex items-center justify-center relative p-1"
            >
              <div className="absolute inset-0 rounded-2xl border border-purple-500/40 rotate-45" />
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 flex items-center justify-center backdrop-blur-md">
                <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Name & Tagline */}
          <h2 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white mb-1 flex items-center gap-2">
            <span>Roshan Singh Kushwaha</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </h2>
          <p className="text-xs md:text-sm text-cyan-400/80 font-mono tracking-widest uppercase mb-8">
            BBA Digital Marketing & AI | LPU
          </p>

          {/* Progress Bar Container */}
          <div className="w-full max-w-xs md:max-w-md bg-slate-900/80 rounded-full h-2 p-0.5 border border-white/10 overflow-hidden relative shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/70 blur-[2px] rounded-full" />
            </motion.div>
          </div>

          {/* Metrics & Terminal Log Line */}
          <div className="w-full max-w-xs md:max-w-md mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Terminal className="w-3.5 h-3.5" />
              {statusMessages[statusIndex]}
            </span>
            <span className="text-purple-400 font-bold ml-2">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
