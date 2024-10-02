"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupTimeFunctions;
const interpreter_1 = require("@/interpreter/interpreter");
function setupTimeFunctions() {
    interpreter_1.Interpreter.registerGlobalFunction("tzoffset", {
        fn: () => new Date().getTimezoneOffset(),
        argTypes: [],
    });
    interpreter_1.Interpreter.registerGlobalFunction("time", {
        fn: ((timezone) => {
            const date = new Date();
            if (timezone) {
                date.setHours(date.getHours() + Number(timezone));
            }
            return date.toTimeString().substring(0, 8);
        }),
        argTypes: ["string?"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("date", {
        fn: ((timezone) => {
            const date = new Date();
            if (timezone) {
                date.setHours(date.getHours() + Number(timezone));
            }
            return date.toLocaleDateString();
        }),
        argTypes: ["string?"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("ftime", {
        fn: ((format, timezone, seconds) => {
            const date = new Date();
            if (timezone) {
                date.setHours(date.getHours() + Number(timezone));
            }
            if (seconds) {
                date.setTime(Number(seconds) * 1000);
            }
            return date.toTimeString().substring(0, 8);
        }),
        argTypes: ["string", "string?", "string?"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("timestr", {
        fn: ((seconds) => {
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
            }
            else {
                timeStr += "0:";
            }
            if (minutes >= 1) {
                if (minutes < 10) {
                    timeStr += `0${minutes.toFixed(0)}:`;
                }
                else {
                    timeStr += `${minutes.toFixed(0)}:`;
                }
            }
            else {
                timeStr += "00";
            }
            if (secs >= 1) {
                if (secs < 10) {
                    timeStr += `0${secs.toFixed(0)}`;
                }
                else {
                    timeStr += `${secs.toFixed(0)}`;
                }
            }
            else {
                timeStr += "00";
            }
            return timeStr;
        }),
        argTypes: ["number"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("ltimestr", {
        fn: ((seconds) => {
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
        }),
        argTypes: ["number"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("stimestr", {
        fn: ((seconds) => {
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
        }),
        argTypes: ["number"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("secs", {
        fn: () => Math.floor(new Date().getTime() / 1000),
        argTypes: [],
    });
    interpreter_1.Interpreter.registerGlobalFunction("convtime", {
        fn: ((time) => {
            const date = new Date();
            date.setHours(Number(time.substring(0, 2)));
            date.setMinutes(Number(time.substring(3, 5)));
            date.setSeconds(Number(time.substring(6, 8)));
            date.setMonth(Number(time.substring(9, 11)) - 1);
            date.setDate(Number(time.substring(12, 14)));
            date.setFullYear(Number(time.substring(15, 19)));
            return Math.floor(date.getTime() / 1000);
        }),
        argTypes: ["string"],
    });
    interpreter_1.Interpreter.registerGlobalFunction("convsecs", {
        fn: ((seconds) => {
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
        }),
        argTypes: ["number"],
    });
}
