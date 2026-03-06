/**
 * Gets the individual element types from an array type.
 *
 * @category Types
 *
 * @template ArrayType - The type of the array itself.
 */
export type ArrayElement<ArrayType extends ReadonlyArray<unknown>> =
  ArrayType extends ReadonlyArray<infer ElementType> ? ElementType : never;
