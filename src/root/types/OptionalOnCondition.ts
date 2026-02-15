/**
 * Resolves to the given type if the first type is `true`, otherwise resolves to `undefined`
 *
 * @category Types
 *
 * @param Condition - The condition to check.
 * @param ResolvedTypeIfTrue - The type to resolve to if the condition may be `true`.
 */
export type OptionalOnCondition<
  Condition extends boolean,
  ResolvedTypeIfTrue,
> = Condition extends true ? ResolvedTypeIfTrue : ResolvedTypeIfTrue | undefined;
