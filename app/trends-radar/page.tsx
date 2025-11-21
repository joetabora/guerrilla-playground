/**
 * Trends Radar Page
 * D3-like radial heatmap visualization of creator trends
 */
import TrendsRadar from '@/components/TrendsRadar';

export const metadata = {
  title: 'Trends Radar',
  description: 'Visualize trending topics across creator categories.'
};

export default function TrendsRadarPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Trends <span className="text-cyan">Radar</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explore trending topics across different creator categories in real-time.
          </p>
        </div>
        <TrendsRadar />
      </div>
    </div>
  );
}

