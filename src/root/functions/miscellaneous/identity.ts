/**
 * Gives back the original input.
 *
 * @template InputType - The input type.
 *
 * @param input - The input value.
 *
 * @returns The original input value.
 */
function identity<InputType>(input: InputType): InputType {
  return input;
}

export default identity;
