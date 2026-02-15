export type CallReturnType<Function, Arguments> = Function extends (arg: Arguments) => infer Return
  ? Return
  : never;
