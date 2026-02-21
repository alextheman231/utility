import { describe, expect, test } from "vitest";

import path from "node:path";

import parseFilePath from "src/node/functions/parseFilePath";
import { DataError } from "src/root/types";

describe("parseFilePath", () => {
  test("When given a valid file path, it should return an object that gives the directory name, base name, and the full path.", () => {
    const { directory, base, fullPath } = parseFilePath("src/root/functions/index.ts");
    expect(directory).toBe("src/root/functions");
    expect(base).toBe("index.ts");
    expect(fullPath).toBe("src/root/functions/index.ts");
  });

  test("Allows just a file, where it contains a dot but no slash.", () => {
    const { directory, base, fullPath } = parseFilePath("index.ts");
    expect(directory).toBe("");
    expect(base).toBe("index.ts");
    expect(fullPath).toBe("index.ts");
  });

  test("Does not allow a file name with no dot or no slash.", () => {
    const error = DataError.expectError(() => {
      parseFilePath("index");
    });

    expect(error.data).toEqual({ filePath: "index" });
    expect(error.code).toBe("INVALID_FILE_PATH");
  });

  test("Normalises the full path using node:path.", () => {
    const { fullPath } = parseFilePath(String.raw`src\functions\index.ts`); // I hate Windows for making me account for this bs.
    expect(fullPath).toBe(path.join("src", "functions", "index.ts"));
  });
});
