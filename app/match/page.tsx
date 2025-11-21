/**
 * Match Page - AI-Powered Influencer Matchmaking Engine
 */
import MatchmakingEngine from '@/components/MatchmakingEngine';

export const metadata = {
  title: 'Find Your Perfect Match',
  description: 'AI-powered creator matching for your brand.'
};

export default function MatchPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Find Your <span className="text-cyan">Perfect Match</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Our AI analyzes your brand, audience, and goals to match you with the perfect creators.
          </p>
        </div>
        <MatchmakingEngine />
      </div>
    </div>
  );
}

