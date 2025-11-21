/**
 * Analytics Dashboard - Campaign KPIs and visualizations
 */
'use client';

import { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Papa from 'papaparse';
import GlowCard from './GlowCard';
import MotionButton from './MotionButton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsDashboard() {
  const [kpis, setKpis] = useState({
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0
  });

  useEffect(() => {
    // Mock data aggregation from /data
    setKpis({
      impressions: 1250000,
      clicks: 45000,
      conversions: 1250,
      revenue: 62500
    });
  }, []);

  const lineData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Impressions',
      data: [800000, 950000, 1100000, 1250000],
      borderColor: '#FF2D95',
      backgroundColor: 'rgba(255, 45, 149, 0.1)'
    }]
  };

  const barData = {
    labels: ['TikTok', 'Instagram', 'YouTube', 'Twitter'],
    datasets: [{
      label: 'Engagement',
      data: [45000, 32000, 28000, 15000],
      backgroundColor: ['#FF2D95', '#A6FF00', '#00FFD6', '#B026FF']
    }]
  };

  const handleExportCSV = () => {
    const data = [
      ['Metric', 'Value'],
      ['Impressions', kpis.impressions],
      ['Clicks', kpis.clicks],
      ['Conversions', kpis.conversions],
      ['Revenue', kpis.revenue]
    ];
    
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `campaign-report-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlowCard glowColor="magenta" className="p-6 text-center">
          <div className="text-4xl font-black text-magenta mb-2">
            {kpis.impressions.toLocaleString()}
          </div>
          <div className="text-white/60 text-sm uppercase">Impressions</div>
        </GlowCard>
        <GlowCard glowColor="lime" className="p-6 text-center">
          <div className="text-4xl font-black text-lime mb-2">
            {kpis.clicks.toLocaleString()}
          </div>
          <div className="text-white/60 text-sm uppercase">Clicks</div>
        </GlowCard>
        <GlowCard glowColor="cyan" className="p-6 text-center">
          <div className="text-4xl font-black text-cyan mb-2">
            {kpis.conversions.toLocaleString()}
          </div>
          <div className="text-white/60 text-sm uppercase">Conversions</div>
        </GlowCard>
        <GlowCard glowColor="magenta" className="p-6 text-center">
          <div className="text-4xl font-black text-magenta mb-2">
            ${kpis.revenue.toLocaleString()}
          </div>
          <div className="text-white/60 text-sm uppercase">Revenue</div>
        </GlowCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlowCard glowColor="cyan" className="p-6">
          <h3 className="text-xl font-black text-white mb-4">Impressions Over Time</h3>
          <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
        </GlowCard>
        <GlowCard glowColor="lime" className="p-6">
          <h3 className="text-xl font-black text-white mb-4">Engagement by Platform</h3>
          <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
        </GlowCard>
      </div>

      <div className="flex justify-end">
        <MotionButton variant="primary" onClick={handleExportCSV}>
          Export CSV Report
        </MotionButton>
      </div>
    </div>
  );
}

