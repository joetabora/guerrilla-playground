/**
 * API Route: Get CRM Data
 * Returns all CRM data from /data/crm.json
 */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'crm.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const crmData = JSON.parse(fileContent);
    return NextResponse.json(crmData);
  } catch (error) {
    console.error('Error loading CRM data:', error);
    return NextResponse.json({
      clients: [],
      briefs: [],
      proposals: [],
      campaigns: []
    });
  }
}

