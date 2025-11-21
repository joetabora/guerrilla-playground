/**
 * Pricing Page - Dynamic pricing with ROI calculator
 */
import PricingModule from '@/components/PricingModule';

export const metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for influencer marketing campaigns.'
};

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Pricing <span className="text-magenta">That Scales</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Choose the plan that fits your goals. All plans include strategy, execution, and optimization.
          </p>
        </div>
        <PricingModule />
      </div>
    </div>
  );
}

