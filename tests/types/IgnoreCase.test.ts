import type { IgnoreCase } from "src/root/types";

import { describe, expectTypeOf, test } from "vitest";

describe("IgnoreCase", () => {
  test("Matches the input type exactly when lowercase", () => {
    expectTypeOf<"hello">().toExtend<IgnoreCase<"hello">>();
  });
  test("Matches the input type exactly when uppercasecase", () => {
    expectTypeOf<"hello">().toExtend<IgnoreCase<"HELLO">>();
  });
  test("Ignores the case of the input type", () => {
    expectTypeOf<"hello">().toExtend<IgnoreCase<"HELlo">>();
    expectTypeOf<"HELLO">().toExtend<IgnoreCase<"HELlo">>();
  });
});
