import { describe, expect, expectTypeOf, test } from "vitest";

import { identity } from "src/root";

function assignStringOrNumber(): string | number {
  return 1;
}

describe("identity", () => {
  test("Returns the input value as is", () => {
    const input = "hello";
    expect(identity(input)).toBe(input);
  });
  test("Maintains the input type", () => {
    const input: string | number = assignStringOrNumber();
    expectTypeOf(identity(input)).toEqualTypeOf(input);
  });
});
