/**
 * Admin Console Page
 * Enhanced admin interface for seeding data and viewing JSON files
 */
'use client';

import { useState, useEffect } from 'react';
import { getAllCaseStudies } from '@/lib/case-studies';

export default function AdminConsolePage() {
  const [conceptsJson, setConceptsJson] = useState('');
  const [mentionsJson, setMentionsJson] = useState('');
  const [caseStudies, setCaseStudies] = useState<ReturnType<typeof getAllCaseStudies>>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Load concepts
    try {
      const conceptsRes = await fetch('/api/get-concepts');
      if (conceptsRes.ok) {
        const conceptsData = await conceptsRes.json();
        setConceptsJson(JSON.stringify(conceptsData.concepts || [], null, 2));
      }
    } catch (error) {
      console.error('Error loading concepts:', error);
    }

    // Load mentions
    try {
      const mentionsRes = await fetch('/api/get-mentions');
      if (mentionsRes.ok) {
        const mentionsData = await mentionsRes.json();
        setMentionsJson(JSON.stringify(mentionsData.mentions || [], null, 2));
      }
    } catch (error) {
      console.error('Error loading mentions:', error);
    }

    // Load case studies
    setCaseStudies(getAllCaseStudies());
  };

  const handleSeedConcepts = async () => {
    try {
      const response = await fetch('/api/seed-concepts', { method: 'POST' });
      if (response.ok) {
        alert('Concepts seeded successfully!');
        loadData();
      }
    } catch (error) {
      console.error('Error seeding concepts:', error);
    }
  };

  const handleSeedMentions = async () => {
    try {
      const response = await fetch('/api/seed-mentions', { method: 'POST' });
      if (response.ok) {
        alert('Mentions seeded successfully!');
        loadData();
      }
    } catch (error) {
      console.error('Error seeding mentions:', error);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Admin Console</h1>
          <p className="text-white/60">Manage data, seed content, and view JSON files</p>
        </div>

        {/* Seed Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-ink border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-black text-white mb-4">Seed Creative Concepts</h3>
            <p className="text-white/60 text-sm mb-4">Add example creative concepts with sample prompts</p>
            <button
              onClick={handleSeedConcepts}
              className="w-full px-4 py-2 bg-magenta text-white font-bold rounded-lg hover:bg-magenta/90 transition-colors"
            >
              Seed Concepts
            </button>
          </div>

          <div className="bg-ink border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-black text-white mb-4">Seed Social Mentions</h3>
            <p className="text-white/60 text-sm mb-4">Add realistic test mentions across platforms</p>
            <button
              onClick={handleSeedMentions}
              className="w-full px-4 py-2 bg-lime text-charcoal font-bold rounded-lg hover:bg-lime/90 transition-colors"
            >
              Seed Mentions
            </button>
          </div>

          <div className="bg-ink border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-black text-white mb-4">View Data</h3>
            <p className="text-white/60 text-sm mb-4">View all saved JSON data files</p>
            <div className="space-y-2">
              <a
                href="/admin/preview"
                className="block w-full px-4 py-2 bg-cyan text-charcoal font-bold rounded-lg hover:bg-cyan/90 transition-colors text-center"
              >
                View All Data
              </a>
            </div>
          </div>
        </div>

        {/* Concepts JSON Viewer */}
        <section className="mb-12 bg-ink border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-4">Creative Concepts JSON</h2>
          <div className="mb-4">
            <textarea
              value={conceptsJson}
              onChange={(e) => setConceptsJson(e.target.value)}
              className="w-full h-64 p-4 bg-charcoal border border-white/10 rounded-lg text-white font-mono text-sm"
              spellCheck={false}
              readOnly
            />
          </div>
          <p className="text-white/60 text-sm">
            Total concepts: {JSON.parse(conceptsJson || '[]').length}
          </p>
        </section>

        {/* Mentions JSON Viewer */}
        <section className="mb-12 bg-ink border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-4">Social Mentions JSON</h2>
          <div className="mb-4">
            <textarea
              value={mentionsJson}
              onChange={(e) => setMentionsJson(e.target.value)}
              className="w-full h-64 p-4 bg-charcoal border border-white/10 rounded-lg text-white font-mono text-sm"
              spellCheck={false}
              readOnly
            />
          </div>
          <p className="text-white/60 text-sm">
            Total mentions: {JSON.parse(mentionsJson || '[]').length}
          </p>
        </section>

        {/* Case Studies Summary */}
        <section className="bg-ink border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-4">Case Studies Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-charcoal border border-white/10 rounded-lg p-4">
                <h3 className="font-bold text-white text-sm mb-1">{study.title}</h3>
                <p className="text-white/60 text-xs">{study.brand}</p>
                <p className="text-white/40 text-xs mt-2">Slug: {study.slug}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

