/**
 * Omits properties from a given object.
 *
 * @category Object Helpers
 *
 * @template ObjectType - The type of the input object.
 * @template KeysToOmit - A type representing the keys to omit from the object.
 *
 * @param object - The object to omit properties from.
 * @param keysToOmit - The keys to omit from the object. Can either be a single string to omit one, or an array to omit multiple.
 *
 * @returns An object with a new reference in memory, with the properties omitted.
 */
function omitProperties<
  ObjectType extends Record<string, unknown> | Readonly<Record<string, unknown>>,
  KeysToOmit extends keyof ObjectType,
>(
  object: ObjectType,
  keysToOmit: KeysToOmit | readonly KeysToOmit[],
): Omit<ObjectType, KeysToOmit> {
  const outputObject: Record<string, unknown> = { ...object };
  const keysArray = Array.isArray(keysToOmit) ? keysToOmit : [keysToOmit];
  keysArray.forEach((key) => {
    delete outputObject[key];
  });
  return outputObject as Omit<ObjectType, KeysToOmit>;
}

export default omitProperties;
