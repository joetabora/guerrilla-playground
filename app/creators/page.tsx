/**
 * Creators page - creator signup flow, benefits, community highlights
 */
import CreatorSignupForm from '@/components/CreatorSignupForm';
import CreatorCard from '@/components/CreatorCard';
import { TiltCard } from '@/components/MicroInteractions';

// Sample creator data - replace with real data
const featuredCreators = [
  {
    id: '1',
    handle: 'streetstyle_alex',
    avatar: '/images/creators/creator-1.svg',
    niche: 'Fashion',
    stat: '250K',
    statLabel: 'Followers',
    videoPreview: undefined,
    profileUrl: '/creators',
    bookUrl: '/contact'
  },
  {
    id: '2',
    handle: 'techreview',
    avatar: '/images/creators/creator-2.svg',
    niche: 'Tech',
    stat: '180K',
    statLabel: 'Followers',
    videoPreview: undefined,
    profileUrl: '/creators',
    bookUrl: '/contact'
  },
  {
    id: '3',
    handle: 'beautyguru',
    avatar: '/images/creators/creator-3.svg',
    niche: 'Beauty',
    stat: '320K',
    statLabel: 'Followers',
    videoPreview: undefined,
    profileUrl: '/creators',
    bookUrl: '/contact'
  },
  {
    id: '4',
    handle: 'urbanvibes',
    avatar: '/images/creators/creator-4.svg',
    niche: 'Lifestyle',
    stat: '150K',
    statLabel: 'Followers',
    videoPreview: undefined,
    profileUrl: '/creators',
    bookUrl: '/contact'
  }
];

const benefits = [
  {
    title: 'Get Matched with Brands',
    description: 'Our AI matches you with brands that align with your content and values.',
    icon: '🎯'
  },
  {
    title: 'Fair Rates',
    description: 'We negotiate on your behalf to ensure you get paid what you\'re worth.',
    icon: '💰'
  },
  {
    title: 'Creative Freedom',
    description: 'Work with brands that trust your creative vision and authentic voice.',
    icon: '✨'
  },
  {
    title: 'Growth Support',
    description: 'Access resources, workshops, and community to level up your content.',
    icon: '📈'
  }
];

export const metadata = {
  title: 'For Creators',
  description: 'Join our creator network and get matched with brands that fit your vibe.'
};

export default function CreatorsPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            For <span className="text-lime">Creators</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Join a network of 10K+ creators. Get matched with brands, get paid fairly, and grow your audience.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <TiltCard
              key={index}
              className="p-6 bg-ink border border-white/10 rounded-2xl text-center"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-lg font-black text-white mb-2">{benefit.title}</h3>
              <p className="text-white/60 text-sm">{benefit.description}</p>
            </TiltCard>
          ))}
        </div>

        {/* Featured Creators Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Featured Creators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredCreators.map((creator) => (
              <CreatorCard key={creator.id} {...creator} />
            ))}
          </div>
        </div>

        {/* Signup Form */}
        <div className="mb-16">
          <CreatorSignupForm />
        </div>

        {/* Community Highlights */}
        <div className="bg-ink border border-white/10 rounded-2xl p-12">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Join the Squad</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: '10K+', label: 'Active Creators' },
              { stat: '$5M+', label: 'Paid to Creators' },
              { stat: '500+', label: 'Brand Partnerships' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-black text-lime mb-2">{item.stat}</div>
                <div className="text-white/60 text-sm uppercase tracking-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
