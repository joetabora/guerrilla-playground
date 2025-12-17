import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getRecentPosts } from "@/lib/blog";

export function BlogTeasersSection() {
  const posts = getRecentPosts(3);

  return (
    <section className="border-b border-border/70 bg-background py-12 md:py-16">
      <div className="container space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Guerrilla field notes
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">
              Learn the playbook, not just the products
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Setup guides, buying advice, and behind-the-scenes looks at how we
              keep shipping fast and trust high.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
          >
            View all posts →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="group h-full cursor-pointer overflow-hidden border-border/70 bg-gradient-to-b from-muted/70 to-background/80">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <Badge variant="outline" className="text-[10px]">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="space-y-2">
                  <p className="text-[11px] text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    • {post.readTimeMinutes} min read
                  </p>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
