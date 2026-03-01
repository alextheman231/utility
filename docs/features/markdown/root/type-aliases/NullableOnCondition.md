[**@alextheman/utility v5.6.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / NullableOnCondition

# Type Alias: NullableOnCondition\<Condition, ResolvedTypeIfTrue\>

> **NullableOnCondition**\<`Condition`, `ResolvedTypeIfTrue`\> = `Condition` *extends* `true` ? `ResolvedTypeIfTrue` : `ResolvedTypeIfTrue` \| `null`

Resolves to the given type if the first type is `true`, otherwise resolves to `null`

## Type Parameters

### Condition

`Condition` *extends* `boolean`

The condition to check.

### ResolvedTypeIfTrue

`ResolvedTypeIfTrue`

The type to resolve to if the condition may be `true`.
