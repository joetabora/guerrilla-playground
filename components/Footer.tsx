/**
 * Footer - site footer with links, social, and branding
 */
'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { href: '/about', label: 'About' },
      { href: '/work', label: 'Work' },
      { href: '/contact', label: 'Contact' }
    ],
    services: [
      { href: '/services', label: 'Services' },
      { href: '/creators', label: 'For Creators' },
      { href: '/brands', label: 'For Brands' }
    ],
    legal: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' }
    ]
  };

  const socialLinks = [
    { href: 'https://instagram.com', label: 'Instagram', icon: '📷' },
    { href: 'https://tiktok.com', label: 'TikTok', icon: '🎵' },
    { href: 'https://twitter.com', label: 'Twitter', icon: '🐦' }
  ];

  return (
    <footer className="bg-ink border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/brand-logo.svg"
                alt="Guerrilla Social Club"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="font-black text-lg text-white">GUERRILLA SOCIAL CLUB</span>
            </Link>
            <p className="text-white/60 text-sm mb-4 max-w-md">
              Creator-led creative that actually moves culture. We build brands that Gen Z and Millennials actually want to follow.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-magenta transition-colors"
                  aria-label={social.label}
                >
                  <span className="text-2xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold text-white mb-4 uppercase text-sm tracking-tight">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-magenta text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black text-white mb-4 uppercase text-sm tracking-tight">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-lime text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {currentYear} Guerrilla Social Club. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/40 hover:text-white/60 text-xs transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
