import React, { useState, useEffect, useRef } from 'react';
import { Flower2, Play, Pause, X, Timer, Calendar, Trophy, Heart, BookOpen, Wind } from 'lucide-react';
import { useMood } from '../context/MoodContext';

type Tree = {
  id: string;
  type: 'small' | 'bush' | 'apple' | 'rare';
  name: string;
  dateGrown: Date;
  focusTime: number;
  emoji: string;
};

type TimerState = 'idle' | 'running' | 'paused' | 'complete';

export function SoulBloom() {
  const { getMoodTheme } = useMood();
  const moodTheme = getMoodTheme();
  
  // Timer states
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [selectedDuration, setSelectedDuration] = useState(15); // minutes
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();
  
  // Garden states
  const [trees, setTrees] = useState<Tree[]>([]);
  const [focusStreak, setFocusStreak] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  
  // Quotes
  const motivationalQuotes = [
    "Growth takes time. Be patient with yourself.",
    "Every moment of focus plants a seed of success.",
    "Your garden of accomplishments grows one tree at a time.",
    "Nurture your mind like a beautiful garden.",
  ];
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    if (timerState === 'running') {
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - (startTimeRef.current || Date.now());
        const remaining = (selectedDuration * 60 * 1000) - elapsed;
        
        if (remaining <= 0) {
          handleTimerComplete();
        } else {
          setTimeRemaining(remaining);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timerState, selectedDuration]);

  // Page visibility handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && timerState === 'running') {
        handleBreakFocus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [timerState]);

  const startTimer = () => {
    setShowBreathingExercise(true);
    setCurrentQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  };

  const beginFocus = () => {
    setShowBreathingExercise(false);
    setTimerState('running');
    startTimeRef.current = Date.now();
    setTimeRemaining(selectedDuration * 60 * 1000);
  };

  const handleBreakFocus = () => {
    setTimerState('idle');
    setTimeRemaining(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleTimerComplete = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTimerState('complete');
    
    // Create new tree
    const newTree: Tree = {
      id: Date.now().toString(),
      type: getTreeType(selectedDuration),
      name: '',
      dateGrown: new Date(),
      focusTime: selectedDuration,
      emoji: getTreeEmoji(selectedDuration)
    };
    
    setTrees(prev => [...prev, newTree]);
    setTotalFocusTime(prev => prev + selectedDuration);
    setFocusStreak(prev => prev + 1);
  };

  const getTreeType = (minutes: number): Tree['type'] => {
    if (minutes >= 120) return 'rare';
    if (minutes >= 60) return 'apple';
    if (minutes >= 30) return 'bush';
    return 'small';
  };

  const getTreeEmoji = (minutes: number): string => {
    if (minutes >= 120) return '🌳';
    if (minutes >= 60) return '🍏';
    if (minutes >= 30) return '🌿';
    return '🌱';
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Flower2 className={`w-6 h-6 ${moodTheme.primaryColor}`} />
          <h1 className="text-3xl font-bold gaming-gradient">SoulBloom</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Timer Section */}
        <div className="gaming-card p-6">
          {showBreathingExercise ? (
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-4">Prepare for Focus</h2>
              <p className="text-white/60 mb-6">{currentQuote}</p>
              <div className="animate-pulse mb-8">
                <Wind className="w-12 h-12 mx-auto text-blue-400" />
                <p className="text-white/80 mt-2">Take deep breaths...</p>
              </div>
              <button
                onClick={beginFocus}
                className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-medium"
              >
                Begin Focus Session
              </button>
            </div>
          ) : timerState === 'running' ? (
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-4">
                {formatTime(timeRemaining)}
              </div>
              <button
                onClick={handleBreakFocus}
                className="py-2 px-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium"
              >
                Break Focus
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Choose Focus Duration</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setSelectedDuration(15)}
                  className={`p-4 rounded-lg transition-colors ${
                    selectedDuration === 15 ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                >
                  <div className="text-2xl mb-2">🌱</div>
                  <div className="font-medium">15 minutes</div>
                  <div className="text-sm text-white/60">Small Plant</div>
                </button>
                <button
                  onClick={() => setSelectedDuration(30)}
                  className={`p-4 rounded-lg transition-colors ${
                    selectedDuration === 30 ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                >
                  <div className="text-2xl mb-2">🌿</div>
                  <div className="font-medium">30 minutes</div>
                  <div className="text-sm text-white/60">Bush</div>
                </button>
                <button
                  onClick={() => setSelectedDuration(60)}
                  className={`p-4 rounded-lg transition-colors ${
                    selectedDuration === 60 ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                >
                  <div className="text-2xl mb-2">🍏</div>
                  <div className="font-medium">1 hour</div>
                  <div className="text-sm text-white/60">Apple Tree</div>
                </button>
                <button
                  onClick={() => setSelectedDuration(120)}
                  className={`p-4 rounded-lg transition-colors ${
                    selectedDuration === 120 ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60 hover:bg-white/15'
                  }`}
                >
                  <div className="text-2xl mb-2">🌳</div>
                  <div className="font-medium">2 hours</div>
                  <div className="text-sm text-white/60">Rare Tree</div>
                </button>
              </div>
              <button
                onClick={startTimer}
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-medium flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Focus Session
              </button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="space-y-4">
          <div className="gaming-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Focus Stats</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🌳</div>
                <div className="font-medium text-white">{trees.length}</div>
                <div className="text-sm text-white/60">Trees Grown</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="font-medium text-white">{totalFocusTime}</div>
                <div className="text-sm text-white/60">Minutes Focused</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔥</div>
                <div className="font-medium text-white">{focusStreak}</div>
                <div className="text-sm text-white/60">Day Streak</div>
              </div>
            </div>
          </div>

          {/* Garden Preview */}
          <div className="gaming-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Your Garden</h2>
            <div className="grid grid-cols-4 gap-4">
              {trees.slice(-8).map(tree => (
                <div
                  key={tree.id}
                  className="aspect-square bg-white/10 rounded-lg flex items-center justify-center text-2xl"
                  title={`${tree.focusTime} minute focus session`}
                >
                  {tree.emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 