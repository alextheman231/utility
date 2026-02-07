[**@alextheman/utility v4.14.0**](../README.md)

***

[@alextheman/utility](../globals.md) / parseVersion

# ~~Function: parseVersion()~~

> **parseVersion**(`input`, `options?`): `string`

Parses a string and verifies it is a valid package version number.

Valid formats: `X.Y.Z` or `vX.Y.Z`, where X, Y, and Z are non-negative integers.

## Parameters

### input

`string`

The version string to parse.

### options?

`ParseVersionOptions`

Extra options to apply.

## Returns

`string`

The validated version number, prefixed with `v` if it was not already.

## Deprecated

This function does not support the new class-based handling of VersionNumber. Please use `new VersionNumber(input)` instead.

## Throws

If the input is not a valid version number.
