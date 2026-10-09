import type { ObjectValue } from "src/root/types/ObjectValue";

import { describe, expectTypeOf, test } from "vitest";

const TestObject = {
  HELLO: "HELLO",
  WORLD: "WORLD",
} as const;

type TestObject = ObjectValue<typeof TestObject>;

describe("ObjectValue", () => {
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
