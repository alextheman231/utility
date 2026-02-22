[**@alextheman/utility v5.3.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / parseZodSchemaAsync

# Function: parseZodSchemaAsync()

> **parseZodSchemaAsync**\<`SchemaType`, `ErrorType`\>(`schema`, `input`, `onError?`): `Promise`\<`output`\<`SchemaType`\>\>

An alternative function to zodSchema.parseAsync() that can be used to strictly parse asynchronous Zod schemas.

## Type Parameters

### SchemaType

`SchemaType` *extends* `ZodType`\<`unknown`, `unknown`, `$ZodTypeInternals`\<`unknown`, `unknown`\>\>

The Zod schema type.

### ErrorType

`ErrorType` *extends* `Error` = [`DataError`](../classes/DataError.md)\<`Record`\<[`RecordKey`](../type-aliases/RecordKey.md), `unknown`\>\>

The type of error to throw on invalid data.

## Parameters

### schema

`SchemaType`

The Zod schema to use in parsing.

### input

`unknown`

The data to parse.

### onError?

A custom error to throw on invalid data (defaults to `DataError`). May either be the error itself, or a function that returns the error or nothing. If nothing is returned, the default error is thrown instead.

`ErrorType` | (`zodError`) => `void` \| `ErrorType`

## Returns

`Promise`\<`output`\<`SchemaType`\>\>

The parsed data from the Zod schema.

## Throws

If the given data cannot be parsed according to the schema.
