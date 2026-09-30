import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before Optimization",
  afterLabel = "After AI Strategy",
  beforeStats = "2.1% CVR • $18 CPA",
  afterStats = "6.8% CVR • $9.4 CPA (+85% ROAS)"
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full space-y-3 select-none">
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden cursor-ew-resize border border-white/10 shadow-2xl bg-slate-950"
      >
        {/* AFTER Image (Full background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover filter contrast-105"
        />

        {/* AFTER Label Tag */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-xl bg-cyan-500/80 backdrop-blur-md text-black font-mono text-xs font-bold shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{afterLabel}</span>
        </div>

        {/* BEFORE Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-90"
            style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
          />

          {/* BEFORE Label Tag */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-slate-300 font-mono text-xs font-semibold border border-white/10">
            {beforeLabel}
          </div>
        </div>

        {/* Center Draggable Slider Line */}
        <div
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 shadow-[0_0_15px_#00f0ff]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular Drag Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cyan-400 text-black shadow-[0_0_20px_#00f0ff] flex items-center justify-center cursor-ew-resize border-2 border-white">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Metric comparison footer */}
      <div className="flex items-center justify-between text-xs font-mono px-2 text-slate-400">
        <span className="text-slate-400">Before: <strong className="text-slate-300">{beforeStats}</strong></span>
        <span className="text-cyan-400">After: <strong className="text-cyan-300">{afterStats}</strong></span>
      </div>
    </div>
  );
}
