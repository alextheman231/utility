[**@alextheman/utility v5.2.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / range

# Function: range()

> **range**(`start`, `stop`, `step?`): `number`[]

Creates an array of numbers within a given range.

- The range is inclusive of `start` and exclusive of `stop`.
- The sign of `step` must match the direction of the range.

## Parameters

### start

`number`

The number to start at (inclusive).

### stop

`number`

The number to stop at (exclusive).

### step?

`number` = `1`

The step size between numbers, defaulting to 1.

## Returns

`number`[]

An array of numbers satisfying the range provided.

## Throws

If `step` is `0`.

## Throws

If `step` direction does not match the order of `start` and `stop`.
