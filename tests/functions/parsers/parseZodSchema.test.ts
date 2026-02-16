import { describe, expect, test } from "vitest";
import z from "zod";

import { parseZodSchema } from "src/root/functions";
import { DataError } from "src/root/types";

describe("parseZodSchema", () => {
  test("Returns the data if data is valid according to Zod schema", () => {
    expect(parseZodSchema(z.string(), "Hello")).toBe("Hello");
  });
  test("Throws a DataError if Zod schema is invalid", () => {
    try {
      parseZodSchema(z.string(), 1);
    } catch (error) {
      if (DataError.check(error)) {
        expect(error.data.input).toBe(1);
        expect(error.code).toBe("INVALID_TYPE");
      } else {
        throw error;
      }
    }
  });
  test("Takes an optional error argument to allow us to customise the error", () => {
    try {
      parseZodSchema(z.string(), 1, new DataError({ input: 1 }, "TEST_CODE", "Test message"));
      throw new Error("DID_NOT_THROW");
    } catch (error) {
      if (DataError.check(error)) {
        expect(error.data.input).toBe(1);
        expect(error.code).toBe("TEST_CODE");
        expect(error.message).toBe("Test message");
      } else {
        throw error;
      }
    }
  });
  test("The error argument may be a function that accepts a zodError, and returns the error", () => {
    try {
      const input = { hello: 1 };
      parseZodSchema(z.object({ hello: z.string() }), input, (zodError) => {
        // eslint-disable-next-line @alextheman/standardise-error-messages
        return new Error(zodError.issues[0].code.toUpperCase());
      });
      throw new Error("DID_NOT_THROW");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("INVALID_TYPE");
      } else {
        throw error;
      }
    }
  });
  test("The error function can return nothing", () => {
    let wasCalled = false;
    try {
      expect(wasCalled).toBe(false);
      parseZodSchema(z.string(), 1, () => {
        wasCalled = true;
      });
      throw new Error("DID_NOT_THROW");
    } catch (error) {
      expect(wasCalled).toBe(true);
      if (DataError.check(error)) {
        expect(error.data.input).toBe(1);
        expect(error.code).toBe("INVALID_TYPE");
      }
    }
  });
  test("If multiple Zod errors found, the error code should be a comma-separated string list sorted by frequency", () => {
    const input = {
      hello: 1,
      shouldBeNumber: "But is not",
      extraProperty: "hi",
    };
    try {
      parseZodSchema(
        z.strictObject({
          hello: z.string(),
          shouldBeNumber: z.number(),
        }),
        input,
      );
    } catch (error) {
      if (error instanceof DataError) {
        expect(error.data.input).toEqual(input);
        expect(error.code).toBe("INVALID_TYPE×2,UNRECOGNIZED_KEYS×1");
      }
    }
  });
});
