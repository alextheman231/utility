import type { Env } from "src/root/functions/parsers/parseEnv";

import { describe, expect, test } from "vitest";

import parseEnv from "src/root/functions/parsers/parseEnv";
import { DataError } from "src/root/types";

describe("parseEnv", () => {
  test("Is successful when input is a valid environment", () => {
    const testInput: Env = "test";
    expect(parseEnv(testInput)).toBe("test");

    const developmentInput: Env = "development";
    expect(parseEnv(developmentInput)).toBe("development");

    const productionInput: Env = "production";
    expect(parseEnv(productionInput)).toBe("production");
  });
  test("Throws an error when input is not a valid environment", () => {
    try {
      parseEnv("Invalid env");
      throw new Error("DID_NOT_THROW");
    } catch (error: unknown) {
      if (error instanceof DataError) {
        expect(error.data).toBe("Invalid env");
        expect(error.code).toBe("INVALID_ENV");
        expect(error.message).toBe(
          "The provided environment type must be one of `test | development | production`",
        );
      } else {
        throw error;
      }
    }
  });
});
