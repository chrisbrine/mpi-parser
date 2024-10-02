import {
  AllowableTypes,
  FunctionHandler,
  FunctionHandlerOverlap,
  FunctionHandlerOverlapArgs,
} from "@/types";
import { Interpreter } from "@/interpreter/interpreter";

function evaluateValue(value: string): AllowableTypes {
  if (!isNaN(Number(value))) {
    return Number(value);
  } else if (value.toLowerCase() === "true") {
    return true;
  } else if (value.toLowerCase() === "false") {
    return false;
  }
  return value;
}

export default function setupOperatorFunctions() {
  Interpreter.registerGlobalFunction("if", {
    // Returns the second value if the first value evaluates as true, otherwise returns the third value.
    fn: (({ evaluator }: FunctionHandlerOverlapArgs) =>
      (condition: string, trueValue: string, falseValue: string) =>
        evaluateValue(evaluator(condition).toString())
          ? evaluator(trueValue)
          : evaluator(falseValue || "")) as FunctionHandlerOverlap,
    argTypes: ["string", "string", "string?"],
    useOverlap: true,
  });

  Interpreter.registerGlobalFunction("eq", {
    // Returns true if the two values are equal.
    fn: ((a: string, b: string) =>
      evaluateValue(a) === evaluateValue(b)) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("ne", {
    // Returns true if the two values are not equal.
    fn: ((a: string, b: string) =>
      evaluateValue(a) !== evaluateValue(b)) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("gt", {
    // Returns true if the first value is greater than the second value.
    fn: ((a: string, b: string) =>
      evaluateValue(a) > evaluateValue(b)) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("lt", {
    // Returns true if the first value is less than the second value.
    fn: ((a: string, b: string) =>
      evaluateValue(a) < evaluateValue(b)) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("ge", {
    // Returns true if the first value is greater than or equal to the second value.
    fn: ((a: string, b: string) =>
      evaluateValue(a) >= evaluateValue(b)) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("le", {
    // Returns true if the first value is less than or equal to the second value.
    fn: ((a: string, b: string) =>
      evaluateValue(a) <= evaluateValue(b)) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("and", {
    // Returns true if both values evaluate as true.
    fn: ((a: string, b: string) =>
      evaluateValue(a) && evaluateValue(b)) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("or", {
    // Returns true if either value evaluates as true.
    fn: ((a: string, b: string) =>
      evaluateValue(a) || evaluateValue(b)) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("not", {
    // Returns the opposite of the value.
    fn: ((a: string) => !evaluateValue(a)) as FunctionHandler,
    argTypes: ["boolean"],
  });

  Interpreter.registerGlobalFunction("default", {
    // Returns the first value if it evaluates as true, otherwise returns the second value.
    fn: ((a: string, b: string) =>
      evaluateValue(a) ? a : b) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("xor", {
    // Returns true if expr1 or expr2 evaluate as true, but false if both do.
    // Otherwise, this returns false.
    fn: ((a: string, b: string) => {
      const valueA = evaluateValue(a);
      const valueB = evaluateValue(b);
      return (valueA || valueB) && !(valueA && valueB);
    }) as FunctionHandler,
    argTypes: ["string", "string"],
  });
}
