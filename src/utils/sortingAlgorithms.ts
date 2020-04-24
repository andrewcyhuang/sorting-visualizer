import { InsertionSortAnimation } from '../utils/types';

export const insertionSort = (nums: number[]): InsertionSortAnimation[] => {
    console.log('CALLED INSERTION SORT FUNCTION');
    if (nums.length < 2) {
        console.log('Array is already sorted.');
        throw new Error('Array is size 1 and is already sorted');
    }
    const testNums: number[] = nums.slice();
    // initialize animations array
    let animations: InsertionSortAnimation[] = [];

    // !!! NOT ELEGANT. REFACTOR LATER - WITH SOME ADD ANIMATION SERVICE HELPER!!!
    for (let i: number = 1; i < nums.length; i++) {
        let curr: number = nums[i];
        let j: number = i - 1;
        let currentAnimation: InsertionSortAnimation = { insertionPoint: i };

        while (j >= 0 && nums[j] > curr) {
            let innerAnimation: InsertionSortAnimation = { insertionPoint: i };
            let currentSwapIndices: number[] = [j + 1, j];
            nums[j + 1] = nums[j];
            innerAnimation.currentSwapIndices = currentSwapIndices;
            innerAnimation.currentSwap = nums[j];
            animations.push(innerAnimation)
            j = j - 1;
        }
        let currentSwapIndices: number[] = [j + 1, i];
        let currentSwap: number = curr;
        nums[j + 1] = curr;
        currentAnimation.currentSwapIndices = currentSwapIndices;
        currentAnimation.currentSwap = currentSwap;
        animations.push(currentAnimation)
    }
    console.log('INSERTION SORT FUNCTION COMPLETE, RETURNING ANIMATIONS');
    try {
        arrayEqualityChecker(nums, testNums);
        return animations;
    } catch (err) {
        console.log(`sorting algorithm incorrectly implemented. ${err.message}`);
        throw new Error('Insertion sort failed.');
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