import type { APIErrorCode, HTTPErrorCode } from "src/v6/APIError";

import { describe, expect, expectTypeOf, test } from "vitest";

import { parseIntStrict } from "src/root";
import { APIError, httpErrorCodeLookup } from "src/v6";

describe("APIError", () => {
  test("Throws an error with the given status and message", () => {
    const error = APIError.expectError(() => {
      throw new APIError(400, "TEST_PASSED");
    });

    expect(error.status).toBe(400);
    expect(error.code).toBe("TEST_PASSED");
  });
});

describe("APIError.fromStatus()", () => {
  test.each<[HTTPErrorCode, APIErrorCode]>(
    Object.keys(httpErrorCodeLookup).map((rawCode) => {
      const code = parseIntStrict(rawCode) as HTTPErrorCode;
      return [code, httpErrorCodeLookup[code]];
    }),
  )("Maps status %s to code %s", (status, code) => {
    const error = APIError.expectError(() => {
      throw APIError.fromStatus(status);
    });

    expect(error.status).toBe(status);
    expect(error.code).toBe(code);
  });
  test("Allows overriding the default message", () => {
    const error = APIError.expectError(() => {
      throw APIError.fromStatus(404, "Custom message");
    });

    expect(error.message).toBe("Custom message");
  });
  test("Passes through data correctly", () => {
    const data = { id: 123 };

    const error = APIError.expectError(() => {
      throw APIError.fromStatus(404, undefined, data);
    });

    expect(error.data).toEqual(data);
  });
});

describe("APIError.check()", () => {
  test("Returns true if given an actual instance of APIError", () => {
    const error = APIError.fromStatus(404);
    expect(APIError.check(error)).toBe(true);
  });
  test("Returns true for any object with a status, code, and message", () => {
    expect(APIError.check({ status: 404, code: "NOT_FOUND", message: "Resource not found" })).toBe(
      true,
    );
  });
  test("Returns true if status, code, message, and data are provided", () => {
    expect(
      APIError.check({
        status: 404,
        code: "NOT_FOUND",
        message: "Resource not found",
        data: { resourceId: "test_id" },
      }),
    ).toBe(true);
  });
  test("Returns true if status, code, and message is present but data is undefined", () => {
    expect(
      APIError.check({
        status: 404,
        code: "NOT_FOUND",
        message: "Resource not found",
        data: undefined,
      }),
    ).toBe(true);
  });
  test("Returns false if status, code, and message is present but data is null", () => {
    expect(
      APIError.check({ status: 404, code: "NOT_FOUND", message: "Resource not found", data: null }),
    ).toBe(false);
  });
  test("The error type is narrowed down after checking", () => {
    const error: unknown = APIError.fromStatus(404);
    if (APIError.check(error)) {
      expectTypeOf(error).toEqualTypeOf<APIError>();
    } else {
      expectTypeOf(error).not.toEqualTypeOf<APIError>();
    }
  });
  test("Returns false for a generic JavaScript error", () => {
    const error = new Error("SHOULD_BE_FALSE");
    expect(APIError.check(error)).toBe(false);
  });
  test("Returns false for any object without a status and code", () => {
    expect(APIError.check({ hello: "world" })).toBe(false);
  });
  test("Returns false if only one of status or code is provided, but not both", () => {
    expect(APIError.check({ status: 404 })).toBe(false);
    expect(APIError.check({ code: "SHOULD_BE_FALSE" })).toBe(false);
  });
  test("Returns false if status is not a number", () => {
    expect(APIError.check({ status: "Hello", message: "World" })).toBe(false);
  });
  test("Returns false if message is not a string", () => {
    expect(APIError.check({ status: 420, message: 69 })).toBe(false);
  });
  test("Returns false if data is not an object", () => {
    expect(
      APIError.check({
        status: 404,
        code: "NOT_FOUND",
        message: "Resource not found",
        data: 123,
      }),
    ).toBe(false);
  });
});

describe("this.toJSON()", () => {
  test("Returns the current instance of `APIError` as a JSON object.", () => {
    const error = new APIError(404, "NOT_FOUND", "Not found", { resourceId: "test_id" }).toJSON();
    expect(error.status).toBe(404);
    expect(error.data?.resourceId).toBe("test_id");
    expect(error.code).toBe("NOT_FOUND");
    expect(error.message).toBe("Not found");
    expect("name" in error).toBe(false);
    expect("toJSON" in error).toBe(false);
  });
});
