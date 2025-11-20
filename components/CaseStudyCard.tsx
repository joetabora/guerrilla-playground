/**
 * CaseStudyCard - immersive case study cards with metric overlays
 * Shows before/after creative slides with animated metrics
 */
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { TiltCard } from './MicroInteractions';
import Sticker from './Sticker';

interface Metric {
  label: string;
  value: string;
  change?: string;
}

interface CaseStudy {
  id: string;
  title: string;
  brand: string;
  description: string;
  thumbnail: string;
  metrics: Metric[];
  beforeAfter?: {
    before: string;
    after: string;
  };
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export default function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group"
    >
      <TiltCard className="bg-ink border border-white/10 rounded-2xl overflow-hidden">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={showAfter && caseStudy.beforeAfter ? caseStudy.beforeAfter.after : caseStudy.thumbnail}
            alt={caseStudy.title}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {caseStudy.beforeAfter && (
            <button
              onClick={() => setShowAfter(!showAfter)}
              className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold uppercase rounded-lg hover:bg-black/80 transition-colors"
              aria-label="Toggle before/after"
            >
              {showAfter ? 'Before' : 'After'}
            </button>
          )}
          <div className="absolute top-4 left-4">
            <Sticker color="magenta" rotation={-3}>
              {caseStudy.brand}
            </Sticker>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-2xl font-black text-white mb-2">{caseStudy.title}</h3>
          <p className="text-white/70 text-sm mb-6">{caseStudy.description}</p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {caseStudy.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="bg-charcoal/50 rounded-lg p-4 border border-white/5"
              >
                <div className="text-2xl font-black text-magenta mb-1">{metric.value}</div>
                <div className="text-white/60 text-xs uppercase tracking-tight">{metric.label}</div>
                {metric.change && (
                  <div className="text-lime text-xs mt-1 font-bold">+{metric.change}</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href={`/work/${caseStudy.id}`}
            className="inline-block px-4 py-2 bg-magenta text-white font-bold text-sm uppercase tracking-tight rounded-lg hover:bg-magenta/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Case Study
          </motion.a>
        </div>
      </TiltCard>
    </motion.div>
  );
}

