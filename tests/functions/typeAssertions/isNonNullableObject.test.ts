import { describe, expect, expectTypeOf, test } from "vitest";

import { isNonNullableObject } from "src/root";

describe("isNonNullableObject", () => {
  test("Returns true for an object", () => {
    expect(isNonNullableObject({ hello: "world" })).toBe(true);
  });
  test.each<[string, unknown]>([
    ["null", null],
    ["strings", "hello"],
    ["numbers", 1],
    ["booleans", true],
  ])("Returns false for %s", (_, input) => {
    expect(isNonNullableObject(input)).toBe(false);
  });
  test("The input type is properly narrowed down", () => {
    const input: unknown = {};

    if (isNonNullableObject(input)) {
      expectTypeOf(input).toEqualTypeOf<object>();
    }

    expectTypeOf(input).not.toEqualTypeOf<object>();
    expectTypeOf(input).toBeUnknown();
  });
});
