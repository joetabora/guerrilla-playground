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
  // Primary endpoint: /user/posts with user_id (confirmed working)
  const endpoints = [
    // Primary: user posts endpoint (requires user_id, not username)
    `https://tiktok-scraper7.p.rapidapi.com/user/posts?user_id=${TIKTOK_USER_ID}&count=6`,
    // Fallback: user story endpoint (might return stories from other users)
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
        
        // Debug: Log the response structure (full response for debugging)
        console.log(`[TikTok API] Response from ${endpoint}:`, JSON.stringify(data, null, 2));
        
        // Try different response structures
        // The /user/story endpoint might return different structures
        let videos: unknown[] = [];
        
        // Structure 1: data.data.videos (most common for this API)
        if (data.data?.videos && Array.isArray(data.data.videos)) {
          videos = data.data.videos;
        } else if (data.videos && Array.isArray(data.videos)) {
          videos = data.videos;
        } else if (data.data?.posts && Array.isArray(data.data.posts)) {
          videos = data.data.posts;
        } else if (data.posts && Array.isArray(data.posts)) {
          videos = data.posts;
        } else if (data.data?.items && Array.isArray(data.data.items)) {
          // Story endpoint might return items
          videos = data.data.items;
        } else if (data.items && Array.isArray(data.items)) {
          videos = data.items;
        } else if (data.data?.story && Array.isArray(data.data.story)) {
          // Story endpoint might return story array
          videos = data.data.story;
        } else if (data.story && Array.isArray(data.story)) {
          videos = data.story;
        } else if (data.data && Array.isArray(data.data)) {
          videos = data.data;
        } else if (Array.isArray(data)) {
          videos = data;
        }

        if (videos.length > 0) {
          console.log(`[TikTok API] Found ${videos.length} videos, parsing...`);
          console.log(`[TikTok API] First video structure:`, JSON.stringify(videos[0], null, 2));
          
          const mappedVideos = videos
            // Filter to only show videos from @suchgrime
            .filter((video: unknown) => {
              const v = video as Record<string, unknown>;
              const author = v.author as Record<string, unknown> | undefined;
              if (author) {
                const authorId = typeof author.id === 'string' ? author.id : String(author.id || '');
                const uniqueId = typeof author.unique_id === 'string' ? author.unique_id : '';
                // Match by user_id or unique_id
                return authorId === TIKTOK_USER_ID || uniqueId === TIKTOK_USERNAME || uniqueId === 'suchgrime';
              }
              return false;
            })
            .slice(0, 6)
            .map((video: unknown) => {
              const v = video as Record<string, unknown>;
              
              // Extract video ID - try multiple field names
              const videoId = typeof v.video_id === 'string' ? v.video_id :
                            typeof v.aweme_id === 'string' ? v.aweme_id :
                            typeof v.id === 'string' ? v.id :
                            typeof v.item_id === 'string' ? v.item_id :
                            typeof v.awemeId === 'string' ? v.awemeId :
                            String(v.video_id || v.aweme_id || v.id || v.item_id || v.awemeId || '');

            // Build video URL - try multiple formats
            const videoUrl = typeof v.video_url === 'string' ? v.video_url :
                          typeof v.url === 'string' ? v.url :
                          typeof v.share_url === 'string' ? v.share_url :
                          typeof v.webVideoUrl === 'string' ? v.webVideoUrl :
                          videoId ? `https://www.tiktok.com/@${TIKTOK_USERNAME}/video/${videoId}` : '';

            // Extract thumbnail - try multiple field names
            const videoObj = v.video as Record<string, unknown> | undefined;
            const thumbnail = typeof v.cover === 'string' ? v.cover :
                            typeof v.thumbnail === 'string' ? v.thumbnail :
                            typeof v.dynamic_cover === 'string' ? v.dynamic_cover :
                            typeof v.origin_cover === 'string' ? v.origin_cover :
                            typeof v.cover_url === 'string' ? v.cover_url :
                            (videoObj && typeof videoObj.cover === 'string') ? videoObj.cover :
                            (videoObj && typeof videoObj.dynamicCover === 'string') ? videoObj.dynamicCover :
                            (videoObj && typeof videoObj.originCover === 'string') ? videoObj.originCover :
                            '';

            // Extract caption - try multiple field names
            const caption = typeof v.title === 'string' ? v.title :
                          typeof v.desc === 'string' ? v.desc :
                          typeof v.text === 'string' ? v.text :
                          typeof v.description === 'string' ? v.description :
                          typeof v.caption === 'string' ? v.caption :
                          typeof v.content === 'string' ? v.content :
                          typeof v.desc_text === 'string' ? v.desc_text :
                          '';

            const mapped = {
              id: videoId,
              videoUrl,
              thumbnail,
              caption,
              views: typeof v.play_count === 'number' ? v.play_count :
                    typeof v.view_count === 'number' ? v.view_count :
                    typeof v.views === 'number' ? v.views :
                    (v.statistics && typeof (v.statistics as Record<string, unknown>).playCount === 'number') ? 
                      (v.statistics as Record<string, unknown>).playCount as number : undefined,
              likes: typeof v.digg_count === 'number' ? v.digg_count :
                    typeof v.like_count === 'number' ? v.like_count :
                    typeof v.likes === 'number' ? v.likes :
                    (v.statistics && typeof (v.statistics as Record<string, unknown>).diggCount === 'number') ? 
                      (v.statistics as Record<string, unknown>).diggCount as number : undefined,
              createdAt: typeof v.create_time === 'string' ? v.create_time :
                        typeof v.created_at === 'string' ? v.created_at :
                        typeof v.createTime === 'string' ? v.createTime : undefined,
            };
            
            console.log(`[TikTok API] Mapped video:`, mapped);
            return mapped;
          }).filter((v: TikTokVideo) => v.id && v.videoUrl); // Filter out invalid videos
          
          console.log(`[TikTok API] Successfully mapped ${mappedVideos.length} videos`);

          if (mappedVideos.length > 0) {
            console.log(`Successfully fetched ${mappedVideos.length} videos from ${endpoint}`);
            return mappedVideos;
          }
        }
      } else {
        const errorText = await response.text().catch(() => 'Could not read error');
        
        if (response.status === 403) {
          console.error(`[TikTok API] 403 Forbidden - You need to subscribe to the API on RapidAPI. Endpoint: ${endpoint}`);
        } else if (response.status === 429) {
          console.error(`[TikTok API] 429 Rate Limited - Too many requests. Wait before retrying. Endpoint: ${endpoint}`);
        } else {
          console.log(`[TikTok API] Endpoint ${endpoint} returned status ${response.status}:`, errorText.substring(0, 500));
        }
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

