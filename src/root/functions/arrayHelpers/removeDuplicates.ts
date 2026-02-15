/**
 * Removes duplicate values from an array.
 *
 * @category Array Helpers
 *
 * @template ItemType - The type of the array items.
 *
 * @param array - The array to remove duplicates from.
 *
 * @returns A new array with a different reference in memory, with the duplicates removed.
 */
function removeDuplicates<ItemType>(array: ItemType[] | readonly ItemType[]): ItemType[] {
  const outputArray: ItemType[] = [];
  for (const item of array) {
    if (!outputArray.includes(item)) {
      outputArray.push(item);
    }
  }
  return outputArray;
}

export default removeDuplicates;
