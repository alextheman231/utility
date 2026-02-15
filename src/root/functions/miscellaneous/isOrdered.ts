/**
 * Checks to see if the given array is sorted in ascending order.
 *
 * @category Miscellaneous
 *
 * @param array - The array to check.
 *
 * @returns `true` if the array is sorted in ascending order, and `false` otherwise.
 */
function isOrdered(array: readonly number[]): boolean {
  const newArray = [...array];
  newArray.sort();

  for (const index in newArray) {
    if (newArray[index] !== array[index]) {
      return false;
    }
  }

  return true;
}

export default isOrdered;
