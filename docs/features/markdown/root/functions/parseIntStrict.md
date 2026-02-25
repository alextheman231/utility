[**@alextheman/utility v5.5.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / parseIntStrict

# Function: parseIntStrict()

> **parseIntStrict**(`string`, `radix?`): `number`

Converts a string to an integer and throws an error if it cannot be converted.

## Parameters

### string

`string`

A string to convert into a number.

### radix?

`number`

A value between 2 and 36 that specifies the base of the number in string. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal.

## Returns

`number`

The integer parsed from the input string.

## Throws

If the provided string cannot safely be converted to an integer.
