import { describe, expect, test } from "vitest";

import deepFreeze from "src/root/functions/recursive/deepFreeze";

function expectError<ErrorClassType extends new (...args: any[]) => Error>(
  errorFunction: () => unknown,
  ErrorClass: ErrorClassType,
): InstanceType<ErrorClassType> {
  try {
    errorFunction();
  } catch (error) {
    if (error instanceof ErrorClass) {
      return error as InstanceType<ErrorClassType>;
    }
    throw error;
  }
  throw new Error(`Expected ${ErrorClass.name} to be thrown but none was thrown`);
}

describe("deepFreeze", () => {
  test("Freezes an array with no nesting", () => {
    const array = ["a", "b", "c", "d"];
    deepFreeze(array);

    expectError(() => {
      array.push("e");
    }, TypeError);
  });
  test("Freezes an object with no nesting", () => {
    const object: Record<string, unknown> = { a: 1, b: 2, c: 3, d: 4 };
    deepFreeze(object);

    expectError(() => {
      object.e = 5;
    }, TypeError);
  });
  test("Freezes an array with one layer of nesting", () => {
    const array = [1, 2, [3, 4, 5]];
    deepFreeze(array);

    expectError(() => {
      array.push(6);
    }, TypeError);

    expectError(() => {
      if (Array.isArray(array[2])) {
        array[2].push(6);
      }
    }, TypeError);
  });
  test("Freezes an array with many layers of nesting", () => {
    const array = [1, 2, [3, 4, 5, [6]], 7, 8, [9]];
    deepFreeze(array);

    expectError(() => {
      array.push(6);
    }, TypeError);

    expectError(() => {
      if (Array.isArray(array[2])) {
        array[2].push(10);
      }
    }, TypeError);

    expectError(() => {
      if (Array.isArray(array[2]) && Array.isArray(array[2][3])) {
        array[2][3].push(10);
      }
    }, TypeError);

    expectError(() => {
      if (Array.isArray(array[5])) {
        array[5].push(10);
      }
    }, TypeError);
  });
  test("Freezes an object with one layer of nesting", () => {
    const object = { hello: { there: "world" } };
    deepFreeze(object);

    expectError(() => {
      object.hello.there = "Test";
    }, TypeError);
  });
  test("Freezes an object with many layers of nesting", () => {
    const object = {
      hello: {
        there: "world",
      },
      this: {
        is: {
          a: "test",
        },
      },
    };

    deepFreeze(object);

    expectError(() => {
      object.hello.there = "bad";
    }, TypeError);

    expectError(() => {
      object.this.is.a = "mutation attempt that should fail";
    }, TypeError);
  });
  test("Freezes an input with mixed objects/arrays", () => {
    const object = {
      hello: {
        there: "world",
      },
      this: {
        is: {
          a: ["test", "with a nested array"],
        },
      },
    };

    deepFreeze(object);

    expectError(() => {
      object.hello.there = "bad";
    }, TypeError);

    expectError(() => {
      object.this.is.a = ["mutation attempt that should fail"];
    }, TypeError);

    expectError(() => {
      object.this.is.a.push("mutation attempt that should fail");
    }, TypeError);
  });
  test("Returns the object with the same reference in memory", () => {
    const object = {
      hello: { world: "This is a test" },
      sayHello: () => {
        return "Hello world";
      },
    };
    const frozenObject = deepFreeze(object);
    expect(frozenObject).toBe(object);
  });
});
