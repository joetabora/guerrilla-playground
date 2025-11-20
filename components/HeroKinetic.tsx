/**
 * HeroKinetic - kinetic typography hero with letter-level animation
 * Creates a punchy, Instagrammable headline with staggered letter reveals
 */
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Sticker from './Sticker';
import AnimatedGradientOrb from './AnimatedGradientOrb';

interface HeroKineticProps {
  headline: string;
  subheadline?: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
}

export default function HeroKinetic({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary
}: HeroKineticProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Split headline into words, then letters for animation
  const words = headline.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated gradient orbs */}
      <AnimatedGradientOrb size={500} color="magenta" className="top-20 left-10" />
      <AnimatedGradientOrb size={400} color="lime" className="bottom-20 right-10" />
      <AnimatedGradientOrb size={300} color="cyan" className="top-1/2 right-1/4" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6">
            {words.map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                variants={wordVariants}
                className="inline-block mr-4"
              >
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    variants={letterVariants}
                    className="inline-block text-kinetic"
                    style={{ display: 'inline-block' }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto"
          >
            {subheadline}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {ctaPrimary && (
            <motion.a
              href={ctaPrimary.href}
              className="px-8 py-4 bg-magenta text-white font-bold text-lg uppercase tracking-tight rounded-lg shadow-glow-magenta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {ctaPrimary.text}
            </motion.a>
          )}
          {ctaSecondary && (
            <motion.a
              href={ctaSecondary.href}
              className="px-8 py-4 bg-transparent border-2 border-lime text-lime font-bold text-lg uppercase tracking-tight rounded-lg hover:bg-lime hover:text-charcoal transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {ctaSecondary.text}
            </motion.a>
          )}
        </motion.div>

        {/* Floating stickers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute top-20 right-10 hidden lg:block"
        >
          <Sticker color="lime" rotation={-5}>New</Sticker>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="absolute bottom-40 left-10 hidden lg:block"
        >
          <Sticker color="cyan" rotation={3}>Hot</Sticker>
        </motion.div>
      </div>
    </section>
  );
}

