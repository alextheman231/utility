import type { CreateEnumType } from "src/root/types";

import { z } from "zod";

import { az } from "src/root/zod";
import { DataError } from "src/v6";

/**
 * Represents the three common development environments.
 *
 * @category Types
 */
export const Env = {
  TEST: "test",
  DEVELOPMENT: "development",
  PRODUCTION: "production",
} as const;

export type Env = CreateEnumType<typeof Env>;

/**
 * Parses the input and verifies it matches one of the environments allowed by the Env types ("test" | "development" | "production").
 *
 * @category Parsers
 *
 * @param input - The data to parse.
 *
 * @throws {DataError} If the data does not match one of the environments allowed by the Env types ("test" | "development" | "production").
 *
 * @returns The specified environment if allowed.
 */
function parseEnv(input: unknown): Env {
  return az
    .with(z.enum(Env))
    .parse(
      input,
      new DataError(
        { input },
        "INVALID_ENV",
        "The provided environment type must be one of `test | development | production`",
      ),
    );
}

export default parseEnv;
