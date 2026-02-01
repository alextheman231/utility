[**@alextheman/utility v4.12.1**](../README.md)

***

[@alextheman/utility](../globals.md) / CreateFormDataOptionsUndefinedOrNullResolution

# Interface: CreateFormDataOptionsUndefinedOrNullResolution\<Key\>

Options for resolving form data when it may be undefined or null, but not both.

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

### nullableResolution?

> `optional` **nullableResolution**: `undefined`

#### Note

This must not be provided at the same time as undefinedResolution and/or nullResolution.

***

### nullResolution?

> `optional` **nullResolution**: `FormDataNullableResolutionStrategy` \| `Partial`\<`Record`\<`Key`, `FormDataNullableResolutionStrategy`\>\>

How to resolve null data (May either stringify to 'null', resolve to an empty string, or omit entirely).

***

### undefinedResolution?

> `optional` **undefinedResolution**: `FormDataNullableResolutionStrategy` \| `Partial`\<`Record`\<`Key`, `FormDataNullableResolutionStrategy`\>\>

How to resolve undefined data (May either stringify to 'undefined', resolve to an empty string, or omit entirely).
