/**
 * Work / Case Studies page - immersive case study cards with metrics
 */
import CaseStudyCard from '@/components/CaseStudyCard';

// Sample case study data - replace with real data
const caseStudies = [
  {
    id: 'streetwear-launch',
    title: 'Streetwear Brand Launch',
    brand: 'Urban Threads',
    description: 'Launched a new streetwear line with creator-led content that generated 5M+ impressions and 2.5M in first-month sales.',
    thumbnail: 'https://placehold.co/800x450/FF2D95/FFFFFF?text=Case+Study+1',
    metrics: [
      { label: 'Impressions', value: '5.2M', change: '320%' },
      { label: 'Engagement', value: '18.5%', change: '145%' },
      { label: 'Sales', value: '$2.5M', change: '280%' },
      { label: 'ROAS', value: '8.2x', change: '210%' }
    ],
    beforeAfter: {
      before: 'https://placehold.co/800x450/1a1a1a/FFFFFF?text=Before',
      after: 'https://placehold.co/800x450/FF2D95/FFFFFF?text=After'
    }
  },
  {
    id: 'tech-product-launch',
    title: 'Tech Product Launch',
    brand: 'TechFlow',
    description: 'Creator partnerships drove 3M+ video views and 50K+ app downloads in the first week.',
    thumbnail: 'https://placehold.co/800x450/A6FF00/000000?text=Case+Study+2',
    metrics: [
      { label: 'Video Views', value: '3.1M', change: '450%' },
      { label: 'App Downloads', value: '50K+', change: '380%' },
      { label: 'CTR', value: '12.3%', change: '290%' },
      { label: 'Cost Per Install', value: '$0.85', change: '-65%' }
    ]
  },
  {
    id: 'beauty-campaign',
    title: 'Beauty Brand Awareness',
    brand: 'Glow Up',
    description: 'Multi-platform creator campaign increased brand awareness by 400% and drove 1.2M new followers.',
    thumbnail: 'https://placehold.co/800x450/00FFD6/000000?text=Case+Study+3',
    metrics: [
      { label: 'Reach', value: '15M+', change: '520%' },
      { label: 'New Followers', value: '1.2M', change: '380%' },
      { label: 'Engagement Rate', value: '22%', change: '195%' },
      { label: 'Brand Mentions', value: '45K+', change: '610%' }
    ]
  }
];

export const metadata = {
  title: 'Our Work',
  description: 'Case studies and results from our creator-led campaigns.'
};

export default function WorkPage() {
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

