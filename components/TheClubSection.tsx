'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Mock data - replace with real Discord API
const mockMemberCount = 1234;
const filthFam = [
  { name: 'GrimyGamer', role: 'Mod' },
  { name: 'HarleyRider99', role: 'Veteran' },
  { name: 'ToxicTactics', role: 'Creator' },
  { name: 'BikeBro', role: 'Enthusiast' }
];

export default function TheClubSection() {
  const [memberCount, setMemberCount] = useState(mockMemberCount);

  // Simulate live member count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMemberCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black text-center mb-12 text-white"
          style={{
            textShadow: '0 0 20px rgba(0,255,255,0.8)',
            letterSpacing: '-0.02em'
          }}
        >
          THE <span className="text-neon-cyan">CLUB</span>
        </motion.h2>

        {/* Discord Invite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <a
            href="https://discord.gg/guerrillasocialclub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-6 bg-[#5865F2] text-white font-black text-2xl uppercase hover:bg-[#4752C4] transition-all shadow-[0_0_30px_rgba(88,101,242,0.6)] hover:shadow-[0_0_40px_rgba(88,101,242,0.8)]"
          >
            JOIN THE DISCORD
          </a>
        </motion.div>

        {/* Live Member Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <div className="text-6xl md:text-8xl font-black text-neon-orange mb-2">
            {memberCount.toLocaleString()}
          </div>
          <div className="text-xl text-white/60 uppercase tracking-wider">
            Members Online
          </div>
        </motion.div>

        {/* Filth Fam Shoutouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-black text-center mb-8 text-neon-cyan">
            FILTH FAM
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filthFam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 border-2 border-neon-cyan/30 p-4 text-center hover:border-neon-cyan transition-colors"
              >
                <div className="text-lg font-black text-white mb-1">{member.name}</div>
                <div className="text-sm text-neon-orange uppercase">{member.role}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

