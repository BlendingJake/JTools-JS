import moment from "moment";
import { JQLQuery, JQLField, JQLSpecial, JQLList, JQLDict, JQLSet } from "./grammar/jql";
import { JQLQueryBuilder } from "./grammar/antlr_jql";
const SPECIALS = {
    // general
    length: (value, context) => {
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
    lookup: (value, context, mp, fallback = null) => {
        return (mp[value] !== undefined) ? mp[value] : fallback;
    },
    inject: (_, context, value) => { return value; },
    print: (value, context) => { console.log(value); return value; },
    store_as: (value, context, name) => {
        context[name] = value;
        return value;
    },
    group_by: (value, context, key = "", count = false) => {
        const query = new Query(key);
        const out = {};
        value.map(v => {
            const part = query.single(v);
            if (out[part] !== undefined) {
                if (count) {
                    out[part] += 1;
                }
                else {
                    out[part].push(v);
                }
            }
            else {
                if (count) {
                    out[part] = 1;
                }
                else {
                    out[part] = [v];
                }
            }
        });
        return out;
    },
    // maps
    keys: (value, context) => { return Object.keys(value); },
    values: (value, context) => { return Object.keys(value).map(key => value[key]); },
    items: (value, context) => { return Object.keys(value).map(key => [key, value[key]]); },
    wildcard: (value, context, nxt, just_field = true) => {
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
    set: (value, context) => { return new Set(value); },
    float: (value, context) => { return parseFloat(value); },
    string: (value, context) => { return value.toString(); },
    dict: (value, context) => {
        const out = {};
        value.forEach(v => {
            out[v[0]] = v[1];
        });
        return out;
    },
    int: (value, context) => { return parseInt(value); },
    not: (value, context) => { return !value; },
    fallback: (value, context, fallback) => { return value || fallback; },
    ternary: (value, context, if_true, if_false, strict = false) => {
        if ((value && strict === false) || (value === true && strict === true)) {
            return if_true;
        }
        else {
            return if_false;
        }
    },
    // datetime
    parse_timestamp: (value, context) => { return moment.unix(value).utc(); },
    strptime: (value, context, fmt = null) => { return (fmt === null) ? moment(value) : moment(value, fmt); },
    timestamp: (value, context) => { return value.utc().unix(); },
    strftime: (value, context, fmt = "YYYY-MM-DD[T]HH:mm:ss[Z]") => {
        return value.format(fmt);
    },
    // math / numeric
    add: (value, context, num) => { return value + num; },
    subtract: (value, context, num) => { return value - num; },
    multiply: (value, context, num) => { return value * num; },
    divide: (value, context, num) => { return value / num; },
    pow: (value, context, num) => { return Math.pow(value, num); },
    abs: (value, context) => { return Math.abs(value); },
    distance: (value, context, other) => {
        let sum = 0;
        for (let i = 0; i < value.length; i++) {
            sum += Math.pow(other[i] - value[i], 2);
        }
        return Math.sqrt(sum);
    },
    math: (value, context, attr) => { return Math[attr](value); },
    round: (value, context, n = 2) => { return value.toFixed(n); },
    // string
    prefix: (value, context, prefix) => { return `${prefix}${value}`; },
    suffix: (value, context, suffix) => { return `${value}${suffix}`; },
    wrap: (value, context, prefix, suffix) => { return `${prefix}${value}${suffix}`; },
    strip: (value, context) => { return value.trim(); },
    replace: (value, context, old, new_) => { return value.replace(old, new_); },
    trim: (value, context, length = 50, suffix = "...") => {
        let trimmed = value.substring(0, length - suffix.length);
        if (value.length > length - suffix.length) {
            trimmed += suffix;
        }
        return trimmed;
    },
    split: (value, context, on = " ") => { return value.split(on); },
    // list
    sum: (value, context) => {
        let sum = 0;
        value.forEach(item => { sum += item; });
        return sum;
    },
    join: (value, context, sep = ", ") => { return value.join(sep); },
    join_arg: (_, context, arg, sep = ", ") => {
        return arg.join(sep);
    },
    index: (value, context, index, fallback = null) => {
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
    range: (value, context, start, end = undefined) => {
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
    remove_nulls: (value, context) => {
        let out = [];
        value.forEach(value => {
            if (value !== null && value !== undefined) {
                out.push(value);
            }
        });
        return out;
    },
    sort: (value, context, key = "", reverse = false) => {
        const query = new Query(key);
        const multi = (reverse) ? -1 : 1;
        return value.map(v => v).sort((a, b) => {
            return (query.single(a) < query.single(b)) ? -1 * multi : multi;
        });
    },
    map: (value, context, special, ...args) => {
        return value.map(item => {
            return SPECIALS[special](item, context, ...args);
        });
    },
    // attribute accessing
    call: (value, context, func, ...args) => {
        return value[func](...args);
    },
    attr: (value, context, attr) => {
        return value[attr];
    }
};
export class Query {
    /**
     * Create a query object from a JQL query string, or a list of JQL query strings
     * @param query The JQL query string(s)
     * @param fallback A fallback vlaue that will be used if a field cannot be found
     */
    constructor(query, fallback = null) {
        this.multiple = Array.isArray(query);
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
                    let p;
                    if (f === "") {
                        p = new JQLQuery();
                    }
                    else {
                        p = new JQLQueryBuilder(f).get_built_query();
                    }
                    this.parts.push(p);
                }
                catch (JQLParseError) {
                    this.parts.push(null);
                }
            }
        });
    }
    _query(value, query, context) {
        let og = value;
        query.parts.forEach((part, i) => {
            if (part instanceof JQLField) {
                if (value !== this.fallback) {
                    try {
                        if (value[part.field] !== undefined) {
                            value = value[part.field];
                        }
                        else if (i === 0 && context[part.field] !== undefined) {
                            value = context[part.field];
                        }
                        else {
                            value = this.fallback;
                        }
                    }
                    catch (TypeError) {
                        if (i === 0 && context[part.field] !== undefined) {
                            value = context[part.field];
                        }
                        else {
                            value = this.fallback;
                        }
                    }
                }
            }
            else if (part instanceof JQLSpecial) {
                if (SPECIALS[part.special] !== undefined) {
                    value = SPECIALS[part.special](value, context, ...part.arguments.map(arg => this._value(og, arg, context)));
                }
                else {
                    throw new SpecialNotFoundError(part.special);
                }
            }
        });
        return value;
    }
    _value(value, q_or_v, context) {
        if (q_or_v instanceof JQLQuery) {
            return this._query(value, q_or_v, context);
        }
        else if (q_or_v instanceof JQLList) {
            return q_or_v.value.map(part => this._value(value, part, context));
        }
        else if (q_or_v instanceof JQLDict) {
            let out = {};
            q_or_v.value.forEach(kv => {
                out[this._value(value, kv[0], context)] = this._value(value, kv[1], context);
            });
            return out;
        }
        else if (q_or_v instanceof JQLSet) {
            let out = new Set();
            q_or_v.value.forEach(v => {
                out.add(this._value(value, v, context));
            });
            return out;
        }
        else {
            return q_or_v.value;
        }
    }
    /**
     * Query the item
     * @param item The item to query
     * @returns A value, or list of values, depending on whether one or multiple queries are present
     */
    single(item) {
        let values = [];
        this.parts.forEach(query => {
            if (query !== null) {
                values.push(this._query(item, query, {}));
            }
            else {
                values.push(this.fallback);
            }
        });
        return (this.multiple === true) ? values : values[0];
    }
    /**
     * Query the items
     * @param items The items to query
     * @returns A list of values or list of lists of values, depending on wehther one or multiple queries are present
     */
    many(items) {
        return items.map(item => this.single(item));
    }
    /**
     * Register a new special that can be accessed with $<name>.
     * The function should take at least one argument, which will be the current value in query.
     * @param name The name of the special - must only contain these characters: [-a-zA-Z0-9_]
     * @param func The function that will be applied to the value
     * @returns Whether or not the special could be registered
     */
    static register_special(name, func) {
        if (SPECIALS[name] === undefined) {
            SPECIALS[name] = func;
            return true;
        }
        else {
            console.warn(`${name} is already registered as a special value`);
            return false;
        }
    }
}
export class SpecialNotFoundError extends Error {
    constructor(special) {
        super(`'${special}' is not a valid special. Valid options are ${Object.keys(SPECIALS)}`);
    }
}
