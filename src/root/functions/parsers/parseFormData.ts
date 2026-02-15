/**
 * Returns a parsed object given FormData and a data parser function to call on the resulting object.
 *
 * @template DataType - The type of the resulting object when called from the dataParser.
 *
 * @param formData - The FormData to parse.
 * @param dataParser - A parser to call on the object before it gets returned.
 *
 * @returns A parsed object based on the contents of the input formData and the result of parsing with the data parser.
 */
function parseFormData<DataType>(
  formData: FormData,
  dataParser: (data: Record<string, string | Blob>) => DataType,
): DataType;
/**
 * Returns an object given FormData.
 *
 * @param formData - The FormData to parse.
 *
 * @returns An object based on the contents of the input formData.
 */
function parseFormData(formData: FormData): Record<string, string | Blob>;

/**
 * Returns an object given FormData and an optional data parser function to call on the resulting object.
 *
 * @category Parsers
 *
 * @template DataType - The type of the resulting object when called from the dataParser.
 *
 * @param formData - The FormData to parse.
 * @param dataParser - An optional parser to call on the object before it gets returned.
 *
 * @returns A parsed object based on the contents of the input formData and the result of parsing with the data parser if provided.
 */
function parseFormData<DataType>(
  formData: FormData,
  dataParser?: (data: Record<string, string | Blob>) => DataType,
): Record<string, string | Blob> | DataType {
  const object: Record<string, string | Blob> = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });

  if (dataParser) {
    return dataParser(object);
  }
  return object;
}

export default parseFormData;
