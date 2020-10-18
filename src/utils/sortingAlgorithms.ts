/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import { AnimationObject } from './types';

const arrayEqualityChecker = (nums: number[], testNums: number[]): void => {
  if (nums.length !== testNums.length) {
    throw new Error('Array lengths do not match');
  }

  testNums.sort((a, b) => a - b);

  nums.forEach((val, idx) => {
    if (val !== testNums[idx]) {
      throw new Error('Array is incorrectly sorted');
    }
  });
};

export const insertionSort = (nums: number[]): AnimationObject[] => {
  console.log('CALLED INSERTION SORT FUNCTION');
  if (nums.length < 2) {
    console.log('Array is already sorted.');
    throw new Error('Array is size 1 and is already sorted');
  }
  const testNums: number[] = nums.slice();
  const animations: AnimationObject[] = [];

  for (let i = 1; i < nums.length; i += 1) {
    const curr: number = nums[i];
    let j: number = i - 1;
    const currentAnimation: AnimationObject = { insertionPoint: i };

    while (j >= 0 && nums[j] > curr) {
      const innerAnimation: AnimationObject = { insertionPoint: i };
      const currentSwapIndices: number[] = [j + 1, j];
      nums[j + 1] = nums[j];
      innerAnimation.currentSwapIndices = currentSwapIndices;
      innerAnimation.currentSwap = [nums[j]];
      animations.push(innerAnimation);
      j -= 1;
    }
    const currentSwapIndices: number[] = [j + 1, i];
    const currentSwap: number = curr;
    nums[j + 1] = curr;
    currentAnimation.currentSwapIndices = currentSwapIndices;
    currentAnimation.currentSwap = [currentSwap];
    animations.push(currentAnimation);
  }
  console.log('INSERTION SORT FUNCTION COMPLETE, RETURNING ANIMATIONS');
  try {
    arrayEqualityChecker(nums, testNums);
    return animations;
  } catch (err) {
    console.log(
      'Insertion sort algorithm incorrectly implemented.',
    );
    throw new Error('Insertion sort failed.');
  }
};

export const bubbleSort = (nums: number[]): AnimationObject[] => {
  console.log('Bubble sort called');
  const len: number = nums.length;
  if (len < 2) {
    console.log('Array is already sorted.');
    throw new Error('Array is size 1 and is already sorted');
  }

  const testNums: number[] = nums.slice();
  const animations: AnimationObject[] = [];

  for (let i = 0; i < len; i += 1) {
    const currentAnimation: AnimationObject = { bubbleSortedCount: i + 1 };
    for (let j = 0; j < len - i - 1; j += 1) {
      const innerAnimation: AnimationObject = {};
      innerAnimation.currentSwapIndices = [j, j + 1];

      if (nums[j] > nums[j + 1]) {
        const temp: number = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
        innerAnimation.currentSwap = [nums[j], nums[j + 1]];
      }
      animations.push(innerAnimation);
    }
    animations.push(currentAnimation);
  }
  try {
    arrayEqualityChecker(nums, testNums);
    return animations;
  } catch (err) {
    console.log(
      'Bubble sort algorithm incorrectly implemented.',
    );
    throw new Error('Bubble sort failed.');
  }
};

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
  const testNums: number[] = nums.slice();

  doMergeSort(nums, tempNums, 0, nums.length - 1, animations);

  arrayEqualityChecker(nums, testNums);

  return animations;
};
