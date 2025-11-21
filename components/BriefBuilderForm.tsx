/**
 * Brief Builder Form - Multi-step form with Framer Motion transitions
 * Steps: Brand Info → Goals → Deliverables → Budget → Timeline
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

interface BriefData {
  // Step 1: Brand Info
  brandName: string;
  contactName: string;
  contactEmail: string;
  website?: string;
  
  // Step 2: Goals
  primaryGoal: string;
  targetAudience: string;
  keyMessages: string;
  
  // Step 3: Deliverables
  deliverables: string[];
  platforms: string[];
  contentTypes: string[];
  
  // Step 4: Budget
  budgetRange: string;
  budgetNotes?: string;
  
  // Step 5: Timeline
  startDate: string;
  endDate: string;
  timelineNotes?: string;
}

const STEPS = [
  { id: 1, title: 'Brand Info', key: 'brand' },
  { id: 2, title: 'Goals', key: 'goals' },
  { id: 3, title: 'Deliverables', key: 'deliverables' },
  { id: 4, title: 'Budget', key: 'budget' },
  { id: 5, title: 'Timeline', key: 'timeline' }
];

export default function BriefBuilderForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState<BriefData>({
    brandName: '',
    contactName: '',
    contactEmail: '',
    website: '',
    primaryGoal: '',
    targetAudience: '',
    keyMessages: '',
    deliverables: [],
    platforms: [],
    contentTypes: [],
    budgetRange: '',
    budgetNotes: '',
    startDate: '',
    endDate: '',
    timelineNotes: ''
  });

  const updateFormData = (field: keyof BriefData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Generate PDF
      await fetch('/api/generate-brief-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      // Save to JSON
      await fetch('/api/save-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      // Send email stub
      await fetch('/api/send-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF2D95', '#A6FF00', '#00FFD6', '#FFFFFF']
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting brief:', error);
      alert('Error submitting brief. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-ink border border-white/10 rounded-2xl p-12 text-center"
      >
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-black text-white mb-4">Brief Created Successfully!</h2>
        <p className="text-white/70 mb-8">
          Your brief has been generated and sent. We&apos;ll be in touch soon.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-8 py-4 bg-magenta text-white font-bold text-lg uppercase tracking-tight rounded-lg shadow-glow-magenta hover:bg-magenta/90 transition-colors"
        >
          Back to Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-ink border border-white/10 rounded-2xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                step.id <= currentStep ? 'bg-magenta' : 'bg-charcoal'
              }`}
              aria-label={`Step ${step.id}: ${step.title}`}
            />
          ))}
        </div>
        <div className="text-center text-white/60 text-sm">
          Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Brand Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white mb-6">Brand Information</h2>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={formData.brandName}
                  onChange={(e) => updateFormData('brandName', e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
                  aria-label="Brand name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
                  aria-label="Contact name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Contact Email *</label>
                <input
                  type="email"
                  required
                  value={formData.contactEmail}
                  onChange={(e) => updateFormData('contactEmail', e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
                  aria-label="Contact email"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
                  placeholder="https://example.com"
                  aria-label="Website URL"
                />
              </div>
            </div>
          )}

          {/* Step 2: Goals */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white mb-6">Campaign Goals</h2>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Primary Goal *</label>
                <textarea
                  required
                  value={formData.primaryGoal}
                  onChange={(e) => updateFormData('primaryGoal', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors resize-none"
                  placeholder="What do you want to achieve with this campaign?"
                  aria-label="Primary goal"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Target Audience *</label>
                <textarea
                  required
                  value={formData.targetAudience}
                  onChange={(e) => updateFormData('targetAudience', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors resize-none"
                  placeholder="Describe your target audience..."
                  aria-label="Target audience"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Key Messages *</label>
                <textarea
                  required
                  value={formData.keyMessages}
                  onChange={(e) => updateFormData('keyMessages', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors resize-none"
                  placeholder="What key messages should creators communicate?"
                  aria-label="Key messages"
                />
              </div>
            </div>
          )}

          {/* Step 3: Deliverables */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white mb-6">Deliverables</h2>
              <div>
                <label className="block text-sm font-bold text-white mb-3">Content Types *</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Video', 'Photo', 'Stories', 'Reels', 'TikTok', 'YouTube'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.contentTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFormData('contentTypes', [...formData.contentTypes, type]);
                          } else {
                            updateFormData('contentTypes', formData.contentTypes.filter(t => t !== type));
                          }
                        }}
                        className="w-4 h-4 text-magenta bg-charcoal border-white/20 rounded focus:ring-magenta"
                        aria-label={`Select ${type}`}
                      />
                      <span className="text-white/80">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-3">Platforms *</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Snapchat'].map((platform) => (
                    <label key={platform} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFormData('platforms', [...formData.platforms, platform]);
                          } else {
                            updateFormData('platforms', formData.platforms.filter(p => p !== platform));
                          }
                        }}
                        className="w-4 h-4 text-magenta bg-charcoal border-white/20 rounded focus:ring-magenta"
                        aria-label={`Select ${platform}`}
                      />
                      <span className="text-white/80">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Additional Deliverables</label>
                <textarea
                  value={formData.deliverables.join(', ')}
                  onChange={(e) => updateFormData('deliverables', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  rows={3}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors resize-none"
                  placeholder="e.g., UGC assets, behind-the-scenes, testimonials"
                  aria-label="Additional deliverables"
                />
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white mb-6">Budget</h2>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Budget Range *</label>
                <select
                  required
                  value={formData.budgetRange}
                  onChange={(e) => updateFormData('budgetRange', e.target.value)}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
                  aria-label="Budget range"
                >
                  <option value="">Select range</option>
                  <option value="5k-10k">$5K - $10K</option>
                  <option value="10k-25k">$10K - $25K</option>
                  <option value="25k-50k">$25K - $50K</option>
                  <option value="50k-100k">$50K - $100K</option>
                  <option value="100k+">$100K+</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Budget Notes</label>
                <textarea
                  value={formData.budgetNotes}
                  onChange={(e) => updateFormData('budgetNotes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors resize-none"
                  placeholder="Any additional budget considerations..."
                  aria-label="Budget notes"
                />
              </div>
            </div>
          )}

          {/* Step 5: Timeline */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white mb-6">Timeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => updateFormData('startDate', e.target.value)}
                    className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
                    aria-label="Start date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">End Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => updateFormData('endDate', e.target.value)}
                    className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
                    aria-label="End date"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Timeline Notes</label>
                <textarea
                  value={formData.timelineNotes}
                  onChange={(e) => updateFormData('timelineNotes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors resize-none"
                  placeholder="Any important timeline considerations..."
                  aria-label="Timeline notes"
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-3 bg-transparent border-2 border-white/20 text-white font-bold rounded-lg hover:border-white/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous step"
        >
          Previous
        </button>
        {currentStep < STEPS.length ? (
          <button
            onClick={nextStep}
            className="px-6 py-3 bg-magenta text-white font-bold rounded-lg shadow-glow-magenta hover:bg-magenta/90 transition-colors"
            aria-label="Next step"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 bg-lime text-charcoal font-bold rounded-lg shadow-glow-lime hover:bg-lime/90 transition-colors disabled:opacity-50"
            aria-label="Submit brief"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Brief'}
          </button>
        )}
      </div>
    </div>
  );
}

