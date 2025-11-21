/**
 * Live Creator Bar - Marquee component showing real-time activity
 * Reads from /data/activity.json
 */
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllActivities, formatRelativeTime, type ActivityEvent } from '@/lib/activity';

export default function LiveCreatorBar() {
  const [activities, setActivities] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    // Load activities on mount
    setActivities(getAllActivities());

    // Refresh activities every 30 seconds
    const interval = setInterval(() => {
      // In a real app, this would fetch from an API
      // For now, we'll just reload from the JSON
      setActivities(getAllActivities());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Duplicate activities for seamless loop
  const duplicatedActivities = [...activities, ...activities];

  return (
    <div className="bg-ink border-y border-white/10 py-2 overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 px-4">
          <span className="text-magenta font-bold text-sm uppercase tracking-tight">Live</span>
          <span className="inline-block w-2 h-2 bg-magenta rounded-full ml-2 animate-pulse" />
        </div>
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -50 * activities.length * 200]
            }}
            transition={{
              duration: activities.length * 10,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ width: 'max-content' }}
          >
            {duplicatedActivities.map((activity, index) => (
              <div
                key={`${activity.id}-${index}`}
                className="flex items-center gap-3 whitespace-nowrap"
              >
                <span className="text-lg" aria-hidden="true">
                  {activity.icon}
                </span>
                <span className="text-white/80 text-sm">{activity.message}</span>
                <span className="text-white/40 text-xs">
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

