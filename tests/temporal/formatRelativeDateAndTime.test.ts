// @vitest-environment node
import { describe, expect, test } from "vitest";

import formatRelativeDateAndTime from "src/temporal/formatRelativeDateAndTime";

describe("formatRelativeDateAndTime", () => {
  test("Returns 'Yesterday at <time>' if the given date occurred a day before today", () => {
    const yesterday = Temporal.Now.plainDateTimeISO().subtract({ days: 1 });
    const formattedDate = formatRelativeDateAndTime(yesterday);
    expect(formattedDate).toMatch(/^Yesterday at \d{2}:\d{2}$/);
  });
  test("Returns 'Today at <time>' if the given date occurred today", () => {
    const today = Temporal.Now.plainDateTimeISO();
    const formattedDate = formatRelativeDateAndTime(today);
    expect(formattedDate).toMatch(/^Today at \d{2}:\d{2}$/);
  });
  test("Returns 'DD/MM/YYYY, HH:MM' for any other date.", () => {
    const input = Temporal.Now.plainDateTimeISO().subtract({ days: 3 });
    const formattedDate = formatRelativeDateAndTime(input);
    expect(formattedDate).toMatch(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}/);
  });
  test("Allows for a reference date to be passed in as the second argument", () => {
    const reference = Temporal.PlainDateTime.from({
      year: 2026,
      month: 7,
      day: 8,
      hour: 23,
      minute: 27,
    });
    const formattedDate = formatRelativeDateAndTime(reference.subtract({ days: 1 }), reference);
    expect(formattedDate).toBe("Yesterday at 23:27");
  });
  test("If the input and reference are the same but different references in memory, it should be considered today.", () => {
    const reference = Temporal.PlainDateTime.from({
      year: 2026,
      month: 7,
      day: 8,
      hour: 23,
      minute: 27,
    });
    const identical = Temporal.PlainDateTime.from({
      year: 2026,
      month: 7,
      day: 8,
      hour: 23,
      minute: 27,
    });
    const formattedDate = formatRelativeDateAndTime(reference, identical);
    expect(formattedDate).toBe("Today at 23:27");
  });
  test("Returns the standard absolute format for dates that differ by more than a day", () => {
    const reference = Temporal.PlainDateTime.from({
      year: 2026,
      month: 7,
      day: 8,
      hour: 23,
      minute: 27,
    });
    const formattedDate = formatRelativeDateAndTime(reference.subtract({ days: 3 }), reference);
    expect(formattedDate).toBe("05/07/2026, 23:27");
  });
});
