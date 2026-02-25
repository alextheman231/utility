[**@alextheman/utility v5.4.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / interpolate

# Function: interpolate()

> **interpolate**\<`InterpolationsType`\>(`strings`, ...`interpolations`): `string`

Returns the result of interpolating a template string when given the strings and interpolations separately.

You can pass a template string directly by doing:

```
interpolate`Template string here`;
```

In this case, it will be functionally the same as if you just wrote the template string by itself.

## Type Parameters

### InterpolationsType

`InterpolationsType` *extends* readonly `unknown`[]

The type of the interpolations.

## Parameters

### strings

`TemplateStringsArray`

The strings from the template to process.

### interpolations

...`InterpolationsType`

An array of all interpolations from the template.

## Returns

`string`

A new string with the strings and interpolations from the template applied.
