/**
 * Services page outlining offerings, workflows, and deliverables.
 */
import Section from '@/components/Section';
import Card from '@/components/Card';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services',
  description: 'Explore Guerrilla Social Club service tiers, workflows, and deliverables.',
  path: '/services'
});

const services = [
  {
    title: 'Creator Strategy Sprints',
    description:
      '2-week collaborations that define positioning, creator personas, and proof-of-concept messaging before investing in large productions.',
    workflow: ['Competitive mapping', 'Creator persona audit', 'Storyboard + hook testing']
  },
  {
    title: 'Always-On UGC Engine',
    description:
      'Monthly retained squad of creators capturing studio-quality UGC that drops directly into paid social editors.',
    workflow: ['Briefing pods', 'Production guidelines', 'Performance retro with iteration plan']
  },
  {
    title: 'White-Glove Launches',
    description:
      'Full-service sourcing, contracting, creative direction, and reporting for seasonal or product-specific pushes.',
    workflow: ['Talent shortlist & vetting', 'Legal + usage negotiation', 'Delivery dashboard + sentiment analysis']
  }
];

const ServicesPage = () => (
  <div className="space-y-16 py-20">
    <Section>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">What we do</p>
      <h1 className="mt-4 text-4xl font-semibold">Creator programs that balance taste and performance.</h1>
      <p className="mt-4 text-slate-400">
        Every engagement is modular. Start with a sprint to validate messaging, or plug into our always-on creator engine.
        We meet internal teams where they are and provide templates so ops stay transparent.
      </p>
    </Section>
    <Section className="grid gap-8 md:grid-cols-3">
      {services.map((service) => (
        <Card
          key={service.title}
          title={service.title}
          description={service.description}
          footer={
            <ul className="list-disc space-y-1 pl-5 text-slate-300">
              {service.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          }
        />
      ))}
    </Section>
  </div>
);

export default ServicesPage;
