# Contributing

## Creating a function
### Setup
To create a new function in the package, you must first checkout a new branch. Do **not** commit directly on main.

From there, create the skeleton of the function. This is just the function declaration itself, along with the arguments and their types, along with the return type.

```typescript
function myFunction(firstArg: ArgType): ReturnType {
  // Implementation goes here
}

export default myFunction
```

Note that every function that gets exported from this package **must** have a type annotation. This is also enforced by ESLint. This helps to make the return types extra explicit and more intentional.

Once you have this, export the function from `src/root/functions/index.ts` so that consumers can import your function. Also export any types you may want to export near the bottom of the file:

```typescript
export { default as addDaysToDate } from "src/root/functions/addDaysToDate";
export { default as appendSemicolon } from "src/root/functions/appendSemicolon";
export { default as camelToKebab } from "src/root/functions/camelToKebab";
export { default as convertFileToBase64 } from "src/root/functions/convertFileToBase64";
export { default as createFormData } from "src/root/functions/createFormData";
export { default as fillArray } from "src/root/functions/fillArray";
export { default as formatDateAndTime } from "src/root/functions/formatDateAndTime";
// ...
export { default as myFunction } from "src/root/functions/myFunction";
// ...

export type { MyFunctionOptions } from "src/root/functions/myFunction";
```

### Testing

Every function must also be tested. Tests are located in the `tests` folder and follows roughly the same structure as `src`. We use Vitest for our tests, and instead of relying on the global test functions like you might do with Jest, we instead import each test function directly.

Tests are generally structured in the following way:

```typescript
import { describe, expect, test } from "vitest";

import myFunction from "src/root/functions/myFunction";

describe("myFunction", () => {
  test("Does a thing", () => {
    expect(myFunction("hello")).toBe("world");
  });
  test("Does another thing", () => {
    expect(myFunction("one")).toBe("two");
  });
  // ...
});
```

That is, we wrap all tests around a describe block grouping all related tests to that function together, then each test block tests a specific behaviour.

Every function must at least have one test for the core behaviour of it. Of course, the more tests, the better, but at the very least, test the core behaviour of the function. From there, if you feel like there may be a few edge cases you want to verify the behaviour of, please add tests in for that as well.

Some functions that we create may often end up taking in an array or object. Due to the nature of how JavaScript passes these, we must have non-mutation tests in place to prevent unintended mutation of the input array/object. The best way to do this is to use `Object.freeze()`, as that will ensure that we get an error if the function ever even tries to mutate the input.

```typescript
describe("removeDuplicates", () => {
  describe("Mutation checks", () => {
    test("Does not mutate the original array", () => {
      const inputArray = Object.freeze([1, 1, 2, 3, 4]);
      // since the array has been frozen, this will give a TypeError if it tries to mutate the inputArray.
      removeDuplicates(inputArray);
      expect(inputArray).toEqual([1, 1, 2, 3, 4]);
    });
  });
});
```

Also, if the return type of the function is the same as one or more of the inputs, it's also often helpful to have a test that ensures the output returns a new reference in memory:

```typescript
describe("removeDuplicates", () => {
  describe("Mutation checks", () => {
    test("Returns an array with a new reference in memory", () => {
      const inputArray = [1, 1, 2, 3, 4];
      const outputArray = removeDuplicates(inputArray);
      expect(outputArray).not.toBe(inputArray);
    });
  });
});
```

Note the use of `.toBe()` over `.toEqual()` here. This is because in this case, we are comparing the variable's memory reference to the output's memory reference rather than the actual contents of the array.

### Creating a type

Creating a type works in a similar way to creating a function, in the sense that you create a new file for it, add it to `src/root/types/index.ts`, and test it. Yes, test it. It is possible to test type declarations using `expectTypeOf`. As an example:

```typescript
import type { OptionalOnCondition } from "src/root/types";

import { describe, expectTypeOf, test } from "vitest";

describe("OptionalOnCondition", () => {
  test("Resolves to the type of the second type argument if first type argument is true", () => {
    expectTypeOf<OptionalOnCondition<true, string>>().toEqualTypeOf<string>();
  });
  test("Resolves to a union of the second type and undefined if first type argument is false", () => {
    expectTypeOf<OptionalOnCondition<false, string>>().toEqualTypeOf<string | undefined>();
  });
});
```

Note that when you actually run the tests using `npm test`, the tests will always pass even if the logic is incorrect. This is because type tests run with the TypeScript compiler so it will error in your editor and in linting, but it will never fail in runtime. As such, just remember to be extra careful with these type tests and remember that the actual test results for these show in the editor and not in runtime.

