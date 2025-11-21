/**
 * API Route: Get Social Mentions
 * Returns mentions from /data/mentions.json
 */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'mentions.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const mentions = JSON.parse(fileContent);
    
    // Sort by timestamp (newest first)
    interface Mention {
      timestamp: string;
    }
    mentions.sort((a: Mention, b: Mention) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return NextResponse.json({ mentions });
  } catch (error) {
    console.error('Error loading mentions:', error);
    return NextResponse.json({ mentions: [] });
  }
}

