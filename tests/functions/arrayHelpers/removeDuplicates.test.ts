import { describe, expect, test } from "vitest";

import { removeDuplicates } from "src/root/functions";

describe("removeDuplicates", () => {
  describe("Mutation checks", () => {
    test("Does not mutate the original array", () => {
      const inputArray = Object.freeze([1, 1, 2, 3, 4]);
      // since the array has been frozen, this will give a TypeError if it tries to mutate the inputArray.
      removeDuplicates(inputArray);
      expect(inputArray).toEqual([1, 1, 2, 3, 4]);
    });
    test("Returns an array with a new reference in memory", () => {
      const inputArray = [1, 1, 2, 3, 4];
      const outputArray = removeDuplicates(inputArray);
      expect(outputArray).not.toBe(inputArray);
    });
  });
  test("Returns the same array if no duplicates found", () => {
    expect(removeDuplicates([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });
  test("Removes duplicate values from the array", () => {
    expect(removeDuplicates([1, 1, 2, 3, 4, 4, 5, 4, 3])).toEqual([1, 2, 3, 4, 5]);
  });
});
