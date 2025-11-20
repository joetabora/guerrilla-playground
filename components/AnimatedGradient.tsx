'use client';

/**
 * Decorative floating gradient orb used in hero sections.
 */
import { motion } from 'framer-motion';

export type AnimatedGradientProps = {
  className?: string;
  size?: number;
};

export const AnimatedGradient = ({ className, size = 520 }: AnimatedGradientProps) => (
  <motion.div
    aria-hidden
    className={`pointer-events-none absolute inset-auto ${className}`}
    style={{ width: size, height: size, borderRadius: size }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.8, scale: 1 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
  >
    <motion.div
      className="h-full w-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      style={{
        background: 'radial-gradient(circle, rgba(77,77,255,0.6), rgba(0,255,224,0.05))',
        filter: 'blur(40px)'
      }}
    />
  </motion.div>
);

export default AnimatedGradient;
