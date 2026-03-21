/**
 * Gets the keys from a given record object, properly typed to be an array of the key of the input object's type.
 *
 * @category Object Helpers
 *
 * @template InputRecordType - The type of the input object.
 *
 * @param record - The record to get the keys from.
 *
 * @returns An array with all the keys of the input object in string form, but properly typed as `keyof InputRecordType`.
 */
function getRecordKeys<InputRecordType extends Record<PropertyKey, unknown>>(
  record: InputRecordType & object,
): Array<keyof InputRecordType> {
  return Object.keys(record) as Array<keyof InputRecordType>;
}

export default getRecordKeys;
