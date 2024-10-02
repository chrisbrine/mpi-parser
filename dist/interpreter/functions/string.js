"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupStringFunctions;
const interpreter_1 = require("@/interpreter/interpreter");
function setupStringFunctions() {
    interpreter_1.Interpreter.registerGlobalFunction("concat", {
        fn: ((...strings) => strings.join("")),
        argTypes: ["string[]"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("subst", {
        fn: ((string, start, length) => {
            if (length === undefined) {
                return string.substring(start);
            }
            else {
                return string.substring(start, start + length);
            }
        }),
        argTypes: ["string", "number", "number?"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("replace", {
        fn: ((string, search, replace) => string.replace(new RegExp(search, "g"), replace)),
        argTypes: ["string", "string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("lit", {
        fn: (() => (text) => text),
        argTypes: ["string"],
        useOverlap: true,
    }, ["literal"]);
    interpreter_1.Interpreter.registerGlobalFunction("tab", {
        fn: () => "\t",
        argTypes: [],
    });
    interpreter_1.Interpreter.registerGlobalFunction("instr", {
        fn: ((string, search) => string.indexOf(search) + 1),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("midstr", {
        fn: ((string, pos1, pos2) => {
            if (pos1 === 0 || pos2 === 0) {
                return "";
            }
            if (pos1 < 0) {
                pos1 = string.length + pos1 + 1;
            }
            if (pos2 === undefined) {
                return string.charAt(pos1 - 1);
            }
            if (pos2 < 0) {
                pos2 = string.length + pos2 + 1;
            }
            if (pos1 > pos2) {
                [pos1, pos2] = [pos2, pos1];
            }
            return string.substring(pos1 - 1, pos2);
        }),
        argTypes: ["string", "number", "number?"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("strlen", {
        fn: ((string) => string.length),
        argTypes: ["string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("smatch", {
        fn: ((string, pattern) => new RegExp("^" +
            pattern
                .replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
                .replace(/\*/g, ".*")
                .replace(/\?/g, ".")
                .replace(/\[/g, "[")
                .replace(/\]/g, "]")
                .replace(/\{/g, "(")
                .replace(/\}/g, ")")
                .replace(/\|/g, "|") +
            "$").test(string)),
        argTypes: ["string", "string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("strip", {
        fn: ((string) => string.trim()),
        argTypes: ["string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("tolower", {
        fn: ((string) => string.toLowerCase()),
        argTypes: ["string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("toupper", {
        fn: ((string) => string.toUpperCase()),
        argTypes: ["string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("right", {
        fn: ((string, fieldWidth = 78, padString = " ") => string.padStart(fieldWidth, padString)),
        argTypes: ["string", "number?", "string?"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("left", {
        fn: ((string, fieldWidth = 78, padString = " ") => string.padEnd(fieldWidth, padString)),
        argTypes: ["string", "number?", "string?"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("center", {
        fn: ((string, fieldWidth = 78, padString = " ") => {
            const padLength = fieldWidth - string.length;
            const padStart = Math.floor(padLength / 2);
            const padEnd = Math.ceil(padLength / 2);
            return (padString.repeat(padStart) +
                string +
                padString.repeat(padEnd));
        }),
        argTypes: ["string", "number?", "string?"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("nl", {
        fn: () => "\n",
        argTypes: [],
    });
}
