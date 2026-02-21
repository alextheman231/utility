import { describe, expect, test } from "vitest";

import { DataError } from "src/root";
import { createFormData } from "src/root/functions";

describe("createFormData", () => {
  test("Creates FormData given an object", () => {
    const formData = createFormData({
      firstKey: "First property",
      secondKey: "Second property",
    });
    expect(formData.get("firstKey")).toBe("First property");
    expect(formData.get("secondKey")).toBe("Second property");
  });
  test("Stringifies primitive data", () => {
    const formData = createFormData({
      numberKey: 1,
      booleanKey: true,
      stringKey: "Test",
    });
    expect(formData.get("numberKey")).toBe("1");
    expect(formData.get("booleanKey")).toBe("true");
    expect(formData.get("stringKey")).toBe("Test");
  });
  test("Stringifies arrays and objects", () => {
    const formData = createFormData({
      arrayKey: ["Test", "array"],
      objectKey: { test: "object" },
    });
    expect(formData.get("arrayKey")).toBe(JSON.stringify(["Test", "array"]));
    expect(formData.get("objectKey")).toBe(JSON.stringify({ test: "object" }));
  });
  test("Can take a blob", async () => {
    const formData = createFormData({ blobKey: new Blob(["Hello"]) });
    const blob = formData.get("blobKey") as any;
    expect(blob).toBeTruthy();
    expect(["[object Blob]", "[object File]"]).toContain(String(blob));
  });
  test("Resolves undefined to be an empty string", () => {
    const formData = createFormData({
      undefinedKey: undefined,
    });
    expect(formData.get("undefinedKey")).toBe("");
  });
  test("Resolves null to be an empty string", () => {
    const formData = createFormData({
      nullKey: null,
    });
    expect(formData.get("nullKey")).toBe("");
  });
  test("Stringifies nullables if given that option", () => {
    const data = {
      undefinedKey: undefined,
      nullKey: null,
    };

    const formData = createFormData(data, {
      undefinedResolution: "stringify",
      nullResolution: "stringify",
    });
    expect(formData.get("undefinedKey")).toBe("undefined");
    expect(formData.get("nullKey")).toBe("null");

    const nullableResolutionFormDataTest = createFormData(data, {
      nullableResolution: "stringify",
    });
    expect(nullableResolutionFormDataTest.get("undefinedKey")).toBe("undefined");
    expect(nullableResolutionFormDataTest.get("nullKey")).toBe("null");
  });
  test("Omits nullables if given that option", () => {
    const data = {
      undefinedKey: undefined,
      nullKey: null,
    };

    const formData = createFormData(data, { undefinedResolution: "omit", nullResolution: "omit" });
    expect(formData.get("undefinedKey")).toEqual(null);
    expect(formData.get("nullKey")).toEqual(null);

    const nullableResolutionFormDataTest = createFormData(data, { nullableResolution: "omit" });
    expect(nullableResolutionFormDataTest.get("undefinedKey")).toEqual(null);
    expect(nullableResolutionFormDataTest.get("nullKey")).toEqual(null);
  });
  test("Adds arrays as a repeated property if arrayResolution is set to multiple", () => {
    const data = {
      arrayKey: ["Multiple", "data", "test"],
    };

    const formData = createFormData(data, { arrayResolution: "multiple" });
    expect(formData.getAll("arrayKey")).toEqual(["Multiple", "data", "test"]);
  });
  test("Does not allow non-primitive data (except blobs)", () => {
    const data = {
      arrayKey: ["Multiple", ["data", "test"], undefined, null],
    };

    const error = DataError.expectError(() => {
      createFormData(data, { arrayResolution: "multiple" });
    });
    expect(error.data.item).toEqual(["data", "test"]);
    expect(error.code).toBe("NON_PRIMITIVE_ARRAY_ITEMS_FOUND");
  });
  test("Allow blobs in an array to be resolved with the multiple option", () => {
    const data = { blobs: [new Blob(["Hello"]), new Blob(["World"])] };

    const formData = createFormData(data, { arrayResolution: "multiple" });
    formData.getAll("blobs").forEach((item) => {
      expect(["[object Blob]", "[object File]"]).toContain(String(item));
    });
  });
  test("Do not allow arrays of Blobs to be stringified", () => {
    const data = { blobs: [new Blob(["Hello"]), new Blob(["World"])] };
    const error = DataError.expectError(() => {
      createFormData(data, { arrayResolution: "stringify" });
    });
    expect(error.data.value).toEqual(data.blobs);
    expect(error.code).toBe("CANNOT_STRINGIFY_BLOB");
  });
  test("Allows an object to be passed in for arrayResolution to specify resolution type per property", () => {
    const data = {
      multipleKey: ["This", "is", "a", "test"],
      stringifyKey: [1, 2, 3, 4],
    };

    const formData = createFormData(data, {
      arrayResolution: { multipleKey: "multiple", stringifyKey: "stringify" },
    });
    expect(formData.getAll("multipleKey")).toEqual(data.multipleKey);
    expect(formData.get("stringifyKey")).toBe(JSON.stringify(data.stringifyKey));
  });
  test("Allows an object to be passed for undefinedResolution or nullResolution", () => {
    const data = {
      emptyUndefined: undefined,
      omittedUndefined: undefined,
      emptyNull: null,
      omittedNull: null,
    };

    const formData = createFormData(data, {
      undefinedResolution: { emptyUndefined: "empty", omittedUndefined: "omit" },
      nullResolution: { emptyNull: "empty", omittedNull: "omit" },
    });
    expect(formData.get("emptyUndefined")).toBe("");
    expect(formData.get("omittedUndefined")).toEqual(null);
    expect(formData.get("emptyNull")).toBe("");
    expect(formData.get("omittedNull")).toEqual(null);
  });
  test("Allows an object to be passed for nullableResolution", () => {
    const data = {
      emptyUndefined: undefined,
      omittedUndefined: undefined,
      emptyNull: null,
      omittedNull: null,
    };

    const formData = createFormData(data, {
      nullableResolution: {
        emptyUndefined: "empty",
        omittedUndefined: "omit",
        emptyNull: "empty",
        omittedNull: "omit",
      },
    });
    expect(formData.get("emptyUndefined")).toBe("");
    expect(formData.get("omittedUndefined")).toEqual(null);
    expect(formData.get("emptyNull")).toBe("");
    expect(formData.get("omittedNull")).toEqual(null);
  });
  test("Can take only one type argument", () => {
    createFormData<{ hello: "world" }>({ hello: "world" });
  });
});
