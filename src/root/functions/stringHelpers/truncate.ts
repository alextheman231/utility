/**
 * Truncates a string and appends `...` to the end of it
 *
 * @category String Helpers
 *
 * @param stringToTruncate - The string to truncate.
 * @param maxLength - The length at which to start truncating. Note that this does not include the `...` part that would be appended.
 *
 * @returns A new string that has been truncated based on the length provided.
 */
function truncate(stringToTruncate: string, maxLength: number = 5): string {
  return stringToTruncate.length > maxLength
    ? `${stringToTruncate.slice(0, maxLength)}...`
    : stringToTruncate;
}

export default truncate;
