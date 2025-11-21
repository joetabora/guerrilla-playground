/**
 * NeonDivider - Animated divider with neon glow effect
 */
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface NeonDividerProps {
  color?: 'magenta' | 'lime' | 'cyan';
  className?: string;
}

export default function NeonDivider({ color = 'magenta', className = '' }: NeonDividerProps) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    gsap.fromTo(
      line,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, []);

  const colors = {
    magenta: 'bg-magenta shadow-glow-magenta',
    lime: 'bg-lime shadow-glow-lime',
    cyan: 'bg-cyan shadow-glow-cyan'
  };

  return (
    <div className={`w-full h-px ${colors[color]} ${className}`} ref={lineRef} style={{ transformOrigin: 'left' }} />
  );
}

