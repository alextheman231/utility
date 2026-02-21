import { DataError } from "src/root/types";

/**
 * Asynchronously converts a file to a base 64 string
 *
 * @category Miscellaneous
 *
 * @param file - The file to convert.
 *
 * @throws {Error | DataError} If the file reader gives an error.
 *
 * @returns A promise that resolves to the encoded base 64 string.
 */
function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result === null) {
        reject(
          new DataError(
            { result: reader.result },
            "FILE_CONVERSION_ERROR",
            "Could not convert the given file.",
          ),
        );
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
