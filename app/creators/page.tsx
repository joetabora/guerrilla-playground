/**
 * Creator landing page describing community perks and application form.
 */
import CreatorsContent from '@/components/CreatorsContent';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Creators',
  description: 'Join the Guerrilla Social Club creator roster and access curated briefs.',
  path: '/creators'
});

const CreatorsPage = () => <CreatorsContent />;

export default CreatorsPage;
