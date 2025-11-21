/**
 * Verification Form Component
 * Handles ID upload, content links, and verification status
 */
'use client';

import { useState } from 'react';
import GlowCard from './GlowCard';
import MotionButton from './MotionButton';

interface VerificationData {
  handle: string;
  platform: string;
  idDocument?: File;
  contentLinks: string[];
  status: 'pending' | 'approved' | 'rejected';
}

export default function VerificationForm() {
  const [formData, setFormData] = useState<VerificationData>({
    handle: '',
    platform: 'TikTok',
    contentLinks: [''],
    status: 'pending'
  });
  const [idFile, setIdFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAddLink = () => {
    setFormData({
      ...formData,
      contentLinks: [...formData.contentLinks, '']
    });
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.contentLinks];
    newLinks[index] = value;
    setFormData({ ...formData, contentLinks: newLinks });
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = formData.contentLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, contentLinks: newLinks });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, validate file type and size
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setIdFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock auto-check: compare handle similarity
      const suspicious = formData.handle.length < 3 || formData.handle.includes('test');
      
      const verificationData = {
        id: `verify-${Date.now()}`,
        handle: formData.handle,
        platform: formData.platform,
        contentLinks: formData.contentLinks.filter(link => link.trim()),
        status: suspicious ? 'pending' : 'pending',
        suspicious: suspicious,
        submittedAt: new Date().toISOString(),
        reviewedBy: null,
        reviewedAt: null
      };

      // Save to JSON (in production, upload file to S3/storage)
      const response = await fetch('/api/save-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verificationData)
      });

      if (response.ok) {
        // In production, upload file to storage service
        if (idFile) {
          console.log('File would be uploaded to:', `/data/uploads/${idFile.name}`);
        }
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting verification:', error);
      alert('Failed to submit verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <GlowCard glowColor="lime" className="p-8 text-center">
        <div className="text-6xl mb-4">✓</div>
        <h2 className="text-3xl font-black text-white mb-4">Verification Submitted</h2>
        <p className="text-white/60 mb-6">
          Your verification request has been submitted. Our team will review it within 24-48 hours.
        </p>
        <MotionButton variant="primary" onClick={() => window.location.href = '/'}>
          Return Home
        </MotionButton>
      </GlowCard>
    );
  }

  return (
    <GlowCard glowColor="cyan" className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-white mb-2">Creator Handle *</label>
          <input
            type="text"
            value={formData.handle}
            onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan"
            placeholder="@yourhandle"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2">Platform *</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan"
            required
          >
            <option value="TikTok">TikTok</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="Twitter">Twitter</option>
            <option value="Twitch">Twitch</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2">ID Document *</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan"
            required
          />
          <p className="text-white/40 text-xs mt-2">Upload a government-issued ID (max 5MB)</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2">Sample Content Links *</label>
          {formData.contentLinks.map((link, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                className="flex-1 px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan"
                placeholder="https://..."
                required
              />
              {formData.contentLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="px-4 py-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLink}
            className="mt-2 text-cyan text-sm font-bold hover:text-cyan/80 transition-colors"
          >
            + Add Another Link
          </button>
        </div>

        <MotionButton
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Verification'}
        </MotionButton>
      </form>
    </GlowCard>
  );
}

