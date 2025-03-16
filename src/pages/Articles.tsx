import React, { useState } from 'react';
import { BookOpen, Clock, Heart, Share2, ArrowLeft, Star, ChevronLeft, Check } from 'lucide-react';
import { useMood } from '../context/MoodContext';

interface ArticlesProps {
  onBack: () => void;
  onCoinsEarned: (amount: number) => void;
}

interface Article {
  title: string;
  excerpt: string;
  readTime: string;
  likes: number;
  content: string;
  reward: number;
  image: string;
  contentImages?: string[];
}

export function Articles({ onBack, onCoinsEarned }: ArticlesProps) {
  const { currentMood, getMoodTheme } = useMood();
  const moodTheme = getMoodTheme();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set());
  const [coins, setCoins] = useState<number>(0);
  const [showReward, setShowReward] = useState(false);

  const articles: Article[] = [
    {
      title: `Understanding Your ${currentMood?.charAt(0).toUpperCase()}${currentMood?.slice(1)} State`,
      excerpt: `Learn more about feeling ${currentMood} and how to make the most of this emotional state.`,
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1000',
      contentImages: [
        'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1474418397713-2f1091139b9e?auto=format&fit=crop&q=80&w=1000'
      ],
      content: `Understanding your emotional state is crucial for mental well-being. When you're feeling ${currentMood}, it's important to recognize that this is a natural part of the human experience.

Your ${currentMood} state might be influenced by various factors:

1. Environmental triggers
2. Physical well-being
3. Recent experiences
4. Social interactions
5. Sleep patterns

Research shows that acknowledging and accepting your emotions is the first step toward managing them effectively. When you're ${currentMood}, your brain is actually helping you process important information about your environment and experiences.

Tips for working with this emotion:
• Practice mindful awareness
• Engage in gentle physical activity
• Connect with supportive people
• Express yourself through creative activities
• Maintain regular self-care routines

Remember, every emotion serves a purpose, and understanding your ${currentMood} state can help you grow stronger and more resilient.`,
      readTime: "5 min read",
      likes: 128,
      reward: 25
    },
    {
      title: `Mindfulness Practices for ${currentMood?.charAt(0).toUpperCase()}${currentMood?.slice(1)} Moments`,
      excerpt: `Discover specific mindfulness techniques that work well when you're feeling ${currentMood}.`,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
      contentImages: [
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=1000'
      ],
      content: `Mindfulness can be particularly helpful when you're experiencing ${currentMood} feelings. Here are some practices specifically designed for your current emotional state:

1. Grounding Exercise
   • Feel your feet on the ground
   • Notice five things you can see
   • Identify four things you can touch
   • Listen for three distinct sounds
   • Notice two things you can smell
   • Be aware of one thing you can taste

2. Breathing Technique
   • Inhale for 4 counts
   • Hold for 4 counts
   • Exhale for 4 counts
   • Repeat 5-10 times

3. Body Scan Meditation
   Start from your toes and gradually move attention up through your body, releasing tension as you go.

4. Mindful Movement
   Simple stretches or gentle movements while maintaining awareness of physical sensations.

Practice these techniques regularly to build your mindfulness muscle and better manage ${currentMood} moments.`,
      readTime: "7 min read",
      likes: 245,
      reward: 30
    },
    {
      title: `The Science Behind ${currentMood?.charAt(0).toUpperCase()}${currentMood?.slice(1)} Emotions`,
      excerpt: `Explore the psychological and neurological aspects of ${currentMood} feelings.`,
      image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
      contentImages: [
        'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=1000'
      ],
      content: `The science behind ${currentMood} emotions is fascinating. When you experience this emotion, several brain regions and neurochemicals are at work:

Key Brain Regions Involved:
1. Amygdala - Emotional Processing
2. Prefrontal Cortex - Emotion Regulation
3. Hippocampus - Memory Formation
4. Insula - Body Awareness

Neurochemical Activity:
• Serotonin - Mood Regulation
• Dopamine - Reward and Pleasure
• Norepinephrine - Alertness
• Oxytocin - Social Bonding

Understanding these biological processes can help you:
- Recognize the naturalness of your emotions
- Identify effective coping strategies
- Make informed lifestyle choices
- Better manage your emotional well-being

Your ${currentMood} state is a complex interplay of these systems, working together to help you navigate your environment and experiences.`,
      readTime: "8 min read",
      likes: 189,
      reward: 35
    },
    {
      title: `Daily Habits to Support Your ${currentMood?.charAt(0).toUpperCase()}${currentMood?.slice(1)} Well-being`,
      excerpt: `Practical tips and routines to maintain emotional balance while feeling ${currentMood}.`,
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1000',
      contentImages: [
        'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000'
      ],
      content: `Creating supportive daily habits is essential when you're feeling ${currentMood}. Here's a practical guide to building a routine that works:

Morning Routine:
1. Gentle wake-up ritual (5 minutes)
2. Hydration and nutrition (15 minutes)
3. Light exercise or stretching (10 minutes)
4. Mindful planning (5 minutes)

Afternoon Practices:
• Regular movement breaks
• Healthy snacking
• Deep breathing exercises
• Social connection time

Evening Wind-down:
1. Technology sunset (1 hour before bed)
2. Relaxation practice
3. Gratitude journaling
4. Calm bedtime routine

Additional Supportive Habits:
- Regular sleep schedule
- Balanced nutrition
- Physical activity
- Social connections
- Creative expression

Remember to be patient and consistent as you build these habits into your daily life.`,
      readTime: "6 min read",
      likes: 312,
      reward: 28
    },
    {
      title: `Community Stories: Navigating ${currentMood?.charAt(0).toUpperCase()}${currentMood?.slice(1)} Times`,
      excerpt: `Real experiences and advice from others who have dealt with similar feelings.`,
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1000',
      contentImages: [
        'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000'
      ],
      content: `Community members share their experiences and wisdom about managing ${currentMood} feelings:

Sarah's Story:
"I learned that my ${currentMood} feelings were trying to tell me something important. Through mindfulness and support, I discovered better ways to listen to my emotions."

Michael's Journey:
"Regular exercise and creative activities helped me channel my ${currentMood} energy into something positive. It's about finding what works for you."

Elena's Perspective:
"Building a support network made a huge difference. Sharing with others who understood made me feel less alone in my experiences."

Common Themes from Our Community:
1. The importance of self-compassion
2. Value of professional support
3. Power of shared experiences
4. Role of daily routines
5. Impact of lifestyle changes

Remember, you're part of a supportive community that understands and shares your experiences.`,
      readTime: "10 min read",
      likes: 276,
      reward: 40
    }
  ];

  const handleArticleComplete = (article: Article) => {
    if (!readArticles.has(article.title)) {
      setReadArticles(new Set([...readArticles, article.title]));
      const newCoins = article.reward;
      setCoins(prev => prev + newCoins);
      onCoinsEarned(newCoins);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 2000);
    }
  };

  const ArticleView = ({ article }: { article: Article }) => (
    <div className="space-y-6 mb-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedArticle(null)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-2xl font-bold gaming-gradient">{article.title}</h2>
      </div>

      <div className="flex items-center gap-4 text-sm text-white/60">
        <span className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {article.readTime}
        </span>
        <span className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          +{article.reward} coins
        </span>
      </div>

      <div className="gaming-card p-6">
        <div className="prose prose-invert max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => {
            // Insert images at specific points in the content
            const shouldShowImage = index === 2 || index === 5;
            return (
              <React.Fragment key={index}>
                <p className="mb-4 text-white/80">{paragraph}</p>
                {shouldShowImage && article.contentImages && article.contentImages[index === 2 ? 0 : 1] && (
                  <img 
                    src={article.contentImages[index === 2 ? 0 : 1]}
                    alt={`Illustration for ${article.title}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-16 left-0 right-0 px-4 py-2 bg-black/20 backdrop-blur-xl">
        <button
          onClick={() => handleArticleComplete(article)}
          disabled={readArticles.has(article.title)}
          className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            readArticles.has(article.title)
              ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500'
          }`}
        >
          {readArticles.has(article.title) ? (
            <>
              <Check className="w-5 h-5" />
              Completed
            </>
          ) : (
            'Complete Reading'
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {showReward && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 animate-bounce">
          <Star className="w-5 h-5" />
          +{selectedArticle?.reward} coins
        </div>
      )}

      {selectedArticle ? (
        <ArticleView article={selectedArticle} />
      ) : (
        <>
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center gap-2">
                <BookOpen className={`w-6 h-6 ${moodTheme.primaryColor}`} />
                <h1 className="text-3xl font-bold gaming-gradient">Personalized Articles</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <Star className="w-5 h-5" />
              <span className="font-bold">{coins}</span>
            </div>
          </div>

          <div className="grid gap-6">
            {articles.map((article, index) => (
              <article 
                key={index} 
                className="gaming-card p-6 hover:scale-[1.01] transition-transform cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-white mb-3 hover:gaming-gradient">
                    {article.title}
                  </h2>
                  {readArticles.has(article.title) && (
                    <Check className="w-5 h-5 text-green-400" />
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <p className="text-white/60">
                    {article.excerpt}
                  </p>
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-white/40">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-2 text-yellow-400">
                      <Star className="w-4 h-4" />
                      +{article.reward} coins
                    </span>
                    <button className="flex items-center gap-1 text-white/40 hover:text-pink-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      {article.likes}
                    </button>
                  </div>
                  <button className="flex items-center gap-1 text-white/40 hover:text-violet-400 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 