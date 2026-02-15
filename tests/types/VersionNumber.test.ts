import { describe, expect, test } from "vitest";

import { VersionType } from "src/functions";
import { DataError, VersionNumber } from "src/types";

describe("VersionNumber", () => {
  describe("constructor", () => {
    test('Gets the valid major, minor, and patch versions from a given string not prefixed "v"', () => {
      const version = new VersionNumber("1.2.3");
      expect(version.major).toBe(1);
      expect(version.minor).toBe(2);
      expect(version.patch).toBe(3);
    });
    test('Gets the valid major, minor, and patch versions from a given string prefixed "v"', () => {
      const version = new VersionNumber("v2.3.4");
      expect(version.major).toBe(2);
      expect(version.minor).toBe(3);
      expect(version.patch).toBe(4);
    });
    test("Gets the valid major, minor, and patch version from a tuple of three numbers", () => {
      const version = new VersionNumber([3, 6, 2]);
      expect(version.major).toBe(3);
      expect(version.minor).toBe(6);
      expect(version.patch).toBe(2);
    });
    test("Creates a new instance of VersionNumber if a VersionNumber was already passed in", () => {
      const version = new VersionNumber([2, 3, 4]);
      expect(version.major).toBe(2);
      expect(version.minor).toBe(3);
      expect(version.patch).toBe(4);

      const versionCopy = new VersionNumber(version);
      expect(versionCopy.major).toBe(2);
      expect(versionCopy.minor).toBe(3);
      expect(versionCopy.patch).toBe(4);

      expect(versionCopy).not.toBe(version);
    });
    test("Throws a DataError if the version string is not valid", () => {
      try {
        new VersionNumber("hello");
        throw new Error("DID_NOT_THROW");
      } catch (error) {
        if (DataError.check(error)) {
          expect(error.code).toBe("INVALID_VERSION");
          expect(error.message).toBe(
            '"hello" is not a valid version number. Version numbers must be of the format "X.Y.Z" or "vX.Y.Z", where X, Y, and Z are non-negative integers.',
          );
          expect(error.data).toBe("hello");
        } else {
          throw error;
        }
      }
    });
    describe("VersionNumber.isEqual()", () => {
      test("Considers the same instance of VersionNumber to be equal", () => {
        const version = new VersionNumber([1, 2, 3]);
        expect(VersionNumber.isEqual(version, version)).toBe(true);
      });
      test("Considers two different instances with matching version numbers to be equal", () => {
        const firstVersion = new VersionNumber([1, 2, 3]);
        const secondVersion = new VersionNumber([1, 2, 3]);
        expect(VersionNumber.isEqual(firstVersion, secondVersion)).toBe(true);
        // Test the other way for commutativity
        expect(VersionNumber.isEqual(secondVersion, firstVersion)).toBe(true);
      });
      test("Considers differences instances that were initialised in different ways but resolve to the same version to be equal", () => {
        const versions = [
          new VersionNumber([1, 2, 3]),
          new VersionNumber("1.2.3"),
          new VersionNumber("v1.2.3"),
          new VersionNumber(new VersionNumber([1, 2, 3])),
        ];

        // Test all permutations
        for (const outerVersion of versions) {
          for (const innerVersion of versions) {
            expect(VersionNumber.isEqual(outerVersion, innerVersion)).toBe(true);
          }
        }
      });
      test("Considers two different instances that are actually different to be different", () => {
        const firstVersion = new VersionNumber([1, 2, 3]);
        const secondVersion = new VersionNumber([4, 5, 6]);

        expect(VersionNumber.isEqual(firstVersion, secondVersion)).toBe(false);
        expect(VersionNumber.isEqual(secondVersion, firstVersion)).toBe(false);
      });
    });
    test("Does not allow an invalid tuple.", () => {
      try {
        // @ts-expect-error: Not numbers
        new VersionNumber(["hello", "there", "world"]);
        throw new Error("DID_NOT_THROW");
      } catch (error) {
        if (DataError.check(error)) {
          expect(error.code).toBe("INTEGER_PARSING_ERROR");
        } else {
          throw error;
        }
      }

      try {
        // @ts-expect-error: Too many numbers
        new VersionNumber([1, 2, 3, 4]);
        throw new Error("DID_NOT_THROW");
      } catch (error) {
        if (DataError.check(error)) {
          expect(error.code).toBe("INVALID_LENGTH");
          expect(error.message).toBe("Input array must be a tuple of three non-negative integers.");
        } else {
          throw error;
        }
      }

      try {
        // @ts-expect-error: Too few numbers
        new VersionNumber([1, 2]);
        throw new Error("DID_NOT_THROW");
      } catch (error) {
        if (DataError.check(error)) {
          expect(error.code).toBe("INVALID_LENGTH");
          expect(error.message).toBe("Input array must be a tuple of three non-negative integers.");
        } else {
          throw error;
        }
      }

      try {
        new VersionNumber([-1, -2, -3]);
        throw new Error("DID_NOT_THROW");
      } catch (error) {
        if (DataError.check(error)) {
          expect(error.code).toBe("NEGATIVE_INPUTS");
          expect(error.message).toBe("Input array must be a tuple of three non-negative integers.");
        } else {
          throw error;
        }
      }
    });
  });

  describe(".toString()", () => {
    test('Returns the version string prefixed with "v"', () => {
      const version = new VersionNumber([1, 2, 3]);
      expect(version.toString()).toBe("v1.2.3");
    });
    test("Allows for an option to omit the prefix", () => {
      const version = new VersionNumber([1, 2, 3]);
      expect(version.toString({ omitPrefix: true })).toBe("1.2.3");
    });
    test("Implemented in a [Symbol.toPrimitive] method to allow it to nicely be coerced to the right string", () => {
      const version = new VersionNumber([1, 2, 3]);
      expect(`Version: ${version}`).toBe("Version: v1.2.3");
      // eslint-disable-next-line prefer-template
      expect("Version: " + version).toBe("Version: v1.2.3");
      expect(String(version)).toBe("v1.2.3");

      try {
        Number(new VersionNumber([1, 2, 3]));
        throw new Error("DID_NOT_THROW");
      } catch (error) {
        if (DataError.check(error)) {
          expect(error.code).toBe("INVALID_COERCION");
          expect(error.message).toBe("VersionNumber cannot be coerced to a number type.");
        } else {
          throw error;
        }
      }
    });
    test("Implemented in a .toJSON() method to allow it to nicely be coerced to the right string", () => {
      const version = new VersionNumber([1, 2, 3]);
      expect(JSON.stringify({ version })).toBe('{"version":"v1.2.3"}');
      expect(JSON.parse(JSON.stringify({ version })).version).toBe("v1.2.3");
    });
  });

  describe(".type", () => {
    test("Considers it a major version if minor and patch numbers are zero", () => {
      expect(new VersionNumber([1, 0, 0]).type).toBe(VersionType.MAJOR);
    });
    test("Considers it a minor version if only patch is zero", () => {
      expect(new VersionNumber([1, 2, 0]).type).toBe(VersionType.MINOR);
    });
    test("Considers it a patch version if no numbers are zero", () => {
      expect(new VersionNumber([1, 2, 3]).type).toBe(VersionType.PATCH);
    });
    test("Ignores zero major version", () => {
      expect(new VersionNumber([0, 1, 0]).type).toBe(VersionType.MINOR);
      expect(new VersionNumber([0, 1, 2]).type).toBe(VersionType.PATCH);
    });
  });

  describe(".increment()", () => {
    const inputVersion = new VersionNumber([1, 2, 3]);

    test.each<[VersionType, VersionNumber]>([
      ["major", new VersionNumber([2, 0, 0])],
      ["minor", new VersionNumber([1, 3, 0])],
      ["patch", new VersionNumber([1, 2, 4])],
    ])("Increments the %s version", (versionType, expectedVersion) => {
      const calculatedVersion = inputVersion.increment(versionType);
      expect(VersionNumber.isEqual(calculatedVersion, expectedVersion)).toBe(true);
    });

    describe.each<number>([2, 1, 0, -1])("Increment amounts", (incrementAmount) => {
      test.each<[VersionType, VersionNumber]>([
        ["major", new VersionNumber([1 + incrementAmount, 0, 0])],
        ["minor", new VersionNumber([1, 2 + incrementAmount, 0])],
        ["patch", new VersionNumber([1, 2, 3 + incrementAmount])],
      ])(`Increments the %s version by ${incrementAmount}`, (versionType, expectedVersion) => {
        const calculatedVersion = inputVersion.increment(versionType, incrementAmount);
        expect(VersionNumber.isEqual(calculatedVersion, expectedVersion)).toBe(true);
      });
    });

    test.each<VersionType>(["major", "minor", "patch"])(
      "Does not allow negative versions when decrementing %s",
      (versionType) => {
        const incrementAmount = -4;
        try {
          inputVersion.increment(versionType, incrementAmount);
          throw new Error("DID_NOT_THROW");
        } catch (error) {
          if (DataError.check(error)) {
            expect(error.data).toEqual({
              currentVersion: inputVersion.toString(),
              calculatedRawVersion: {
                major: `v${inputVersion.major + incrementAmount}.0.0`,
                minor: `v${inputVersion.major}.${inputVersion.minor + incrementAmount}.0`,
                patch: `v${inputVersion.major}.${inputVersion.minor}.${inputVersion.patch + incrementAmount}`,
              }[versionType],
              incrementAmount,
            });
            expect(error.code).toBe("NEGATIVE_VERSION");
          } else {
            throw error;
          }
        }
      },
    );

    test("Does not mutate the original version", () => {
      // Increment by major because I know for a fact that this will affect all numbers
      inputVersion.increment("major");
      expect(VersionNumber.isEqual(inputVersion, new VersionNumber([1, 2, 3]))).toBe(true);
    });

    test("Returns a new reference in memory", () => {
      const newVersion = inputVersion.increment("major");
      expect(newVersion).not.toBe(inputVersion);
    });
  });
});
