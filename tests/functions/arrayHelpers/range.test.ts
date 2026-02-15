import { describe, expect, test } from "vitest";

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
      try {
        range(10, 0);
        throw new Error("TEST_FAILED");
      } catch (error: unknown) {
        if (error instanceof Error) {
          expect(error.message).toBe("INVALID_BOUNDARIES");
        }
      }
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
      try {
        range(0, 10, -1);
        throw new Error("TEST_FAILED");
      } catch (error: unknown) {
        if (error instanceof Error) {
          expect(error.message).toBe("INVALID_BOUNDARIES");
        }
      }
    });
  });
  describe("Weird edge cases", () => {
    test("Return an empty array if start is equal to stop", () => {
      expect(range(10, 10).length).toBe(0);
    });
    test("Throw an error if step is 0", () => {
      try {
        range(0, 10, 0);
        throw new Error("TEST_FAILED");
      } catch (error: unknown) {
        if (error instanceof Error) {
          expect(error.message).toBe("ZERO_STEP_SIZE_NOT_ALLOWED");
        }
      }
    });
  });
});
