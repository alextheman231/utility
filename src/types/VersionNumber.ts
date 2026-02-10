import z from "zod";

import { VERSION_NUMBER_REGEX } from "src/constants";
import { parseIntStrict, VersionType } from "src/functions";
import DataError from "src/types/DataError";

/**
 * Options to apply to the stringification of the version number.
 *
 * @category Class Options
 */
export interface VersionNumberToStringOptions {
  /** Whether you want to omit the "v" prefix or not (defaults to false). */
  omitPrefix?: boolean;
}

/**
 * Represents a software version number, considered to be made up of a major, minor, and patch part.
 *
 * @category Types
 */
class VersionNumber {
  private static readonly NON_NEGATIVE_TUPLE_ERROR =
    "Input array must be a tuple of three non-negative integers.";

  /** The major number. Increments when a feature is removed or changed in a way that is not backwards-compatible with the previous release. */
  public readonly major: number = 0;
  /** The minor number. Increments when a new feature is added/deprecated and is expected to be backwards-compatible with the previous release. */
  public readonly minor: number = 0;
  /** The patch number. Increments when the next release is fixing a bug or doing a small refactor that should not be noticeable in practice. */
  public readonly patch: number = 0;

  /**
   * @param input - The input to create a new instance of `VersionNumber` from.
   */
  public constructor(input: string | [number, number, number] | VersionNumber) {
    if (input instanceof VersionNumber) {
      this.major = input.major;
      this.minor = input.minor;
      this.patch = input.patch;
    } else if (typeof input === "string") {
      if (!RegExp(VERSION_NUMBER_REGEX).test(input)) {
        throw new DataError(
          input,
          "INVALID_VERSION",
          `"${input}" is not a valid version number. Version numbers must be of the format "X.Y.Z" or "vX.Y.Z", where X, Y, and Z are non-negative integers.`,
        );
      }
      const nonPrefixedString = VersionNumber.formatString(input, { omitPrefix: true });

      const [major, minor, patch] = nonPrefixedString.split(".").map((number) => {
        return parseIntStrict(number);
      });

      this.major = major;
      this.minor = minor;
      this.patch = patch;
    } else if (Array.isArray(input)) {
      if (input.length !== 3) {
        throw new DataError(input, "INVALID_LENGTH", VersionNumber.NON_NEGATIVE_TUPLE_ERROR);
      }
      const [major, minor, patch] = input.map((number) => {
        const parsedInteger = parseIntStrict(number?.toString());
        if (parsedInteger < 0) {
          throw new DataError(input, "NEGATIVE_INPUTS", VersionNumber.NON_NEGATIVE_TUPLE_ERROR);
        }
        return parsedInteger;
      });
      this.major = major;
      this.minor = minor;
      this.patch = patch;
    }
  }

  /**
   * Gets the current version type of the current instance of `VersionNumber`.
   *
   * @returns Either `"major"`, `"minor"`, or `"patch"`, depending on the version type.
   */
  public get type(): VersionType {
    if (this.minor === 0 && this.patch === 0) {
      return VersionType.MAJOR;
    }
    if (this.patch === 0) {
      return VersionType.MINOR;
    }
    return VersionType.PATCH;
  }

  private static formatString(input: string, options?: VersionNumberToStringOptions) {
    if (options?.omitPrefix) {
      return input.startsWith("v") ? input.slice(1) : input;
    }
    return input.startsWith("v") ? input : `v${input}`;
  }

  /**
   * Checks if the provided version numbers have the exact same major, minor, and patch numbers.
   *
   * @param firstVersion - The first version number to compare.
   * @param secondVersion - The second version number to compare.
   *
   * @returns `true` if the provided version numbers have exactly the same major, minor, and patch numbers, and returns `false` otherwise.
   */
  public static isEqual(firstVersion: VersionNumber, secondVersion: VersionNumber): boolean {
    return (
      firstVersion.major === secondVersion.major &&
      firstVersion.minor === secondVersion.minor &&
      firstVersion.patch === secondVersion.patch
    );
  }

  /**
   * Increments the current version number by the given increment type, returning the result as a new reference in memory.
   *
   * @param incrementType - The type of increment. Can be one of the following:
   * - `"major"`: Change the major version `v1.2.3` → `v2.0.0`
   * - `"minor"`: Change the minor version `v1.2.3` → `v1.3.0`
   * - `"patch"`: Change the patch version `v1.2.3` → `v1.2.4`
   *
   * @returns A new instance of `VersionNumber` with the increment applied.
   */
  public increment(incrementType: VersionType): VersionNumber {
    return {
      major: new VersionNumber([this.major + 1, 0, 0]),
      minor: new VersionNumber([this.major, this.minor + 1, 0]),
      patch: new VersionNumber([this.major, this.minor, this.patch + 1]),
    }[incrementType];
  }
  /**
   * Ensures that the VersionNumber behaves correctly when attempted to be coerced to a string.
   *
   * @param hint - Not used as of now, but generally used to help with numeric coercion, I think (which we most likely do not need for version numbers).
   *
   * @returns A stringified representation of the current version number, prefixed with `v`.
   */
  public [Symbol.toPrimitive](hint: "default" | "string" | "number"): string {
    if (hint === "number") {
      throw new DataError(
        this.toString(),
        "INVALID_COERCION",
        "VersionNumber cannot be coerced to a number type.",
      );
    }
    return this.toString();
  }
  /**
   * Ensures that the VersionNumber behaves correctly when attempted to be converted to JSON.
   *
   * @returns A stringified representation of the current version number, prefixed with `v`.
   */
  public toJSON(): string {
    return this.toString();
  }
  /**
   * Get a string representation of the current version number.
   *
   * @param options - Extra additional options to apply.
   *
   * @returns A stringified representation of the current version number, leaving out the prefix if `omitPrefix` option was set to true.
   */
  public toString(options?: VersionNumberToStringOptions): string {
    const rawString = `${this.major}.${this.minor}.${this.patch}`;
    return VersionNumber.formatString(rawString, options);
  }
}

export const zodVersionNumber: z.ZodType<VersionNumber> = z
  .union([z.string(), z.tuple([z.number(), z.number(), z.number()]), z.instanceof(VersionNumber)])
  .transform((rawVersionNumber) => {
    return new VersionNumber(rawVersionNumber);
  });

export default VersionNumber;
