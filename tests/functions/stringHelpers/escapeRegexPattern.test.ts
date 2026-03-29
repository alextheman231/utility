import { describe, expect, test } from "vitest";

import { escapeRegexPattern } from "src/root";

describe("escapeRegexPattern", () => {
  test("Escapes all regex special characters", () => {
    const input = ".*+?^${}()|[]\\";
    const output = escapeRegexPattern(input);

    expect(output).toBe("\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\");
  });
  test.each<[string, string]>([
    [".", "\\."],
    ["*", "\\*"],
    ["?", "\\?"],
  ])(
    "Handles strings with only one special character (escapes '%s' as '%s')",
    (input, expected) => {
      expect(escapeRegexPattern(input)).toBe(expected);
    },
  );
  test("Correctly escapes already escaped sequences", () => {
    expect(escapeRegexPattern("\\.")).toBe("\\\\\\.");
  });
  test("Handles empty strings", () => {
    expect(escapeRegexPattern("")).toBe("");
  });
  test("Does not modify a string with no special characters", () => {
    expect(escapeRegexPattern("abc123")).toBe("abc123");
  });
  test("Escapes mixed content correctly", () => {
    expect(escapeRegexPattern("/user/(id)+")).toBe("\\/user\\/\\(id\\)\\+");
  });
  test("Allows the escaped string to be safely used in a RegExp", () => {
    const testString = "/user/(id)+";
    const escaped = escapeRegexPattern(testString);

    const regex = new RegExp(`^${escaped}$`);

    expect(regex.test(testString)).toBe(true);
  });
  test("Escapes forward slashes correctly", () => {
    const input = "/api/v1/users";
    const output = escapeRegexPattern(input);

    expect(output).toBe("\\/api\\/v1\\/users");
  });
  test("Escaped string matches only the original string", () => {
    const input = "a+b";
    const escaped = escapeRegexPattern(input);
    const regex = new RegExp(`^${escaped}$`);

    expect(regex.test("a+b")).toBe(true);
    expect(regex.test("ab")).toBe(false);
  });
});
