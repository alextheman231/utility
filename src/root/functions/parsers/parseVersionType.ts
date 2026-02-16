import type { CreateEnumType } from "src/root/types";

import z from "zod";

import parseZodSchema from "src/root/functions/parsers/zod/parseZodSchema";
import { DataError } from "src/root/types";

/**
 * Represents the three common software version types.
 *
 * @category Types
 */
export const VersionType = {
  MAJOR: "major",
  MINOR: "minor",
  PATCH: "patch",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type VersionType = CreateEnumType<typeof VersionType>;

/**
 * Parses the input and verifies it is a valid software version type (i.e. `"major" | "minor" | "patch"`)
 *
 * @category Parsers
 *
 * @param input - The data to parse.
 *
 * @throws {DataError} If the data does not match one of the allowed version types (`"major" | "minor" | "patch"`).
 *
 * @returns The given version type if allowed.
 */
function parseVersionType(input: unknown): VersionType {
  return parseZodSchema(
    z.enum(VersionType),
    input,
    new DataError(
      { input },
      "INVALID_VERSION_TYPE",
      "The provided version type must be one of `major | minor | patch`",
    ),
  );
}

export default parseVersionType;
