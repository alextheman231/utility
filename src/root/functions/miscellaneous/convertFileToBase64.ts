/**
 * Asynchronously converts a file to a base 64 string
 *
 * @category Miscellaneous
 *
 * @param file - The file to convert.
 *
 * @throws {Error} If the file reader gives an error.
 *
 * @returns A promise that resolves to the encoded base 64 string.
 */
function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result === null) {
        reject(new Error("FILE_CONVERSION_ERROR"));
        return;
      }
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error("FILE_READER_ERROR"));
    };
  });
}

export default convertFileToBase64;
