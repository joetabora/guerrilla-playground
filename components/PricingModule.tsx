/**
 * Pricing Module - Three tiers with ROI calculator and comparison table
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import MotionButton from './MotionButton';
import GlowCard from './GlowCard';
import NeonDivider from './NeonDivider';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: 'magenta' | 'lime' | 'cyan';
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$5K',
    period: '/month',
    description: 'Perfect for testing the waters',
    color: 'magenta',
    features: [
      '5 Creator Partnerships',
      '10 UGC Assets',
      'Basic Analytics Dashboard',
      'Email Support',
      '1 Campaign per Month',
      'Content Strategy Session'
    ]
  },
  {
    name: 'Growth',
    price: '$15K',
    period: '/month',
    description: 'For brands ready to scale',
    color: 'lime',
    popular: true,
    features: [
      '20 Creator Partnerships',
      '50 UGC Assets',
      'Advanced Analytics & Reporting',
      'Dedicated Account Manager',
      '3 Campaigns per Month',
      'A/B Testing & Optimization',
      'Priority Support',
      'Custom Creative Direction'
    ]
  },
  {
    name: 'VIP Accelerator',
    price: 'Custom',
    period: '',
    description: 'Full-service partnership',
    color: 'cyan',
    features: [
      'Unlimited Creator Partnerships',
      'Unlimited UGC Assets',
      'Custom Reporting & Insights',
      '24/7 Dedicated Team',
      'Unlimited Campaigns',
      'White-Glove Service',
      'Exclusive Creator Access',
      'Strategic Consulting'
    ]
  }
];

export default function PricingModule() {
  const [adSpend, setAdSpend] = useState(10000);
  const [avgCPC, setAvgCPC] = useState(0.50);
  const [conversionRate, setConversionRate] = useState(3);
  const [roiResults, setRoiResults] = useState({
    reach: 0,
    sales: 0,
    roi: 0
  });

  const reachRef = useRef<HTMLDivElement>(null);
  const salesRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clicks = adSpend / avgCPC;
    const reach = clicks * 10; // Estimated reach multiplier
    const sales = clicks * (conversionRate / 100);
    const revenue = sales * 50; // Average order value
    const roi = ((revenue - adSpend) / adSpend) * 100;

    // Animate counters
    const animateValue = (ref: React.RefObject<HTMLDivElement>, start: number, end: number, suffix: string) => {
      if (!ref.current) return;
      gsap.to({ value: start }, {
        value: end,
        duration: 1,
        ease: 'power2.out',
        onUpdate: function() {
          if (ref.current) {
            const val = Math.round(this.targets()[0].value);
            ref.current.textContent = suffix === '%' 
              ? `${val.toFixed(1)}%`
              : suffix === '$'
              ? `$${val.toLocaleString()}`
              : `${val.toLocaleString()}`;
          }
        }
      });
    };

    animateValue(reachRef, roiResults.reach, reach, '');
    animateValue(salesRef, roiResults.sales, sales, '');
    animateValue(roiRef, roiResults.roi, roi, '%');

    setRoiResults({ reach, sales, roi });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adSpend, avgCPC, conversionRate]);

  return (
    <div className="space-y-20">
      {/* ROI Calculator */}
      <GlowCard glowColor="magenta" className="p-8">
        <h2 className="text-3xl font-black text-white mb-6 text-center">ROI Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-white mb-2">Ad Spend ($)</label>
            <input
              type="number"
              value={adSpend}
              onChange={(e) => setAdSpend(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
              min="0"
              step="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Avg CPC ($)</label>
            <input
              type="number"
              value={avgCPC}
              onChange={(e) => setAvgCPC(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-white mb-2">Conversion Rate (%)</label>
            <input
              type="number"
              value={conversionRate}
              onChange={(e) => setConversionRate(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 bg-charcoal border border-white/10 rounded-lg text-white focus:outline-none focus:border-magenta transition-colors"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>

        <NeonDivider color="magenta" className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-black text-magenta mb-2" ref={reachRef}>0</div>
            <div className="text-white/60 text-sm uppercase tracking-tight">Estimated Reach</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-lime mb-2" ref={salesRef}>0</div>
            <div className="text-white/60 text-sm uppercase tracking-tight">Estimated Sales</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-cyan mb-2" ref={roiRef}>0%</div>
            <div className="text-white/60 text-sm uppercase tracking-tight">Estimated ROI</div>
          </div>
        </div>
      </GlowCard>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_TIERS.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <GlowCard
              glowColor={tier.color}
              className={`${tier.popular ? 'ring-2 ring-lime' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-lime text-charcoal font-bold text-xs uppercase rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black text-magenta">{tier.price}</span>
                  <span className="text-white/60 text-sm">{tier.period}</span>
                </div>
                <p className="text-white/60 text-sm">{tier.description}</p>
              </div>

              <NeonDivider color={tier.color} className="my-6" />

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-white/80 text-sm">
                    <span className={`text-${tier.color} mt-0.5`}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <MotionButton
                variant={tier.popular ? 'secondary' : 'primary'}
                className="w-full"
                onClick={() => window.location.href = '/contact?plan=' + tier.name.toLowerCase()}
              >
                Book Strategy Call
              </MotionButton>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <GlowCard glowColor="cyan" className="p-8 overflow-x-auto">
        <h2 className="text-3xl font-black text-white mb-8 text-center">Plan Comparison</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 text-white/60 text-sm uppercase tracking-tight">Feature</th>
              {PRICING_TIERS.map((tier) => (
                <th key={tier.name} className="text-center py-4 text-white font-bold">
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { feature: 'Creator Partnerships', starter: '5', growth: '20', vip: 'Unlimited' },
              { feature: 'UGC Assets', starter: '10', growth: '50', vip: 'Unlimited' },
              { feature: 'Campaigns/Month', starter: '1', growth: '3', vip: 'Unlimited' },
              { feature: 'Account Manager', starter: 'Email', growth: 'Dedicated', vip: '24/7 Team' },
              { feature: 'Analytics', starter: 'Basic', growth: 'Advanced', vip: 'Custom' },
              { feature: 'Support', starter: 'Email', growth: 'Priority', vip: 'White-Glove' }
            ].map((row, idx) => (
              <motion.tr
                key={row.feature}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <td className="py-4 text-white/80 text-sm">{row.feature}</td>
                <td className="py-4 text-center text-white/60 text-sm">{row.starter}</td>
                <td className="py-4 text-center text-lime font-bold">{row.growth}</td>
                <td className="py-4 text-center text-cyan font-bold">{row.vip}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </GlowCard>
    </div>
  );
}

