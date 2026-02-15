import { describe, expect, test } from "vitest";

import { deepCopy, deepFreeze } from "src/root/functions";

describe("deepCopy", () => {
  test("Creates a copy of the input object", () => {
    const inputObject = { hello: "world" };
    const copiedObject = deepCopy(inputObject);

    // Should not be the same reference in memory.
    expect(inputObject).not.toBe(copiedObject);

    // But should contain the same contents.
    expect(inputObject).toEqual(copiedObject);
  });
  test("Copies nested objects one layer deep", () => {
    const inputObject = { hello: { world: "Nested test" } };
    const copiedObject = deepCopy(inputObject);

    // Top-level object is not the same reference in memory.
    expect(inputObject).not.toBe(copiedObject);
    // The nested object is not the same reference in memory.
    expect(inputObject.hello).not.toBe(copiedObject.hello);

    // The overall object still contains the same contents.
    expect(inputObject).toEqual(copiedObject);
  });
  test("Copies nested objects more than one layer deep", () => {
    const inputObject = {
      hello: {
        world: { doublyNested: "This should still work" },
        there: { more: { nesting: "Should still work" } },
      },
    };
    const copiedObject = deepCopy(inputObject);

    expect(inputObject).not.toBe(copiedObject);
    expect(inputObject.hello).not.toBe(copiedObject.hello);
    expect(inputObject.hello.world).not.toBe(copiedObject.hello.world);
    expect(inputObject.hello.there).not.toBe(copiedObject.hello.there);
    expect(inputObject.hello.there.more).not.toBe(copiedObject.hello.there.more);

    expect(inputObject).toEqual(copiedObject);
  });
  test("Works with arrays with no nesting", () => {
    const inputArray = ["hello", "world"];
    const copiedArray = deepCopy(inputArray);

    expect(inputArray).not.toBe(copiedArray);
    expect(inputArray).toEqual(copiedArray);
  });
  test("Works with arrays with one layer of nesting", () => {
    const inputArray = ["hello", ["world", "test"]];
    const copiedArray = deepCopy(inputArray);

    expect(inputArray).not.toBe(copiedArray);
    expect(inputArray[1]).not.toBe(copiedArray[1]);

    expect(inputArray).toEqual(copiedArray);
  });
  test("Works with arrays with multiple layers of nesting", () => {
    const inputArray = [
      "hello",
      [
        "world",
        ["test with", "multiple layers of nesting"],
        "there",
        ["even", ["more", ["nesting"]]],
      ],
    ];
    const copiedArray = deepCopy(inputArray);

    // Checking all nested layers of arrays is so cursed lol
    expect(inputArray).not.toBe(copiedArray);
    expect(inputArray[1]).not.toBe(copiedArray[1]);
    expect(inputArray[1][1]).not.toBe(copiedArray[1][1]);
    expect(inputArray[1][3]).not.toBe(copiedArray[1][3]);
    expect(inputArray[1][3][1]).not.toBe(copiedArray[1][3][1]);
    expect(inputArray[1][3][1]).not.toBe(copiedArray[1][3][1]);
    expect(inputArray[1][3][1][1]).not.toBe(copiedArray[1][3][1][1]);

    expect(inputArray).toEqual(copiedArray);
  });
  test("Works with mixed objects/arrays", () => {
    const inputObject = {
      hello: ["world", "this is an array", ["with a nested array"]],
      goodbye: {
        world: [
          "This is a nested array",
          {
            with: "A nested object inside of it",
          },
        ],
      },
    };

    const copiedObject = deepCopy(inputObject);

    expect(inputObject).not.toBe(copiedObject);
    expect(inputObject.hello).not.toBe(copiedObject);
    expect(inputObject.hello[2]).not.toBe(copiedObject.hello[2]);
    expect(inputObject.goodbye).not.toBe(copiedObject.goodbye);
    expect(inputObject.goodbye.world).not.toBe(copiedObject.goodbye.world);
    expect(inputObject.goodbye.world[1]).not.toBe(copiedObject.goodbye.world[1]);

    expect(inputObject).toEqual(copiedObject);
  });
  test("Does not mutate the input object", () => {
    const inputObject = {
      hello: {
        world: { doublyNested: "This should still work" },
        there: { more: { nesting: "Should still work" } },
      },
    };
    deepCopy(deepFreeze(inputObject));
    expect(inputObject).toEqual({
      hello: {
        world: { doublyNested: "This should still work" },
        there: { more: { nesting: "Should still work" } },
      },
    });
  });
});
