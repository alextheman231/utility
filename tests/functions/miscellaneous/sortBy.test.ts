import type { SortDirection } from "src/root";

import { describe, expect, expectTypeOf, test } from "vitest";

import { identity, sortBy } from "src/root";

type MessageSortDirection = "ascending" | "descending";

describe("sortBy", () => {
  test.each<[MessageSortDirection, SortDirection, Array<number>]>([
    ["ascending", "asc", [1, 2, 3, 4]],
    ["descending", "desc", [4, 3, 2, 1]],
  ])("Sorts an array of numbers in %s order.", (_, direction, expected) => {
    expect([2, 4, 1, 3].toSorted(sortBy(identity, direction))).toEqual(expected);
  });
  test.each<[MessageSortDirection, SortDirection, Array<string>]>([
    ["ascending", "asc", ["alex", "am", "hello", "i"]],
    ["descending", "desc", ["i", "hello", "am", "alex"]],
  ])("Sorts an array of strings in %s order.", (_, direction, expected) => {
    expect(["hello", "i", "am", "alex"].toSorted(sortBy(identity, direction))).toEqual(expected);
  });
  test.each<[MessageSortDirection, SortDirection, Array<Date>]>([
    [
      "ascending",
      "asc",
      [
        new Date("2025-06-13T12:50:08.771Z"),
        new Date("2026-04-13T12:50:08.771Z"),
        new Date("2026-06-11T12:50:08.771Z"),
        new Date("2026-06-13T12:50:08.771Z"),
      ],
    ],
    [
      "descending",
      "desc",
      [
        new Date("2026-06-13T12:50:08.771Z"),
        new Date("2026-06-11T12:50:08.771Z"),
        new Date("2026-04-13T12:50:08.771Z"),
        new Date("2025-06-13T12:50:08.771Z"),
      ],
    ],
  ])("Sorts an array of dates in %s order.", (_, direction, expected) => {
    expect(
      [
        new Date("2026-06-11T12:50:08.771Z"),
        new Date("2026-06-13T12:50:08.771Z"),
        new Date("2025-06-13T12:50:08.771Z"),
        new Date("2026-04-13T12:50:08.771Z"),
      ].toSorted(sortBy(identity, direction)),
    ).toEqual(expected);
  });
  test.each<[MessageSortDirection, SortDirection, Array<{ sortKey: number }>]>([
    ["ascending", "asc", [{ sortKey: 1 }, { sortKey: 2 }, { sortKey: 3 }, { sortKey: 4 }]],
    ["descending", "desc", [{ sortKey: 4 }, { sortKey: 3 }, { sortKey: 2 }, { sortKey: 1 }]],
  ])("Sorts an object by key in %s order.", (_, direction, expected) => {
    expect(
      [{ sortKey: 2 }, { sortKey: 4 }, { sortKey: 1 }, { sortKey: 3 }].toSorted(
        sortBy((item) => {
          expectTypeOf(item).toEqualTypeOf<{ sortKey: number }>();
          return item.sortKey;
        }, direction),
      ),
    ).toEqual(expected);
  });
});
