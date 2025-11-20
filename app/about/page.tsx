/**
 * About page sharing the agency story and team bios.
 */
import Image from 'next/image';
import Section from '@/components/Section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About',
  description: 'Discover the story and team behind Guerrilla Social Club.',
  path: '/about'
});

const team = [
  {
    name: 'Quinn Alvarez',
    role: 'Founder & Creative Director',
    bio: 'Former brand lead at breakout DTC teams, now architecting creator systems for hyper-growth startups.',
    image: '/images/creator-1.svg'
  },
  {
    name: 'Nia Carter',
    role: 'Head of Talent',
    bio: 'Built private rosters for beauty and gaming unicorns—champions creator equity in every deal.',
    image: '/images/creator-2.svg'
  },
  {
    name: 'Leo Martins',
    role: 'Strategy & Analytics',
    bio: 'Data storyteller translating retention dashboards into creative briefs creators love.',
    image: '/images/creator-3.svg'
  }
];

const AboutPage = () => (
  <div className="space-y-16 py-20">
    <Section>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Our story</p>
      <h1 className="mt-4 text-4xl font-semibold">We are ex-brand operators working shoulder-to-shoulder with creators.</h1>
      <p className="mt-4 max-w-3xl text-slate-400">
        Guerrilla Social Club launched after years leading in-house creative and growth teams. We saw agencies optimize
        for vanity metrics while ignoring the product or brand nuance that actually converts. Our solution: embed with
        founders, give creators context, and iterate faster than algorithms shift.
      </p>
    </Section>
    <Section>
      <h2 className="text-2xl font-semibold">Leadership</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {team.map((member) => (
          <article key={member.name} className="card-surface space-y-4 p-6 text-center">
            <Image
              src={member.image}
              alt={member.name}
              width={160}
              height={160}
              className="mx-auto h-40 w-40 rounded-full border border-white/10 object-cover"
            />
            <div>
              <p className="text-lg font-semibold">{member.name}</p>
              <p className="text-sm text-cyan-200">{member.role}</p>
            </div>
              <p className="text-sm text-slate-400">{member.bio}</p>
          </article>
        ))}
      </div>
    </Section>
  </div>
);

export default AboutPage;
