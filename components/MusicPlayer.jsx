import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MusicPlayer.module.css';

/**
 * MusicPlayer component.
 * 
 * Optional background music player with mute toggle.
 * Placeholder for adding actual audio source.
 * 
 * @returns {JSX.Element} Music player component.
 */
export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.log('Audio play failed:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.musicPlayer}>
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={styles.nowPlaying}
          >
            <span className={styles.nowPlayingIcon}>🎵</span>
            <span className={styles.nowPlayingText}>Now Playing</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.controls}>
        <button
          className={styles.controlButton}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button
          className={styles.controlButton}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Hidden audio element - add your music source here */}
      <audio
        ref={audioRef}
        loop
        muted={isMuted}
        preload="none"
        // Add your music source here:
        // src="/path/to/your/background-music.mp3"
      />
    </div>
  );
}

