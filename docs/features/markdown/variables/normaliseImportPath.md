[**@alextheman/utility v4.16.1**](../README.md)

***

[@alextheman/utility](../globals.md) / normaliseImportPath

# Variable: normaliseImportPath()

> `const` **normaliseImportPath**: (`importPath`) => `string` = `normalizeImportPath`

Normalises an import path meant for use in an import statement in JavaScript.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used. If the path is a zero-length string, '.' is returned, representing the current working directory.

If the path starts with ./, it is preserved (unlike what would happen with path.posix.normalize() normally).

Helpful for custom linter rules that need to check (or fix) import paths.

Normalizes an import path meant for use in an import statement in JavaScript.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used. If the path is a zero-length string, '.' is returned, representing the current working directory.

If the path starts with ./, it is preserved (unlike what would happen with path.posix.normalize() normally).

Helpful for custom linter rules that need to check (or fix) import paths.

## Parameters

### importPath

`string`

The import path to normalize.

## Returns

`string`

The import path normalized.

## Param

The import path to normalise.

## Returns

The import path normalised.
