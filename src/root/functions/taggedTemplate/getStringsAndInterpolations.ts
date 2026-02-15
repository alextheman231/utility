import createTemplateStringsArray from "src/root/functions/taggedTemplate/createTemplateStringsArray";
import { DataError } from "src/root/types";

/**
 *
 * Gets the strings and interpolations separately from a template string.
 * You can pass a template string directly by doing:
 *
 * ```typescript
 * getStringsAndInterpolations`Template string here`;
 * ```
 *
 * @category Tagged Template
 *
 * @template InterpolationsType - The type of the interpolations.
 *
 * @param strings - The strings from the template to process.
 * @param interpolations - An array of all interpolations from the template.
 *
 * @returns A tuple where the first item is the strings from the template, and the remaining items are the interpolations.
 *
 * The return of this function may also be spread into any other tagged template function in the following way:
 *
 * ```typescript
 * import { interpolate } from "@alextheman/utility"; // Example function
 *
 * const packageName = "@alextheman/utility";
 * const packageManager = getPackageManager(packageName);
 *
 * interpolate(...getStringsAndInterpolations`The package ${packageName} uses the ${packageManager} package manager.`);
 * ```
 */
function getStringsAndInterpolations<const InterpolationsType extends readonly unknown[]>(
  strings: TemplateStringsArray,
  ...interpolations: InterpolationsType
): [TemplateStringsArray, ...InterpolationsType] {
  if (strings.length !== interpolations.length + 1) {
    throw new DataError(
      {
        stringsLength: strings.length,
        interpolationsLength: interpolations.length,
        strings,
        interpolations,
      },
      "INVALID_STRINGS_AND_INTERPOLATIONS_LENGTH",
      "The length of the strings must be exactly one more than the length of the interpolations.",
    );
  }
  return [createTemplateStringsArray(strings), ...interpolations];
}

export default getStringsAndInterpolations;
