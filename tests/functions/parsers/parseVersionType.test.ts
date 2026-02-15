import type { VersionType } from "src/root/functions";

import { describe, expect, test } from "vitest";

import { parseVersionType } from "src/root/functions";
import { DataError } from "src/root/types";

describe("parseVersionType", () => {
  test("Is successful when input is a valid version type", () => {
    const majorInput: VersionType = "major";
    expect(parseVersionType(majorInput)).toBe("major");

    const minorInput: VersionType = "minor";
    expect(parseVersionType(minorInput)).toBe("minor");

    const patchInput: VersionType = "patch";
    expect(parseVersionType(patchInput)).toBe("patch");
  });
  test("Throws an error when input is not a valid version type", () => {
    try {
      parseVersionType("Invalid version type");
      throw new Error("DID_NOT_THROW");
    } catch (error: unknown) {
      if (error instanceof DataError) {
        expect(error.data).toBe("Invalid version type");
        expect(error.code).toBe("INVALID_VERSION_TYPE");
        expect(error.message).toBe(
          "The provided version type must be one of `major | minor | patch`",
        );
      } else {
        throw error;
      }
    }
  });
});
