[**@alextheman/utility v4.13.0**](../README.md)

***

[@alextheman/utility](../globals.md) / incrementVersion

# ~~Function: incrementVersion()~~

> **incrementVersion**(`version`, `incrementType`, `options?`): `string`

Increments the given input version depending on the given increment type.

## Parameters

### version

`string`

The version to increment

### incrementType

[`VersionType`](../variables/VersionType.md)

The type of increment. Can be one of the following:
- `"major"`: Change the major version `v1.2.3` → `v2.0.0`
- `"minor"`: Change the minor version `v1.2.3` → `v1.3.0`
- `"patch"`: Change the patch version `v1.2.3` → `v1.2.4`

### options?

`IncrementVersionOptions`

Extra options to apply.

## Returns

`string`

A new string representing the version with the increment applied.

## Deprecated

This function does not support the new class-based handling of VersionNumber. Please use `new VersionNumber(version).increment(incrementType)` instead.
