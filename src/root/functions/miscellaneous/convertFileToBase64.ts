/* oxlint-disable unicorn/prefer-add-event-listener -- Is worth addressing this at some point but would require a larger refactor that I'd like to do some other time. */
import { DataError } from "src/v6";

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
      if (reader.result instanceof ArrayBuffer) {
        const decoder = new TextDecoder();
        resolve(decoder.decode(reader.result));
      } else {
        resolve(reader.result);
      }
    };
    reader.onerror = () => {
      reject(new Error("FILE_READER_ERROR"));
    };
  });
}

export default convertFileToBase64;
