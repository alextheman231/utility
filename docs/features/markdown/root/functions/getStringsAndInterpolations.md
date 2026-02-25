[**@alextheman/utility v5.4.0**](../../README.md)

***

[@alextheman/utility](../../modules.md) / [root](../README.md) / getStringsAndInterpolations

# Function: getStringsAndInterpolations()

> **getStringsAndInterpolations**\<`InterpolationsType`\>(`strings`, ...`interpolations`): \[`TemplateStringsArray`, `...InterpolationsType[]`\]

Gets the strings and interpolations separately from a template string.
You can pass a template string directly by doing:

```typescript
getStringsAndInterpolations`Template string here`;
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

\[`TemplateStringsArray`, `...InterpolationsType[]`\]

A tuple where the first item is the strings from the template, and the remaining items are the interpolations.

The return of this function may also be spread into any other tagged template function in the following way:

```typescript
import { interpolate } from "@alextheman/utility"; // Example function

const packageName = "@alextheman/utility";
const packageManager = getPackageManager(packageName);

interpolate(...getStringsAndInterpolations`The package ${packageName} uses the ${packageManager} package manager.`);
```
