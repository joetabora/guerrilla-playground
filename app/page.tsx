/**
 * Server entry for the homepage that injects the animated client component and metadata.
 */
import HomeContent from '@/components/HomeContent';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Influencer Marketing Agency',
  description: 'Guerrilla Social Club designs creator-led growth programs for brands and creators alike.',
  path: '/'
});

const HomePage = () => <HomeContent />;

export default HomePage;
