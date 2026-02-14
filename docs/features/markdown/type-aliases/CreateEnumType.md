[**@alextheman/utility v4.16.1**](../README.md)

***

[@alextheman/utility](../globals.md) / CreateEnumType

# Type Alias: CreateEnumType\<ObjectType\>

> **CreateEnumType**\<`ObjectType`\> = `ObjectType`\[keyof `ObjectType`\]

Get the value types from a const object so the object can behave similarly to an enum.

## Type Parameters

### ObjectType

`ObjectType` *extends* `Record`\<[`RecordKey`](RecordKey.md), `unknown`\>

The type of the object to get the value types for.
