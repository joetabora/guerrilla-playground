/**
 * ReelGrid - auto-play thumbnail grid of TikTok-style creative tiles
 * Displays featured campaigns with hover-to-pause functionality
 */
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface Reel {
  id: string;
  thumbnail: string;
  title: string;
  brand: string;
  views?: string;
  engagement?: string;
}

interface ReelGridProps {
  reels: Reel[];
}

export default function ReelGrid({ reels }: ReelGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black text-white mb-12 text-center"
        >
          Featured <span className="text-magenta">Reels</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group"
                onMouseEnter={() => setHoveredId(reel.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Thumbnail/Video */}
                <div className="absolute inset-0">
                  <Image
                    src={reel.thumbnail}
                    alt={reel.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Play overlay */}
                  {hoveredId !== reel.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="font-bold text-white text-lg mb-1">{reel.title}</h3>
                  <p className="text-white/80 text-sm mb-2">{reel.brand}</p>
                  {(reel.views || reel.engagement) && (
                    <div className="flex gap-4 text-xs text-white/60">
                      {reel.views && <span>👁 {reel.views}</span>}
                      {reel.engagement && <span>❤️ {reel.engagement}</span>}
                    </div>
                  )}
                </div>

                {/* Hover pause indicator */}
                {hoveredId === reel.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                  >
                    <span className="text-white font-bold text-sm uppercase tracking-tight">Paused</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

