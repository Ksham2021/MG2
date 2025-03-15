import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MoodData {
  date: string;
  mood: string;
}

interface MoodCalendarProps {
  moodData: MoodData[];
}

export function MoodCalendar({ moodData }: MoodCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMoodEmoji = (date: string) => {
    const mood = moodData.find(m => m.date === date)?.mood;
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😔';
      case 'calm': return '😌';
      case 'anxious': return '😰';
      case 'tired': return '😴';
      case 'frustrated': return '😤';
      case 'better': return '😊';
      case 'relaxed': return '😌';
      case 'inspired': return '🌟';
      case 'empowered': return '💪';
      case 'thoughtful': return '🤔';
      case 'same': return '😐';
      default: return '';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const mood = getMoodEmoji(date);
      
      days.push(
        <div 
          key={day} 
          className="h-12 gaming-card flex flex-col items-center justify-center p-1 hover:scale-105 transition-transform"
        >
          <span className="text-xs text-white/60">{day}</span>
          <span className="text-lg">{mood}</span>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="gaming-card p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white/60" />
        </button>
        <h3 className="text-xl font-bold gaming-gradient">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white/60" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm text-white/60">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {renderCalendar()}
      </div>
    </div>
  );
}