"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/components/providers/cart-provider";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const { populatedItems, subtotal } = useCart();
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Placeholder for Stripe / PayPal integration
    alert(
      "This demo checkout is a front-end placeholder. Connect Stripe or PayPal in your backend to capture real payments.",
    );
    router.push("/");
  }

  return (
    <div className="bg-background py-10 md:py-14">
      <div className="container grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Checkout
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Secure checkout
            </h1>
            <p className="text-sm text-muted-foreground">
              We\'ll route your order through our vetted suppliers and send
              tracking as soon as it\'s live.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="border-border/80 bg-background/95">
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required autoComplete="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" type="tel" autoComplete="tel" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required autoComplete="name" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Shipping address</Label>
                  <Input id="address" required autoComplete="street-address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required autoComplete="address-level2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal">ZIP / Postal code</Label>
                  <Input id="postal" required autoComplete="postal-code" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">Order notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Gate codes, delivery preferences, or anything your courier should know."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/80 bg-background/95">
              <CardContent className="space-y-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Payment
                </p>
                <p className="text-xs text-muted-foreground">
                  In production, connect this checkout to Stripe, PayPal, or your
                  preferred processor. This demo keeps everything on the front end
                  only.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-xs uppercase tracking-[0.18em]"
                  >
                    Pay with Stripe (demo)
                  </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    size="lg"
                    className="w-full text-xs uppercase tracking-[0.18em]"
                  >
                    Pay with PayPal (demo)
                  </Button>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  You won\'t be charged in this demo. In a real deployment, this
                  step would create a checkout session via your backend.
                </p>
              </CardContent>
            </Card>
          </form>
        </div>

        <div className="space-y-4">
          <Card className="border-border/80 bg-background/95">
            <CardContent className="space-y-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Order summary
              </p>
              {populatedItems.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Your cart is empty. Add items before checking out.
                </p>
              ) : (
                <div className="space-y-3">
                  {populatedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Qty {item.quantity}
                        </p>
                      </div>
                      <p className="text-[11px] text-foreground">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-2 space-y-1 border-t border-border/70 pt-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Calculated at fulfillment</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  We partner with suppliers that support reliable tracking. Most US
                  orders arrive in 7–14 business days.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-background/95">
            <CardContent className="space-y-2 text-[11px] text-muted-foreground">
              <p className="font-semibold text-foreground">Why trust us?</p>
              <ul className="list-disc space-y-1 pl-4">
                <li>Secure, encrypted checkout pages</li>
                <li>Curated, test-ordered products only</li>
                <li>Clear shipping windows on every product page</li>
                <li>Dropshipping transparency – no fake warehouse stories</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
