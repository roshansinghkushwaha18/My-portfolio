import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { playHoverSound, playClickSound } from '../utils/audio';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.35,
  as: Component = 'button',
  ...props
}) {
  const ref = useRef(null);

  // MotionValues for zero re-renders on mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 280, damping: 20, mass: 0.2 });
  const springY = useSpring(rawY, { stiffness: 280, damping: 20, mass: 0.2 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    rawX.set(middleX * strength);
    rawY.set(middleY * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handleClick = (e) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  const handleMouseEnter = () => {
    playHoverSound();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}
