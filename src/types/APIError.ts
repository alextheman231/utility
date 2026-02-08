export type HTTPErrorCode = 400 | 401 | 403 | 404 | 418 | 500;

export const httpErrorCodeLookup: Record<HTTPErrorCode, string> = {
  400: "BAD_REQUEST",
  401: "UNAUTHORISED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  /* Supporting this one too because it's funny. You'll never use it in practice because 
                why would an error give a teapot, but it's funny. Do not question me. */
  418: "I_AM_A_TEAPOT",
  500: "INTERNAL_SERVER_ERROR",
};

/**
 * Represents common errors you may get from a HTTP API request.
 *
 * @category Types
 */
class APIError extends Error {
  public status: number;

  /**
   * @param status - A HTTP status code. Can be any number, but numbers between 400 and 600 are encouraged to fit with HTTP status code conventions.
   * @param message - An error message to display alongside the status code.
   * @param options - Extra options to be passed to super Error constructor.
   */
  public constructor(
    status: HTTPErrorCode | number = 500,
    message?: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.status = status;
    if (message) {
      this.message = message;
    } else {
      this.message = httpErrorCodeLookup[this.status as HTTPErrorCode] ?? "API_ERROR";
    }
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
  public static check(input: unknown): input is APIError {
    if (input instanceof APIError) {
      return true;
    }

    const data: any = input;
    return (
      typeof data === "object" &&
      data !== null &&
      typeof data?.status === "number" &&
      typeof data?.message === "string"
    );
  }
}

export default APIError;
