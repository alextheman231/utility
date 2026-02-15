import { describe, expect, test } from "vitest";

import { camelToKebab } from "src/root/functions";

describe("camelToKebab", () => {
  test("Converts a string from camelCase to kebab-case", () => {
    expect(camelToKebab("helloWorld")).toBe("hello-world");
  });
  test("Ignores non-alphabetic characters", () => {
    expect(camelToKebab("hello-worldString2")).toBe("hello-world-string2");
  });
  test("Handles consecutive capital letters as its own group", () => {
    expect(camelToKebab("validateAPIUser")).toBe("validate-api-user");
  });
  test("Leaves consecutive capital letters alone if option is provided", () => {
    expect(camelToKebab("validateAPIUser", { preserveConsecutiveCapitals: false })).toBe(
      "validate-a-p-i-user",
    );
  });
});
