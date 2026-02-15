import type { DotenvParseOutput } from "dotenv";

import type { RecordKey } from "src/root/types";

import { DataError } from "src/root/types";

export type QuoteStyle = "double" | "single" | "none";

export interface StringifyDotenvOptions {
  /** The quote style to use for the values (defaults to `"double"`) */
  quoteStyle: QuoteStyle;
}

/**
 * Converts an object into a string in .env file format.
 *
 * @param contents - The object to convert. Must be a record whose values are strings.
 * @param options - Extra options to apply.
 *
 * @returns A string representation of the object in .env file format.
 */
function stringifyDotenv(
  contents: Record<RecordKey, string> | DotenvParseOutput,
  options?: StringifyDotenvOptions,
): string {
  const { ...contentsCopy } = contents;
  const { quoteStyle = "double" } = options ?? {};

  let result = "";

  for (const key in contentsCopy) {
    if (/[ \t\r\n]/.test(key)) {
      throw new DataError(
        { [key]: contentsCopy[key] },
        "INVALID_KEY",
        "Environment variables are not allowed to have whitespace.",
      );
    }
    if (quoteStyle === "none") {
      if (
        /[ \t\r\n]/.test(contentsCopy[key]) ||
        contentsCopy[key].includes("#") ||
        contentsCopy[key].includes("=") ||
        contentsCopy[key].includes("\\")
      ) {
        throw new DataError(
          { [key]: contentsCopy[key] },
          "INCOMPATIBLE_QUOTE_STYLE",
          'Cannot use `{ quoteStyle: "none" }` when value has whitespace, #, =, or \\',
        );
      } else {
        result += `${key}=${contentsCopy[key]}\n`;
        continue;
      }
    }

    const rawValue = contentsCopy[key].replace(/\r?\n/g, String.raw`\n`);

    const chosenQuoteCharacter = {
      double: '"',
      single: "'",
    }[quoteStyle];
    const otherQuoteCharacter = {
      double: "'",
      single: '"',
    }[quoteStyle];

    const finalQuoteCharacter = /[\r\n]/.test(contentsCopy[key])
      ? `"`
      : rawValue.includes(chosenQuoteCharacter)
        ? otherQuoteCharacter
        : chosenQuoteCharacter;

    result += `${key}=${finalQuoteCharacter}${rawValue}${finalQuoteCharacter}\n`;
  }

  return result;
}

export default stringifyDotenv;
