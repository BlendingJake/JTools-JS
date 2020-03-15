import moment from "moment";
import { JQLQuery, JQLField, JQLSpecial, JQLList, JQLDict, JQLSet } from "./grammar/jql";
import { JQLQueryBuilder } from "./grammar/antlr_jql";
const _specials = {
    // general
    length: (value) => {
        if (value.size !== undefined) {
            return value.size;
        }
        else if (value.length !== undefined) {
            return value.length;
        }
        else {
            return Object.keys(value).length;
        }
    },
    lookup: (value, mp, fallback = null) => {
        return (mp[value] !== undefined) ? mp[value] : fallback;
    },
    inject: (_, value) => { return value; },
    print: (value) => { console.log(value); return value; },
    // maps
    keys: (value) => { return Object.keys(value); },
    values: (value) => { return Object.keys(value).map(key => value[key]); },
    items: (value) => { return Object.keys(value).map(key => [key, value[key]]); },
    wildcard: (value, nxt, just_field = true) => {
        let out = [];
        Object.keys(value).forEach(key => {
            try {
                if (value[key][nxt] !== undefined) {
                    out.push((just_field) ? value[key][nxt] : value[key]);
                }
            }
            catch (TypeError) {
            }
        });
        return out;
    },
    // type conversions
    set: (value) => { return new Set(value); },
    float: (value) => { return parseFloat(value); },
    string: (value) => { return value.toString(); },
    int: (value) => { return parseInt(value); },
    not: (value) => { return !value; },
    fallback: (value, fallback) => { return value || fallback; },
    ternary: (value, if_true, if_false, strict = false) => {
        if ((value && strict === false) || (value === true && strict === true)) {
            return if_true;
        }
        else {
            return if_false;
        }
    },
    // datetime
    parse_timestamp: (value) => { return moment.unix(value).utc(); },
    strptime: (value, fmt = null) => { return (fmt === null) ? moment(value) : moment(value, fmt); },
    timestamp: (value) => { return value.utc().unix(); },
    strftime: (value, fmt = "YYYY-MM-DD[T]HH:mm:ss[Z]") => {
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
        for (let i = 0; i < value.length; i++) {
            sum += Math.pow(other[i] - value[i], 2);
        }
        return Math.sqrt(sum);
    },
    math: (value, attr) => { return Math[attr](value); },
    round: (value, n = 2) => { return value.toFixed(n); },
    // string
    prefix: (value, prefix) => { return `${prefix}${value}`; },
    suffix: (value, suffix) => { return `${value}${suffix}`; },
    wrap: (value, prefix, suffix) => { return `${prefix}${value}${suffix}`; },
    strip: (value) => { return value.trim(); },
    replace: (value, old, new_) => { return value.replace(old, new_); },
    trim: (value, length = 50, suffix = "...") => {
        let trimmed = value.substring(0, length - suffix.length);
        if (value.length > length - suffix.length) {
            trimmed += suffix;
        }
        return trimmed;
    },
    split: (value, on = " ") => { return value.split(on); },
    // list
    sum: (value) => {
        let sum = 0;
        value.forEach(item => { sum += item; });
        return sum;
    },
    join: (value, sep = ", ") => { return value.join(sep); },
    index: (value, index, fallback = null) => {
        try {
            if (value[index] === undefined) {
                return fallback;
            }
            else {
                return value[index];
            }
        }
        catch (TypeError) {
            return fallback;
        }
    },
    range: (value, start, end = undefined) => {
        if (end !== undefined) {
            if (end < 0) { // support negative indices
                return value.slice(start, value.length - end);
            }
            else {
                return value.slice(start, end);
            }
        }
        else {
            return value.slice(start);
        }
    },
    remove_nulls: (value) => {
        let out = [];
        value.forEach(value => {
            if (value !== null && value !== undefined) {
                out.push(value);
            }
        });
        return out;
    },
    map: (value, special, ...args) => {
        return value.map(item => {
            return _specials[special](item, ...args);
        });
    },
    // attribute accessing
    call: (value, func, ...args) => {
        return value[func](...args);
    },
    attr: (value, attr) => {
        return value[attr];
    }
};
export class Query {
    constructor(query, fallback = null) {
        this.multiple = !(typeof query === "string" || query instanceof String || query instanceof JQLQuery);
        //@ts-ignore We know from the line above whether this is going to be a single string or array of strings
        this.queries = (this.multiple === true) ? query : [query];
        this.fallback = fallback;
        this.parts = [];
        this.queries.forEach((f) => {
            if (f instanceof JQLQuery) {
                this.parts.push(f);
            }
            else {
                try {
                    let p = new JQLQueryBuilder(f).get_built_query();
                    this.parts.push(p);
                }
                catch (JQLParseError) {
                    this.parts.push(null);
                }
            }
        });
    }
    static register_special(name, func) {
        if (_specials[name] === undefined) {
            _specials[name] = func;
            return true;
        }
        else {
            console.warn(`${name} is already registered as a special value`);
            return false;
        }
    }
    _query(value, query) {
        let og = value;
        query.parts.forEach(part => {
            if (part instanceof JQLField) {
                if (value !== this.fallback) {
                    try {
                        if (value[part.field] !== undefined) {
                            value = value[part.field];
                        }
                        else {
                            value = this.fallback;
                        }
                    }
                    catch (TypeError) {
                        value = this.fallback;
                    }
                }
            }
            else if (part instanceof JQLSpecial) {
                value = _specials[part.special](value, ...part.arguments.map(arg => this._value(og, arg)));
            }
        });
        return value;
    }
    _value(value, q_or_v) {
        if (q_or_v instanceof JQLQuery) {
            return this._query(value, q_or_v);
        }
        else if (q_or_v instanceof JQLList) {
            return q_or_v.value.map(part => this._value(value, part));
        }
        else if (q_or_v instanceof JQLDict) {
            let out = {};
            q_or_v.value.forEach(kv => {
                out[this._value(value, kv[0])] = this._value(value, kv[1]);
            });
            return out;
        }
        else if (q_or_v instanceof JQLSet) {
            let out = new Set();
            q_or_v.value.forEach(v => {
                out.add(this._value(value, v));
            });
            return out;
        }
        else {
            return q_or_v.value;
        }
    }
    single(item) {
        let values = [];
        this.parts.forEach(query => {
            if (query !== null) {
                values.push(this._query(item, query));
            }
            else {
                values.push(this.fallback);
            }
        });
        return (this.multiple === true) ? values : values[0];
    }
    many(items) {
        return items.map(item => this.single(item));
    }
}
