import React, { useState } from 'react';
import { Users, Heart, Sparkles, Leaf, PenTool, X, Send, User, UserX, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useMood } from '../context/MoodContext';

interface Reply {
  id: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  timestamp: Date;
}

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
  isNew?: boolean;
  replies: Reply[];
  showReplies?: boolean;
}

interface Reaction {
  type: 'relatable' | 'hopeful' | 'inspiring';
  emoji: string;
  icon: React.ElementType;
  color: string;
}

// Dummy data for initial posts
const dummyPosts: Post[] = [
  {
    id: '1',
    content: "Today I completed my first full week of mindfulness practice. I've noticed such a difference in my anxiety levels already. Anyone else experience something similar?",
    author: "MindfulMegan",
    isAnonymous: false,
    timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    reactions: {
      relatable: 15,
      hopeful: 8,
      inspiring: 12
    },
    replies: [
      {
        id: '1-1',
        content: "Yes! I've been practicing mindfulness for about a month now, and it has been a game-changer for my anxiety. Keep it up!",
        author: "ZenMaster",
        isAnonymous: false,
        timestamp: new Date(Date.now() - 86400000 * 1.5) // 1.5 days ago
      },
      {
        id: '1-2',
        content: "I struggled with consistency at first, but once I made it a daily habit, I noticed improvements within a couple of weeks. It gets even better!",
        author: "CalmExplorer",
        isAnonymous: false,
        timestamp: new Date(Date.now() - 86400000) // 1 day ago
      }
    ],
    showReplies: false
  },
  {
    id: '2',
    content: "I've been struggling with negative thoughts lately. It's hard to break the cycle. Any tips from the community on how to refocus my mind when those thoughts start creeping in?",
    author: "Anonymous",
    isAnonymous: true,
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    reactions: {
      relatable: 23,
      hopeful: 5,
      inspiring: 3
    },
    replies: [
      {
        id: '2-1',
        content: "I've found that the 5-4-3-2-1 grounding technique helps. Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. It helps bring you back to the present moment.",
        author: "GroundedGrace",
        isAnonymous: false,
        timestamp: new Date(Date.now() - 64800000) // 18 hours ago
      }
    ],
    showReplies: false
  },
  {
    id: '3',
    content: "Just wanted to share a small win - I've been using the breathing exercises for a week now, and today I managed to stay calm during a stressful meeting that would normally have triggered my anxiety. Small steps!",
    author: "ProgressNotPerfection",
    isAnonymous: false,
    timestamp: new Date(Date.now() - 43200000), // 12 hours ago
    reactions: {
      relatable: 9,
      hopeful: 14,
      inspiring: 21
    },
    replies: [
      {
        id: '3-1',
        content: "That's not a small win, that's a huge one! Managing anxiety in real-world stressful situations is a major accomplishment. Be proud!",
        author: "CelebrateMilestones",
        isAnonymous: false,
        timestamp: new Date(Date.now() - 39600000) // 11 hours ago
      },
      {
        id: '3-2',
        content: "Which breathing technique worked best for you? I'm still experimenting to find what helps me most.",
        author: "BreatheDeep",
        isAnonymous: false,
        timestamp: new Date(Date.now() - 36000000) // 10 hours ago
      },
      {
        id: '3-3',
        content: "I use the 4-7-8 technique: breathe in for 4 seconds, hold for 7, exhale for 8. Works wonders for me in meetings!",
        author: "ProgressNotPerfection",
        isAnonymous: false,
        timestamp: new Date(Date.now() - 32400000) // 9 hours ago
      }
    ],
    showReplies: false
  },
  {
    id: '4',
    content: "Nature is my therapy. I went hiking this weekend and it completely reset my mental state. Has anyone else found specific environments that help them reset?",
    author: "WildernessHealer",
    isAnonymous: false,
    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
    reactions: {
      relatable: 18,
      hopeful: 7,
      inspiring: 15
    },
    replies: [],
    showReplies: false
  },
  {
    id: '5',
    content: "Does anyone else keep a gratitude journal? I've been writing down three things I'm grateful for each night before bed, and it's helped shift my perspective in a really positive way.",
    author: "GratefulHeart",
    isAnonymous: false,
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    reactions: {
      relatable: 11,
      hopeful: 16,
      inspiring: 9
    },
    replies: [
      {
        id: '5-1',
        content: "I do! I've been keeping one for over a year now. It's amazing how it trains your brain to look for the positive throughout the day. I'm actually excited to write in it each night!",
        author: "ThankfulSoul",
        isAnonymous: false,
        timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
      }
    ],
    showReplies: false
  }
];

