'use client';

import { motion } from 'framer-motion';

interface Social {
  name: string;
  url: string;
  icon: string;
  color: string;
}

const socials: Social[] = [
  { name: 'Twitch', url: 'https://twitch.tv/suchgrime', icon: '🎮', color: 'bg-[#9146FF]' },
  { name: 'Kick', url: 'https://kick.com/suchgrime', icon: '⚡', color: 'bg-[#53FC18]' },
  { name: 'TikTok', url: 'https://tiktok.com/@suchgrime', icon: '🎵', color: 'bg-black' },
  { name: 'YouTube', url: 'https://youtube.com/@suchgrime', icon: '▶️', color: 'bg-[#FF0000]' },
  { name: 'Instagram', url: 'https://instagram.com/suchgrime', icon: '📸', color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500' },
  { name: 'Discord', url: 'https://discord.gg/guerrillasocialclub', icon: '💬', color: 'bg-[#5865F2]' },
  { name: 'X (Twitter)', url: 'https://x.com/suchgrime', icon: '𝕏', color: 'bg-black' }
];

export default function SocialsGridSection() {
  return (
    <section className="relative py-20 px-4 bg-black border-y-2 border-neon-cyan/30">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black text-center mb-12 text-white"
          style={{ letterSpacing: '-0.02em' }}
        >
          FOLLOW THE <span className="text-neon-cyan">FILTH</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`${social.color} aspect-square flex flex-col items-center justify-center text-white font-black text-2xl hover:shadow-[0_0_40px_rgba(0,255,255,0.6)] transition-all border-2 border-transparent hover:border-neon-cyan`}
            >
              <div className="text-4xl mb-2">{social.icon}</div>
              <div className="text-xs uppercase tracking-tight">{social.name}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

