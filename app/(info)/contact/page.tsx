"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config/site";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="bg-background py-10 md:py-14">
      <div className="container grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Contact
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Talk to a real human
            </h1>
            <p className="text-sm text-muted-foreground">
              Questions about shipping, returns, or a specific product? Drop a
              note and we’ll usually respond within one business day.
            </p>
          </div>

          <Card className="border-border/80 bg-background/95">
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required autoComplete="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required autoComplete="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    placeholder="Tell us what you’re working on and how we can help. Order numbers help us respond faster."
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="text-xs uppercase tracking-[0.18em]"
                >
                  {submitted ? "Message received" : "Send message"}
                </Button>
              </form>

              <p className="text-[11px] text-muted-foreground">
                This form doesn’t send emails by itself in this starter.
                Connect it to a service like Formspree, Resend, or a simple API
                route when you’re ready.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 text-sm text-muted-foreground">
          <Card className="border-border/80 bg-background/95">
            <CardContent className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Direct support
              </p>
              <p>
                Email: {" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>Phone: {siteConfig.contact.phone}</p>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-background/95">
            <CardContent className="space-y-2 text-[11px]">
              <p className="font-semibold text-foreground">
                Before you write in
              </p>
              <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
                <li>
                  Shipping windows are listed on each product page — check there
                  first for estimates.
                </li>
                <li>
                  If your tracking hasn’t updated in 7+ business days, reply
                  here with your order number.
                </li>
                <li>
                  For returns, attach clear photos so we can fast-track a
                  resolution.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
