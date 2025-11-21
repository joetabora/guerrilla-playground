/**
 * Client Portal - Mock auth with localStorage and dashboard
 */
'use client';

import { useState, useEffect } from 'react';
import GlowCard from './GlowCard';
import MotionButton from './MotionButton';

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('portal_auth');
    if (stored) {
      setIsAuthenticated(true);
      setUserEmail(stored);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem('portal_auth', email);
      setIsAuthenticated(true);
      setUserEmail(email);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portal_auth');
    setIsAuthenticated(false);
    setUserEmail('');
    setEmail('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlowCard glowColor="cyan" className="p-8 max-w-md w-full">
          <h1 className="text-3xl font-black text-white mb-6 text-center">Client Portal</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan"
                placeholder="your@email.com"
                required
              />
            </div>
            <MotionButton variant="primary" type="submit" className="w-full">
              Sign In (Mock)
            </MotionButton>
          </form>
          <p className="text-white/40 text-xs text-center mt-4">
            This is a mock login. Any email will work.
          </p>
        </GlowCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Dashboard</h1>
            <p className="text-white/60">Welcome back, {userEmail}</p>
          </div>
          <MotionButton variant="ghost" onClick={handleLogout}>
            Logout
          </MotionButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Active Campaigns', value: '3', color: 'magenta' },
            { label: 'Pending Proposals', value: '2', color: 'lime' },
            { label: 'Creator Partners', value: '15', color: 'cyan' }
          ].map((stat, idx) => (
            <GlowCard key={idx} glowColor={stat.color as 'magenta' | 'lime' | 'cyan'}>
              <div className="text-center">
                <div className={`text-4xl font-black text-${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-white/60 text-sm uppercase tracking-tight">{stat.label}</div>
              </div>
            </GlowCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Proposals */}
          <GlowCard glowColor="magenta" className="p-6">
            <h2 className="text-xl font-black text-white mb-4">Recent Proposals</h2>
            <div className="space-y-4">
              {[
                { name: 'Summer Launch Campaign', status: 'Pending', date: '2024-11-20' },
                { name: 'Product Launch 2024', status: 'Approved', date: '2024-11-18' },
                { name: 'Holiday Campaign', status: 'Draft', date: '2024-11-15' }
              ].map((proposal, idx) => (
                <div key={idx} className="bg-charcoal rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white">{proposal.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      proposal.status === 'Approved' ? 'bg-lime/20 text-lime' :
                      proposal.status === 'Pending' ? 'bg-cyan/20 text-cyan' :
                      'bg-white/10 text-white/60'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs">{proposal.date}</p>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Campaign Timeline */}
          <GlowCard glowColor="lime" className="p-6">
            <h2 className="text-xl font-black text-white mb-4">Campaign Timeline</h2>
            <div className="space-y-4">
              {[
                { event: 'Content Creation', date: 'Nov 25', status: 'upcoming' },
                { event: 'Creator Briefing', date: 'Nov 22', status: 'current' },
                { event: 'Proposal Approved', date: 'Nov 20', status: 'completed' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-lime' :
                    item.status === 'current' ? 'bg-cyan' :
                    'bg-white/20'
                  }`} />
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{item.event}</p>
                    <p className="text-white/60 text-xs">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        {/* Creator List */}
        <GlowCard glowColor="cyan" className="p-6">
          <h2 className="text-xl font-black text-white mb-4">Creator Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Alex Rivera', niche: 'Fashion', followers: '250K' },
              { name: 'Jordan Kim', niche: 'Tech', followers: '180K' },
              { name: 'Sam Chen', niche: 'Beauty', followers: '320K' }
            ].map((creator, idx) => (
              <div key={idx} className="bg-charcoal rounded-lg p-4 border border-white/10">
                <h3 className="font-bold text-white mb-1">{creator.name}</h3>
                <p className="text-white/60 text-xs mb-1">{creator.niche}</p>
                <p className="text-cyan text-xs">{creator.followers} followers</p>
              </div>
            ))}
          </div>
        </GlowCard>

        {/* Chat Feed */}
        <GlowCard glowColor="magenta" className="p-6 mt-8">
          <h2 className="text-xl font-black text-white mb-4">Approval Feed</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {[
              { message: 'Content approved for Summer Launch', time: '2 hours ago', type: 'approval' },
              { message: 'New proposal ready for review', time: '1 day ago', type: 'proposal' },
              { message: 'Creator brief submitted', time: '2 days ago', type: 'brief' }
            ].map((item, idx) => (
              <div key={idx} className="bg-charcoal rounded-lg p-4 border border-white/10">
                <p className="text-white text-sm mb-1">{item.message}</p>
                <p className="text-white/40 text-xs">{item.time}</p>
              </div>
            ))}
          </div>
        </GlowCard>
      </div>
    </div>
  );
}

