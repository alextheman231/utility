[**@alextheman/utility v4.12.3**](../README.md)

***

[@alextheman/utility](../globals.md) / interpolateObjects

# Function: interpolateObjects()

> **interpolateObjects**(`strings`, ...`interpolations`): `string`

Returns the result of interpolating a template string, also stringifying objects.

You can pass a template string directly by doing:

```typescript
interpolateObjects`Template string here ${{ my: "object" }}`.
```

## Parameters

### strings

`TemplateStringsArray`

The strings from the template to process.

### interpolations

...`unknown`[]

An array of all interpolations from the template.

## Returns

`string`

A new string with the strings and interpolations from the template applied, with objects stringified.