## Documenting

Every exported function must also have JSDoc comments. This gives each function a human-readable summary of its purpose that shows in the editor, and (once I get around to it), automatic documentation generating from those comments.

The comments should be structured something like this for functions:

```typescript
/**
 * A high-level summary of the function.
 * 
 * @template FirstTypeArg - Details about the first type argument.
 * @template SecondTypeArg - Details about the second type argument.
 * 
 * @param firstArg - Details about the first function argument.
 * @param secondArg - Details about the second function argument.
 * 
 * @throws {ErrorType} If the function is expected to error.
 * 
 * @returns What the function is expected to return.
 */
function myFunction<FirstTypeArg, SecondTypeArg>(firstArg: FirstTypeArg, secondArg: SecondTypeArg): ReturnType {
    // ...
}
```

For classes, the message and parameters may need to be broken down such that the summary annotates the class declaration, and the template, params, throws, and returns annotates the constructor.

```
/**
 * A high-level summary of the class
 *
 * @template FirstTypeArg - Details about the first type argument.
 * @template SecondTypeArg - Details about the second type argument.
 */
class Class<FirstTypeArg, SecondTypeArg> {
  /**
   * @param firstArg - Details about the first function argument.
   * @param secondArg - Details about the second function argument.
   *
   * @throws {ErrorType} If the function is expected to error.
   *
   * @returns What the function is expected to return.
   */
  public constructor(firstArg: FirstTypeArg, secondArg: SecondTypeArg) {
    //
  }
}
```

If a comment is missing, it will fail the linting process. Every function, class, and type must be commented. This ensures a good developer experience all around, making the intent of the addition clearer.

### Release Notes

In order for a release of the package to be made, a release note must be created in `docs/releases`. You do not need to manually add the file yourself - you can instead run one of the following commands to generate a template already:

```bash
pnpm run create-release-note-major # Creates a release note template for the next major version (v1.2.3 → v2.0.0)
```
```bash
pnpm run create-release-note-minor # Creates a release note template for the next minor version (v1.2.3 → v1.3.0)
```
```bash
pnpm run create-release-note-patch # Creates a release note template for the next minor version (v1.2.3 → v1.2.4)
```

From there, you should edit the **Description of Changes** section, the **Migration Notes** section if it's a major version (or a minor version that deprecates things), and optionally the **Additional Notes** section.

Never manually edit anything else beyond that. This includes:
- The main header
- **Status**: In progress (**VERY IMPORTANT** you do not edit this! This will mess with the automation otherwise.)
- The summary paragraph below the **Status** but above **Description of Changes**
- The **Description of Changes** header itself
- The **Migration Notes** header

You may delete the **Additional Notes** header and/or add extra headers if needed, though, but never edit any of the things mentioned above.

### Document Generation

Documentation is generated from the JSDoc comments, using TypeDoc. It will generate Markdown files for each function in `docs/features/markdown`, as well as HTML files for the (eventual) hosted docs site in `docs/features/html`. Please do NOT ever manually edit files in these directories. They are automatically generated and will most likely end up getting replaced whenever someone runs the `pnpm run create-feature-docs` script.

Furthermore, there is an action that runs on every push to main that will run this script and put up a pull request. As such, there should never really be a need for you to run that script yourself given that the docs will automatically be kept up-to-date by that action anyway.

## Publishing

Once you are happy with your changes, commit the changes to your branch. Then, if the feature is intended to be part of a release, create a new release note in `docs/releases/(major|minor|patch)/vX.Y.Z`, where you must choose one of `major`, `minor`, or `patch`, and `vX.Y.Z` should be replaced with the version you are releasing (if a release note already exists, add your feature to that). You must also select the appropriate pull request template to categorise your change. See the [default pull request template](.github/pull_request_template.md) for the full list of templates and guidance on choosing the correct one.

Once your change gets merged in, run the `commit-version-change` workflow to generate a pull request that changes the version number, using the release note as the pull request body. Once that gets merged in, congratulations, your change should have been published!

## General workflow summary

1. Create the skeleton of the feature, including JSDoc comments.
2. Add tests.
3. Implement the feature, using the tests to guide you.
4. Commit the feature by itself.
5. If intending to release, create a release note, carefully deciding if it's a major, minor, or patch release (if adding to a release that is about to happen, add to the existing note)
6. Commit the release note separately from the feature.
7. Create a feature pull request and wait for it to be merged, choosing the appropriate template.
8. Wait for the pull request generated from the `commit-version-change` workflow to be merged in.
9. All done!
