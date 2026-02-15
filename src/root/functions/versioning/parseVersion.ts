/* eslint-disable @typescript-eslint/no-deprecated */
import { VERSION_NUMBER_REGEX } from "src/root/constants";
import { DataError } from "src/root/types";

export interface ParseVersionOptions {
  /** Whether to omit the `v` prefix from the output version or not. */
  omitPrefix?: boolean;
}

/**
 * Parses a string and verifies it is a valid package version number.
 *
 * Valid formats: `X.Y.Z` or `vX.Y.Z`, where X, Y, and Z are non-negative integers.
 *
 * @deprecated This function does not support the new class-based handling of VersionNumber. Please use `new VersionNumber(input)` instead.
 *
 * @param input - The version string to parse.
 * @param options - Extra options to apply.
 *
 * @throws {DataError} If the input is not a valid version number.
 *
 * @returns The validated version number, prefixed with `v` if it was not already.
 */
function parseVersion(input: string, options?: ParseVersionOptions): string {
  if (!RegExp(VERSION_NUMBER_REGEX).test(input)) {
    throw new DataError(
      input,
      "INVALID_VERSION",
      `"${input}" is not a valid version number. Version numbers must be of the format "X.Y.Z" or "vX.Y.Z", where X, Y, and Z are non-negative integers.`,
    );
  }
  if (options?.omitPrefix) {
    return input.startsWith("v") ? input.slice(1) : input;
  }
  return input.startsWith("v") ? input : `v${input}`;
}

export default parseVersion;
