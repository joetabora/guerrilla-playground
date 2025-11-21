/**
 * Case Study Player Component
 * Full-screen animated player with metric counters and swipeable frames
 */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';

interface Metric {
  label: string;
  value: string;
  baseline: number;
  result: number;
  unit?: string;
}

interface CaseStudyPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  brand: string;
  metrics: Metric[];
  creativeFrames?: string[];
}

export default function CaseStudyPlayer({
  isOpen,
  onClose,
  title,
  brand,
  metrics,
  creativeFrames = []
}: CaseStudyPlayerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [animatedMetrics, setAnimatedMetrics] = useState<{ [key: string]: number }>({});
  const dragX = useMotionValue(0);
  const x = useTransform(dragX, [-200, 200], [-200, 200]);

  // Initialize animated metrics with baseline values
  useEffect(() => {
    if (isOpen) {
      const initial: { [key: string]: number } = {};
      metrics.forEach((metric) => {
        initial[metric.label] = metric.baseline;
      });
      setAnimatedMetrics(initial);

      // Animate to result values
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      metrics.forEach((metric) => {
        const diff = metric.result - metric.baseline;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          const progress = step / steps;
          const current = metric.baseline + diff * progress;
          setAnimatedMetrics((prev) => ({
            ...prev,
            [metric.label]: Math.round(current)
          }));

          if (step >= steps) {
            clearInterval(timer);
          }
        }, interval);
      });
    }
  }, [isOpen, metrics]);

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 100 && currentFrame > 0) {
      setCurrentFrame(currentFrame - 1);
    } else if (info.offset.x < -100 && currentFrame < creativeFrames.length - 1) {
      setCurrentFrame(currentFrame + 1);
    }
    dragX.set(0);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      >
        <div className="relative w-full h-full flex flex-col">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close player"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="p-8 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-2">{title}</h2>
            <p className="text-white/60 text-lg">{brand}</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-ink border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-black text-magenta mb-2">
                  {animatedMetrics[metric.label] || metric.baseline}
                  {metric.unit || ''}
                </div>
                <div className="text-white/60 text-xs uppercase tracking-tight mb-1">
                  {metric.label}
                </div>
                <div className="text-lime text-xs font-bold">
                  +{metric.result - metric.baseline}{metric.unit || ''}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Creative Frames */}
          {creativeFrames.length > 0 && (
            <div className="flex-1 relative overflow-hidden">
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                style={{ x }}
                className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFrame}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-4xl aspect-video mx-auto"
                  >
                    <Image
                      src={creativeFrames[currentFrame] || '/images/placeholder.jpg'}
                      alt={`Creative frame ${currentFrame + 1}`}
                      fill
                      className="object-contain rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Frame Indicators */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                {creativeFrames.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFrame(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentFrame ? 'bg-magenta w-8' : 'bg-white/30'
                    }`}
                    aria-label={`Go to frame ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Auto-generate Intro Frame Button */}
          <div className="p-8 text-center">
            <button
              onClick={() => {
                // Mock: Add generated intro frame
                console.log('Generating animated intro frame...');
                alert('Intro frame generation would happen here (mock behavior)');
              }}
              className="px-6 py-3 bg-cyan text-charcoal font-bold rounded-lg hover:bg-cyan/90 transition-colors"
            >
              Generate Animated Intro
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

