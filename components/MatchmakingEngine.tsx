/**
 * Matchmaking Engine - AI-powered creator matching
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowCard from './GlowCard';
import MotionButton from './MotionButton';
import creatorsData from '@/data/creators.json';
import Image from 'next/image';

interface MatchForm {
  brandName: string;
  productDescription: string;
  monthlyBudget: string;
  audienceTarget: string;
  preferredPlatform: string;
}

interface MatchResult {
  creator: typeof creatorsData[0];
  matchScore: number;
  reasoning: string;
}

export default function MatchmakingEngine() {
  const [formData, setFormData] = useState<MatchForm>({
    brandName: '',
    productDescription: '',
    monthlyBudget: '10000',
    audienceTarget: '',
    preferredPlatform: 'all'
  });
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  // Animated particle background
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 255, 214, 0.3)';

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMatch = async () => {
    setIsMatching(true);
    
    // Simulate AI matching (mock)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock AI matching logic
    const creators = creatorsData as typeof creatorsData;
    
    const matched = creators
      .filter(c => {
        if (formData.preferredPlatform !== 'all' && c.platform !== formData.preferredPlatform) return false;
        return true;
      })
      .slice(0, 5)
      .map((creator) => ({
        creator,
        matchScore: 85 + Math.random() * 15,
        reasoning: `Strong alignment with ${formData.audienceTarget || 'your target audience'}. ${creator.niche} niche matches your product. High engagement rate of ${creator.engagementRate} indicates authentic audience connection.`
      }))
      .sort((a, b) => b.matchScore - a.matchScore);

    setMatches(matched);
    setIsMatching(false);
  };

  return (
    <div className="relative">
      <canvas
        ref={particlesRef}
        className="fixed inset-0 -z-10 opacity-30"
        style={{ pointerEvents: 'none' }}
      />
      
      <GlowCard glowColor="cyan" className="p-8 mb-8">
        <h2 className="text-2xl font-black text-white mb-6">Brand Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-white mb-2">Brand Name *</label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan"
              placeholder="Your Brand"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Product Description *</label>
            <textarea
              value={formData.productDescription}
              onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan resize-none"
              placeholder="Describe your product or service..."
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-white mb-2">Monthly Budget ($)</label>
              <input
                type="number"
                value={formData.monthlyBudget}
                onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan"
                min="0"
                step="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-2">Audience Target</label>
              <input
                type="text"
                value={formData.audienceTarget}
                onChange={(e) => setFormData({ ...formData, audienceTarget: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan"
                placeholder="Gen Z, ages 18-24"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-white mb-2">Preferred Platform</label>
              <select
                value={formData.preferredPlatform}
                onChange={(e) => setFormData({ ...formData, preferredPlatform: e.target.value })}
                className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan"
              >
                <option value="all">All Platforms</option>
                <option value="TikTok">TikTok</option>
                <option value="Instagram">Instagram</option>
                <option value="YouTube">YouTube</option>
                <option value="Twitch">Twitch</option>
              </select>
            </div>
          </div>
          <MotionButton
            variant="primary"
            className="w-full"
            onClick={handleMatch}
            disabled={!formData.brandName || !formData.productDescription || isMatching}
          >
            {isMatching ? 'Finding Matches...' : 'Find My Matches'}
          </MotionButton>
        </div>
      </GlowCard>

      <AnimatePresence>
        {matches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black text-white text-center mb-8">
              Your <span className="text-cyan">Perfect Matches</span>
            </h2>
            {matches.map((match, index) => (
              <motion.div
                key={match.creator.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowCard glowColor="cyan" className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative w-24 h-24 rounded-full bg-charcoal border-2 border-cyan overflow-hidden">
                        <Image src={match.creator.avatar} alt={match.creator.name} fill className="object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-black text-white mb-1">{match.creator.name}</h3>
                          <p className="text-cyan text-lg mb-2">{match.creator.handle}</p>
                          <div className="flex flex-wrap gap-3 text-sm text-white/60">
                            <span>{match.creator.niche}</span>
                            <span>•</span>
                            <span>{match.creator.platform}</span>
                            <span>•</span>
                            <span>{match.creator.followers} followers</span>
                            <span>•</span>
                            <span>{match.creator.engagementRate} engagement</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-black text-cyan mb-1">
                            {match.matchScore.toFixed(0)}%
                          </div>
                          <div className="text-white/60 text-xs uppercase">Match</div>
                        </div>
                      </div>
                      <div className="bg-charcoal rounded-lg p-4 mb-4">
                        <p className="text-white/80 text-sm leading-relaxed">{match.reasoning}</p>
                      </div>
                      <MotionButton
                        variant="secondary"
                        onClick={() => window.location.href = `/contact?match=${match.creator.id}`}
                      >
                        Request Detailed Campaign Proposal
                      </MotionButton>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

