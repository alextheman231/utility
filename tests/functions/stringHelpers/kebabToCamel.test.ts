import { describe, expect, test } from "vitest";

import kebabToCamel from "src/root/functions/stringHelpers/kebabToCamel";

describe("kebabToCamel", () => {
  test("Converts a string from kebab-case to camelCase", () => {
    expect(kebabToCamel("hello-world")).toBe("helloWorld");
  });
  test("Throws an error on invalid kebab-case input", () => {
    try {
      kebabToCamel("helloWorld");
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("INVALID_KEBAB_CASE_INPUT");
      }
    }
  });
  test("Ignores non-alphabetic characters", () => {
    expect(kebabToCamel("hello-world2")).toBe("helloWorld2");
  });
  test("Capitalises the first letter if the option is provided", () => {
    expect(kebabToCamel("hello-world", { startWithUpper: true })).toBe("HelloWorld");
  });
  test("Errors on bad dash placement", () => {
    try {
      kebabToCamel("hello--world");
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("INVALID_KEBAB_CASE_INPUT");
      }
    }

    try {
      kebabToCamel("-hello-world");
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("INVALID_KEBAB_CASE_INPUT");
      }
    }

    try {
      kebabToCamel("hello-world-");
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("INVALID_KEBAB_CASE_INPUT");
      }
    }
  });
});
