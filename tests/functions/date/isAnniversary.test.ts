import { describe, expect, test } from "vitest";

import { isAnniversary, isSameDate } from "src/root/functions/date";

describe("isAnniversary", () => {
  test("Returns true if two dates are a year apart", () => {
    const currentDate = new Date("2025-06-07T23:27:17.403");
    const oneYearLater = new Date("2026-06-07T23:27:17.403");

    expect(isAnniversary(currentDate, oneYearLater)).toBe(true);
    expect(isAnniversary(oneYearLater, currentDate)).toBe(true);
  });
  test("Returns false if two dates are not a year apart", () => {
    const currentDate = new Date("2025-06-07T23:27:17.403");
    const oneYearPlusOneDayLater = new Date("2026-06-08T23:27:17.403");

    expect(isAnniversary(currentDate, oneYearPlusOneDayLater)).toBe(false);
    expect(isAnniversary(oneYearPlusOneDayLater, currentDate)).toBe(false);
  });
  test("Account for February being February", () => {
    const currentDate = new Date("2025-02-28T23:27:17.403");
    const leapYearDate = new Date("2024-02-29T23:27:17.403");

    expect(isAnniversary(currentDate, leapYearDate)).toBe(true);
    expect(isAnniversary(leapYearDate, currentDate)).toBe(true);
  });
  describe("Mutation checks", () => {
    test("Does not mutate the first input date", () => {
      const initialDate = new Date();
      const inputDate = initialDate;
      isAnniversary(inputDate, new Date());
      expect(isSameDate(inputDate, new Date())).toBe(true);
      expect(inputDate).toBe(initialDate);
    });
    test("Does not mutate the second input date", () => {
      const initialDate = new Date();
      const inputDate = initialDate;
      isAnniversary(new Date(), inputDate);
      expect(isSameDate(inputDate, new Date())).toBe(true);
      expect(inputDate).toBe(initialDate);
    });
  });
});
