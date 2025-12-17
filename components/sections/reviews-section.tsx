const reviews = [
  {
    name: "Maya R.",
    handle: "@mayafromtheinternet",
    quote:
      "Feels like the first dropshipping store actually built for creators. My desk finally looks like my moodboard.",
    badge: "Verified creator",
  },
  {
    name: "Chris D.",
    handle: "@chrisdoesbeats",
    quote:
      "Shipping was way faster than I expected and everything came in clean, padded packaging.",
    badge: "US order",
  },
  {
    name: "Jules",
    handle: "Twitch: julesafterdark",
    quote:
      "The lighting pieces instantly leveled up my stream without making my room feel like a toy aisle.",
    badge: "Streamer setup",
  },
];

export function ReviewsSection() {
  return (
    <section className="border-b border-border/70 bg-background/95 py-12 md:py-16">
      <div className="container space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Social proof
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
              Loved by late-night builders
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Real feedback from early customers and creator friends who helped us
              stress-test the lineup.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.handle}
              className="flex h-full flex-col rounded-2xl border border-border/80 bg-gradient-to-b from-muted/80 to-background/90 p-5 text-sm shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {review.badge}
              </p>
              <p className="mt-3 text-sm text-foreground">“{review.quote}”</p>
              <div className="mt-4 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">{review.name}</p>
                <p>{review.handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
