import path from "node:path";

import { FILE_PATH_REGEX } from "src/root/constants";
import { DataError } from "src/root/types";

export interface FilePathData {
  /** The file path without the final part. */
  directory: string;
  /** The final part of the file path. */
  base: string;
  /** The full file path, normalised. */
  fullPath: string;
}

/**
 * Takes a file path string and parses it into the directory part, the base part, and the full path.
 *
 * @category Parsers
 *
 * @param filePath - The file path to parse.
 *
 * @throws {DataError} If the file path is invalid.
 *
 * @returns An object representing the different ways the file path can be represented.
 */
function parseFilePath(filePath: string): FilePathData {
  const caughtGroups = filePath.match(RegExp(FILE_PATH_REGEX));

  if (!caughtGroups) {
    if (!(filePath.includes("/") || filePath.includes("\\")) && filePath.includes(".")) {
      return { directory: "", base: filePath, fullPath: filePath };
    }
    throw new DataError(
      { filePath },
      "INVALID_FILE_PATH",
      "The file path you provided is not valid.",
    );
  }

  if (!caughtGroups.groups) {
    throw new DataError(
      { filePath },
      "PARSING_ERROR",
      "An error occurred while trying to parse the data.",
    );
  }

  return {
    directory: caughtGroups.groups.directory,
    base: caughtGroups.groups.base,
    fullPath: path.join(
      caughtGroups.groups.directory.replaceAll("\\", "/"),
      caughtGroups.groups.base,
    ),
  };
}

export default parseFilePath;
