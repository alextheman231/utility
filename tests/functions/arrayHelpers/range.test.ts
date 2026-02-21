import { describe, expect, test } from "vitest";

import { DataError } from "src/root";
import range from "src/root/functions/arrayHelpers/range";

describe("range", () => {
  describe("Positive step sizes", () => {
    test("Return an array with a starting value of first argument, end value of second argument, and step size of third", () => {
      const output = range(4, 14, 2);
      expect(output.length).toBe(5);
      output.forEach((number, index) => {
        expect(number).toBe(2 * index + 4);
      });
    });
    test("Step size defaults to 1 if not provided", () => {
      const output = range(0, 10);
      expect(output.length).toBe(10);
      output.forEach((number, index) => {
        expect(number).toBe(index);
      });
    });
    test("Throw an error if start is bigger than stop", () => {
      const error = DataError.expectError(() => {
        range(10, 0);
      });
      expect(error.data).toEqual({ start: 10, stop: 0, step: 1 });
      expect(error.code).toBe("INVALID_BOUNDARIES");
    });
  });
  describe("Negative step sizes", () => {
    test("Allow negative step sizes", () => {
      const output = range(15, 5, -1);
      expect(output.length).toBe(10);
      output.forEach((number, index) => {
        expect(number).toBe(-index + 15);
      });
    });
    test("Throw an error if start is less than stop", () => {
      const error = DataError.expectError(() => {
        range(0, 10, -1);
      });
      expect(error.data).toEqual({ start: 0, stop: 10, step: -1 });
      expect(error.code).toBe("INVALID_BOUNDARIES");
    });
  });
  describe("Weird edge cases", () => {
    test("Return an empty array if start is equal to stop", () => {
      expect(range(10, 10).length).toBe(0);
    });
    test("Throw an error if step is 0", () => {
      const error = DataError.expectError(() => {
        range(0, 10, 0);
      });
      expect(error.data.step).toBe(0);
      expect(error.code).toBe("ZERO_STEP_SIZE");
    });
  });
});
