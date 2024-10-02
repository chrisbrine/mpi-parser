import { FunctionReturn } from "@/types";
import { Handler } from "@/interpreter/handler";
export declare class Interpreter extends Handler {
    evaluate: (input: string) => FunctionReturn;
    private extractInnermostFunction;
    private evaluateArithmetic;
    private validateArgs;
    private isValidType;
}
