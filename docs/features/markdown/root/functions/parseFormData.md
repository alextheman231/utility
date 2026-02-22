[**@alextheman/utility v5.3.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / parseFormData

# Function: parseFormData()

Returns an object given FormData and an optional data parser function to call on the resulting object.

## Template

The type of the resulting object when called from the dataParser.

## Param

The FormData to parse.

## Param

An optional parser to call on the object before it gets returned.

## Call Signature

> **parseFormData**\<`DataType`\>(`formData`, `dataParser`): `DataType`

Returns a parsed object given FormData and a data parser function to call on the resulting object.

### Type Parameters

#### DataType

`DataType`

The type of the resulting object when called from the dataParser.

### Parameters

#### formData

`FormData`

The FormData to parse.

#### dataParser

(`data`) => `DataType`

A parser to call on the object before it gets returned.

### Returns

`DataType`

A parsed object based on the contents of the input formData and the result of parsing with the data parser.

## Call Signature

> **parseFormData**(`formData`): `Record`\<`string`, `string` \| `Blob`\>

Returns an object given FormData.

### Parameters

#### formData

`FormData`

The FormData to parse.

### Returns

`Record`\<`string`, `string` \| `Blob`\>

An object based on the contents of the input formData.
