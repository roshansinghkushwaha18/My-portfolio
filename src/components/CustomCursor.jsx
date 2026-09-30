import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // High performance MotionValues - zero React re-renders on mousemove
  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // Outer ring spring physics (smooth cyber follow)
  const ringX = useSpring(rawMouseX, { stiffness: 450, damping: 28, mass: 0.4 });
  const ringY = useSpring(rawMouseY, { stiffness: 450, damping: 28, mass: 0.4 });

  // Central dot spring physics (ultra-precise follow)
  const dotX = useSpring(rawMouseX, { stiffness: 850, damping: 35 });
  const dotY = useSpring(rawMouseY, { stiffness: 850, damping: 35 });

  useEffect(() => {
    // Check if the device has touch primary
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    let hasBeenVisible = false;

    const updateMouse = (e) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
      if (!hasBeenVisible) {
        hasBeenVisible = true;
        setIsVisible(true);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = Boolean(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest?.('a') ||
        target.closest?.('button') ||
        target.getAttribute?.('role') === 'button' ||
        target.classList?.contains('cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      );
      setIsHovered((prev) => (prev !== isInteractive ? isInteractive : prev));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMouse, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rawMouseX, rawMouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{
          x: ringX,
          y: ringY,
          borderWidth: isHovered ? '2px' : '1.5px',
          boxShadow: isHovered 
            ? '0 0 20px rgba(0, 240, 255, 0.6), inset 0 0 10px rgba(0, 240, 255, 0.3)' 
            : '0 0 12px rgba(168, 85, 247, 0.4)'
        }}
        animate={{
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          scale: isClicking ? 0.8 : 1,
          borderColor: isHovered ? 'rgba(0, 240, 255, 0.9)' : 'rgba(168, 85, 247, 0.6)',
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.15)' : 'rgba(168, 85, 247, 0.05)',
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 28,
          mass: 0.5
        }}
      />

      {/* Central Precision Cyber Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isHovered ? 0 : isClicking ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35
        }}
      />
    </>
  );
}
