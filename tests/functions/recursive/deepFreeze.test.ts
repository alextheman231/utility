import { describe, expect, test } from "vitest";

import deepFreeze from "src/root/functions/recursive/deepFreeze";

describe("deepFreeze", () => {
  test("Freezes an array with no nesting", () => {
    const array = ["a", "b", "c", "d"];
    try {
      deepFreeze(array);
      array.push("e");
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe(`Cannot add property ${array.length}, object is not extensible`);
      } else {
        throw error;
      }
    }
  });
  test("Freezes an object with no nesting", () => {
    const object: Record<string, unknown> = { a: 1, b: 2, c: 3, d: 4 };
    try {
      deepFreeze(object);
      object.e = 5;
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe("Cannot add property e, object is not extensible");
      } else {
        throw error;
      }
    }
  });
  test("Freezes an array with one layer of nesting", () => {
    const array = [1, 2, [3, 4, 5]];
    try {
      deepFreeze(array);
      array.push(6);
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe(`Cannot add property ${array.length}, object is not extensible`);
      } else {
        throw error;
      }
    }
    try {
      // This if literally only exists to please TypeScript lol
      if (Array.isArray(array[1])) {
        array[1].push(6);
        throw new Error("TEST_FAILED");
      }
    } catch (error) {
      if (error instanceof TypeError) {
        // and again lol
        expect(error.message).toBe(
          Array.isArray(array[1])
            ? `Cannot add property ${array[1].length}, object is not extensible`
            : "",
        );
      } else {
        throw error;
      }
    }
  });
  test("Freezes an array with many layers of nesting", () => {
    const array = [1, 2, [3, 4, 5, [6]], 7, 8, [9]];
    try {
      deepFreeze(array);
      array.push(6);
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe(`Cannot add property ${array.length}, object is not extensible`);
      } else {
        throw error;
      }
    }

    if (Array.isArray(array[2])) {
      try {
        array[2].push(10);
        throw new Error("TEST_FAILED");
      } catch (error) {
        if (error instanceof TypeError) {
          expect(error.message).toBe(
            `Cannot add property ${array[2].length}, object is not extensible`,
          );
        } else {
          throw error;
        }
      }
    }

    if (Array.isArray(array[2]) && Array.isArray(array[2][3])) {
      try {
        array[2][3].push(10);
        throw new Error("TEST_FAILED");
      } catch (error) {
        if (error instanceof TypeError) {
          expect(error.message).toBe(
            `Cannot add property ${array[2][3].length}, object is not extensible`,
          );
        } else {
          throw error;
        }
      }
    }

    if (Array.isArray(array[5])) {
      try {
        array[5].push(10);
        throw new Error("TEST_FAILED");
      } catch (error) {
        if (error instanceof TypeError) {
          expect(error.message).toBe(
            `Cannot add property ${array[5].length}, object is not extensible`,
          );
        } else {
          throw error;
        }
      }
    }
  });
  test("Freezes an object with one layer of nesting", () => {
    const object = { hello: { there: "world" } };
    try {
      deepFreeze(object);
      object.hello.there = "Test";
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe(
          "Cannot assign to read only property 'there' of object '#<Object>'",
        );
      } else {
        throw error;
      }
    }
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

    try {
      deepFreeze(object);
      object.hello.there = "bad";
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe(
          "Cannot assign to read only property 'there' of object '#<Object>'",
        );
      } else {
        throw error;
      }
    }
    try {
      object.this.is.a = "mutation attempt that should fail";
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe("Cannot assign to read only property 'a' of object '#<Object>'");
      } else {
        throw error;
      }
    }
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

    try {
      deepFreeze(object);
      object.hello.there = "bad";
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe(
          "Cannot assign to read only property 'there' of object '#<Object>'",
        );
      } else {
        throw error;
      }
    }

    try {
      object.this.is.a = ["mutation attempt that should fail"];
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe("Cannot assign to read only property 'a' of object '#<Object>'");
      } else {
        throw error;
      }
    }

    try {
      object.this.is.a.push("mutation attempt that should fail");
      throw new Error("TEST_FAILED");
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe(
          `Cannot add property ${object.this.is.a.length}, object is not extensible`,
        );
      } else {
        throw error;
      }
    }
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
