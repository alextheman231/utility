function callDeepCopy<ObjectType>(input: ObjectType) {
  return typeof input === "object" && input !== null ? deepCopy(input) : input;
}

/**
 * Deeply copies an object or array such that all child objects/arrays are also copied.
 *
 * @category Recursive
 *
 * @template ObjectType - The type of the input object.
 *
 * @param object - The object to copy. May also be an array.
 *
 * @returns An identical object with a new reference in memory.
 */
function deepCopy<ObjectType extends object>(object: ObjectType): ObjectType {
  if (Array.isArray(object)) {
    return object.map((item) => {
      return callDeepCopy(item);
    }) as ObjectType;
  }

  const clonedObject: ObjectType = { ...object };
  for (const key in clonedObject) {
    const value = clonedObject[key];
    clonedObject[key] = callDeepCopy(value);
  }

  return clonedObject;
}

export default deepCopy;
