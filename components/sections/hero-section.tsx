import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

export function HeroSection() {
  const [hero] = getFeaturedProducts(1);

  return (
    <section className="relative overflow-hidden border-b border-border/70 bg-noise-soft">
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
      </div>
      <div className="container relative grid gap-10 py-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:py-20">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            New drops every week • Curated for creators
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Gear for the
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                {" "}
                night shift
              </span>
              .
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
              Guerrilla-grade gadgets, streetwear, and neon home gear curated for
              creators, streamers, and urban misfits who clock in after dark.
            </p>
          </div>

          {hero && (
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border/80 bg-background/80 p-4 text-sm backdrop-blur">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="neon">Featured</Badge>
                  {hero.badge && <Badge variant="outline">{hero.badge}</Badge>}
                </div>
                <p className="font-medium text-foreground">{hero.name}</p>
                <p className="text-xs text-muted-foreground max-w-md">
                  {hero.subtitle}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-4 text-xs sm:text-sm">
                <div className="text-right">
                  <p className="font-semibold text-foreground">
                    {formatCurrency(hero.price)}
                  </p>
                  {hero.compareAtPrice && (
                    <p className="text-[11px] text-muted-foreground line-through">
                      {formatCurrency(hero.compareAtPrice)}
                    </p>
                  )}
                </div>
                <Link href={`/product/${hero.slug}`}>
                  <Button size="lg" className="text-xs uppercase tracking-[0.16em]">
                    Shop featured
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Free US shipping on every order
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              Secure Stripe & PayPal-ready checkout
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Curated from vetted global suppliers
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative h-[320px] w-full max-w-md rounded-[1.75rem] border border-primary/40 bg-gradient-to-br from-primary/15 via-black to-secondary/20 p-[1px] shadow-glow">
            <div className="flex h-full flex-col justify-between rounded-[1.6rem] bg-gradient-to-b from-black/80 via-background/95 to-black/90 p-6">
              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  Guerrilla Social Club
                </p>
                <p className="font-display text-lg font-semibold text-foreground">
                  Build a feed-worthy setup in one weekend.
                </p>
                <p className="text-xs text-muted-foreground">
                  No endless scrolling, no sketchy listings. Just battle-tested
                  pieces we\'ve already vetted.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-[11px] text-muted-foreground">
                <div className="rounded-xl border border-border/70 bg-black/40 p-3">
                  <p className="font-semibold text-foreground">4.8 / 5</p>
                  <p>Avg. product rating</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-black/40 p-3">
                  <p className="font-semibold text-foreground">US + EU</p>
                  <p>Priority routes</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-black/40 p-3">
                  <p className="font-semibold text-foreground">SSL</p>
                  <p>Secure checkout</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <p>Built for creators, DJs, streamers, and scene builders.</p>
                <Link href="#best-sellers" className="text-primary hover:underline">
                  Browse best sellers →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
