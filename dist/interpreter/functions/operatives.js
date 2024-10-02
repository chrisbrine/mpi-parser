"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupOperatorFunctions;
const interpreter_1 = require("@/interpreter/interpreter");
function evaluateValue(value) {
    if (!isNaN(Number(value))) {
        return Number(value);
    }
    else if (value.toLowerCase() === "true") {
        return true;
    }
    else if (value.toLowerCase() === "false") {
        return false;
    }
    return value;
}
function setupOperatorFunctions() {
    interpreter_1.Interpreter.registerGlobalFunction("if", {
        fn: (({ evaluator }) => (condition, trueValue, falseValue) => evaluateValue(evaluator(condition).toString())
            ? evaluator(trueValue)
            : evaluator(falseValue || "")),
        argTypes: ["string", "string", "string?"],
        useOverlap: true,
    });
    interpreter_1.Interpreter.registerGlobalFunction("eq", {
        fn: ((a, b) => evaluateValue(a) === evaluateValue(b)),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("ne", {
        fn: ((a, b) => evaluateValue(a) !== evaluateValue(b)),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("gt", {
        fn: ((a, b) => evaluateValue(a) > evaluateValue(b)),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("lt", {
        fn: ((a, b) => evaluateValue(a) < evaluateValue(b)),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("ge", {
        fn: ((a, b) => evaluateValue(a) >= evaluateValue(b)),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("le", {
        fn: ((a, b) => evaluateValue(a) <= evaluateValue(b)),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("and", {
        fn: ((a, b) => evaluateValue(a) && evaluateValue(b)),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("or", {
        fn: ((a, b) => evaluateValue(a) || evaluateValue(b)),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("not", {
        fn: ((a) => !evaluateValue(a)),
        argTypes: ["boolean"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("default", {
        fn: ((a, b) => evaluateValue(a) ? a : b),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("xor", {
        fn: ((a, b) => {
            const valueA = evaluateValue(a);
            const valueB = evaluateValue(b);
            return (valueA || valueB) && !(valueA && valueB);
        }),
        argTypes: ["string", "string"],
    });
}
