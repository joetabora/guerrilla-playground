/**
 * CreatorSignupForm - creator signup form with confetti on success
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import Sticker from './Sticker';

export default function CreatorSignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    platform: '',
    followers: '',
    niche: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const confettiTriggered = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus('success');
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      handle: '',
      platform: '',
      followers: '',
      niche: ''
    });
  };

  // Trigger confetti on success
  useEffect(() => {
    if (status === 'success' && !confettiTriggered.current) {
      confettiTriggered.current = true;
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF2D95', '#A6FF00', '#00FFD6', '#FFFFFF']
      });
      setTimeout(() => {
        confettiTriggered.current = false;
      }, 3000);
    }
  }, [status]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto bg-ink border border-white/10 rounded-2xl p-8 space-y-6"
      aria-label="Creator signup form"
    >
      <div>
        <h2 className="text-3xl font-black text-white mb-2">Join the Squad</h2>
        <p className="text-white/60 text-sm">Sign up to get matched with brands and unlock exclusive opportunities.</p>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="creator-name" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Full Name *
        </label>
        <input
          id="creator-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-lime transition-colors"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="creator-email" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Email *
        </label>
        <input
          id="creator-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-lime transition-colors"
          placeholder="you@example.com"
        />
      </div>

      {/* Handle */}
      <div>
        <label htmlFor="creator-handle" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Social Handle *
        </label>
        <input
          id="creator-handle"
          type="text"
          required
          value={formData.handle}
          onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-lime transition-colors"
          placeholder="@yourhandle"
        />
      </div>

      {/* Platform */}
      <div>
        <label htmlFor="creator-platform" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Primary Platform *
        </label>
        <select
          id="creator-platform"
          required
          value={formData.platform}
          onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-lime transition-colors"
        >
          <option value="">Select platform</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
          <option value="twitter">Twitter</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Followers */}
      <div>
        <label htmlFor="creator-followers" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Follower Count *
        </label>
        <input
          id="creator-followers"
          type="text"
          required
          value={formData.followers}
          onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-lime transition-colors"
          placeholder="e.g., 50K, 1M"
        />
      </div>

      {/* Niche */}
      <div>
        <label htmlFor="creator-niche" className="block text-sm font-bold text-white mb-2 uppercase tracking-tight">
          Content Niche *
        </label>
        <input
          id="creator-niche"
          type="text"
          required
          value={formData.niche}
          onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
          className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-lime transition-colors"
          placeholder="e.g., Fashion, Tech, Lifestyle"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-lime text-charcoal font-bold text-lg uppercase tracking-tight rounded-lg shadow-glow-lime hover:bg-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? 'Submitting...' : 'Join Now'}
      </motion.button>

      {/* Success Message */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-lg bg-lime/20 border border-lime text-lime"
            role="status"
          >
            <div className="flex items-center gap-2">
              <Sticker color="lime" rotation={0}>Success!</Sticker>
              <p className="font-bold text-sm">Welcome to the squad! We&apos;ll be in touch soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

