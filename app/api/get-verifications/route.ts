/**
 * API Route: Get Verifications
 * Returns verifications with filters
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const filePath = path.join(process.cwd(), 'data', 'verifications.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let verifications = JSON.parse(fileContent);
    
    interface Verification { status: string }
    if (status) {
      verifications = verifications.filter((v: Verification) => v.status === status);
    }
    
    return NextResponse.json({ verifications });
  } catch {
    return NextResponse.json({ verifications: [] });
  }
}

