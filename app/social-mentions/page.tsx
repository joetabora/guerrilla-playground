/**
 * Social Mentions Page
 * Particle/timeline visualization of social media mentions
 */
import SocialMentionsViz from '@/components/SocialMentionsViz';

export const metadata = {
  title: 'Social Mentions',
  description: 'Real-time visualization of social media mentions across platforms.'
};

export default function SocialMentionsPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Social <span className="text-cyan">Mentions</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Real-time visualization of brand mentions across TikTok, Instagram, and Twitter.
          </p>
        </div>
        <SocialMentionsViz />
      </div>
    </div>
  );
}

