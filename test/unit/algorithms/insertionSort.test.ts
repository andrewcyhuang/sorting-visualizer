import { insertionSort } from '../../../src/algorithms/insertionSort';
import { arrayEqualityChecker, randomInt } from '../../../src/utils/util';


test('insertionSort should sort correctly', () => {
    const nums: number[] = [];

    for (let i = 0; i < 500; i++) {
        nums[i] = randomInt(0, 1000);
    };

    const testNums: number[] = nums.slice();

    insertionSort(nums);

    const correct = arrayEqualityChecker(nums, testNums);

    expect(correct).toBe(true);
});