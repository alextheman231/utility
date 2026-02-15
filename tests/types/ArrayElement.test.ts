import type { ArrayElement } from "src/root/types/ArrayElement";

import { describe, expectTypeOf, test } from "vitest";

describe("ArrayElement", () => {
  test("Returns the inferred types of each array element", () => {
    const _array = [1, 2, 3];
    expectTypeOf<ArrayElement<typeof _array>>().toEqualTypeOf<number>();
  });
  test("Returns a union of types for a mixed array", () => {
    const _mixedArray = [1, 2, "Hello"];
    expectTypeOf<ArrayElement<typeof _mixedArray>>().toEqualTypeOf<string | number>();
  });
  test("Allows for nested arrays", () => {
    const _nestedArray = [1, 2, [3, 4]];
    expectTypeOf<ArrayElement<typeof _nestedArray>>().toEqualTypeOf<number | number[]>();
  });
});
