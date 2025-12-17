import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getArticleJsonLd, getBreadcrumbSchema } from "@/lib/seo";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post not found",
      description: "This article could not be found.",
    };
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      url: `/blog/${post.slug}`,
      type: "article",
      images: [{ url: post.heroImage, alt: post.title }],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return notFound();

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);
  const articleJsonLd = getArticleJsonLd(post);

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <JsonLd schema={articleJsonLd} />

      <div className="bg-background py-10 md:py-14">
        <div className="container max-w-3xl space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {post.category}
            </p>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {post.title}
            </h1>
            <p className="text-xs text-muted-foreground">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              • {post.readTimeMinutes} min read
            </p>
          </div>

          <article className="prose prose-invert max-w-none prose-headings:font-display prose-p:text-sm prose-li:text-sm prose-strong:text-foreground">
            {post.content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2 key={index} className="mt-6 text-lg font-semibold">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list" && block.items) {
                return (
                  <ul key={index} className="list-disc space-y-1 pl-5 text-sm">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-sm text-muted-foreground">
                  {block.text}
                </p>
              );
            })}
          </article>
        </div>
      </div>
    </>
  );
}
