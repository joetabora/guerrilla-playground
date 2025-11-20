/**
 * MicroInteractions - utility hooks and components for hover/tilt effects
 */
'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Card component with 3D tilt effect on hover
 */
export function TiltCard({ children, className = '', intensity = 15 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Pulse button with scale animation
 */
interface PulseButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  color?: 'magenta' | 'lime' | 'cyan';
}

export function PulseButton({ children, onClick, className = '', color = 'magenta' }: PulseButtonProps) {
  const colorClasses = {
    magenta: 'bg-magenta hover:bg-magenta/90 shadow-glow-magenta',
    lime: 'bg-lime text-charcoal hover:bg-lime/90 shadow-glow-lime',
    cyan: 'bg-cyan text-charcoal hover:bg-cyan/90 shadow-glow-cyan'
  };

  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 font-bold text-lg uppercase tracking-tight rounded-lg transition-colors ${colorClasses[color]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ boxShadow: ['0 0 20px rgba(255, 45, 149, 0.3)', '0 0 40px rgba(255, 45, 149, 0.6)', '0 0 20px rgba(255, 45, 149, 0.3)'] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.button>
  );
}

