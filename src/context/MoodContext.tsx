import React, { createContext, useContext, useState } from 'react';

type Mood = 'happy' | 'sad' | 'calm' | 'anxious' | 'tired' | 'frustrated' | 'better' | 'relaxed' | 'inspired' | 'empowered' | 'thoughtful' | 'same';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  title: string;
  description: string;
  duration: string;
  questions: QuizQuestion[];
  reward: number;
}

interface MoodContextType {
  currentMood: Mood | null;
  setCurrentMood: (mood: Mood) => void;
  getMoodTheme: () => {
    gradient: string;
    primaryColor: string;
    secondaryColor: string;
  };
  getMoodContent: () => {
    articles: Array<{
      title: string;
      excerpt: string;
      readTime: string;
    }>;
    quizzes: Quiz[];
  };
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

const moodThemes: Record<Mood, { gradient: string; primaryColor: string; secondaryColor: string }> = {
  happy: {
    gradient: 'from-yellow-400 via-orange-400 to-pink-400 dark:from-yellow-900 dark:via-orange-900 dark:to-pink-900',
    primaryColor: 'text-yellow-400',
    secondaryColor: 'text-orange-400'
  },
  sad: {
    gradient: 'from-blue-400 via-indigo-400 to-purple-400 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900',
    primaryColor: 'text-blue-400',
    secondaryColor: 'text-indigo-400'
  },
  calm: {
    gradient: 'from-green-400 via-teal-400 to-cyan-400 dark:from-green-900 dark:via-teal-900 dark:to-cyan-900',
    primaryColor: 'text-green-400',
    secondaryColor: 'text-teal-400'
  },
  anxious: {
    gradient: 'from-red-400 via-pink-400 to-purple-400 dark:from-red-900 dark:via-pink-900 dark:to-purple-900',
    primaryColor: 'text-red-400',
    secondaryColor: 'text-pink-400'
  },
  tired: {
    gradient: 'from-gray-400 via-slate-400 to-zinc-400 dark:from-gray-900 dark:via-slate-900 dark:to-zinc-900',
    primaryColor: 'text-gray-400',
    secondaryColor: 'text-slate-400'
  },
  frustrated: {
    gradient: 'from-orange-400 via-red-400 to-pink-400 dark:from-orange-900 dark:via-red-900 dark:to-pink-900',
    primaryColor: 'text-orange-400',
    secondaryColor: 'text-red-400'
  },
  better: {
    gradient: 'from-emerald-400 via-green-400 to-teal-400 dark:from-emerald-900 dark:via-green-900 dark:to-teal-900',
    primaryColor: 'text-emerald-400',
    secondaryColor: 'text-green-400'
  },
  relaxed: {
    gradient: 'from-blue-400 via-cyan-400 to-teal-400 dark:from-blue-900 dark:via-cyan-900 dark:to-teal-900',
    primaryColor: 'text-blue-400',
    secondaryColor: 'text-cyan-400'
  },
  inspired: {
    gradient: 'from-purple-400 via-violet-400 to-indigo-400 dark:from-purple-900 dark:via-violet-900 dark:to-indigo-900',
    primaryColor: 'text-purple-400',
    secondaryColor: 'text-violet-400'
  },
  empowered: {
    gradient: 'from-pink-400 via-rose-400 to-red-400 dark:from-pink-900 dark:via-rose-900 dark:to-red-900',
    primaryColor: 'text-pink-400',
    secondaryColor: 'text-rose-400'
  },
  thoughtful: {
    gradient: 'from-indigo-400 via-purple-400 to-pink-400 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900',
    primaryColor: 'text-indigo-400',
    secondaryColor: 'text-purple-400'
  },
  same: {
    gradient: 'from-blue-400 via-violet-400 to-fuchsia-400 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900',
    primaryColor: 'text-blue-400',
    secondaryColor: 'text-violet-400'
  }
};

const moodContent: Record<Mood, { articles: Array<{ title: string; excerpt: string; readTime: string }>; quizzes: Quiz[] }> = {
  happy: {
    articles: [
      {
        title: "Maintaining Your Positive Energy",
        excerpt: "Learn how to sustain and share your positive energy with others.",
        readTime: "5 min read"
      },
      {
        title: "The Science of Happiness",
        excerpt: "Understanding the psychology behind happiness and how to cultivate it.",
        readTime: "7 min read"
      }
    ],
    quizzes: [
      {
        title: "Happiness Enhancement Quiz",
        description: "Explore and strengthen your positive mindset",
        duration: "20 min",
        reward: 50,
        questions: [
          {
            question: "What's the best way to maintain a positive mood?",
            options: ["Regular exercise", "Isolating yourself", "Avoiding challenges", "Suppressing emotions"],
            correctAnswer: 0
          },
          {
            question: "How does gratitude affect happiness?",
            options: ["No effect", "Decreases happiness", "Increases happiness", "Makes no difference"],
            correctAnswer: 2
          },
          {
            question: "Which activity best promotes lasting happiness?",
            options: ["Social connections", "Material purchases", "Temporary pleasures", "Avoiding others"],
            correctAnswer: 0
          },
          {
            question: "What role does sleep play in maintaining happiness?",
            options: ["No role", "Minor role", "Major role", "Negative role"],
            correctAnswer: 2
          },
          {
            question: "How can you share happiness with others?",
            options: ["Keep it to yourself", "Random acts of kindness", "Avoid interaction", "Stay neutral"],
            correctAnswer: 1
          },
          {
            question: "What's the relationship between exercise and mood?",
            options: ["No relationship", "Exercise improves mood", "Exercise worsens mood", "They're unrelated"],
            correctAnswer: 1
          },
          {
            question: "How does nature affect happiness levels?",
            options: ["No effect", "Negative effect", "Positive effect", "Depends on weather"],
            correctAnswer: 2
          },
          {
            question: "What's the best way to start your day positively?",
            options: ["Check social media", "Morning routine", "Skip breakfast", "Stay in bed"],
            correctAnswer: 1
          },
          {
            question: "How does helping others affect personal happiness?",
            options: ["Decreases it", "No effect", "Increases it", "Depends on recognition"],
            correctAnswer: 2
          },
          {
            question: "What role does music play in mood enhancement?",
            options: ["No role", "Major role", "Minor role", "Negative role"],
            correctAnswer: 1
          },
          {
            question: "How can you maintain happiness during challenges?",
            options: ["Avoid challenges", "Focus on growth", "Give up easily", "Ignore problems"],
            correctAnswer: 1
          },
          {
            question: "What's the impact of positive self-talk?",
            options: ["Negative impact", "No impact", "Positive impact", "Temporary effect"],
            correctAnswer: 2
          },
          {
            question: "How does goal achievement affect happiness?",
            options: ["No effect", "Decreases it", "Increases it", "Makes no difference"],
            correctAnswer: 2
          },
          {
            question: "What's the best way to spread positivity?",
            options: ["Keep to yourself", "Share compliments", "Stay neutral", "Avoid interaction"],
            correctAnswer: 1
          },
          {
            question: "How does creativity influence happiness?",
            options: ["No influence", "Negative influence", "Positive influence", "Temporary effect"],
            correctAnswer: 2
          }
        ]
      }
    ]
  },
  sad: {
    articles: [
      {
        title: "Understanding and Managing Sadness",
        excerpt: "A compassionate guide to dealing with feelings of sadness.",
        readTime: "6 min read"
      },
      {
        title: "Building Emotional Resilience",
        excerpt: "Develop strength to face life's challenges.",
        readTime: "8 min read"
      }
    ],
    quizzes: [
      {
        title: "Emotional Understanding & Growth",
        description: "Learn to navigate and understand your emotions",
        duration: "20 min",
        reward: 50,
        questions: [
          {
            question: "What's a healthy way to process sadness?",
            options: ["Suppress it", "Acknowledge and feel it", "Ignore it", "Avoid it"],
            correctAnswer: 1
          },
          {
            question: "How can you reach out for support?",
            options: ["Keep it inside", "Talk to friends/family", "Avoid everyone", "Pretend to be happy"],
            correctAnswer: 1
          },
          {
            question: "What role does self-care play when feeling sad?",
            options: ["No role", "Essential role", "Minor role", "Negative role"],
            correctAnswer: 1
          },
          {
            question: "How can physical activity help with sadness?",
            options: ["It can't help", "Releases endorphins", "Makes it worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What's the best way to start healing?",
            options: ["Ignore feelings", "Seek support", "Isolate yourself", "Suppress emotions"],
            correctAnswer: 1
          },
          {
            question: "How does journaling help with emotions?",
            options: ["It doesn't help", "Provides clarity", "Makes things worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What role does sleep play in emotional health?",
            options: ["No role", "Crucial role", "Minor role", "Negative role"],
            correctAnswer: 1
          },
          {
            question: "How can mindfulness help with sadness?",
            options: ["It can't help", "Increases awareness", "Makes it worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What's the value of expressing emotions?",
            options: ["No value", "Helps healing", "Makes things worse", "Should be avoided"],
            correctAnswer: 1
          },
          {
            question: "How can routine help during sad times?",
            options: ["It can't help", "Provides structure", "Makes things worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What role does nature play in healing?",
            options: ["No role", "Calming effect", "Negative effect", "Makes no difference"],
            correctAnswer: 1
          },
          {
            question: "How can creativity help process emotions?",
            options: ["It can't help", "Provides outlet", "Makes things worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What's the importance of self-compassion?",
            options: ["Not important", "Very important", "Makes things worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "How can helping others affect your mood?",
            options: ["No effect", "Positive effect", "Negative effect", "Makes things worse"],
            correctAnswer: 1
          },
          {
            question: "What role does patience play in healing?",
            options: ["No role", "Essential role", "Minor role", "Negative role"],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  calm: {
    articles: [
      {
        title: "Maintaining Inner Peace",
        excerpt: "Techniques to preserve your sense of calm in daily life.",
        readTime: "5 min read"
      },
      {
        title: "Mindfulness for Beginners",
        excerpt: "Start your mindfulness journey with simple practices.",
        readTime: "6 min read"
      }
    ],
    quizzes: [
      {
        title: "Inner Peace Mastery",
        description: "Deepen your understanding of calmness and serenity",
        duration: "20 min",
        reward: 50,
        questions: [
          {
            question: "What's the foundation of inner peace?",
            options: ["External factors", "Self-awareness", "Others' approval", "Material success"],
            correctAnswer: 1
          },
          {
            question: "How does meditation contribute to calmness?",
            options: ["It doesn't help", "Deepens peace", "Creates stress", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What role does acceptance play?",
            options: ["No role", "Essential role", "Minor role", "Negative role"],
            correctAnswer: 1
          },
          {
            question: "How can you maintain calm in chaos?",
            options: ["Avoid chaos", "Stay centered", "React quickly", "Give up"],
            correctAnswer: 1
          },
          {
            question: "What's the best way to start your day calmly?",
            options: ["Rush around", "Mindful routine", "Skip breakfast", "Check phone"],
            correctAnswer: 1
          },
          {
            question: "How does nature connect to inner peace?",
            options: ["No connection", "Direct connection", "Negative effect", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What role does breathing play?",
            options: ["No role", "Central role", "Minor role", "Negative role"],
            correctAnswer: 1
          },
          {
            question: "How can you create a peaceful environment?",
            options: ["Can't control it", "Mindful design", "Ignore surroundings", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What's the value of silence?",
            options: ["No value", "Deep value", "Negative value", "Makes no difference"],
            correctAnswer: 1
          },
          {
            question: "How does gratitude affect peace?",
            options: ["No effect", "Enhances it", "Reduces it", "Makes no difference"],
            correctAnswer: 1
          },
          {
            question: "What role does forgiveness play?",
            options: ["No role", "Essential role", "Minor role", "Negative role"],
            correctAnswer: 1
          },
          {
            question: "How can routine support calmness?",
            options: ["It can't help", "Creates stability", "Causes stress", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What's the importance of boundaries?",
            options: ["Not important", "Very important", "Causes stress", "No effect"],
            correctAnswer: 1
          },
          {
            question: "How does simplicity contribute to peace?",
            options: ["It doesn't", "Reduces chaos", "Creates stress", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What role does patience play?",
            options: ["No role", "Essential role", "Minor role", "Negative role"],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  anxious: {
    articles: [
      {
        title: "Coping with Anxiety",
        excerpt: "Practical strategies for managing anxiety in daily life.",
        readTime: "7 min read"
      },
      {
        title: "Breathing Techniques for Anxiety",
        excerpt: "Learn effective breathing exercises to reduce anxiety.",
        readTime: "5 min read"
      }
    ],
    quizzes: [
      {
        title: "Anxiety Management Mastery",
        description: "Learn effective strategies to manage anxiety",
        duration: "20 min",
        reward: 50,
        questions: [
          {
            question: "What's the first step in managing anxiety?",
            options: ["Ignore it", "Recognize triggers", "Avoid situations", "Panic"],
            correctAnswer: 1
          },
          {
            question: "How does deep breathing help anxiety?",
            options: ["It doesn't help", "Calms nervous system", "Makes it worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What role does exercise play in anxiety?",
            options: ["No role", "Reduces anxiety", "Increases anxiety", "Makes no difference"],
            correctAnswer: 1
          },
          {
            question: "How can mindfulness help with anxiety?",
            options: ["It can't help", "Grounds you", "Makes it worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What's the best way to handle anxious thoughts?",
            options: ["Suppress them", "Challenge them", "Believe them", "Ignore them"],
            correctAnswer: 1
          },
          {
            question: "How does sleep affect anxiety levels?",
            options: ["No effect", "Major impact", "Minor impact", "Makes it worse"],
            correctAnswer: 1
          },
          {
            question: "What role does caffeine play in anxiety?",
            options: ["Helps anxiety", "Can increase it", "No effect", "Reduces it"],
            correctAnswer: 1
          },
          {
            question: "How can routine help with anxiety?",
            options: ["It can't help", "Provides stability", "Makes it worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What's the value of support systems?",
            options: ["No value", "Essential", "Makes things worse", "Doesn't matter"],
            correctAnswer: 1
          },
          {
            question: "How can progressive relaxation help?",
            options: ["It can't help", "Reduces tension", "Increases anxiety", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What role does diet play in anxiety?",
            options: ["No role", "Significant role", "Minor role", "Makes it worse"],
            correctAnswer: 1
          },
          {
            question: "How can journaling help with anxiety?",
            options: ["It can't help", "Processes thoughts", "Makes it worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What's the importance of boundaries?",
            options: ["Not important", "Very important", "Makes things worse", "No effect"],
            correctAnswer: 1
          },
          {
            question: "How can nature walks help anxiety?",
            options: ["They can't help", "Calming effect", "Increase anxiety", "No effect"],
            correctAnswer: 1
          },
          {
            question: "What role does music play in anxiety?",
            options: ["No role", "Can be calming", "Always negative", "Makes no difference"],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  tired: {
    articles: [
      {
        title: "Understanding Sleep and Energy",
        excerpt: "Learn about the connection between sleep and energy levels.",
        readTime: "6 min read"
      },
      {
        title: "Energy Management Tips",
        excerpt: "Practical ways to boost and maintain your energy.",
        readTime: "5 min read"
      }
    ],
    quizzes: [
      {
        title: "Energy Management Mastery",
        description: "Learn to optimize your energy levels",
        duration: "20 min",
        reward: 50,
        questions: [
          {
            question: "What's the most important factor for energy?",
            options: ["Caffeine", "Quality sleep", "Busy schedule", "Working more"],
            correctAnswer: 1
          },
          {
            question: "How does nutrition affect energy?",
            options: ["No effect", "Major impact", "Minor impact", "Negative impact"],
            correctAnswer: 1
          },
          {
            question: "What role does hydration play?",
            options: ["No role", "Essential role", "Minor role", "Negative role"],
            correctAnswer: 1
          },
          {
            question: "How can you optimize your sleep?",
            options: ["Random schedule", "Consistent routine", "Late nights", "Skip sleep"],
            correctAnswer: 1
          },
          {
            question: "What's the best way to manage stress?",
            options: ["Ignore it", "Address it", "Avoid it", "Suppress it"],
            correctAnswer: 1
          },
          {
            question: "How does exercise impact energy?",
            options: ["Drains it", "Boosts it", "No effect", "Always tiring"],
            correctAnswer: 1
          },
          {
            question: "What role do breaks play?",
            options: ["Waste time", "Restore energy", "No effect", "Reduce productivity"],
            correctAnswer: 1
          },
          {
            question: "How can you prevent burnout?",
            options: ["Work more", "Set boundaries", "Skip breaks", "Ignore signs"],
            correctAnswer: 1
          },
          {
            question: "What's the value of power naps?",
            options: ["No value", "Refresh mind", "Waste time", "Make tired"],
            correctAnswer: 1
          },
          {
            question: "How does natural light affect energy?",
            options: ["No effect", "Boosts energy", "Drains energy", "Makes no difference"],
            correctAnswer: 1
          },
          {
            question: "What role does breathing play?",
            options: ["No role", "Energizes body", "Makes tired", "No effect"],
            correctAnswer: 1
          },
          {
            question: "How can you maintain energy throughout day?",
            options: ["One big meal", "Regular small meals", "Skip meals", "Constant snacking"],
            correctAnswer: 1
          },
          {
            question: "What's the importance of morning routine?",
            options: ["Not important", "Sets daily tone", "Waste of time", "No effect"],
            correctAnswer: 1
          },
          {
            question: "How does clutter affect energy?",
            options: ["No effect", "Drains energy", "Boosts energy", "Makes no difference"],
            correctAnswer: 1
          },
          {
            question: "What role does mindset play?",
            options: ["No role", "Major role", "Minor role", "Negative role"],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  frustrated: {
    articles: [
      {
        title: "Managing Frustration Effectively",
        excerpt: "Learn healthy ways to handle and express frustration.",
        readTime: "6 min read"
      },
      {
        title: "Stress Management Techniques",
        excerpt: "Practical strategies for reducing stress and frustration.",
        readTime: "7 min read"
      }
    ],
    quizzes: [
      {
        title: "Stress Management Assessment",
        description: "Evaluate your stress management strategies",
        duration: "15 min",
        reward: 30,
        questions: [
          {
            question: "What's the healthiest way to express frustration?",
            options: ["Physical aggression", "Verbal outbursts", "Constructive communication", "Suppression"],
            correctAnswer: 2
          },
          {
            question: "Which technique helps manage frustration?",
            options: ["Ignoring feelings", "Mindful breathing", "Avoiding problems", "Constant activity"],
            correctAnswer: 1
          }
        ]
      },
      {
        title: "Emotional Regulation Quiz",
        description: "Test your knowledge about managing emotions effectively",
        duration: "12 min",
        reward: 24,
        questions: [
          {
            question: "What's the first step in managing frustration?",
            options: ["Reacting immediately", "Taking a pause", "Ignoring it", "Expressing anger"],
            correctAnswer: 1
          },
          {
            question: "Which practice helps prevent frustration?",
            options: ["Setting boundaries", "Avoiding problems", "Suppressing emotions", "Constant activity"],
            correctAnswer: 0
          }
        ]
      }
    ]
  },
  better: {
    articles: [
      {
        title: "Building on Your Progress",
        excerpt: "How to maintain and build upon your positive changes.",
        readTime: "6 min read"
      },
      {
        title: "Celebrating Small Wins",
        excerpt: "The importance of acknowledging and celebrating progress.",
        readTime: "5 min read"
      }
    ],
    quizzes: [
      {
        title: "Progress Tracking",
        description: "Assess your journey and set new goals",
        duration: "15 min",
        reward: 30,
        questions: [
          {
            question: "What's the best way to track personal growth?",
            options: ["Ignoring progress", "Regular reflection", "Comparing to others", "Setting unrealistic goals"],
            correctAnswer: 1
          },
          {
            question: "Which practice helps maintain progress?",
            options: ["Avoiding challenges", "Regular self-assessment", "Ignoring setbacks", "Constant activity"],
            correctAnswer: 1
          }
        ]
      },
      {
        title: "Growth Mindset Quiz",
        description: "Test your knowledge about maintaining positive growth",
        duration: "12 min",
        reward: 24,
        questions: [
          {
            question: "What's the key to sustaining improvement?",
            options: ["Avoiding challenges", "Consistent effort", "Ignoring setbacks", "Quick fixes"],
            correctAnswer: 1
          },
          {
            question: "Which mindset promotes continued growth?",
            options: ["Fixed mindset", "Growth mindset", "Avoidance mindset", "Perfectionist mindset"],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  relaxed: {
    articles: [
      {
        title: "Maintaining Your Relaxation",
        excerpt: "Tips for keeping your relaxed state throughout the day.",
        readTime: "5 min read"
      },
      {
        title: "Creating a Peaceful Environment",
        excerpt: "How to create and maintain a calming space.",
        readTime: "6 min read"
      }
    ],
    quizzes: [
      {
        title: "Relaxation Readiness",
        description: "Evaluate your relaxation techniques",
        duration: "15 min",
        reward: 30,
        questions: [
          {
            question: "What's the most effective relaxation technique?",
            options: ["Constant activity", "Deep breathing", "Stressful situations", "Late nights"],
            correctAnswer: 1
          },
          {
            question: "Which environment promotes relaxation?",
            options: ["Noisy and busy", "Clean and peaceful", "Dark and cold", "Bright and loud"],
            correctAnswer: 1
          }
        ]
      },
      {
        title: "Stress Relief Assessment",
        description: "Test your knowledge about maintaining relaxation",
        duration: "12 min",
        reward: 24,
        questions: [
          {
            question: "What's the best way to maintain relaxation?",
            options: ["Avoiding all stress", "Regular practice", "Ignoring problems", "Constant activity"],
            correctAnswer: 1
          },
          {
            question: "Which activity promotes lasting relaxation?",
            options: ["Screen time", "Mindful meditation", "Late night activities", "Heavy meals"],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  inspired: {
    articles: [
      {
        title: "Channeling Your Inspiration",
        excerpt: "How to use your inspiration to create positive change.",
        readTime: "6 min read"
      },
      {
        title: "Setting Inspired Goals",
        excerpt: "Turn your inspiration into actionable goals.",
        readTime: "7 min read"
      }
    ],
    quizzes: [
      {
        title: "Inspiration Assessment",
        description: "Evaluate your creative and motivational energy",
        duration: "15 min",
        reward: 30,
        questions: [
          {
            question: "What's the best way to maintain inspiration?",
            options: ["Waiting for it", "Regular creative practice", "Avoiding challenges", "Constant activity"],
            correctAnswer: 1
          },
          {
            question: "Which environment fosters creativity?",
            options: ["Strict routine", "Flexible and supportive", "Chaotic", "Isolated"],
            correctAnswer: 1
          }
        ]
      },
      {
        title: "Creative Energy Quiz",
        description: "Test your knowledge about sustaining inspiration",
        duration: "12 min",
        reward: 24,
        questions: [
          {
            question: "What's the key to staying inspired?",
            options: ["Avoiding challenges", "Regular exposure to new ideas", "Sticking to routine", "Isolation"],
            correctAnswer: 1
          },
          {
            question: "Which practice helps maintain creativity?",
            options: ["Strict schedule", "Regular breaks", "Constant work", "Avoiding rest"],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  empowered: {
    articles: [
      {
        title: "Building on Your Strength",
        excerpt: "How to maintain and grow your sense of empowerment.",
        readTime: "6 min read"
      },
      {
        title: "Setting Boundaries",
        excerpt: "Learn to set healthy boundaries that support your growth.",
        readTime: "7 min read"
      }
    ],
    quizzes: [
      {
        title: "Empowerment Assessment",
        description: "Evaluate your personal growth and boundaries",
        duration: "15 min",
        reward: 30,
        questions: [
          {
            question: "What's the foundation of personal empowerment?",
            options: ["External validation", "Self-awareness", "Avoiding challenges", "Constant activity"],
            correctAnswer: 1
          },
          {
            question: "Which practice strengthens boundaries?",
            options: ["Avoiding people", "Clear communication", "Suppressing needs", "Constant activity"],
            correctAnswer: 1
          }
        ]
      },
      {
        title: "Personal Growth Quiz",
        description: "Test your knowledge about maintaining empowerment",
        duration: "12 min",
        reward: 24,
        questions: [
          {
            question: "What's the best way to maintain empowerment?",
            options: ["Avoiding challenges", "Regular self-reflection", "Ignoring growth", "Constant activity"],
            correctAnswer: 1
          },
          {
            question: "Which mindset promotes empowerment?",
            options: ["Victim mindset", "Growth mindset", "Avoidance mindset", "Dependent mindset"],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  thoughtful: {
    articles: [
      {
        title: "Deepening Your Self-Reflection",
        excerpt: "Techniques for meaningful self-reflection and growth.",
        readTime: "7 min read"
      },
      {
        title: "Mindful Decision Making",
        excerpt: "How to make thoughtful decisions in your life.",
        readTime: "6 min read"
      }
    ],
    quizzes: [
      {
        title: "Self-Reflection Assessment",
        description: "Evaluate your reflective practices",
        duration: "15 min",
        reward: 30,
        questions: [
          {
            question: "What's the most effective reflection practice?",
            options: ["Avoiding reflection", "Regular journaling", "Ignoring thoughts", "Constant activity"],
            correctAnswer: 1
          },
          {
            question: "Which approach enhances self-awareness?",
            options: ["Avoiding challenges", "Mindful observation", "Suppressing emotions", "Constant activity"],
            correctAnswer: 1
          }
        ]
      },
      {
        title: "Mindful Decision Making",
        description: "Test your knowledge about thoughtful decision-making",
        duration: "12 min",
        reward: 24,
        questions: [
          {
            question: "What's the key to making thoughtful decisions?",
            options: ["Quick reactions", "Careful consideration", "Avoiding choices", "Constant activity"],
            correctAnswer: 1
          },
          {
            question: "Which practice improves decision-making?",
            options: ["Ignoring consequences", "Regular reflection", "Avoiding responsibility", "Constant activity"],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  same: {
    articles: [
      {
        title: "Understanding Your Current State",
        excerpt: "Learn to recognize and work with your current emotional state.",
        readTime: "6 min read"
      },
      {
        title: "Building Emotional Awareness",
        excerpt: "Develop greater awareness of your emotional patterns.",
        readTime: "7 min read"
      }
    ],
    quizzes: [
      {
        title: "Emotional Awareness Check",
        description: "Assess your emotional awareness and patterns",
        duration: "15 min",
        reward: 30,
        questions: [
          {
            question: "What's the foundation of emotional awareness?",
            options: ["Ignoring emotions", "Self-observation", "Avoiding feelings", "Constant activity"],
            correctAnswer: 1
          },
          {
            question: "Which practice enhances emotional understanding?",
            options: ["Suppressing emotions", "Regular reflection", "Avoiding challenges", "Constant activity"],
            correctAnswer: 1
          }
        ]
      },
      {
        title: "Personal State Assessment",
        description: "Test your knowledge about understanding your current state",
        duration: "12 min",
        reward: 24,
        questions: [
          {
            question: "What's the best way to understand your current state?",
            options: ["Ignoring it", "Regular self-check-ins", "Avoiding reflection", "Constant activity"],
            correctAnswer: 1
          },
          {
            question: "Which practice helps maintain awareness?",
            options: ["Avoiding challenges", "Mindful observation", "Suppressing emotions", "Constant activity"],
            correctAnswer: 1
          }
        ]
      }
    ]
  }
};

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);

  const getMoodTheme = () => {
    if (!currentMood) return moodThemes.same;
    return moodThemes[currentMood];
  };

  const getMoodContent = () => {
    if (!currentMood) return moodContent.same;
    return moodContent[currentMood];
  };

  return (
    <MoodContext.Provider value={{ currentMood, setCurrentMood, getMoodTheme, getMoodContent }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
} 