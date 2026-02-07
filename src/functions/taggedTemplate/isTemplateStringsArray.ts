/**
 * Determines whether or not the input is a valid `TemplateStringsArray`.
 *
 * @category Tagged Template
 *
 * @param input - The input to check
 *
 * @returns `true` if the input is a valid `TemplateStringsArray`, and false otherwise. The type of the input will also be narrowed down to `TemplateStringsArray` if `true`.
 */
function isTemplateStringsArray(input: unknown): input is TemplateStringsArray {
  return typeof input === "object" && input !== null && "raw" in input;
}

export default isTemplateStringsArray;
