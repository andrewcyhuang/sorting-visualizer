import { AnimationObject } from "../utils/types";

const swap = (nums: number[], left: number, right: number, animations: AnimationObject[]): void => {
  const temp: number = nums[right];
  nums[right] = nums[left];
  nums[left] = temp;
  animations.push({
    currentSwapIndices: [left, right],
    currentSwap: [nums[left], nums[right]]
  });
};

const partition = (nums: number[], left: number, right: number, p: number, animations: AnimationObject[]): number => {
  const pivot = nums[p];

  animations.push({
    pivotIdx: p,
    leftIdx: left,
    rightIdx: right,
    done: false
  });

  while (left <= right) {
    while (nums[left] < pivot) {
      animations.push({
        leftIdx: left,
        done: true
      });

      left += 1;

      animations.push({
        leftIdx: left,
        done: false
      });
    }

    while (nums[right] > pivot) {
      animations.push({
        rightIdx: right,
        done: true
      });

      right -= 1;

      animations.push({
        rightIdx: right,
        done: false
      });
    }

    if (left <= right) {
      swap(nums, left, right, animations);

      left += 1;
      right -= 1;
      
      animations.push({
        leftIdx: left,
        rightIdx: right,
        done: false
      });
    }
  }

  return left;
};

const doQuickSort = (nums: number[], left: number, right: number, animations: AnimationObject[]): void => {
  if (nums.length > 1) {
    const p: number = Math.floor((left + right) / 2);
    const i: number = partition(nums, left, right, p, animations);
  
    if (left < i) {
      doQuickSort(nums, left, i - 1, animations);
    }
    
    if (i < right) {
      doQuickSort(nums, i, right, animations);
    }
  }
};

export const quickSort = (nums: number[]): AnimationObject[] => {
  const animations: AnimationObject[] = [];
  const len: number = nums.length;

  if (len < 2) return animations;

  doQuickSort(nums, 0, len - 1, animations);

  return animations;
}