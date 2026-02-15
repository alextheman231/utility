/**
 * Creates a new array where each element is the resolved result of the provided asynchronous callback.
 *
 * The callback will be invoked once for each index from `0` to `length - 1`.
 * If no length is provided, a single-element array will be produced.
 *
 * @template ItemType - The awaited return type of the callback that becomes the type of the array items.
 *
 * @param callback - An asynchronous function invoked with the current index.
 * @param length - The desired length of the resulting array.
 *
 * @returns A Promise resolving to an array of the callback results.
 */
function fillArray<ItemType>(
  callback: (index: number) => Promise<ItemType>,
  length?: number,
): Promise<ItemType[]>;

/**
 * Creates a new array where each element is the result of the provided synchronous callback.
 *
 * The callback will be invoked once for each index from `0` to `length - 1`.
 * If no length is provided, a single-element array will be produced.
 *
 * @template ItemType - The return type of the callback that becomes the type of the array items.
 *
 * @param callback - A synchronous function invoked with the current index.
 * @param length - The desired length of the resulting array.
 *
 * @returns An array of the callback results.
 */
function fillArray<ItemType>(callback: (index: number) => ItemType, length?: number): ItemType[];

/**
 * Creates a new array where each element is the result of the provided callback.
 *
 * If the callback returns at least one Promise, the entire result will be wrapped
 * in a `Promise` and resolved with `Promise.all`. Otherwise, a plain array is returned.
 *
 * @category Array Helpers
 *
 * @template ItemType - The return type of the callback (awaited if any items are a Promise) that becomes the type of the array items.
 *
 * @param callback - A function invoked with the current index. May return a value or a Promise.
 * @param length - The desired length of the resulting array.
 *
 * @returns An array of the callback results, or a Promise resolving to one if the callback is async.
 */
function fillArray<ItemType>(
  callback: (index: number) => ItemType | Promise<ItemType>,
  length: number = 1,
): ItemType[] | Promise<ItemType[]> {
  const outputArray = new Array(length).fill(null).map((_, index) => {
    return callback(index);
  });

  const isAsync = outputArray.some((item) => {
    return item instanceof Promise;
  });
  if (isAsync) {
    return Promise.all(outputArray);
  }

  return outputArray as ItemType[];
}

export default fillArray;
