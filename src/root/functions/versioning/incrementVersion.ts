/* eslint-disable @typescript-eslint/no-deprecated */

import type { VersionType } from "src/root/functions/parsers";

import getIndividualVersionNumbers from "src/root/functions/versioning/getIndividualVersionNumbers";
import parseVersion from "src/root/functions/versioning/parseVersion";

export interface IncrementVersionOptions {
  /** Whether to omit the `v` prefix from the output version or not. */
  omitPrefix?: boolean;
}

/**
 * Increments the given input version depending on the given increment type.
 *
 * @deprecated This function does not support the new class-based handling of VersionNumber. Please use `new VersionNumber(version).increment(incrementType)` instead.
 *
 * @param version - The version to increment
 * @param incrementType - The type of increment. Can be one of the following:
 * - `"major"`: Change the major version `v1.2.3` → `v2.0.0`
 * - `"minor"`: Change the minor version `v1.2.3` → `v1.3.0`
 * - `"patch"`: Change the patch version `v1.2.3` → `v1.2.4`
 * @param options - Extra options to apply.
 *
 * @returns A new string representing the version with the increment applied.
 */
function incrementVersion(
  version: string,
  incrementType: VersionType,
  options?: IncrementVersionOptions,
): string {
  const [major, minor, patch] = getIndividualVersionNumbers(version);

  const newVersion = {
    major: `${major + 1}.0.0`,
    minor: `${major}.${minor + 1}.0`,
    patch: `${major}.${minor}.${patch + 1}`,
  }[incrementType];

  return parseVersion(newVersion, { omitPrefix: options?.omitPrefix });
}

export default incrementVersion;
