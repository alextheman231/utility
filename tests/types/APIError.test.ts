import { describe, expect, expectTypeOf, test } from "vitest";

import APIError from "src/root/types/APIError";

function testAPIError(error: APIError, expectedStatus: number, expectedMessage: string) {
  try {
    throw error;
  } catch (error) {
    if (error instanceof APIError) {
      expect(error.status).toBe(expectedStatus);
      expect(error.message).toBe(expectedMessage);
    } else {
      throw error;
    }
  }
}

describe("APIError", () => {
  test("Throws an error with the given status and message", () => {
    testAPIError(new APIError(400, "TEST_PASSED"), 400, "TEST_PASSED");
  });
  const withTestCases = test.each([
    [400, "BAD_REQUEST"],
    [401, "UNAUTHORISED"],
    [403, "FORBIDDEN"],
    [404, "NOT_FOUND"],
    [418, "I_AM_A_TEAPOT"],
    [500, "INTERNAL_SERVER_ERROR"],
  ]);
  withTestCases("For status code %s, give default message %s", (status, message) => {
    testAPIError(new APIError(status), status, message);
  });
  test("Default to 500: INTERNAL_SERVER_ERROR if no status or message provided", () => {
    testAPIError(new APIError(), 500, "INTERNAL_SERVER_ERROR");
  });
  test("Default to a message of API_ERROR if status code is not a common one", () => {
    testAPIError(new APIError(69), 69, "API_ERROR");
  });
});

describe("APIError.check()", () => {
  test("Returns true if given an actual instance of APIError", () => {
    try {
      throw new APIError(404);
    } catch (error) {
      expect(APIError.check(error)).toBe(true);
    }
  });
  test("Returns true for any object with a status and message", () => {
    expect(APIError.check({ status: 404, message: "NOT_FOUND" })).toBe(true);
  });
  test("The error type is narrowed down after checking", () => {
    try {
      throw new APIError(404);
    } catch (error) {
      if (APIError.check(error)) {
        expectTypeOf(error).toEqualTypeOf<APIError>();
      }
    }
  });
  test("Returns false for a generic JavaScript error", () => {
    try {
      throw new Error("SHOULD_BE_FALSE");
    } catch (error) {
      expect(APIError.check(error)).toBe(false);
    }
  });
  test("The error type does not resolve to be APIError if the check is false", () => {
    try {
      throw new Error("SHOULD_BE_FALSE");
    } catch (error) {
      if (!APIError.check(error)) {
        expectTypeOf(error).not.toEqualTypeOf<APIError>();
      }
    }
  });
  test("Returns false for any object without a status and message", () => {
    expect(APIError.check({ hello: "world" })).toBe(false);
  });
  test("Returns false if only one of status or message is provided, but not both", () => {
    expect(APIError.check({ status: 404 })).toBe(false);
    expect(APIError.check({ message: "SHOULD_BE_FALSE" })).toBe(false);
  });
  test("Returns false if status is not a number", () => {
    expect(APIError.check({ status: "Hello", message: "World" })).toBe(false);
  });
  test("Returns false if message is not a string", () => {
    expect(APIError.check({ status: 420, message: 69 })).toBe(false);
  });
});
