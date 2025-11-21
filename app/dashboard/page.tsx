/**
 * Campaign Dashboard & Analytics
 */
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export const metadata = {
  title: 'Campaign Dashboard',
  description: 'View campaign analytics and KPIs.'
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Campaign <span className="text-lime">Dashboard</span>
          </h1>
        </div>
        <AnalyticsDashboard />
      </div>
    </div>
  );
}

