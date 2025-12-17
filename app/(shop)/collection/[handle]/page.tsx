import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { JsonLd } from "@/components/json-ld";
import {
  getAllCollectionHandles,
  getCollectionByHandle,
  getProductsByCollection,
} from "@/lib/products";
import { getBreadcrumbSchema } from "@/lib/seo";

interface CollectionPageProps {
  params: { handle: string };
}

export function generateStaticParams() {
  return getAllCollectionHandles().map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const collection = getCollectionByHandle(params.handle);
  if (!collection) {
    return {
      title: "Collection not found",
      description: "This collection could not be found.",
    };
  }

  return {
    title: collection.seo.title,
    description: collection.seo.description,
    openGraph: {
      title: collection.seo.title,
      description: collection.seo.description,
      url: `/collection/${collection.handle}`,
      type: "website",
    },
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollectionByHandle(params.handle);
  if (!collection) return notFound();

  const products = getProductsByCollection(collection.handle);
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: collection.name, url: `/collection/${collection.handle}` },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <section className="border-b border-border/70 bg-background/95 py-10 md:py-14">
        <div className="container space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Collection
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {collection.name}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {collection.description}
          </p>
        </div>
      </section>

      <section className="bg-background py-10 md:py-14">
        <div className="container">
          {products.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No products in this collection yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
