/**
 * Brands page - brand pitch with process timeline, pricing, and CTA
 */
import { TiltCard } from '@/components/MicroInteractions';
import Sticker from '@/components/Sticker';
import Link from 'next/link';

const processSteps = [
  {
    step: '01',
    title: 'Discovery Call',
    description: 'We learn about your brand, goals, and target audience.',
    color: 'magenta'
  },
  {
    step: '02',
    title: 'Strategy & Brief',
    description: 'We create a custom strategy and creative brief tailored to your needs.',
    color: 'lime'
  },
  {
    step: '03',
    title: 'Creator Matching',
    description: 'We match you with creators who align with your brand values.',
    color: 'cyan'
  },
  {
    step: '04',
    description: 'Content goes live and we track performance in real-time.',
    title: 'Launch & Optimize',
    color: 'magenta'
  }
];

const pricingTiers = [
  {
    name: 'Starter',
    price: '$5K',
    period: '/month',
    description: 'Perfect for testing the waters',
    features: ['5 Creators', '10 Assets', 'Basic Analytics', 'Email Support']
  },
  {
    name: 'Growth',
    price: '$15K',
    period: '/month',
    description: 'For brands ready to scale',
    features: ['20 Creators', '50 Assets', 'Advanced Analytics', 'Dedicated Manager'],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Full-service partnership',
    features: ['Unlimited Creators', 'Unlimited Assets', 'Custom Reporting', '24/7 Support']
  }
];

export const metadata = {
  title: 'For Brands',
  description: 'Scale your brand with creator-led creative that converts.'
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            For <span className="text-magenta">Brands</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Scale your brand with creator-led creative that actually converts. No fluff, just results.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <TiltCard
                key={index}
                className={`p-6 bg-ink border border-white/10 rounded-2xl ${
                  step.color === 'magenta' ? 'hover:border-magenta' :
                  step.color === 'lime' ? 'hover:border-lime' : 'hover:border-cyan'
                } transition-colors`}
              >
                <div className={`text-4xl font-black mb-4 ${
                  step.color === 'magenta' ? 'text-magenta' :
                  step.color === 'lime' ? 'text-lime' : 'text-cyan'
                }`}>
                  {step.step}
                </div>
                <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.description}</p>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white mb-12 text-center">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <TiltCard
                key={index}
                className={`p-8 bg-ink border rounded-2xl ${
                  tier.popular
                    ? 'border-lime shadow-glow-lime'
                    : 'border-white/10'
                }`}
              >
                {tier.popular && (
                  <div className="mb-4">
                    <Sticker color="lime" rotation={-2}>Popular</Sticker>
                  </div>
                )}
                <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black text-magenta">{tier.price}</span>
                  <span className="text-white/60 text-sm">{tier.period}</span>
                </div>
                <p className="text-white/60 text-sm mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="text-white/80 text-sm flex items-center gap-2">
                      <span className="text-lime">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block w-full text-center px-6 py-3 ${
                    tier.popular
                      ? 'bg-lime text-charcoal font-bold'
                      : 'bg-magenta text-white font-bold'
                  } text-sm uppercase tracking-tight rounded-lg hover:opacity-90 transition-opacity`}
                >
                  Get Started
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-ink border border-white/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Start a Brief?</h2>
          <p className="text-white/60 mb-8">Let&apos;s talk about your goals and build something amazing together.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-magenta text-white font-bold text-lg uppercase tracking-tight rounded-lg shadow-glow-magenta hover:bg-magenta/90 transition-colors"
          >
            Start a Brief
          </Link>
        </div>
      </div>
    </div>
  );
}
