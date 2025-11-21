/**
 * Creator Personality Quiz Component
 * 6-8 questions that determine personality badge
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: Array<{
    text: string;
    scores: { [key: string]: number };
  }>;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'What drives your content creation?',
    options: [
      { text: 'Inspiring others with new ideas', scores: { visionary: 3, trendsetter: 1 } },
      { text: 'Setting trends and being first', scores: { trendsetter: 3, maverick: 1 } },
      { text: 'Breaking rules and being unique', scores: { maverick: 3, visionary: 1 } },
      { text: 'Building authentic connections', scores: { connector: 3, storyteller: 1 } }
    ]
  },
  {
    id: 2,
    question: 'How do you approach new trends?',
    options: [
      { text: 'I create them', scores: { trendsetter: 3, maverick: 2 } },
      { text: 'I adapt them to my style', scores: { visionary: 2, connector: 2 } },
      { text: 'I wait to see if they stick', scores: { storyteller: 2, connector: 1 } },
      { text: 'I ignore trends entirely', scores: { maverick: 3, visionary: 1 } }
    ]
  },
  {
    id: 3,
    question: 'What\'s your content style?',
    options: [
      { text: 'Polished and professional', scores: { visionary: 2, trendsetter: 2 } },
      { text: 'Raw and authentic', scores: { maverick: 3, connector: 2 } },
      { text: 'Story-driven and emotional', scores: { storyteller: 3, connector: 2 } },
      { text: 'Experimental and bold', scores: { maverick: 2, trendsetter: 3 } }
    ]
  },
  {
    id: 4,
    question: 'How do you engage with your audience?',
    options: [
      { text: 'Deep conversations and DMs', scores: { connector: 3, storyteller: 2 } },
      { text: 'Inspiring through vision', scores: { visionary: 3, trendsetter: 1 } },
      { text: 'Leading by example', scores: { trendsetter: 2, maverick: 2 } },
      { text: 'Challenging their perspectives', scores: { maverick: 3, visionary: 1 } }
    ]
  },
  {
    id: 5,
    question: 'What motivates you most?',
    options: [
      { text: 'Creating something new', scores: { visionary: 3, maverick: 2 } },
      { text: 'Being ahead of the curve', scores: { trendsetter: 3, maverick: 1 } },
      { text: 'Telling meaningful stories', scores: { storyteller: 3, connector: 2 } },
      { text: 'Building community', scores: { connector: 3, storyteller: 1 } }
    ]
  },
  {
    id: 6,
    question: 'How do you handle criticism?',
    options: [
      { text: 'Use it to refine my vision', scores: { visionary: 2, trendsetter: 1 } },
      { text: 'Stay true to my path', scores: { maverick: 3, connector: 2 } },
      { text: 'Engage in dialogue', scores: { connector: 3, storyteller: 2 } },
      { text: 'Turn it into content', scores: { storyteller: 2, maverick: 2 } }
    ]
  },
  {
    id: 7,
    question: 'What\'s your biggest strength?',
    options: [
      { text: 'Innovation and ideas', scores: { visionary: 3, trendsetter: 1 } },
      { text: 'Trend-spotting', scores: { trendsetter: 3, visionary: 1 } },
      { text: 'Authenticity and uniqueness', scores: { maverick: 3, connector: 1 } },
      { text: 'Connection and empathy', scores: { connector: 3, storyteller: 2 } }
    ]
  },
  {
    id: 8,
    question: 'What legacy do you want to leave?',
    options: [
      { text: 'Inspiring future creators', scores: { visionary: 3, storyteller: 2 } },
      { text: 'Setting the trends', scores: { trendsetter: 3, maverick: 1 } },
      { text: 'Being remembered as unique', scores: { maverick: 3, connector: 1 } },
      { text: 'Building lasting communities', scores: { connector: 3, storyteller: 2 } }
    ]
  }
];

const BADGES = {
  visionary: {
    name: 'The Visionary',
    description: 'You see possibilities others don\'t. Your content inspires and pushes boundaries.',
    color: 'magenta',
    icon: '✨'
  },
  trendsetter: {
    name: 'The Trendsetter',
    description: 'You\'re always ahead of the curve. Others follow your lead.',
    color: 'lime',
    icon: '🔥'
  },
  maverick: {
    name: 'The Maverick',
    description: 'You break rules and create your own path. Uniqueness is your superpower.',
    color: 'cyan',
    icon: '⚡'
  },
  connector: {
    name: 'The Connector',
    description: 'You build bridges and communities. Your authenticity creates deep bonds.',
    color: 'magenta',
    icon: '🤝'
  },
  storyteller: {
    name: 'The Storyteller',
    description: 'You weave narratives that move people. Emotion and authenticity drive you.',
    color: 'lime',
    icon: '📖'
  }
};

export default function CreatorQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<keyof typeof BADGES | null>(null);
  const [creatorId] = useState(() => `creator-${Date.now()}`);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers: number[]) => {
    const scores: { [key: string]: number } = {
      visionary: 0,
      trendsetter: 0,
      maverick: 0,
      connector: 0,
      storyteller: 0
    };

    finalAnswers.forEach((answerIndex, questionIndex) => {
      const option = QUESTIONS[questionIndex].options[answerIndex];
      Object.entries(option.scores).forEach(([type, score]) => {
        scores[type] += score;
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    const resultType = Object.keys(scores).find(
      key => scores[key] === maxScore
    ) as keyof typeof BADGES;

    setResult(resultType);

    // Save badge to JSON
    await fetch('/api/save-badge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creatorId,
        badge: resultType,
        timestamp: new Date().toISOString()
      })
    });

    // Confetti!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF2D95', '#A6FF00', '#00FFD6']
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const badge = BADGES[result];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-ink border border-white/10 rounded-2xl p-12 text-center"
      >
        <div className="text-8xl mb-6">{badge.icon}</div>
        <h2 className="text-4xl font-black text-white mb-4">{badge.name}</h2>
        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">{badge.description}</p>
        
        <div className={`inline-block px-6 py-3 bg-${badge.color} text-${badge.color === 'lime' || badge.color === 'cyan' ? 'charcoal' : 'white'} font-bold text-lg uppercase tracking-tight rounded-lg mb-8`}>
          {badge.name.toUpperCase()}
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-transparent border-2 border-white/20 text-white font-bold rounded-lg hover:border-white/40 transition-colors"
          >
            Retake Quiz
          </button>
          <button
            onClick={() => window.location.href = '/creators'}
            className="px-6 py-3 bg-magenta text-white font-bold rounded-lg shadow-glow-magenta hover:bg-magenta/90 transition-colors"
          >
            Join as Creator
          </button>
        </div>
      </motion.div>
    );
  }

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="bg-ink border border-white/10 rounded-2xl p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-white/60 text-sm">Question {currentQuestion + 1} of {QUESTIONS.length}</span>
          <span className="text-white/60 text-sm">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-charcoal rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-magenta"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-black text-white mb-8">{question.question}</h2>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-4 bg-charcoal border border-white/10 rounded-lg text-left text-white hover:border-magenta hover:bg-charcoal/80 transition-all text-lg"
                aria-label={`Answer: ${option.text}`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

