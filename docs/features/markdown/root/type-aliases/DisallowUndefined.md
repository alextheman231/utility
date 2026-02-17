[**@alextheman/utility v5.1.2**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / DisallowUndefined

# Type Alias: DisallowUndefined\<InputType\>

> **DisallowUndefined**\<`InputType`\> = `undefined` *extends* `InputType` ? \[`"Error: Generic type cannot include undefined"`\] : `InputType`

Resolves to an error message type if the type argument could potentially be undefined.

## Type Parameters

### InputType

`InputType`

The type to disallow undefined on.
