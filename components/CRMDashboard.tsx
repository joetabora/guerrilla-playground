/**
 * CRM Dashboard Component
 * CRUD operations for clients, briefs, proposals, campaigns
 */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlowCard from './GlowCard';
import MotionButton from './MotionButton';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  createdAt: string;
}

interface Brief {
  id: string;
  clientId: string;
  title: string;
  status: string;
  createdAt: string;
}

interface Proposal {
  id: string;
  briefId: string;
  title: string;
  status: 'draft' | 'review' | 'approved' | 'archived';
  comments: Array<{ id: string; user: string; text: string; timestamp: string }>;
  createdAt: string;
}

interface Campaign {
  id: string;
  proposalId: string;
  name: string;
  status: string;
  budget: number;
  createdAt: string;
}

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState<'clients' | 'briefs' | 'proposals' | 'campaigns'>('clients');
  const [crmData, setCrmData] = useState<{
    clients: Client[];
    briefs: Brief[];
    proposals: Proposal[];
    campaigns: Campaign[];
  }>({
    clients: [],
    briefs: [],
    proposals: [],
    campaigns: []
  });
  const [selectedItem, setSelectedItem] = useState<Client | Brief | Proposal | Campaign | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    loadCRMData();
  }, []);

  const loadCRMData = async () => {
    try {
      const response = await fetch('/api/get-crm');
      if (response.ok) {
        const data = await response.json();
        setCrmData(data);
      }
    } catch (error) {
      console.error('Error loading CRM data:', error);
    }
  };

  const handleSave = async (type: string, item: Client | Brief | Proposal | Campaign) => {
    try {
      await fetch('/api/save-crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, item })
      });
      loadCRMData();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleAddComment = (proposalId: string) => {
    if (!newComment.trim()) return;

    const comment = {
      id: `comment-${Date.now()}`,
      user: 'Current User', // In production, get from auth
      text: newComment,
      timestamp: new Date().toISOString()
    };

    const proposal = crmData.proposals.find(p => p.id === proposalId);
    if (proposal) {
      proposal.comments = [...(proposal.comments || []), comment];
      handleSave('proposals', proposal);
      setNewComment('');
    }
  };

  const tabs = [
    { id: 'clients', label: 'Clients' },
    { id: 'briefs', label: 'Briefs' },
    { id: 'proposals', label: 'Proposals' },
    { id: 'campaigns', label: 'Campaigns' }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'clients' | 'briefs' | 'proposals' | 'campaigns')}
            className={`px-6 py-3 font-bold transition-colors ${
              activeTab === tab.id
                ? 'text-magenta border-b-2 border-magenta'
                : 'text-white/60 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          {activeTab === 'clients' && (
            <div className="space-y-4">
              {crmData.clients.map((client) => (
                <GlowCard key={client.id} glowColor="magenta" className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-white">{client.name}</h3>
                      <p className="text-white/60 text-sm">{client.company}</p>
                      <p className="text-white/40 text-xs">{client.email}</p>
                    </div>
                    <MotionButton variant="ghost" onClick={() => {
                      setSelectedItem(client);
                      setShowModal(true);
                    }}>
                      Edit
                    </MotionButton>
                  </div>
                </GlowCard>
              ))}
              <MotionButton variant="primary" onClick={() => {
                setSelectedItem({ id: `client-${Date.now()}`, name: '', email: '', company: '', createdAt: new Date().toISOString() });
                setShowModal(true);
              }}>
                + Add Client
              </MotionButton>
            </div>
          )}

          {activeTab === 'proposals' && (
            <div className="space-y-4">
              {crmData.proposals.map((proposal) => (
                <GlowCard key={proposal.id} glowColor="cyan" className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-black text-white">{proposal.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        proposal.status === 'approved' ? 'bg-lime/20 text-lime' :
                        proposal.status === 'review' ? 'bg-cyan/20 text-cyan' :
                        proposal.status === 'archived' ? 'bg-white/10 text-white/60' :
                        'bg-magenta/20 text-magenta'
                      }`}>
                        {proposal.status}
                      </span>
                    </div>
                    <MotionButton variant="ghost" onClick={() => {
                      setSelectedItem(proposal);
                      setShowModal(true);
                    }}>
                      View
                    </MotionButton>
                  </div>
                  
                  {/* Comments */}
                  <div className="space-y-2 mb-4">
                    {(proposal.comments || []).map((comment) => (
                      <div key={comment.id} className="bg-charcoal rounded p-2 text-sm">
                        <div className="text-white/60 text-xs mb-1">{comment.user} • {new Date(comment.timestamp).toLocaleString()}</div>
                        <div className="text-white/80">{comment.text}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add comment..."
                      className="flex-1 px-3 py-2 bg-charcoal border border-white/10 rounded text-white text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(proposal.id);
                        }
                      }}
                    />
                    <MotionButton variant="ghost" onClick={() => handleAddComment(proposal.id)}>
                      Send
                    </MotionButton>
                  </div>
                </GlowCard>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Stats */}
        <GlowCard glowColor="lime" className="p-6">
          <h3 className="text-xl font-black text-white mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-black text-lime mb-1">{crmData.clients.length}</div>
              <div className="text-white/60 text-sm">Total Clients</div>
            </div>
            <div>
              <div className="text-3xl font-black text-cyan mb-1">{crmData.proposals.filter(p => p.status === 'approved').length}</div>
              <div className="text-white/60 text-sm">Approved Proposals</div>
            </div>
            <div>
              <div className="text-3xl font-black text-magenta mb-1">{crmData.campaigns.length}</div>
              <div className="text-white/60 text-sm">Active Campaigns</div>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Edit Modal */}
      {showModal && selectedItem && selectedItem !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-ink border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-black text-white mb-6">Edit {activeTab.slice(0, -1)}</h2>
            {/* Form fields would go here */}
            <div className="flex gap-4">
              <MotionButton variant="primary" onClick={() => {
                if (selectedItem) {
                  handleSave(activeTab, selectedItem as Client | Brief | Proposal | Campaign);
                }
              }}>
                Save
              </MotionButton>
              <MotionButton variant="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </MotionButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

