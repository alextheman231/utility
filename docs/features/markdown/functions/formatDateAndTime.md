[**@alextheman/utility v4.14.0**](../README.md)

***

[@alextheman/utility](../globals.md) / formatDateAndTime

# Function: formatDateAndTime()

> **formatDateAndTime**(`inputDate`): `string`

Creates a human-readable string with information about the input date.

## Parameters

### inputDate

`Date`

The date to base the string on.

## Returns

`string`

A new string with information about the given date.

- If the date given is today, the output will be something like `Today at HH:MM`
- If the date given happened yesterday, the output will be something like `Yesterday at HH:MM`
- For any other date, the output will be something like `DD/MM/YYYY, HH:MM`
