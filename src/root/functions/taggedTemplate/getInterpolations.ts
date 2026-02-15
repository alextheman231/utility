/**
 *
 * Gets the strings and interpolations separately from a template string.
 * You can pass a template string directly by doing:
 *
 * ```typescript
 * getInterpolations`Template string here`.
 * ```
 *
 * @category Tagged Template
 *
 * @deprecated Please use `getStringsAndInterpolations` instead.
 *
 * @param strings - The strings from the template to process.
 * @param interpolations - An array of all interpolations from the template.
 *
 * @returns A tuple where the first item is the strings from the template, and the second is the interpolations.
 */
function getInterpolations(
  strings: TemplateStringsArray,
  ...interpolations: unknown[]
): [TemplateStringsArray, unknown[]] {
  return [strings, interpolations];
}

export default getInterpolations;
