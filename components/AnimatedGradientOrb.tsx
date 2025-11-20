/**
 * AnimatedGradientOrb - animated gradient orb for hero sections
 * Creates a pulsing, floating orb effect
 */
'use client';

import { motion } from 'framer-motion';

interface AnimatedGradientOrbProps {
  size?: number;
  className?: string;
  color?: 'magenta' | 'lime' | 'cyan';
}

export default function AnimatedGradientOrb({
  size = 400,
  className = '',
  color = 'magenta'
}: AnimatedGradientOrbProps) {
  const gradients = {
    magenta: 'radial-gradient(circle, rgba(255, 45, 149, 0.4) 0%, rgba(255, 45, 149, 0) 70%)',
    lime: 'radial-gradient(circle, rgba(166, 255, 0, 0.4) 0%, rgba(166, 255, 0, 0) 70%)',
    cyan: 'radial-gradient(circle, rgba(0, 255, 214, 0.4) 0%, rgba(0, 255, 214, 0) 70%)'
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: gradients[color],
        borderRadius: '50%',
        filter: 'blur(60px)'
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.8, 0.6],
        x: [0, 30, 0],
        y: [0, -30, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
}

