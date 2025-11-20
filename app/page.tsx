/**
 * Home page - hero with kinetic typography, featured reels, and CTAs
 */
import HeroKinetic from '@/components/HeroKinetic';
import ReelGrid from '@/components/ReelGrid';
import { TiltCard } from '@/components/MicroInteractions';
import Link from 'next/link';

// Sample reel data - replace with real data
// Sample reel data - replace with real data
// Note: Placeholder images are used - replace with actual reel thumbnails
const featuredReels = [
  {
    id: '1',
    thumbnail: 'https://placehold.co/400x711/FF2D95/FFFFFF?text=Reel+1',
    title: 'Summer Campaign',
    brand: 'Streetwear Co',
    views: '2.5M',
    engagement: '15%'
  },
  {
    id: '2',
    thumbnail: 'https://placehold.co/400x711/A6FF00/000000?text=Reel+2',
    title: 'Product Launch',
    brand: 'Tech Brand',
    views: '1.8M',
    engagement: '12%'
  },
  {
    id: '3',
    thumbnail: 'https://placehold.co/400x711/00FFD6/000000?text=Reel+3',
    title: 'Brand Awareness',
    brand: 'Lifestyle',
    views: '3.2M',
    engagement: '18%'
  },
  {
    id: '4',
    thumbnail: 'https://placehold.co/400x711/FF2D95/FFFFFF?text=Reel+4',
    title: 'Holiday Push',
    brand: 'Fashion',
    views: '2.1M',
    engagement: '14%'
  },
  {
    id: '5',
    thumbnail: 'https://placehold.co/400x711/A6FF00/000000?text=Reel+5',
    title: 'Influencer Collab',
    brand: 'Beauty',
    views: '4.5M',
    engagement: '22%'
  },
  {
    id: '6',
    thumbnail: 'https://placehold.co/400x711/00FFD6/000000?text=Reel+6',
    title: 'Viral Moment',
    brand: 'Entertainment',
    views: '5.8M',
    engagement: '25%'
  }
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroKinetic
        headline="Creator Led Creative That Actually Moves Culture"
        subheadline="We build brands that Gen Z and Millennials actually want to follow. No cap."
        ctaPrimary={{ text: 'For Brands', href: '/brands' }}
        ctaSecondary={{ text: 'For Creators', href: '/creators' }}
      />

      {/* Featured Reels Section */}
      <ReelGrid reels={featuredReels} />

      {/* Quick Stats Section */}
      <section className="py-20 px-4 bg-ink">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Campaigns Launched', value: '500+', color: 'magenta' },
              { label: 'Creators in Network', value: '10K+', color: 'lime' },
              { label: 'Avg. Engagement', value: '18%', color: 'cyan' }
            ].map((stat, index) => (
              <TiltCard key={index} className="text-center p-8 bg-charcoal border border-white/10 rounded-2xl">
                <div className={`text-5xl font-black mb-2 ${
                  stat.color === 'magenta' ? 'text-magenta' :
                  stat.color === 'lime' ? 'text-lime' : 'text-cyan'
                }`}>
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm uppercase tracking-tight font-bold">
                  {stat.label}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Ready to <span className="text-magenta">Move Culture</span>?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a brand looking to scale or a creator ready to level up, we&apos;ve got you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-magenta text-white font-bold text-lg uppercase tracking-tight rounded-lg shadow-glow-magenta hover:bg-magenta/90 transition-colors"
            >
              Start a Project
            </Link>
            <Link
              href="/work"
              className="px-8 py-4 bg-transparent border-2 border-lime text-lime font-bold text-lg uppercase tracking-tight rounded-lg hover:bg-lime hover:text-charcoal transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
