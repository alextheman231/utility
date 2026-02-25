import { describe, expect, test } from "vitest";

import { randomUUID } from "node:crypto";

import { UUID_PATTERN, UUID_REGEX } from "src/root";

describe("UUID_REGEX", () => {
  test("Matches a valid UUID", () => {
    const uuid = randomUUID();
    expect(UUID_REGEX.test(uuid)).toBe(true);
  });
  test("Does not match anything that is not a UUID", () => {
    const notUUID = "hello";
    expect(UUID_REGEX.test(notUUID)).toBe(false);
  });
  test("Does not match UUIDs inside a larger string", () => {
    const uuid = randomUUID();
    const embedded = `hello-${uuid}-world`;
    expect(UUID_REGEX.test(embedded)).toBe(false);
  });
});

describe("UUID_PATTERN", () => {
  test("Can be embedded inside larger regexes", () => {
    const routeRegex = new RegExp(`/users/(?<id>${UUID_PATTERN})/`);
    const uuid = randomUUID();
    const path = `/users/${uuid}/`;

    const match = path.match(routeRegex);
    expect(match?.groups?.id).toBe(uuid);
  });
});
