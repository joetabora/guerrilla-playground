/**
 * Interactive Creator Card Component
 * Flips on hover or tap to show front (stats) and back (video preview)
 */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface CreatorCardProps {
  id: string;
  handle: string;
  avatar: string;
  niche: string;
  stat: string;
  statLabel: string;
  videoPreview?: string;
  profileUrl?: string;
  bookUrl?: string;
}

export default function CreatorCard({
  handle,
  avatar,
  niche,
  stat,
  statLabel,
  videoPreview,
  profileUrl = '/creators',
  bookUrl = '/contact'
}: CreatorCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full aspect-[3/4] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label={`Creator card for ${handle}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden bg-ink border border-white/10 rounded-2xl overflow-hidden"
          style={{ transform: 'rotateY(0deg)' }}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Avatar */}
            <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-magenta">
              <Image
                src={avatar}
                alt={handle}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            {/* Handle */}
            <h3 className="text-xl font-black text-white text-center mb-2">@{handle}</h3>

            {/* Niche */}
            <div className="text-center mb-4">
              <span className="inline-block px-3 py-1 bg-magenta/20 text-magenta text-xs font-bold uppercase rounded-full">
                {niche}
              </span>
            </div>

            {/* Stat */}
            <div className="mt-auto text-center">
              <div className="text-3xl font-black text-lime mb-1">{stat}</div>
              <div className="text-white/60 text-xs uppercase tracking-tight">{statLabel}</div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden bg-ink border border-white/10 rounded-2xl overflow-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="relative h-full flex flex-col">
            {/* Video Preview */}
            {videoPreview ? (
              <div className="relative flex-1 min-h-0">
                <video
                  src={videoPreview}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onMouseEnter={(e) => {
                    const video = e.currentTarget;
                    video.pause();
                  }}
                  onMouseLeave={(e) => {
                    const video = e.currentTarget;
                    video.play();
                  }}
                  aria-label={`Video preview for ${handle}`}
                />
              </div>
            ) : (
              <div className="flex-1 bg-charcoal flex items-center justify-center">
                <div className="text-white/40 text-sm">No preview available</div>
              </div>
            )}

            {/* CTAs */}
            <div className="p-4 space-y-2">
              <Link
                href={profileUrl}
                className="block w-full px-4 py-2 bg-magenta text-white font-bold text-sm uppercase tracking-tight rounded-lg hover:bg-magenta/90 transition-colors text-center"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${handle} profile`}
              >
                See Profile
              </Link>
              <Link
                href={bookUrl}
                className="block w-full px-4 py-2 bg-transparent border-2 border-lime text-lime font-bold text-sm uppercase tracking-tight rounded-lg hover:bg-lime hover:text-charcoal transition-colors text-center"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Book ${handle}`}
              >
                Book
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

