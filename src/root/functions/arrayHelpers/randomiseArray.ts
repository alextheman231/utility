import getRandomNumber from "src/root/functions/miscellaneous/getRandomNumber";

/**
 * Randomises the order of a given array and returns the result in a new array without mutating the original.
 *
 * @category Array Helpers
 *
 * @template ItemType - The type of the array items.
 *
 * @param array - The array to randomise.
 *
 * @returns A new array with the items randomised.
 */
function randomiseArray<ItemType>(array: ItemType[]): ItemType[] {
  const mutableArray = [...array];
  const outputArray = [];
  do {
    const indexToRemove = getRandomNumber(0, mutableArray.length - 1);
    outputArray.push(mutableArray.splice(indexToRemove, 1)[0]);
  } while (mutableArray.length > 0);
  return outputArray;
}

export default randomiseArray;
