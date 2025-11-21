/**
 * Ripple Button Component
 * Adds ripple effect on click for micro-interactions
 */
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function RippleButton({
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      aria-disabled={disabled}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            width: 300,
            height: 300,
            opacity: [0.5, 0]
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </button>
  );
}

