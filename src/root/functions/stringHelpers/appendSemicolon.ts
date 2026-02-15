/**
 * Appends a semicolon to the end of a string, trimming where necessary first.
 *
 * @category String Helpers
 *
 * @param stringToAppendTo - The string to append a semicolon to.
 *
 * @throws {Error} If the string contains multiple lines.
 *
 * @returns A string with the semicolon appended.
 */
function appendSemicolon(stringToAppendTo: string): string {
  if (stringToAppendTo.includes("\n")) {
    throw new Error("MULTIPLE_LINE_ERROR");
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
