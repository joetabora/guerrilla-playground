'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TwitchStatus {
  isLive: boolean;
  vodId: string | null;
  channelName: string;
}

export default function TwitchEmbed() {
  const [status, setStatus] = useState<TwitchStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/twitch/status');
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Failed to fetch Twitch status:', error);
        setStatus({
          isLive: false,
          vodId: null,
          channelName: 'suchgrime',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
    // Refresh every 60 seconds
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!status || !containerRef.current) return;

    const container = containerRef.current;

    // Load Twitch embed script
    const script = document.createElement('script');
    script.src = 'https://player.twitch.tv/js/embed/v1.js';
    script.async = true;
    
    const initializePlayer = () => {
      if (window.Twitch && container) {
        const parent = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        const options: { channel?: string; video?: string; width: string; height: string; parent: string } = status.isLive
          ? {
              channel: status.channelName,
              width: '100%',
              height: '100%',
              parent,
            }
          : {
              video: status.vodId || '',
              width: '100%',
              height: '100%',
              parent,
            };

        new window.Twitch.Player(container, options);
      }
    };

    script.onload = initializePlayer;

    if (!document.querySelector('script[src*="twitch.tv/js/embed"]')) {
      document.body.appendChild(script);
    } else {
      initializePlayer();
    }

    return () => {
      // Cleanup
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [status]);

  if (isLoading) {
    return (
      <div className="relative aspect-video bg-gray-900 border-4 border-neon-cyan/50 flex items-center justify-center">
        <div className="text-neon-cyan font-black text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative aspect-video bg-gray-900 border-4 border-neon-cyan/50 glitch-container overflow-hidden"
      whileHover={{ borderColor: 'rgba(0, 255, 255, 1)' }}
      transition={{ duration: 0.2 }}
      ref={containerRef}
    >
      {status?.isLive && (
        <div className="absolute top-2 left-2 z-10 bg-red-600 text-white font-black px-3 py-1 text-sm uppercase flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          LIVE
        </div>
      )}
    </motion.div>
  );
}

// Extend Window interface for Twitch
interface TwitchPlayerOptions {
  channel?: string;
  video?: string;
  width: string;
  height: string;
  parent: string;
}

// Twitch Player instance type
type TwitchPlayer = object;

declare global {
  interface Window {
    Twitch?: {
      Player: new (container: HTMLElement, options: TwitchPlayerOptions) => TwitchPlayer;
    };
  }
}

