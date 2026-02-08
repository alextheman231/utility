[**@alextheman/utility v4.14.1**](../README.md)

***

[@alextheman/utility](../globals.md) / OptionalOnCondition

# Type Alias: OptionalOnCondition\<Condition, ResolvedTypeIfTrue\>

> **OptionalOnCondition**\<`Condition`, `ResolvedTypeIfTrue`\> = `Condition` *extends* `true` ? `ResolvedTypeIfTrue` : `ResolvedTypeIfTrue` \| `undefined`

Resolves to the given type if the first type is `true`, otherwise resolves to `undefined`

## Type Parameters

### Condition

`Condition` *extends* `boolean`

The condition to check.

### ResolvedTypeIfTrue

`ResolvedTypeIfTrue`

The type to resolve to if the condition may be `true`.
