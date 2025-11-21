/**
 * Social Mentions Visualization Component
 * Particle/timeline visualization with platform filters
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Mention {
  id: string;
  platform: 'TikTok' | 'Instagram' | 'Twitter';
  text: string;
  author: string;
  timestamp: string;
  engagement?: number;
  url?: string;
}

const PLATFORM_COLORS = {
  TikTok: '#FF2D95',
  Instagram: '#A6FF00',
  Twitter: '#00FFD6'
};

export default function SocialMentionsViz() {
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [filteredPlatform, setFilteredPlatform] = useState<'all' | 'TikTok' | 'Instagram' | 'Twitter'>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load mentions from JSON
  useEffect(() => {
    loadMentions();
    
    // Poll for new mentions every 5 seconds
    const interval = setInterval(loadMentions, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMentions = async () => {
    try {
      const response = await fetch('/api/get-mentions');
      if (response.ok) {
        const data = await response.json();
        setMentions(data.mentions || []);
      }
    } catch (error) {
      console.error('Error loading mentions:', error);
    }
  };

  const handleSeed = async () => {
    try {
      await fetch('/api/seed-mentions', { method: 'POST' });
      loadMentions();
    } catch (error) {
      console.error('Error seeding mentions:', error);
    }
  };

  const filteredMentions = filteredPlatform === 'all'
    ? mentions
    : mentions.filter(m => m.platform === filteredPlatform);

  // Draw timeline visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = 400;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw timeline
    const timelineY = canvas.height / 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, timelineY);
    ctx.lineTo(canvas.width, timelineY);
    ctx.stroke();

    // Draw mentions as particles
    filteredMentions.forEach((mention, index) => {
      const x = (index / Math.max(filteredMentions.length - 1, 1)) * canvas.width;
      const y = timelineY + (Math.sin(index) * 100);
      const color = PLATFORM_COLORS[mention.platform];

      // Draw particle
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [filteredMentions]);

  return (
    <div className="bg-ink border border-white/10 rounded-2xl p-8">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex gap-2">
          {(['all', 'TikTok', 'Instagram', 'Twitter'] as const).map((platform) => (
            <button
              key={platform}
              onClick={() => setFilteredPlatform(platform)}
              className={`px-4 py-2 font-bold rounded-lg transition-all ${
                filteredPlatform === platform
                  ? `bg-${platform === 'TikTok' ? 'magenta' : platform === 'Instagram' ? 'lime' : 'cyan'} text-${platform === 'Instagram' || platform === 'Twitter' ? 'charcoal' : 'white'}`
                  : 'bg-charcoal text-white/60 hover:text-white border border-white/10'
              }`}
              aria-label={`Filter by ${platform}`}
            >
              {platform === 'all' ? 'All' : platform}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-magenta text-white font-bold rounded-lg hover:bg-magenta/90 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <label className="flex items-center gap-2 text-white/60 text-sm">
            Speed:
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              className="w-24"
              aria-label="Playback speed"
            />
            <span className="w-8">{playbackSpeed}x</span>
          </label>
          <button
            onClick={handleSeed}
            className="px-4 py-2 bg-lime text-charcoal font-bold rounded-lg hover:bg-lime/90 transition-colors"
            aria-label="Seed test mentions"
          >
            Seed
          </button>
        </div>
      </div>

      {/* Canvas Visualization */}
      <div className="mb-8">
        <canvas
          ref={canvasRef}
          className="w-full h-96 bg-charcoal rounded-lg"
          style={{ maxHeight: '400px' }}
          aria-label="Social mentions timeline visualization"
        />
      </div>

      {/* Mentions List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredMentions.map((mention) => (
            <motion.div
              key={mention.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-charcoal border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: PLATFORM_COLORS[mention.platform] }}
                      aria-label={mention.platform}
                    />
                    <span className="text-white/60 text-xs font-bold uppercase">
                      {mention.platform}
                    </span>
                    <span className="text-white/40 text-xs">
                      {new Date(mention.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-1">{mention.text}</p>
                  <p className="text-white/60 text-xs">@{mention.author}</p>
                  {mention.engagement && (
                    <p className="text-white/40 text-xs mt-1">
                      {mention.engagement} engagements
                    </p>
                  )}
                </div>
                {mention.url && (
                  <a
                    href={mention.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-magenta/20 text-magenta text-xs font-bold rounded hover:bg-magenta/30 transition-colors"
                    aria-label={`View ${mention.platform} mention`}
                  >
                    View
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredMentions.length === 0 && (
        <div className="text-center py-12 text-white/60">
          <p>No mentions yet. Click &quot;Seed&quot; to add test mentions.</p>
        </div>
      )}
    </div>
  );
}

