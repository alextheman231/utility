[**@alextheman/utility v4.16.2**](../README.md)

***

[@alextheman/utility](../globals.md) / paralleliseArrays

# Function: paralleliseArrays()

> **paralleliseArrays**\<`FirstArrayItem`, `SecondArrayItem`\>(`firstArray`, `secondArray`): `ParallelTuple`\<`FirstArrayItem`, `SecondArrayItem`\>[]

Creates a new array of tuples, each containing the item at the given index from both arrays.

If `secondArray` is shorter than `firstArray`, the second position in the tuple
will be `undefined`. Iteration always uses the length of the first array.

## Type Parameters

### FirstArrayItem

`FirstArrayItem`

### SecondArrayItem

`SecondArrayItem`

## Parameters

### firstArray

readonly `FirstArrayItem`[]

The first array. Each item in this will take up the first tuple spot.

### secondArray

readonly `SecondArrayItem`[]

The second array. Each item in this will take up the second tuple spot.

## Returns

`ParallelTuple`\<`FirstArrayItem`, `SecondArrayItem`\>[]

An array of `[firstItem, secondItem]` tuples for each index in `firstArray`.
