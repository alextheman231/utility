import type { NonNull } from "src/root/types";

import { DataError } from "src/v6";

/**
 * Asserts that a given input is not `null`, and throws a DataError if it does.
 *
 * If no error is thrown from this, the input type gets narrowed down to not include `null`.
 *
 * @template InputType The type of the input.
 *
 * @param input - The input to assert against
 *
 * @throws {DataError} If the input is `null`.
 */
function assertNotNull<InputType>(input: InputType): asserts input is NonNull<InputType> {
  if (input === null) {
    throw new DataError({ input }, "NULL_INPUT", "Expected the input not to be null");
  }
}

export default assertNotNull;
