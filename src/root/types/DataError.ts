import type { RecordKey } from "src/root/types/RecordKey";

import { normaliseIndents } from "src/root/functions";

export interface ExpectErrorOptions {
  expectedCode?: string;
}

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
  /**
   * Gets the thrown `DataError` from a given function if one was thrown, and re-throws any other errors, or throws a default `DataError` if no error thrown.
   *
   * @param errorFunction - The function expected to throw the error.
   * @param options - Extra options to apply.
   *
   * @throws {Error} Any other errors thrown by the `errorFunction` that are not a `DataError`.
   * @throws {DataError} If no `DataError` was thrown by the `errorFunction`
   *
   * @returns The `DataError` that was thrown by the `errorFunction`
   */
  public static expectError(errorFunction: () => unknown, options?: ExpectErrorOptions): DataError {
    try {
      errorFunction();
    } catch (error) {
      if (DataError.check(error)) {
        if (options?.expectedCode && error.code !== options.expectedCode) {
          throw new Error(
            normaliseIndents`The error code on the thrown error does not match the expected error code.
            
            Expected: ${options.expectedCode}
            Received: ${error.code}
            `,
            { cause: error },
          );
        }
        return error;
      }
      throw error;
    }
    throw new Error("Expected a DataError to be thrown but none was thrown");
  }
}

export default DataError;
