import type { NonUndefined } from "src/root/types";

import { DataError } from "src/v6";

/**
 * Asserts that a given input is not `undefined`, and throws a DataError if it does.
 *
 * If no error is thrown from this, the input type gets narrowed down to not include `undefined`.
 *
 * @template InputType The type of the input.
 *
 * @param input - The input to assert against.
 *
 * @throws {DataError} If the input is `undefined`.
 */
function assertNotUndefined<InputType>(input: InputType): asserts input is NonUndefined<InputType> {
  if (input === undefined) {
    throw new DataError({ input }, "UNDEFINED_INPUT", "Expected the input not to be undefined");
  }
}

export default assertNotUndefined;
