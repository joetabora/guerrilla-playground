/**
 * Guerrilla Social Club - Single Page Site
 * Fusing "Such Grime" gaming persona with "Joe's Used Harleys"
 * Toxico.co.uk aesthetic: punk/goth/hip-hop/tattoo art style
 */
import HeroSection from '@/components/HeroSection';
import GrimesGarageSection from '@/components/GrimesGarageSection';
import TheClubSection from '@/components/TheClubSection';
import JoesHarleysSection from '@/components/JoesHarleysSection';
import ContentGridSection from '@/components/ContentGridSection';
import SocialsGridSection from '@/components/SocialsGridSection';
import NewsletterSignupSection from '@/components/NewsletterSignupSection';
import Footer from '@/components/Footer';
import FloatingSocialButtons from '@/components/FloatingSocialButtons';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Floating Social Buttons - Always Visible */}
      <FloatingSocialButtons />

      {/* Hero Section with Twitch + TikTok */}
      <HeroSection />

      {/* Grime's Garage Section */}
      <GrimesGarageSection />

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
