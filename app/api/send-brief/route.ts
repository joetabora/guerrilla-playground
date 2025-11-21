/**
 * API Route: Send Brief Email (Stub)
 * Email stub - logs to console instead of sending real email
 */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Email stub - just log to console
    console.log('=== BRIEF EMAIL STUB ===');
    console.log('To: team@guerrillasocialclub.com');
    console.log('Subject: New Project Brief Submitted');
    console.log('From:', data.contactEmail);
    console.log('Brand:', data.brandName);
    console.log('Contact:', data.contactName);
    console.log('Goal:', data.primaryGoal);
    console.log('Budget:', data.budgetRange);
    console.log('Timeline:', data.startDate, 'to', data.endDate);
    console.log('========================');
    
    // In production, this would use SendGrid, Resend, or similar
    // await sendEmail({
    //   to: 'team@guerrillasocialclub.com',
    //   subject: 'New Project Brief',
    //   html: generateEmailTemplate(data)
    // });
    
    return NextResponse.json({ success: true, message: 'Email sent (stub)' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

