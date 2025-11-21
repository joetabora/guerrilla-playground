/**
 * Creator Personality Quiz Page
 * 6-8 questions that generate a personality badge
 */
import CreatorQuiz from '@/components/CreatorQuiz';

export const metadata = {
  title: 'Creator Personality Quiz',
  description: 'Discover your creator personality type and get your badge.'
};

export default function CreatorQuizPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
            Creator <span className="text-lime">Quiz</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Answer a few questions to discover your creator personality and earn your badge.
          </p>
        </div>
        <CreatorQuiz />
      </div>
    </div>
  );
}

