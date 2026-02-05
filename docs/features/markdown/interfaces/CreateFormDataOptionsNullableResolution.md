[**@alextheman/utility v4.13.0**](../README.md)

***

[@alextheman/utility](../globals.md) / CreateFormDataOptionsNullableResolution

# Interface: CreateFormDataOptionsNullableResolution\<Key\>

Options for resolving form data when it may be nullable, but not both.

## Extends

- `CreateFormDataOptionsBase`\<`Key`\>

## Type Parameters

### Key

`Key` *extends* [`RecordKey`](../type-aliases/RecordKey.md)

The type of the key of the input record.

## Properties

### arrayResolution?

> `optional` **arrayResolution**: `FormDataArrayResolutionStrategy` \| `Partial`\<`Record`\<`Key`, `FormDataArrayResolutionStrategy`\>\>

How to resolve any arrays provided in the data (can either stringify them or add them multiple times).

#### Inherited from

`CreateFormDataOptionsBase.arrayResolution`

***

### nullableResolution

> **nullableResolution**: `FormDataNullableResolutionStrategy` \| `Partial`\<`Record`\<`Key`, `FormDataNullableResolutionStrategy`\>\>

How to resolve nullable data (May either stringify to 'undefined | null', resolve to an empty string, or omit entirely).

***

### nullResolution?

> `optional` **nullResolution**: `undefined`

#### Note

This must not be provided at the same time as nullableResolution.

***

### undefinedResolution?

> `optional` **undefinedResolution**: `undefined`

#### Note

This must not be provided at the same time as nullableResolution.
