import { HeroSection } from "@/components/sections/hero-section";
import { BestSellersSection } from "@/components/sections/best-sellers-section";
import { BlogTeasersSection } from "@/components/sections/blog-teasers-section";
import { CollectionsGridSection } from "@/components/sections/collections-grid-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { TrustBadgesSection } from "@/components/sections/trust-badges-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBadgesSection />
      <BestSellersSection />
      <CollectionsGridSection />
      <ReviewsSection />
      <BlogTeasersSection />
    </>
  );
}
