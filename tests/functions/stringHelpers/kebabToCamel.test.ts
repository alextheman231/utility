import { describe, expect, test } from "vitest";

import { DataError } from "src/root";
import kebabToCamel from "src/root/functions/stringHelpers/kebabToCamel";

describe("kebabToCamel", () => {
  test("Converts a string from kebab-case to camelCase", () => {
    expect(kebabToCamel("hello-world")).toBe("helloWorld");
  });
  test("Throws an error on invalid kebab-case input", () => {
    const error = DataError.expectError(() => {
      kebabToCamel("helloWorld");
    });

    expect(error.data.input).toBe("helloWorld");
    expect(error.code).toBe("UPPERCASE_INPUT");
  });
  test("Ignores non-alphabetic characters", () => {
    expect(kebabToCamel("hello-world2")).toBe("helloWorld2");
  });
  test("Capitalises the first letter if the option is provided", () => {
    expect(kebabToCamel("hello-world", { startWithUpper: true })).toBe("HelloWorld");
  });
  test.each<[string, string, string]>([
    ["consecutive dashes", "hello--world", "CONSECUTIVE_DASHES"],
    ["dash at start of string", "-hello-world", "TRAILING_DASHES"],
    ["dash at end of string", "hello-world-", "TRAILING_DASHES"],
  ])("Errors on %s", (_, input, code) => {
    const error = DataError.expectError(() => {
      kebabToCamel(input);
    });

    expect(error.data.input).toBe(input);
    expect(error.code).toBe(code);
  });
});
