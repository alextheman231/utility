/**
 * Options to apply to the conversion from camelCase to kebab-case
 *
 * @category Function Options
 */
export interface CamelToKebabOptions {
  /** Whether to leave consecutive capitals alone in the conversion or not (e.g. `validateAPIUser` becomes `validate-a-p-i-user` if `false`, and `validate-api-user` if `true`) */
  preserveConsecutiveCapitals?: boolean;
}

/**
 * Converts a string from camelCase to kebab-case
 *
 * @category String Helpers
 *
 * @param string - The string to convert.
 * @param options - Options to apply to the conversion.
 *
 * @returns The string converted to kebab-case.
 */
function camelToKebab(
  string: string,
  options: CamelToKebabOptions = { preserveConsecutiveCapitals: true },
): string {
  let result = "";
  let outerIndex = 0;

  while (outerIndex < string.length) {
    const character = string[outerIndex];
    const isUpper = /[A-Z]/.test(character);

    if (isUpper) {
      let innerIndex = outerIndex + 1;
      while (
        innerIndex < string.length &&
        /[A-Z]/.test(string[innerIndex]) &&
        (options.preserveConsecutiveCapitals
          ? innerIndex + 1 < string.length && /[a-z]/.test(string[innerIndex + 1])
            ? false
            : true
          : true)
      ) {
        innerIndex++;
      }

      const sequenceOfCapitals = string.slice(outerIndex, innerIndex);

      if (options.preserveConsecutiveCapitals) {
        if (result) {
          result += "-";
        }
        result += sequenceOfCapitals.toLowerCase();
      } else {
        if (result) {
          result += "-";
        }
        result += sequenceOfCapitals
          .split("")
          .map((character) => {
            return character.toLowerCase();
          })
          .join("-");
      }

      outerIndex = innerIndex;
    } else {
      result += character;
      outerIndex++;
    }
  }

  return result;
}

export default camelToKebab;
