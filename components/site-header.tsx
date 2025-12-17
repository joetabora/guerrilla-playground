"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config/site";

const mainNav = [
  { href: "/collection/tech-gadgets", label: "Tech" },
  { href: "/collection/home-decor", label: "Neon Home" },
  { href: "/collection/streetwear", label: "Streetwear" },
  { href: "/blog", label: "Blog" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="bg-gradient-to-r from-primary/15 via-accent/15 to-secondary/15 text-[11px] font-medium text-foreground">
        <div className="container flex items-center justify-between gap-2 py-1">
          <p className="uppercase tracking-[0.15em]">
            Free US shipping on every order.
          </p>
          <p className="hidden text-[10px] text-muted-foreground sm:inline">
            Curated dropshipping • Vetted suppliers • Secure checkout
          </p>
        </div>
      </div>

      <div className="container flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/60 bg-gradient-to-br from-primary/40 via-accent/40 to-secondary/40 text-xs font-black uppercase tracking-[0.18em]">
              GSC
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold uppercase tracking-[0.16em]">
                Guerrilla Social Club
              </div>
              <div className="text-[11px] text-muted-foreground">
                Night-shift gear for creators
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-xs font-medium uppercase tracking-[0.18em] md:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href as any}
                className={cn(
                  "transition-colors hover:text-primary",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/about" className="hidden text-[11px] text-muted-foreground hover:text-primary md:inline">
            About
          </Link>
          <Link href="/contact" className="hidden text-[11px] text-muted-foreground hover:text-primary md:inline">
            Support
          </Link>

          <Link href="/cart" aria-label="Cart" className="relative">
            <Button variant="outline" size="sm" className="gap-2 text-[11px] uppercase tracking-[0.16em]">
              <span>Cart</span>
              {count > 0 && (
                <span className="inline-flex min-w-[1.5rem] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>
          </Link>

          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-xs text-muted-foreground md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-[2px] w-4 rounded-full bg-foreground transition-transform",
                  mobileOpen && "translate-y-[5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-4 rounded-full bg-foreground transition-opacity",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] w-4 rounded-full bg-foreground transition-transform",
                  mobileOpen && "-translate-y-[5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/70 bg-background/95 md:hidden">
          <nav className="container flex flex-col gap-3 py-3 text-xs font-medium uppercase tracking-[0.18em]">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className={cn(
                    "py-1 text-muted-foreground hover:text-primary",
                    active && "text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-1 flex gap-4 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary">
                Support
              </Link>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="ml-auto hover:text-primary"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
