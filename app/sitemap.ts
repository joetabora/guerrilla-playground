import type { MetadataRoute } from "next";

import { getAllBlogPosts } from "@/lib/blog";
import {
  getAllCollectionHandles,
  getAllProductSlugs,
} from "@/lib/products";
import { siteConfig } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/contact",
    "/cart",
    "/checkout",
    "/blog",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));

  const collectionRoutes: MetadataRoute.Sitemap = getAllCollectionHandles().map(
    (handle) => ({
      url: `${baseUrl}/collection/${handle}`,
      lastModified: new Date(),
    }),
  );

  const productRoutes: MetadataRoute.Sitemap = getAllProductSlugs().map(
    (slug) => ({
      url: `${baseUrl}/product/${slug}`,
      lastModified: new Date(),
    }),
  );

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...blogRoutes];
}
