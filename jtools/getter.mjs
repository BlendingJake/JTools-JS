import moment from "moment";

const _specials = {
    // general
    length: (value) => { return value.length; },

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
    parse_timestamp: (value) => { return moment.unix(value); },
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
    round: (value, n=2) => { return value.toFixed(2); },

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

const _func_def = new RegExp(/(?:\$[a-z]+(?:\(((?:(?!{{)(?:(?:"(?!{{)[^"]*")|[^\)]))*)\))?)/i);
const _field = new RegExp(/[-_a-zA-Z0-9]+/i);
const _part = new RegExp("(?:\\.(" + _func_def.source + "|" + _field.source + "))", "gi");
const _full_pattern = new RegExp("(" + _field.source + ")(" + _part.source + "*)", "i");

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
            parts.push(match[1]);

            if (match[2] !== "") {
                for (let part of match[2].matchAll(_part)) {
                    if (part[1][0] === "$") {
                        let special;
                        if (part[1].indexOf("(") !== -1) {
                            special = part[1].slice(1, part[1].indexOf("("));
                        } else {
                            special = part[1].slice(1);
                        }

                        let args;
                        if (part[2] !== undefined) {
                            args = JSON.parse(`[${part[2]}]`);
                        } else {
                            args = [];
                        }

                        parts.push({
                            special: special,
                            args: args
                        });
                    } else {
                        parts.push(part[1]);
                    }
                }
            }
        }

        return parts;
    }

    static full_regex() {
        return _full_pattern.source;
    }

    register_special(name, func) {
        if (_specials[name] !== undefined) {
            _specials[name] = func;
        } else {
            throw new Error(`${name} is already registered as a special value`);
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
