/**
 * API Route: Generate Brief PDF
 * Creates a PDF from brief form data using PDFKit
 */
import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Create PDF document
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];
    
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {});
    
    // PDF Content
    doc.fontSize(24).text('Project Brief', { align: 'center' });
    doc.moveDown();
    
    // Brand Info
    doc.fontSize(18).text('Brand Information', { underline: true });
    doc.fontSize(12);
    doc.text(`Brand Name: ${data.brandName || 'N/A'}`);
    doc.text(`Contact: ${data.contactName || 'N/A'}`);
    doc.text(`Email: ${data.contactEmail || 'N/A'}`);
    if (data.website) doc.text(`Website: ${data.website}`);
    doc.moveDown();
    
    // Goals
    doc.fontSize(18).text('Campaign Goals', { underline: true });
    doc.fontSize(12);
    doc.text(`Primary Goal: ${data.primaryGoal || 'N/A'}`);
    doc.text(`Target Audience: ${data.targetAudience || 'N/A'}`);
    doc.text(`Key Messages: ${data.keyMessages || 'N/A'}`);
    doc.moveDown();
    
    // Deliverables
    doc.fontSize(18).text('Deliverables', { underline: true });
    doc.fontSize(12);
    doc.text(`Content Types: ${data.contentTypes?.join(', ') || 'N/A'}`);
    doc.text(`Platforms: ${data.platforms?.join(', ') || 'N/A'}`);
    if (data.deliverables?.length > 0) {
      doc.text(`Additional: ${data.deliverables.join(', ')}`);
    }
    doc.moveDown();
    
    // Budget
    doc.fontSize(18).text('Budget', { underline: true });
    doc.fontSize(12);
    doc.text(`Range: ${data.budgetRange || 'N/A'}`);
    if (data.budgetNotes) doc.text(`Notes: ${data.budgetNotes}`);
    doc.moveDown();
    
    // Timeline
    doc.fontSize(18).text('Timeline', { underline: true });
    doc.fontSize(12);
    doc.text(`Start Date: ${data.startDate || 'N/A'}`);
    doc.text(`End Date: ${data.endDate || 'N/A'}`);
    if (data.timelineNotes) doc.text(`Notes: ${data.timelineNotes}`);
    
    doc.end();
    
    // Wait for PDF to finish
    await new Promise((resolve) => {
      doc.on('end', resolve);
    });
    
    const pdfBuffer = Buffer.concat(chunks);
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="brief-${Date.now()}.pdf"`
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

