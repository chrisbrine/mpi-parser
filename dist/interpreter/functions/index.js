"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupFunctions;
const math_1 = __importDefault(require("./math"));
const operatives_1 = __importDefault(require("./operatives"));
const string_1 = __importDefault(require("./string"));
const time_1 = __importDefault(require("./time"));
const variables_1 = __importDefault(require("./variables"));
function setupFunctions() {
    (0, math_1.default)();
    (0, operatives_1.default)();
    (0, string_1.default)();
    (0, time_1.default)();
    (0, variables_1.default)();
}
