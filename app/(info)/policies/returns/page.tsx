import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy",
  description:
    "Read the Guerrilla Social Club returns and refunds policy for damaged items, wrong orders, and change-of-mind returns.",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-background py-10 md:py-14">
      <div className="container space-y-6 text-sm text-muted-foreground">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Policies
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Returns & refunds
          </h1>
        </div>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Damaged or incorrect items</h2>
          <p>
            If your order arrives damaged, defective, or noticeably different
            from what was advertised, contact us within 7 days of delivery with
            clear photos and your order number. We\'ll work with our suppliers to
            offer a replacement or refund where appropriate.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Change-of-mind returns</h2>
          <p>
            Because many items ship directly from global partners, change-of-mind
            returns may not always be possible or may require return shipping to
            an international warehouse. Reach out to us and we\'ll outline the
            options for your specific order.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Eligibility</h2>
          <ul className="list-disc space-y-1 pl-4">
            <li>Items must be unused and in their original packaging.</li>
            <li>
              Certain items (e.g., intimate wear, custom items) may be final sale
              and will be clearly marked on the product page.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">How to request a return</h2>
          <p>
            Email us with your order number, reason for return, and clear photos
            where relevant. We\'ll respond with next steps, including any
            applicable return address or store credit options.
          </p>
        </section>
      </div>
    </div>
  );
}
