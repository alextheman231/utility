[**@alextheman/utility v4.12.3**](../README.md)

***

[@alextheman/utility](../globals.md) / getIndividualVersionNumbers

# ~~Function: getIndividualVersionNumbers()~~

> **getIndividualVersionNumbers**(`version`): \[`number`, `number`, `number`\]

Gets the individual version numbers from a given version number as a tuple of numbers.

## Parameters

### version

`string`

The version number.

## Returns

\[`number`, `number`, `number`\]

A tuple of three numbers indicating `[major, minor, patch]`.

## Deprecated

This function does not support the new class-based handling of VersionNumber. Please use one of the following instead:
     ```typescript
     new VersionNumber(version).major
     new VersionNumber(version).minor
     new VersionNumber(version).patch
     ```
