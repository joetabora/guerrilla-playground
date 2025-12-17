import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Understand how Guerrilla Social Club collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background py-10 md:py-14">
      <div className="container space-y-6 text-sm text-muted-foreground">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Policies
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Privacy policy
          </h1>
        </div>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Information we collect</h2>
          <p>
            We collect basic information you provide during checkout or when
            contacting support (such as name, email, shipping address, and order
            details). We also use standard analytics and cookies to understand how
            visitors use the site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">How we use your information</h2>
          <ul className="list-disc space-y-1 pl-4">
            <li>To process and ship your orders</li>
            <li>To send order updates and support responses</li>
            <li>To improve our product catalog and onsite experience</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Third-party services</h2>
          <p>
            We may use third-party services such as payment processors,
            fulfillment tools, and analytics platforms. These partners only
            receive the information required to perform their specific function
            and are expected to handle it securely.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-foreground">Your rights</h2>
          <p>
            You can request access to, correction of, or deletion of your
            personal data where applicable. Contact us if you\'d like to exercise
            any of these rights.
          </p>
        </section>
      </div>
    </div>
  );
}
