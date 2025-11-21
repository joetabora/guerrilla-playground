/**
 * API Route: Mock Authentication
 * 
 * PRODUCTION MIGRATION:
 * Replace with real authentication:
 * - Verify magic link tokens
 * - Check against database
 * - Generate JWT tokens
 * - Set secure HTTP-only cookies
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    // Load users from JSON
    const usersPath = path.join(process.cwd(), 'data', 'users.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    
    // Find user (mock - in production, verify magic link token)
    interface User { email: string; id: string; role: string; name: string }
    const user = users.find((u: User) => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // In production, generate real JWT token
    // For now, return user data
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      token: `mock-token-${Date.now()}`
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

