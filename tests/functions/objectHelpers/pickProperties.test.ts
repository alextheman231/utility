import { describe, expect, expectTypeOf, test } from "vitest";

import pickProperties from "src/root/functions/objectHelpers/pickProperties";

describe("pickProperties", () => {
  test("Returns a copy of the input object, only containing the provided key", () => {
    expect(
      pickProperties({ firstKey: "first value", secondKey: "second value" }, "firstKey"),
    ).toEqual({ firstKey: "first value" });
  });
  test("Returns a copy of the input object only containing the provided keys if the keys is an array", () => {
    expect(
      pickProperties(
        {
          firstKey: "first value",
          secondKey: "second value",
          thirdKey: "third value",
          fourthKey: "fourth value",
        },
        ["firstKey", "thirdKey"],
      ),
    ).toEqual({ firstKey: "first value", thirdKey: "third value" });
  });
  test("Does not mutate the input object", () => {
    const inputObject = Object.freeze({
      firstKey: "First property",
      secondKey: "Second property",
      thirdKey: "Third property",
      fourthKey: "Fourth property",
    });
    // Will error on mutation attempt due to freeze.
    pickProperties(inputObject, "firstKey");
    expect(inputObject).toEqual({
      firstKey: "First property",
      secondKey: "Second property",
      thirdKey: "Third property",
      fourthKey: "Fourth property",
    });
  });
  test("The return type is the input object with the specified key", () => {
    const inputObject = {
      firstKey: "First property",
      secondKey: "Second property",
      keyToPick: "Pick me",
    };
    expectTypeOf(pickProperties(inputObject, "keyToPick")).toEqualTypeOf<
      Pick<typeof inputObject, "keyToPick">
    >();
  });
  test("The return type is the input object with the specified keys", () => {
    const inputObject = {
      firstKey: "First property",
      secondKey: "Second property",
      keyToPick: "Pick me",
      anotherKeyToPick: "Also pick me",
    };
    expectTypeOf(pickProperties(inputObject, ["keyToPick", "anotherKeyToPick"])).toEqualTypeOf<
      Pick<typeof inputObject, "keyToPick" | "anotherKeyToPick">
    >();
  });
  test("Does not mutate the array of keys", () => {
    const keys = Object.freeze(["firstKey", "thirdKey"] as const);
    // Will error on mutation attempt due to freeze.
    pickProperties(
      {
        firstKey: "First property",
        secondKey: "Second property",
        thirdKey: "Third property",
        fourthKey: "Fourth property",
      },
      keys,
    );
    expect(keys).toEqual(["firstKey", "thirdKey"]);
  });
  test("Returns an object with a new reference in memory", () => {
    const keys = ["firstKey", "thirdKey"] as const;
    const inputObject = {
      firstKey: "First property",
      secondKey: "Second property",
      thirdKey: "Third property",
      fourthKey: "Fourth property",
    };
    const outputObject = pickProperties(inputObject, keys);
    expect(outputObject).not.toBe(keys);
    expect(outputObject).not.toBe(inputObject);
  });
});
