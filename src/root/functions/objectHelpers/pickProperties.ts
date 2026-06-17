/**
 * Picks properties from a given object.
 *
 * @category Object Helpers
 *
 * @template ObjectType - The type of the input object.
 * @template KeysToPick - A type representing the keys to pick from the object.
 *
 * @param object - The object to pick properties from.
 * @param keysToPick - The keys to pick from the object. Can either be a single string to pick one, or an array to pick multiple.
 *
 * @returns An object with a new reference in memory, with the chosen properties present.
 */
function pickProperties<ObjectType extends object, KeysToPick extends keyof ObjectType>(
  object: ObjectType,
  keysToPick: KeysToPick | ReadonlyArray<KeysToPick>,
): Pick<ObjectType, KeysToPick> {
  const keysArray: ReadonlyArray<KeysToPick> = Array.isArray(keysToPick)
    ? keysToPick
    : [keysToPick];

  const outputObject: Partial<Pick<ObjectType, KeysToPick>> = {};

  for (const key of keysArray) {
    outputObject[key] = object[key];
  }

  return outputObject as Pick<ObjectType, KeysToPick>;
}

export default pickProperties;
