import { Interpreter } from "@/interpreter/interpreter";
import { FunctionHandler, FunctionHandlerOverlap } from "@/types";

export default function setupStringFunctions() {
  Interpreter.registerGlobalFunction("concat", {
    fn: ((...strings: string[]) => strings.join("")) as FunctionHandler,
    argTypes: ["string[]"],
  });

  Interpreter.registerGlobalFunction("subst", {
    fn: ((string: string, start: number, length?: number) => {
      if (length === undefined) {
        return string.substring(start);
      } else {
        return string.substring(start, start + length);
      }
    }) as FunctionHandler,
    argTypes: ["string", "number", "number?"],
  });

  Interpreter.registerGlobalFunction("replace", {
    fn: ((string: string, search: string, replace: string) =>
      string.replace(new RegExp(search, "g"), replace)) as FunctionHandler,
    argTypes: ["string", "string", "string"],
  });

  Interpreter.registerGlobalFunction(
    "lit",
    {
      fn: (() => (text: string) => text) as FunctionHandlerOverlap,
      argTypes: ["string"],
      useOverlap: true,
    },
    ["literal"],
  );

  Interpreter.registerGlobalFunction("tab", {
    fn: () => "\t",
    argTypes: [],
  });

  Interpreter.registerGlobalFunction("instr", {
    fn: ((string: string, search: string) =>
      string.indexOf(search) + 1) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("midstr", {
    /*
    MIDSTR
{midstr:str,pos}
{midstr:str,pos1,pos2}
    Returns the substring that starts at pos1 within str.  If no pos2 is
given, then the returned string is only the character at the given pos1
position.  if a pos2 position is given, then it returns the substring
beginning at pos1 and ending at pos2, inclusive.  If pos1 or pos2 are
negative, then they represent the position that is that absolute number
of characters from the end of the string.  The first character in str is
1, and the last one can always be referenced by -1.  If a position would
be before the beginning of the string, it is assumed to be at the
beginning of the string.  If it would be beyond the end of the string, it
is assumed to be at the last character. If the starting position is later
in the string than the ending position, then the returned string has the
characters in reverse order.  If either pos1 or pos2 are 0, then this
returns a null string.  ("")
*/
    fn: ((string: string, pos1: number, pos2?: number) => {
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
    }) as FunctionHandler,
    argTypes: ["string", "number", "number?"],
  });

  Interpreter.registerGlobalFunction("strlen", {
    fn: ((string: string) => string.length) as FunctionHandler,
    argTypes: ["string"],
  });

  Interpreter.registerGlobalFunction("smatch", {
    /*
    {smatch:str,pattern}
    Matches 'str' against the wildcard pattern.  If there is a match,
this returns true, or "1".  If it doesn't match, this returns a value
of "0", or false.  In wildcard patterns, the following characters have
the following meanings:
    *               matches any number of any character.
    ?               matches one character, of any type.
    [abcde]         matches one char, if it is a, b, c, d, or e.
    [a-z]           matches one char, if it is between a and z, inclusive.
    [^abd-z]        matches one char is it is NOT a, b, or between d and z.
    {word1|word2}   matches one word, if it is word1, or word2.
    {^word1|word2}  matches one word, if it is NOT word1 or word2.
    \               escapes any of the prev chars, making it not special.
    */
    fn: ((string: string, pattern: string) =>
      new RegExp(
        "^" +
          pattern
            .replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
            .replace(/\*/g, ".*")
            .replace(/\?/g, ".")
            .replace(/\[/g, "[")
            .replace(/\]/g, "]")
            .replace(/\{/g, "(")
            .replace(/\}/g, ")")
            .replace(/\|/g, "|") +
          "$",
      ).test(string)) as FunctionHandler,
    argTypes: ["string", "string"],
  });

  Interpreter.registerGlobalFunction("strip", {
    fn: ((string: string) => string.trim()) as FunctionHandler,
    argTypes: ["string"],
  });

  Interpreter.registerGlobalFunction("tolower", {
    fn: ((string: string) => string.toLowerCase()) as FunctionHandler,
    argTypes: ["string"],
  });

  Interpreter.registerGlobalFunction("toupper", {
    fn: ((string: string) => string.toUpperCase()) as FunctionHandler,
    argTypes: ["string"],
  });

  Interpreter.registerGlobalFunction("right", {
    /* {right:str} or {right:str,fieldWidth} or {right: str, fieldWidth, padStringOfAnyLength} */
    fn: ((string: string, fieldWidth = 78, padString = " ") =>
      string.padStart(
        fieldWidth as number,
        padString as string,
      )) as FunctionHandler,
    argTypes: ["string", "number?", "string?"],
  });

  Interpreter.registerGlobalFunction("left", {
    /* {left:str} or {left:str,fieldWidth} or {left: str, fieldWidth, padStringOfAnyLength} */
    fn: ((string: string, fieldWidth = 78, padString = " ") =>
      string.padEnd(
        fieldWidth as number,
        padString as string,
      )) as FunctionHandler,
    argTypes: ["string", "number?", "string?"],
  });

  Interpreter.registerGlobalFunction("center", {
    /* {center:str} or {center:str,fieldWidth} or {center: str, fieldWidth, padStringOfAnyLength} */
    fn: ((string: string, fieldWidth = 78, padString = " ") => {
      const padLength = (fieldWidth as number) - string.length;
      const padStart = Math.floor(padLength / 2);
      const padEnd = Math.ceil(padLength / 2);
      return (
        (padString as string).repeat(padStart) +
        string +
        (padString as string).repeat(padEnd)
      );
    }) as FunctionHandler,
    argTypes: ["string", "number?", "string?"],
  });

  Interpreter.registerGlobalFunction("nl", {
    fn: () => "\n",
    argTypes: [],
  });
}
