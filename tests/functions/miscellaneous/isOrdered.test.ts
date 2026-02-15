import { describe, expect, test } from "vitest";

import { isOrdered } from "src/root/functions";

describe("isOrdered", () => {
  test("Returns true if the array is sorted", () => {
    const array = [1, 2, 3];
    expect(isOrdered(array)).toBe(true);
  });
  test("Returns false if the array is not sorted", () => {
    const array = [2, 3, 1];
    expect(isOrdered(array)).toBe(false);
  });
  test("Does not mutate the input array", () => {
    const array = Object.freeze([1, 2, 3]);
    isOrdered(array);
    expect(array).toEqual([1, 2, 3]);
  });
});
