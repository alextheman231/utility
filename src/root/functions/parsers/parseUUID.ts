import { UUID_REGEX } from "src/root/constants";
import { DataError } from "src/root/types";

/**
 * Parses the input and verifies it is a valid UUID.
 *
 * @category Parsers
 *
 * @param input - The data to parse.
 *
 * @throws {DataError} If the data does not match the general UUID pattern.
 *
 * @returns The UUID again if successful.
 */
function parseUUID(input: unknown): string {
  if (!(typeof input === "string")) {
    throw new DataError({ input }, "INVALID_TYPE", "Invalid type - expected string.");
  }

  if (!UUID_REGEX.test(input)) {
    throw new DataError(
      { input },
      "INVALID_UUID",
      "The provided input does not match the expected shape for a UUID.",
    );
  }

  return input;
}

export default parseUUID;
