import type { RecordKey } from "src/root/types";

import { DataError } from "src/root/types";

export type FormDataNullableResolutionStrategy = "stringify" | "empty" | "omit";
export type FormDataArrayResolutionStrategy = "stringify" | "multiple";

/**
 * Base options for resolving form data.
 *
 * @category Function Options
 *
 * @template Key - The type of the key of the input record.
 */
export interface CreateFormDataOptionsBase<Key extends RecordKey> {
  /** How to resolve any arrays provided in the data (can either stringify them or add them multiple times). */
  arrayResolution?:
    | FormDataArrayResolutionStrategy
    | Partial<Record<Key, FormDataArrayResolutionStrategy>>;
}

/**
 * Options for resolving form data when it may be undefined or null, but not both.
 *
 * @category Function Options
 *
 * @template Key - The type of the key of the input record.
 */
export interface CreateFormDataOptionsUndefinedOrNullResolution<
  Key extends RecordKey,
> extends CreateFormDataOptionsBase<Key> {
  /** How to resolve undefined data (May either stringify to 'undefined', resolve to an empty string, or omit entirely). */
  undefinedResolution?:
    | FormDataNullableResolutionStrategy
    | Partial<Record<Key, FormDataNullableResolutionStrategy>>;
  /** How to resolve null data (May either stringify to 'null', resolve to an empty string, or omit entirely). */
  nullResolution?:
    | FormDataNullableResolutionStrategy
    | Partial<Record<Key, FormDataNullableResolutionStrategy>>;
  /** @note This must not be provided at the same time as undefinedResolution and/or nullResolution. */
  nullableResolution?: never;
}

/**
 * Options for resolving form data when it may be nullable, but not both.
 *
 * @category Function Options
 *
 * @template Key - The type of the key of the input record.
 */
export interface CreateFormDataOptionsNullableResolution<
  Key extends RecordKey,
> extends CreateFormDataOptionsBase<Key> {
  /** @note This must not be provided at the same time as nullableResolution. */
  undefinedResolution?: never;
  /** @note This must not be provided at the same time as nullableResolution. */
  nullResolution?: never;
  /** How to resolve nullable data (May either stringify to 'undefined | null', resolve to an empty string, or omit entirely). */
  nullableResolution:
    | FormDataNullableResolutionStrategy
    | Partial<Record<Key, FormDataNullableResolutionStrategy>>;
}

/**
 * Options for resolving form data.
 *
 * @category Function Options
 *
 * @template Key - The type of the key of the input record.
 */
export type CreateFormDataOptions<Key extends RecordKey> =
  | CreateFormDataOptionsUndefinedOrNullResolution<Key>
  | CreateFormDataOptionsNullableResolution<Key>;

function getNullableResolutionStrategy(
  key: RecordKey,
  strategy:
    | FormDataNullableResolutionStrategy
    | Partial<Record<RecordKey, FormDataNullableResolutionStrategy>>,
) {
  return (typeof strategy === "object" ? strategy[key] : strategy) ?? "empty";
}

function isPrimitive(item: unknown): boolean {
  return typeof item === "string" || typeof item === "number" || typeof item === "boolean";
}

/**
 * Creates FormData from a given object, resolving non-string types as appropriate.
 *
 * @category Miscellaneous
 *
 * @template DataType - The type of the given data.
 *
 * @param data - The data to create FormData from.
 * @param options - Options to apply to the conversion.
 *
 * @returns A FormData object with the data applied.
 */
function createFormData<DataType extends Record<RecordKey, unknown>>(
  data: DataType,
  options: CreateFormDataOptions<keyof DataType> = {
    arrayResolution: "stringify",
    nullableResolution: "empty",
  },
): FormData {
  const formData = new FormData();

  function resolveNullablesByStrategy(
    key: keyof DataType,
    value: unknown,
    resolutionStrategy: FormDataNullableResolutionStrategy,
  ) {
    switch (resolutionStrategy) {
      case "empty": {
        formData.append(String(key), "");
        break;
      }
      case "stringify": {
        formData.append(String(key), JSON.stringify(value));
        break;
      }
      case "omit": {
        break;
      }
      default: {
        throw resolutionStrategy satisfies never;
      }
    }
  }

  function resolveNullables(
    key: keyof DataType,
    value: unknown,
    options: CreateFormDataOptions<keyof DataType>,
  ) {
    if (options.nullableResolution) {
      resolveNullablesByStrategy(
        key,
        value,
        getNullableResolutionStrategy(key, options.nullableResolution),
      );
      return;
    }
    if (options.undefinedResolution || options.nullResolution) {
      if (data[key] === undefined && options.undefinedResolution) {
        resolveNullablesByStrategy(
          key,
          value,
          getNullableResolutionStrategy(key, options.undefinedResolution),
        );
        return;
      }
      if (data[key] === null && options.nullResolution) {
        resolveNullablesByStrategy(
          key,
          value,
          getNullableResolutionStrategy(key, options.nullResolution),
        );
      }
    }
  }

  const entries = Object.entries(data) as [keyof DataType, unknown][];
  for (const [key, value] of entries) {
    if (value instanceof Blob) {
      formData.append(String(key), value);
    } else if (value === undefined || value === null) {
      resolveNullables(key, value, options);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        if (
          value.some((item) => {
            return item instanceof Blob;
          }) &&
          (options.arrayResolution === "stringify" ||
            (typeof options.arrayResolution === "object" &&
              options.arrayResolution[key] === "stringify"))
        ) {
          throw new DataError(
            { value },
            "CANNOT_STRINGIFY_BLOB",
            'Files/blobs cannot be stringified. Please change the resolution option for this item to "multiple" instead.',
          );
        }
        if (
          options.arrayResolution === "multiple" ||
          (typeof options.arrayResolution === "object" &&
            options.arrayResolution[key] === "multiple")
        ) {
          for (const item of value) {
            if (!isPrimitive(item) && !(item instanceof Blob)) {
              throw new DataError(
                { item },
                "NON_PRIMITIVE_ARRAY_ITEMS_FOUND",
                'Cannot directly add non-primitive data to FormData. Please change the resolution option for this item to "stringify" instead.',
              );
            }
            if (item instanceof Blob) {
              formData.append(String(key), item);
            } else {
              formData.append(String(key), String(item));
            }
          }
          continue;
        }
      }
      formData.append(String(key), JSON.stringify(value));
    } else {
      formData.append(String(key), String(value));
    }
  }

  return formData;
}

export default createFormData;
