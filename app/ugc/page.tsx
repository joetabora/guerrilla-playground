/**
 * UGC Intake Wizard Page
 */
import UGCWizard from '@/components/UGCWizard';

export const metadata = {
  title: 'UGC Intake Wizard',
  description: 'Create detailed creative briefs for user-generated content campaigns.'
};

export default function UGCPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            UGC <span className="text-lime">Intake Wizard</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Create comprehensive creative briefs for your user-generated content campaigns.
          </p>
        </div>
        <UGCWizard />
      </div>
    </div>
  );
}

