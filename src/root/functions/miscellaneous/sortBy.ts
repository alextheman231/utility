import type { SortDirection } from "src/root/types";

type SortFunction<ItemType> = (first: ItemType, second: ItemType) => number;

/**
 * Provides a function to pass to the `sort` or `toSorted` methods on arrays, which will allow those methods to sort the items by the chosen value in the chosen direction.
 *
 * @template ItemType - The type of each array item.
 * @template SortValue - The type of the value to sort by.
 *
 * @param selector - A function that takes the item and returns the value to sort by.
 * @param direction - The sort direction.
 *
 * @returns A function to pass into the `.sort()` or `.toSorted()` methods on arrays.
 */
function sortBy<ItemType, SortValue extends string | number | Date>(
  selector: (item: ItemType) => SortValue,
  direction: SortDirection = "asc",
): SortFunction<ItemType> {
  return (first, second) => {
    const firstValue = selector(first);
    const secondValue = selector(second);

    if (firstValue instanceof Date && secondValue instanceof Date) {
      const firstTime = firstValue.getTime();
      const secondTime = secondValue.getTime();

      return direction === "asc" ? firstTime - secondTime : secondTime - firstTime;
    }

    if (firstValue < secondValue) {
      return direction === "asc" ? -1 : 1;
    }

    if (firstValue > secondValue) {
      return direction === "asc" ? 1 : -1;
    }

    return 0;
  };
}

export default sortBy;
