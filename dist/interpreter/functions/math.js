"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupMathFunctions;
const interpreter_1 = require("@/interpreter/interpreter");
function setupMathFunctions() {
    interpreter_1.Interpreter.registerGlobalFunction("add", {
        fn: ((nums) => nums.reduce((a, b) => a + b, 0)),
        argTypes: ["number[]"],
    }, ["addition"]);
    interpreter_1.Interpreter.registerGlobalFunction("subt", {
        fn: ((nums) => nums.reduce((a, b) => a - b)),
        argTypes: ["number[]"],
    }, ["subtract"]);
    interpreter_1.Interpreter.registerGlobalFunction("mult", {
        fn: ((nums) => nums.reduce((a, b) => a * b, 1)),
        argTypes: ["number[]"],
    }, ["multiply"]);
    interpreter_1.Interpreter.registerGlobalFunction("div", {
        fn: ((nums) => nums.reduce((a, b) => a / b)),
        argTypes: ["number[]"],
    }, ["divide"]);
    interpreter_1.Interpreter.registerGlobalFunction("mod", {
        fn: ((nums) => nums.reduce((a, b) => a % b)),
        argTypes: ["number[]"],
    }, ["modulo"]);
    interpreter_1.Interpreter.registerGlobalFunction("avg", {
        fn: ((numbers) => numbers.reduce((a, b) => a + b, 0) / numbers.length),
        argTypes: ["number[]"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("max", {
        fn: ((numbers) => Math.max(...numbers)),
        argTypes: ["number[]"],
    }, ["maximum"]);
    interpreter_1.Interpreter.registerGlobalFunction("min", {
        fn: ((numbers) => Math.min(...numbers)),
        argTypes: ["number[]"],
    }, ["minimum"]);
    interpreter_1.Interpreter.registerGlobalFunction("abs", {
        fn: ((number) => Math.abs(number)),
        argTypes: ["number"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("ceil", {
        fn: ((number) => Math.ceil(number)),
        argTypes: ["number"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("floor", {
        fn: ((number) => Math.floor(number)),
        argTypes: ["number"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("round", {
        fn: ((number) => Math.round(number)),
        argTypes: ["number"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("pow", {
        fn: ((nums) => nums.reduce((a, b) => Math.pow(a, b))),
        argTypes: ["number[]"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("rand", {
        fn: ((min, max) => Math.floor(Math.random() * (max - min + 1)) + min),
        argTypes: ["number", "number"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("inc", {
        fn: ((number, num2 = 1) => number + num2),
        argTypes: ["number", "number?"],
    }, ["increment"]);
    interpreter_1.Interpreter.registerGlobalFunction("dec", {
        fn: ((number, num2 = 1) => number - num2),
        argTypes: ["number", "number?"],
    }, ["decrement"]);
    interpreter_1.Interpreter.registerGlobalFunction("dice", {
        fn: ((sides, count = 1, add = 0) => {
            let total = 0;
            for (let i = 0; i < count; i++) {
                total += Math.floor(Math.random() * sides) + 1;
            }
            return total + add;
        }),
        argTypes: ["number", "number?", "number?"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("sign", {
        fn: ((number) => Math.sign(number)),
        argTypes: ["number"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("dist", {
        fn: ((...args) => {
            if (args.length === 2) {
                return Math.sqrt(args[0] ** 2 + args[1] ** 2);
            }
            else if (args.length === 3) {
                return Math.sqrt(args[0] ** 2 + args[1] ** 2 + args[2] ** 2);
            }
            return Math.sqrt((args[0] - args[3]) ** 2 +
                (args[1] - args[4]) ** 2 +
                (args[2] - args[5]) ** 2);
        }),
        argTypes: [
            "number",
            "number?",
            "number?",
            "number?",
            "number?",
            "number?",
        ],
    }, ["distance"]);
}
