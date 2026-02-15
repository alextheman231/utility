import type { DisallowUndefined } from "src/root/types";

import { describe, expectTypeOf, test } from "vitest";

describe("NonUndefined", () => {
  test("Resolves to the given type if undefined is not included", () => {
    expectTypeOf<DisallowUndefined<string>>().toEqualTypeOf<string>();
  });
  test("Resolves to an error message if undefined is included", () => {
    expectTypeOf<DisallowUndefined<string | undefined>>().toEqualTypeOf<
      ["Error: Generic type cannot include undefined"]
    >();
  });
});
