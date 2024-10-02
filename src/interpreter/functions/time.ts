import { Interpreter } from "@/interpreter/interpreter";
import { FunctionHandler } from "@/types";

export default function setupTimeFunctions() {
  Interpreter.registerGlobalFunction("tzoffset", {
    fn: () => new Date().getTimezoneOffset(),
    argTypes: [],
  });

  Interpreter.registerGlobalFunction("time", {
    /* Returns a time string in the 24hr form hh:mm:ss.  If the timezone
argument is given, then it offsets the time returned by that number
of hours. */
    fn: ((timezone?: string) => {
      const date = new Date();
      if (timezone) {
        date.setHours(date.getHours() + Number(timezone));
      }
      return date.toTimeString().substring(0, 8);
    }) as FunctionHandler,
    argTypes: ["string?"],
  });

  Interpreter.registerGlobalFunction("date", {
    /* Returns a date string in the form mm/dd/yyyy.  If the timezone
argument is given, then it offsets the date returned by that number
of hours. */
    fn: ((timezone?: string) => {
      const date = new Date();
      if (timezone) {
        date.setHours(date.getHours() + Number(timezone));
      }
      return date.toLocaleDateString();
    }) as FunctionHandler,
    argTypes: ["string?"],
  });

  Interpreter.registerGlobalFunction("ftime", {
    /*
    {ftime:format}
{ftime:format,tz}
{ftime:format,tz,secs}
    Returns a time string in the format you specify.  See 'man timefmt' for
the %subs that you can use in the format string.  If specified, tz is the
number of seconds offset from UTC.  If specified, secs is the systime to
use, instead of the current time.  {ftime:%x %X,{tzoffset},0} will return
the date and time for systime 0, for the local time zone of the server.
ftime processes format strings with the C function strftime().
*/
    fn: ((format: string, timezone?: string, seconds?: string) => {
      const date = new Date();
      if (timezone) {
        date.setHours(date.getHours() + Number(timezone));
      }
      if (seconds) {
        date.setTime(Number(seconds) * 1000);
      }
      return date.toTimeString().substring(0, 8);
    }) as FunctionHandler,
    argTypes: ["string", "string?", "string?"],
  });

  Interpreter.registerGlobalFunction("timestr", {
    /*
    {timestr:secs}
    Given a time period in seconds, this will return a concise abbreviated
string representation of how long that time was.  This might return a value
like "9d 12:56" for 9 days, 12 hours, and 56 minutes.
*/
    fn: ((seconds: number) => {
      const [years, months, weeks, days, hours, minutes, secs] = [
        seconds / (60 * 60 * 24 * 365),
        (seconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30),
        (seconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24 * 7),
        (seconds % (60 * 60 * 24 * 7)) / (60 * 60 * 24),
        (seconds % (60 * 60 * 24)) / (60 * 60),
        (seconds % (60 * 60)) / 60,
        seconds % 60,
      ];
      let timeStr = "";
      if (years >= 1) {
        timeStr += `${years.toFixed(0)}y `;
      }

      if (months >= 1) {
        timeStr += `${months.toFixed(0)}m `;
      }

      if (weeks >= 1) {
        timeStr += `${weeks.toFixed(0)}w `;
      }

      if (days >= 1) {
        timeStr += `${days.toFixed(0)}d `;
      }

      if (hours >= 1) {
        timeStr += `${hours.toFixed(0)}:`;
      } else {
        timeStr += "0:";
      }

      if (minutes >= 1) {
        if (minutes < 10) {
          timeStr += `0${minutes.toFixed(0)}:`;
        } else {
          timeStr += `${minutes.toFixed(0)}:`;
        }
      } else {
        timeStr += "00";
      }

      if (secs >= 1) {
        if (secs < 10) {
          timeStr += `0${secs.toFixed(0)}`;
        } else {
          timeStr += `${secs.toFixed(0)}`;
        }
      } else {
        timeStr += "00";
      }

      return timeStr;
    }) as FunctionHandler,
    argTypes: ["number"],
  });

  Interpreter.registerGlobalFunction("ltimestr", {
    /*
    {ltimestr:secs}
    Given a time period, in seconds, this will return a string, including a
breakdown of all the time units of that period.  For example, given a number
of seconds, it might return:
        3 years, 10 months, 4 weeks, 1 day, 18 hours, 40 mins, 21 secs
        */
    fn: ((seconds: number) => {
      const [years, months, weeks, days, hours, minutes, secs] = [
        seconds / (60 * 60 * 24 * 365),
        (seconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30),
        (seconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24 * 7),
        (seconds % (60 * 60 * 24 * 7)) / (60 * 60 * 24),
        (seconds % (60 * 60 * 24)) / (60 * 60),
        (seconds % (60 * 60)) / 60,
        seconds % 60,
      ];
      let timeStr = "";
      if (years >= 1) {
        timeStr += `${years.toFixed(0)} years, `;
      }
      if (months >= 1) {
        timeStr += `${months.toFixed(0)} months, `;
      }
      if (weeks >= 1) {
        timeStr += `${weeks.toFixed(0)} weeks, `;
      }
      if (days >= 1) {
        timeStr += `${days.toFixed(0)} days, `;
      }
      if (hours >= 1) {
        timeStr += `${hours.toFixed(0)} hours, `;
      }
      if (minutes >= 1) {
        timeStr += `${minutes.toFixed(0)} minutes, `;
      }
      if (secs >= 1) {
        timeStr += `${secs.toFixed(0)} seconds`;
      }
      if (timeStr.endsWith(", ")) {
        timeStr = timeStr.substring(0, timeStr.length - 2);
      }
      return timeStr;
    }) as FunctionHandler,
    argTypes: ["number"],
  });

  Interpreter.registerGlobalFunction("stimestr", {
    /*
    {stimestr:secs}
    Given a time period, in seconds, this will return the most significant
time unit of that time period.  For example, a number of seconds, that is
equivalent to 9 days, 23 hours, 10 minutes, and 52 seconds, will be have
the value "9d" returned, as the abbreviated most significant time unit.
*/
    fn: ((seconds: number) => {
      const [years, months, weeks, days, hours, minutes, secs] = [
        seconds / (60 * 60 * 24 * 365),
        (seconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24 * 30),
        (seconds % (60 * 60 * 24 * 30)) / (60 * 60 * 24 * 7),
        (seconds % (60 * 60 * 24 * 7)) / (60 * 60 * 24),
        (seconds % (60 * 60 * 24)) / (60 * 60),
        (seconds % (60 * 60)) / 60,
        seconds % 60,
      ];
      if (years >= 1) {
        return `${years.toFixed(0)}y`;
      }
      if (months >= 1) {
        return `${months.toFixed(0)}m`;
      }
      if (weeks >= 1) {
        return `${weeks.toFixed(0)}w`;
      }
      if (days >= 1) {
        return `${days.toFixed(0)}d`;
      }
      if (hours >= 1) {
        return `${hours.toFixed(0)}h`;
      }
      if (minutes >= 1) {
        return `${minutes.toFixed(0)}m`;
      }
      return `${secs.toFixed(0)}s`;
    }) as FunctionHandler,
    argTypes: ["number"],
  });

  Interpreter.registerGlobalFunction("secs", {
    /*
    {secs}
    Returns systime in seconds.
    */
    fn: () => Math.floor(new Date().getTime() / 1000),
    argTypes: [],
  });

  Interpreter.registerGlobalFunction("convtime", {
    /*
    {convtime:time}
    Converts time string from "HH:MM:SS MO/DY/YR" format to systime seconds.
    */
    fn: ((time: string) => {
      const date = new Date();
      date.setHours(Number(time.substring(0, 2)));
      date.setMinutes(Number(time.substring(3, 5)));
      date.setSeconds(Number(time.substring(6, 8)));
      date.setMonth(Number(time.substring(9, 11)) - 1);
      date.setDate(Number(time.substring(12, 14)));
      date.setFullYear(Number(time.substring(15, 19)));
      return Math.floor(date.getTime() / 1000);
    }) as FunctionHandler,
    argTypes: ["string"],
  });

  Interpreter.registerGlobalFunction("convsecs", {
    /*
    {convsecs:secs}
    Converts systime seconds to time string in "HH:MM:SS MO/DY/YR" format.
    */
    fn: ((seconds: number) => {
      const date = new Date(seconds * 1000);
      const [hours, minutes, secs, month, day, year] = [
        date.getHours(),
        date.getMinutes().toString().padStart(2, "0"),
        date.getSeconds().toString().padStart(2, "0"),
        (date.getMonth() + 1).toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0"),
        date.getFullYear().toString().substring(2),
      ];

      return `${hours}:${minutes}:${secs} ${month}/${day}/${year}`;
    }) as FunctionHandler,
    argTypes: ["number"],
  });
}
