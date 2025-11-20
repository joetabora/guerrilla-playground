/**
 * Contact page with details on how to engage and a server-action powered form.
 */
import Section from '@/components/Section';
import ContactForm from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Reach Guerrilla Social Club for strategy calls, creator partnerships, or press.',
  path: '/contact'
});

const ContactPage = () => (
  <div className="space-y-12 py-20">
    <Section>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Contact</p>
      <h1 className="mt-4 text-4xl font-semibold">Tell us about your next launch.</h1>
      <p className="mt-4 max-w-3xl text-slate-400">
        We respond within one business day. For urgent launches, mention timelines in the message field. If you prefer
        email, reach the partners at <a href="mailto:hello@guerrillasocial.club" className="text-cyan-200">hello@guerrillasocial.club</a>.
      </p>
    </Section>
    <Section>
      <ContactForm />
    </Section>
  </div>
);

export default ContactPage;
