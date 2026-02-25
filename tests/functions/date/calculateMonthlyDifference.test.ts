import { describe, expect, test } from "vitest";

import { calculateMonthlyDifference } from "src/root";

describe("calculateMonthlyDifference", () => {
  test("Returns one for two dates a month apart", () => {
    const firstDate = new Date("2026-03-25T19:25:51.377Z");
    const secondDate = new Date("2026-02-25T19:25:51.377Z");

    expect(calculateMonthlyDifference(firstDate, secondDate)).toBe(1);
  });
  test("Always takes the first date passed in and subtracts it from the second, giving a negative if needed", () => {
    const firstDate = new Date("2026-02-25T19:25:51.377Z");
    const secondDate = new Date("2026-03-25T19:25:51.377Z");

    expect(calculateMonthlyDifference(firstDate, secondDate)).toBe(-1);
  });
});
