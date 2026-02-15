/* eslint-disable @typescript-eslint/no-deprecated */
import { parseIntStrict } from "src/root/functions/parsers";
import parseVersion from "src/root/functions/versioning/parseVersion";

/**
 * Gets the individual version numbers from a given version number as a tuple of numbers.
 *
 * @deprecated This function does not support the new class-based handling of VersionNumber. Please use one of the following instead:
 *      ```typescript
 *      new VersionNumber(version).major
 *      new VersionNumber(version).minor
 *      new VersionNumber(version).patch
 *      ```
 *
 * @param version - The version number.
 *
 * @returns A tuple of three numbers indicating `[major, minor, patch]`.
 */
function getIndividualVersionNumbers(version: string): [number, number, number] {
  const parsedVersion = parseVersion(version, { omitPrefix: true });

  return parsedVersion.split(".").map((versionNumber) => {
    return parseIntStrict(versionNumber);
  }) as [number, number, number];
}

export default getIndividualVersionNumbers;
