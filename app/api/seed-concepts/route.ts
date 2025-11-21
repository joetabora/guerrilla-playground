/**
 * API Route: Seed Creative Concepts
 * Adds example creative concepts to /data/concepts.json
 */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SAMPLE_CONCEPTS = [
  {
    id: `concept-${Date.now()}-1`,
    timestamp: new Date().toISOString(),
    campaignName: 'Summer Launch 2024',
    concepts: [
      {
        hook: 'POV: You just discovered the perfect summer product',
        script: 'Start with a relatable summer moment. Show the product solving a common problem. End with transformation.',
        visual: 'Beach scene, product reveal, lifestyle montage, text overlay',
        platform: 'TikTok'
      },
      {
        hook: 'This summer essential changed everything',
        script: 'Hook with bold statement. Show before/after. Build anticipation. Deliver the payoff.',
        visual: 'Split screen comparison, dynamic transitions, product hero shot',
        platform: 'Reels'
      },
      {
        hook: 'Why everyone is switching to this for summer',
        script: 'Address audience directly. Present problem. Introduce solution. Show proof. Call to action.',
        visual: 'Talking head intro, B-roll of product, testimonial overlay, CTA frame',
        platform: 'YouTube Shorts'
      }
    ],
    formData: {
      campaignName: 'Summer Launch 2024',
      productSummary: 'Premium summer essentials collection',
      targetAudience: 'Gen Z and Millennials, ages 18-35',
      moodTone: 'energetic',
      desiredCTA: 'purchases',
      creativityLevel: 7
    }
  }
];

export async function POST() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'concepts.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const concepts = JSON.parse(fileContent);
    
    concepts.unshift(...SAMPLE_CONCEPTS);
    
    fs.writeFileSync(filePath, JSON.stringify(concepts, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      added: SAMPLE_CONCEPTS.length,
      total: concepts.length 
    });
  } catch (error) {
    console.error('Error seeding concepts:', error);
    return NextResponse.json(
      { error: 'Failed to seed concepts' },
      { status: 500 }
    );
  }
}

