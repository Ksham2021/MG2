import React, { useState, useEffect } from 'react';
import { getMotivationalQuote } from '../utils/quotes';

interface FocusTimerProps {
  onSessionComplete: (duration: number) => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({ onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>('');

  const timerOptions = [
    { duration: 15, label: '15 min' },
    { duration: 30, label: '30 min' },
    { duration: 60, label: '1 hour' },
    { duration: 120, label: '2 hours' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      onSessionComplete(timeLeft);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setIsActive(true);
    setQuote(getMotivationalQuote());
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Focus Timer</h2>
      {quote && <p className="italic text-gray-600 mb-4">{quote}</p>}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {timerOptions.map((option) => (
          <button
            key={option.duration}
            onClick={() => startTimer(option.duration)}
            className="bg-green-500 text-white p-3 rounded hover:bg-green-600"
            disabled={isActive}
          >
            {option.label}
          </button>
        ))}
      </div>
      {isActive && (
        <div className="text-center">
          <p className="text-4xl font-bold">{formatTime(timeLeft)}</p>
          <button
            onClick={() => setIsActive(false)}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Stop Focus
          </button>
        </div>
      )}
    </div>
  );
};
