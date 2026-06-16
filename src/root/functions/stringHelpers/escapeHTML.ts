/**
 * Escapes a raw HTML string so it can be safely used in HTML templates.
 *
 * @param rawString - The raw string to escape
 *
 * @returns A new string, with the contents of the original string but with HTML characters safely encoded.
 */
function escapeHTML(rawString: string): string {
  return rawString
    .replaceAll(/&/g, "&amp;")
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#39;");
}

export default escapeHTML;
