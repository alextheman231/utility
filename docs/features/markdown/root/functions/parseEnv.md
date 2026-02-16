[**@alextheman/utility v5.1.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / parseEnv

# Function: parseEnv()

> **parseEnv**(`input`): `string`

Parses the input and verifies it matches one of the environments allowed by the Env types ("test" | "development" | "production").

## Parameters

### input

`unknown`

The data to parse.

## Returns

`string`

The specified environment if allowed.

## Throws

If the data does not match one of the environments allowed by the Env types ("test" | "development" | "production").
