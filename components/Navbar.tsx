'use client';

/**
 * Sticky navigation bar with site-wide links and subtle motion states.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/creators', label: 'Creators' },
  { href: '/brands', label: 'Brands' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 backdrop-blur bg-charcoal/80 border-b border-white/5"
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight gradient-text">
          Guerrilla Social Club
        </Link>
        <nav className="hidden gap-6 text-sm md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx('transition-colors hover:text-cyan-200', {
                  'text-white': isActive,
                  'text-slate-400': !isActive
                })}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="block h-0.5 w-full bg-gradient-to-r from-[#4D4DFF] to-[#00FFE0]"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-white/60"
        >
          Book a Call
        </Link>
      </div>
    </motion.header>
  );
};

export default Navbar;
