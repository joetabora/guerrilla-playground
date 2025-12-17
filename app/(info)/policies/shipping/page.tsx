import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Learn how Guerrilla Social Club handles shipping, tracking, and delivery times for US and international orders.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-background py-10 md:py-14">
      <div className="container space-y-6 text-sm text-muted-foreground">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Policies
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Shipping policy
          </h1>
        </div>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Where we ship</h2>
          <p>
            We currently ship to the United States and select international
            regions via vetted fulfillment partners. Availability may vary by
            product.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Processing times</h2>
          <p>
            Most orders are processed within 2–5 business days. Some made-to-
            order or limited pieces may require additional processing time, which
            will be noted on the product page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Estimated delivery windows</h2>
          <p>
            Because we route many orders through AliExpress and global partners
            via DSers, delivery times can vary by product and destination. In
            general:
          </p>
          <ul className="list-disc space-y-1 pl-4">
            <li>US orders: typically 7–14 business days after dispatch</li>
            <li>International orders: typically 10–21 business days after dispatch</li>
          </ul>
          <p>
            Exact estimates and any product-specific notes are listed on each
            product page under the shipping section.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Tracking</h2>
          <p>
            You’ll receive a tracking link via email as soon as your order is
            scanned into the carrier’s system. Tracking updates may take 24–72
            hours to appear after you receive the link.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Customs & duties</h2>
          <p>
            For international orders, local customs fees, import duties, or taxes
            may apply and are the responsibility of the customer. We don’t
            control these charges.
          </p>
        </section>
      </div>
    </div>
  );
}
