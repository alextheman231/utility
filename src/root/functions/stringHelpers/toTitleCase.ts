import { removeDuplicates } from "src/root/functions/arrayHelpers";

export interface ToTitleCaseOptions {
  /**
   * An array of words to keep as is in the title.
   *
   * Note that the comparison is case insensitive, and if a match is found it will use the casing as found in the options.
   */
  preserveWords?: Array<string>;
}

/**
 * Converts a string to a human-readable Title Case string.
 *
 * Words are split on spaces, underscores, and hyphens. Every first letter of each word is capitalised except for words specified in `options.preserveWords`.
 *
 * The comparison for preserved words is case-insensitive, but the original casing provided in `preserveWords` is retained in the output.
 *
 * @param input - The string to convert.
 * @param options - Additional options to apply.
 *
 * @returns A new string, converted into Title Case.
 */
function toTitleCase(input: string, options?: ToTitleCaseOptions): string {
  const preservedWords = removeDuplicates(
    options?.preserveWords?.map((word) => {
      return { normalised: word.toLowerCase(), original: word };
    }) ?? [],
  );

  return input
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((word) => {
      for (const preservedWord of preservedWords) {
        if (preservedWord.normalised === word.toLowerCase()) {
          return preservedWord.original;
        }
      }
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export default toTitleCase;
