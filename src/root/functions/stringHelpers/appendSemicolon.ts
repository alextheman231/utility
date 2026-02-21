import { DataError } from "src/root/types";

/**
 * Appends a semicolon to the end of a string, trimming where necessary first.
 *
 * @category String Helpers
 *
 * @param stringToAppendTo - The string to append a semicolon to.
 *
 * @throws {DataError} If the string contains multiple lines.
 *
 * @returns A string with the semicolon appended.
 */
function appendSemicolon(stringToAppendTo: string): string {
  if (stringToAppendTo.includes("\n")) {
    throw new DataError(
      { stringToAppendTo },
      "MULTIPLE_LINE_ERROR",
      "Cannot append semicolon to multi-line string.",
    );
  }
  const stringWithNoTrailingWhitespace = stringToAppendTo.trimEnd();
  if (stringWithNoTrailingWhitespace === "") {
    return "";
  }
  return stringWithNoTrailingWhitespace[stringWithNoTrailingWhitespace.length - 1] === ";"
    ? stringWithNoTrailingWhitespace
    : `${stringWithNoTrailingWhitespace};`;
}

export default appendSemicolon;
