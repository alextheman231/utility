import { describe, expect, test } from "vitest";

import { parseBoolean } from "src/root/functions/parsers";
import { DataError } from "src/root/types";

describe("parseBoolean", () => {
  test("Returns true when given a string of true", () => {
    expect(parseBoolean("true")).toBe(true);
  });
  test("Returns false when given a string of false", () => {
    expect(parseBoolean("false")).toBe(false);
  });
  test("Throws an error for any other input", () => {
    const error = DataError.expectError(() => {
      parseBoolean("Yes");
    });

    expect(error.data.inputString).toBe("Yes");
    expect(error.code).toBe("INVALID_BOOLEAN_STRING");
    expect(error.message).toBe("The provided boolean string must be one of `true | false`");
  });
  test("Case insensitivity", () => {
    expect(parseBoolean("TruE")).toBe(true);
    expect(parseBoolean("faLsE")).toBe(false);
  });
});
