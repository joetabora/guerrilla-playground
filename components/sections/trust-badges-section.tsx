export function TrustBadgesSection() {
  return (
    <section className="border-b border-border/70 bg-background/95 py-6">
      <div className="container flex flex-wrap items-center justify-center gap-4 text-[11px] text-muted-foreground">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-black/50 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="uppercase tracking-[0.18em]">Secure checkout</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-black/50 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          <span className="uppercase tracking-[0.18em]">Encrypted payments</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-black/50 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="uppercase tracking-[0.18em]">Vetted suppliers only</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-black/50 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-foreground" />
          <span className="uppercase tracking-[0.18em]">Transparent shipping & returns</span>
        </div>
      </div>
    </section>
  );
}
