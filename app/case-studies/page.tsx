/**
 * Case studies overview with mock metrics and storytelling structure.
 */
import Image from 'next/image';
import Section from '@/components/Section';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Case Studies',
  description: 'Review creator campaign examples with goals, insights, and performance metrics.',
  path: '/case-studies'
});

const studies = [
  {
    name: 'Gravity Labs',
    problem: 'Wellness hardware brand with high CAC on Meta needed fresh creator POVs.',
    approach: 'Orchestrated 12 paid creator duos blending ASMR + product teardown formats.',
    creative: 'Shot vertical mini-docs inside creator home gyms to feel native.',
    metrics: ['62% CAC efficiency', '3.8x ROAS on retargeting', '2.4M organic reach'],
    image: '/images/case-1.svg'
  },
  {
    name: 'Pixelboard',
    problem: 'New collaboration app struggled to translate B2B features for Gen Z teams.',
    approach: 'Activated design TikTokers to show messy creative process + templates.',
    creative: 'Combined POV sketching content with screen-recorded Easter eggs.',
    metrics: ['9M organic views', '38K beta signups', '1.8x retention uplift'],
    image: '/images/case-2.svg'
  },
  {
    name: 'Bedtime Beacon',
    problem: 'Sought authority in saturated sleep supplementation landscape.',
    approach: 'Matched science communicators with relatable night routines and data overlays.',
    creative: 'Mixed cinematic macro shots with day-in-the-life narratives.',
    metrics: ['2.1x conversion lift', '+14 pt brand recall', 'Top 5 product on Amazon Sleep'],
    image: '/images/case-3.svg'
  }
];

const CaseStudiesPage = () => (
  <div className="space-y-16 py-20">
    <Section>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Case studies</p>
      <h1 className="mt-4 text-4xl font-semibold">Future-facing brands partner with creator operators.</h1>
      <p className="mt-4 text-slate-400">
        Below are anonymized narratives that mirror real campaigns. Swap in your brand, audience, and KPI, and we will
        storyboard the path from insight to impact.
      </p>
    </Section>
    <Section className="space-y-10">
      {studies.map((study) => (
        <article key={study.name} className="card-surface grid gap-6 p-8 md:grid-cols-[1fr_2fr]">
          <Image
            src={study.image}
            alt={`${study.name} creative example`}
            width={220}
            height={220}
            className="w-full rounded-2xl border border-white/10 bg-black/20 object-cover"
          />
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{study.name}</h2>
              <p className="text-sm uppercase tracking-wide text-cyan-200">{study.metrics[0]}</p>
            </div>
            <p className="text-slate-300">
              <strong>Problem:</strong> {study.problem}
            </p>
            <p className="text-slate-300">
              <strong>Approach:</strong> {study.approach}
            </p>
            <p className="text-slate-300">
              <strong>Creative:</strong> {study.creative}
            </p>
            <ul className="flex flex-wrap gap-3 text-xs uppercase tracking-wide text-slate-400">
              {study.metrics.map((metric) => (
                <li key={metric} className="rounded-full border border-white/10 px-4 py-1">
                  {metric}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </Section>
  </div>
);

export default CaseStudiesPage;
