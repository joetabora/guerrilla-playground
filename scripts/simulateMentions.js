#!/usr/bin/env node

/**
 * Simulate Mentions Script
 * Adds realistic social mention events to data/mentions.json
 * 
 * Usage:
 *   node scripts/simulateMentions.js
 *   node scripts/simulateMentions.js --count 10
 */

const fs = require('fs');
const path = require('path');

const mentionsFile = path.join(__dirname, '../data/mentions.json');

const PLATFORMS = ['TikTok', 'Instagram', 'Twitter'];
const SAMPLE_TEXTS = {
  TikTok: [
    'POV: You just discovered the best product',
    'This changed my life fr',
    'No one is talking about this',
    'This is actually so good',
    'Y\'all need to try this'
  ],
  Instagram: [
    'Love this brand! Quality is amazing 🔥',
    'Just unboxed this and I\'m obsessed',
    'This is my new favorite thing',
    'Highly recommend checking this out',
    'The packaging alone is worth it'
  ],
  Twitter: [
    'This product is actually incredible',
    'Best purchase I\'ve made this year',
    'Why did no one tell me about this?',
    'This is a game changer',
    '10/10 would recommend'
  ]
};

const SAMPLE_AUTHORS = [
  'user123', 'influencer_amy', 'techreviewer', 'trendsetter',
  'lifestyle_creator', 'beauty_guru', 'fashionista', 'foodie_lover'
];

function generateMention() {
  const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
  const texts = SAMPLE_TEXTS[platform];
  const text = texts[Math.floor(Math.random() * texts.length)];
  const author = SAMPLE_AUTHORS[Math.floor(Math.random() * SAMPLE_AUTHORS.length)];
  const engagement = Math.floor(Math.random() * 5000) + 100;

  return {
    id: `mention-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    platform,
    text,
    author,
    timestamp: new Date().toISOString(),
    engagement,
    url: `https://${platform.toLowerCase()}.com/${author}`
  };
}

const args = process.argv.slice(2);
const countArg = args.find(arg => arg.startsWith('--count='));
const count = countArg ? parseInt(countArg.split('=')[1]) : 5;

try {
  // Read existing mentions
  const data = fs.readFileSync(mentionsFile, 'utf8');
  const mentions = JSON.parse(data);

  // Generate new mentions
  const newMentions = [];
  for (let i = 0; i < count; i++) {
    newMentions.push(generateMention());
  }

  // Add to beginning
  mentions.unshift(...newMentions);

  // Keep only last 100
  if (mentions.length > 100) {
    mentions.splice(100);
  }

  // Write back
  fs.writeFileSync(mentionsFile, JSON.stringify(mentions, null, 2));

  console.log(`✅ Added ${count} mentions successfully!`);
  console.log(`   Total mentions: ${mentions.length}`);
  newMentions.forEach((m, i) => {
    console.log(`   ${i + 1}. [${m.platform}] @${m.author}: ${m.text.substring(0, 40)}...`);
  });
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

