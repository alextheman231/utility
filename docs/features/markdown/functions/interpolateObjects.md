[**@alextheman/utility v4.14.0**](../README.md)

***

[@alextheman/utility](../globals.md) / interpolateObjects

# Function: interpolateObjects()

> **interpolateObjects**\<`InterpolationsType`\>(`strings`, ...`interpolations`): `string`

Returns the result of interpolating a template string, also stringifying objects.

You can pass a template string directly by doing:

```typescript
interpolateObjects`Template string here ${{ my: "object" }}`;
```

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

A new string with the strings and interpolations from the template applied, with objects stringified.
