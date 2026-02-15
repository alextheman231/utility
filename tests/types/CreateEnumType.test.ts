import type { CreateEnumType } from "src/root/types/CreateEnumType";

import { describe, expectTypeOf, test } from "vitest";

const TestObject = {
  HELLO: "HELLO",
  WORLD: "WORLD",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
type TestObject = CreateEnumType<typeof TestObject>;

describe("CreateEnumType", () => {
  test("Allows values from the object", () => {
    expectTypeOf(TestObject.HELLO).toExtend<TestObject>();
    expectTypeOf(TestObject.WORLD).toExtend<TestObject>();
  });
  test("Does not allow values not from the object", () => {
    expectTypeOf<"hi">().not.toExtend<TestObject>();
  });
  test("Allows the raw value", () => {
    expectTypeOf<"HELLO">().toExtend<TestObject>();
    expectTypeOf<"WORLD">().toExtend<TestObject>();
  });
});
