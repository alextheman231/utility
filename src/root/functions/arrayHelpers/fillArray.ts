import range from "src/root/functions/arrayHelpers/range";

export interface FillArrayAsyncOptions {
  /** Resolve each array item sequentially rather than in parallel (defaults to parallel). */
  sequential?: boolean;
}

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
 * @param options - Extra options to apply.
 *
 * @returns A Promise resolving to an array of the callback results.
 */
function fillArray<ItemType>(
  callback: (index: number) => Promise<ItemType>,
  length?: number,
  options?: FillArrayAsyncOptions,
): Promise<Array<ItemType>>;

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
function fillArray<ItemType>(
  callback: (index: number) => ItemType,
  length?: number,
): Array<ItemType>;

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
 * @param options - Extra options to apply if any item is asynchronous.
 *
 * @returns An array of the callback results, or a Promise resolving to one if the callback is async.
 */
function fillArray<ItemType>(
  callback: (index: number) => ItemType | Promise<ItemType>,
  length: number = 1,
  options?: FillArrayAsyncOptions,
): Array<ItemType> | Promise<Array<ItemType>> {
  if (options?.sequential) {
    return (async () => {
      const resolvedArray: Array<ItemType> = [];
      for (const index of range(0, length)) {
        resolvedArray.push(await callback(index));
      }
      return resolvedArray;
    })();
  }

  const outputArray = new Array(length).fill(null).map((_, index) => {
    return callback(index);
  });

  const isAsync = outputArray.some((item) => {
    return (
      item instanceof Promise ||
      (typeof item === "object" &&
        item !== null &&
        "then" in item &&
        typeof item.then === "function")
    );
  });
  if (isAsync) {
    return Promise.all(outputArray);
  }

  return outputArray as Array<ItemType>;
}

export default fillArray;
