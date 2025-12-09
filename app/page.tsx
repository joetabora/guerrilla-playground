/**
 * Guerrilla Social Club - Single Page Site
 * Fusing "Such Grime" gaming persona with "Joe's Used Harleys"
 * Toxico.co.uk aesthetic: punk/goth/hip-hop/tattoo art style
 */
import HeroSection from '@/components/HeroSection';
import LiveStreamSection from '@/components/LiveStreamSection';
import TheClubSection from '@/components/TheClubSection';
import JoesHarleysSection from '@/components/JoesHarleysSection';
import ContentGridSection from '@/components/ContentGridSection';
import SocialsGridSection from '@/components/SocialsGridSection';
import NewsletterSignupSection from '@/components/NewsletterSignupSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <HeroSection />

      {/* Live Stream Section */}
      <LiveStreamSection />

      {/* The Club Section */}
      <TheClubSection />

      {/* Joe's Used Harleys Section */}
      <JoesHarleysSection />

      {/* Content Grid Section */}
      <ContentGridSection />

      {/* Socials Grid Section */}
      <SocialsGridSection />

      {/* Newsletter Signup Section */}
      <NewsletterSignupSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
