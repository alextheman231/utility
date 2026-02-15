/**
 * Deeply freezes an object or array such that all child objects/arrays are also frozen.
 *
 * Note that this will also freeze the input itself as well.
 * If the intent is to create a newly frozen object with a different reference in memory, pass your object through deepCopy first before passing to deepFreeze.
 *
 * @category Recursive
 *
 * @template ObjectType - The type of the input object.
 *
 * @param object - The object to freeze. May also be an array.
 *
 * @returns The input object completely frozen.
 */
function deepFreeze<ObjectType extends object>(object: ObjectType): Readonly<ObjectType> {
  for (const value of Object.values(object)) {
    if (typeof value === "function") {
      continue;
    }
    // Both arrays and objects are considered object in JavaScript
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

export default deepFreeze;
