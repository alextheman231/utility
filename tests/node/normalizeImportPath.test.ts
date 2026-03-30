import { describe, expect, test } from "vitest";

import { normaliseImportPath, normalizeImportPath } from "src/node";

describe("normalizeImportPath", () => {
  test("Normalises paths based on the path.posix.normalize() output if path does not start with ./", () => {
    expect(normalizeImportPath("src/root/types/../functions//normalizeImportPath")).toBe(
      "src/root/functions/normalizeImportPath",
    );
  });
  test("Preserves ./", () => {
    expect(normalizeImportPath("./functions/normalizeImportPath")).toBe(
      "./functions/normalizeImportPath",
    );
  });
  test("Can also use normaliseImportPath because I'm gonna be pedantic about spelling so you don't have to", () => {
    expect(normaliseImportPath("src/root/types/../functions//normaliseImportPath")).toBe(
      "src/root/functions/normaliseImportPath",
    );
  });
});
