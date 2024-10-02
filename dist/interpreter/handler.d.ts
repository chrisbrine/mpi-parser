import { AllowableTypes, ArgValidateFn, FunctionDefinition, ValidateTypes } from "@/types";
export declare class Handler {
    protected functions: Map<string, FunctionDefinition>;
    protected static globalFunctions: Map<string, FunctionDefinition>;
    protected argTypes: ValidateTypes;
    protected static globalArgTypes: ValidateTypes;
    protected localVariables: Map<string, AllowableTypes>;
    protected static globalVariables: Map<string, AllowableTypes>;
    constructor();
    registerArgType: (name: string, fn: ArgValidateFn) => void;
    static registerGlobalArgType: (name: string, fn: ArgValidateFn) => void;
    getArgType: (name: string) => ArgValidateFn;
    registerFunction: (name: string, fn: FunctionDefinition, aliases?: string[]) => void;
    static registerGlobalFunction: (name: string, fn: FunctionDefinition, aliases?: string[]) => void;
    getFunction: (name: string) => FunctionDefinition;
    setVariable: (name: string, value: AllowableTypes) => void;
    static setGlobalVariable: (name: string, value: AllowableTypes) => void;
    getVariable: (name: string) => AllowableTypes;
}
