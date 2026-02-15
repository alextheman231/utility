import type { RecordKey } from "src/root/types/RecordKey";

/**
 * Get the value types from a const object so the object can behave similarly to an enum.
 *
 * @category Types
 *
 * @template ObjectType - The type of the object to get the value types for.
 */
export type CreateEnumType<ObjectType extends Record<RecordKey, unknown>> =
  ObjectType[keyof ObjectType];
