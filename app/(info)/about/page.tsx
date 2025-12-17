import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { getOrganizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Guerrilla Social Club",
  description:
    "Learn how Guerrilla Social Club curates guerrilla-grade gadgets, streetwear, and neon decor from vetted global suppliers.",
};

export default function AboutPage() {
  const orgSchema = getOrganizationJsonLd();

  return (
    <>
      <JsonLd schema={orgSchema} />
      <div className="bg-background py-10 md:py-14">
        <div className="container space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              About
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Built for the creator class, not big-box retail
            </h1>
          </div>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Guerrilla Social Club started as a shared notes doc between
                friends comparing the gear that actually held up to late-night
                sessions, budget constraints, and chaotic city apartments.
              </p>
              <p>
                Instead of trying to look like a giant warehouse brand, we’re
                honest about what we are: a curated dropshipping storefront that
                routes orders through vetted AliExpress and global suppliers using
                tools like DSers. That means we can move quickly, test more
                products, and keep only the ones that earn a permanent spot in a
                real creator’s setup.
              </p>
              <p>
                Every product you see here has gone through a simple but strict
                process: sample orders, quality checks, shipping tests, and
                real-world use. If packaging feels sketchy, tracking is unreliable,
                or quality doesn’t match the listing, it doesn’t go live.
              </p>
              <p>
                We’re not trying to sell you on “get rich quick” gadgets or
                random TikTok trends. We’re here for the artists, editors,
                streamers, DJs, and night-shift builders who want their setup to
                hit as hard as their work ethic.
              </p>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border border-border/80 bg-background/95 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Our promise
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-4 text-xs">
                  <li>Clear expectations on shipping windows and tracking.</li>
                  <li>No fake “US warehouse” stories if it isn’t true.</li>
                  <li>Curated products we’d recommend to friends, not everything we can list.</li>
                  <li>Fast support from a small team that actually reads your messages.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border/80 bg-background/95 p-5 text-xs">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  How fulfillment works
                </p>
                <p className="mt-2">
                  Orders are manually reviewed and then routed through DSers to
                  trusted AliExpress and global partners. For you, that means
                  access to a wide catalog without the usual marketplace chaos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
