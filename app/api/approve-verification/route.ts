/**
 * API Route: Approve/Reject Verification
 * Admin action to approve or reject creator verification
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { verificationId, action, reviewedBy } = await request.json();
    
    const filePath = path.join(process.cwd(), 'data', 'verifications.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const verifications = JSON.parse(fileContent);
    
    interface Verification { id: string }
    const index = verifications.findIndex((v: Verification) => v.id === verificationId);
    if (index >= 0) {
      verifications[index].status = action; // 'approved' or 'rejected'
      verifications[index].reviewedBy = reviewedBy;
      verifications[index].reviewedAt = new Date().toISOString();
      
      fs.writeFileSync(filePath, JSON.stringify(verifications, null, 2));
      
      // Audit log
      const auditPath = path.join(process.cwd(), 'data', 'audit.json');
      const auditContent = fs.readFileSync(auditPath, 'utf8');
      const audit = JSON.parse(auditContent);
      audit.push({
        id: `audit-${Date.now()}`,
        action: `verification_${action}`,
        userId: reviewedBy,
        details: { verificationId },
        timestamp: new Date().toISOString()
      });
      fs.writeFileSync(auditPath, JSON.stringify(audit, null, 2));
    }
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update verification' },
      { status: 500 }
    );
  }
}

