'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Harley {
  id: string;
  name: string;
  year: number;
  model: string;
  price: number;
  image: string;
  mileage?: number;
  url?: string;
}

export default function JoesHarleysSection() {
  const [inventory, setInventory] = useState<Harley[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch('/api/harleys');
        const data = await response.json();
        setInventory(data.bikes || []);
      } catch (error) {
        console.error('Failed to fetch bikes:', error);
        // Fallback to empty array - component will show loading state
      } finally {
        setIsLoading(false);
      }
    };

    fetchBikes();
    // Refresh every 5 minutes
    const interval = setInterval(fetchBikes, 5 * 60 * 1000);
    return () => clearInterval(interval);
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
            JOE&apos;S <span className="text-neon-orange">USED HARLEYS</span>
          </h2>
          <p className="text-xl text-white/60">Gaming rigs to real rides. We got you.</p>
        </motion.div>

        {/* $499 Shipping Banner */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-neon-orange text-black font-black text-2xl md:text-3xl text-center py-4 mb-8 shadow-[0_0_30px_rgba(255,102,0,0.6)]"
        >
          🚚 $499 SHIPPING ANYWHERE IN THE US
        </motion.div>

        {/* Inventory Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="text-neon-orange font-black text-2xl">Loading bikes from joesusedharleys.com...</div>
          </div>
        ) : inventory.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-white/60 font-black text-xl">No bikes available. Check back soon!</div>
            <a
              href="https://joesusedharleys.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-8 py-3 bg-neon-orange text-black font-black uppercase hover:bg-neon-cyan transition-colors"
            >
              Visit joesusedharleys.com
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {inventory.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-900 border-2 border-neon-orange/30 hover:border-neon-orange transition-all overflow-hidden group"
            >
              <div className="relative aspect-square">
                <Image
                  src={bike.image}
                  alt={`${bike.year} ${bike.name}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <div className="text-xl font-black text-white mb-1">
                  {bike.year} {bike.name}
                </div>
                <div className="text-sm text-neon-orange mb-2">{bike.model}</div>
                {bike.mileage && (
                  <div className="text-sm text-white/60 mb-3">{bike.mileage.toLocaleString()} miles</div>
                )}
                <div className="text-2xl font-black text-neon-cyan">
                  ${bike.price.toLocaleString()}
                </div>
                <a
                  href={bike.url || `sms:4144396211?body=Hey%20Joe%2C%20I%27m%20interested%20in%20the%20${bike.year}%20${bike.name}!`}
                  target={bike.url ? '_blank' : undefined}
                  rel={bike.url ? 'noopener noreferrer' : undefined}
                  className="block w-full mt-4 py-2 bg-neon-orange text-black font-black uppercase hover:bg-neon-cyan transition-colors text-center"
                >
                  {bike.url ? 'View Details' : 'Text Joe'}
                </a>
              </div>
            </motion.div>
            ))}
          </div>
        )}

        {/* Floating Text Joe Button */}
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.a
              href="sms:4144396211?body=Hey%20Joe%2C%20I%27m%20interested%20in%20a%20Harley!"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="block w-20 h-20 bg-neon-orange rounded-full flex items-center justify-center text-black font-black text-2xl shadow-[0_0_30px_rgba(255,102,0,0.8)] hover:bg-neon-cyan hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] transition-all"
              aria-label="Text Joe"
            >
              💬
            </motion.a>
          </motion.div>
      </div>
    </section>
  );
}

