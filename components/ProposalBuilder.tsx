/**
 * Proposal Builder - Real-time preview and PDF generation
 */
'use client';

import { useState } from 'react';
import GlowCard from './GlowCard';
import MotionButton from './MotionButton';
import NeonDivider from './NeonDivider';

interface ProposalData {
  brandName: string;
  campaignGoals: string;
  budget: string;
  deliverables: string[];
  tone: string;
}

export default function ProposalBuilder() {
  const [formData, setFormData] = useState<ProposalData>({
    brandName: '',
    campaignGoals: '',
    budget: '',
    deliverables: [],
    tone: 'bold'
  });

  const deliverableOptions = [
    'UGC Content',
    'Influencer Partnerships',
    'Social Media Posts',
    'Video Content',
    'Blog Posts',
    'Email Campaigns',
    'Event Coverage',
    'Product Reviews'
  ];

  const handleDeliverableToggle = (deliverable: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.includes(deliverable)
        ? prev.deliverables.filter(d => d !== deliverable)
        : [...prev.deliverables, deliverable]
    }));
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('proposal-preview');
    if (!element) return;

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const opt = {
        margin: [20, 20, 20, 20] as [number, number, number, number],
        filename: `proposal-${formData.brandName || 'campaign'}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF generation failed. Please try again.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form */}
      <GlowCard glowColor="magenta" className="p-8">
        <h2 className="text-2xl font-black text-white mb-6">Campaign Details</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-white mb-2">Brand Name *</label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta"
              placeholder="Your Brand"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Campaign Goals *</label>
            <textarea
              value={formData.campaignGoals}
              onChange={(e) => setFormData({ ...formData, campaignGoals: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta resize-none"
              placeholder="Describe your campaign objectives..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Budget *</label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta"
              placeholder="$50,000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Tone *</label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta"
            >
              <option value="bold">Bold</option>
              <option value="friendly">Friendly</option>
              <option value="luxury">Luxury</option>
              <option value="hype">Hype</option>
              <option value="minimal">Minimal</option>
              <option value="authentic">Authentic</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Deliverables</label>
            <div className="grid grid-cols-2 gap-2">
              {deliverableOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 p-3 bg-charcoal border border-white/10 rounded-lg cursor-pointer hover:border-magenta transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.deliverables.includes(option)}
                    onChange={() => handleDeliverableToggle(option)}
                    className="w-4 h-4 text-magenta focus:ring-magenta"
                  />
                  <span className="text-white text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </GlowCard>

      {/* Preview */}
      <div className="sticky top-20">
        <GlowCard glowColor="cyan" className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white">Live Preview</h2>
            <MotionButton
              variant="secondary"
              onClick={handleDownloadPDF}
              disabled={!formData.brandName || !formData.campaignGoals}
            >
              Download PDF
            </MotionButton>
          </div>

          <div
            id="proposal-preview"
            className="bg-gradient-to-br from-charcoal to-ink p-8 rounded-lg border border-white/10"
            style={{ minHeight: '600px' }}
          >
            <div className="text-center mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-magenta via-lime to-cyan mx-auto mb-4" />
              <h1 className="text-4xl font-black text-white mb-2">
                Campaign Proposal
              </h1>
              <p className="text-white/60 text-lg">{formData.brandName || 'Your Brand'}</p>
            </div>

            <NeonDivider color="magenta" className="my-8" />

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-black text-white mb-3">Campaign Goals</h2>
                <p className="text-white/80 leading-relaxed">
                  {formData.campaignGoals || 'Enter your campaign goals to see preview...'}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-white mb-3">Budget</h2>
                <p className="text-3xl font-black text-magenta">
                  {formData.budget || '$0'}
                </p>
              </section>

              {formData.deliverables.length > 0 && (
                <section>
                  <h2 className="text-2xl font-black text-white mb-3">Deliverables</h2>
                  <ul className="space-y-2">
                    {formData.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-white/80">
                        <span className="text-lime">✓</span>
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="text-2xl font-black text-white mb-3">Tone & Style</h2>
                <p className="text-white/80 capitalize">{formData.tone}</p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-white/60 text-sm mb-2">Generated by</p>
                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-magenta via-lime to-cyan">
                  Guerrilla Social Club
                </p>
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}

