export type CallReturnType<FunctionType, Arguments> = FunctionType extends (
  arg: Arguments,
) => infer Return
  ? Return
  : never;
