type Callback<ArgsType extends ReadonlyArray<unknown>, ResolvedType> = (
  ...args: ArgsType
) => Promise<ResolvedType>;

/**
 * Memoizes the Promise returned by an asynchronous callback.
 *
 * Note that the callback is invoked at most once. Arguments supplied to subsequent calls are ignored because the Promise from the first invocation is always returned.
 *
 * @template ArgsType - The type of the function arguments.
 * @template ResolvedType - The type of the Promise when resolved.
 *
 * @param callback - The function to memoize.
 *
 * @returns A callback with the Promise memoized. Multiple calls of this function should always point to the same Promise.
 */
function memoizeAsync<ArgsType extends ReadonlyArray<unknown>, ResolvedType>(
  callback: Callback<ArgsType, ResolvedType>,
): Callback<ArgsType, ResolvedType> {
  let promise: Promise<ResolvedType> | undefined;

  return (...args: ArgsType) => {
    promise ??= callback(...args);
    return promise;
  };
}

export default memoizeAsync;
