import { describe, expect, test } from "vitest";

import addDaysToDate from "src/root/functions/date/addDaysToDate";
import isSameDate from "src/root/functions/date/isSameDate";

describe("addDaysToDate", () => {
  test("Returns the next day from today if no arguments given", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const output = addDaysToDate();

    expect(isSameDate(output, tomorrow)).toBe(true);
  });
  test("Returns the next day from the date given if only date is given", () => {
    const currentDate = new Date("2025-06-07T23:27:17.403");
    const theNextDay = new Date("2025-06-08T23:27:17.403");

    const output = addDaysToDate(currentDate);

    expect(isSameDate(output, theNextDay)).toBe(true);
  });
  test("Returns the day a given increment away from now if no date given but increment is given", () => {
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);

    const output = addDaysToDate(undefined, 2);
    expect(isSameDate(output, twoDaysFromNow)).toBe(true);
  });
  test("Returns the day(s) before if the given increment is negative", () => {
    const currentDay = new Date("2025-06-07T23:27:17.403");
    const theDayBefore = new Date("2025-06-06T23:27:17.403");

    const output = addDaysToDate(currentDay, -1);

    expect(isSameDate(output, theDayBefore)).toBe(true);
  });
  describe("Mutation checks", () => {
    test("Does not mutate the input date", () => {
      const initialDate = new Date();
      const inputDate = initialDate;
      addDaysToDate(inputDate, 1);
      expect(isSameDate(inputDate, new Date())).toBe(true);
      expect(inputDate).toBe(initialDate);
    });
    test("0 increment returns a new Date with a new reference in memory, but equal to the input", () => {
      const currentDate = new Date();
      const output = addDaysToDate(currentDate, 0);
      expect(isSameDate(output, currentDate)).toBe(true);
      expect(output).not.toBe(currentDate);
    });
    test("Returns a new Date with a new reference in memory", () => {
      const currentDate = new Date();
      const outputDate = addDaysToDate(currentDate, 1);
      expect(outputDate).not.toBe(currentDate);
    });
  });
});
