import { AnimationObject } from '../utils/types';

export const insertionSort = (nums: number[]): AnimationObject[] => {
    console.log('CALLED INSERTION SORT FUNCTION');
    if (nums.length < 2) {
        console.log('Array is already sorted.');
        throw new Error('Array is size 1 and is already sorted');
    }
    const testNums: number[] = nums.slice();
    let animations: AnimationObject[] = [];

    for (let i: number = 1; i < nums.length; i++) {
        let curr: number = nums[i];
        let j: number = i - 1;
        let currentAnimation: AnimationObject = { insertionPoint: i };

        while (j >= 0 && nums[j] > curr) {
            let innerAnimation: AnimationObject = { insertionPoint: i };
            let currentSwapIndices: number[] = [j + 1, j];
            nums[j + 1] = nums[j];
            innerAnimation.currentSwapIndices = currentSwapIndices;
            innerAnimation.currentSwap = [nums[j]];
            animations.push(innerAnimation)
            j = j - 1;
        }
        let currentSwapIndices: number[] = [j + 1, i];
        let currentSwap: number = curr;
        nums[j + 1] = curr;
        currentAnimation.currentSwapIndices = currentSwapIndices;
        currentAnimation.currentSwap = [currentSwap];
        animations.push(currentAnimation)
    }
    console.log('INSERTION SORT FUNCTION COMPLETE, RETURNING ANIMATIONS');
    try {
        arrayEqualityChecker(nums, testNums);
        return animations;
    } catch (err) {
        console.log(`Insertion sort algorithm incorrectly implemented. ${err.message}`);
        throw new Error('Insertion sort failed.');
    }
}

export const bubbleSort = (nums: number[]): AnimationObject[] => {
    console.log('Bubble sort called');
    let len: number = nums.length;
    if (len < 2) {
        console.log('Array is already sorted.');
        throw new Error('Array is size 1 and is already sorted');
    }

    let testNums: number[] = nums.slice();
    let animations: AnimationObject[] = [];

    for (let i = 0; i < len; i++) {
        let currentAnimation: AnimationObject = { bubbleSortedCount: i + 1 };
        for (let j = 0; j < len - i - 1; j++) {
            let innerAnimation: AnimationObject = {};
            innerAnimation.currentSwapIndices = [j, j + 1];

            if (nums[j] > nums[j + 1]) {
                let temp: number = nums[j];
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
        console.log(`Bubble sort algorithm incorrectly implemented. ${err.message}`);
        throw new Error('Bubble sort failed.');
    }
}

const arrayEqualityChecker: Function = (nums: number[], testNums: number[]): void => {
    if (nums.length !== testNums.length) { throw new Error('Array lengths do not match') };

    testNums.sort((a, b) => a - b);

    nums.forEach((val, idx) => {
        if (val !== testNums[idx]) {
            throw new Error('Array is incorrectly sorted')
        }
    });
}