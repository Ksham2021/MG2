import { Tree, TreeType } from '../types/tree';

export const generateTree = (duration: number): Tree => {
  const getTreeType = (minutes: number): TreeType => {
    if (minutes >= 120) return TreeType.RARE_TREE;
    if (minutes >= 60) return TreeType.APPLE_TREE;
    if (minutes >= 30) return TreeType.BUSH;
    return TreeType.SMALL_PLANT;
  };

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: getTreeType(duration / 60),
    name: `Tree ${new Date().toLocaleDateString()}`,
    createdAt: new Date(),
    duration
  };
};
