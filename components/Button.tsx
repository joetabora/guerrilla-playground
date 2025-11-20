'use client';

/**
 * Reusable CTA button with gradient variants and micro-interactions powered by Framer Motion.
 */
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
};

const baseStyles = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold focus:outline-none';

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-gradient-to-r from-[#4D4DFF] to-[#00FFE0] text-slate-950 shadow-glow',
  secondary: 'border border-white/30 text-white hover:border-white'
};

export const Button = ({ href, children, variant = 'primary', className, ariaLabel, type = 'button' }: ButtonProps) => {
  const sharedProps = {
    className: clsx(baseStyles, variantStyles[variant], className)
  };

  if (href) {
    return (
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} aria-label={ariaLabel} className={sharedProps.className}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type={type} aria-label={ariaLabel} {...sharedProps}>
      {children}
    </motion.button>
  );
};

export default Button;
