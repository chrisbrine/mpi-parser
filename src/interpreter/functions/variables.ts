import {
  AllowableTypes,
  FunctionHandlerOverlap,
  FunctionHandlerOverlapArgs,
} from "@/types";
import { Interpreter } from "@/interpreter/interpreter";

export default function setupVariableFunctions() {
  Interpreter.registerGlobalFunction("set", {
    fn: (({ evaluator, obj }: FunctionHandlerOverlapArgs) => {
      return (variable: string, value: AllowableTypes) => {
        variable = evaluator(variable).toString();
        value = evaluator(value.toString());
        obj.setVariable(variable, value);
        return value;
      };
    }) as FunctionHandlerOverlap,
    argTypes: ["string", "any"],
    useOverlap: true,
  });

  Interpreter.registerGlobalFunction("var", {
    fn: (({ evaluator, obj }: FunctionHandlerOverlapArgs) => {
      return (variable: string) => {
        variable = evaluator(variable).toString();
        return obj.getVariable(variable);
      };
    }) as FunctionHandlerOverlap,
    argTypes: ["string"],
    useOverlap: true,
  });
}
