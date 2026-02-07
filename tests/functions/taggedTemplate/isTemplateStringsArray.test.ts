import { describe, expect, expectTypeOf, test } from "vitest";

import { createTemplateStringsArray, deepFreeze, isTemplateStringsArray } from "src/functions";
import { DataError } from "src/types";

describe("isTemplateStringsArray", () => {
  test("Returns true for inputs that were directly created with `createTemplateStringsArray`", () => {
    expect(isTemplateStringsArray(createTemplateStringsArray(["Hello", "world"]))).toBe(true);
  });
  test("Returns false for regular arrays", () => {
    expect(isTemplateStringsArray(["Hello", "world"])).toBe(false);
  });
  test("Returns true for manually created TemplateStringsArrays and narrows down the type", () => {
    const rawStrings = ["Hello", "world"];
    const templateStrings: unknown = deepFreeze(
      Object.assign([...rawStrings], { raw: [...rawStrings] }),
    );

    if (isTemplateStringsArray(templateStrings)) {
      expectTypeOf(templateStrings).toEqualTypeOf<TemplateStringsArray>();
    } else {
      throw new DataError(
        { templateStrings },
        "INVALID_TEMPLATE_STRINGS",
        "The templateStrings test data could not be recognised as a TemplateStringsArray at runtime.",
      );
    }
  });
  test("Does not mutate the input array", () => {
    const input = Object.freeze(["Hello", "world"]);
    isTemplateStringsArray(input);
    expect(input).toEqual(["Hello", "world"]);
  });
});
