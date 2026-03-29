/**
 * A function to properly handle escape sequences in a Regex pattern string, so it can be safely used with the `RegExp` constructor.
 *
 * @param regexPattern - The Regex pattern to escape.
 *
 * @returns A new string with escape sequences properly handled.
 */
function escapeRegexPattern(regexPattern: string): string {
  return regexPattern.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
}

export default escapeRegexPattern;
