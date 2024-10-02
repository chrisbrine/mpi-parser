import { Interpreter } from "@/interpreter/interpreter";
import { FunctionHandler } from "@/types";

export default function setupMathFunctions() {
  Interpreter.registerGlobalFunction(
    "add",
    {
      fn: ((nums: number[]) =>
        nums.reduce((a, b) => a + b, 0)) as FunctionHandler,
      argTypes: ["number[]"],
    },
    ["addition"],
  );

  Interpreter.registerGlobalFunction(
    "subt",
    {
      fn: ((nums: number[]) => nums.reduce((a, b) => a - b)) as FunctionHandler,
      argTypes: ["number[]"],
    },
    ["subtract"],
  );

  Interpreter.registerGlobalFunction(
    "mult",
    {
      fn: ((nums: number[]) =>
        nums.reduce((a, b) => a * b, 1)) as FunctionHandler,
      argTypes: ["number[]"],
    },
    ["multiply"],
  );

  Interpreter.registerGlobalFunction(
    "div",
    {
      fn: ((nums: number[]) => nums.reduce((a, b) => a / b)) as FunctionHandler,
      argTypes: ["number[]"],
    },
    ["divide"],
  );

  Interpreter.registerGlobalFunction(
    "mod",
    {
      fn: ((nums: number[]) => nums.reduce((a, b) => a % b)) as FunctionHandler,
      argTypes: ["number[]"],
    },
    ["modulo"],
  );

  Interpreter.registerGlobalFunction("avg", {
    fn: ((numbers: number[]) =>
      numbers.reduce((a, b) => a + b, 0) / numbers.length) as FunctionHandler,
    argTypes: ["number[]"],
  });

  Interpreter.registerGlobalFunction(
    "max",
    {
      fn: ((numbers: number[]) => Math.max(...numbers)) as FunctionHandler,
      argTypes: ["number[]"],
    },
    ["maximum"],
  );

  Interpreter.registerGlobalFunction(
    "min",
    {
      fn: ((numbers: number[]) => Math.min(...numbers)) as FunctionHandler,
      argTypes: ["number[]"],
    },
    ["minimum"],
  );

  Interpreter.registerGlobalFunction("abs", {
    fn: ((number: number) => Math.abs(number)) as FunctionHandler,
    argTypes: ["number"],
  });

  Interpreter.registerGlobalFunction("ceil", {
    fn: ((number: number) => Math.ceil(number)) as FunctionHandler,
    argTypes: ["number"],
  });

  Interpreter.registerGlobalFunction("floor", {
    fn: ((number: number) => Math.floor(number)) as FunctionHandler,
    argTypes: ["number"],
  });

  Interpreter.registerGlobalFunction("round", {
    fn: ((number: number) => Math.round(number)) as FunctionHandler,
    argTypes: ["number"],
  });

  Interpreter.registerGlobalFunction("pow", {
    fn: ((nums: number[]) =>
      nums.reduce((a, b) => Math.pow(a, b))) as FunctionHandler,
    argTypes: ["number[]"],
  });

  Interpreter.registerGlobalFunction("rand", {
    fn: ((min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min) as FunctionHandler,
    argTypes: ["number", "number"],
  });

  Interpreter.registerGlobalFunction(
    "inc",
    {
      fn: ((number: number, num2 = 1) =>
        number + (num2 as number)) as FunctionHandler,
      argTypes: ["number", "number?"],
    },
    ["increment"],
  );

  Interpreter.registerGlobalFunction(
    "dec",
    {
      fn: ((number: number, num2 = 1) =>
        number - (num2 as number)) as FunctionHandler,
      argTypes: ["number", "number?"],
    },
    ["decrement"],
  );

  Interpreter.registerGlobalFunction("dice", {
    fn: ((sides: number, count = 1, add = 0) => {
      let total = 0;
      for (let i = 0; i < (count as number); i++) {
        total += Math.floor(Math.random() * sides) + 1;
      }
      return total + (add as number);
    }) as FunctionHandler,
    argTypes: ["number", "number?", "number?"],
  });

  Interpreter.registerGlobalFunction("sign", {
    fn: ((number: number) => Math.sign(number)) as FunctionHandler,
    argTypes: ["number"],
  });

  Interpreter.registerGlobalFunction(
    "dist",
    {
      /*
{dist:x,y}              Returns distance from 0,0 that x,y is.
{dist:x,y,z}            Returns distance from 0,0,0 that x,y,z is.
{dist:x,y,x2,y2}        Returns distance between x,y and x2,y2.
{dist:x,y,z,x2,y2,z2}   Returns distance between x,y,z and x2,y2,z2.
    Given two arguments, this calculates the distance of a 2D point from
the origin.  Given three arguments, this calculates the distance of a 3D
point from the origin.  Given four arguments, this calculates the distance
between a pair of 2D points.  Given six arguments, this calculates the
distance between a pair of 3D points.
*/
      fn: ((...args: number[]) => {
        if (args.length === 2) {
          return Math.sqrt(args[0] ** 2 + args[1] ** 2);
        } else if (args.length === 3) {
          return Math.sqrt(args[0] ** 2 + args[1] ** 2 + args[2] ** 2);
        }
        return Math.sqrt(
          (args[0] - args[3]) ** 2 +
            (args[1] - args[4]) ** 2 +
            (args[2] - args[5]) ** 2,
        );
      }) as FunctionHandler,
      argTypes: [
        "number",
        "number?",
        "number?",
        "number?",
        "number?",
        "number?",
      ],
    },
    ["distance"],
  );
}
