import { describe, expect, test } from "vitest";

import isSameDate from "src/root/functions/date/isSameDate";

describe("isSameDate", () => {
  test("Returns true if two dates are fully equal", () => {
    const today = new Date();
    expect(isSameDate(today, today)).toBe(true);
  });
  test("Returns true if two dates are equal but use different instances of Date", () => {
    const today = new Date();
    const alsoToday = new Date();
    expect(isSameDate(today, alsoToday)).toBe(true);
  });
  test("Returns false if two dates are not equal", () => {
    const currentDate = new Date("2025-06-07T23:27:17.403");
    const theNextDay = new Date("2025-06-08T23:27:17.403");
    expect(isSameDate(currentDate, theNextDay)).toBe(false);
  });
  test("Returns true if two date instances occur on the same day but different times", () => {
    const currentDate = new Date("2025-06-07T23:27:17.403");
    const currentDateWithDifferentTime = new Date("2025-06-07T22:27:17.403");
    expect(isSameDate(currentDate, currentDateWithDifferentTime)).toBe(true);
  });
  describe("Mutation checks", () => {
    test("Does not mutate the first input date", () => {
      const initialDate = new Date();
      const inputDate = initialDate;
      isSameDate(inputDate, new Date());
      expect(
        inputDate.getDate() === new Date().getDate() &&
          inputDate.getMonth() === new Date().getMonth() &&
          inputDate.getFullYear() === new Date().getFullYear(),
      ).toBe(true);
      expect(inputDate).toBe(initialDate);
    });
    test("Does not mutate the second input date", () => {
      const initialDate = new Date();
      const inputDate = initialDate;
      isSameDate(new Date(), inputDate);
      expect(
        inputDate.getDate() === new Date().getDate() &&
          inputDate.getMonth() === new Date().getMonth() &&
          inputDate.getFullYear() === new Date().getFullYear(),
      ).toBe(true);
      expect(inputDate).toBe(initialDate);
    });
  });
});
