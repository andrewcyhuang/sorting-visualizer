import { AnimationObject } from '../utils/types';

export const bubbleSort = (nums: number[]): AnimationObject[] => {
  const len: number = nums.length;
  if (len < 2) {
    console.log('Array is already sorted.');
    throw new Error('Array is size 1 and is already sorted');
  }

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
    return animations;
  } catch (err) {
    console.log(
      'Bubble sort algorithm incorrectly implemented.',
    );
    throw new Error('Bubble sort failed.');
  }
};
