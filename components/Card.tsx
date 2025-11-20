'use client';

/**
 * Generic card with hover lift animation, used for services and case studies.
 */
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export type CardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export const Card = ({ title, description, icon, footer, className }: CardProps) => (
  <motion.article
    whileHover={{ y: -6 }}
    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    className={`card-surface flex flex-col gap-4 p-6 ${className ?? ''}`}
  >
    {icon && <div className="text-2xl" aria-hidden>{icon}</div>}
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="text-sm text-slate-400">{description}</p>
    {footer && <div className="mt-auto text-sm text-cyan-200">{footer}</div>}
  </motion.article>
);

export default Card;
