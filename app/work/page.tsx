/**
 * Work / Case Studies page - immersive case study cards with metrics
 * Data-driven from /data/case-studies.json
 */
import CaseStudyCard from '@/components/CaseStudyCard';
import { getAllCaseStudies } from '@/lib/case-studies';

export const metadata = {
  title: 'Our Work',
  description: 'Case studies and results from our creator-led campaigns.'
};

export default function WorkPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Our <span className="text-magenta">Work</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Real results from real campaigns. See how we help brands move culture and drive conversions.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
          ))}
        </div>

        {/* Social Proof Section */}
        <div className="bg-ink border border-white/10 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-black text-white mb-6">Trusted by Leading Brands</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder brand logos - replace with real logos */}
            {['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5'].map((brand, idx) => (
              <div key={idx} className="text-white/40 text-xl font-bold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

