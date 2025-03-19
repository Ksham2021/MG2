import React, { useState } from 'react';
import { FocusTimer } from '../components/FocusTimer';
import { Garden } from '../components/Garden';
import { Stats } from '../components/Stats';
import { useAuth } from '../hooks/useAuth';

const SoulScape: React.FC = () => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const { user } = useAuth();

  const handleSessionComplete = (duration: number) => {
    const newTree = generateTree(duration);
    setTrees([...trees, newTree]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8">SoulScape</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FocusTimer onSessionComplete={handleSessionComplete} />
          <Stats trees={trees} />
          <Garden trees={trees} onTreeUpdate={setTrees} />
        </div>
      </div>
    </div>
  );
};

export default SoulScape;
