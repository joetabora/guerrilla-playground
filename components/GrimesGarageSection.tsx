'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import TwitchEmbed from './TwitchEmbed';

interface Harley {
  id: string;
  name: string;
  year: number;
  model: string;
  price: number;
  image: string;
  url?: string;
}

export default function GrimesGarageSection() {
  const [featuredHarley, setFeaturedHarley] = useState<Harley | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBike = async () => {
      try {
        const response = await fetch('/api/harleys');
        const data = await response.json();
        const bikes = data.bikes || [];
        // Use first bike as featured, or fallback
        if (bikes.length > 0) {
          setFeaturedHarley(bikes[0]);
        } else {
          // Fallback
          setFeaturedHarley({
            id: '1',
            name: 'Street Glide',
            year: 2020,
            model: 'FLHX',
            price: 18999,
            image: 'https://files.catbox.moe/harley-1.jpg',
            url: 'https://joesusedharleys.com',
          });
        }
      } catch (error) {
        console.error('Failed to fetch featured bike:', error);
        // Fallback
        setFeaturedHarley({
          id: '1',
          name: 'Street Glide',
          year: 2020,
          model: 'FLHX',
          price: 18999,
          image: 'https://files.catbox.moe/harley-1.jpg',
          url: 'https://joesusedharleys.com',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedBike();
  }, []);
  return (
    <section className="relative py-20 px-4 bg-black border-y-2 border-neon-orange/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 text-white" style={{ letterSpacing: '-0.02em' }}>
            GRIME&apos;S <span className="text-neon-orange">GARAGE</span>
          </h2>
          <p className="text-xl text-white/60">Live streams. Latest clips. Featured rides.</p>
        </motion.div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Live Twitch Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1"
          >
            <TwitchEmbed />
          </motion.div>

          {/* Middle: Latest TikTok Clip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1"
          >
            <div className="relative aspect-[9/16] bg-gray-900 border-4 border-neon-orange/50 glitch-container overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://files.catbox.moe/tiktok-latest.jpg)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-neon-orange font-black text-2xl mb-2">
                  $499 ships this bike to you — nationwide
                </div>
                <a
                  href="https://tiktok.com/@suchgrime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-3 bg-neon-orange text-black font-black uppercase hover:bg-neon-cyan transition-colors"
                >
                  Watch on TikTok
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Featured Harley */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-1"
          >
            {isLoading || !featuredHarley ? (
              <div className="relative h-full bg-gray-900 border-4 border-neon-cyan/50 flex items-center justify-center">
                <div className="text-neon-cyan font-black text-xl">Loading featured bike...</div>
              </div>
            ) : (
              <div className="relative h-full bg-gray-900 border-4 border-neon-cyan/50 overflow-hidden group">
                <div className="relative aspect-square">
                  <Image
                    src={featuredHarley.image}
                    alt={`${featuredHarley.year} ${featuredHarley.name}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <div className="text-xl font-black text-white mb-1">
                    {featuredHarley.year} {featuredHarley.name}
                  </div>
                  <div className="text-sm text-neon-orange mb-2">{featuredHarley.model}</div>
                  <div className="text-3xl font-black text-neon-cyan mb-4">
                    ${featuredHarley.price.toLocaleString()}
                  </div>
                  <a
                    href={featuredHarley.url || `sms:4144396211?body=Hey%20Joe%2C%20I%27m%20interested%20in%20the%20${featuredHarley.year}%20${featuredHarley.name}!`}
                    target={featuredHarley.url ? '_blank' : undefined}
                    rel={featuredHarley.url ? 'noopener noreferrer' : undefined}
                    className="block w-full py-4 bg-neon-orange text-black font-black text-lg uppercase text-center hover:bg-neon-cyan transition-colors shadow-[0_0_20px_rgba(255,102,0,0.6)]"
                  >
                    {featuredHarley.url ? 'VIEW ON SITE' : 'TEXT JOE TO BUY'}
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

