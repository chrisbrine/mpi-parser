import { Interpreter } from "@/interpreter/interpreter";

export type AllowableTypes = string | number | boolean;

export type FunctionArgs = AllowableTypes | AllowableTypes[];
export type FunctionReturn = AllowableTypes;

export type ArgValidateFn = (arg: unknown) => boolean;

export type FunctionHandler = (...args: unknown[]) => FunctionReturn;

export type EvaluatorFn = (input: string) => FunctionReturn;

export type ValidateTypes = Map<string, ArgValidateFn>;

export type ValidatorFn = (
  args: FunctionArgs[],
  expectedTypes: string[],
  functionName: string,
) => void;

export interface FunctionHandlerOverlapArgs {
  evaluator: EvaluatorFn;
  validator: ValidatorFn;
  types: ValidateTypes;
  obj: Interpreter;
}

export type FunctionHandlerOverlap = (
  params: FunctionHandlerOverlapArgs,
) => FunctionHandler;

export interface FunctionDefinition {
  fn: FunctionHandler | FunctionHandlerOverlap;
  argTypes: string[]; // List of argument types (e.g., "number", "string", "customType[]")
  useOverlap?: boolean;
}
