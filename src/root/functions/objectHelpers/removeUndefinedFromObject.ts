import type { RecordKey } from "src/root/types";

export type RemoveUndefined<RecordType extends Record<RecordKey, unknown>> = {
  [Key in keyof RecordType]: Exclude<RecordType[Key], undefined>;
};

/**
 * Removes entries whose values are `undefined` from a given object (not including null etc.).
 *
 * @param object - The object to remove undefined entries from.
 *
 * @returns An object with a new reference in memory, with undefined entries removed.
 */
function removeUndefinedFromObject<RecordType extends Record<RecordKey, unknown>>(
  object: RecordType,
): RemoveUndefined<RecordType> {
  return Object.fromEntries(
    Object.entries(object).filter(([_, value]) => {
      return value !== undefined;
    }),
  ) as RemoveUndefined<RecordType>;
}

export default removeUndefinedFromObject;
