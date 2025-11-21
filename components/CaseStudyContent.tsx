/**
 * Case Study Content Component (Client)
 * Displays case study details with cinematic player option
 */
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TiltCard } from './MicroInteractions';
import Sticker from './Sticker';
import CaseStudyPlayer from './CaseStudyPlayer';
import type { CaseStudy } from '@/lib/case-studies';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // Convert metrics to player format with baseline/result
  const playerMetrics = caseStudy.metrics.map((metric) => {
    const value = parseFloat(metric.value.replace(/[^\d.]/g, '')) || 0;
    const change = parseFloat(metric.change?.replace(/[^\d.]/g, '') || '0') || 0;
    const baseline = value - (value * change / 100);
    
    return {
      label: metric.label,
      value: metric.value,
      baseline: Math.max(0, baseline),
      result: value,
      unit: metric.value.includes('$') ? '$' : metric.value.includes('%') ? '%' : ''
    };
  });

  // Mock creative frames (replace with actual frames from case study data)
  const creativeFrames = [
    caseStudy.thumbnail,
    caseStudy.beforeAfter?.before || caseStudy.thumbnail,
    caseStudy.beforeAfter?.after || caseStudy.thumbnail
  ];

  return (
    <>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Back Link */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
            aria-label="Back to case studies"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4">
              <Sticker color="magenta" rotation={-2}>
                {caseStudy.category}
              </Sticker>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">{caseStudy.title}</h1>
            <p className="text-xl text-white/70 mb-6">{caseStudy.description}</p>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span>{caseStudy.brand}</span>
              <span>•</span>
              <span>{new Date(caseStudy.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Play Cinematic CTA */}
          <div className="mb-8 text-center">
            <button
              onClick={() => setIsPlayerOpen(true)}
              className="px-8 py-4 bg-cyan text-charcoal font-bold text-lg uppercase tracking-tight rounded-lg shadow-glow-cyan hover:bg-cyan/90 transition-colors"
              aria-label="Play cinematic case study"
            >
              🎬 Play Cinematic
            </button>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
            <Image
              src={caseStudy.thumbnail}
              alt={caseStudy.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {caseStudy.metrics.map((metric, idx) => (
              <TiltCard
                key={idx}
                className="bg-ink border border-white/10 rounded-lg p-6 text-center"
              >
                <div className="text-3xl font-black text-magenta mb-2">{metric.value}</div>
                <div className="text-white/60 text-xs uppercase tracking-tight mb-1">{metric.label}</div>
                {metric.change && (
                  <div className="text-lime text-xs font-bold">+{metric.change}</div>
                )}
              </TiltCard>
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-12 mb-12">
            <section>
              <h2 className="text-2xl font-black text-white mb-4">The Challenge</h2>
              <p className="text-white/70 leading-relaxed">{caseStudy.content.challenge}</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Our Solution</h2>
              <p className="text-white/70 leading-relaxed">{caseStudy.content.solution}</p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-white mb-4">Results</h2>
              <p className="text-white/70 leading-relaxed mb-6">{caseStudy.content.results}</p>
              <ul className="space-y-2">
                {caseStudy.content.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/70">
                    <span className="text-lime mt-1">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            {caseStudy.content.creators && caseStudy.content.creators.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-white mb-4">Featured Creators</h2>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.content.creators.map((creator, idx) => (
                    <Sticker key={idx} color="cyan" rotation={0}>
                      {creator}
                    </Sticker>
                  ))}
                </div>
              </section>
            )}

            {caseStudy.beforeAfter && (
              <section>
                <h2 className="text-2xl font-black text-white mb-4">Before & After</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white/60 text-sm uppercase mb-2">Before</h3>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={caseStudy.beforeAfter.before}
                        alt="Before"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white/60 text-sm uppercase mb-2">After</h3>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={caseStudy.beforeAfter.after}
                        alt="After"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* CTA */}
          <div className="bg-ink border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-white mb-4">Ready to Create Your Success Story?</h2>
            <p className="text-white/60 mb-6">Let&apos;s talk about your next campaign.</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-magenta text-white font-bold text-lg uppercase tracking-tight rounded-lg shadow-glow-magenta hover:bg-magenta/90 transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>

      {/* Cinematic Player */}
      <CaseStudyPlayer
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        title={caseStudy.title}
        brand={caseStudy.brand}
        metrics={playerMetrics}
        creativeFrames={creativeFrames}
      />
    </>
  );
}

