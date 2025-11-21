#!/usr/bin/env node

/**
 * Push Activity Script
 * Adds a new activity event to data/activity.json
 * 
 * Usage:
 *   node scripts/pushActivity.js "Creator joined" creator 🎬
 *   node scripts/pushActivity.js "Campaign launched" campaign 🚀
 */

const fs = require('fs');
const path = require('path');

const activityFile = path.join(__dirname, '../data/activity.json');

// Parse command line arguments
const message = process.argv[2];
const type = process.argv[3] || 'campaign';
const icon = process.argv[4] || '📊';

if (!message) {
  console.error('Usage: node scripts/pushActivity.js "message" [type] [icon]');
  console.error('Example: node scripts/pushActivity.js "New creator joined" creator 🎬');
  process.exit(1);
}

// Validate type
const validTypes = ['creator', 'campaign', 'achievement'];
if (!validTypes.includes(type)) {
  console.error(`Invalid type. Must be one of: ${validTypes.join(', ')}`);
  process.exit(1);
}

try {
  // Read existing activities
  const data = fs.readFileSync(activityFile, 'utf8');
  const activities = JSON.parse(data);

  // Create new activity
  const newActivity = {
    id: Date.now().toString(),
    type: type,
    message: message,
    timestamp: new Date().toISOString(),
    icon: icon
  };

  // Add to beginning of array (most recent first)
  activities.unshift(newActivity);

  // Keep only last 50 activities
  if (activities.length > 50) {
    activities.splice(50);
  }

  // Write back to file
  fs.writeFileSync(activityFile, JSON.stringify(activities, null, 2));

  console.log('✅ Activity added successfully!');
  console.log(`   ${icon} ${message}`);
  console.log(`   Type: ${type}`);
  console.log(`   Timestamp: ${newActivity.timestamp}`);
} catch (error) {
  console.error('❌ Error adding activity:', error.message);
  process.exit(1);
}

