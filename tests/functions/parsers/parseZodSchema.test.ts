import { describe, expect, test } from "vitest";
import z from "zod";

import { az, parseZodSchema } from "src/root/zod";
import { DataError } from "src/v6";

describe("az.with().parse()", () => {
  test("Returns the data if data is valid according to Zod schema", () => {
    expect(az.with(z.string()).parse("Hello")).toBe("Hello");
  });
  test("Throws a DataError if Zod schema is invalid", () => {
    const error = DataError.expectError(() => {
      az.with(z.string()).parse(1);
    });

    expect(error.data.input).toBe(1);
    expect(error.code).toBe("INVALID_TYPE");
  });
  test("Takes an optional error argument to allow us to customise the error", () => {
    const error = DataError.expectError(() => {
      az.with(z.string()).parse(1, new DataError({ input: 1 }, "TEST_CODE", "Test message"));
    });

    expect(error.data.input).toBe(1);
    expect(error.code).toBe("TEST_CODE");
    expect(error.message).toBe("Test message");
  });
  test("The error argument may be a function that accepts a zodError, and returns the error", () => {
    // Must use the old pattern as it throws a regular error.
    try {
      const input = { hello: 1 };
      az.with(z.object({ hello: z.string() })).parse(input, (zodError) => {
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
  test("The error function can return nothing but still gets run if an error is expected", () => {
    let wasCalled = false;
    const error = DataError.expectError(() => {
      az.with(z.string()).parse(1, () => {
        wasCalled = true;
      });
    });

    expect(wasCalled).toBe(true);
    expect(error.data.input).toBe(1);
    expect(error.code).toBe("INVALID_TYPE");
  });
  test("The error function must not be run if parsing was successful", () => {
    let wasCalled = false;
    const result = az.with(z.string()).parse("hello", () => {
      wasCalled = true;
    });

    expect(wasCalled).toBe(false);
    expect(result).toBe("hello");
  });
  test("If multiple Zod errors found, the error code should be a comma-separated string list sorted by frequency", () => {
    const input = {
      hello: 1,
      shouldBeNumber: "But is not",
      extraProperty: "hi",
    };
    const error = DataError.expectError(() => {
      parseZodSchema(
        z.strictObject({
          hello: z.string(),
          shouldBeNumber: z.number(),
        }),
        input,
      );
    });

    expect(error.data.input).toEqual(input);
    expect(error.code).toBe("INVALID_TYPE×2,UNRECOGNIZED_KEYS×1");
  });
});
