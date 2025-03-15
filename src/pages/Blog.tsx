import React from 'react';
import { BookOpen, Clock, Heart, MessageCircle, Share2 } from 'lucide-react';

export function Blog() {
  const blogPosts = [
    {
      title: "Understanding Anxiety: A Beginner's Guide",
      excerpt: "Learn about the basics of anxiety, its symptoms, and how to start managing it effectively in your daily life.",
      author: "Dr. Sarah Johnson",
      date: "2 days ago",
      readTime: "5 min read",
      likes: 234,
      comments: 45,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Mindfulness Meditation: Your Daily Mental Reset",
      excerpt: "Discover how spending just 10 minutes a day in mindful meditation can transform your mental well-being.",
      author: "Mark Stevens",
      date: "1 week ago",
      readTime: "8 min read",
      likes: 456,
      comments: 89,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Building Resilience Through Daily Habits",
      excerpt: "Explore practical strategies to build mental resilience and cope with life's challenges more effectively.",
      author: "Emma Thompson",
      date: "2 weeks ago",
      readTime: "6 min read",
      likes: 321,
      comments: 67,
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <BookOpen className="w-6 h-6 text-blue-400" />
        <h1 className="text-3xl font-bold gaming-gradient">Mental Health Blog</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <article key={index} className="gaming-card group cursor-pointer">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-2 group-hover:gaming-gradient">
                {post.title}
              </h2>
              <p className="text-white/60 text-sm mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-white/60">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                <button className="flex items-center gap-1 text-white/60 hover:text-pink-400">
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1 text-white/60 hover:text-blue-400">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1 text-white/60 hover:text-violet-400 ml-auto">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}