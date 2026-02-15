/**
 * Options to apply to the conversion of a string list to an array.
 *
 * @category Function Options
 */
export interface StringListToArrayOptions {
  /** What each item in the list is separated by. */
  separator?: string;
  /** An option to trim any extra whitespace. */
  trimWhitespace?: boolean;
}

/**
 * Converts a stringly-typed list to a proper array.
 *
 * @category Miscellaneous
 *
 * @param stringList - The stringly-typed list to convert.
 * @param options - The options to apply to the conversion.
 * @param options.separator - What each item in the list is separated by.
 * @param options.trimWhitespace - An option to trim any extra whitespace.
 *
 * @returns A new array with each item being an item from the given list.
 */
function stringListToArray(
  stringList: string,
  { separator = ",", trimWhitespace = true }: StringListToArrayOptions = {},
): string[] {
  if (trimWhitespace && stringList.trim() === "") {
    return [];
  }

  const arrayList = stringList.split(separator ?? "");

  return trimWhitespace
    ? arrayList.map((item) => {
        return item.trim();
      })
    : arrayList;
}

export default stringListToArray;
