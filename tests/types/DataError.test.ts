import { describe, expect, expectTypeOf, test } from "vitest";

import { DataError } from "src/root/types";

describe("DataError", () => {
  test("Takes an error with the given data", () => {
    const error = DataError.expectError(() => {
      throw new DataError({ testData: "Hello" }, "NOT_VALID", "This is not valid");
    });
    expect(error.data).toEqual({ testData: "Hello" });
    expect(error.code).toBe("NOT_VALID");
    expect(error.message).toBe("This is not valid");
  });
  test("Provides sensible default message and code", () => {
    const error = DataError.expectError(() => {
      throw new DataError({ testData: "Hello" });
    });
    expect(error.code).toBe("INVALID_DATA");
    expect(error.message).toBe("The data provided is invalid");
  });
});

describe("DataError.check()", () => {
  test("Returns true if given an actual instance of DataError", () => {
    const error = DataError.expectError(() => {
      throw new DataError({ hello: "world" });
    });
    expect(DataError.check(error)).toBe(true);
  });
  test("The error type is narrowed down after checking", () => {
    try {
      throw new DataError({ httpErrorCode: 404 });
    } catch (error) {
      if (DataError.check(error)) {
        expectTypeOf(error).toEqualTypeOf<DataError>();
      } else {
        throw error;
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
  test("The error type does not resolve to be DataError if the check is false", () => {
    try {
      throw new Error("SHOULD_BE_FALSE");
    } catch (error) {
      if (!DataError.check(error)) {
        expectTypeOf(error).not.toEqualTypeOf<DataError>();
      } else {
        throw error;
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

describe("DataError.expectError()", () => {
  test("Returns the DataError if the provided function threw one", () => {
    const error = DataError.expectError(() => {
      throw new DataError({ input: "Test data" }, "TEST_ERROR", "This is a test error");
    });
    expect(error.data.input).toBe("Test data");
    expect(error.code).toBe("TEST_ERROR");
    expect(error.message).toBe("This is a test error");
  });
  test("Re-throws on any other error", () => {
    try {
      DataError.expectError(() => {
        throw new Error("Not a DataError");
      });
      throw new ReferenceError("Not the expected error");
    } catch (error) {
      expect(DataError.check(error)).toBe(false);
      if (error instanceof Error) {
        expect(error.message).toBe("Not a DataError");
      } else {
        throw error;
      }
    }
  });
  test("Throws a default Error if no error was thrown at all", () => {
    try {
      DataError.expectError(() => {
        return "This is fine!";
      });
      throw new Error("Test failed because error was not thrown");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Expected a DataError to be thrown but none was thrown");
      } else {
        throw error;
      }
    }
  });
  test("Can assert against an error code", () => {
    const testDataError = new DataError({ input: "Test" }, "INVALID_CODE");
    try {
      DataError.expectError(
        () => {
          throw testDataError;
        },
        { expectedCode: "VALID_CODE" },
      );
      throw new Error("No thrown error");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain("Expected: VALID_CODE");
        expect(error.message).toContain("Received: INVALID_CODE");
      } else {
        throw error;
      }
    }
  });
});
