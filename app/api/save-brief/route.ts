/**
 * API Route: Save Brief to JSON
 * Saves brief data to /data/briefs.json
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Add metadata
    const brief = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...data
    };
    
    // Read existing briefs
    const filePath = path.join(process.cwd(), 'data', 'briefs.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const briefs = JSON.parse(fileContent);
    
    // Add new brief
    briefs.push(brief);
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(briefs, null, 2));
    
    console.log('Brief saved:', brief.id);
    
    return NextResponse.json({ success: true, id: brief.id });
  } catch (error) {
    console.error('Error saving brief:', error);
    return NextResponse.json(
      { error: 'Failed to save brief' },
      { status: 500 }
    );
  }
}

