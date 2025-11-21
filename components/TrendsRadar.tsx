/**
 * Trends Radar Component
 * Radial heatmap visualization using SVG
 * Shows trend intensity across different categories
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import trendsData from '@/data/trends.json';

type Category = 'Beauty' | 'Lifestyle' | 'Gaming' | 'Tech';
type TrendData = Array<{ name: string; intensity: number; angle: number }>;

export default function TrendsRadar() {
  const [category, setCategory] = useState<Category>('Beauty');
  const [trends, setTrends] = useState<TrendData>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const categoryData = (trendsData as Record<Category, TrendData>)[category];
    setTrends(categoryData || []);
  }, [category]);

  const centerX = 300;
  const centerY = 300;
  const maxRadius = 250;
  const numRings = 5;

  const getColor = (intensity: number) => {
    if (intensity >= 80) return '#FF2D95'; // Magenta
    if (intensity >= 60) return '#A6FF00'; // Lime
    if (intensity >= 40) return '#00FFD6'; // Cyan
    return 'rgba(255, 255, 255, 0.2)'; // Low intensity
  };

  const angleToRadians = (angle: number) => (angle * Math.PI) / 180;

  return (
    <div className="bg-ink border border-white/10 rounded-2xl p-8">
      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {(['Beauty', 'Lifestyle', 'Gaming', 'Tech'] as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-3 font-bold rounded-lg transition-all ${
              category === cat
                ? 'bg-magenta text-white shadow-glow-magenta'
                : 'bg-charcoal text-white/60 hover:text-white border border-white/10'
            }`}
            aria-label={`Switch to ${cat} category`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SVG Radar Chart */}
      <div className="flex justify-center">
        <svg
          ref={svgRef}
          width="600"
          height="600"
          viewBox="0 0 600 600"
          className="max-w-full"
        >
          {/* Background Circles */}
          {Array.from({ length: numRings }).map((_, i) => {
            const radius = (maxRadius / numRings) * (i + 1);
            return (
              <circle
                key={i}
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            );
          })}

          {/* Axis Lines */}
          {trends.map((trend, i) => {
            const angle = angleToRadians(trend.angle - 90);
            const x = centerX + maxRadius * Math.cos(angle);
            const y = centerY + maxRadius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            );
          })}

          {/* Trend Areas */}
          {trends.map((trend, i) => {
            const angle = angleToRadians(trend.angle - 90);
            const radius = (trend.intensity / 100) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const nextTrend = trends[(i + 1) % trends.length];
            const nextAngle = angleToRadians(nextTrend.angle - 90);
            const nextRadius = (nextTrend.intensity / 100) * maxRadius;
            const nextX = centerX + nextRadius * Math.cos(nextAngle);
            const nextY = centerY + nextRadius * Math.sin(nextAngle);

            // Create polygon path
            const pathData = `M ${centerX} ${centerY} L ${x} ${y} A ${radius} ${radius} 0 0 1 ${nextX} ${nextY} Z`;

            return (
              <motion.g key={i}>
                <motion.path
                  d={pathData}
                  fill={getColor(trend.intensity)}
                  opacity={0.6}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={getColor(trend.intensity)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
                />
                {/* Trend Label */}
                <motion.text
                  x={centerX + (maxRadius + 30) * Math.cos(angle)}
                  y={centerY + (maxRadius + 30) * Math.sin(angle)}
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                >
                  {trend.name}
                </motion.text>
                {/* Intensity Label */}
                <motion.text
                  x={x}
                  y={y - 15}
                  fill="white"
                  fontSize="12"
                  textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.5 }}
                >
                  {trend.intensity}%
                </motion.text>
              </motion.g>
            );
          })}

          {/* Center Point */}
          <circle cx={centerX} cy={centerY} r="4" fill="white" />
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-magenta rounded" />
          <span className="text-white/60 text-sm">High (80%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-lime rounded" />
          <span className="text-white/60 text-sm">Medium (60-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan rounded" />
          <span className="text-white/60 text-sm">Low (40-59%)</span>
        </div>
      </div>
    </div>
  );
}

