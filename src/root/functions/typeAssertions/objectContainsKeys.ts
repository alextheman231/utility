/**
 * Determines if the given object contains all of the keys provided.
 *
 * @category Type Assertions
 *
 * @param input - The input object to check.
 * @param keys - The keys expected to be in the input object.
 *
 * @returns `true` if the input object contains all provided keys, and `false` otherwise. The input type will also be narrowed down to be a record with the provided keys with an unknown value type.
 */
function objectContainsKeys<Key extends PropertyKey = string>(
  input: object,
  keys: Key | ReadonlyArray<Key>,
): input is Record<Key, unknown> {
  const expectedKeys = Array.isArray(keys) ? keys : [keys];

  if (expectedKeys.length === 0) {
    return false;
  }

  for (const key of expectedKeys) {
    if (!(key in input)) {
      return false;
    }
  }

  return true;
}

export default objectContainsKeys;
