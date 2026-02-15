/**
 * Gets the individual element types from an array type.
 *
 * @category Types
 *
 * @template ArrayType - The type of the array itself.
 */
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
