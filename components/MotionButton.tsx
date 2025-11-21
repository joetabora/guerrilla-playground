/**
 * MotionButton - Enhanced button with GSAP animations and glow effects
 */
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MotionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function MotionButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  type = 'button'
}: MotionButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    if (!button || !glow) return;

    const handleMouseEnter = () => {
      gsap.to(button, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      gsap.to(glow, { opacity: 0.8, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(glow, { opacity: 0, duration: 0.3 });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const variantClasses = {
    primary: 'bg-magenta text-white shadow-glow-magenta hover:bg-magenta/90',
    secondary: 'bg-transparent border-2 border-lime text-lime hover:bg-lime hover:text-charcoal',
    ghost: 'bg-transparent border border-white/20 text-white hover:border-white/40'
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-3 font-bold rounded-lg transition-colors ${variantClasses[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-disabled={disabled}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-lg opacity-0 blur-xl"
        style={{
          background: variant === 'primary' 
            ? 'radial-gradient(circle, rgba(255, 45, 149, 0.6), transparent)'
            : variant === 'secondary'
            ? 'radial-gradient(circle, rgba(166, 255, 0, 0.6), transparent)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)'
        }}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

