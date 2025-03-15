import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check, X as XIcon, Coins, Flame } from 'lucide-react';
import type { Quiz } from '../context/MoodContext';

interface QuizPopupProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz;
  onComplete: (score: number, totalCoinsEarned: number) => void;
}

export function QuizPopup({ isOpen, onClose, quiz, onComplete }: QuizPopupProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctSound] = useState(new Audio('/correct.mp3'));
  const [incorrectSound] = useState(new Audio('/incorrect.mp3'));
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [animatedCoins, setAnimatedCoins] = useState(0);

  const coinsPerQuestion = Math.floor(quiz.reward / quiz.questions.length);
  const remainingPotentialCoins = (quiz.questions.length - currentQuestionIndex) * coinsPerQuestion;
  const streakBonus = Math.floor(coinsPerQuestion * 0.5); // 50% bonus for streaks

  useEffect(() => {
    // Preload audio files
    correctSound.load();
    incorrectSound.load();
  }, []);

  useEffect(() => {
    if (showCoinAnimation) {
      const timer = setTimeout(() => {
        setShowCoinAnimation(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showCoinAnimation]);

  if (!isOpen) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    const isAnswerCorrect = currentQuestion.correctAnswer === answerIndex;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    if (isAnswerCorrect) {
      correctSound.play();
      const earnedThisQuestion = streak >= 2 ? coinsPerQuestion + streakBonus : coinsPerQuestion;
      setCoinsEarned(prev => prev + earnedThisQuestion);
      setStreak(prev => prev + 1);
      setAnimatedCoins(earnedThisQuestion);
      setShowCoinAnimation(true);
    } else {
      incorrectSound.play();
      setStreak(0);
    }

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (isLastQuestion) {
      const correctAnswers = quiz.questions.reduce((count, question, index) => {
        return count + (question.correctAnswer === selectedAnswers[index] ? 1 : 0);
      }, 0);
      setShowResults(true);
      onComplete(correctAnswers, coinsEarned);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="gaming-card w-full max-w-2xl p-6 m-4 animate-float">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gaming-gradient">{quiz.title}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Coins className="w-4 h-4" />
              <span>+{coinsEarned}</span>
              {showCoinAnimation && (
                <span className="absolute animate-bounce-up text-lg font-bold">
                  +{animatedCoins}
                </span>
              )}
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>

        {!showResults ? (
          <>
            <div className="mb-6">
              <div className="h-2 bg-white/10 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-sm text-white/60 mt-2">
                <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                <div className="flex items-center gap-4">
                  {streak >= 2 && (
                    <div className="flex items-center gap-1 text-orange-400">
                      <Flame className="w-4 h-4 animate-pulse" />
                      <span>Streak x{streak}! (+{streakBonus} bonus)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-white/60">Potential coins:</span>
                    <span className="text-yellow-400">+{remainingPotentialCoins}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl text-white mb-4">{currentQuestion.question}</h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === index;
                  const isCorrectAnswer = currentQuestion.correctAnswer === index;
                  let buttonStyle = 'w-full p-4 rounded-lg text-left transition-colors flex justify-between items-center ';
                  
                  if (showFeedback && isSelected) {
                    buttonStyle += isCorrectAnswer 
                      ? 'bg-green-500/20 border-2 border-green-500/40' 
                      : 'bg-red-500/20 border-2 border-red-500/40';
                  } else if (isSelected) {
                    buttonStyle += 'bg-white/20 border-2 border-white/40';
                  } else {
                    buttonStyle += 'bg-white/10 hover:bg-white/15';
                  }

                  return (
                    <button
                      key={index}
                      className={buttonStyle}
                      onClick={() => !showFeedback && handleAnswerSelect(index)}
                      disabled={showFeedback}
                    >
                      <span>{option}</span>
                      {showFeedback && isSelected && (
                        isCorrectAnswer 
                          ? <Check className="w-5 h-5 text-green-500" />
                          : <XIcon className="w-5 h-5 text-red-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                showFeedback
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500'
                  : 'bg-white/10 cursor-not-allowed'
              }`}
              onClick={handleNext}
              disabled={!showFeedback}
            >
              {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h3>
            <p className="text-white/60 mb-6">
              You answered {selectedAnswers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} out of {quiz.questions.length} questions correctly!
            </p>
            <p className="text-yellow-400 text-lg mb-8">
              You earned {coinsEarned} coins!
            </p>
            <button
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 