/**
 * Billing Page - Invoice management with Stripe stubs
 */
import BillingDashboard from '@/components/BillingDashboard';

export const metadata = {
  title: 'Billing',
  description: 'Manage invoices and billing.'
};

export default function BillingPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Billing & <span className="text-magenta">Invoices</span>
          </h1>
        </div>
        <BillingDashboard />
      </div>
    </div>
  );
}

