/**
 * Brief Builder Page - Multi-step form to create project briefs
 * Generates PDF and saves to JSON
 */
import BriefBuilderForm from '@/components/BriefBuilderForm';

export const metadata = {
  title: 'Brief Builder',
  description: 'Create a detailed project brief for your next campaign.'
};

export default function BriefBuilderPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Brief <span className="text-magenta">Builder</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll create a detailed brief to get started.
          </p>
        </div>
        <BriefBuilderForm />
      </div>
    </div>
  );
}

