/**
 * API route to fetch latest TikTok videos from @suchgrime
 * Uses third-party TikTok API or alternative methods
 */

interface TikTokVideo {
  id: string;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  views?: number;
  likes?: number;
  createdAt?: string;
}

// Cache for TikTok videos
let cachedVideos: TikTokVideo[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes (TikTok updates less frequently)

async function fetchTikTokVideosFromAPI(): Promise<TikTokVideo[]> {
  const TIKTOK_API_KEY = process.env.TIKTOK_API_KEY;
  const TIKTOK_USER_ID = process.env.TIKTOK_USER_ID || '7128593328456041478'; // @suchgrime user ID
  const TIKTOK_USERNAME = 'suchgrime';

  if (!TIKTOK_API_KEY) {
    console.log('[TikTok API] No API key found in environment variables');
    return [];
  }
  
  console.log('[TikTok API] Starting fetch with key:', TIKTOK_API_KEY.substring(0, 10) + '...');

  // Try multiple endpoints from tiktok-scraper7
  const endpoints = [
    // Try user videos endpoint (if available)
    `https://tiktok-scraper7.p.rapidapi.com/user/posts?username=${TIKTOK_USERNAME}&count=6`,
    // Try user profile with videos
    `https://tiktok-scraper7.p.rapidapi.com/user/profile?username=${TIKTOK_USERNAME}`,
    // Try user story (might contain videos)
    `https://tiktok-scraper7.p.rapidapi.com/user/story?user_id=${TIKTOK_USER_ID}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'x-rapidapi-key': TIKTOK_API_KEY,
          'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com',
        },
        next: { revalidate: 600 }, // 10 minutes
      });

      if (response.ok) {
        const data = await response.json();
        
        // Debug: Log the response structure
        console.log(`[TikTok API] Response from ${endpoint}:`, JSON.stringify(data, null, 2).substring(0, 1000));
        
        // Try different response structures
        let videos: unknown[] = [];
        
        // Structure 1: data.videos or data.data.videos
        if (data.data?.videos && Array.isArray(data.data.videos)) {
          videos = data.data.videos;
        } else if (data.videos && Array.isArray(data.videos)) {
          videos = data.videos;
        } else if (data.data?.posts && Array.isArray(data.data.posts)) {
          videos = data.data.posts;
        } else if (data.posts && Array.isArray(data.posts)) {
          videos = data.posts;
        } else if (data.data && Array.isArray(data.data)) {
          videos = data.data;
        } else if (Array.isArray(data)) {
          videos = data;
        }

        if (videos.length > 0) {
          const mappedVideos = videos.slice(0, 6).map((video: unknown) => {
            const v = video as Record<string, unknown>;
            // Extract video ID
            const videoId = typeof v.id === 'string' ? v.id :
                          typeof v.aweme_id === 'string' ? v.aweme_id :
                          typeof v.video_id === 'string' ? v.video_id :
                          String(v.id || v.aweme_id || v.video_id || '');

            // Build video URL
            const videoUrl = typeof v.video_url === 'string' ? v.video_url :
                          typeof v.url === 'string' ? v.url :
                          `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${videoId}`;

            // Extract thumbnail
            const thumbnail = typeof v.cover === 'string' ? v.cover :
                            typeof v.thumbnail === 'string' ? v.thumbnail :
                            typeof v.dynamic_cover === 'string' ? v.dynamic_cover :
                            typeof v.origin_cover === 'string' ? v.origin_cover :
                            typeof v.cover_url === 'string' ? v.cover_url :
                            '';

            // Extract caption
            const caption = typeof v.desc === 'string' ? v.desc :
                          typeof v.text === 'string' ? v.text :
                          typeof v.description === 'string' ? v.description :
                          typeof v.caption === 'string' ? v.caption :
                          '';

            return {
              id: videoId,
              videoUrl,
              thumbnail,
              caption,
              views: typeof v.play_count === 'number' ? v.play_count :
                    typeof v.view_count === 'number' ? v.view_count :
                    typeof v.views === 'number' ? v.views : undefined,
              likes: typeof v.digg_count === 'number' ? v.digg_count :
                    typeof v.like_count === 'number' ? v.like_count :
                    typeof v.likes === 'number' ? v.likes : undefined,
              createdAt: typeof v.create_time === 'string' ? v.create_time :
                        typeof v.created_at === 'string' ? v.created_at : undefined,
            };
          }).filter((v: TikTokVideo) => v.id && v.videoUrl); // Filter out invalid videos

          if (mappedVideos.length > 0) {
            console.log(`Successfully fetched ${mappedVideos.length} videos from ${endpoint}`);
            return mappedVideos;
          }
        }
      } else {
        const errorText = await response.text().catch(() => 'Could not read error');
        console.log(`[TikTok API] Endpoint ${endpoint} returned status ${response.status}:`, errorText.substring(0, 500));
      }
    } catch (error) {
      console.error(`Error fetching from ${endpoint}:`, error);
      // Continue to next endpoint
    }
  }

  return [];
}

async function fetchTikTokVideosFromLocal(): Promise<TikTokVideo[]> {
  // Fallback to local JSON file if API fails
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'data', 'tiktok-videos.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    
    if (data.videos && Array.isArray(data.videos)) {
      return data.videos;
    }
  } catch (error) {
    console.error('Local file read error:', error);
  }

  return [];
}

export async function GET() {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedVideos && (now - cacheTimestamp) < CACHE_DURATION) {
      return Response.json({ videos: cachedVideos, cached: true });
    }

    // Try API first
    let videos = await fetchTikTokVideosFromAPI();
    
    // If API didn't work, try local file
    if (videos.length === 0) {
      videos = await fetchTikTokVideosFromLocal();
    }

    // Update cache
    cachedVideos = videos;
    cacheTimestamp = now;

    // If still no videos, return empty array (component will handle fallback)
    return Response.json({ videos, cached: false });
  } catch (error) {
    console.error('Error in TikTok videos API route:', error);
    return Response.json({ videos: [], error: 'Failed to fetch TikTok videos' });
  }
}

