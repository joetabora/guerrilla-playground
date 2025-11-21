/**
 * API Route: Get Invoices
 * Returns invoices from /data/invoices.json
 */
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'invoices.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ invoices: [] });
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ invoices: [] });
  }
}

