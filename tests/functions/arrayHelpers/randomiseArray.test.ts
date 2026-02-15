import { describe, expect, test, vi } from "vitest";

import randomiseArray from "src/root/functions/arrayHelpers/randomiseArray";
// eslint-disable-next-line @alextheman/no-namespace-imports
import * as getRandomNumber from "src/root/functions/miscellaneous/getRandomNumber";

describe("randomiseArray", () => {
  test("Returns an array", () => {
    const randomisedArray = randomiseArray([1, 2, 3]);
    expect(Array.isArray(randomisedArray)).toBe(true);
  });
  test("Returns an array with the same items", () => {
    const inputArray = [1, 2, 3];
    const randomisedArray = randomiseArray(inputArray);
    expect(randomisedArray.length).not.toBe(0);
    randomisedArray.forEach((item: any) => {
      expect(inputArray.includes(item)).toBe(true);
    });
  });
  test("Returns the items in a random order", () => {
    const spy = vi.spyOn(getRandomNumber, "default");
    spy.mockImplementationOnce(() => {
      return 1;
    });
    spy.mockImplementationOnce(() => {
      return 0;
    });
    spy.mockImplementationOnce(() => {
      return 0;
    });

    const inputArray = [1, 2, 3];
    const randomisedArray = randomiseArray(inputArray);

    expect(randomisedArray).toEqual([2, 1, 3]);
  });
  test("Does not mutate the input array", () => {
    const inputArray = [1, 2, 3];
    randomiseArray(inputArray);
    expect(inputArray).toEqual([1, 2, 3]);
  });
  test("Returns an array with a new reference in memory", () => {
    const inputArray = [1, 2, 3];
    const outputArray = randomiseArray(inputArray);
    expect(outputArray).not.toBe(inputArray);
  });
});
