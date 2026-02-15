import { describe, expect, test } from "vitest";

import { paralleliseArrays } from "src/root/functions";

describe("paralleliseArrays", () => {
  test("Creates a new array where each item is a sub-array of items in the two given arrays at that index", () => {
    expect(paralleliseArrays([1, 3, 5], [2, 4, 6])).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });
  test("If arrays have unequal length, loop for as long as the length of the first array", () => {
    expect(paralleliseArrays([1, 3, 5], [2, 4]).length).toBe(3);
  });
  test("Any leftover properties from the second array are undefined if we keep looping beyond its length", () => {
    expect(paralleliseArrays([1, 3, 5], [2, 4])).toEqual([
      [1, 2],
      [3, 4],
      [5, undefined],
    ]);
  });
  describe("Immutability checks", () => {
    test("Does not mutate either input", () => {
      const firstArray = Object.freeze([1, 3, 5]);
      const secondArray = Object.freeze([2, 4, 6]);

      paralleliseArrays(firstArray, secondArray);

      expect(firstArray).toEqual([1, 3, 5]);
      expect(secondArray).toEqual([2, 4, 6]);
    });
    test("Returns an array with a new reference in memory", () => {
      const firstArray = Object.freeze([1, 3, 5]);
      const secondArray = Object.freeze([2, 4, 6]);

      const result = paralleliseArrays(firstArray, secondArray);
      expect(result).not.toBe(firstArray);
      expect(result).not.toBe(secondArray);
    });
  });
});
