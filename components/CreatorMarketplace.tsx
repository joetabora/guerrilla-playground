/**
 * Creator Marketplace - Masonry grid layout with filters and modal
 */
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GlowCard from './GlowCard';
import MotionButton from './MotionButton';
import creatorsData from '@/data/creators.json';

interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  niche: string;
  platform: string;
  location: string;
  followers: string;
  avgViews: string;
  engagementRate: string;
  samplePosts: string[];
}

interface CreatorModalProps {
  creator: Creator | null;
  onClose: () => void;
}

function CreatorModal({ creator, onClose }: CreatorModalProps) {
  if (!creator) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-ink border border-white/10 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-magenta">
              <Image src={creator.avatar} alt={creator.name} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black text-white mb-2">{creator.name}</h2>
              <p className="text-magenta text-lg mb-4">{creator.handle}</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <span>{creator.niche}</span>
                <span>•</span>
                <span>{creator.platform}</span>
                <span>•</span>
                <span>{creator.location}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-charcoal rounded-lg p-4 text-center">
              <div className="text-2xl font-black text-magenta mb-1">{creator.followers}</div>
              <div className="text-white/60 text-xs uppercase">Followers</div>
            </div>
            <div className="bg-charcoal rounded-lg p-4 text-center">
              <div className="text-2xl font-black text-lime mb-1">{creator.avgViews}</div>
              <div className="text-white/60 text-xs uppercase">Avg Views</div>
            </div>
            <div className="bg-charcoal rounded-lg p-4 text-center">
              <div className="text-2xl font-black text-cyan mb-1">{creator.engagementRate}</div>
              <div className="text-white/60 text-xs uppercase">Engagement</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-black text-white mb-4">Sample Posts</h3>
            <div className="grid grid-cols-2 gap-4">
              {creator.samplePosts.map((post, idx) => (
                <div key={idx} className="relative aspect-[9/16] rounded-lg overflow-hidden bg-charcoal">
                  <Image src={post} alt={`Sample post ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <MotionButton
            variant="primary"
            className="w-full"
            onClick={() => {
              window.location.href = `/contact?creator=${creator.id}`;
            }}
          >
            Request Proposal with {creator.name}
          </MotionButton>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function CreatorMarketplace() {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [filters, setFilters] = useState({
    niche: 'all',
    platform: 'all',
    location: 'all',
    minFollowers: '0'
  });

  const creators = creatorsData as Creator[];

  const filteredCreators = useMemo(() => {
    return creators.filter((creator) => {
      if (filters.niche !== 'all' && creator.niche !== filters.niche) return false;
      if (filters.platform !== 'all' && creator.platform !== filters.platform) return false;
      if (filters.location !== 'all' && !creator.location.includes(filters.location)) return false;
      
      const followersNum = parseFloat(creator.followers.replace('K', '')) * 1000;
      const minFollowersNum = parseFloat(filters.minFollowers.replace('K', '')) * 1000;
      if (followersNum < minFollowersNum) return false;
      
      return true;
    });
  }, [filters, creators]);

  const niches = Array.from(new Set(creators.map(c => c.niche)));
  const platforms = Array.from(new Set(creators.map(c => c.platform)));
  const locations = Array.from(new Set(creators.map(c => c.location.split(',')[0])));

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-ink border border-white/10 rounded-2xl p-6">
        <h3 className="text-xl font-black text-white mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-bold text-white mb-2">Niche</label>
            <select
              value={filters.niche}
              onChange={(e) => setFilters({ ...filters, niche: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta"
            >
              <option value="all">All Niches</option>
              {niches.map(niche => (
                <option key={niche} value={niche}>{niche}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Platform</label>
            <select
              value={filters.platform}
              onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta"
            >
              <option value="all">All Platforms</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Min Followers</label>
            <select
              value={filters.minFollowers}
              onChange={(e) => setFilters({ ...filters, minFollowers: e.target.value })}
              className="w-full px-4 py-2 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta"
            >
              <option value="0">Any</option>
              <option value="100K">100K+</option>
              <option value="200K">200K+</option>
              <option value="300K">300K+</option>
              <option value="400K">400K+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCreators.map((creator, index) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <GlowCard glowColor="magenta" className="cursor-pointer" onClick={() => setSelectedCreator(creator)}>
              <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-charcoal">
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-lg font-black text-white mb-1">{creator.name}</h3>
              <p className="text-magenta text-sm mb-3">{creator.handle}</p>
              <div className="space-y-2 text-xs text-white/60 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-lime rounded-full" />
                  <span>{creator.niche}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan rounded-full" />
                  <span>{creator.platform}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-magenta rounded-full" />
                  <span>{creator.followers} followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-lime rounded-full" />
                  <span>{creator.engagementRate} engagement</span>
                </div>
              </div>
              <MotionButton variant="ghost" className="w-full text-sm">
                View Profile
              </MotionButton>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {filteredCreators.length === 0 && (
        <div className="text-center py-12 text-white/60">
          <p>No creators match your filters. Try adjusting your criteria.</p>
        </div>
      )}

      <CreatorModal creator={selectedCreator} onClose={() => setSelectedCreator(null)} />
    </div>
  );
}

