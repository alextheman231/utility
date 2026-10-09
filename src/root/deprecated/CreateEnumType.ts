/**
 * Get the value types from a const object so the object can behave similarly to an enum.
 *
 * @category Types
 *
 * @deprecated This type has been renamed to `ObjectValue`.
 *
 * @template ObjectType - The type of the object to get the value types for.
 */
export type CreateEnumType<ObjectType extends Record<PropertyKey, unknown>> =
  ObjectType[keyof ObjectType];
