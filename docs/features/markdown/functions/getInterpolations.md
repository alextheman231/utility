[**@alextheman/utility v4.16.0**](../README.md)

***

[@alextheman/utility](../globals.md) / getInterpolations

# ~~Function: getInterpolations()~~

> **getInterpolations**(`strings`, ...`interpolations`): \[`TemplateStringsArray`, `unknown`[]\]

Gets the strings and interpolations separately from a template string.
You can pass a template string directly by doing:

```typescript
getInterpolations`Template string here`.
```

## Parameters

### strings

`TemplateStringsArray`

The strings from the template to process.

### interpolations

...`unknown`[]

An array of all interpolations from the template.

## Returns

\[`TemplateStringsArray`, `unknown`[]\]

A tuple where the first item is the strings from the template, and the second is the interpolations.

## Deprecated

Please use `getStringsAndInterpolations` instead.
