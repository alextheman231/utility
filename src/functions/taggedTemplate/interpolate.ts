import paralleliseArrays from "src/functions/arrayHelpers/paralleliseArrays";

/**
 * Returns the result of interpolating a template string when given the strings and interpolations separately.
 *
 * You can pass a template string directly by doing:
 *
 * ```
 * interpolate`Template string here`;
 * ```
 *
 * In this case, it will be functionally the same as if you just wrote the template string by itself.
 *
 * @category Tagged Template
 *
 * @template InterpolationsType - The type of the interpolations.
 *
 * @param strings - The strings from the template to process.
 * @param interpolations - An array of all interpolations from the template.
 *
 * @returns A new string with the strings and interpolations from the template applied.
 */
function interpolate<const InterpolationsType extends readonly unknown[]>(
  strings: TemplateStringsArray,
  ...interpolations: InterpolationsType
): string {
  let result = "";
  for (const [string, interpolation = ""] of paralleliseArrays(strings, interpolations)) {
    result += string + interpolation;
  }
  return result;
}

export default interpolate;
