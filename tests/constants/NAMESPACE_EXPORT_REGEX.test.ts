import { describe, expect, test } from "vitest";

import { NAMESPACE_EXPORT_REGEX } from "src/root/constants";

describe("NAMESPACE_EXPORT_REGEX", () => {
  test("It is what it is", () => {
    expect(NAMESPACE_EXPORT_REGEX).toBe("export\\s+\\*\\s+from");
  });
});
