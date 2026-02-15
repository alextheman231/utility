import type { CreateEnumType } from "src/root/types";

import { z } from "zod";

import parseZodSchema from "src/root/functions/parsers/zod/parseZodSchema";
import { DataError } from "src/root/types";

/**
 * Represents the three common development environments.
 *
 * @category Types
 */
export const Env = {
  TEST: "test",
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Env = CreateEnumType<typeof Env>;

/**
 * Parses the input and verifies it matches one of the environments allowed by the Env types ("test" | "development" | "production").
 *
 * @category Parsers
 *
 * @param data - The data to parse.
 *
 * @throws {DataError} If the data does not match one of the environments allowed by the Env types ("test" | "development" | "production").
 *
 * @returns The specified environment if allowed.
 */
function parseEnv(data: unknown): Env {
  return parseZodSchema(
    z.enum(Env),
    data,
    new DataError(
      data,
      "INVALID_ENV",
      "The provided environment type must be one of `test | development | production`",
    ),
  );
}

export default parseEnv;
