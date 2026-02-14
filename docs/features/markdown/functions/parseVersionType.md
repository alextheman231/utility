[**@alextheman/utility v4.16.0**](../README.md)

***

[@alextheman/utility](../globals.md) / parseVersionType

# Function: parseVersionType()

> **parseVersionType**(`data`): [`VersionType`](../type-aliases/VersionType.md)

Parses the input and verifies it is a valid software version type (i.e. `"major" | "minor" | "patch"`)

## Parameters

### data

`unknown`

The data to parse.

## Returns

[`VersionType`](../type-aliases/VersionType.md)

The given version type if allowed.

## Throws

If the data does not match one of the allowed version types (`"major" | "minor" | "patch"`).
