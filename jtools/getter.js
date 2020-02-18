import moment from "moment";

const _specials = {
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
    values: (value) => { return Object.values(value); },
    items: (value) => { return Object.entries(value); },

    // type conversions
    set: (value) => { return new Set(value); },
    float: (value) => { return parseFloat(value); },
    string: (value) => { return value.toString(); },
    int: (value) => { return parseInt(value); },
    not: (value) => { return !value; },
    fallback: (value, fallback) => { return (value) ? value : fallback; },
    ternary: (value, if_true, if_false, strict=false) => {
        if ( (value && strict === false) || (value === true && strict === true) ) {
            return if_true;
        } else {
            return if_false;
        }
    },

    // datetime
    parse_timestamp: (value) => { return moment.unix(value).utc(); },
    datetime: (value, attr) => { return value[attr](); },
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
            if (end < value.length) {  // support negative indices
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
};

const _func_def = new RegExp(/(?:\$[a-z_]+(?:\(((?:(?!{{)(?:(?:"(?!{{)[^"]*")|[^\)]))*)\))?)/i);
const _field = new RegExp(/[-_a-zA-Z0-9]+/i);
const _part = new RegExp("(?:\\.(" + _func_def.source + "|" + _field.source + "))", "gi");
const _full_pattern = new RegExp("(" + _func_def.source + "|" + _field.source + ")(" + _part.source + "*)", "i");

export class Getter {
    constructor(field, fallback=null) {
        this.multiple = !(typeof field === "string" || field instanceof String);
        this.field = (this.multiple === true) ? field : [field];
        this.fallback = fallback;

        this.parts = this.field.map(f => this._process_field(f));
    }

    _process_field(field) {
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

    _parse_special(text, args_text) {
        let special;
        if (text.indexOf("(") !== -1) {
            special = text.slice(1, text.indexOf("("));
        } else {
            special = text.slice(1);
        }

        let args;
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

    static full_regex() {
        return _full_pattern.source;
    }

    static register_special(name, func) {
        if (_specials[name] !== undefined) {
            _specials[name] = func;
            console.log(_specials[name]);
            return true;
        } else {
            console.warn(`${name} is already registered as a special value`);
            return false;
        }
    }

    single(item) {
        let values = [];
        if (this.parts.length === 0) {
            return this.fallback;
        } else {
            let value;
            for (let field of this.parts) {
                value = item;
                for (let part of field) {
                    if (value !== this.fallback) {
                        if (part.special !== undefined) {
                            value = _specials[part.special](value, ...part.args);
                        } else {
                            if (value[part] !== undefined) {
                                value = value[part];
                            } else {
                                value = this.fallback;
                            }
                        }
                    }
                }

                values.push(value);
            }
        }

        return (this.multiple === true) ? values : values[0];
    }

    many(items) {
        return items.map(item => this.single(item));
    }
}
