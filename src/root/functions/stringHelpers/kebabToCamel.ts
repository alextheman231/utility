import parseIntStrict from "src/root/functions/parsers/parseIntStrict";
import { DataError } from "src/root/types";

/**
 * Options to apply to the conversion from kebab-case to camelCase
 *
 * @category Function Options
 */
export interface KebabToCamelOptions {
  /** Whether or not the converted string should start with an uppercase (e.g. CamelCase instead of camelCase). */
  startWithUpper?: boolean;
}

/**
 * Converts a string from kebab-case to camelCase
 *
 * @category String Helpers
 *
 * @param input - The string to convert.
 * @param options - Options to apply to the conversion.
 *
 * @returns The string converted to camelCase.
 */
function kebabToCamel(input: string, options?: KebabToCamelOptions): string {
  if (input !== input.toLowerCase()) {
    throw new DataError({ input }, "UPPERCASE_INPUT", "Kebab-case must be purely lowercase.");
  }
  if (input.startsWith("-") || input.endsWith("-")) {
    throw new DataError(
      { input },
      "TRAILING_DASHES",
      "Dashes at the start and/or end are not allowed.",
    );
  }
  if (input.includes("--")) {
    throw new DataError({ input }, "CONSECUTIVE_DASHES", "Consecutive dashes are not allowed.");
  }

  let outputString = "";
  let skip = false;
  for (const stringIndex in [...input]) {
    if (skip) {
      skip = false;
      continue;
    }
    const index = parseIntStrict(stringIndex);
    if (index === 0 && options?.startWithUpper) {
      outputString += input[index].toUpperCase();
      continue;
    }

    if (index === input.length - 1) {
      outputString += input[index];
      break;
    }

    if (input[index] === "-" && /^[a-zA-Z]+$/.test(input[index + 1])) {
      outputString += input[index + 1].toUpperCase();
      skip = true;
    } else {
      outputString += input[index];
    }
  }
  return outputString;
}

export default kebabToCamel;
