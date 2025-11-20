/**
 * Services page - creative + production, UGC scale, creator casting, paid social
 */
import { TiltCard } from '@/components/MicroInteractions';
import Sticker from '@/components/Sticker';
import Link from 'next/link';

const services = [
  {
    title: 'Creative + Production',
    description: 'End-to-end content creation from concept to delivery. We produce thumb-stopping creative that performs.',
    features: ['Video Production', 'Photo Shoots', 'Motion Graphics', 'Post-Production'],
    color: 'magenta'
  },
  {
    title: 'UGC Scale',
    description: 'Scale authentic user-generated content at volume. We manage creator networks to deliver hundreds of assets.',
    features: ['Creator Network', 'Asset Management', 'Quality Control', 'Rapid Delivery'],
    color: 'lime'
  },
  {
    title: 'Creator Casting',
    description: 'Find the perfect creators for your brand. Our algorithm matches you with creators who align with your values.',
    features: ['AI-Powered Matching', 'Vetting Process', 'Contract Management', 'Performance Tracking'],
    color: 'cyan'
  },
  {
    title: 'Paid Social Creative',
    description: 'Performance-optimized creative for paid campaigns. We A/B test everything to maximize ROAS.',
    features: ['Creative Testing', 'Performance Analytics', 'Ad Optimization', 'Creative Refresh'],
    color: 'magenta'
  }
];

export const metadata = {
  title: 'Services',
  description: 'Full-service creator marketing and content production.'
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            What We <span className="text-magenta">Do</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Full-service creator marketing. From strategy to execution, we&apos;ve got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <TiltCard
              key={index}
              className={`p-8 bg-ink border border-white/10 rounded-2xl ${
                service.color === 'magenta' ? 'hover:border-magenta' :
                service.color === 'lime' ? 'hover:border-lime' : 'hover:border-cyan'
              } transition-colors`}
            >
              <div className="mb-4">
                <Sticker
                  color={service.color as 'magenta' | 'lime' | 'cyan'}
                  rotation={-2}
                >
                  {service.title}
                </Sticker>
              </div>
              <p className="text-white/70 mb-6">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-white/60 text-sm flex items-center gap-2">
                    <span className={`${
                      service.color === 'magenta' ? 'text-magenta' :
                      service.color === 'lime' ? 'text-lime' : 'text-cyan'
                    }`}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`inline-block px-4 py-2 ${
                  service.color === 'magenta' ? 'bg-magenta text-white' :
                  service.color === 'lime' ? 'bg-lime text-charcoal' : 'bg-cyan text-charcoal'
                } font-bold text-sm uppercase tracking-tight rounded-lg hover:opacity-90 transition-opacity`}
              >
                Learn More
              </Link>
            </TiltCard>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-ink border border-white/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/60 mb-8">Let&apos;s talk about your project.</p>
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
