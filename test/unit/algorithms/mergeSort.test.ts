import { mergeSort } from '../../../src/algorithms/mergeSort';
import { arrayEqualityChecker, randomInt } from '../../../src/utils/util';


test('mergeSort should sort correctly', () => {
    const nums: number[] = [];

    for (let i = 0; i < 500; i++) {
        nums[i] = randomInt(0, 1000);
    };

    const testNums: number[] = nums.slice();

    mergeSort(nums);

    const correct = arrayEqualityChecker(nums, testNums);

    expect(correct).toBe(true);
});