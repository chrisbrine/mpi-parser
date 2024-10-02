import setupMathFunctions from "./math";
import setupOperatorFunctions from "./operatives";
import setupStringFunctions from "./string";
import setupTimeFunctions from "./time";
import setupVariableFunctions from "./variables";

export default function setupFunctions() {
  setupMathFunctions();
  setupOperatorFunctions();
  setupStringFunctions();
  setupTimeFunctions();
  setupVariableFunctions();
}
