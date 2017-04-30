import _ = require("lodash");

export function PhoneFormat(s: string): string {
    if (IsNullOrEmpty(s))
        return '';

    switch (s.length) {
        case 9:
            return `${s.substr(0, 2)}-${s.substr(2, 3)}-${s.substr(5)}`;
        case 10:
            if (s.startsWith("02")) {
                return `${s.substr(0, 2)}-${s.substr(2, 4)}-${s.substr(6)}`;
            } else {
                return `${s.substr(0, 3)}-${s.substr(3, 3)}-${s.substr(6)}`;
            }
        case 11:
            return `${s.substr(0, 3)}-${s.substr(3, 4)}-${s.substr(7)}`;
        case 12:
            return `${s.substr(0, 4)}-${s.substr(4, 4)}-${s.substr(8)}`;
        default:
            return s;
    }
}

export function IsNullOrEmpty(word) {
    return word === undefined || word === null || word === '' ? true : false;
}

export function m2(py: number) {
    return py ? Math.round(py * 330.58) / 100 : "-";
}

export function nvl(value, defaultValue = null, func = null) {
    return IsNullOrEmpty(value) ? defaultValue : func ? func(value) : value;
}

export function IsInteger(s) {
    const n = Number(s);
    return n === +n && n === (n|0);
}

export function ToBoolean(value: string | boolean | number): boolean {
    return value === true || value === "true" || value > 0 ? true : false;
}

export function Distinct(list: any[]) : any[] {
    return nvl(list, [], l => {
        let set = [];
        l.forEach(i => {
            if (set.indexOf(i) < 0)
                set.push(i);
        });
        return set;
    });
}

