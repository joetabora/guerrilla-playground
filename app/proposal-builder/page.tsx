/**
 * Proposal Builder Page - Generate premium campaign proposals
 */
import ProposalBuilder from '@/components/ProposalBuilder';

export const metadata = {
  title: 'Proposal Builder',
  description: 'Create professional campaign proposals in minutes.'
};

export default function ProposalBuilderPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Proposal <span className="text-magenta">Builder</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Create premium campaign proposals with real-time preview and PDF export.
          </p>
        </div>
        <ProposalBuilder />
      </div>
    </div>
  );
}

