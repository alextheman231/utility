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
 * @throws {Error} If `step` is `0`.
 * @throws {Error} If `step` direction does not match the order of `start` and `stop`.
 *
 * @returns An array of numbers satisfying the range provided.
 */
function range(start: number, stop: number, step: number = 1): number[] {
  const numbers: number[] = [];
  if (step === 0) {
    throw new Error("ZERO_STEP_SIZE_NOT_ALLOWED");
  } else if (step > 0) {
    if (start > stop) {
      throw new Error("INVALID_BOUNDARIES");
    }
    for (let i = start; i < stop; i += step) {
      numbers.push(i);
    }
  } else if (step < 0) {
    if (start < stop) {
      throw new Error("INVALID_BOUNDARIES");
    }
    for (let i = start; i > stop; i += step) {
      numbers.push(i);
    }
  }
  return numbers;
}

export default range;
