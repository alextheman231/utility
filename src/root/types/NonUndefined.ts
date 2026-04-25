/**
 * Removes `undefined` from a type.
 *
 * @category Types
 *
 * @template InputType - The type to check.
 */
export type NonUndefined<InputType> = InputType extends undefined ? never : InputType;
