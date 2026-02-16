import type { RecordKey } from "src/root/types/RecordKey";

/**
 * Represents errors you may get that may've been caused by a specific piece of data.
 *
 * @category Types
 *
 * @template DataType - The type of the data that caused the error.
 */
class DataError<
  DataType extends Record<RecordKey, unknown> = Record<RecordKey, unknown>,
> extends Error {
  public code: string;
  public data: DataType;

  /**
   * @param data - The data that caused the error.
   * @param code - A standardised code (e.g. UNEXPECTED_DATA).
   * @param message  - A human-readable error message (e.g. The data provided is invalid).
   * @param options - Extra options to pass to super Error constructor.
   */
  public constructor(
    data: DataType,
    code: string = "INVALID_DATA",
    message: string = "The data provided is invalid",
    options?: ErrorOptions,
  ) {
    super(message, options);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }

    this.name = new.target.name;
    this.code = code;
    this.data = data;

    Object.defineProperty(this, "message", { enumerable: true });
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Checks whether the given input may have been caused by a DataError.
   *
   * @param input - The input to check.
   *
   * @returns `true` if the input is a DataError, and `false` otherwise. The type of the input will also be narrowed down to DataError if `true`.
   */
  public static check<DataType extends Record<RecordKey, unknown> = Record<RecordKey, unknown>>(
    input: unknown,
  ): input is DataError<DataType> {
    if (input instanceof DataError) {
      return true;
    }

    const data: any = input;
    return (
      typeof data === "object" &&
      data !== null &&
      typeof data.message === "string" &&
      typeof data.code === "string" &&
      "data" in data
    );
  }
}

export default DataError;
