/**
 * Creative Concept Generator Page
 * AI-powered creative concept generation for campaigns
 */
import CreativeGeneratorForm from '@/components/CreativeGeneratorForm';

export const metadata = {
  title: 'Creative Concept Generator',
  description: 'Generate AI-powered creative concepts for your campaigns.'
};

export default function CreativeGeneratorPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Creative <span className="text-magenta">Generator</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Generate AI-powered creative concepts for your next campaign. Get 3 unique concepts with hooks, scripts, and visual directions.
          </p>
        </div>
        <CreativeGeneratorForm />
      </div>
    </div>
  );
}

