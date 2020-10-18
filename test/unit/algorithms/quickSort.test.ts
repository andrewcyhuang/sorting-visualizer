import { quickSort } from '../../../src/algorithms/quickSort';
import { arrayEqualityChecker, randomInt } from '../../../src/utils/util';


test('quickSort should sort correctly', () => {
    const nums: number[] = [];

    for (let i = 0; i < 20; i++) {
        nums[i] = randomInt(0, 1000);
    };

    const testNums: number[] = nums.slice();

    quickSort(nums);

    let correct = false;

    try {
        correct = arrayEqualityChecker(nums, testNums);
    } catch (err) {
        console.log(nums);
        console.log(testNums);
    }

    expect(correct).toBe(true);
});