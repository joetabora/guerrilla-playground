/**
 * Admin Preview Page - Dev-only route for testing case studies and activity
 * No authentication required (dev environment only)
 */
'use client';

import { useState, useEffect } from 'react';
import { getAllCaseStudies } from '@/lib/case-studies';
import { getAllActivities, formatRelativeTime } from '@/lib/activity';
import type { CaseStudy } from '@/lib/case-studies';
import type { ActivityEvent } from '@/lib/activity';

export default function AdminPreviewPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [caseStudyJson, setCaseStudyJson] = useState('');
  const [activityJson, setActivityJson] = useState('');

  useEffect(() => {
    // Load initial data
    const studies = getAllCaseStudies();
    const acts = getAllActivities();
    setCaseStudies(studies);
    setActivities(acts);
    setCaseStudyJson(JSON.stringify(studies, null, 2));
    setActivityJson(JSON.stringify(acts, null, 2));
  }, []);

  const handleCaseStudySave = () => {
    try {
      const parsed = JSON.parse(caseStudyJson);
      // In a real app, this would save to a database or API
      console.log('Case studies updated:', parsed);
      alert('Case studies updated (console only in demo)');
      setCaseStudies(parsed);
    } catch (error) {
      alert('Invalid JSON: ' + (error as Error).message);
    }
  };

  const handleActivitySave = () => {
    try {
      const parsed = JSON.parse(activityJson);
      // In a real app, this would save to a database or API
      console.log('Activities updated:', parsed);
      alert('Activities updated (console only in demo)');
      setActivities(parsed);
    } catch (error) {
      alert('Invalid JSON: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Admin Preview</h1>
          <p className="text-white/60">Dev-only preview for testing case studies and activity feed</p>
        </div>

        {/* Case Studies Editor */}
        <section className="mb-12 bg-ink border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-4">Case Studies JSON Editor</h2>
          <div className="mb-4">
            <textarea
              value={caseStudyJson}
              onChange={(e) => setCaseStudyJson(e.target.value)}
              className="w-full h-64 p-4 bg-charcoal border border-white/10 rounded-lg text-white font-mono text-sm"
              spellCheck={false}
              aria-label="Case studies JSON editor"
            />
          </div>
          <button
            onClick={handleCaseStudySave}
            className="px-6 py-2 bg-magenta text-white font-bold rounded-lg hover:bg-magenta/90 transition-colors"
          >
            Save Case Studies
          </button>
          <div className="mt-4">
            <p className="text-white/60 text-sm mb-2">Preview ({caseStudies.length} case studies):</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {caseStudies.map((study) => (
                <div key={study.id} className="bg-charcoal border border-white/10 rounded-lg p-4">
                  <h3 className="font-bold text-white text-sm mb-1">{study.title}</h3>
                  <p className="text-white/60 text-xs">{study.brand}</p>
                  <p className="text-white/40 text-xs mt-2">Slug: {study.slug}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activity Feed Editor */}
        <section className="mb-12 bg-ink border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-4">Activity Feed JSON Editor</h2>
          <div className="mb-4">
            <textarea
              value={activityJson}
              onChange={(e) => setActivityJson(e.target.value)}
              className="w-full h-48 p-4 bg-charcoal border border-white/10 rounded-lg text-white font-mono text-sm"
              spellCheck={false}
              aria-label="Activity feed JSON editor"
            />
          </div>
          <button
            onClick={handleActivitySave}
            className="px-6 py-2 bg-lime text-charcoal font-bold rounded-lg hover:bg-lime/90 transition-colors"
          >
            Save Activities
          </button>
          <div className="mt-4">
            <p className="text-white/60 text-sm mb-2">Preview ({activities.length} activities):</p>
            <div className="space-y-2">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-charcoal border border-white/10 rounded-lg p-3 flex items-center gap-3">
                  <span className="text-lg">{activity.icon}</span>
                  <span className="text-white/80 text-sm flex-1">{activity.message}</span>
                  <span className="text-white/40 text-xs">{formatRelativeTime(activity.timestamp)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-ink border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-white mb-4">Instructions</h2>
          <div className="space-y-4 text-white/70 text-sm">
            <div>
              <h3 className="font-bold text-white mb-2">Case Studies</h3>
              <p>Edit the JSON above to add/modify case studies. Each case study needs:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>id, title, brand, description, slug</li>
                <li>thumbnail (image URL)</li>
                <li>metrics array with label, value, change</li>
                <li>content object with challenge, solution, results, creators, highlights</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">Activity Feed</h3>
              <p>Edit the JSON above to add/modify activity events. Each event needs:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>id, type (creator/campaign/achievement), message</li>
                <li>timestamp (ISO format), icon (emoji)</li>
              </ul>
              <p className="mt-2">Use the pushActivity.js script to add new activities programmatically.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

