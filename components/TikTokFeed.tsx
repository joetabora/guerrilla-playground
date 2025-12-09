'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TikTokVideo {
  id: string;
  embedUrl?: string;
  videoUrl?: string;
  thumbnail: string;
  caption: string;
}

// Mock TikTok data - replace with real TikTok API when available
const mockTikTokVideos: TikTokVideo[] = [
  {
    id: '1',
    embedUrl: 'https://www.tiktok.com/embed/v2/7234567890123456789',
    thumbnail: 'https://files.catbox.moe/tiktok-1.jpg',
    caption: 'Latest gaming clip',
  },
  {
    id: '2',
    embedUrl: 'https://www.tiktok.com/embed/v2/7234567890123456790',
    thumbnail: 'https://files.catbox.moe/tiktok-2.jpg',
    caption: 'Harley ride',
  },
  {
    id: '3',
    embedUrl: 'https://www.tiktok.com/embed/v2/7234567890123456791',
    thumbnail: 'https://files.catbox.moe/tiktok-3.jpg',
    caption: 'Gaming moment',
  },
  {
    id: '4',
    embedUrl: 'https://www.tiktok.com/embed/v2/7234567890123456792',
    thumbnail: 'https://files.catbox.moe/tiktok-4.jpg',
    caption: 'Bike showcase',
  },
  {
    id: '5',
    embedUrl: 'https://www.tiktok.com/embed/v2/7234567890123456793',
    thumbnail: 'https://files.catbox.moe/tiktok-5.jpg',
    caption: 'Stream highlights',
  },
  {
    id: '6',
    embedUrl: 'https://www.tiktok.com/embed/v2/7234567890123456794',
    thumbnail: 'https://files.catbox.moe/tiktok-6.jpg',
    caption: 'Latest content',
  },
];

export default function TikTokFeed() {
  const [videos, setVideos] = useState<TikTokVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/tiktok/videos');
        const data = await response.json();
        
        console.log('[TikTokFeed] API response:', data);
        
        if (data.videos && data.videos.length > 0) {
          console.log('[TikTokFeed] Setting videos:', data.videos.length, 'videos');
          setVideos(data.videos);
        } else {
          console.log('[TikTokFeed] No videos in response, using fallback');
          // Fallback to mock data if API returns empty
          setVideos(mockTikTokVideos);
        }
      } catch (error) {
        console.error('[TikTokFeed] Failed to fetch TikTok videos:', error);
        // Fallback to mock data on error
        setVideos(mockTikTokVideos);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
    // Refresh every 10 minutes
    const interval = setInterval(fetchVideos, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-full overflow-hidden flex items-center justify-center">
        <div className="text-neon-orange font-black text-xl">Loading TikTok feed...</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="relative h-full overflow-hidden flex items-center justify-center">
        <div className="text-white/60 font-black text-sm text-center">
          No videos available
          <br />
          <a
            href="https://tiktok.com/@suchgrime"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-orange hover:text-neon-cyan transition-colors"
          >
            Visit @suchgrime on TikTok
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex flex-col gap-4 animate-scroll">
        {videos.map((video, index) => (
          <motion.a
            key={video.id}
            href={video.videoUrl || `https://www.tiktok.com/@suchgrime/video/${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="block relative aspect-[9/16] bg-gray-900 border-4 border-neon-orange/50 glitch-container overflow-hidden group"
            whileHover={{ borderColor: 'rgba(255, 102, 0, 1)', scale: 1.02 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
              <div className="text-white font-black text-sm line-clamp-2">{video.caption}</div>
              <div className="text-neon-orange text-xs mt-1">@suchgrime • Guerrilla Social Club</div>
            </div>
            <div className="absolute top-2 right-2">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a4.85 4.85 0 0 0 4.83-4.84z" />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

