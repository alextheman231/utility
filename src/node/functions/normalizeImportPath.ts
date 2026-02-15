import path from "node:path";

/**
 * Normalizes an import path meant for use in an import statement in JavaScript.
 * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used. If the path is a zero-length string, '.' is returned, representing the current working directory.
 *
 * If the path starts with ./, it is preserved (unlike what would happen with path.posix.normalize() normally).
 *
 * Helpful for custom linter rules that need to check (or fix) import paths.
 *
 * @category String Helpers
 *
 * @param importPath - The import path to normalize.
 *
 * @returns The import path normalized.
 */
function normalizeImportPath(importPath: string): string {
  const normalizedPath = path.posix.normalize(importPath);
  if (importPath.startsWith("./") && !normalizedPath.startsWith("./")) {
    return `./${normalizedPath}`;
  }
  return normalizedPath;
}

/**
 * Normalises an import path meant for use in an import statement in JavaScript.
 * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used. If the path is a zero-length string, '.' is returned, representing the current working directory.
 *
 * If the path starts with ./, it is preserved (unlike what would happen with path.posix.normalize() normally).
 *
 * Helpful for custom linter rules that need to check (or fix) import paths.
 *
 * @category String Helpers
 *
 * @param importPath - The import path to normalise.
 *
 * @returns The import path normalised.
 */
export const normaliseImportPath = normalizeImportPath;

export default normalizeImportPath;
