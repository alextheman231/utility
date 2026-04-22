import type { CreateEnumType } from "src/root";

import CodeError from "src/v6/CodeError";

type DefaultDataErrorCode = "INVALID_DATA";

export interface ExpectErrorOptions<ErrorCode extends string = DefaultDataErrorCode> {
  expectedCode?: ErrorCode | DefaultDataErrorCode;
}

export const DataErrorCode = {
  INVALID_DATA: "INVALID_DATA",
} as const;

export type DataErrorCode = CreateEnumType<typeof DataErrorCode>;

/**
 * Represents errors you may get that may've been caused by a specific piece of data.
 *
 * @category Types
 *
 * @template DataType - The type of the data that caused the error.
 */
class DataError<
  DataType extends object = Record<PropertyKey, unknown>,
  ErrorCode extends string = DataErrorCode,
> extends CodeError<ErrorCode | DataErrorCode> {
  public data: DataType;

  /**
   * @param data - The data that caused the error.
   * @param code - A standardised code (e.g. UNEXPECTED_DATA).
   * @param message  - A human-readable error message (e.g. The data provided is invalid).
   * @param options - Extra options to pass to super Error constructor.
   */
  public constructor(
    data: DataType,
    code: ErrorCode | DefaultDataErrorCode = "INVALID_DATA",
    message: string = "The data provided is invalid",
    options?: ErrorOptions,
  ) {
    super(code, message, options);
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
  public static override check(input: unknown): input is DataError {
    if (input instanceof DataError) {
      return true;
    }

    return (
      typeof input === "object" &&
      input !== null &&
      "message" in input &&
      typeof input.message === "string" &&
      "code" in input &&
      typeof input.code === "string" &&
      "data" in input
    );
  }
  /**
   * Gets the thrown `DataError` from a given function if one was thrown, and re-throws any other errors, or throws a default `DataError` if no error thrown.
   *
   * @param errorFunction - The function expected to throw the error.
   * @param options - Extra options to apply.
   *
   * @throws {Error} Any other errors thrown by the `errorFunction` that are not a `DataError`.
   * @throws {Error} If no `DataError` was thrown by the `errorFunction`
   *
   * @returns The `DataError` that was thrown by the `errorFunction`
   */
  public static override expectError<
    DataType extends Record<PropertyKey, unknown>,
    ErrorCode extends string = DefaultDataErrorCode,
  >(
    errorFunction: () => unknown,
    options?: ExpectErrorOptions<ErrorCode>,
  ): DataError<DataType, ErrorCode> {
    return super.expectError(errorFunction, options) as DataError<DataType, ErrorCode>;
  }
  /**
   * Gets the thrown `DataError` from a given asynchronous function if one was thrown, and re-throws any other errors, or throws a default `DataError` if no error thrown.
   *
   * @param errorFunction - The function expected to throw the error.
   * @param options - Extra options to apply.
   *
   * @throws {Error} Any other errors thrown by the `errorFunction` that are not a `DataError`.
   * @throws {Error} If no `DataError` was thrown by the `errorFunction`
   *
   * @returns The `DataError` that was thrown by the `errorFunction`
   */
  public static override async expectErrorAsync<
    DataType extends Record<PropertyKey, unknown>,
    ErrorCode extends string = DefaultDataErrorCode,
  >(
    errorFunction: () => Promise<unknown>,
    options?: ExpectErrorOptions<ErrorCode>,
  ): Promise<DataError<DataType, ErrorCode>> {
    return (await super.expectErrorAsync(errorFunction, options)) as DataError<DataType, ErrorCode>;
  }
}

export default DataError;
