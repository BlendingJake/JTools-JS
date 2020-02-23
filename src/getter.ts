import moment from "moment";

type SpecialFunction = (value: any, ...args: any[]) => any;

const _specials: {[key: string]: SpecialFunction} = {
    // general
    length: (value) => {
        if (value.size !== undefined) {
            return value.size;
        } else if (value.length !== undefined) {
            return value.length;
        } else {
            return Object.keys(value).length;
        }
    },

    // maps
    keys: (value) => { return Object.keys(value); },
    values: (value) => { return Object.keys(value).map(key => value[key]); },
    items: (value) => { return Object.keys(value).map(key => [key, value[key]]); },

    // type conversions
    set: (value) => { return new Set(value); },
    float: (value) => { return parseFloat(value); },
    string: (value) => { return value.toString(); },
    int: (value) => { return parseInt(value); },
    not: (value) => { return !value; },
    fallback: (value, fallback) => { return value || fallback; },
    ternary: (value, if_true, if_false, strict=false) => {
        if ( (value && strict === false) || (value === true && strict === true) ) {
            return if_true;
        } else {
            return if_false;
        }
    },

    // datetime
    parse_timestamp: (value) => { return moment.unix(value).utc(); },
    strptime: (value, fmt=null) => { return (fmt === null) ? moment(value) : moment(value, fmt); },
    timestamp: (value) => { return value.utc().unix(); },
    strftime: (value, fmt="YYYY-MM-DD[T]HH:mm:ss[Z]") => {
        return value.format(fmt);
    },

    // math / numeric
    add: (value, num) => { return value + num; },
    subtract: (value, num) => { return value - num; },
    multiply: (value, num) => { return value * num; },
    divide: (value, num) => { return value / num; },
    pow: (value, num) => { return Math.pow(value, num); },
    abs: (value) => { return Math.abs(value); },
    distance: (value, other) => {
        let sum = 0;
        for (let i=0; i<value.length; i++) {
            sum += Math.pow(other[i] - value[i], 2);
        }
        return Math.sqrt(sum);
    },
    math: (value, attr) => { return Math[attr](value); },
    round: (value, n=2) => { return value.toFixed(n); },

    // string
    prefix: (value, prefix) => { return prefix + value; },
    suffix: (value, suffix) => { return value + suffix; },
    strip: (value) => { return value.trim(); },
    replace: (value, old, new_) => { return value.replace(old, new_); },
    trim: (value, length=50, suffix="...") => {
        let trimmed = value.substring(0, length-suffix.length);
        if (value.length > length-suffix.length) {
            trimmed += suffix;
        }
        return trimmed;
    },
    split: (value, on=" ") => { return value.split(on); },

    // list
    sum: (value) => {
        let sum = 0;
        value.forEach(item => { sum += item; });
        return sum;
    },
    join: (value, sep=", ") => { return value.join(sep); },
    index: (value, index) => {
        if (typeof index === "number") {
            if (index < 0) {  // support negative indices
                return value[value.length+index];
            } else {
                return value[index];
            }
        } else {
            return value[index];
        }
    },
    range: (value, start, end=undefined) => {
        if (end !== undefined) {
            if (end < 0) {  // support negative indices
                return value.slice(start, value.length-end);
            } else {
                return value.slice(start, end);
            }
        } else {
            return value.slice(start);
        }
    },
    map: (value, special, ...args) => { return value.map(item => {
        return _specials[special](item, ...args);
    })},

    // attribute accessing
    call: (value, func, ...args) => {
        return value[func](...args);
    },
    attr: (value, attr) => {
        return value[attr];
    }
};

const _func_def = new RegExp(/(?:\$[a-z_]+(?:\(((?:(?!{{)(?:(?:"(?!{{)[^"]*")|[^)]))*)\))?)/i);
const _field = new RegExp(/[-_a-zA-Z0-9]+/i);
const _part = new RegExp("(?:\\.(" + _func_def.source + "|" + _field.source + "))", "gi");
const _full_pattern = new RegExp("(" + _func_def.source + "|" + _field.source + ")(" + _part.source + "*)", "i");

interface Special {
    special: string
    args: any[]
}

export class Getter {
    private readonly multiple: boolean;
    private readonly field: string[];
    private readonly fallback: any;
    private readonly parts: (string | Special)[][];

    constructor(field: string | string[], fallback=null) {
        this.multiple = !(typeof field === "string" || field instanceof String);
        //@ts-ignore We know from the line above whether this is going to be a single string or array of strings
        this.field = (this.multiple === true) ? field : [field];
        this.fallback = fallback;

        this.parts = this.field.map(f => this._process_field(f));
    }

    _process_field(field: string): (string | Special)[] {
        let parts = [];
        let match = field.match(_full_pattern);
        if (match !== null) {
            if (match[1][0] === "$") {
                parts.push(this._parse_special(match[1], match[2]));
            } else {
                parts.push(match[1]);
            }
            if (match[3] !== "") {
                for (let part of match[3].matchAll(_part)) {
                    if (part[1][0] === "$") {
                        parts.push(this._parse_special(part[1], part[2]));
                    } else {
                        parts.push(part[1]);
                    }
                }
            }
        }

        return parts;
    }

    _parse_special(text: string, args_text: string): Special {
        let special: string;
        if (text.indexOf("(") !== -1) {
            special = text.slice(1, text.indexOf("("));
        } else {
            special = text.slice(1);
        }

        let args: any[];
        if (args_text !== undefined) {
            args = JSON.parse(`[${args_text}]`);
        } else {
            args = [];
        }

        return {
            special: special,
            args: args
        };
    }

    static full_regex(): string {
        return _full_pattern.source;
    }

    static register_special(name: string, func: SpecialFunction): boolean {
        if (_specials[name] === undefined) {
            _specials[name] = func;
            return true;
        } else {
            console.warn(`${name} is already registered as a special value`);
            return false;
        }
    }

    single(item: any): any | any[] {
        let values = [];
        let value: any;
        for (let field of this.parts) {
            value = item;

            if (field.length === 0) {
                value = this.fallback;
            } else {
                for (let part of field) {
                    if (value !== this.fallback) {
                        if ((part as Special).special !== undefined) {
                            value = _specials[(part as Special).special](value, ...(part as Special).args);
                        } else {
                            if (value[(part as string)] !== undefined) {
                                value = value[(part as string)];
                            } else {
                                value = this.fallback;
                            }
                        }
                    }
                }
            }

            values.push(value);
        }

        return (this.multiple === true) ? values : values[0];
    }

    many(items: any[]): any[] | any[][] {
        return items.map(item => this.single(item));
    }
}
