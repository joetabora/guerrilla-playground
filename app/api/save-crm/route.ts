/**
 * API Route: Save CRM Data
 * Saves CRM entities (clients, briefs, proposals, campaigns) to /data/crm.json
 * 
 * MIGRATION NOTE: To move to a real database:
 * - Replace fs operations with database queries
 * - Use transactions for related entities
 * - Add proper validation and constraints
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { type, item } = await request.json();
    
    const filePath = path.join(process.cwd(), 'data', 'crm.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const crmData = JSON.parse(fileContent);

    // Sanitize inputs
    const sanitized = {
      ...item,
      id: item.id || `${type}-${Date.now()}`,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update or create
    interface CRMItem { id: string }
    const array = crmData[type] || [];
    const index = array.findIndex((i: CRMItem) => i.id === sanitized.id);
    
    if (index >= 0) {
      array[index] = sanitized;
    } else {
      array.push(sanitized);
    }

    crmData[type] = array;
    fs.writeFileSync(filePath, JSON.stringify(crmData, null, 2));

    // Audit log
    const auditPath = path.join(process.cwd(), 'data', 'audit.json');
    const auditContent = fs.readFileSync(auditPath, 'utf8');
    const audit = JSON.parse(auditContent);
    audit.push({
      id: `audit-${Date.now()}`,
      action: `${type}_${index >= 0 ? 'updated' : 'created'}`,
      userId: 'current-user', // In production, get from auth
      details: { type, itemId: sanitized.id },
      timestamp: new Date().toISOString()
    });
    fs.writeFileSync(auditPath, JSON.stringify(audit, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving CRM data:', error);
    return NextResponse.json(
      { error: 'Failed to save' },
      { status: 500 }
    );
  }
}

