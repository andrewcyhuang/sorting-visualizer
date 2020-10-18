export const arrayEqualityChecker = (nums: number[], testNums: number[]): boolean => {
  if (nums.length !== testNums.length) {
    throw new Error('Array lengths do not match');
  }

  testNums.sort((a, b) => a - b);

  nums.forEach((val, idx) => {
    if (val !== testNums[idx]) {
      throw new Error('Array is incorrectly sorted');
    }
  });
  return true;
};


export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
