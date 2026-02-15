/* eslint-disable @typescript-eslint/no-deprecated */
import type { VersionType } from "src/root/functions/parsers";

import getIndividualVersionNumbers from "src/root/functions/versioning/getIndividualVersionNumbers";

/**
 * Determines whether the given version is a major, minor, or patch version.
 *
 * @deprecated This function does not support the new class-based handling of VersionNumber. Please use `new VersionNumber(version).type` instead.
 *
 * @param version - The version number.
 *
 * @returns Either `"major"`, `"minor"`, or `"patch"`, depending on the version type.
 */
function determineVersionType(version: string): VersionType {
  const [_major, minor, patch] = getIndividualVersionNumbers(version);

  if (minor === 0 && patch === 0) {
    return "major";
  }
  if (patch === 0) {
    return "minor";
  }
  return "patch";
}

export default determineVersionType;
