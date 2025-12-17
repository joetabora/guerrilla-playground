import Link from "next/link";

import { siteConfig } from "@/lib/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/90">
      <div className="container grid gap-10 py-10 md:grid-cols-[2fr,1.5fr,1.5fr]">
        <div className="space-y-4">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Guerrilla Social Club
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Dropshipping done the right way: curated products, vetted suppliers,
              clear shipping, and gear we’d actually run in our own setups.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
            <span className="rounded-full border border-border px-3 py-1 uppercase tracking-[0.16em]">
              Secure checkout
            </span>
            <span className="rounded-full border border-border px-3 py-1 uppercase tracking-[0.16em]">
              Encrypted payments
            </span>
            <span className="rounded-full border border-border px-3 py-1 uppercase tracking-[0.16em]">
              Curated suppliers
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Store
          </p>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <Link href="/collection/tech-gadgets" className="hover:text-primary">
              Tech gadgets
            </Link>
            <Link href="/collection/home-decor" className="hover:text-primary">
              Neon home & desk
            </Link>
            <Link href="/collection/streetwear" className="hover:text-primary">
              Streetwear
            </Link>
            <Link href="/collection/everyday-carry" className="hover:text-primary">
              Everyday carry
            </Link>
            <Link href="/blog" className="mt-2 hover:text-primary">
              Blog
            </Link>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Support & policies
          </p>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="hover:text-primary">
              Contact
            </Link>
            <Link href="/policies/shipping" className="hover:text-primary">
              Shipping policy
            </Link>
            <Link href="/policies/returns" className="hover:text-primary">
              Returns policy
            </Link>
            <Link href="/policies/privacy" className="hover:text-primary">
              Privacy policy
            </Link>
          </div>

          <div className="pt-4 text-xs text-muted-foreground">
            <p>
              Email: <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">{siteConfig.contact.email}</a>
            </p>
            <p>Phone: {siteConfig.contact.phone}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70 bg-black/60">
        <div className="container flex flex-col items-center justify-between gap-3 py-4 text-[11px] text-muted-foreground md:flex-row">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              Instagram
            </a>
            <a
              href={siteConfig.links.tiktok}
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
