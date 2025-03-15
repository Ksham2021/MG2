import React from 'react';
import { X } from 'lucide-react';

interface MoodCheckPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onMoodSelect: (mood: string) => void;
}

export function MoodCheckPopup({ isOpen, onClose, onMoodSelect }: MoodCheckPopupProps) {
  if (!isOpen) return null;

  const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😔", label: "Sad", value: "sad" },
    { emoji: "😌", label: "Calm", value: "calm" },
    { emoji: "😰", label: "Anxious", value: "anxious" },
    { emoji: "😴", label: "Tired", value: "tired" },
    { emoji: "😤", label: "Frustrated", value: "frustrated" }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="gaming-card w-full max-w-md p-6 m-4 animate-float">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gaming-gradient">How are you feeling today?</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
        
        <p className="text-white/60 mb-6">
          Select the emoji that best matches your current mood
        </p>

        <div className="grid grid-cols-3 gap-4">
          {moods.map(({ emoji, label, value }) => (
            <button
              key={value}
              onClick={() => {
                onMoodSelect(value);
                onClose();
              }}
              className="gaming-card p-4 hover:scale-105 transition-transform flex flex-col items-center gap-2"
            >
              <span className="text-4xl">{emoji}</span>
              <span className="text-sm text-white/80">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}