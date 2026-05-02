import { DataError } from "src/v6";

/**
 * Asserts that a given input is not `undefined` or `null`, and throws a DataError if it does.
 *
 * If no error is thrown from this, the input type gets narrowed down to not include `undefined` or `null`.
 *
 * @template InputType The type of the input.
 *
 * @param input - The input to assert against.
 *
 * @throws {DataError} If the input is `undefined` or `null`.
 */
function assertNotNullable<InputType>(input: InputType): asserts input is NonNullable<InputType> {
  if (input === null || input === undefined) {
    throw new DataError(
      { input },
      "NULLABLE_INPUT",
      "Expected the input not to be undefined or null",
    );
  }
}

export default assertNotNullable;
