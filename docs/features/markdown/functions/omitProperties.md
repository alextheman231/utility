[**@alextheman/utility v4.14.0**](../README.md)

***

[@alextheman/utility](../globals.md) / omitProperties

# Function: omitProperties()

> **omitProperties**\<`ObjectType`, `KeysToOmit`\>(`object`, `keysToOmit`): `Omit`\<`ObjectType`, `KeysToOmit`\>

Omits properties from a given object.

## Type Parameters

### ObjectType

`ObjectType` *extends* `Record`\<`string`, `unknown`\> \| `Readonly`\<`Record`\<`string`, `unknown`\>\>

The type of the input object.

### KeysToOmit

`KeysToOmit` *extends* `string` \| `number` \| `symbol`

A type representing the keys to omit from the object.

## Parameters

### object

`ObjectType`

The object to omit properties from.

### keysToOmit

The keys to omit from the object. Can either be a single string to omit one, or an array to omit multiple.

`KeysToOmit` | readonly `KeysToOmit`[]

## Returns

`Omit`\<`ObjectType`, `KeysToOmit`\>

An object with a new reference in memory, with the properties omitted.
