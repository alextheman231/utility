import type { NonNull } from "src/root/types";

import { describe, expectTypeOf, test } from "vitest";

describe("NonNull", () => {
  test("Resolves to the given type if undefined is not included", () => {
    expectTypeOf<NonNull<string>>().toEqualTypeOf<string>();
  });
  test("Does not allow a type to include undefined", () => {
    expectTypeOf<NonNull<string | null>>().toEqualTypeOf<string>();
    expectTypeOf<NonNull<string | null>>().not.toBeNull();
  });
  test("Does not remove undefined from the union", () => {
    expectTypeOf<NonNull<string | undefined | null>>().toEqualTypeOf<string | undefined>();
    expectTypeOf<NonNull<string | undefined | null>>().not.toBeNull();
  });
});
