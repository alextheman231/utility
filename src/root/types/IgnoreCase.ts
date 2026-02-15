/**
 * Allows case-insensitive variants of a known string type.
 *
 * @category Types
 *
 * @template StringType - The input string type.
 */
export type IgnoreCase<StringType extends string> = string extends StringType
  ? string
  : StringType extends `${infer FirstCharacter}${infer SecondCharacter}${infer Remainder}`
    ? `${Uppercase<FirstCharacter> | Lowercase<FirstCharacter>}${Uppercase<SecondCharacter> | Lowercase<SecondCharacter>}${IgnoreCase<Remainder>}`
    : StringType extends `${infer FirstCharacter}${infer Remainder}`
      ? `${Uppercase<FirstCharacter> | Lowercase<FirstCharacter>}${IgnoreCase<Remainder>}`
      : "";
