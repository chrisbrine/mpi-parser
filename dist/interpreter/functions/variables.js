"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupVariableFunctions;
const interpreter_1 = require("@/interpreter/interpreter");
function setupVariableFunctions() {
    interpreter_1.Interpreter.registerGlobalFunction("set", {
        fn: (({ evaluator, obj }) => {
            return (variable, value) => {
                variable = evaluator(variable).toString();
                value = evaluator(value.toString());
                obj.setVariable(variable, value);
                return value;
            };
        }),
        argTypes: ["string", "any"],
        useOverlap: true,
    });
    interpreter_1.Interpreter.registerGlobalFunction("var", {
        fn: (({ evaluator, obj }) => {
            return (variable) => {
                variable = evaluator(variable).toString();
                return obj.getVariable(variable);
            };
        }),
        argTypes: ["string"],
        useOverlap: true,
    });
}
