[**@alextheman/utility v5.4.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / createFormData

# Function: createFormData()

> **createFormData**\<`DataType`\>(`data`, `options?`): `FormData`

Creates FormData from a given object, resolving non-string types as appropriate.

## Type Parameters

### DataType

`DataType` *extends* `Record`\<[`RecordKey`](../type-aliases/RecordKey.md), `unknown`\>

The type of the given data.

## Parameters

### data

`DataType`

The data to create FormData from.

### options?

[`CreateFormDataOptions`](../type-aliases/CreateFormDataOptions.md)\<keyof `DataType`\> = `...`

Options to apply to the conversion.

## Returns

`FormData`

A FormData object with the data applied.
