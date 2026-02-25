[**@alextheman/utility v5.4.1**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / getRecordKeys

# Function: getRecordKeys()

> **getRecordKeys**\<`InputRecordType`\>(`record`): keyof `InputRecordType`[]

Gets the keys from a given record object, properly typed to be an array of the key of the input object's type.

## Type Parameters

### InputRecordType

`InputRecordType` *extends* `Record`\<[`RecordKey`](../type-aliases/RecordKey.md), `unknown`\>

The type of the input object.

## Parameters

### record

`InputRecordType` & `object`

The record to get the keys from.

## Returns

keyof `InputRecordType`[]

An array with all the keys of the input object in string form, but properly typed as `keyof InputRecordType`.
