import type { NonUndefined } from "src/root/types";

import { describe, expectTypeOf, test } from "vitest";

describe("NonUndefined", () => {
  test("Resolves to the given type if undefined is not included", () => {
    expectTypeOf<NonUndefined<string>>().toEqualTypeOf<string>();
  });
  test("Does not allow a type to include undefined", () => {
    expectTypeOf<NonUndefined<string | undefined>>().toEqualTypeOf<string>();
    expectTypeOf<NonUndefined<string | undefined>>().not.toBeUndefined();
  });
  test("Does not remove null from the union", () => {
    expectTypeOf<NonUndefined<string | undefined | null>>().toEqualTypeOf<string | null>();
    expectTypeOf<NonUndefined<string | undefined | null>>().not.toBeUndefined();
  });
});
