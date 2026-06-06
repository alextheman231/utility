import { describe, expect, expectTypeOf, test } from "vitest";

import { containsKeys } from "src/root";

describe("containsKeys", () => {
  test("Returns true if the single key is present in the object", () => {
    expect(containsKeys({ testKey: "test value" }, "testKey")).toBe(true);
  });
  test("Returns true if all keys in the array are present in the object", () => {
    expect(
      containsKeys(
        {
          firstKey: "First value",
          secondKey: "Second value",
        },
        ["firstKey", "secondKey"],
      ),
    ).toBe(true);
  });
  test("Returns false if the single key is not present in the object", () => {
    expect(containsKeys({ invalidKey: "test value" }, "testKey")).toBe(false);
  });
  test("Returns false if no keys in the array are present in the object", () => {
    expect(
      containsKeys(
        {
          firstKey: "First value",
          secondKey: "Second value",
        },
        ["thirdKey", "fourthKey"],
      ),
    ).toBe(false);
  });
  test("Returns false if some, but not all keys in the array are present in the object", () => {
    expect(
      containsKeys(
        {
          firstKey: "First value",
          secondKey: "Second value",
        },
        ["firstKey", "fourthKey"],
      ),
    ).toBe(false);
  });
  test("Narrows down the property type to unknown if true", () => {
    const input: object = {};

    if (containsKeys(input, "testKey")) {
      expectTypeOf(input.testKey).toBeUnknown();
    }

    // @ts-expect-error: The function returned false so testKey does not exist on input.
    expect(input.testKey).toBeUndefined();
  });

  test("Returns true for an object", () => {
    expect(containsKeys({ hello: "world" }, "hello")).toBe(true);
  });
  test.each<[string, unknown]>([
    ["null", null],
    ["strings", "hello"],
    ["numbers", 1],
    ["booleans", true],
  ])("Returns false for %s", (_, input) => {
    expect(containsKeys(input, "hello")).toBe(false);
  });
  test("The input type is properly narrowed down", () => {
    const input: unknown = { hello: "world" };

    if (containsKeys(input, "hello")) {
      expectTypeOf(input.hello).toBeUnknown();
    }

    expectTypeOf(input).not.toEqualTypeOf<object>();
    expectTypeOf(input).toBeUnknown();
  });
});
