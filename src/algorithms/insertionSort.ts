import { AnimationObject } from '../utils/types';

export const insertionSort = (nums: number[]): AnimationObject[] => {
  if (nums.length < 2) {
    console.log('Array is already sorted.');
    throw new Error('Array is size 1 and is already sorted');
  }
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
  try {
    return animations;
  } catch (err) {
    console.log(
      'Insertion sort algorithm incorrectly implemented.',
    );
    throw new Error('Insertion sort failed.');
  }
};
