/**
 * CRM & Campaign Management Page
 * Full CRUD interface for clients, briefs, proposals, and campaigns
 */
import CRMDashboard from '@/components/CRMDashboard';

export const metadata = {
  title: 'CRM Dashboard',
  description: 'Manage clients, briefs, proposals, and campaigns.'
};

export default function CRMPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            CRM <span className="text-magenta">Dashboard</span>
          </h1>
          <p className="text-white/70 text-lg">
            Manage your clients, briefs, proposals, and campaigns all in one place.
          </p>
        </div>
        <CRMDashboard />
      </div>
    </div>
  );
}

