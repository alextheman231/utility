import type { CreateEnumType } from "src/root";
import type { ExpectErrorOptions } from "src/v6/CodeError";

import CodeError from "src/v6/CodeError";

export const httpErrorCodeLookup = {
  400: "BAD_REQUEST",
  401: "UNAUTHORISED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  // Supporting this one too because it's funny.
  // You'll never use it in practice because why would an error give a teapot, but it's funny. Do not question me.
  418: "I_AM_A_TEAPOT",
  500: "INTERNAL_SERVER_ERROR",
} as const;

export type HTTPErrorCode = keyof typeof httpErrorCodeLookup;
export type APIErrorCode = CreateEnumType<typeof httpErrorCodeLookup>;

/**
 * Represents common errors you may get from a HTTP API request.
 *
 * @category Types
 *
 * @template DataType The type of the data that caused the error.
 * @template ErrorCode The type of the standardised error code.
 */
class APIError<
  DataType extends object = Record<PropertyKey, unknown>,
  ErrorCode extends string = string,
> extends CodeError<ErrorCode> {
  public data?: DataType;
  public status: number;

  /**
   * @param status - A HTTP status code. Can be any number, but numbers between 400 and 600 are encouraged to fit with HTTP status code conventions.
   * @param code - A standardised code (e.g. UNEXPECTED_DATA).
   * @param message - A human-readable error message (e.g. The data provided is invalid).
   * @param data - The data that caused the error.
   * @param options - Extra options to be passed to super Error constructor.
   */
  public constructor(
    status: number,
    code: ErrorCode,
    message: string = "There was an error with your API request.",
    data?: DataType,
    options?: ErrorOptions,
  ) {
    super(code, message, options);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }

    this.data = data;
    this.name = new.target.name;
    this.status = status;

    Object.defineProperty(this, "message", { enumerable: true });
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Checks whether the given input may have been caused by an APIError.
   *
   * @param input - The input to check.
   *
   * @returns `true` if the input is an APIError, and `false` otherwise. The type of the input will also be narrowed down to APIError if `true`.
   */
  public static check<
    DataType extends object = Record<PropertyKey, unknown>,
    ErrorCode extends string = string,
  >(input: unknown): input is APIError<DataType, ErrorCode> {
    if (input instanceof APIError) {
      return true;
    }

    return (
      typeof input === "object" &&
      input !== null &&
      "status" in input &&
      typeof input.status === "number" &&
      "code" in input &&
      typeof input.code === "string" &&
      "message" in input &&
      typeof input.message === "string" &&
      (!("data" in input) ||
        input.data === undefined ||
        (typeof input.data === "object" && input.data !== null))
    );
  }
  /**
   * Check an `APIError` against its error code
   *
   * This will also automatically narrow down the type of the input to be `APIError`, with its error code properly typed if this function returns true.
   *
   * @template ErrorCode The type of the error code
   *
   * @param input - The input to check.
   * @param code - The expected code of the resulting error.
   *
   * @returns `true` if the error code matches the expected code, and `false` otherwise. The type of the input will also be narrowed down to `APIError`, and its code will be narrowed to the expected code's type if the function returns `true`.
   */
  public static checkWithCode<
    DataType extends object = Record<PropertyKey, unknown>,
    ErrorCode extends string = string,
  >(input: unknown, code: ErrorCode): input is APIError<DataType, ErrorCode> {
    return this.check(input) && input.code === code;
  }
  /**
   * Gets the thrown `APIError` from a given function if one was thrown, and re-throws any other errors, or throws a default `APIError` if no error thrown.
   *
   * @param errorFunction - The function expected to throw the error.
   * @param options - Extra options to apply.
   *
   * @throws {Error} Any other errors thrown by the `errorFunction` that are not a `APIError`.
   * @throws {Error} If no `APIError` was thrown by the `errorFunction`
   *
   * @returns The `APIError` that was thrown by the `errorFunction`
   */
  public static override expectError<
    DataType extends Record<PropertyKey, unknown>,
    ErrorCode extends string = string,
  >(
    errorFunction: () => unknown,
    options?: ExpectErrorOptions<ErrorCode>,
  ): APIError<DataType, ErrorCode> {
    return super.expectError(errorFunction, options) as APIError<DataType, ErrorCode>;
  }
  /**
   * Gets the thrown `APIError` from a given asynchronous function if one was thrown, and re-throws any other errors, or throws a default `APIError` if no error thrown.
   *
   * @param errorFunction - The function expected to throw the error.
   * @param options - Extra options to apply.
   *
   * @throws {Error} Any other errors thrown by the `errorFunction` that are not a `APIError`.
   * @throws {Error} If no `APIError` was thrown by the `errorFunction`
   *
   * @returns The `APIError` that was thrown by the `errorFunction`
   */
  public static override async expectErrorAsync<
    DataType extends Record<PropertyKey, unknown>,
    ErrorCode extends string = string,
  >(
    errorFunction: () => Promise<unknown>,
    options?: ExpectErrorOptions<ErrorCode>,
  ): Promise<APIError<DataType, ErrorCode>> {
    return (await super.expectErrorAsync(errorFunction, options)) as APIError<DataType, ErrorCode>;
  }
  /**
   * Create a new `APIError` with the error code derived from the status directly.
   *
   * @param status - A HTTP status code. Must be one of the supported error codes from our custom `httpErrorCodeLookup`.
   * @param message - A human-readable error message (e.g. The data provided is invalid).
   * @param data - The data that caused the error.
   * @param options - Extra options to be passed to super Error constructor.
   *
   * @returns A new `APIError` with the error code derived from the status code.
   */
  public static fromStatus<DataType extends object = Record<PropertyKey, unknown>>(
    status: HTTPErrorCode,
    message?: string,
    data?: DataType,
    options?: ErrorOptions,
  ): APIError<DataType, APIErrorCode> {
    const code: APIErrorCode = httpErrorCodeLookup[status];
    return new APIError<DataType, APIErrorCode>(status, code, message, data, options);
  }
}

export default APIError;
