import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Guerrilla Field Notes Blog",
  description:
    "Setup guides, buying advice, and behind-the-scenes looks at how Guerrilla Social Club curates products and handles shipping.",
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="bg-background py-10 md:py-14">
      <div className="container space-y-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Blog
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Guerrilla Field Notes
          </h1>
          <p className="text-sm text-muted-foreground">
            Notes from the trenches on building better setups, choosing better
            gear, and keeping dropshipping honest.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="group h-full cursor-pointer overflow-hidden border-border/70 bg-gradient-to-b from-muted/70 to-background/80">
                <div className="relative h-44 w-full overflow-hidden">
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
                  <h2 className="font-display text-base font-semibold text-foreground">
                    {post.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
