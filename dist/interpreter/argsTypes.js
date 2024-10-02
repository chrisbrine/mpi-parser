"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupArgDefaults;
const interpreter_1 = require("@/interpreter/interpreter");
function setupArgDefaults() {
    interpreter_1.Interpreter.registerGlobalArgType("number", (arg) => typeof arg === "number");
    interpreter_1.Interpreter.registerGlobalArgType("string", (arg) => typeof arg === "string");
    interpreter_1.Interpreter.registerGlobalArgType("boolean", (arg) => typeof arg === "boolean");
    interpreter_1.Interpreter.registerGlobalArgType("float", (arg) => typeof arg === "number" && Number.isInteger(arg) === false);
    interpreter_1.Interpreter.registerGlobalArgType("any", () => true);
}
