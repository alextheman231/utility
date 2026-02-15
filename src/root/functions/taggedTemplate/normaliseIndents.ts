import fillArray from "src/root/functions/arrayHelpers/fillArray";
import interpolate from "src/root/functions/taggedTemplate/interpolate";

/**
 * Options to apply to the normalisation of indents in multi-line template strings
 *
 * @category Function Options
 */
export interface NormaliseIndentsOptions {
  /** Whether to preserve extra tabs or not (defaults to true) */
  preserveTabs?: boolean;
}
export type NormalizeIndentsOptions = NormaliseIndentsOptions;

function calculateTabSize(line: string, whitespaceLength: number): number {
  const potentialWhitespacePart = line.slice(0, whitespaceLength);
  const trimmedString = line.trimStart();

  if (potentialWhitespacePart.trim() !== "") {
    return 0;
  }

  const tabSize = line.length - (trimmedString.length + whitespaceLength);

  return tabSize < 0 ? 0 : tabSize;
}

function getWhitespaceLength(lines: string[]): number {
  const [firstNonEmptyLine] = lines.filter((line) => {
    return line.trim() !== "";
  });
  return firstNonEmptyLine.length - firstNonEmptyLine.trimStart().length;
}

function reduceLines(lines: string[], { preserveTabs = true }: NormaliseIndentsOptions): string {
  const slicedLines = lines.slice(1);
  const isFirstLineEmpty = lines[0].trim() === "";
  const whitespaceLength = getWhitespaceLength(isFirstLineEmpty ? lines : slicedLines);

  return (isFirstLineEmpty ? slicedLines : lines)
    .map((line) => {
      const tabSize = calculateTabSize(line, whitespaceLength);
      return (
        (preserveTabs
          ? fillArray(() => {
              return " ";
            }, tabSize).join("")
          : "") + line.trimStart()
      );
    })
    .join("\n");
}

export type NormaliseIndentsFunction = (
  strings: TemplateStringsArray,
  ...interpolations: unknown[]
) => string;
export type NormalizeIndentsFunction = NormaliseIndentsFunction;

/**
 * Provides a new function that removes any extraneous indents from a multi-line template string, with the given options applied.
 *
 * @category Tagged Template
 *
 * @param options - The options to apply.
 *
 * @returns A function that takes a template string, and returns a new string with the strings and interpolations from the template applied, and extraneous indents removed.
 */
function normaliseIndents(options: NormaliseIndentsOptions): NormaliseIndentsFunction;
/**
 * Removes any extraneous indents from a multi-line template string.
 *
 * You can pass a template string directly by doing:
 *
 * ```typescript
 * normaliseIndents`Template string here
 *     with a new line
 *     and another new line`;
 * ```
 *
 * @template InterpolationsType - The type of the interpolations.
 *
 * @param strings - The strings from the template to process.
 * @param interpolations - An array of all interpolations from the template.
 *
 * @returns A new string with the strings and interpolations from the template applied, and extraneous indents removed.
 */
function normaliseIndents(strings: TemplateStringsArray, ...interpolations: unknown[]): string;

/**
 * Applies any options if provided, then removes any extraneous indents from a multi-line template string.
 *
 * You can pass a template string directly by doing:
 *
 * ```typescript
 * normaliseIndents`Template string here
 *     with a new line
 *     and another new line`;
 * ```
 *
 * You may also pass the options first, then invoke the resulting function with a template string:
 *
 * ```typescript
 * normaliseIndents({ preserveTabs: false })`Template string here
 *     with a new line
 *     and another new line`;
 * ```
 *
 * @category Tagged Template
 *
 * @param first - The strings from the template to process, or the options to apply.
 * @param args - An array of all interpolations from the template.
 *
 * @returns An additional function to invoke, or a new string with the strings and interpolations from the template applied, and extraneous indents removed.
 */
function normaliseIndents(
  first: TemplateStringsArray | NormaliseIndentsOptions,
  ...args: unknown[]
): string | NormaliseIndentsFunction {
  if (typeof first === "object" && first !== null && !Array.isArray(first)) {
    const options = first as NormaliseIndentsOptions;
    return (strings: TemplateStringsArray, ...interpolations: unknown[]) => {
      return normaliseIndents(strings, ...interpolations, options);
    };
  }

  const strings = first as TemplateStringsArray;
  const options: NormaliseIndentsOptions =
    typeof args[args.length - 1] === "object" && !Array.isArray(args[args.length - 1])
      ? (args.pop() as NormaliseIndentsOptions)
      : {};
  const interpolations = [...args];

  const fullString = interpolate(strings, ...interpolations);
  return reduceLines(fullString.split("\n"), options);
}

/* eslint-disable jsdoc/require-tags */
/**
 * Applies any options if provided, then removes any extraneous indents from a multi-line template string.
 *
 * You can pass a template string directly by doing:
 *
 * ```typescript
 * normalizeIndents`Template string here
 *     with a new line
 *     and another new line`.
 * ```
 *
 * You may also pass the options first, then invoke the resulting function with a template string:
 *
 * ```typescript
 * normalizeIndents({ preserveTabs: false })`Template string here
 *     with a new line
 *     and another new line`.
 * ```
 *
 * @param first - The strings from the template to process, or the options to apply.
 * @param args - An array of all interpolations from the template.
 *
 * @returns An additional function to invoke, or a new string with the strings and interpolations from the template applied, and extraneous indents removed.
 */
export const normalizeIndents = normaliseIndents;
/* eslint-enable */

export default normaliseIndents;
