# MPI Parser

This is a simple lisp like parser for a personally created MPI syntax in TypeScript based on an MPI parsing system from the 90s

## How to handle

Install with: `npm i @strbjun/mpi-parser`

Then import `MPI` from the module. Then, you are ready to go!

## Syntax

Its simple. It works as: `{if:{eq:1,1},yes,no}` which would return "yes" as 1 is equal to 1. So the format is:

`{functionName:parameter, parameter, parameter}`

But unlike older interpreters from the 90s, this one will have type safety built in. If the wrong output is given it will error out.

## How to create more interpreters

This can be useful in case you want more local functions, though the global functions, variables, etc. will work across all interpreters.

This will be easily done by importing the `Interpreter` class and just declare a new one.

## How to create new functions

There's two types. Global and local. Global will exist across all interpreters and local will only exist on the individually declared one.

1. Local declaration:

```
MPI.registerFunction(name: string, fn: FunctionDefinition, aliases: string[])
```

- **name**: This defines the function name used to call the function
- **aliases**: As a string array can set alternative function names. Not required.
- **fn**: This is an object containing:
- - **fn**: This is the function declaration itself. It can either be just a straightforward function declaration where all arguments are parsed and checked, or you can get greater control of it with a return function.
- - - _Straightforward declaration_: This is done via just putting in a standard function and result return such as: `(arg1: string, arg2: string) => arg1 + arg2`... and, viola, done! Each argument will be evaluated outside of it.
- - - _Greater controlled declaration_: Here you can pass an object to return the above standard declaration so that you can get access to the evaluator. This has to be enabled for this to be used which will be mentioned below. But when used you get access to the following object values:
- - - - **evaluator**: This is a function where you pass a value to evaluate. It can be any of the arguments or all.
- - - - **validator**: Allow validation for any arguments or all. You have to pass the arguments in an array first, then an array of strings for the explicit types they should be, followed by the function name.
- - - - **types**: The types set in the function will be passed here in order
- - - - **obj**: The current interpreter object
- - **argTypes**: You have to pass the explicit argument types. More can be added, but what exists in code are: boolean, string, number, float, and any. Plus you can add [] to the end to show it is an array, but if an array is used then it will just grab the rest of the arguments and ignore the rest of the types following it. If it ends in a ? then the argument is optional.
- - **useOverlap**: A boolean value defaulting to false. If set to true then it will enable the greater controlled function declaration mentioned above.

2. Global declaration:

Use the `registerGlobalFunction` using the same parameters as the local declaration and it will make it available in all interpreters instead. Scoping will work as first running the local declaration and THEN the global one.

## How to create variables

You can have global and local variables which work similarly as the function declarations.

1. Local declaration:

```
MPI.setVariable(name: string, value: AllowableTypes)
```

- **name**: This is the declaration name for the variable.
- **value**: Whatever you want to set it to as a value

2. Global declaration

Use `MPI.setGlobalVariable` instead using the same parameters.

## How to create new types

With this you can create new argument types for the functions either globally or locally scoped.

1. Local declaration:

```
MPI.registerArgType(name: string, fn: ArgValidateFn)
```

- **name**: The declaration name for the argument type
- **fn**: The function to verify any argument with that argument type. It just takes the argument, then returns a variable of true if it is the valid type or false for if it is not.

## To do

- Make it faster
- And document the global functions better
