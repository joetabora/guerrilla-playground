/**
 * Concept Card Component
 * Displays a generated creative concept with animated reveal
 */
'use client';

import { motion } from 'framer-motion';
import Sticker from './Sticker';

interface Concept {
  hook: string;
  script: string;
  visual: string;
  platform: string;
}

interface ConceptCardProps {
  concept: Concept;
  index: number;
  onSaveToBrief: () => void;
}

export default function ConceptCard({ concept, index, onSaveToBrief }: ConceptCardProps) {
  const handleExportPDF = async () => {
    try {
      const response = await fetch('/api/export-concept-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(concept)
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `concept-${index + 1}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF');
    }
  };

  const platformColors: { [key: string]: 'magenta' | 'lime' | 'cyan' } = {
    'TikTok': 'magenta',
    'Reels': 'lime',
    'YouTube Shorts': 'cyan'
  };

  const platformColor = platformColors[concept.platform] || 'magenta';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="bg-ink border border-white/10 rounded-2xl p-6 hover:border-magenta transition-colors"
    >
      <div className="mb-4">
        <Sticker color={platformColor} rotation={-2}>
          {concept.platform}
        </Sticker>
      </div>

      <h3 className="text-xl font-black text-white mb-3">{concept.hook}</h3>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-sm font-bold text-white/60 mb-1 uppercase tracking-tight">Script</h4>
          <p className="text-white/80 text-sm leading-relaxed">{concept.script}</p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white/60 mb-1 uppercase tracking-tight">Visual Direction</h4>
          <p className="text-white/80 text-sm leading-relaxed">{concept.visual}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSaveToBrief}
          className="flex-1 px-4 py-2 bg-magenta text-white font-bold text-sm uppercase tracking-tight rounded-lg hover:bg-magenta/90 transition-colors"
          aria-label={`Save concept ${index + 1} to brief`}
        >
          Save to Brief
        </button>
        <button
          onClick={handleExportPDF}
          className="flex-1 px-4 py-2 bg-transparent border-2 border-lime text-lime font-bold text-sm uppercase tracking-tight rounded-lg hover:bg-lime hover:text-charcoal transition-colors"
          aria-label={`Export concept ${index + 1} as PDF`}
        >
          Export PDF
        </button>
      </div>
    </motion.div>
  );
}

