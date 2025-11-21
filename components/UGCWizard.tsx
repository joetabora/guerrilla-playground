/**
 * UGC Intake Wizard - Multi-step form with AI brief generator
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowCard from './GlowCard';
import MotionButton from './MotionButton';

interface WizardData {
  productInfo: string;
  vibe: string[];
  deliverables: string[];
  inspiration: string;
  targetAudience: string;
  keyMessages: string;
}

const VIBE_OPTIONS = [
  { id: 'bold', label: 'Bold & Edgy', icon: '⚡' },
  { id: 'playful', label: 'Playful & Fun', icon: '🎉' },
  { id: 'sophisticated', label: 'Sophisticated', icon: '✨' },
  { id: 'authentic', label: 'Authentic & Real', icon: '💫' },
  { id: 'minimal', label: 'Minimal & Clean', icon: '🎯' },
  { id: 'hype', label: 'High Energy', icon: '🔥' }
];

const DELIVERABLE_OPTIONS = [
  'Video Testimonials',
  'Unboxing Videos',
  'Product Reviews',
  'Tutorial Videos',
  'Behind-the-Scenes',
  'Day-in-the-Life',
  'Comparison Videos',
  'Before & After'
];

export default function UGCWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardData>({
    productInfo: '',
    vibe: [],
    deliverables: [],
    inspiration: '',
    targetAudience: '',
    keyMessages: ''
  });
  const [generatedBrief, setGeneratedBrief] = useState<string>('');

  const totalSteps = 5;

  const handleVibeToggle = (vibeId: string) => {
    setFormData(prev => ({
      ...prev,
      vibe: prev.vibe.includes(vibeId)
        ? prev.vibe.filter(v => v !== vibeId)
        : [...prev.vibe, vibeId]
    }));
  };

  const handleDeliverableToggle = (deliverable: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.includes(deliverable)
        ? prev.deliverables.filter(d => d !== deliverable)
        : [...prev.deliverables, deliverable]
    }));
  };

  const handleGenerateBrief = async () => {
    // Mock AI brief generation
    const brief = `
# Creative Brief: ${formData.productInfo || 'UGC Campaign'}

## Product Information
${formData.productInfo || 'Not specified'}

## Target Audience
${formData.targetAudience || 'Not specified'}

## Desired Vibe
${formData.vibe.length > 0 ? formData.vibe.map(v => VIBE_OPTIONS.find(o => o.id === v)?.label).join(', ') : 'Not specified'}

## Deliverables
${formData.deliverables.length > 0 ? formData.deliverables.join('\n- ') : 'Not specified'}

## Key Messages
${formData.keyMessages || 'Not specified'}

## Inspiration References
${formData.inspiration || 'Not specified'}

## Creative Direction
Based on the provided information, this campaign should focus on ${formData.vibe[0] || 'authentic'} content that resonates with ${formData.targetAudience || 'your target audience'}. The deliverables should emphasize ${formData.deliverables[0] || 'authentic storytelling'} while maintaining a ${formData.vibe.join(' and ') || 'consistent'} brand voice.

## Next Steps
1. Review and approve this brief
2. Creator matching and outreach
3. Content production timeline
4. Review and approval process
5. Distribution strategy
    `;
    setGeneratedBrief(brief);
    setCurrentStep(6);
  };

  const handleExportPDF = () => {
    const element = document.getElementById('ugc-brief');
    if (!element) return;

    // Use html2pdf if available, otherwise alert
    if (typeof window !== 'undefined' && 'html2pdf' in window) {
      const html2pdfLib = (window as { html2pdf?: { (): { from: (el: HTMLElement) => { save: (name: string) => void } } } }).html2pdf;
      if (html2pdfLib) {
        html2pdfLib().from(element).save('ugc-brief.pdf');
      }
    } else {
      alert('PDF export requires html2pdf.js. Please use the download button.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="bg-ink border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/60 text-sm">Step {currentStep} of {totalSteps}</span>
          <span className="text-white/60 text-sm">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-charcoal rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-magenta via-lime to-cyan h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Product Info */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <GlowCard glowColor="magenta" className="p-8">
              <h2 className="text-2xl font-black text-white mb-6">Product Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Product/Service Description *</label>
                  <textarea
                    value={formData.productInfo}
                    onChange={(e) => setFormData({ ...formData, productInfo: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta resize-none"
                    placeholder="Describe your product or service in detail..."
                    required
                  />
                </div>
                <MotionButton
                  variant="primary"
                  className="w-full"
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.productInfo}
                >
                  Next: Choose Vibe
                </MotionButton>
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* Step 2: Vibe */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <GlowCard glowColor="lime" className="p-8">
              <h2 className="text-2xl font-black text-white mb-6">Desired Vibe</h2>
              <p className="text-white/60 text-sm mb-6">Select all that apply</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {VIBE_OPTIONS.map((vibe) => (
                  <button
                    key={vibe.id}
                    onClick={() => handleVibeToggle(vibe.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.vibe.includes(vibe.id)
                        ? 'border-lime bg-lime/20'
                        : 'border-white/10 bg-charcoal hover:border-white/20'
                    }`}
                  >
                    <div className="text-3xl mb-2">{vibe.icon}</div>
                    <div className="text-white font-bold text-sm">{vibe.label}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <MotionButton variant="ghost" onClick={() => setCurrentStep(1)}>
                  Back
                </MotionButton>
                <MotionButton
                  variant="primary"
                  className="flex-1"
                  onClick={() => setCurrentStep(3)}
                >
                  Next: Deliverables
                </MotionButton>
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* Step 3: Deliverables */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <GlowCard glowColor="cyan" className="p-8">
              <h2 className="text-2xl font-black text-white mb-6">Required Deliverables</h2>
              <p className="text-white/60 text-sm mb-6">Select all that apply</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {DELIVERABLE_OPTIONS.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.deliverables.includes(option)
                        ? 'border-cyan bg-cyan/20'
                        : 'border-white/10 bg-charcoal hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.deliverables.includes(option)}
                      onChange={() => handleDeliverableToggle(option)}
                      className="w-4 h-4 text-cyan"
                    />
                    <span className="text-white text-sm">{option}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-4">
                <MotionButton variant="ghost" onClick={() => setCurrentStep(2)}>
                  Back
                </MotionButton>
                <MotionButton
                  variant="primary"
                  className="flex-1"
                  onClick={() => setCurrentStep(4)}
                >
                  Next: Additional Info
                </MotionButton>
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* Step 4: Additional Info */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <GlowCard glowColor="magenta" className="p-8">
              <h2 className="text-2xl font-black text-white mb-6">Additional Information</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Target Audience</label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta"
                    placeholder="Gen Z, ages 18-24, interested in fashion..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Key Messages</label>
                  <textarea
                    value={formData.keyMessages}
                    onChange={(e) => setFormData({ ...formData, keyMessages: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta resize-none"
                    placeholder="Main messages you want to communicate..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white mb-2">Inspiration References</label>
                  <input
                    type="text"
                    value={formData.inspiration}
                    onChange={(e) => setFormData({ ...formData, inspiration: e.target.value })}
                    className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta"
                    placeholder="Links to reference content (mock upload)"
                  />
                  <p className="text-white/40 text-xs mt-2">Note: File upload functionality would be implemented here</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MotionButton variant="ghost" onClick={() => setCurrentStep(3)}>
                  Back
                </MotionButton>
                <MotionButton
                  variant="primary"
                  className="flex-1"
                  onClick={() => setCurrentStep(5)}
                >
                  Next: Generate Brief
                </MotionButton>
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* Step 5: AI Brief Generator */}
        {currentStep === 5 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <GlowCard glowColor="lime" className="p-8">
              <h2 className="text-2xl font-black text-white mb-6">Generate Creative Brief</h2>
              <p className="text-white/60 text-sm mb-6">
                Click the button below to generate your comprehensive creative brief using AI.
              </p>
              <div className="flex gap-4">
                <MotionButton variant="ghost" onClick={() => setCurrentStep(4)}>
                  Back
                </MotionButton>
                <MotionButton
                  variant="primary"
                  className="flex-1"
                  onClick={handleGenerateBrief}
                >
                  Generate Brief (Mock AI)
                </MotionButton>
              </div>
            </GlowCard>
          </motion.div>
        )}

        {/* Step 6: Generated Brief */}
        {currentStep === 6 && generatedBrief && (
          <motion.div
            key="step6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <GlowCard glowColor="cyan" className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-white">Generated Creative Brief</h2>
                <MotionButton variant="secondary" onClick={handleExportPDF}>
                  Export PDF
                </MotionButton>
              </div>
              <div
                id="ugc-brief"
                className="bg-charcoal rounded-lg p-8 border border-white/10 prose prose-invert max-w-none"
              >
                <pre className="text-white/80 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {generatedBrief}
                </pre>
              </div>
            </GlowCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

