"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const handler_1 = require("@/interpreter/handler");
class Interpreter extends handler_1.Handler {
    evaluate = (input) => {
        while (input.includes("{")) {
            const { functionName, args, fullMatch } = this.extractInnermostFunction(input);
            const func = this.getFunction(functionName);
            if (!func) {
                throw new Error(`Function ${functionName} not found.`);
            }
            const { fn, argTypes, useOverlap } = func;
            let result;
            if (functionName.startsWith("&")) {
                result = this.getVariable(functionName.slice(1));
            }
            else if (useOverlap) {
                result = fn({
                    evaluator: this.evaluate,
                    validator: this.validateArgs,
                    types: this.argTypes,
                    obj: this,
                })(...args);
            }
            else {
                const processedArgs = args.map((arg) => this.evaluate(arg));
                this.validateArgs(processedArgs, argTypes, functionName);
                result = fn(...args);
            }
            input = input.replace(fullMatch, this.evaluateArithmetic(result.toString()));
        }
        return input;
    };
    extractInnermostFunction(input) {
        let functionName = "";
        let inFunctionName = true;
        const args = [];
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
            }
            else if (char === "}") {
                nestedLevel--;
                if (nestedLevel < 0) {
                    if (!inFunctionName && currentArg !== "") {
                        args.push(currentArg);
                    }
                    break;
                }
            }
            else if (nestedLevel < 0) {
                continue;
            }
            if (inFunctionName) {
                if (char === ":") {
                    inFunctionName = false;
                }
                else if (![" ", "\r", "\n", "\t"].includes(char)) {
                    functionName += char;
                }
            }
            else {
                if (char === "," && nestedLevel === 0) {
                    args.push(currentArg);
                    currentArg = "";
                }
                else {
                    currentArg += char;
                }
            }
        }
        if (nestedLevel >= 0) {
            throw new Error(`${functionName}: Unmatched braces in input string.`);
        }
        return { functionName, args, fullMatch };
    }
    evaluateArithmetic(expression) {
        try {
            return new Function(`return ${expression};`)();
        }
        catch {
            return expression;
        }
    }
    validateArgs(args, expectedTypes, functionName) {
        let isInArrayMode = false;
        let arrayType = "";
        if (args.length > expectedTypes.length &&
            !expectedTypes[expectedTypes.length - 1].endsWith("[]")) {
            throw new Error(`${functionName}: Too many arguments provided. Expected ${expectedTypes.length}, but got ${args.length}.`);
        }
        for (let i = 0; i < expectedTypes.length; i++) {
            const expectedType = expectedTypes[i];
            let arg = args[i];
            const isOptional = expectedType.endsWith("?");
            const baseType = isOptional ? expectedType.slice(0, -1) : expectedType;
            const isArray = baseType.endsWith("[]");
            const baseArrayType = isArray ? baseType.slice(0, -2) : baseType;
            if (isArray && !isInArrayMode) {
                isInArrayMode = true;
                arrayType = baseArrayType;
            }
            if (isInArrayMode) {
                for (let j = i; j < args.length; j++) {
                    arg = args[j];
                    if (!this.isValidType(arg, arrayType)) {
                        throw new Error(`${functionName}: Argument ${arg} at index ${j} must be of type ${arrayType}[]`);
                    }
                }
                break;
            }
            if (isOptional && (arg === undefined || arg === null)) {
                continue;
            }
            if (!this.isValidType(arg, baseType)) {
                throw new Error(`${functionName}: Argument ${arg} at index ${i} must be of type ${baseType}`);
            }
        }
        if (!isInArrayMode && args.length > expectedTypes.length) {
            throw new Error(`${functionName}: Too many arguments provided. Expected ${expectedTypes.length}, but got ${args.length}.`);
        }
    }
    isValidType(arg, type) {
        const validateFn = this.getArgType(type);
        return validateFn ? validateFn(arg) : false;
    }
}
exports.Interpreter = Interpreter;
