export enum TreeState {
  SCATTERED = 'SCATTERED',
  TREE_SHAPE = 'TREE_SHAPE'
}

export interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export interface DualPosition {
  tree: [number, number, number];
  scatter: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  id: number;
}
