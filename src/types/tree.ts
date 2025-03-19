export interface Tree {
  id: string;
  type: TreeType;
  name: string;
  createdAt: Date;
  duration: number;
}

export enum TreeType {
  SMALL_PLANT = 'small_plant',
  BUSH = 'bush',
  APPLE_TREE = 'apple_tree',
  RARE_TREE = 'rare_tree',
  CHERRY_BLOSSOM = 'cherry_blossom'
}

export interface TreePosition {
  x: number;
  y: number;
}
