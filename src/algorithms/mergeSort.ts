import { AnimationObject } from '../utils/types';

const merge = (
  nums: number[],
  tempNums: number[],
  start: number,
  mid: number,
  end: number,
  animations: AnimationObject[],
): void => {
  let realStartIdx: number = start;
  let tempStartIdx: number = start;
  let midStartIdx: number = mid + 1;

  while (tempStartIdx <= mid && midStartIdx <= end) {
    const animation: AnimationObject = {};
    animation.currentSwapIndices = [tempStartIdx, midStartIdx];
    if (tempNums[tempStartIdx] <= tempNums[midStartIdx]) {
      animation.currentSwap = [realStartIdx, tempNums[tempStartIdx]];
      nums[realStartIdx] = tempNums[tempStartIdx];
      tempStartIdx += 1;
    } else {
      animation.currentSwap = [realStartIdx, tempNums[midStartIdx]];
      nums[realStartIdx] = tempNums[midStartIdx];
      midStartIdx += 1;
    }
    realStartIdx += 1;
    animations.push(animation);
  }

  while (tempStartIdx <= mid) {
    const animation: AnimationObject = {};
    animation.currentSwapIndices = [tempStartIdx, tempStartIdx];
    animation.currentSwap = [realStartIdx, tempNums[tempStartIdx]];
    nums[realStartIdx] = tempNums[tempStartIdx];
    tempStartIdx += 1;
    realStartIdx += 1;
    animations.push(animation);
  }

  while (midStartIdx <= end) {
    const animation: AnimationObject = {};
    animation.currentSwapIndices = [midStartIdx, midStartIdx];
    animation.currentSwap = [realStartIdx, tempNums[midStartIdx]];
    nums[realStartIdx] = tempNums[midStartIdx];
    midStartIdx += 1;
    realStartIdx += 1;
    animations.push(animation);
  }
};

const doMergeSort = (
  nums: number[],
  tempNums: number[],
  start: number,
  end: number,
  animations: AnimationObject[],
): void => {
  if (start === end) {
    return;
  }

  const mid: number = Math.floor((start + end) / 2);

  doMergeSort(tempNums, nums, start, mid, animations);
  doMergeSort(tempNums, nums, mid + 1, end, animations);
  merge(nums, tempNums, start, mid, end, animations);
};

export const mergeSort = (nums: number[]): AnimationObject[] => {
  const animations: AnimationObject[] = [];
  if (nums.length < 2) {
    return animations;
  }

  const tempNums: number[] = nums.slice();

  doMergeSort(nums, tempNums, 0, nums.length - 1, animations);

  return animations;
};
