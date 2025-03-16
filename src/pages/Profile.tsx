import React, { useState } from 'react';
import { User, Edit, Calendar, LineChart, CheckSquare, Award, Settings, ChevronRight, Plus, Check, X, Camera } from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { MoodCalendar } from '../components/MoodCalendar';
import { ProfilePicturePopup } from '../components/ProfilePicturePopup';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export function Profile() {
  const { currentMood, getMoodTheme } = useMood();
  const moodTheme = getMoodTheme();
  
  // User profile state
  const [username, setUsername] = useState('Alex Johnson');
  const [editingUsername, setEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [bio, setBio] = useState('Mental health enthusiast. Working on building better habits and mindfulness practices every day.');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200');
  const [editingBio, setEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(bio);
  const [showProfilePicturePopup, setShowProfilePicturePopup] = useState(false);
  
  // Todo list state
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Complete daily meditation', completed: true },
    { id: '2', text: 'Read mental health article', completed: false },
    { id: '3', text: 'Take a mindful walk', completed: false },
    { id: '4', text: 'Practice gratitude journaling', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [addingTodo, setAddingTodo] = useState(false);
  
  // Mock mood history data
  const moodHistory = [
    { date: '2023-05-01', mood: 'happy' },
    { date: '2023-05-02', mood: 'calm' },
    { date: '2023-05-03', mood: 'anxious' },
    { date: '2023-05-04', mood: 'tired' },
    { date: '2023-05-05', mood: 'happy' },
    { date: '2023-05-06', mood: 'calm' },
    { date: '2023-05-07', mood: 'happy' },
    { date: '2023-05-08', mood: 'frustrated' },
    { date: '2023-05-09', mood: 'calm' },
    { date: '2023-05-10', mood: 'happy' },
    { date: new Date().toISOString().split('T')[0], mood: currentMood || 'calm' }
  ];
  
  // Progress data for the graph
  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Mood Score',
        data: [65, 59, 80, 81],
        color: '#60a5fa'
      },
      {
        label: 'Activity Completion',
        data: [28, 48, 40, 75],
        color: '#34d399'
      }
    ]
  };
  
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false
      };
      setTodos([...todos, newItem]);
      setNewTodo('');
      setAddingTodo(false);
    }
  };
  
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const saveBio = () => {
    setBio(tempBio);
    setEditingBio(false);
  };
  
  const saveUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername);
      setEditingUsername(false);
    }
  };
  
  const handleAvatarChange = (newAvatar: string) => {
    if (newAvatar === 'default') {
      // Use a default user icon or placeholder
      setAvatar('');
    } else {
      setAvatar(newAvatar);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
      <h1 className="text-3xl font-bold gaming-gradient mb-8">Your Profile</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="gaming-card p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                {avatar ? (
                  <img 
                    src={avatar} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20">
                    <User className="w-12 h-12 text-white/40" />
                  </div>
                )}
                <button 
                  className="absolute bottom-0 right-0 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  onClick={() => setShowProfilePicturePopup(true)}
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="mt-4 relative group">
                {editingUsername ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempUsername}
                      onChange={(e) => setTempUsername(e.target.value)}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-center focus:outline-none focus:border-white/40"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveUsername();
                        if (e.key === 'Escape') setEditingUsername(false);
                      }}
                    />
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setEditingUsername(false)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-white/60" />
                      </button>
                      <button 
                        onClick={saveUsername}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">{username}</h2>
                    <button 
                      onClick={() => {
                        setTempUsername(username);
                        setEditingUsername(true);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-full transition-all"
                    >
                      <Edit className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mt-4 w-full">
                {editingBio ? (
                  <div className="space-y-2">
                    <textarea
                      value={tempBio}
                      onChange={(e) => setTempBio(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/40"
                      rows={4}
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setEditingBio(false)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-white/60" />
                      </button>
                      <button 
                        onClick={saveBio}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <p className="text-white/60 text-sm">{bio}</p>
                    <button 
                      onClick={() => {
                        setTempBio(bio);
                        setEditingBio(true);
                      }}
                      className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded-full transition-all"
                    >
                      <Edit className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Level 8</span>
                </div>
                <span className="text-white/40 text-sm">2500 XP to next level</span>
              </div>
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
          
          {/* To-Do List */}
          <div className="gaming-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className={`w-5 h-5 ${moodTheme.primaryColor}`} />
                <h3 className="text-xl font-bold text-white">To-Do List</h3>
              </div>
              <button 
                onClick={() => setAddingTodo(true)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <Plus className="w-5 h-5 text-white/60" />
              </button>
            </div>
            
            <div className="space-y-2">
              {addingTodo && (
                <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 bg-transparent border-none text-white focus:outline-none"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTodo();
                      if (e.key === 'Escape') setAddingTodo(false);
                    }}
                  />
                  <button 
                    onClick={() => setAddingTodo(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white/60" />
                  </button>
                  <button 
                    onClick={handleAddTodo}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Check className="w-4 h-4 text-green-400" />
                  </button>
                </div>
              )}
              
              {todos.map(todo => (
                <div 
                  key={todo.id} 
                  className={`flex items-center justify-between p-2 rounded-lg group ${
                    todo.completed ? 'bg-green-500/10' : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleTodo(todo.id)}
                      className={`p-1 rounded-md ${
                        todo.completed ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {todo.completed ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                    </button>
                    <span className={`text-sm ${
                      todo.completed ? 'text-white/40 line-through' : 'text-white'
                    }`}>
                      {todo.text}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4 text-white/40" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Middle Column - Mood Calendar */}
        <div className="space-y-6">
          <div className="gaming-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className={`w-5 h-5 ${moodTheme.primaryColor}`} />
              <h3 className="text-xl font-bold text-white">Mood Calendar</h3>
            </div>
            
            <MoodCalendar moodData={moodHistory} />
          </div>
        </div>
        
        {/* Right Column - Progress Graph */}
        <div className="space-y-6">
          <div className="gaming-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className={`w-5 h-5 ${moodTheme.primaryColor}`} />
              <h3 className="text-xl font-bold text-white">Progress Graph</h3>
            </div>
            
            <div className="h-64 relative">
              {/* Simple mock graph visualization */}
              <div className="absolute inset-0 flex items-end">
                {progressData.datasets[0].data.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-6 bg-blue-400 rounded-t-sm" 
                      style={{ height: `${value}%` }}
                    />
                    <div 
                      className="w-6 bg-green-400 rounded-t-sm" 
                      style={{ height: `${progressData.datasets[1].data[index]}%` }}
                    />
                    <span className="text-xs text-white/40 mt-1">{progressData.labels[index]}</span>
                  </div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-white/40 pr-2">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-sm" />
                <span className="text-xs text-white/60">Mood Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-sm" />
                <span className="text-xs text-white/60">Activity Completion</span>
              </div>
            </div>
          </div>
          
          {/* Settings Card */}
          <div className="gaming-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className={`w-5 h-5 ${moodTheme.primaryColor}`} />
              <h3 className="text-xl font-bold text-white">Settings</h3>
            </div>
            
            <div className="space-y-2">
              {['Notification Preferences', 'Privacy Settings', 'Account Information', 'Help & Support'].map((item, index) => (
                <div 
                  key={index}
                  className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span className="text-white/80">{item}</span>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <ProfilePicturePopup 
        isOpen={showProfilePicturePopup}
        onClose={() => setShowProfilePicturePopup(false)}
        currentAvatar={avatar}
        onAvatarChange={handleAvatarChange}
      />
    </div>
  );
} 