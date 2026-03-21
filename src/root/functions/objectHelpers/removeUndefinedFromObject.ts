export type RemoveUndefined<RecordType extends Record<PropertyKey, unknown>> = {
  [Key in keyof RecordType]: Exclude<RecordType[Key], undefined>;
};

/**
 * Removes entries whose values are `undefined` from a given object (not including null etc.).
 *
 * @param object - The object to remove undefined entries from.
 *
 * @returns An object with a new reference in memory, with undefined entries removed.
 */
function removeUndefinedFromObject<RecordType extends Record<PropertyKey, unknown>>(
  object: RecordType,
): RemoveUndefined<RecordType> {
  return Object.fromEntries(
    Object.entries(object).filter(([_, value]) => {
      return value !== undefined;
    }),
  ) as RemoveUndefined<RecordType>;
}

export default removeUndefinedFromObject;
