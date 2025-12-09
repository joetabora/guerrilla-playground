'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface StreamPlatform {
  name: 'Twitch' | 'Kick';
  url: string;
  isLive: boolean;
  nextStream?: Date;
}

export default function LiveStreamSection() {
  const [activePlatform, setActivePlatform] = useState<'Twitch' | 'Kick'>('Twitch');
  const [timeUntilStream, setTimeUntilStream] = useState<string>('');

  // Mock stream data - replace with real API calls
  const streams: StreamPlatform[] = [
    {
      name: 'Twitch',
      url: 'https://www.twitch.tv/suchgrime',
      isLive: false,
      nextStream: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
    },
    {
      name: 'Kick',
      url: 'https://kick.com/suchgrime',
      isLive: false,
      nextStream: new Date(Date.now() + 3 * 60 * 60 * 1000) // 3 hours from now
    }
  ];

  useEffect(() => {
    const updateCountdown = () => {
      const activeStream = streams.find(s => s.name === activePlatform);
      if (activeStream?.nextStream) {
        const now = new Date();
        const diff = activeStream.nextStream.getTime() - now.getTime();
        
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeUntilStream(`${hours}h ${minutes}m`);
        } else {
          setTimeUntilStream('LIVE NOW');
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePlatform]);

  const activeStream = streams.find(s => s.name === activePlatform);

  return (
    <section className="relative py-20 px-4 bg-black border-y-2 border-neon-cyan/30">
      <div className="max-w-6xl mx-auto">
        {/* Platform Toggle */}
        <div className="flex gap-4 justify-center mb-8">
          {streams.map((stream) => (
            <button
              key={stream.name}
              onClick={() => setActivePlatform(stream.name)}
              className={`px-6 py-3 font-black text-lg uppercase transition-all ${
                activePlatform === stream.name
                  ? 'bg-neon-cyan text-black shadow-[0_0_30px_rgba(0,255,255,0.6)]'
                  : 'bg-gray-900 text-white border-2 border-neon-cyan/30 hover:border-neon-cyan'
              }`}
            >
              {stream.name}
            </button>
          ))}
        </div>

        {/* Stream Embed */}
        <motion.div
          key={activePlatform}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-video bg-gray-900 border-4 border-neon-cyan/50"
        >
          {activeStream?.isLive ? (
            <iframe
              src={`https://player.twitch.tv/?channel=suchgrime&parent=${typeof window !== 'undefined' ? window.location.hostname : ''}`}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
              title={`${activePlatform} Stream`}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">🔴</div>
              <div className="text-2xl font-black text-neon-cyan mb-2">OFFLINE</div>
              <div className="text-lg text-white/60 mb-4">Next stream in:</div>
              <div className="text-4xl font-black text-neon-orange">{timeUntilStream}</div>
              <a
                href={activeStream?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 px-8 py-3 bg-neon-cyan text-black font-black uppercase hover:bg-neon-orange transition-colors"
              >
                Follow on {activePlatform}
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

