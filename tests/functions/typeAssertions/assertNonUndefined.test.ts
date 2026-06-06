import { describe, expect, expectTypeOf, test } from "vitest";

import { assertNotUndefined } from "src/root";
import { DataError } from "src/v6";

function assignStringForTest(input: string): string | undefined {
  return input;
}

function assignNullForTest(input: string | null): string | null {
  return input;
}

describe("assertNotUndefined", () => {
  test("Does nothing significant at runtime if the input is not undefined", () => {
    assertNotUndefined("hello");
  });
  test("Throws a DataError if the input is undefined", () => {
    const error = DataError.expectError(
      () => {
        assertNotUndefined(undefined);
      },
      { expectedCode: "UNDEFINED_INPUT" },
    );

    expect(error.data.input).toBeUndefined();
    expect(error.code).toBe("UNDEFINED_INPUT");
    expect(typeof error.message).toBe("string");
  });
  test("Allows null", () => {
    assertNotUndefined(null);
  });
  test("Narrows the input type to be not undefined", () => {
    // `const input: string | undefined = "hello"` does not pass the type test below as it still ends up typing the input as purely string.
    // To get around this, we need to wrap the assignment in a helper function whose return type is explicitly typed as `string | null`.
    const input = assignStringForTest("Hello");
    expectTypeOf(input).toEqualTypeOf<string | undefined>();

    assertNotUndefined(input);

    expectTypeOf(input).toEqualTypeOf<string>();
    expectTypeOf(input).not.toBeUndefined();
  });
  test("Allows null", () => {
    const input = assignNullForTest(null);
    expectTypeOf(input).toEqualTypeOf<string | null>();

    assertNotUndefined(input);

    expectTypeOf(input).toEqualTypeOf<string | null>();
  });
});
