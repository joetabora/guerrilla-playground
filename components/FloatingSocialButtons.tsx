'use client';

import { motion } from 'framer-motion';

export default function FloatingSocialButtons() {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-4">
      {/* Twitch Button */}
      <motion.a
        href="https://twitch.tv/suchgrime"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#9146FF] rounded-full flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(145,70,255,0.6)] hover:shadow-[0_0_30px_rgba(145,70,255,0.8)] transition-all border-2 border-transparent hover:border-neon-cyan"
        aria-label="Twitch"
      >
        🎮
      </motion.a>

      {/* TikTok Button */}
      <motion.a
        href="https://tiktok.com/@suchgrime"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(255,102,0,0.8)] transition-all border-2 border-transparent hover:border-neon-orange"
        aria-label="TikTok"
      >
        🎵
      </motion.a>

      {/* Discord Button */}
      <motion.a
        href="https://discord.gg/guerrillasocialclub"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#5865F2] rounded-full flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(88,101,242,0.6)] hover:shadow-[0_0_30px_rgba(88,101,242,0.8)] transition-all border-2 border-transparent hover:border-neon-cyan"
        aria-label="Discord"
      >
        💬
      </motion.a>

      {/* TEXT JOE Button */}
      <motion.a
        href="sms:4144396211"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-4 bg-neon-orange text-black font-black text-lg uppercase rounded-lg shadow-[0_0_30px_rgba(255,102,0,0.8)] hover:shadow-[0_0_40px_rgba(255,102,0,1)] transition-all border-2 border-transparent hover:border-neon-cyan"
        aria-label="Text Joe"
      >
        TEXT JOE
      </motion.a>
    </div>
  );
}

