/**
 * GlowCard - Card component with animated glow effects
 */
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'magenta' | 'lime' | 'cyan';
  onClick?: () => void;
}

export default function GlowCard({
  children,
  className = '',
  glowColor = 'magenta',
  onClick
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const handleMouseEnter = () => {
      gsap.to(card, { y: -5, duration: 0.3, ease: 'power2.out' });
      gsap.to(glow, { opacity: 0.6, scale: 1.05, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(glow, { opacity: 0, scale: 1, duration: 0.3 });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const glowColors = {
    magenta: 'rgba(255, 45, 149, 0.4)',
    lime: 'rgba(166, 255, 0, 0.4)',
    cyan: 'rgba(0, 255, 214, 0.4)'
  };

  return (
    <div ref={cardRef} className={`relative ${className}`}>
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl opacity-0 blur-2xl transition-opacity"
        style={{
          background: `radial-gradient(circle, ${glowColors[glowColor]}, transparent)`
        }}
      />
      <div className="relative bg-ink border border-white/10 rounded-2xl p-6" onClick={onClick}>
        {children}
      </div>
    </div>
  );
}

