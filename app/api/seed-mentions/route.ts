/**
 * API Route: Seed Social Mentions
 * Adds realistic test mentions to /data/mentions.json
 */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SAMPLE_MENTIONS = [
  {
    platform: 'TikTok',
    text: 'Just tried this product and it\'s actually amazing!',
    author: 'user123',
    engagement: 1250
  },
  {
    platform: 'Instagram',
    text: 'Love this brand! The quality is incredible 🔥',
    author: 'influencer_amy',
    engagement: 3200
  },
  {
    platform: 'Twitter',
    text: 'This is the best purchase I\'ve made this year',
    author: 'techreviewer',
    engagement: 890
  },
  {
    platform: 'TikTok',
    text: 'POV: You just discovered your new favorite product',
    author: 'trendsetter',
    engagement: 5600
  },
  {
    platform: 'Instagram',
    text: 'Unboxing this was so satisfying! Highly recommend',
    author: 'lifestyle_creator',
    engagement: 2100
  }
];

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'mentions.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const mentions = JSON.parse(fileContent);
    
    // Add 3-5 random sample mentions
    const count = Math.floor(Math.random() * 3) + 3;
    const newMentions = [];
    
    for (let i = 0; i < count; i++) {
      const sample = SAMPLE_MENTIONS[Math.floor(Math.random() * SAMPLE_MENTIONS.length)];
      newMentions.push({
        id: `mention-${Date.now()}-${i}`,
        ...sample,
        timestamp: new Date().toISOString(),
        url: `https://${sample.platform.toLowerCase()}.com/${sample.author}`
      });
    }
    
    mentions.unshift(...newMentions);
    
    // Keep only last 100 mentions
    if (mentions.length > 100) {
      mentions.splice(100);
    }
    
    fs.writeFileSync(filePath, JSON.stringify(mentions, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      added: newMentions.length,
      total: mentions.length 
    });
  } catch (error) {
    console.error('Error seeding mentions:', error);
    return NextResponse.json(
      { error: 'Failed to seed mentions' },
      { status: 500 }
    );
  }
}

