import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { getBreadcrumbSchema, getProductJsonLd } from "@/lib/seo";
import { formatCurrency } from "@/lib/utils";

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product not found",
      description: "This product could not be found.",
    };
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      url: `/product/${product.slug}`,
      type: "product",
      images: product.images.map((img) => ({ url: img.src, alt: img.alt })),
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const related = getRelatedProducts(product.slug, 4);

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: `/collection/${product.collectionHandle}` },
    { name: product.name, url: `/product/${product.slug}` },
  ]);

  const productJsonLd = getProductJsonLd(product);

  const primaryImage = product.images[0];

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <JsonLd schema={productJsonLd} />

      <section className="border-b border-border/70 bg-background/95 py-10 md:py-14">
        <div className="container grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-black/40">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1).map((image) => (
                  <div
                    key={image.src}
                    className="relative aspect-square overflow-hidden rounded-xl border border-border/70 bg-black/40"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 12vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                <span>Guerrilla Social Club</span>
                <span className="h-[1px] w-4 bg-border" />
                <span className="uppercase tracking-[0.18em]">
                  {product.collectionHandle.replace("-", " ")}
                </span>
              </div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="text-sm text-muted-foreground">{product.subtitle}</p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span>
                  ⭐ {product.rating.toFixed(1)} • {product.reviewCount} reviews
                </span>
                <span className="h-[1px] w-4 bg-border" />
                <span>{product.inStock ? "In stock" : "Backorder"}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-end gap-4">
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {formatCurrency(product.price)}
                  </p>
                  {product.compareAtPrice && (
                    <p className="text-xs text-muted-foreground line-through">
                      {formatCurrency(product.compareAtPrice)}
                    </p>
                  )}
                </div>
                {product.badge && (
                  <Badge variant="neon" className="text-[10px]">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {product.shippingEstimate}
              </p>
            </div>

            <Card className="border-border/80 bg-background/80">
              <CardContent className="space-y-4">
                {product.variants && product.variants.length > 0 && (
                  <div className="space-y-3 text-sm">
                    {product.variants.map((variant) => (
                      <div key={variant.id} className="space-y-1">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {variant.name}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {variant.options.map((option) => (
                            <button
                              key={option}
                              className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary"
                              type="button"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <AddToCartButton
                  productId={product.id}
                  size="lg"
                  className="w-full text-xs uppercase tracking-[0.18em]"
                />
              </CardContent>
            </Card>

            <div className="space-y-3 text-sm text-muted-foreground">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                Details
              </h2>
              <p>{product.description}</p>
              {product.features.length > 0 && (
                <ul className="list-disc space-y-1 pl-4 text-xs">
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-background py-10 md:py-14">
          <div className="container space-y-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  You might also like
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold tracking-tight text-foreground">
                  Related drops
                </h2>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
