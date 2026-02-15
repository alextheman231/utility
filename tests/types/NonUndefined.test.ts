import type { NonUndefined } from "src/root/types";

import { describe, expectTypeOf, test } from "vitest";

describe("NonUndefined", () => {
  test("Resolves to the given type if undefined is not included", () => {
    expectTypeOf<NonUndefined<string>>().toEqualTypeOf<string>();
  });
  test("Does not allow a type to include undefined", () => {
    expectTypeOf<NonUndefined<string | undefined>>().not.toEqualTypeOf<string | undefined>();
  });
});
