"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
class Handler {
    functions;
    static globalFunctions = new Map();
    argTypes;
    static globalArgTypes = new Map();
    localVariables;
    static globalVariables = new Map();
    constructor() {
        this.functions = new Map();
        this.argTypes = new Map();
        this.localVariables = new Map();
    }
    registerArgType = (name, fn) => {
        this.argTypes.set(name, fn);
    };
    static registerGlobalArgType = (name, fn) => {
        Handler.globalArgTypes.set(name, fn);
    };
    getArgType = (name) => {
        if (this.argTypes.has(name)) {
            return this.argTypes.get(name);
        }
        else if (Handler.globalArgTypes.has(name)) {
            return Handler.globalArgTypes.get(name);
        }
        else {
            throw new Error(`Argument type not found: ${name}`);
        }
    };
    registerFunction = (name, fn, aliases) => {
        this.functions.set(name, fn);
        if (aliases) {
            aliases.forEach((alias) => {
                this.functions.set(alias, fn);
            });
        }
    };
    static registerGlobalFunction = (name, fn, aliases) => {
        Handler.globalFunctions.set(name, fn);
        if (aliases) {
            aliases.forEach((alias) => {
                Handler.globalFunctions.set(alias, fn);
            });
        }
    };
    getFunction = (name) => {
        if (this.functions.has(name)) {
            return this.functions.get(name);
        }
        else if (Handler.globalFunctions.has(name)) {
            return Handler.globalFunctions.get(name);
        }
        else {
            throw new Error(`Function ${name} is not defined.`);
        }
    };
    setVariable = (name, value) => {
        this.localVariables.set(name, value);
    };
    static setGlobalVariable = (name, value) => {
        Handler.globalVariables.set(name, value);
    };
    getVariable = (name) => {
        if (this.localVariables.has(name)) {
            return this.localVariables.get(name);
        }
        else if (Handler.globalVariables.has(name)) {
            return Handler.globalVariables.get(name);
        }
        else {
            throw new Error(`Variable not found: ${name}`);
        }
    };
}
exports.Handler = Handler;
