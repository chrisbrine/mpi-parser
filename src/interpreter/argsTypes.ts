import { Interpreter } from "@/interpreter/interpreter";

export default function setupArgDefaults() {
  Interpreter.registerGlobalArgType(
    "number",
    (arg: unknown) => typeof arg === "number",
  );
  Interpreter.registerGlobalArgType(
    "string",
    (arg: unknown) => typeof arg === "string",
  );
  Interpreter.registerGlobalArgType(
    "boolean",
    (arg: unknown) => typeof arg === "boolean",
  );
  Interpreter.registerGlobalArgType(
    "float",
    (arg: unknown) =>
      typeof arg === "number" && Number.isInteger(arg) === false,
  );
  Interpreter.registerGlobalArgType("any", () => true);
}
