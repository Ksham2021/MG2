import React, { useState, useEffect, useRef } from 'react';
import { Brain, Clock, Star, Gamepad, Zap, RotateCcw, Check, X, RefreshCw } from 'lucide-react';
import { useMood } from '../context/MoodContext';

// Memory Match Game Component
const MemoryMatch = () => {
  const [cards, setCards] = useState<Array<{ id: number; value: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const emojis = ['😊', '🎮', '🎯', '🧠', '⭐', '🎨', '🎵', '🌟'];

  const initializeGame = () => {
    // Create pairs of cards
    const cardValues = [...emojis, ...emojis];
    // Shuffle cards
    const shuffledCards = cardValues
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        flipped: false,
        matched: false
      }));
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameStarted(true);
    setGameCompleted(false);
    setScore(0);
  };

  const handleCardClick = (id: number) => {
    // Don't allow flipping if already flipped or matched
    if (cards[id].flipped || cards[id].matched || flippedCards.length >= 2) return;
    
    // Flip the card
    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstId, secondId] = newFlippedCards;
      
      if (newCards[firstId].value === newCards[secondId].value) {
        // Match found
        newCards[firstId].matched = true;
        newCards[secondId].matched = true;
        setCards(newCards);
        setMatchedPairs(matchedPairs + 1);
        setFlippedCards([]);
        
        // Calculate score - faster matches earn more points
        setScore(score + 10);
        
        // Check if game is completed
        if (matchedPairs + 1 === emojis.length) {
          setGameCompleted(true);
        }
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          newCards[firstId].flipped = false;
          newCards[secondId].flipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="gaming-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Memory Match</h3>
        {gameStarted && (
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-white">Moves: {moves}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white">Score: {score}</span>
            </div>
          </div>
        )}
      </div>
      
      {!gameStarted ? (
        <div className="text-center py-8">
          <p className="text-white/60 mb-4">Match pairs of identical cards to win. The faster you match, the more points you earn!</p>
          <button
            onClick={initializeGame}
            className="py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:scale-105 transition-transform"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          {gameCompleted ? (
            <div className="text-center py-8 space-y-4">
              <h4 className="text-2xl font-bold text-white">Congratulations!</h4>
              <p className="text-white/60">You completed the game in {moves} moves</p>
              <p className="text-xl font-bold text-yellow-400">Score: {score}</p>
              <button
                onClick={initializeGame}
                className="py-2 px-6 bg-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-colors"
              >
                Play Again
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {cards.map(card => (
                  <div
                    key={card.id}
                    className={`aspect-square flex items-center justify-center text-2xl rounded-lg cursor-pointer transition-all transform ${
                      card.flipped ? 'bg-gradient-to-br from-purple-500 to-pink-500 rotate-y-180' : 'bg-white/10'
                    } ${card.matched ? 'bg-gradient-to-br from-green-500 to-teal-500 rotate-y-180' : ''}`}
                    onClick={() => handleCardClick(card.id)}
                  >
                    {card.flipped || card.matched ? card.value : ''}
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={initializeGame}
                  className="py-1 px-3 bg-white/10 rounded-lg text-white/60 text-sm hover:bg-white/20 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

// Word Scramble Game Component
const WordScramble = () => {
  const [words] = useState([
    { word: 'MINDFUL', hint: 'Being aware of the present moment' },
    { word: 'GROWTH', hint: 'Positive development or change' },
    { word: 'CALM', hint: 'Free from disturbance or agitation' },
    { word: 'HAPPY', hint: 'Feeling joy or contentment' },
    { word: 'FOCUS', hint: 'Concentrated attention' },
    { word: 'PEACE', hint: 'Freedom from disturbance' },
    { word: 'STRENGTH', hint: 'The quality of being strong' },
    { word: 'COURAGE', hint: 'The ability to face difficulty' }
  ]);
  
  const [currentWord, setCurrentWord] = useState({ word: '', hint: '' });
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const timerRef = useRef<number | null>(null);
  
  const scrambleWord = (word: string) => {
    const array = word.split('');
    
    // Ensure the scrambled word is different from the original
    let scrambled;
    do {
      scrambled = [...array].sort(() => Math.random() - 0.5).join('');
    } while (scrambled === word);
    
    return scrambled;
  };
  
  const selectRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const selected = words[randomIndex];
    setCurrentWord(selected);
    setScrambledWord(scrambleWord(selected.word));
  };
  
  const startGame = () => {
    selectRandomWord();
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimer(30);
    setUserGuess('');
    setIsCorrect(null);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current as number);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const handleGuessSubmit = () => {
    const correct = userGuess.toUpperCase() === currentWord.word;
    setIsCorrect(correct);
    
    if (correct) {
      // Award more points for faster solves
      const timeBonus = Math.max(1, Math.ceil(timer / 5));
      setScore(prev => prev + (10 + timeBonus));
      
      // Select a new word after a short delay
      setTimeout(() => {
        selectRandomWord();
        setUserGuess('');
        setIsCorrect(null);
      }, 1500);
    }
  };
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  return (
    <div className="gaming-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Word Scramble</h3>
        {gameStarted && !gameOver && (
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-white">{timer}s</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white">Score: {score}</span>
            </div>
          </div>
        )}
      </div>
      
      {!gameStarted ? (
        <div className="text-center py-8">
          <p className="text-white/60 mb-4">Unscramble the given words before time runs out. Use the hint if you get stuck!</p>
          <button
            onClick={startGame}
            className="py-2 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium hover:scale-105 transition-transform"
          >
            Start Game
          </button>
        </div>
      ) : (
        gameOver ? (
          <div className="text-center py-8 space-y-4">
            <h4 className="text-2xl font-bold text-white">Game Over!</h4>
            <p className="text-xl font-bold text-yellow-400">Final Score: {score}</p>
            <button
              onClick={startGame}
              className="py-2 px-6 bg-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-colors"
            >
              Play Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center py-6">
              <div className="text-3xl font-bold mb-2 tracking-wider text-white">{scrambledWord}</div>
              <div className="text-sm text-white/60">Hint: {currentWord.hint}</div>
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={userGuess}
                onChange={e => setUserGuess(e.target.value.toUpperCase())}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                placeholder="Your answer..."
                maxLength={currentWord.word.length}
              />
              <button
                onClick={handleGuessSubmit}
                disabled={!userGuess}
                className="py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-medium disabled:opacity-50"
              >
                Check
              </button>
            </div>
            
            {isCorrect !== null && (
              <div className={`text-center py-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? (
                  <div className="flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" />
                    <span>Correct!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1">
                    <X className="w-4 h-4" />
                    <span>Try again!</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

// Reaction Time Game
const ReactionTime = () => {
  const [stage, setStage] = useState<'waiting' | 'ready' | 'clicked' | 'finished'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [countDown, setCountDown] = useState(3);
  const [attempts, setAttempts] = useState(0);
  const timerRef = useRef<number | null>(null);
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  const startGame = () => {
    setStage('ready');
    setCountDown(3);
    
    const countDownInterval = setInterval(() => {
      setCountDown(prev => {
        if (prev <= 1) {
          clearInterval(countDownInterval);
          prepareTiming();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const prepareTiming = () => {
    // Random delay between 1-5 seconds
    const delay = Math.floor(Math.random() * 4000) + 1000;
    
    timerRef.current = setTimeout(() => {
      setStartTime(Date.now());
      setStage('clicked');
    }, delay);
  };
  
  const handleClick = () => {
    if (stage === 'ready') {
      // Clicked too early!
      clearTimeout(timerRef.current as number);
      setStage('finished');
      setReactionTime(-1); // Special value for early click
    } else if (stage === 'clicked') {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setAttempts(prev => prev + 1);
      
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }
      
      setStage('finished');
    } else if (stage === 'finished' || stage === 'waiting') {
      startGame();
    }
  };
  
  const getBackgroundColor = () => {
    switch (stage) {
      case 'waiting':
        return 'bg-white/10';
      case 'ready':
        return 'bg-red-500/70';
      case 'clicked':
        return 'bg-green-500/70';
      case 'finished':
        return reactionTime === -1 ? 'bg-orange-500/70' : 'bg-blue-500/70';
      default:
        return 'bg-white/10';
    }
  };
  
  const getMessage = () => {
    switch (stage) {
      case 'waiting':
        return 'Click to start';
      case 'ready':
        return countDown > 0 ? `Wait for green (${countDown})` : 'Wait for green...';
      case 'clicked':
        return 'Click now!';
      case 'finished':
        if (reactionTime === -1) {
          return 'Too early! Try again.';
        }
        return `${reactionTime} ms - Click to try again`;
      default:
        return '';
    }
  };
  
  return (
    <div className="gaming-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Reaction Time</h3>
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-white">Best: {bestTime ? `${bestTime} ms` : '--'}</span>
        </div>
      </div>
      
      <div 
        className={`w-full aspect-video rounded-lg flex items-center justify-center cursor-pointer mb-4 transition-colors ${getBackgroundColor()}`}
        onClick={handleClick}
      >
        <div className="text-center">
          <p className="text-white text-xl font-bold">{getMessage()}</p>
          {stage === 'finished' && reactionTime !== -1 && (
            <p className="text-white/80 text-sm mt-2">Attempt {attempts}</p>
          )}
        </div>
      </div>
      
      <p className="text-white/60 text-sm text-center">
        Test your reflexes! Wait for the box to turn green, then click as fast as possible.
      </p>
    </div>
  );
};

export function Games() {
  const { getMoodTheme } = useMood();
  const moodTheme = getMoodTheme();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
      <div className="flex items-center gap-2 mb-8">
        <Gamepad className={`w-6 h-6 ${moodTheme.primaryColor}`} />
        <h1 className="text-3xl font-bold gaming-gradient">Fun Mind Games</h1>
      </div>
      
      <p className="text-white/60 max-w-3xl mb-8">
        Exercise your brain with these fun games designed to improve cognitive function, memory, 
        and reaction time while having fun!
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MemoryMatch />
        <WordScramble />
        <ReactionTime />
      </div>
    </div>
  );
}

export default Games;
