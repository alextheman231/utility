import { describe, expect, expectTypeOf, test } from "vitest";

import assertNotNull from "src/root/errors/assertNotNull";
import { DataError } from "src/v6";

function assignStringForTest(input: string): string | null {
  return input;
}

function assignUndefinedForTest(input?: string): string | undefined {
  return input;
}

describe("assertNotNull", () => {
  test("Does nothing significant at runtime if the input is not null", () => {
    assertNotNull("hello");
  });
  test("Throws a DataError if the input is null", () => {
    const error = DataError.expectError(
      () => {
        assertNotNull(null);
      },
      { expectedCode: "NULL_INPUT" },
    );

    expect(error.data.input).toBeNull();
    expect(error.code).toBe("NULL_INPUT");
    expect(typeof error.message).toBe("string");
  });
  test("Narrows the input type to be not null", () => {
    // `const input: string | undefined | null = "hello"` does not pass the type test below as it still ends up typing the input as purely string.
    // To get around this, we need to wrap the assignment in a helper function whose return type is explicitly typed as `string | null`.
    const input = assignStringForTest("Hello");
    expectTypeOf(input).toEqualTypeOf<string | null>();

    assertNotNull(input);

    expectTypeOf(input).toEqualTypeOf<string>();
    expectTypeOf(input).not.toBeNull();
  });
  test("Allows undefined", () => {
    const input = assignUndefinedForTest(undefined);
    expectTypeOf(input).toEqualTypeOf<string | undefined>();

    assertNotNull(input);

    expectTypeOf(input).toEqualTypeOf<string | undefined>();
  });
});
