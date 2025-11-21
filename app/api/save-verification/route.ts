/**
 * API Route: Save Verification
 * Saves verification data to /data/verifications.json
 * 
 * SECURITY NOTE: In production:
 * - Validate file uploads server-side
 * - Sanitize all inputs
 * - Upload files to secure storage (S3, etc.)
 * - Add rate limiting
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Sanitize inputs (basic example)
    const sanitized = {
      ...data,
      handle: data.handle?.trim().substring(0, 100),
      platform: data.platform?.trim().substring(0, 50),
      contentLinks: (data.contentLinks || []).map((link: string) => link.trim().substring(0, 500))
    };

    const filePath = path.join(process.cwd(), 'data', 'verifications.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const verifications = JSON.parse(fileContent);

    verifications.push(sanitized);

    fs.writeFileSync(filePath, JSON.stringify(verifications, null, 2));

    // Log to audit
    const auditPath = path.join(process.cwd(), 'data', 'audit.json');
    const auditContent = fs.readFileSync(auditPath, 'utf8');
    const audit = JSON.parse(auditContent);
    audit.push({
      id: `audit-${Date.now()}`,
      action: 'verification_submitted',
      userId: 'anonymous',
      details: { verificationId: sanitized.id },
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(auditPath, JSON.stringify(audit, null, 2));

    return NextResponse.json({ success: true, id: sanitized.id });
  } catch (error) {
    console.error('Error saving verification:', error);
    return NextResponse.json(
      { error: 'Failed to save verification' },
      { status: 500 }
    );
  }
}

