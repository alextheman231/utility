/**
 * Get the value types from an object.
 *
 * @category Types
 *
 * @template ObjectType - The type of the object to get the value types for.
 */
export type ObjectValue<ObjectType extends object = Record<PropertyKey, unknown>> =
  ObjectType[keyof ObjectType];
