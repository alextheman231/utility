[**@alextheman/utility v4.12.3**](../README.md)

***

[@alextheman/utility](../globals.md) / fillArray

# Function: fillArray()

Creates a new array where each element is the result of the provided callback.

If the callback returns at least one Promise, the entire result will be wrapped
in a `Promise` and resolved with `Promise.all`. Otherwise, a plain array is returned.

## Template

The return type of the callback (awaited if any items are a Promise) that becomes the type of the array items.

## Param

A function invoked with the current index. May return a value or a Promise.

## Param

The desired length of the resulting array.

## Call Signature

> **fillArray**\<`ItemType`\>(`callback`, `length?`): `Promise`\<`ItemType`[]\>

Creates a new array where each element is the resolved result of the provided asynchronous callback.

The callback will be invoked once for each index from `0` to `length - 1`.
If no length is provided, a single-element array will be produced.

### Type Parameters

#### ItemType

`ItemType`

The awaited return type of the callback that becomes the type of the array items.

### Parameters

#### callback

(`index`) => `Promise`\<`ItemType`\>

An asynchronous function invoked with the current index.

#### length?

`number`

The desired length of the resulting array.

### Returns

`Promise`\<`ItemType`[]\>

A Promise resolving to an array of the callback results.

## Call Signature

> **fillArray**\<`ItemType`\>(`callback`, `length?`): `ItemType`[]

Creates a new array where each element is the result of the provided synchronous callback.

The callback will be invoked once for each index from `0` to `length - 1`.
If no length is provided, a single-element array will be produced.

### Type Parameters

#### ItemType

`ItemType`

The return type of the callback that becomes the type of the array items.

### Parameters

#### callback

(`index`) => `ItemType`

A synchronous function invoked with the current index.

#### length?

`number`

The desired length of the resulting array.

### Returns

`ItemType`[]

An array of the callback results.
