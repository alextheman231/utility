export type ParallelTuple<A, B> = [A, B | undefined];

/**
 * Creates a new array of tuples, each containing the item at the given index from both arrays.
 *
 * If `secondArray` is shorter than `firstArray`, the second position in the tuple
 * will be `undefined`. Iteration always uses the length of the first array.
 *
 * @category Array Helpers
 *
 * @template FirstArrayItem
 * @template SecondArrayItem
 *
 * @param firstArray - The first array. Each item in this will take up the first tuple spot.
 * @param secondArray - The second array. Each item in this will take up the second tuple spot.
 *
 * @returns An array of `[firstItem, secondItem]` tuples for each index in `firstArray`.
 */
function paralleliseArrays<FirstArrayItem, SecondArrayItem>(
  firstArray: readonly FirstArrayItem[],
  secondArray: readonly SecondArrayItem[],
): ParallelTuple<FirstArrayItem, SecondArrayItem>[] {
  const outputArray: ParallelTuple<FirstArrayItem, SecondArrayItem>[] = [];

  for (let i = 0; i < firstArray.length; i++) {
    outputArray.push([firstArray[i], secondArray[i]]);
  }

  return outputArray;
}

export default paralleliseArrays;
