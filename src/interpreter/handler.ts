import {
  AllowableTypes,
  ArgValidateFn,
  FunctionDefinition,
  ValidateTypes,
} from "@/types";

export class Handler {
  protected functions: Map<string, FunctionDefinition>; // functions for this instance
  protected static globalFunctions: Map<string, FunctionDefinition> = new Map<
    string,
    FunctionDefinition
  >(); // global functions

  protected argTypes: ValidateTypes; // argument types for this instance
  protected static globalArgTypes: ValidateTypes = new Map(); // global argument types

  protected localVariables: Map<string, AllowableTypes>; // Local variables for this instance
  protected static globalVariables: Map<string, AllowableTypes> = new Map<
    string,
    AllowableTypes
  >(); // Global variables shared by all instances

  constructor() {
    this.functions = new Map();
    this.argTypes = new Map();
    this.localVariables = new Map();
  }

  public registerArgType = (name: string, fn: ArgValidateFn): void => {
    this.argTypes.set(name, fn);
  };

  public static registerGlobalArgType = (
    name: string,
    fn: ArgValidateFn,
  ): void => {
    Handler.globalArgTypes.set(name, fn);
  };

  public getArgType = (name: string): ArgValidateFn => {
    if (this.argTypes.has(name)) {
      return this.argTypes.get(name) as ArgValidateFn;
    } else if (Handler.globalArgTypes.has(name)) {
      return Handler.globalArgTypes.get(name) as ArgValidateFn;
    } else {
      throw new Error(`Argument type not found: ${name}`);
    }
  };

  public registerFunction = (
    name: string,
    fn: FunctionDefinition,
    aliases?: string[],
  ): void => {
    this.functions.set(name, fn);
    if (aliases) {
      aliases.forEach((alias) => {
        this.functions.set(alias, fn);
      });
    }
  };

  public static registerGlobalFunction = (
    name: string,
    fn: FunctionDefinition,
    aliases?: string[],
  ): void => {
    Handler.globalFunctions.set(name, fn);
    if (aliases) {
      aliases.forEach((alias) => {
        Handler.globalFunctions.set(alias, fn);
      });
    }
  };

  public getFunction = (name: string): FunctionDefinition => {
    if (this.functions.has(name)) {
      return this.functions.get(name) as FunctionDefinition;
    } else if (Handler.globalFunctions.has(name)) {
      return Handler.globalFunctions.get(name) as FunctionDefinition;
    } else {
      throw new Error(`Function ${name} is not defined.`);
    }
  };

  public setVariable = (name: string, value: AllowableTypes): void => {
    this.localVariables.set(name, value);
  };

  public static setGlobalVariable = (
    name: string,
    value: AllowableTypes,
  ): void => {
    Handler.globalVariables.set(name, value);
  };

  public getVariable = (name: string): AllowableTypes => {
    if (this.localVariables.has(name)) {
      return this.localVariables.get(name) as AllowableTypes;
    } else if (Handler.globalVariables.has(name)) {
      return Handler.globalVariables.get(name) as AllowableTypes;
    } else {
      throw new Error(`Variable not found: ${name}`);
    }
  };
}
