/**
 * API Route: Get Creative Concepts
 * Returns concepts from /data/concepts.json
 */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'concepts.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const concepts = JSON.parse(fileContent);
    
    return NextResponse.json({ concepts });
  } catch (error) {
    console.error('Error loading concepts:', error);
    return NextResponse.json({ concepts: [] });
  }
}

