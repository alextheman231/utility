[**@alextheman/utility v4.12.3**](../README.md)

***

[@alextheman/utility](../globals.md) / determineVersionType

# ~~Function: determineVersionType()~~

> **determineVersionType**(`version`): [`VersionType`](../variables/VersionType.md)

Determines whether the given version is a major, minor, or patch version.

## Parameters

### version

`string`

The version number.

## Returns

[`VersionType`](../variables/VersionType.md)

Either `"major"`, `"minor"`, or `"patch"`, depending on the version type.

## Deprecated

This function does not support the new class-based handling of VersionNumber. Please use `new VersionNumber(version).type` instead.
