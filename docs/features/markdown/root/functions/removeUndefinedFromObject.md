[**@alextheman/utility v5.1.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / removeUndefinedFromObject

# Function: removeUndefinedFromObject()

> **removeUndefinedFromObject**\<`RecordType`\>(`object`): `RemoveUndefined`\<`RecordType`\>

Removes entries whose values are `undefined` from a given object (not including null etc.).

## Type Parameters

### RecordType

`RecordType` *extends* `Record`\<[`RecordKey`](../type-aliases/RecordKey.md), `unknown`\>

## Parameters

### object

`RecordType`

The object to remove undefined entries from.

## Returns

`RemoveUndefined`\<`RecordType`\>

An object with a new reference in memory, with undefined entries removed.
