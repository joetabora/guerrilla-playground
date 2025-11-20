/**
 * Brand-focused page outlining collaboration process and pricing signal.
 */
import Section from '@/components/Section';
import Button from '@/components/Button';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Brands',
  description: 'See how Guerrilla Social Club partners with brand and growth teams to launch creator programs.',
  path: '/brands'
});

const process = [
  {
    title: 'Immersion',
    detail: 'Audit funnels, internal decks, and existing creator output to uncover narrative gaps.'
  },
  {
    title: 'Creator Lab',
    detail: 'Hand-match creators, script hook angles, and prototype assets in Figma + Notion.'
  },
  {
    title: 'Launch & Learn',
    detail: 'Ship, collect qualitative + quantitative insights, and spin up new iterations in 1-week cycles.'
  }
];

const pricing = [
  { tier: 'Sprints', price: 'Starting at $12K', note: '2-week intensives for launches and repositioning.' },
  { tier: 'Retainers', price: 'Starting at $18K/mo', note: 'Always-on creator pods + reporting.' },
  { tier: 'Studio', price: 'Custom', note: 'On-location capture, live streams, or experiential.' }
];

const BrandsPage = () => (
  <div className="space-y-16 py-20">
    <Section>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">For brands</p>
      <h1 className="mt-4 text-4xl font-semibold">Creator programs engineered for KPIs you actually report on.</h1>
      <p className="mt-4 max-w-3xl text-slate-400">
        We partner with growth, brand, and social teams that need creator collaborations to feel senior—not experimental.
        Expect weekly status docs, legal-ready contracts, and crystal-clear creative direction.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Button href="/contact">Book a Chemistry Call</Button>
        <Button href="/case-studies" variant="secondary">
          Browse wins
        </Button>
      </div>
    </Section>
    <Section className="grid gap-8 md:grid-cols-3">
      {process.map((step, index) => (
        <div key={step.title} className="card-surface p-6">
          <p className="text-sm uppercase tracking-wide text-cyan-200">Step {index + 1}</p>
          <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
          <p className="mt-2 text-sm text-slate-400">{step.detail}</p>
        </div>
      ))}
    </Section>
    <Section>
      <h2 className="text-2xl font-semibold">Investment snapshot</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {pricing.map((tier) => (
          <div key={tier.tier} className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm uppercase tracking-wide text-cyan-200">{tier.tier}</p>
            <p className="mt-3 text-3xl font-semibold">{tier.price}</p>
            <p className="mt-2 text-sm text-slate-400">{tier.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">Pricing includes talent fees, production, and reporting. Paid media budgets billed separately.</p>
    </Section>
  </div>
);

export default BrandsPage;
