import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Star, Check } from 'lucide-react';

interface ExerciseActivityProps {
  isOpen: boolean;
  onClose: () => void;
  activity: {
    name: string;
    description: string;
    duration: string;
    videoUrl?: string;
  };
  onComplete: () => void;
}

export function ExerciseActivityPopup({ isOpen, onClose, activity, onComplete }: ExerciseActivityProps) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parse duration string to seconds (e.g., "10 min" -> 600 seconds)
  useEffect(() => {
    if (activity) {
      const durationMatch = activity.duration.match(/(\d+)/);
      if (durationMatch) {
        const minutes = parseInt(durationMatch[0], 10);
        setTimeRemaining(minutes * 60);
      }
    }
  }, [activity]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0 && !isCompleted) {
      setIsCompleted(true);
      setShowReward(true);
      setTimeout(() => {
        setShowReward(false);
        onComplete();
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, isCompleted, onComplete]);

  // Add effect to control video playback
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = activity ? 
    ((parseFloat(activity.duration.match(/(\d+)/)?.[0] || "0") * 60 - timeRemaining) / 
    (parseFloat(activity.duration.match(/(\d+)/)?.[0] || "1") * 60)) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="gaming-card w-full max-w-2xl p-6 m-4 animate-float">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gaming-gradient">{activity.name}</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-white/60 mb-4">{activity.description}</p>
          
          <div className="relative aspect-video bg-black/30 rounded-lg overflow-hidden mb-4">
            {activity.name === "Brisk Walking" ? (
              <video 
                ref={videoRef}
                src="/assets/brisk-walking.mp4" 
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="auto"
              />
            ) : activity.videoUrl ? (
              <video 
                src={activity.videoUrl} 
                className="w-full h-full object-cover"
                autoPlay={isActive}
                loop
                muted
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={`https://source.unsplash.com/random/800x600/?${activity.name.toLowerCase().replace(/\s+/g, '-')},fitness`} 
                  alt={activity.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {isCompleted && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-green-500/20 p-8 rounded-full">
                  <Check className="w-16 h-16 text-green-400" />
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60">Progress</span>
              <span className="text-white font-bold">{formatTime(timeRemaining)}</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          {!isCompleted ? (
            <button
              onClick={() => setIsActive(!isActive)}
              className="py-3 px-6 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 flex items-center justify-center gap-2 transition-colors"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  {timeRemaining === parseFloat(activity.duration.match(/(\d+)/)?.[0] || "0") * 60 ? 'Start' : 'Resume'}
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="py-3 px-6 rounded-lg bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 flex items-center justify-center gap-2 transition-colors"
            >
              <Check className="w-5 h-5" />
              Complete
            </button>
          )}
        </div>
        
        {showReward && (
          <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 animate-bounce">
            <Star className="w-5 h-5" />
            Exercise Completed!
          </div>
        )}
      </div>
    </div>
  );
}