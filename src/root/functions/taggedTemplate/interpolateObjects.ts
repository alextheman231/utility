/**
 * Returns the result of interpolating a template string, also stringifying objects.
 *
 * You can pass a template string directly by doing:
 *
 * ```typescript
 * interpolateObjects`Template string here ${{ my: "object" }}`;
 * ```
 *
 * @category Tagged Template
 *
 * @template InterpolationsType - The type of the interpolations.
 *
 * @param strings - The strings from the template to process.
 * @param interpolations - An array of all interpolations from the template.
 *
 * @returns A new string with the strings and interpolations from the template applied, with objects stringified.
 */
function interpolateObjects<const InterpolationsType extends readonly unknown[]>(
  strings: TemplateStringsArray,
  ...interpolations: InterpolationsType
): string {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i !== strings.length - 1) {
      result +=
        interpolations[i] && typeof interpolations[i] === "object"
          ? JSON.stringify(interpolations[i])
          : interpolations[i];
    }
  }
  return result;
}

export default interpolateObjects;
