export type VisualizerState = {
  array: number[];
};

export type AnimationObject = {
  insertionPoint?: number;
  currentSwap?: number[];
  currentSwapIndices?: number[];
  bubbleSortedCount?: number;
  pivotIdx?: number;
  leftIdx?: number;
  rightIdx?: number;
  done?: boolean;
};

export type SortingVisualizerProps = {

};
