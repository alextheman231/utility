import { DataError } from "src/root/types";

/**
 * Converts a string to an integer and throws an error if it cannot be converted.
 *
 * @category Parsers
 *
 * @param string - A string to convert into a number.
 * @param radix - A value between 2 and 36 that specifies the base of the number in string. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal.
 *
 * @throws {DataError} If the provided string cannot safely be converted to an integer.
 *
 * @returns The integer parsed from the input string.
 */
function parseIntStrict(string: string, radix?: number): number {
  const trimmedString = string.trim();
  const maxAllowedAlphabeticalCharacter =
    radix && radix > 10 && radix <= 36 ? String.fromCharCode(87 + radix - 1) : undefined;
  const pattern: RegExp =
    radix && radix > 10 && radix <= 36
      ? new RegExp(`^[+-]?[0-9a-${maxAllowedAlphabeticalCharacter}]+$`, "i")
      : /^[+-]?\d+$/;

  if (!pattern.test(trimmedString)) {
    throw new DataError(
      radix ? { string, radix } : { string },
      "INTEGER_PARSING_ERROR",
      `Only numeric values${radix && radix > 10 && radix <= 36 ? ` or character${radix !== 11 ? "s" : ""} A${radix !== 11 ? `-${maxAllowedAlphabeticalCharacter?.toUpperCase()} ` : " "}` : " "}are allowed.`,
    );
  }

  if (
    radix &&
    radix < 10 &&
    [...trimmedString].some((character) => {
      return parseInt(character) >= radix;
    })
  ) {
    throw new DataError(
      { string, radix },
      "INTEGER_PARSING_ERROR",
      "Value contains one or more digits outside of the range of the given radix.",
    );
  }

  const parseIntResult = parseInt(trimmedString, radix);
  if (isNaN(parseIntResult)) {
    throw new DataError({ string }, "INTEGER_PARSING_ERROR", "Value is not a valid integer.");
  }

  return parseIntResult;
}

export default parseIntStrict;
