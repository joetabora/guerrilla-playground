import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCollections, getProductsByCollection } from "@/lib/products";

export function CollectionsGridSection() {
  const collections = getAllCollections();

  return (
    <section className="border-b border-border/70 bg-background py-12 md:py-16">
      <div className="container space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Shop by vibe
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
              Collections for how you actually live
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Whether you\'re dialing in a desk, a fit, or a full room, start with
              a collection that matches your energy.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => {
            const products = getProductsByCollection(collection.handle).slice(0, 2);
            return (
              <Link key={collection.handle} href={`/collection/${collection.handle}`}>
                <Card className="group h-full cursor-pointer overflow-hidden border-border/70 bg-gradient-to-b from-muted/70 to-background/80 transition-transform hover:-translate-y-1">
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={collection.heroImage}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                      <Badge variant="neon" className="w-fit text-[10px]">
                        {collection.tagline}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="space-y-3">
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {collection.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {collection.description}
                      </p>
                    </div>
                    {products.length > 0 && (
                      <p className="text-[11px] text-muted-foreground">
                        Includes {products.map((p) => p.name).join(", ")} and more.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
