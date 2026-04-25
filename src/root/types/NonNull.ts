/**
 * Removes `null` from a type.
 *
 * @category Types
 *
 * @template InputType - The type to check.
 */
export type NonNull<InputType> = InputType extends null ? never : InputType;
