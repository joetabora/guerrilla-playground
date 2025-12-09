'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ContentItem {
  id: string;
  title: string;
  type: 'gaming' | 'harley';
  thumbnail: string;
  views: string;
  platform: string;
}

const content: ContentItem[] = [
  {
    id: '1',
    title: 'Epic 1v5 Clutch',
    type: 'gaming',
    thumbnail: 'https://files.catbox.moe/gaming-clip-1.jpg',
    views: '2.5M',
    platform: 'TikTok'
  },
  {
    id: '2',
    title: 'First Ride: Street Glide',
    type: 'harley',
    thumbnail: 'https://files.catbox.moe/harley-vlog-1.jpg',
    views: '850K',
    platform: 'YouTube'
  },
  {
    id: '3',
    title: 'Rage Quit Compilation',
    type: 'gaming',
    thumbnail: 'https://files.catbox.moe/gaming-clip-2.jpg',
    views: '1.8M',
    platform: 'TikTok'
  },
  {
    id: '4',
    title: 'Harley Maintenance Tips',
    type: 'harley',
    thumbnail: 'https://files.catbox.moe/harley-vlog-2.jpg',
    views: '420K',
    platform: 'YouTube'
  },
  {
    id: '5',
    title: 'Stream Highlights #47',
    type: 'gaming',
    thumbnail: 'https://files.catbox.moe/gaming-clip-3.jpg',
    views: '3.2M',
    platform: 'Twitch'
  },
  {
    id: '6',
    title: 'Cross-Country Road Trip',
    type: 'harley',
    thumbnail: 'https://files.catbox.moe/harley-vlog-3.jpg',
    views: '1.1M',
    platform: 'YouTube'
  }
];

export default function ContentGridSection() {
  return (
    <section className="relative py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black text-center mb-12 text-white"
          style={{ letterSpacing: '-0.02em' }}
        >
          BEST <span className="text-neon-cyan">CLIPS</span> + <span className="text-neon-orange">VLOGS</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden border-2 border-transparent group-hover:border-neon-cyan transition-colors">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <div className="text-white font-black text-lg mb-1">{item.title}</div>
                  <div className="text-sm text-neon-cyan">
                    {item.views} views • {item.platform}
                  </div>
                </div>
                {/* Type Badge */}
                <div className={`absolute top-2 right-2 px-3 py-1 font-black text-xs uppercase ${
                  item.type === 'gaming' 
                    ? 'bg-neon-cyan text-black' 
                    : 'bg-neon-orange text-black'
                }`}>
                  {item.type}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

