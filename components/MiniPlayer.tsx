/**
 * MiniPlayer - Sticky bottom-left video player
 * Autoplays muted, pauses on hover
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MiniPlayerProps {
  reel: {
    id: string;
    thumbnail: string;
    title: string;
    brand: string;
    videoUrl?: string;
    views?: string;
    engagement?: string;
  } | null;
  onClose: () => void;
}

export default function MiniPlayer({ reel, onClose }: MiniPlayerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered || isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isHovered, isPaused]);

  if (!reel) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -100, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-6 z-50 w-64 md:w-80"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="dialog"
        aria-label={`Playing ${reel.title}`}
      >
        <div className="bg-ink border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Video/Thumbnail */}
          <div className="relative aspect-[9/16] bg-charcoal">
            {reel.videoUrl ? (
              <video
                ref={videoRef}
                src={reel.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                aria-label={`Video: ${reel.title}`}
              />
            ) : (
              <Image
                src={reel.thumbnail}
                alt={reel.title}
                fill
                className="object-cover"
                sizes="320px"
              />
            )}
            {/* Pause overlay */}
            {(isHovered || isPaused) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-sm truncate">{reel.title}</h4>
                <p className="text-white/60 text-xs truncate">{reel.brand}</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1 text-white/60 hover:text-white transition-colors"
                aria-label="Close player"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {(reel.views || reel.engagement) && (
              <div className="flex gap-3 text-xs text-white/40">
                {reel.views && <span>👁 {reel.views}</span>}
                {reel.engagement && <span>❤️ {reel.engagement}</span>}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

