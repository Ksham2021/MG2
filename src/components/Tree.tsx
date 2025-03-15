import React from 'react';
import { TreesIcon as TreeIcon } from 'lucide-react';
import type { TreeState } from '../types';

interface TreeProps {
  state: TreeState;
}

export function Tree({ state }: TreeProps) {
  const scale = 1 + (state.size * 0.2);
  const opacity = 0.3 + (state.health * 0.7);
  
  return (
    <div className="relative flex items-center justify-center p-8">
      <div 
        className="transition-all duration-500"
        style={{ 
          transform: `scale(${scale})`,
          opacity
        }}
      >
        <TreeIcon 
          size={120}
          className={`${state.color} transition-colors duration-300`}
        />
      </div>
      <div className="absolute bottom-0 text-sm font-medium">
        Level {state.level}
      </div>
    </div>
  );
}