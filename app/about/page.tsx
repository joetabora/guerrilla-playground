/**
 * About page - team section, mission statement, press logos
 */
import { TiltCard } from '@/components/MicroInteractions';
import Image from 'next/image';

const team = [
  {
    name: 'Alex Rivera',
    role: 'Founder & CEO',
    bio: 'Ex-creator turned agency founder. Built brands from 0 to 100M+ followers.',
    image: 'https://placehold.co/400x400/FF2D95/FFFFFF?text=Team+1'
  },
  {
    name: 'Jordan Kim',
    role: 'Head of Creative',
    bio: 'Award-winning creative director. Thumb-stopping content is her superpower.',
    image: 'https://placehold.co/400x400/A6FF00/000000?text=Team+2'
  },
  {
    name: 'Sam Chen',
    role: 'Head of Creator Ops',
    bio: 'Connects brands with the perfect creators. 10K+ creator network manager.',
    image: 'https://placehold.co/400x400/00FFD6/000000?text=Team+3'
  },
  {
    name: 'Taylor Morgan',
    role: 'Head of Strategy',
    bio: 'Data-driven strategist. Turns insights into campaigns that convert.',
    image: 'https://placehold.co/400x400/FF2D95/FFFFFF?text=Team+4'
  }
];

const pressLogos = [
  'Forbes', 'TechCrunch', 'AdWeek', 'The Drum', 'Marketing Week'
];

export const metadata = {
  title: 'About',
  description: 'Meet the team behind Guerrilla Social Club.'
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            About <span className="text-magenta">Us</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            We&apos;re a team of creators, strategists, and culture-movers building the future of influencer marketing.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-ink border border-white/10 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-black text-white mb-6 text-center">Our Mission</h2>
          <p className="text-white/70 text-lg text-center max-w-3xl mx-auto leading-relaxed">
            Creator-led creative that actually moves culture. We believe in authentic partnerships between brands and creators. 
            No fake engagement, no forced content—just real connections that drive real results. We&apos;re building a new model 
            for influencer marketing that puts creators first and delivers ROI that brands can actually measure.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-white mb-12 text-center">The Squad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TiltCard
                key={index}
                className="bg-ink border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="aspect-square relative bg-charcoal">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-white mb-1">{member.name}</h3>
                  <p className="text-magenta text-sm font-bold mb-3 uppercase tracking-tight">{member.role}</p>
                  <p className="text-white/60 text-sm">{member.bio}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Press Section */}
        <div className="bg-ink border border-white/10 rounded-2xl p-12">
          <h2 className="text-3xl font-black text-white mb-8 text-center">As Featured In</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {pressLogos.map((logo, idx) => (
              <div key={idx} className="text-white/40 text-xl font-bold">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
