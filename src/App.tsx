import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Tree } from './components/Tree';
import { CoinDisplay } from './components/CoinDisplay';
import { Brain, Heart, Smile, Sun, Trophy, Sparkles, Clock, LogIn, UserPlus, BookOpen, Gamepad, Flower2, Star, ChevronRight } from 'lucide-react';
import { PiggyBankIcon } from './components/PiggyBankIcon';
import { Blog } from './pages/Blog';
import { Community } from './pages/Community';
import { Articles } from './pages/Articles';
import { MoodCheckPopup } from './components/MoodCheckPopup';
import { ExitMoodCheckPopup } from './components/ExitMoodCheckPopup';
import { MoodCalendar } from './components/MoodCalendar';
import { AuthPopup } from './components/AuthPopup';
import { QuizPopup } from './components/QuizPopup';
import { useMood } from './context/MoodContext';
import type { TreeState } from './types';
import type { Quiz } from './context/MoodContext';
import { Exercises } from './pages/Exercises';
import { Profile } from './pages/Profile';
import { SoulScript } from './pages/SoulScript';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [showExitMoodCheck, setShowExitMoodCheck] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [moodHistory, setMoodHistory] = useState<Array<{ date: string; mood: string }>>([]);
  const [treeState] = useState<TreeState>({
    health: 0.8,
    level: 1,
    color: 'text-green-500',
    size: 0.5
  });
  const { currentMood, setCurrentMood, getMoodTheme, getMoodContent } = useMood();
  const moodTheme = getMoodTheme();
  const moodContent = getMoodContent();
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [coins, setCoins] = useState(150);

  useEffect(() => {
    // Show initial mood check popup after a short delay
    const timer = setTimeout(() => {
      setShowMoodCheck(true);
    }, 1000);

    // Setup exit mood check
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!showExitMoodCheck) {
        e.preventDefault();
        e.returnValue = '';
        setShowExitMoodCheck(true);
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showExitMoodCheck]);

  const handleInitialMoodSelect = (mood: string) => {
    const today = new Date().toISOString().split('T')[0];
    setMoodHistory(prev => [...prev, { date: today, mood }]);
    setCurrentMood(mood as any);
  };

  const handleExitMoodSelect = (mood: string) => {
    const today = new Date().toISOString().split('T')[0];
    setMoodHistory(prev => [...prev, { date: today, mood }]);
    setCurrentMood(mood as any);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score: number, earnedCoins: number) => {
    // Add coins based on correct answers
    setCoins(prev => prev + earnedCoins);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'exercises':
        return <Exercises onBack={() => setCurrentPage('home')} onCoinsEarned={(amount) => setCoins(prev => prev + amount)} />;
      case 'articles':
        return <Articles onBack={() => setCurrentPage('home')} onCoinsEarned={(amount) => setCoins(prev => prev + amount)} />;
      case 'blog':
        return <Blog />;
      case 'community':
        return <Community />;
      case 'soulscript':
        return <SoulScript />;
      case 'profile':
        return <Profile />;
      default:
        return (
          <main className="max-w-7xl mx-auto px-4 py-8">
            <section className="text-center mb-12 animate-float">
              <h2 className="text-4xl font-bold gaming-gradient mb-4">
                Level Up Your Mind
              </h2>
              <p className="text-white/80 dark:text-white/60 max-w-2xl mx-auto text-lg">
                Embark on an epic journey to strengthen your mental well-being through quests, 
                achievements, and powerful allies.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="gaming-card p-6">
                <Tree state={treeState} />
                <div className="text-center mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className={`w-5 h-5 ${moodTheme.primaryColor}`} />
                    <h3 className="font-bold text-white">Level {treeState.level} Mind Tree</h3>
                  </div>
                  <p className="text-sm text-white/60">Your mental strength grows with every challenge!</p>
                </div>
              </div>

              <MoodCalendar moodData={moodHistory} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Daily Quiz Section */}
              <div className="gaming-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className={`w-6 h-6 ${moodTheme.primaryColor}`} />
                  <h3 className="text-xl font-bold text-white">Daily Quiz</h3>
                </div>
                <div className="space-y-4">
                  {moodContent.quizzes.map((quiz, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="font-medium text-white mb-2">{quiz.title}</h4>
                      <p className="text-sm text-white/60 mb-2">{quiz.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-white/40">
                          <Clock className="w-4 h-4" />
                          {quiz.duration}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-4 h-4" />
                          <span>+{quiz.reward} coins</span>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-white/40">
                        {quiz.questions.length} questions to complete
                      </div>
                      <button 
                        onClick={() => handleStartQuiz(quiz)}
                        className="mt-3 w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-medium"
                      >
                        Start Quiz
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Article Section */}
              <div className="gaming-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className={`w-6 h-6 ${moodTheme.primaryColor}`} />
                  <h3 className="text-xl font-bold text-white">Today's Read</h3>
                </div>
                <div className="space-y-4">
                  {moodContent.articles.slice(0, 1).map((article, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="font-medium text-white mb-2">{article.title}</h4>
                      <p className="text-sm text-white/60 mb-2">{article.excerpt}</p>
                      <div className="flex items-center gap-2 text-sm text-white/40">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setCurrentPage('articles')}
                    className="w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-medium flex items-center justify-center gap-2"
                  >
                    Read Articles
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mindfulness Exercise Section */}
              <div className="gaming-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Flower2 className={`w-6 h-6 ${moodTheme.primaryColor}`} />
                  <h3 className="text-xl font-bold text-white">Daily Practice</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="font-medium text-white mb-2">5-Minute Mindfulness</h4>
                    <p className="text-sm text-white/60 mb-2">Quick breathing exercise to center yourself</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-white/40">
                        <Clock className="w-4 h-4" />
                        5 min
                      </div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4" />
                        <span>+10 coins</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setCurrentPage('exercises')}
                    className="w-full py-2 px-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-medium flex items-center justify-center gap-2"
                  >
                    Workout
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mental Games Section */}
              <div className="gaming-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Gamepad className={`w-6 h-6 ${moodTheme.primaryColor}`} />
                  <h3 className="text-xl font-bold text-white">Fun Games</h3>
                </div>
                <div className="space-y-2">
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="font-medium text-white mb-2">Memory Match</h4>
                    <p className="text-sm text-white/60 mb-2">Train your memory with this fun card game</p>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span>+15 coins per win</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                    <h4 className="font-medium text-white mb-2">Word Puzzle</h4>
                    <p className="text-sm text-white/60 mb-2">Solve positive word puzzles</p>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span>+10 coins per puzzle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <div className={`fixed inset-0 bg-gradient-to-br ${moodTheme.gradient} -z-10`} />
      
      <header className="backdrop-blur-xl bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className={`w-6 h-6 ${moodTheme.primaryColor} animate-float`} />
            <h1 className="text-2xl font-bold gaming-gradient">MindGrow</h1>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <CoinDisplay amount={coins} />
            ) : (
              <>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <PiggyBankIcon size={16} className="text-pink-400" />
                  <span className="font-medium text-white">{coins}</span>
                </div>
                <button
                  onClick={() => setShowAuthPopup(true)}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <LogIn className="w-4 h-4 text-white" />
                  <span className="text-white">Sign In</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {renderPage()}

      <Navigation onPageChange={setCurrentPage} currentPage={currentPage} />

      <MoodCheckPopup 
        isOpen={showMoodCheck}
        onClose={() => setShowMoodCheck(false)}
        onMoodSelect={handleInitialMoodSelect}
      />

      <ExitMoodCheckPopup
        isOpen={showExitMoodCheck}
        onClose={() => setShowExitMoodCheck(false)}
        onMoodSelect={handleExitMoodSelect}
      />

      <AuthPopup
        isOpen={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
        onSuccess={handleAuthSuccess}
      />

      {currentQuiz && (
        <QuizPopup
          isOpen={showQuiz}
          onClose={() => {
            setShowQuiz(false);
            setCurrentQuiz(null);
          }}
          quiz={currentQuiz}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}

export default App;