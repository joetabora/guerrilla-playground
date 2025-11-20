/**
 * Sticker component - reusable wrapper for sticker-style elements
 * Adds rotation, shadow, and torn-paper aesthetic
 */
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface StickerProps {
  children: ReactNode;
  rotation?: number;
  color?: 'magenta' | 'lime' | 'cyan';
  className?: string;
  hover?: boolean;
}

export default function Sticker({
  children,
  rotation = -2,
  color = 'magenta',
  className,
  hover = true
}: StickerProps) {
  const colorClasses = {
    magenta: 'bg-magenta text-charcoal',
    lime: 'bg-lime text-charcoal',
    cyan: 'bg-cyan text-charcoal'
  };

  return (
    <motion.div
      className={clsx(
        'inline-block px-3 py-1.5 font-bold text-sm uppercase tracking-tight',
        'shadow-sticker',
        colorClasses[color],
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
        clipPath: 'polygon(0% 8%, 8% 0%, 92% 0%, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0% 92%)'
      }}
      whileHover={hover ? { scale: 1.05, rotate: rotation + 2 } : {}}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}

