/**
 * API Route: Save Creator Badge
 * Saves badge to /data/creator-badges.json
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { creatorId, badge, timestamp } = await request.json();
    
    // Read existing badges
    const filePath = path.join(process.cwd(), 'data', 'creator-badges.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const badges = JSON.parse(fileContent);
    
    // Add/update badge
    badges[creatorId] = {
      badge,
      timestamp,
      createdAt: new Date().toISOString()
    };
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(badges, null, 2));
    
    console.log('Badge saved:', creatorId, badge);
    
    return NextResponse.json({ success: true, badge });
  } catch (error) {
    console.error('Error saving badge:', error);
    return NextResponse.json(
      { error: 'Failed to save badge' },
      { status: 500 }
    );
  }
}

