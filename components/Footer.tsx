/**
 * Site footer with quick links and attribution copy.
 */
import Link from 'next/link';

const quickLinks = [
  { href: '/about', label: 'About' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/contact', label: 'Contact' }
];

const socials = [
  { href: 'https://www.instagram.com', label: 'Instagram' },
  { href: 'https://www.tiktok.com', label: 'TikTok' },
  { href: 'https://www.linkedin.com', label: 'LinkedIn' }
];

export const Footer = () => (
  <footer className="border-t border-white/10 bg-ink py-10 text-sm text-slate-400">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-white">© {new Date().getFullYear()} Guerrilla Social Club</p>
        <p className="max-w-md text-xs text-slate-500">
          Creator-led influencer campaigns engineered to shift culture and drive measurable growth.
        </p>
      </div>
      <div className="flex flex-col gap-6 text-xs uppercase tracking-widest md:flex-row">
        <div className="flex gap-4">
          {quickLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
