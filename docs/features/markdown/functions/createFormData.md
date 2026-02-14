[**@alextheman/utility v4.16.1**](../README.md)

***

[@alextheman/utility](../globals.md) / createFormData

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
