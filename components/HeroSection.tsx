'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TwitchEmbed from './TwitchEmbed';
import TikTokFeed from './TikTokFeed';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black py-20">
      {/* Background with grain */}
      <div className="absolute inset-0 bg-[url(https://files.catbox.moe/grain-texture.png)] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Logo and Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">
            <Image
              src="https://files.catbox.moe/guerrilla-logo.png"
              alt="Guerrilla Social Club"
              fill
              className="object-contain filter drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]"
              priority
              unoptimized
            />
          </div>
          <h1
            className="text-4xl md:text-7xl font-black mb-4 text-white"
            style={{
              textShadow: '0 0 20px rgba(0,255,255,0.8), 0 0 40px rgba(255,102,0,0.6)',
              letterSpacing: '-0.02em',
              lineHeight: '0.9'
            }}
          >
            Gaming. Harleys. Filth.
            <br />
            <span className="text-neon-cyan">One crew.</span>
          </h1>
        </motion.div>

        {/* Twitch and TikTok Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Live Twitch Embed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1"
          >
            <TwitchEmbed />
          </motion.div>

          {/* Right: Scrolling TikTok Feed */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-span-1"
          >
            <div className="relative h-[600px] overflow-hidden border-4 border-neon-orange/50 glitch-container bg-gray-900">
              <div className="absolute top-4 left-4 z-10 bg-black/80 px-3 py-1 text-neon-orange font-black text-sm uppercase">
                Latest from @suchgrime
              </div>
              <TikTokFeed />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

