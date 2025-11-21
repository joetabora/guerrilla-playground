/**
 * Billing Dashboard - Invoice list and creation
 * 
 * STRIPE INTEGRATION:
 * To add real Stripe integration:
 * 1. Install: npm install stripe @stripe/stripe-js
 * 2. Add STRIPE_SECRET_KEY to .env
 * 3. Replace mock invoice creation with Stripe API calls
 * 4. Add webhook handler for payment events
 */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlowCard from './GlowCard';
import MotionButton from './MotionButton';

interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
}

export default function BillingDashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    amount: '',
    dueDate: ''
  });

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const response = await fetch('/api/get-invoices');
      if (response.ok) {
        const data = await response.json();
        setInvoices(data.invoices || []);
      }
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
  };

  const handleCreateInvoice = async () => {
    try {
      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInvoice)
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${newInvoice.clientName}-${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        loadInvoices();
        setShowCreateModal(false);
        setNewInvoice({ clientName: '', amount: '', dueDate: '' });
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">Invoices</h2>
        <MotionButton variant="primary" onClick={() => setShowCreateModal(true)}>
          + Create Invoice
        </MotionButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {invoices.map((invoice) => (
          <GlowCard key={invoice.id} glowColor="magenta" className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-white">{invoice.clientName}</h3>
              <span className={`text-xs px-2 py-1 rounded ${
                invoice.status === 'paid' ? 'bg-lime/20 text-lime' :
                invoice.status === 'overdue' ? 'bg-red-500/20 text-red-400' :
                invoice.status === 'sent' ? 'bg-cyan/20 text-cyan' :
                'bg-white/10 text-white/60'
              }`}>
                {invoice.status}
              </span>
            </div>
            <div className="text-3xl font-black text-magenta mb-2">
              ${invoice.amount.toLocaleString()}
            </div>
            <div className="text-white/60 text-sm">
              Due: {new Date(invoice.dueDate).toLocaleDateString()}
            </div>
          </GlowCard>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-ink border border-white/10 rounded-2xl p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-black text-white mb-6">Create Invoice</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-white mb-2">Client Name</label>
                <input
                  type="text"
                  value={newInvoice.clientName}
                  onChange={(e) => setNewInvoice({ ...newInvoice, clientName: e.target.value })}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Amount ($)</label>
                <input
                  type="number"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-2">Due Date</label>
                <input
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                  className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <MotionButton variant="primary" onClick={handleCreateInvoice} className="flex-1">
                Generate PDF
              </MotionButton>
              <MotionButton variant="ghost" onClick={() => setShowCreateModal(false)}>
                Cancel
              </MotionButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

