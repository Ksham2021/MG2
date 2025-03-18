import React, { useState } from 'react';
import { Users, Heart, Sparkles, Leaf, PenTool, X, Send, User, UserX } from 'lucide-react';
import { useMood } from '../context/MoodContext';

interface Post {
  id: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  timestamp: Date;
  reactions: {
    relatable: number;
    hopeful: number;
    inspiring: number;
  };
}

interface Reaction {
  type: 'relatable' | 'hopeful' | 'inspiring';
  emoji: string;
  icon: React.ElementType;
  color: string;
}

export function Community() {
  const { getMoodTheme } = useMood();
  const moodTheme = getMoodTheme();
  
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const reactions: Reaction[] = [
    { type: 'relatable', emoji: '❤️', icon: Heart, color: 'text-pink-400' },
    { type: 'hopeful', emoji: '🌱', icon: Leaf, color: 'text-green-400' },
    { type: 'inspiring', emoji: '✨', icon: Sparkles, color: 'text-yellow-400' }
  ];

  const handlePostSubmit = () => {
    if (postContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        content: postContent,
        author: isAnonymous ? 'Anonymous' : 'User', // Replace with actual username when auth is implemented
        isAnonymous,
        timestamp: new Date(),
        reactions: {
          relatable: 0,
          hopeful: 0,
          inspiring: 0
        }
      };
      setPosts(prev => [newPost, ...prev]);
      setPostContent('');
      setShowCreatePost(false);
      setIsAnonymous(false);
    }
  };

  const handleReaction = (postId: string, reactionType: 'relatable' | 'hopeful' | 'inspiring') => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionType]: post.reactions[reactionType] + 1
          }
        };
      }
      return post;
    }));
  };

  const CreatePostDialog = () => {
    if (!showCreatePost) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="gaming-card w-full max-w-2xl p-6 m-4 animate-float">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold gaming-gradient">Share Your Thoughts</h2>
            <button 
              onClick={() => setShowCreatePost(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share your thoughts, feelings, or experiences..."
            className="w-full h-48 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 resize-none mb-4"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                isAnonymous ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60'
              }`}
            >
              {isAnonymous ? (
                <>
                  <UserX className="w-4 h-4" />
                  Post Anonymously
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  Post as User
                </>
              )}
            </button>

            <button
              onClick={handlePostSubmit}
              className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-medium flex items-center gap-2"
            >
              Share Post
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="gaming-card mx-auto max-w-3xl mt-8 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className={`w-6 h-6 ${moodTheme.primaryColor}`} />
            <h1 className="text-2xl font-bold gaming-gradient">Community</h1>
          </div>
          <button
            onClick={() => setShowCreatePost(true)}
            className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-medium flex items-center gap-2"
          >
            <PenTool className="w-4 h-4" />
            Create Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {posts.map(post => (
          <div key={post.id} className="gaming-card p-6">
            <div className="flex items-center gap-2 mb-4">
              {post.isAnonymous ? (
                <UserX className="w-4 h-4 text-white/60" />
              ) : (
                <User className="w-4 h-4 text-white/60" />
              )}
              <span className="text-white/60">{post.author}</span>
              <span className="text-white/40">•</span>
              <span className="text-white/40">
                {new Date(post.timestamp).toLocaleDateString()}
              </span>
            </div>

            <p className="text-white mb-6 whitespace-pre-wrap">{post.content}</p>

            <div className="flex items-center gap-4">
              {reactions.map(reaction => (
                <button
                  key={reaction.type}
                  onClick={() => handleReaction(post.id, reaction.type)}
                  className="flex items-center gap-2 py-1 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <reaction.icon className={`w-4 h-4 ${reaction.color}`} />
                  <span className="text-white/60">{post.reactions[reaction.type]}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center text-white/60 py-12">
            <PenTool className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p>Be the first to share your thoughts with the community!</p>
          </div>
        )}
      </div>

      <CreatePostDialog />
    </div>
  );
}