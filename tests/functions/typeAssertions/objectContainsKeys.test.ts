import { describe, expect, expectTypeOf, test } from "vitest";

import { objectContainsKeys } from "src/root";

describe("objectContainsKeys", () => {
  test("Returns true if the single key is present in the object", () => {
    expect(objectContainsKeys({ testKey: "test value" }, "testKey")).toBe(true);
  });
  test("Returns true if all keys in the array are present in the object", () => {
    expect(
      objectContainsKeys(
        {
          firstKey: "First value",
          secondKey: "Second value",
        },
        ["firstKey", "secondKey"],
      ),
    ).toBe(true);
  });
  test("Returns false if the single key is not present in the object", () => {
    expect(objectContainsKeys({ invalidKey: "test value" }, "testKey")).toBe(false);
  });
  test("Returns false if no keys in the array are present in the object", () => {
    expect(
      objectContainsKeys(
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
      objectContainsKeys(
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

    if (objectContainsKeys(input, "testKey")) {
      expectTypeOf(input.testKey).toBeUnknown();
    }

    // @ts-expect-error: The function returned false so testKey does not exist on input.
    expect(input.testKey).toBeUndefined();
  });
});
