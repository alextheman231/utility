import { describe, expect, expectTypeOf, test } from "vitest";

import { CodeError } from "src/v6";

describe("CodeError", () => {
  test("Takes an error with the given data", () => {
    const error = CodeError.expectError(() => {
      throw new CodeError("NOT_VALID", "This is not valid");
    });

    expect(error.code).toBe("NOT_VALID");
    expect(error.message).toBe("This is not valid");
  });
  test("Provides sensible default message", () => {
    const error = CodeError.expectError(() => {
      throw new CodeError("NOT_VALID");
    });
    expect(error.code).toBe("NOT_VALID");
    expect(error.message).toBe("Something went wrong.");
  });
});

describe("CodeError.check()", () => {
  test("Returns true if given an actual instance of CodeError", () => {
    const error = CodeError.expectError(() => {
      throw new CodeError("NOT_VALID");
    });
    expect(CodeError.check(error)).toBe(true);
  });
  test("The error type is narrowed down after checking", () => {
    try {
      throw new CodeError("NOT_VALID");
    } catch (error) {
      if (CodeError.check(error)) {
        expectTypeOf(error).toEqualTypeOf<CodeError>();
      } else {
        throw error;
      }
    }
  });
  test("Returns true for any object with a code and message", () => {
    expect(CodeError.check({ code: "INVALID_DATA", message: "Invalid data" })).toBe(true);
  });
  test("Returns false for a generic JavaScript error", () => {
    try {
      throw new Error("SHOULD_BE_FALSE");
    } catch (error) {
      expect(CodeError.check(error)).toBe(false);
    }
  });
  test("The error type does not resolve to be CodeError if the check is false", () => {
    try {
      throw new Error("SHOULD_BE_FALSE");
    } catch (error) {
      if (!CodeError.check(error)) {
        expectTypeOf(error).not.toEqualTypeOf<CodeError>();
      } else {
        throw error;
      }
    }
  });
  test("Returns false if message is provided, but not code", () => {
    expect(CodeError.check({ message: "Should be false" })).toBe(false);
  });
  test("Returns false if code is provided, but not message", () => {
    expect(CodeError.check({ code: "SHOULD_BE_FALSE" })).toBe(false);
  });
  test("Returns false if code or message is not a string", () => {
    expect(CodeError.check({ code: 1, message: 2 })).toBe(false);
  });
});

describe("CodeError.expectError()", () => {
  test("Returns the CodeError if the provided function threw one", () => {
    const error = CodeError.expectError(() => {
      throw new CodeError("TEST_ERROR", "This is a test error");
    });
    expect(error.code).toBe("TEST_ERROR");
    expect(error.message).toBe("This is a test error");
  });
  test("Re-throws on any other error", () => {
    try {
      CodeError.expectError(() => {
        throw new Error("Not a CodeError");
      });
      throw new ReferenceError("Not the expected error");
    } catch (error) {
      expect(CodeError.check(error)).toBe(false);
      if (error instanceof Error) {
        expect(error.message).toBe("Not a CodeError");
      } else {
        throw error;
      }
    }
  });
  test("Throws a default Error if no error was thrown at all", () => {
    try {
      CodeError.expectError(() => {
        return "This is fine!";
      });
      throw new Error("Test failed because error was not thrown");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("Expected a CodeError to be thrown but none was thrown");
      } else {
        throw error;
      }
    }
  });
  test("Can assert against an error code and fail if the thrown error code is incorrect.", () => {
    const testError = new CodeError("INVALID_CODE");
    try {
      CodeError.expectError(
        () => {
          throw testError;
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
  test("Can assert against an error code and return the error if the thrown error code is correct.", () => {
    const error = CodeError.expectError(
      () => {
        throw new CodeError("VALID_CODE");
      },
      { expectedCode: "VALID_CODE" },
    );

    expect(error.code).toBe("VALID_CODE");
    expectTypeOf(error.code).toEqualTypeOf<"VALID_CODE">();
  });
});

describe("CodeError.checkWithCode()", () => {
  test("Returns true if the error contains the correct code", () => {
    const error = new CodeError("TEST_CODE");
    expect(CodeError.checkWithCode(error, "TEST_CODE")).toBe(true);
  });
  test("Returns false if the error does not contain the correct code", () => {
    const error = new CodeError("INVALID_CODE");
    expect(CodeError.checkWithCode(error, "VALID_CODE")).toBe(false);
  });
  test("Narrows down the type of the code if the error's code is correct, but does not if the error's code is incorrect", () => {
    const error: CodeError = new CodeError("VALID_CODE");
    if (CodeError.checkWithCode(error, "VALID_CODE")) {
      expectTypeOf(error).toEqualTypeOf<CodeError<"VALID_CODE">>();
      expectTypeOf(error.code).toEqualTypeOf<"VALID_CODE">();
    } else {
      expectTypeOf(error).not.toEqualTypeOf<CodeError<"VALID_CODE">>();
      expectTypeOf(error.code).not.toEqualTypeOf<"VALID_CODE">();
    }
  });
});
