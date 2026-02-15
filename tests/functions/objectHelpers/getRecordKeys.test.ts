import { describe, expect, expectTypeOf, test } from "vitest";

import { getRecordKeys } from "src/root/functions";

describe("getRecordKeys", () => {
  test("Returns all record keys in an array", () => {
    expect(getRecordKeys({ firstKey: "First property", secondKey: "Second property" })).toEqual([
      "firstKey",
      "secondKey",
    ]);
  });
  test("The type of the output array corresponds to the Record keys", () => {
    expectTypeOf(
      getRecordKeys({ firstKey: "First property", secondKey: "Second property" }),
    ).toEqualTypeOf<("firstKey" | "secondKey")[]>();
  });
  test("Cannot pass in non-record types", () => {
    // @ts-expect-error: This will give a compile-time error because it's not a record.
    getRecordKeys("hello");
  });
  test("Does not mutate the input object", () => {
    const input = Object.freeze({ firstKey: "First property", secondKey: "Second property" });
    getRecordKeys(input);
    expect(input).toEqual({ firstKey: "First property", secondKey: "Second property" });
  });
});
