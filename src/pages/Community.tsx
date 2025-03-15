import React from 'react';
import { Users, MessageCircle, Heart, Share2, Trophy, Star } from 'lucide-react';

export function Community() {
  const discussions = [
    {
      title: "How do you deal with exam anxiety?",
      author: {
        name: "Alex Chen",
        level: 15,
        badge: "Mental Health Warrior",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
      },
      replies: 24,
      likes: 156,
      tags: ["Anxiety", "Student Life", "Self Help"]
    },
    {
      title: "Weekly Meditation Group - Join Us!",
      author: {
        name: "Maya Patel",
        level: 28,
        badge: "Meditation Guide",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
      },
      replies: 89,
      likes: 342,
      tags: ["Meditation", "Group Activity", "Weekly Event"]
    },
    {
      title: "Share your self-care routine!",
      author: {
        name: "Jordan Lee",
        level: 21,
        badge: "Wellness Expert",
        avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=200"
      },
      replies: 156,
      likes: 423,
      tags: ["Self Care", "Daily Routine", "Tips"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-400" />
          <h1 className="text-3xl font-bold gaming-gradient">Community Hub</h1>
        </div>
        <button className="neon-border py-2 px-4 rounded-lg text-white font-medium">
          Start Discussion
        </button>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion, index) => (
          <div key={index} className="gaming-card p-6">
            <div className="flex items-start gap-4">
              <img 
                src={discussion.author.avatar} 
                alt={discussion.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white hover:gaming-gradient cursor-pointer">
                  {discussion.title}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-white/60 text-sm">{discussion.author.name}</span>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Trophy className="w-4 h-4" />
                    <span>Lvl {discussion.author.level}</span>
                  </div>
                  <div className="flex items-center gap-1 text-violet-400 text-sm">
                    <Star className="w-4 h-4" />
                    <span>{discussion.author.badge}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {discussion.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/60 hover:bg-white/20 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                  <button className="flex items-center gap-1 text-white/60 hover:text-blue-400">
                    <MessageCircle className="w-4 h-4" />
                    {discussion.replies} Replies
                  </button>
                  <button className="flex items-center gap-1 text-white/60 hover:text-pink-400">
                    <Heart className="w-4 h-4" />
                    {discussion.likes}
                  </button>
                  <button className="flex items-center gap-1 text-white/60 hover:text-violet-400 ml-auto">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}