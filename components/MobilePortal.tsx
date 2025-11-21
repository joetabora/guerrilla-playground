/**
 * Mobile Portal Component - PWA optimized
 */
'use client';

import { useState } from 'react';
import GlowCard from './GlowCard';

export default function MobilePortal() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'proposals' | 'analytics'>('campaigns');

  return (
    <div className="min-h-screen py-8 px-4 bg-charcoal">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-black text-white mb-6">Mobile Portal</h1>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['campaigns', 'proposals', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm ${
                activeTab === tab
                  ? 'bg-magenta text-white'
                  : 'bg-ink text-white/60'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <GlowCard glowColor="magenta" className="p-4">
            <h3 className="font-black text-white mb-2">Active Campaigns</h3>
            <p className="text-white/60 text-sm">3 campaigns running</p>
          </GlowCard>
          <GlowCard glowColor="lime" className="p-4">
            <h3 className="font-black text-white mb-2">Pending Proposals</h3>
            <p className="text-white/60 text-sm">2 proposals awaiting approval</p>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}

