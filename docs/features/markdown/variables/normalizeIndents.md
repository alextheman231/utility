[**@alextheman/utility v4.15.0**](../README.md)

***

[@alextheman/utility](../globals.md) / normalizeIndents

# Variable: normalizeIndents()

> `const` **normalizeIndents**: \{(`options`): `NormaliseIndentsFunction`; (`strings`, ...`interpolations`): `string`; \} = `normaliseIndents`

Applies any options if provided, then removes any extraneous indents from a multi-line template string.

You can pass a template string directly by doing:

```typescript
normalizeIndents`Template string here
    with a new line
    and another new line`.
```

You may also pass the options first, then invoke the resulting function with a template string:

```typescript
normalizeIndents({ preserveTabs: false })`Template string here
    with a new line
    and another new line`.
```

## Call Signature

> (`options`): `NormaliseIndentsFunction`

Provides a new function that removes any extraneous indents from a multi-line template string, with the given options applied.

### Parameters

#### options

[`NormaliseIndentsOptions`](../interfaces/NormaliseIndentsOptions.md)

The options to apply.

### Returns

`NormaliseIndentsFunction`

A function that takes a template string, and returns a new string with the strings and interpolations from the template applied, and extraneous indents removed.

## Call Signature

> (`strings`, ...`interpolations`): `string`

Removes any extraneous indents from a multi-line template string.

You can pass a template string directly by doing:

```typescript
normaliseIndents`Template string here
    with a new line
    and another new line`;
```

### Parameters

#### strings

`TemplateStringsArray`

The strings from the template to process.

#### interpolations

...`unknown`[]

An array of all interpolations from the template.

### Returns

`string`

A new string with the strings and interpolations from the template applied, and extraneous indents removed.

## Param

The strings from the template to process, or the options to apply.

## Param

An array of all interpolations from the template.

## Returns

An additional function to invoke, or a new string with the strings and interpolations from the template applied, and extraneous indents removed.
