import { describe, expect, test } from "vitest";

import { isLeapYear } from "src/root/functions/date";
import { DataError } from "src/root/types";

describe("isLeapYear", () => {
  test("Returns false if the year is not a leap year", () => {
    expect(isLeapYear(2025)).toBe(false);
  });
  test("Returns true if the year is a leap year", () => {
    expect(isLeapYear(2024)).toBe(true);
  });
  test("Accounts for weird edge cases that aren't leap years but are a multiple of 4", () => {
    expect(isLeapYear(1900)).toBe(false);
  });
  test("Throws an error for non-integer inputs (because what the hell is year 2025.5?)", () => {
    const error = DataError.expectError(() => {
      isLeapYear(2025.5);
    });
    expect(error.code).toBe("INTEGER_PARSING_ERROR");
  });
});
