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
    fallback: (value, fallback) => { return (value) ? value : fallback; },
    timestamp: (value, fmt="YYYY-MM-DD[T]HH:mm:ss[Z]") => {
        return moment.unix(value).utc().format(fmt);
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
    round: (value, n=2) => { return value.toPrecision(2); },

    // string
    prefix: (value, prefix) => { return prefix + value; },
    suffix: (value, suffix) => { return value + suffix; },
    replace: (value, old, new_) => { return value.replace(old, new_); },
    strip: (value) => { return value.trim(); },
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
        this.field = field;
        this.fallback = fallback;
        this.parts = [];
        this._process_field();
    }

    _process_field() {
        let match = this.field.match(_full_pattern);
        if (match !== null) {
            this.parts.push(match[1]);

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

                        this.parts.push({
                            special: special,
                            args: args
                        });
                    } else {
                        this.parts.push(part[1]);
                    }
                }
            }
        }
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

    get(item) {
        let value = item;
        if (this.parts.length === 0) {
            return this.fallback;
        } else {
            for (let part of this.parts) {
                if (part.special !== undefined) {
                    value = _specials[part.special](value, ...part.args);
                } else {
                    if (value[part] !== undefined) {
                        value = value[part];
                    } else {
                        return this.fallback;
                    }
                }
            }
        }

        return value;
    }
}
