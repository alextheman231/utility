import { normaliseIndents } from "src/root/functions";

export interface ExpectErrorOptions<ErrorCode extends string = string> {
  expectedCode?: ErrorCode;
}

/**
 * Represents errors that can be described using a standardised error code, and a human-readable error message.
 *
 * @category Types
 *
 * @template ErrorCode The type of the standardised error code.
 */
class CodeError<ErrorCode extends string = string> extends Error {
  public code: ErrorCode;

  /**
   * @param code - A standardised code (e.g. UNEXPECTED_DATA).
   * @param message  - A human-readable error message (e.g. The data provided is invalid).
   * @param options - Extra options to pass to super Error constructor.
   */
  public constructor(
    code: ErrorCode,
    message: string = "Something went wrong.",
    options?: ErrorOptions,
  ) {
    super(message, options);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }

    this.name = new.target.name;
    this.code = code;

    Object.defineProperty(this, "message", { enumerable: true });
    Object.setPrototypeOf(this, new.target.prototype);
  }

  private static checkCaughtError<ErrorCode extends string = string>(
    error: unknown,
    options?: ExpectErrorOptions<ErrorCode>,
  ): CodeError<ErrorCode> {
    if (CodeError.check<ErrorCode>(error)) {
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

  /**
   * Checks whether the given input may have been caused by a CodeError.
   *
   * @param input - The input to check.
   *
   * @returns `true` if the input is a CodeError, and `false` otherwise. The type of the input will also be narrowed down to CodeError if `true`.
   */
  public static check<ErrorCode extends string = string>(
    input: unknown,
  ): input is CodeError<ErrorCode> {
    if (input instanceof CodeError) {
      return true;
    }

    return (
      typeof input === "object" &&
      input !== null &&
      "message" in input &&
      typeof input.message === "string" &&
      "code" in input &&
      typeof input.code === "string"
    );
  }
  /**
   * Gets the thrown `CodeError` from a given function if one was thrown, and re-throws any other errors, or throws a default `CodeError` if no error thrown.
   *
   * @param errorFunction - The function expected to throw the error.
   * @param options - Extra options to apply.
   *
   * @throws {Error} Any other errors thrown by the `errorFunction` that are not a `CodeError`.
   * @throws {Error} If no `CodeError` was thrown by the `errorFunction`
   *
   * @returns The `CodeError` that was thrown by the `errorFunction`
   */
  public static expectError<ErrorCode extends string = string>(
    errorFunction: () => unknown,
    options?: ExpectErrorOptions<ErrorCode>,
  ): CodeError<ErrorCode> {
    try {
      errorFunction();
    } catch (error) {
      return CodeError.checkCaughtError(error, options);
    }
    throw new Error("Expected a CodeError to be thrown but none was thrown");
  }
  /**
   * Gets the thrown `CodeError` from a given asynchronous function if one was thrown, and re-throws any other errors, or throws a default `CodeError` if no error thrown.
   *
   * @param errorFunction - The function expected to throw the error.
   * @param options - Extra options to apply.
   *
   * @throws {Error} Any other errors thrown by the `errorFunction` that are not a `CodeError`.
   * @throws {Error} If no `CodeError` was thrown by the `errorFunction`
   *
   * @returns The `CodeError` that was thrown by the `errorFunction`
   */
  public static async expectErrorAsync<ErrorCode extends string = string>(
    errorFunction: () => Promise<unknown>,
    options?: ExpectErrorOptions<ErrorCode>,
  ): Promise<CodeError<ErrorCode>> {
    try {
      await errorFunction();
    } catch (error) {
      return CodeError.checkCaughtError(error, options);
    }
    throw new Error("Expected a CodeError to be thrown but none was thrown");
  }
}

export default CodeError;
