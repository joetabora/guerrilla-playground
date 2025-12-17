export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="container max-w-md space-y-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          404
        </p>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          This page went off-grid.
        </h1>
        <p className="text-sm text-muted-foreground">
          The link you followed doesn’t exist or has moved. Head back to the
          storefront and keep building your setup.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground hover:border-primary hover:text-primary"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
