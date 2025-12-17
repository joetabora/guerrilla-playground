import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden"
        aria-label={product.name}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          />
          {product.badge && (
            <div className="absolute left-3 top-3 flex gap-2">
              <Badge variant="neon">{product.badge}</Badge>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link href={`/product/${product.slug}`} className="hover:underline">
                <h3 className="font-display text-base font-semibold text-foreground">
                  {product.name}
                </h3>
              </Link>
              {product.subtitle && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {product.subtitle}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">
                {formatCurrency(product.price)}
              </p>
              {product.compareAtPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.compareAtPrice)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>
              ⭐ {product.rating.toFixed(1)} • {product.reviewCount} reviews
            </span>
            <span>{product.inStock ? "In stock" : "Backorder"}</span>
          </div>
        </div>

        <AddToCartButton
          productId={product.id}
          size="sm"
          className="mt-2 w-full text-xs uppercase tracking-wide"
        />
      </CardContent>
    </Card>
  );
}
