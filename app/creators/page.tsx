/**
 * Creators page - Creator Marketplace with filters and signup
 */
import CreatorMarketplace from '@/components/CreatorMarketplace';
import CreatorSignupForm from '@/components/CreatorSignupForm';
import { TiltCard } from '@/components/MicroInteractions';
import NeonDivider from '@/components/NeonDivider';


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
            Creator <span className="text-lime">Marketplace</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Discover and connect with top creators across all platforms. Filter by niche, platform, location, and more.
          </p>
        </div>

        {/* Creator Marketplace */}
        <div className="mb-20">
          <CreatorMarketplace />
        </div>

        <NeonDivider color="lime" className="my-16" />

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Why Join as a Creator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
