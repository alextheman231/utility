import { describe, expect, expectTypeOf, test } from "vitest";

import { assertNotNullable } from "src/root";
import { DataError } from "src/v6";

function assignStringForTest(input: string): string | null | undefined {
  return input;
}

describe("assertNotNullable", () => {
  test("Does nothing significant at runtime if the input is not nullable", () => {
    assertNotNullable("hello");
  });
  test.each<undefined | null>([undefined, null])(
    "Throws a DataError if the input is %s",
    (input) => {
      const error = DataError.expectError(
        () => {
          assertNotNullable(input);
        },
        { expectedCode: "NULLABLE_INPUT" },
      );

      expect(error.data.input).toBeNullable();
      expect(error.code).toBe("NULLABLE_INPUT");
      expect(typeof error.message).toBe("string");
    },
  );
  test("Narrows the input type to be not nullable", () => {
    // `const input: string | undefined | null = "hello"` does not pass the type test below as it still ends up typing the input as purely string.
    // To get around this, we need to wrap the assignment in a helper function whose return type is explicitly typed as `string | null`.
    const input = assignStringForTest("Hello");
    expectTypeOf(input).toEqualTypeOf<string | null | undefined>();

    assertNotNullable(input);

    expectTypeOf(input).toEqualTypeOf<string>();
    expectTypeOf(input).not.toBeNull();
    expectTypeOf(input).not.toBeUndefined();
  });
});
