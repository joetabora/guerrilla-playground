import { ProductCard } from "@/components/product-card";
import { getBestSellers } from "@/lib/products";

export function BestSellersSection() {
  const products = getBestSellers(8);

  return (
    <section id="best-sellers" className="border-b border-border/70 bg-background/80 py-12 md:py-16">
      <div className="container space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Best sellers
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
              Community-approved favorites
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              The pieces that keep selling out first. Tuned for streaming, editing,
              and late-night city runs.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
