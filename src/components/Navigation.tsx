import React from 'react';
import { Home, Brain, BookOpen, Users, User } from 'lucide-react';

interface NavigationProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

export function Navigation({ onPageChange, currentPage }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-t border-white/20 dark:border-white/10 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <NavLink 
          icon={<Home size={20} />} 
          label="Home" 
          active={currentPage === 'home'}
          onClick={() => onPageChange('home')}
        />
        <NavLink 
          icon={<Brain size={20} />} 
          label="Learn" 
          active={currentPage === 'learn'}
          onClick={() => onPageChange('learn')}
        />
        <NavLink 
          icon={<BookOpen size={20} />} 
          label="Blog" 
          active={currentPage === 'blog'}
          onClick={() => onPageChange('blog')}
        />
        <NavLink 
          icon={<Users size={20} />} 
          label="Community" 
          active={currentPage === 'community'}
          onClick={() => onPageChange('community')}
        />
        <NavLink 
          icon={<User size={20} />} 
          label="Profile" 
          active={currentPage === 'profile'}
          onClick={() => onPageChange('profile')}
        />
      </div>
    </nav>
  );
}

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavLink({ icon, label, active, onClick }: NavLinkProps) {
  return (
    <button 
      className={`flex flex-col items-center p-2 transition-colors group ${
        active ? 'text-white' : 'text-white/60 hover:text-white'
      }`}
      onClick={onClick}
    >
      <div className={`p-2 rounded-lg transition-colors ${
        active ? 'bg-white/10' : 'group-hover:bg-white/10'
      }`}>
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}