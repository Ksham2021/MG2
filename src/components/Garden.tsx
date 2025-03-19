import React from 'react';
import { Tree } from '../types/tree';
import { TreeComponent } from './TreeComponent';

interface GardenProps {
  trees: Tree[];
  onTreeUpdate: (trees: Tree[]) => void;
}

export const Garden: React.FC<GardenProps> = ({ trees, onTreeUpdate }) => {
  const handleTreeDrag = (dragIndex: number, hoverIndex: number) => {
    const newTrees = [...trees];
    const draggedTree = newTrees[dragIndex];
    newTrees.splice(dragIndex, 1);
    newTrees.splice(hoverIndex, 0, draggedTree);
    onTreeUpdate(newTrees);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Your Garden</h2>
      <div className="grid grid-cols-4 gap-4">
        {trees.map((tree, index) => (
          <TreeComponent
            key={tree.id}
            tree={tree}
            index={index}
            onDrag={handleTreeDrag}
          />
        ))}
      </div>
    </div>
  );
};
