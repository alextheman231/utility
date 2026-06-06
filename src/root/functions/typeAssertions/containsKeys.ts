import isNonNullableObject from "src/root/functions/typeAssertions/isNonNullableObject";
import objectContainsKeys from "src/root/functions/typeAssertions/objectContainsKeys";

/**
 * Determines if the given input is a non-nullable object, and if that object contains all of the keys provided.
 *
 * @category Type Assertions
 *
 * @param input - The input to check.
 * @param keys - The keys expected to be in the input if it's an object.
 *
 * @returns `true` if the input is an object containing all provided keys, and `false` otherwise. The input type will also be narrowed down to be a record with the provided keys, each with an unknown value type.
 */
function containsKeys<Key extends PropertyKey = string>(
  input: unknown,
  keys: Key | ReadonlyArray<Key>,
): input is Record<Key, unknown> {
  return isNonNullableObject(input) && objectContainsKeys(input, keys);
}

export default containsKeys;
