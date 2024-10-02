import {
  FunctionHandlerOverlap,
  FunctionReturn,
  FunctionHandler,
  AllowableTypes,
  FunctionArgs,
} from "@/types";
import { Handler } from "@/interpreter/handler";

export class Interpreter extends Handler {
  public evaluate = (input: string): FunctionReturn => {
    // 1. check if has a { in it, and if so, find the last } and handle that as a function.
    // 2. if a : is in there then what is after is a function, need to parse arguments out and handle function
    // 3. prior to handling function, need to verify arguments are correct
    while (input.includes("{")) {
      const { functionName, args, fullMatch } =
        this.extractInnermostFunction(input);
      // const args = this.parseArgs(argsString);

      const func = this.getFunction(functionName);
      if (!func) {
        throw new Error(`Function ${functionName} not found.`);
      }
      const { fn, argTypes, useOverlap } = func;

      // Evaluate the function and replace it in the input string
      let result: AllowableTypes;
      if (functionName.startsWith("&")) {
        // this means the whole inner portion is a variable name and should return the variable value
        result = this.getVariable(functionName.slice(1));
      } else if (useOverlap) {
        result = (fn as FunctionHandlerOverlap)({
          evaluator: this.evaluate,
          validator: this.validateArgs,
          types: this.argTypes,
          obj: this,
        })(...args);
      } else {
        const processedArgs = args.map((arg) => this.evaluate(arg));
        this.validateArgs(processedArgs, argTypes, functionName);
        result = (fn as FunctionHandler)(...args);
      }
      input = input.replace(
        fullMatch,
        this.evaluateArithmetic(result.toString()),
      );
    }

    return input;
  };

  // Extract the innermost function from the input (last closing brace)
  private extractInnermostFunction(input: string): {
    functionName: string;
    args: string[];
    fullMatch: string;
  } {
    let functionName = "";
    let inFunctionName = true;
    const args: string[] = [];
    let currentArg = "";
    let nestedLevel = -1;
    let fullMatch = "";
    const chars = input.split("");

    for (const char of chars) {
      if (nestedLevel >= 0) {
        fullMatch += char;
      }
      if (char === "{") {
        nestedLevel++;
        if (nestedLevel === 0) {
          fullMatch += char;
          continue;
        }
      } else if (char === "}") {
        nestedLevel--;
        if (nestedLevel < 0) {
          if (!inFunctionName && currentArg !== "") {
            args.push(currentArg);
          }
          break;
        }
      } else if (nestedLevel < 0) {
        continue;
      }

      if (inFunctionName) {
        if (char === ":") {
          inFunctionName = false;
        } else if (![" ", "\r", "\n", "\t"].includes(char)) {
          functionName += char;
        }
      } else {
        if (char === "," && nestedLevel === 0) {
          args.push(currentArg);
          currentArg = "";
        } else {
          currentArg += char;
        }
      }
    }

    if (nestedLevel >= 0) {
      throw new Error(`${functionName}: Unmatched braces in input string.`);
    }

    return { functionName, args, fullMatch };
  }

  private evaluateArithmetic(expression: string): string {
    try {
      // Use Function constructor to safely evaluate basic arithmetic
      return new Function(`return ${expression};`)();
    } catch {
      return expression; // If it's not an arithmetic expression, return as is
    }
  }

  // Validate the arguments provided to a function
  private validateArgs(
    args: FunctionArgs[],
    expectedTypes: string[],
    functionName: string,
  ): void {
    let isInArrayMode = false;
    let arrayType = "";

    // Ensure that there are not too many arguments unless we are in array mode
    if (
      args.length > expectedTypes.length &&
      !expectedTypes[expectedTypes.length - 1].endsWith("[]")
    ) {
      throw new Error(
        `${functionName}: Too many arguments provided. Expected ${expectedTypes.length}, but got ${args.length}.`,
      );
    }

    for (let i = 0; i < expectedTypes.length; i++) {
      const expectedType = expectedTypes[i];
      let arg = args[i];

      // If optional, allow for undefined/missing argument
      const isOptional = expectedType.endsWith("?");
      const baseType = isOptional ? expectedType.slice(0, -1) : expectedType;

      // Check for array mode
      const isArray = baseType.endsWith("[]");
      const baseArrayType = isArray ? baseType.slice(0, -2) : baseType;

      // Enter array mode if array is expected
      if (isArray && !isInArrayMode) {
        isInArrayMode = true;
        arrayType = baseArrayType;
      }

      if (isInArrayMode) {
        // For arrays, the rest of the arguments should match the array type
        for (let j = i; j < args.length; j++) {
          arg = args[j];
          if (!this.isValidType(arg, arrayType)) {
            throw new Error(
              `${functionName}: Argument ${arg} at index ${j} must be of type ${arrayType}[]`,
            );
          }
        }
        break; // No need to check further, all remaining args are part of the array
      }

      // Check for optional arguments
      if (isOptional && (arg === undefined || arg === null)) {
        continue;
      }

      // Regular type validation
      if (!this.isValidType(arg, baseType)) {
        throw new Error(
          `${functionName}: Argument ${arg} at index ${i} must be of type ${baseType}`,
        );
      }
    }

    // Ensure that there are not too many arguments if no array mode
    if (!isInArrayMode && args.length > expectedTypes.length) {
      throw new Error(
        `${functionName}: Too many arguments provided. Expected ${expectedTypes.length}, but got ${args.length}.`,
      );
    }
  }

  // Helper function to check if an argument matches a given type
  private isValidType(arg: unknown, type: string): boolean {
    const validateFn = this.getArgType(type);
    return validateFn ? validateFn(arg) : false;
  }
}
