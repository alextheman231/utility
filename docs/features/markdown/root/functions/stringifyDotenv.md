[**@alextheman/utility v5.1.1**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / stringifyDotenv

# Function: stringifyDotenv()

> **stringifyDotenv**(`contents`, `options?`): `string`

Converts an object into a string in .env file format.

## Parameters

### contents

The object to convert. Must be a record whose values are strings.

`Record`\<[`RecordKey`](../type-aliases/RecordKey.md), `string`\> | `DotenvParseOutput`

### options?

`StringifyDotenvOptions`

Extra options to apply.

## Returns

`string`

A string representation of the object in .env file format.
