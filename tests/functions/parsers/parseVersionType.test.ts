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
    const error = DataError.expectError(() => {
      parseVersionType("Invalid version type");
    });
    expect(error.data.input).toBe("Invalid version type");
    expect(error.code).toBe("INVALID_VERSION_TYPE");
    expect(error.message).toBe("The provided version type must be one of `major | minor | patch`");
  });
});
