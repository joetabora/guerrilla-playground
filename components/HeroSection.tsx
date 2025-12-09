'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Split Background */}
      <div className="absolute inset-0 flex">
        {/* Left: Gaming clips with neon overlay */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://files.catbox.moe/placeholder-gaming.jpg)',
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
          <div className="absolute inset-0 bg-[url(https://files.catbox.moe/grain-texture.png)] opacity-10 mix-blend-overlay" />
        </div>
        
        {/* Right: Harley footage */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://files.catbox.moe/placeholder-harley.jpg)',
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-neon-orange/20 to-transparent" />
          <div className="absolute inset-0 bg-[url(https://files.catbox.moe/grain-texture.png)] opacity-10 mix-blend-overlay" />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Blended Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src="https://files.catbox.moe/guerrilla-logo.png"
              alt="Guerrilla Social Club"
              fill
              className="object-contain filter drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]"
              priority
              unoptimized
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-7xl font-black mb-6 text-white"
          style={{
            textShadow: '0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(255,102,0,0.6)',
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '0.9'
          }}
        >
          Gaming. Harleys. Filth.
          <br />
          <span className="text-neon-cyan">One crew.</span>
        </motion.h1>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-neon-cyan rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-3 bg-neon-cyan rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

