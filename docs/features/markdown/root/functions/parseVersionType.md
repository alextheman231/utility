[**@alextheman/utility v5.4.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / parseVersionType

# Function: parseVersionType()

> **parseVersionType**(`input`): [`VersionType`](../type-aliases/VersionType.md)

Parses the input and verifies it is a valid software version type (i.e. `"major" | "minor" | "patch"`)

## Parameters

### input

`unknown`

The data to parse.

## Returns

[`VersionType`](../type-aliases/VersionType.md)

The given version type if allowed.

## Throws

If the data does not match one of the allowed version types (`"major" | "minor" | "patch"`).
