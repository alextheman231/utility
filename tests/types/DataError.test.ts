import { describe, expect, expectTypeOf, test } from "vitest";

import { DataError } from "src/root/types";

function testDataError(
  error: DataError,
  expectedData: unknown,
  expectedCode: string,
  expectedMessage: string,
) {
  try {
    throw error;
  } catch (error) {
    if (error instanceof DataError) {
      expect(error.message).toBe(expectedMessage);
      if (typeof error.data === "object") {
        expect(error.data).toEqual(expectedData);
      } else {
        expect(error.data).toBe(expectedData);
      }
      expect(error.code).toBe(expectedCode);
      expect(error.name).toBe("DataError");
      expect(error.stack).toBeDefined();
    } else {
      throw error;
    }
  }
}

describe("DataError", () => {
  test("Takes an error with the given data", () => {
    testDataError(
      new DataError({ testData: "Hello" }, "NOT_VALID", "This is not valid"),
      { testData: "Hello" },
      "NOT_VALID",
      "This is not valid",
    );
  });
  test("Provides sensible default message and code", () => {
    testDataError(
      new DataError({ testData: "Hello" }),
      { testData: "Hello" },
      "INVALID_DATA",
      "The data provided is invalid",
    );
  });
});

describe("DataError.check()", () => {
  test("Returns true if given an actual instance of DataError", () => {
    try {
      throw new DataError({ hello: "world" });
    } catch (error) {
      expect(DataError.check(error)).toBe(true);
    }
  });
  test("The error type is narrowed down after checking", () => {
    try {
      throw new DataError({ httpErrorCode: 404 });
    } catch (error) {
      if (DataError.check(error)) {
        expectTypeOf(error).toEqualTypeOf<DataError>();
      }
    }
  });
  test("Returns true for any object with a code, data, message", () => {
    expect(
      DataError.check({ code: "INVALID_DATA", message: "Invalid data", data: { invalid: "data" } }),
    ).toBe(true);
  });
  test("Returns false for a generic JavaScript error", () => {
    try {
      throw new Error("SHOULD_BE_FALSE");
    } catch (error) {
      expect(DataError.check(error)).toBe(false);
    }
  });
  test("The error type does not resolve to be APIError if the check is false", () => {
    try {
      throw new Error("SHOULD_BE_FALSE");
    } catch (error) {
      if (!DataError.check(error)) {
        expectTypeOf(error).not.toEqualTypeOf<DataError>();
      }
    }
  });
  test("Returns false for any object without data", () => {
    expect(DataError.check({ code: "INVALID_DATA", message: "Invalid data" })).toBe(false);
  });
  test("Returns false if data is provided, but not code or message", () => {
    expect(DataError.check({ data: { invalid: "data" } })).toBe(false);
    expect(DataError.check({ message: "SHOULD_BE_FALSE" })).toBe(false);
  });
  test("Returns false if code or message is not a string", () => {
    expect(DataError.check({ code: 1, message: 2 })).toBe(false);
  });
});
