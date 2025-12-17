"use client";

import Link from "next/link";

import { AddToCartButton } from "@/components/add-to-cart-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/components/providers/cart-provider";
import { getBestSellers } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { populatedItems, subtotal, count, removeItem, updateQuantity } =
    useCart();
  const upsellProducts = getBestSellers(4).filter(
    (product) => !populatedItems.find((item) => item.product.id === product.id),
  );

  return (
    <div className="bg-background pb-24 pt-10 md:pt-14">
      <div className="container space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Cart
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Your guerrilla loadout
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your picks before we route them through our vetted suppliers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            {populatedItems.length === 0 ? (
              <Card className="border-border/80 bg-background/90">
                <CardContent className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium text-foreground">
                      Your cart is currently empty.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Start with our best sellers or browse collections by vibe.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href="#best-sellers">
                      <Button size="sm" className="text-xs uppercase tracking-[0.16em]">
                        View best sellers
                      </Button>
                    </Link>
                    <Link href="/collection/tech-gadgets">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs uppercase tracking-[0.16em]"
                      >
                        Shop tech
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {populatedItems.map((item) => (
                  <Card
                    key={item.id}
                    className="border-border/80 bg-background/90"
                  >
                    <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-foreground">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.product.subtitle}
                        </p>
                        {item.selectedOptions && (
                          <p className="text-[11px] text-muted-foreground">
                            {Object.entries(item.selectedOptions)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(" • ")}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-1 text-[11px] text-muted-foreground hover:text-primary"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right text-sm">
                          <p className="font-semibold text-foreground">
                            {formatCurrency(item.product.price * item.quantity)}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {formatCurrency(item.product.price)} each
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Card className="border-border/80 bg-background/95">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium text-foreground">{count}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Taxes and shipping are calculated at checkout. No hidden fees, no
                  surprise handling charges.
                </p>
                <Link href={count === 0 ? "#best-sellers" : "/checkout"}>
                  <Button
                    size="lg"
                    className="w-full text-xs uppercase tracking-[0.18em]"
                    disabled={count === 0}
                  >
                    {count === 0 ? "Add items to continue" : "Checkout"}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-background/90">
              <CardContent className="space-y-3 text-[11px] text-muted-foreground">
                <p className="font-semibold text-foreground">
                  Boost your AOV the honest way
                </p>
                <p>
                  We don’t do fake timers or fake scarcity. Instead, we bundle
                  pieces that actually work better together.
                </p>
                <p>
                  Try pairing lighting with a desk mat or EDC with a sling to
                  keep your setup tight.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {upsellProducts.length > 0 && (
          <div className="space-y-3 border-t border-border/70 pt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  You might also like
                </p>
                <p className="text-sm text-muted-foreground">
                  Add a finishing touch to your setup without opening a new tab.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {upsellProducts.map((product) => (
                <Card
                  key={product.id}
                  className="border-border/80 bg-background/95 text-xs"
                >
                  <CardContent className="flex flex-col gap-2">
                    <p className="font-medium text-foreground">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      {product.subtitle}
                    </p>
                    <p className="text-[11px] font-semibold text-foreground">
                      {formatCurrency(product.price)}
                    </p>
                    <AddToCartButton
                      productId={product.id}
                      size="sm"
                      className="mt-1 w-full text-[10px] uppercase tracking-[0.18em]"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {count > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-black/90 backdrop-blur">
          <div className="container flex items-center justify-between gap-4 py-3 text-sm">
            <div className="text-[11px] text-muted-foreground">
              <p className="font-medium text-foreground">
                Sticky cart summary
              </p>
              <p>
                {count} item{count !== 1 && "s"} • {formatCurrency(subtotal)}
              </p>
            </div>
            <Link href="/checkout">
              <Button
                size="sm"
                className="text-xs uppercase tracking-[0.18em]"
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
