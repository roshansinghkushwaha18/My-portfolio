import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Context & Utilities
import { LanguageProvider } from './locales/LanguageContext';
import { initAnalytics } from './utils/analytics';

// Sub-components
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import MarketingTools from './components/MarketingTools';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AIChatbot from './components/AIChatbot';

// Lazy-loaded Pages for rapid initial loading
const CaseStudyDetail = React.lazy(() => import('./pages/CaseStudyDetail'));

gsap.registerPlugin(ScrollTrigger);

// Main Single Page Portfolio Component
function MainPortfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Achievements />
        <Testimonials />
        <MarketingTools />
        <Blog />
        <Contact />
      </main>

      <Footer />

      {/* Floating Interactive Action Widgets */}
      <FloatingWhatsApp />
      <AIChatbot />
    </motion.div>
  );
}

// Router Animated Transitions Shell
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPortfolio />} />
        <Route
          path="/project/:id"
          element={
            <React.Suspense
              fallback={
                <div className="min-h-screen bg-[#030712] flex items-center justify-center text-cyan-400 font-mono text-sm">
                  Loading Case Study...
                </div>
              }
            >
              <CaseStudyDetail />
            </React.Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // 1. Initialize Analytics (GA4 and Meta Pixel via .env)
    initAnalytics();

    // 2. Initialize Lenis Smooth Scroll with butter-smooth 60/120Hz settings
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* Futuristic Initial Boot Loader */}
        <LoadingScreen onLoadingComplete={() => setLoadingComplete(true)} />

        {/* Global Spring Cyber Cursor */}
        <CustomCursor />

        {/* Animated App Routes */}
        <AnimatedRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}
