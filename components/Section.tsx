/**
 * Layout helper to enforce consistent spacing and max-widths for sections.
 */
import type { ReactNode } from 'react';

export type SectionProps = {
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
};

export const Section = ({ id, as: Tag = 'section', className = '', children }: SectionProps) => (
  <Tag id={id} className={`mx-auto w-full max-w-6xl px-6 py-16 ${className}`}>
    {children}
  </Tag>
);

export default Section;