export function Community() {
  const { getMoodTheme } = useMood();
  const moodTheme = getMoodTheme();
  
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [replyContent, setReplyContent] = useState<{[key: string]: string}>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const reactions: Reaction[] = [
    { type: 'relatable', emoji: '❤️', icon: Heart, color: 'text-pink-400' },
    { type: 'hopeful', emoji: '🌱', icon: Leaf, color: 'text-green-400' },
    { type: 'inspiring', emoji: '✨', icon: Sparkles, color: 'text-yellow-400' }
  ];

  // Format relative time like "2 days ago", "5 hours ago", etc.
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  };

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
        },
        isNew: true,
        replies: [],
        showReplies: false
      };
      setPosts(prev => [newPost, ...prev]);
      setPostContent('');
      setShowCreatePost(false);
      setIsAnonymous(false);
      
      setTimeout(() => {
        setPosts(prev => 
          prev.map(post => 
            post.id === newPost.id ? { ...post, isNew: false } : post
          )
        );
      }, 3000);
    }
  };

  const handleReplySubmit = (postId: string) => {
    const content = replyContent[postId];
    if (content && content.trim()) {
      const newReply: Reply = {
        id: `${postId}-${Date.now()}`,
        content: content,
        author: 'User', // Replace with actual username when auth is implemented
        isAnonymous: false,
        timestamp: new Date()
      };
      
      setPosts(prev => 
        prev.map(post => 
          post.id === postId 
            ? { ...post, replies: [...post.replies, newReply], showReplies: true }
            : post
        )
      );
      
      // Clear the reply input for this post
      setReplyContent(prev => ({...prev, [postId]: ''}));
      setReplyingTo(null);
    }
  };

  const toggleReplies = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, showReplies: !post.showReplies }
          : post
      )
    );
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
        {posts
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .map(post => {
            const totalReactions = post.reactions.relatable + post.reactions.hopeful + post.reactions.inspiring;
            const isTrending = totalReactions > 20;
            const hasReplies = post.replies.length > 0;
            
            return (
              <div 
                key={post.id} 
                className={`gaming-card p-6 ${post.isNew ? 'animate-pulse-light border-2 border-blue-400/30' : ''}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  {post.isAnonymous ? (
                    <UserX className="w-4 h-4 text-white/60" />
                  ) : (
                    <User className="w-4 h-4 text-white/60" />
                  )}
                  <span className="text-white/60">{post.author}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/40">
                    {formatRelativeTime(post.timestamp)}
                  </span>
                  {isTrending && (
                    <span className="ml-auto flex items-center gap-1 bg-purple-500/20 text-purple-300 py-0.5 px-2 rounded-full text-xs">
                      <Sparkles className="w-3 h-3" />
                      Trending
                    </span>
                  )}
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
                  
                  <button
                    onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                    className="flex items-center gap-2 py-1 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors ml-auto"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-400" />
                    <span className="text-white/60">Reply</span>
                  </button>
                  
                  {hasReplies && (
                    <button
                      onClick={() => toggleReplies(post.id)}
                      className="flex items-center gap-1 py-1 px-2 rounded-lg text-white/60 hover:text-white/80 transition-colors"
                    >
                      {post.showReplies ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          <span className="text-sm">Hide</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span className="text-sm">{post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                
                {/* Reply form */}
                {replyingTo === post.id && (
                  <div className="mt-4 pl-6 border-l-2 border-white/10">
                    <div className="flex gap-2">
                      <textarea
                        value={replyContent[post.id] || ''}
                        onChange={(e) => setReplyContent(prev => ({...prev, [post.id]: e.target.value}))}
                        placeholder="Add a reply..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 resize-none h-20"
                      />
                      <div className="flex flex-col justify-between">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-white/60" />
                        </button>
                        <button
                          onClick={() => handleReplySubmit(post.id)}
                          disabled={!replyContent[post.id]?.trim()}
                          className={`p-2 rounded-full transition-colors ${
                            replyContent[post.id]?.trim() 
                              ? 'bg-blue-500 hover:bg-blue-600' 
                              : 'bg-white/10 cursor-not-allowed'
                          }`}
                        >
                          <Send className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Replies section */}
                {post.showReplies && hasReplies && (
                  <div className="mt-4 space-y-3 pl-6 border-l-2 border-white/10">
                    {post.replies.map(reply => (
                      <div key={reply.id} className="gaming-card p-4 bg-white/5">
                        <div className="flex items-center gap-2 mb-2">
                          {reply.isAnonymous ? (
                            <UserX className="w-3 h-3 text-white/60" />
                          ) : (
                            <User className="w-3 h-3 text-white/60" />
                          )}
                          <span className="text-white/60 text-sm">{reply.author}</span>
                          <span className="text-white/40 text-sm">•</span>
                          <span className="text-white/40 text-sm">
                            {formatRelativeTime(reply.timestamp)}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm whitespace-pre-wrap">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

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