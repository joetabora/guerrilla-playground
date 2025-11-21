/**
 * API Route: Generate Creative Concepts
 * 
 * This route generates AI-powered creative concepts for campaigns.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Add your LLM provider URL and API key to .env:
 *    LLM_PROVIDER_URL=https://api.your-llm-provider.com/v1/chat/completions
 *    LLM_PROVIDER_KEY=your-api-key-here
 * 
 * 2. If env vars are not set, the route will return smart mock concepts
 *    using creative templates (no API calls needed for development).
 * 
 * 3. Replace this implementation with your actual LLM provider:
 *    - OpenAI: https://platform.openai.com/docs/api-reference
 *    - Anthropic: https://docs.anthropic.com/claude/reference
 *    - Custom: Update the fetch call below
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Concept {
  hook: string;
  script: string;
  visual: string;
  platform: string;
}

interface FormData {
  campaignName: string;
  productSummary: string;
  targetAudience: string;
  moodTone: string;
  desiredCTA: string;
  creativityLevel: number;
}

// Smart mock templates for development
const generateMockConcepts = (formData: FormData): Concept[] => {
  const templates = [
    {
      hook: `"POV: You just discovered ${formData.productSummary.split(' ').slice(0, 2).join(' ')}"`,
      script: `Start with a relatable moment. Show the problem your product solves. End with the solution and CTA.`,
      visual: `Close-up reaction shot, product reveal, lifestyle montage, text overlay with key benefit`,
      platform: 'TikTok'
    },
    {
      hook: `"This ${formData.moodTone} approach changed everything"`,
      script: `Hook with bold statement. Show transformation or before/after. Build anticipation. Deliver the payoff.`,
      visual: `Split screen comparison, dynamic transitions, bold typography, product hero shot`,
      platform: 'Reels'
    },
    {
      hook: `"Why ${formData.targetAudience.split(',')[0]} are switching to this"`,
      script: `Address the audience directly. Present the problem. Introduce the solution. Show proof. Call to action.`,
      visual: `Talking head intro, B-roll of product in use, testimonial overlay, clear CTA frame`,
      platform: 'YouTube Shorts'
    }
  ];

  // Adjust based on creativity level
  const creativity = formData.creativityLevel;
  if (creativity >= 8) {
    templates[0].hook = `"No one's talking about this ${formData.moodTone} hack"`;
    templates[1].platform = 'TikTok';
  }

  return templates;
};

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json();

    // Check if LLM provider is configured
    const llmUrl = process.env.LLM_PROVIDER_URL;
    const llmKey = process.env.LLM_PROVIDER_KEY;

    let concepts: Concept[];

    if (llmUrl && llmKey) {
      // Real LLM provider integration
      try {
        const prompt = `Generate 3 creative video concepts for a campaign. Return ONLY valid JSON, no markdown, no code blocks.

Campaign: ${formData.campaignName}
Product: ${formData.productSummary}
Audience: ${formData.targetAudience}
Mood: ${formData.moodTone}
CTA: ${formData.desiredCTA}
Creativity: ${formData.creativityLevel}/10

Return JSON format:
{
  "concepts": [
    {
      "hook": "one-line attention-grabbing hook (max 15 words)",
      "script": "2-line script description (15-25 words total)",
      "visual": "1-line visual direction/shot list",
      "platform": "TikTok" or "Reels" or "YouTube Shorts"
    }
  ]
}

Keep outputs SHORT and punchy.`;

        const response = await fetch(llmUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${llmKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4', // Adjust based on your provider
            messages: [
              { role: 'system', content: 'You are a creative director. Return only valid JSON.' },
              { role: 'user', content: prompt }
            ],
            temperature: formData.creativityLevel / 10,
            max_tokens: 500
          })
        });

        if (!response.ok) {
          throw new Error('LLM provider error');
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || '{}';
        
        // Parse JSON (handle markdown code blocks if present)
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { concepts: [] };
        concepts = parsed.concepts || [];
      } catch (error) {
        console.error('LLM error, falling back to mock:', error);
        concepts = generateMockConcepts(formData);
      }
    } else {
      // Use smart mock concepts
      concepts = generateMockConcepts(formData);
    }

    // Save to JSON
    const filePath = path.join(process.cwd(), 'data', 'concepts.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const allConcepts = JSON.parse(fileContent);

    const savedConcept = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      campaignName: formData.campaignName,
      concepts,
      formData
    };

    allConcepts.push(savedConcept);
    fs.writeFileSync(filePath, JSON.stringify(allConcepts, null, 2));

    return NextResponse.json({ concepts });
  } catch (error) {
    console.error('Error generating concepts:', error);
    return NextResponse.json(
      { error: 'Failed to generate concepts' },
      { status: 500 }
    );
  }
}

