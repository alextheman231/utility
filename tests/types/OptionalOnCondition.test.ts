import type { OptionalOnCondition } from "src/root/types";

import { describe, expectTypeOf, test } from "vitest";

describe("OptionalOnCondition", () => {
  test("Resolves to the type of the second type argument if first type argument is true", () => {
    expectTypeOf<OptionalOnCondition<true, string>>().toEqualTypeOf<string>();
  });
  test("Resolves to a union of the second type and undefined if first type argument is false", () => {
    expectTypeOf<OptionalOnCondition<false, string>>().toEqualTypeOf<string | undefined>();
  });
});
