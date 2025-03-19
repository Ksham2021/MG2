import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, Heart, Play, Check, Activity, Zap, Flower2, Sun, Wind, Brain } from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { ExerciseActivityPopup } from '../components/ExerciseActivityPopup';

// import BriskWalkingVideo from '../assets/videos/brisk-walking.mp4';

interface ExercisesProps {
  onBack: () => void;
  onCoinsEarned: (amount: number) => void;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  reward: number;
  icon: React.ComponentType<any>;
  activities: {
    name: string;
    description: string;
    duration: string;
    videoUrl?: string;
  }[];
  image: string;
}

export function Exercises({ onBack, onCoinsEarned }: ExercisesProps) {
  const { getMoodTheme } = useMood();
  const moodTheme = getMoodTheme();
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [coins, setCoins] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<{
    name: string;
    description: string;
    duration: string;
    videoUrl?: string;
  } | null>(null);

  const exercises: Exercise[] = [
    {
      id: 'aerobic',
      title: 'Aerobic Exercises',
      description: 'Boost your mood and energy with these cardio workouts',
      duration: '20-30 min',
      reward: 30,
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=1000',
      activities: [
        { 
          name: 'Brisk Walking', 
          description: 'Start with a moderate-paced walk', 
          duration: '10 min',
          videoUrl: '' // BriskWalkingVideo
        },
        { name: 'Jogging', description: 'Increase pace to light jog', duration: '10 min' },
        { name: 'Jump Rope', description: 'High-intensity cardio', duration: '5 min' },
        { name: 'Cool Down', description: 'Slow walk and stretching', duration: '5 min' }
      ]
    },
    {
      id: 'strength',
      title: 'Strength Training',
      description: 'Build confidence and relieve stress through strength exercises',
      duration: '25-35 min',
      reward: 35,
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000',
      activities: [
        { name: 'Bodyweight Squats', description: '3 sets of 12 reps', duration: '8 min' },
        { name: 'Push-ups', description: '3 sets of 10 reps', duration: '8 min' },
        { name: 'Planks', description: '3 sets of 30 seconds', duration: '5 min' },
        { name: 'Cool Down', description: 'Light stretching', duration: '4 min' }
      ]
    },
    {
      id: 'yoga',
      title: 'Yoga & Stretching',
      description: 'Find relaxation and improve flexibility',
      duration: '20-25 min',
      reward: 25,
      icon: Flower2,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
      activities: [
        { name: 'Sun Salutation', description: 'Warm-up sequence', duration: '5 min' },
        { name: 'Standing Poses', description: 'Basic yoga poses', duration: '10 min' },
        { name: 'Floor Stretches', description: 'Gentle stretching', duration: '7 min' },
        { name: 'Savasana', description: 'Final relaxation', duration: '3 min' }
      ]
    },
    {
      id: 'mindbody',
      title: 'Mind-Body Exercises',
      description: 'Enhance mindfulness and emotional balance',
      duration: '15-20 min',
      reward: 20,
      icon: Brain,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
      activities: [
        { name: 'Body Scan', description: 'Mindful awareness', duration: '5 min' },
        { name: 'Tai Chi Flow', description: 'Gentle movements', duration: '8 min' },
        { name: 'Balance Practice', description: 'Standing poses', duration: '5 min' },
        { name: 'Mindful Cool Down', description: 'Centered breathing', duration: '2 min' }
      ]
    },
    {
      id: 'outdoor',
      title: 'Outdoor Activities',
      description: 'Connect with nature for fresh air and happiness',
      duration: '30-40 min',
      reward: 40,
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1000',
      activities: [
        { name: 'Nature Walk', description: 'Mindful walking outdoors', duration: '15 min' },
        { name: 'Park Exercise', description: 'Basic bodyweight moves', duration: '10 min' },
        { name: 'Tree Stretching', description: 'Nature-based stretches', duration: '10 min' },
        { name: 'Mindful Rest', description: 'Outdoor meditation', duration: '5 min' }
      ]
    },
    {
      id: 'breathing',
      title: 'Breathing & Meditation',
      description: 'Cultivate inner peace through breath work',
      duration: '15-20 min',
      reward: 20,
      icon: Wind,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
      activities: [
        { name: 'Box Breathing', description: '4-4-4-4 pattern', duration: '5 min' },
        { name: 'Guided Meditation', description: 'Focused awareness', duration: '8 min' },
        { name: 'Deep Breathing', description: 'Diaphragmatic breath', duration: '5 min' },
        { name: 'Silent Reflection', description: 'Quiet mindfulness', duration: '2 min' }
      ]
    }
  ];

  const handleComplete = (exercise: Exercise) => {
    if (!completedExercises.has(exercise.id)) {
      setCompletedExercises(new Set([...completedExercises, exercise.id]));
      setCoins(prev => prev + exercise.reward);
      onCoinsEarned(exercise.reward);
      setRewardAmount(exercise.reward);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 2000);
    }
  };

  const handleActivityClick = (exercise: Exercise, activity: { name: string; description: string; duration: string }) => {
    setSelectedExercise(exercise);
    setSelectedActivity(activity);
  };

  const handleActivityComplete = () => {
    if (selectedExercise && selectedActivity) {
      // Create a unique ID for the activity
      const activityId = `${selectedExercise.id}-${selectedActivity.name}`;
      
      // Check if this activity was already completed
      if (!completedActivities.has(activityId)) {
        setCompletedActivities(new Set([...completedActivities, activityId]));
        
        // Check if all activities in this exercise are completed
        const allActivitiesCompleted = selectedExercise.activities.every(activity => {
          const id = `${selectedExercise.id}-${activity.name}`;
          return completedActivities.has(id) || id === activityId;
        });
        
        // If all activities are completed, mark the exercise as completed
        if (allActivitiesCompleted && !completedExercises.has(selectedExercise.id)) {
          handleComplete(selectedExercise);
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {showReward && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 animate-bounce">
          <Star className="w-5 h-5" />
          +{rewardAmount} coins
        </div>
      )}

      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Activity className={`w-6 h-6 ${moodTheme.primaryColor}`} />
            <h1 className="text-3xl font-bold gaming-gradient">Daily Practice</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 text-yellow-400">
          <Star className="w-5 h-5" />
          <span className="font-bold">{coins}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="gaming-card p-6 hover:scale-[1.01] transition-transform">
            <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
              <img 
                src={exercise.image} 
                alt={exercise.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <exercise.icon className="absolute bottom-4 left-4 w-6 h-6 text-white" />
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">{exercise.title}</h2>
              {completedExercises.has(exercise.id) && (
                <Check className="w-5 h-5 text-green-400" />
              )}
            </div>

            <p className="text-white/60 mb-4">{exercise.description}</p>

            <div className="space-y-2 mb-4">
              {exercise.activities.map((activity, index) => {
                const activityId = `${exercise.id}-${activity.name}`;
                const isActivityCompleted = completedActivities.has(activityId);
                
                return (
                  <div 
                    key={index} 
                    className={`p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex items-start ${
                      isActivityCompleted ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5'
                    }`}
                    onClick={() => handleActivityClick(exercise, activity)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">{activity.name}</span>
                        <span className="text-white/40 text-sm">{activity.duration}</span>
                      </div>
                      <p className="text-white/40 text-sm">{activity.description}</p>
                    </div>
                    {isActivityCompleted && (
                      <Check className="w-4 h-4 text-green-400 ml-2 mt-1" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2 text-white/40">
                  <Clock className="w-4 h-4" />
                  {exercise.duration}
                </span>
                <span className="flex items-center gap-2 text-yellow-400">
                  <Star className="w-4 h-4" />
                  +{exercise.reward} coins
                </span>
              </div>
              <button
                onClick={() => handleComplete(exercise)}
                disabled={completedExercises.has(exercise.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                  completedExercises.has(exercise.id)
                    ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {completedExercises.has(exercise.id) ? (
                  <>
                    <Check className="w-4 h-4" />
                    Done
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedActivity && (
        <ExerciseActivityPopup
          isOpen={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
          activity={selectedActivity}
          onComplete={handleActivityComplete}
        />
      )}
    </div>
  );
}