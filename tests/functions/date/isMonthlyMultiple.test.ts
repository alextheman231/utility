import { describe, expect, test } from "vitest";

import { isMonthlyMultiple, isSameDate } from "src/root/functions/date";

describe("isMonthlyMultiple", () => {
  test("Returns true if two dates share the same calendar day and are not a stupid edge case", () => {
    const currentDate = new Date("2025-06-07T23:27:17.403");
    const oneMonthLater = new Date("2025-07-07T23:27:17.403");

    expect(isMonthlyMultiple(currentDate, oneMonthLater)).toBe(true);
  });
  test("Returns false if two dates do not share the same calendar day and are not a stupid edge case", () => {
    const currentDate = new Date("2025-06-07T23:27:17.403");
    const oneMonthPlusOneDayLater = new Date("2025-07-08T23:27:17.403");

    expect(isMonthlyMultiple(currentDate, oneMonthPlusOneDayLater)).toBe(false);
  });
  test("Returns true if the first month had 30 days and second date is the 31st", () => {
    const firstDate = new Date("2025-06-30T23:27:17.403");
    const secondDate = new Date("2025-07-31T23:27:17.403");

    expect(isMonthlyMultiple(firstDate, secondDate)).toBe(true);
  });
  test("Returns true if the first date is the 31st and the second month had 30 days", () => {
    const firstDate = new Date("2025-07-31T23:27:17.403");
    const secondDate = new Date("2025-06-30T23:27:17.403");

    expect(isMonthlyMultiple(firstDate, secondDate)).toBe(true);
  });
  test("February edge cases (not leap year)", () => {
    const January28 = new Date("2025-01-28T23:27:17.403");
    const January29 = new Date("2025-01-29T23:27:17.403");
    const January30 = new Date("2025-01-30T23:27:17.403");
    const January31 = new Date("2025-01-31T23:27:17.403");

    const February28 = new Date("2025-02-28T23:27:17.403");

    expect(isMonthlyMultiple(January28, February28)).toBe(true);
    expect(isMonthlyMultiple(January29, February28)).toBe(true);
    expect(isMonthlyMultiple(January30, February28)).toBe(true);
    expect(isMonthlyMultiple(January31, February28)).toBe(true);
    expect(isMonthlyMultiple(February28, January28)).toBe(true);
    expect(isMonthlyMultiple(February28, January29)).toBe(true);
    expect(isMonthlyMultiple(February28, January30)).toBe(true);
    expect(isMonthlyMultiple(February28, January31)).toBe(true);
  });
  test("February edge cases (is leap year)", () => {
    const January29 = new Date("2028-01-29T23:27:17.403");
    const January30 = new Date("2028-01-30T23:27:17.403");
    const January31 = new Date("2028-01-31T23:27:17.403");

    const February28 = new Date("2028-02-28T23:27:17.403");
    const February29 = new Date("2028-02-29T23:27:17.403");

    expect(isMonthlyMultiple(January29, February28)).toBe(false);
    expect(isMonthlyMultiple(January30, February28)).toBe(false);
    expect(isMonthlyMultiple(January31, February28)).toBe(false);
    expect(isMonthlyMultiple(February28, January29)).toBe(false);
    expect(isMonthlyMultiple(February28, January30)).toBe(false);
    expect(isMonthlyMultiple(February28, January31)).toBe(false);

    expect(isMonthlyMultiple(January29, February29)).toBe(true);
    expect(isMonthlyMultiple(January30, February29)).toBe(true);
    expect(isMonthlyMultiple(January31, February29)).toBe(true);
    expect(isMonthlyMultiple(February29, January29)).toBe(true);
    expect(isMonthlyMultiple(February29, January30)).toBe(true);
    expect(isMonthlyMultiple(February29, January31)).toBe(true);
  });
  describe("Mutation checks", () => {
    test("Does not mutate the first input date", () => {
      const initialDate = new Date();
      const inputDate = initialDate;
      isMonthlyMultiple(inputDate, new Date());
      expect(isSameDate(inputDate, new Date())).toBe(true);
      expect(inputDate).toBe(initialDate);
    });
    test("Does not mutate the second input date", () => {
      const initialDate = new Date();
      const inputDate = initialDate;
      isMonthlyMultiple(new Date(), inputDate);
      expect(isSameDate(inputDate, new Date())).toBe(true);
      expect(inputDate).toBe(initialDate);
    });
  });
});
