/**
 * Creative Generator Form Component
 * Multi-field form that generates AI creative concepts
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import ConceptCard from './ConceptCard';

interface Concept {
  hook: string;
  script: string;
  visual: string;
  platform: string;
}

interface FormData {
  campaignName: string;
  productSummary: string;
  targetAudience: string;
  moodTone: string;
  desiredCTA: string;
  creativityLevel: number;
}

export default function CreativeGeneratorForm() {
  const [formData, setFormData] = useState<FormData>({
    campaignName: '',
    productSummary: '',
    targetAudience: '',
    moodTone: 'energetic',
    desiredCTA: 'app-installs',
    creativityLevel: 7
  });
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-concepts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate concepts');
      }

      const data = await response.json();
      setConcepts(data.concepts || []);

      // Confetti on success
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF2D95', '#A6FF00', '#00FFD6', '#FFFFFF']
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToBrief = (concept: Concept) => {
    // Navigate to brief builder with pre-filled data
    const params = new URLSearchParams({
      concept: JSON.stringify(concept),
      campaign: formData.campaignName
    });
    window.location.href = `/brief-builder?${params.toString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-ink border border-white/10 rounded-2xl p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2" htmlFor="campaignName">
              Campaign Name *
            </label>
            <input
              id="campaignName"
              type="text"
              required
              value={formData.campaignName}
              onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
              placeholder="Summer Launch 2024"
              aria-label="Campaign name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2" htmlFor="moodTone">
              Mood/Tone *
            </label>
            <select
              id="moodTone"
              required
              value={formData.moodTone}
              onChange={(e) => setFormData({ ...formData, moodTone: e.target.value })}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
              aria-label="Mood and tone"
            >
              <option value="energetic">Energetic</option>
              <option value="playful">Playful</option>
              <option value="sophisticated">Sophisticated</option>
              <option value="authentic">Authentic</option>
              <option value="bold">Bold</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2" htmlFor="productSummary">
            Product Summary *
          </label>
          <textarea
            id="productSummary"
            required
            value={formData.productSummary}
            onChange={(e) => setFormData({ ...formData, productSummary: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors resize-none"
            placeholder="Brief description of your product or service..."
            aria-label="Product summary"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2" htmlFor="targetAudience">
            Target Audience *
          </label>
          <textarea
            id="targetAudience"
            required
            value={formData.targetAudience}
            onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
            rows={2}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors resize-none"
            placeholder="Gen Z, ages 18-24, interested in fashion..."
            aria-label="Target audience"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2" htmlFor="desiredCTA">
            Desired CTA *
          </label>
          <select
            id="desiredCTA"
            required
            value={formData.desiredCTA}
            onChange={(e) => setFormData({ ...formData, desiredCTA: e.target.value })}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
            aria-label="Desired call to action"
          >
            <option value="app-installs">App Installs</option>
            <option value="signups">Signups</option>
            <option value="purchases">Purchases</option>
            <option value="engagement">Engagement</option>
            <option value="awareness">Brand Awareness</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2" htmlFor="creativityLevel">
            Creativity Level: {formData.creativityLevel}/10
          </label>
          <input
            id="creativityLevel"
            type="range"
            min="1"
            max="10"
            value={formData.creativityLevel}
            onChange={(e) => setFormData({ ...formData, creativityLevel: parseInt(e.target.value) })}
            className="w-full"
            aria-label={`Creativity level: ${formData.creativityLevel} out of 10`}
          />
          <div className="flex justify-between text-xs text-white/60 mt-1">
            <span>Safe</span>
            <span>Wild</span>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full px-8 py-4 bg-magenta text-white font-bold text-lg uppercase tracking-tight rounded-lg shadow-glow-magenta hover:bg-magenta/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Generate creative concepts"
        >
          {isGenerating ? 'Generating Concepts...' : 'Generate Concepts'}
        </button>
      </motion.form>

      {/* Generated Concepts */}
      <AnimatePresence>
        {concepts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-black text-white text-center">
              Generated <span className="text-magenta">Concepts</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {concepts.map((concept, index) => (
                <ConceptCard
                  key={index}
                  concept={concept}
                  index={index}
                  onSaveToBrief={() => handleSaveToBrief(concept)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

