import { DataError } from "src/root/types";

/**
 * Creates an array of numbers within a given range.
 *
 * - The range is inclusive of `start` and exclusive of `stop`.
 * - The sign of `step` must match the direction of the range.
 *
 * @category Array Helpers
 *
 * @param start - The number to start at (inclusive).
 * @param stop - The number to stop at (exclusive).
 * @param step - The step size between numbers, defaulting to 1.
 *
 * @throws {DataError} If `step` is `0`.
 * @throws {DataError} If `step` direction does not match the order of `start` and `stop`.
 *
 * @returns An array of numbers satisfying the range provided.
 */
function range(start: number, stop: number, step: number = 1): number[] {
  const numbers: number[] = [];
  if (step === 0) {
    throw new DataError({ step }, "ZERO_STEP_SIZE", "Step size cannot be zero.");
  } else if (step > 0) {
    if (start > stop) {
      throw new DataError(
        { start, stop, step },
        "INVALID_BOUNDARIES",
        "The starting value cannot be bigger than the final value if step is positive",
      );
    }
    for (let i = start; i < stop; i += step) {
      numbers.push(i);
    }
  } else if (step < 0) {
    if (start < stop) {
      throw new DataError(
        { start, stop, step },
        "INVALID_BOUNDARIES",
        "The final value cannot be bigger than the starting value if step is negative",
      );
    }
    for (let i = start; i > stop; i += step) {
      numbers.push(i);
    }
  }
  return numbers;
}

export default range;
