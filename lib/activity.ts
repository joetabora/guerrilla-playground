/**
 * Activity Feed Utilities
 * Reads and processes activity data from JSON file
 */
import activityData from '@/data/activity.json';

export interface ActivityEvent {
  id: string;
  type: 'creator' | 'campaign' | 'achievement';
  message: string;
  timestamp: string;
  icon: string;
}

/**
 * Get all activity events (sorted by most recent)
 */
export function getAllActivities(): ActivityEvent[] {
  return (activityData as ActivityEvent[]).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return time.toLocaleDateString();
}

