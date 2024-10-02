"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpreter = void 0;
const interpreter_1 = require("@/interpreter/interpreter");
Object.defineProperty(exports, "Interpreter", { enumerable: true, get: function () { return interpreter_1.Interpreter; } });
const functions_1 = __importDefault(require("@/interpreter/functions"));
const argsTypes_1 = __importDefault(require("@/interpreter/argsTypes"));
(0, functions_1.default)();
(0, argsTypes_1.default)();
