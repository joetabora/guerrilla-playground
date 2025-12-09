/**
 * Test endpoint to debug TikTok API responses
 * Visit /api/tiktok/test to see raw API responses
 */

export async function GET() {
  const TIKTOK_API_KEY = process.env.TIKTOK_API_KEY;
  const TIKTOK_USER_ID = process.env.TIKTOK_USER_ID || '7128593328456041478';
  const TIKTOK_USERNAME = 'suchgrime';

  interface EndpointResult {
    endpoint: string;
    status?: number;
    hasData?: boolean;
    dataKeys?: string[];
    dataPreview?: string;
    fullData?: unknown;
    error?: string;
  }

  const results: {
    hasApiKey: boolean;
    apiKeyPreview: string;
    userId: string;
    username: string;
    endpoints: EndpointResult[];
    error?: string;
  } = {
    hasApiKey: !!TIKTOK_API_KEY,
    apiKeyPreview: TIKTOK_API_KEY ? TIKTOK_API_KEY.substring(0, 10) + '...' : 'NOT SET',
    userId: TIKTOK_USER_ID,
    username: TIKTOK_USERNAME,
    endpoints: [],
  };

  if (!TIKTOK_API_KEY) {
    return Response.json({
      ...results,
      error: 'TIKTOK_API_KEY not set in environment variables',
    });
  }

  const endpoints = [
    `https://tiktok-scraper7.p.rapidapi.com/user/posts?username=${TIKTOK_USERNAME}&count=6`,
    `https://tiktok-scraper7.p.rapidapi.com/user/profile?username=${TIKTOK_USERNAME}`,
    `https://tiktok-scraper7.p.rapidapi.com/user/story?user_id=${TIKTOK_USER_ID}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'x-rapidapi-key': TIKTOK_API_KEY,
          'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
        },
      });

      const status = response.status;
      const data = await response.json().catch(() => ({ error: 'Could not parse JSON' }));

      results.endpoints.push({
        endpoint,
        status,
        hasData: !!data,
        dataKeys: data && typeof data === 'object' ? Object.keys(data) : [],
        dataPreview: JSON.stringify(data).substring(0, 500),
        fullData: data,
      });
    } catch (error) {
      results.endpoints.push({
        endpoint,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return Response.json(results, { status: 200 });
}

