/**
 * Determines if the given input is a non-nullable object, narrowing the type down as such if it is
 *
 * @category Type Assertions
 *
 * @param input - The input to check
 *
 * @returns `true` if the input is a non-nullable object, and `false` otherwise. The input type will also be narrowed down to be a non-nullable object.
 */
function isNonNullableObject(input: unknown): input is NonNullable<object> {
  return typeof input === "object" && input !== null;
}

export default isNonNullableObject;
