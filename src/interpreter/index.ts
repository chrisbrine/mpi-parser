import { Interpreter } from "@/interpreter/interpreter";
import setupFunctions from "@/interpreter/functions";
import setupArgTypes from "@/interpreter/argsTypes";

setupFunctions();
setupArgTypes();

export { Interpreter };
