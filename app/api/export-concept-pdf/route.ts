/**
 * API Route: Export Concept PDF
 * Generates a PDF for a single creative concept
 */
import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';

export async function POST(request: NextRequest) {
  let concept;
  try {
    concept = await request.json();
    
    const doc = new PDFDocument({ margin: 50 });
    const chunks: Buffer[] = [];
    
    doc.on('data', (chunk) => chunks.push(chunk));
    
    // PDF Content
    doc.fontSize(24).text('Creative Concept', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(16).text('Hook', { underline: true });
    doc.fontSize(12).text(concept.hook || 'N/A');
    doc.moveDown();
    
    doc.fontSize(16).text('Script', { underline: true });
    doc.fontSize(12).text(concept.script || 'N/A');
    doc.moveDown();
    
    doc.fontSize(16).text('Visual Direction', { underline: true });
    doc.fontSize(12).text(concept.visual || 'N/A');
    doc.moveDown();
    
    doc.fontSize(16).text('Platform', { underline: true });
    doc.fontSize(12).text(concept.platform || 'N/A');
    
    doc.end();
    
    await new Promise((resolve) => {
      doc.on('end', resolve);
    });
    
    const pdfBuffer = Buffer.concat(chunks);
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="concept-${Date.now()}.pdf"`
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback: return JSON
    return NextResponse.json(
      { 
        error: 'PDF generation failed',
        concept,
        note: 'Download this JSON manually and convert to PDF'
      },
      { status: 500 }
    );
  }
}

