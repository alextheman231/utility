import deepFreeze from "src/root/functions/recursive/deepFreeze";

/**
 * Creates a template strings array given a regular array of strings
 *
 * @category Tagged Template
 *
 * @param strings - The array of strings.
 *
 * @returns A template strings array that can be passed as the first argument of any tagged template function.
 */
function createTemplateStringsArray(strings: readonly string[]): TemplateStringsArray {
  return deepFreeze(Object.assign([...strings], { raw: [...strings] })) as TemplateStringsArray;
}

export default createTemplateStringsArray;
