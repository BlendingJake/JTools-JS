import { Query } from "./query";
export class Condition {
    constructor(field, operator, value) {
        this.output = [
            { field: field, operator: operator, value: value }
        ];
    }
    static fromArray(conditions) {
        const cond = new Condition("", "==", "");
        cond.output = conditions;
        return cond;
    }
    toArray() {
        return this.output;
    }
    clone(deep = false) {
        const cond = new Condition("", "==", "");
        if (deep) {
            cond.output = this.deepClone(this.output);
        }
        else {
            cond.output = [...this.output];
        }
        return cond;
    }
    deepClone(conditions) {
        return conditions.map((cond) => {
            if (cond.not !== undefined) {
                return { not: this.deepClone(cond.not) };
            }
            else if (cond.or !== undefined) {
                return { or: this.deepClone(cond.or) };
            }
            else if (Array.isArray(cond)) {
                return this.deepClone(cond);
            }
            else {
                return Object.assign({}, cond);
            }
        });
    }
    /**
     * Traverse through the original current structure, or a duplicate one. If traversing through a duplicate,
     * then the duplicate will be returned at the end of the call, otherwise, this will be returned.
     * This is comparable to a .forEach()
     */
    traverse(callback, onDuplicate = false) {
        const data = (onDuplicate === true) ? this.clone(true) : this;
        this.traverser(data.output, callback);
        return data;
    }
    traverser(conditions, callback) {
        conditions.forEach((cond) => {
            if (cond.not !== undefined) {
                this.traverser(cond.not, callback);
            }
            else if (cond.or !== undefined) {
                this.traverser(cond.or, callback);
            }
            else if (Array.isArray(cond)) {
                this.traverser(cond, callback);
            }
            else {
                callback(cond);
            }
        });
    }
    toString() {
        return this.output.toString();
    }
    and_(...args) {
        for (let a of args) {
            this.output.push(...a.output);
        }
        return this;
    }
    static ander(cond1, cond2, ...conditions) {
        return cond1.clone().and_(cond2, ...conditions);
    }
    or_(...args) {
        let temp;
        for (let a of args) {
            temp = [];
            [this, a].forEach(item => {
                if (item.output.length === 1) {
                    if (item.output[0].or) {
                        temp.push(...item.output[0].or);
                    }
                    else {
                        temp.push(item.output);
                    }
                }
                else {
                    temp.push(item.output);
                }
            });
            this.output = [{ or: temp }];
        }
        return this;
    }
    static orer(cond1, cond2, ...conditions) {
        return cond1.clone().or_(cond2, ...conditions);
    }
    not_() {
        // If trying to double-negate
        if (this.output.length === 1 && this.output[0].not !== undefined) {
            this.output = this.output[0].not;
        }
        else {
            this.output = [{ not: this.output }];
        }
        return this;
    }
}
export class ValueLessCondition {
    constructor(field, op) {
        this.field = field;
        this.op = op;
    }
    value(value) {
        return new Condition(this.field, this.op, (value instanceof _Key) ? { query: value.field } : value);
    }
}
class _Key {
    constructor(field) {
        this.field = field;
    }
    build(op, other) {
        if (other instanceof _Key) {
            return new Condition(this.field, op, { query: other.field });
        }
        else {
            return new Condition(this.field, op, other);
        }
    }
    gt(other) {
        return this.build('>', other);
    }
    lt(other) {
        return this.build('<', other);
    }
    gte(other) {
        return this.build('>=', other);
    }
    lte(other) {
        return this.build('<=', other);
    }
    eq(other) {
        return this.build('==', other);
    }
    ne(other) {
        return this.build('!=', other);
    }
    seq(other) {
        return this.build('===', other);
    }
    sne(other) {
        return this.build('!==', other);
    }
    is_true() {
        return this.build('===', true);
    }
    is_false() {
        return this.build('===', false);
    }
    is_null() {
        return this.build('===', null);
    }
    in_(other) {
        return this.build('in', other);
    }
    nin(other) {
        return this.build('!in', other);
    }
    contains(other) {
        return this.build('contains', other);
    }
    not_contains(other) {
        return this.build('!contains', other);
    }
    subset(other) {
        return this.build('subset', other);
    }
    not_subset(other) {
        return this.build('!subset', other);
    }
    superset(other) {
        return this.build('superset', other);
    }
    not_superset(other) {
        return this.build('!superset', other);
    }
    interval(valuesOrMinOrKey, max = null) {
        return this.build('interval', (Array.isArray(valuesOrMinOrKey) || valuesOrMinOrKey instanceof _Key)
            ? valuesOrMinOrKey
            : [valuesOrMinOrKey, max]);
    }
    not_interval(valuesOrMinOrKey, max = null) {
        return this.build('!interval', (Array.isArray(valuesOrMinOrKey) || valuesOrMinOrKey instanceof _Key)
            ? valuesOrMinOrKey
            : [valuesOrMinOrKey, max]);
    }
    startswith(prefix) {
        return this.build('startswith', prefix);
    }
    endswith(suffix) {
        return this.build('endswith', suffix);
    }
    present() {
        return this.build('present', null);
    }
    not_present() {
        return this.build('!present', null);
    }
    operator(op) {
        return new ValueLessCondition(this.field, op);
    }
}
export function Key(field) {
    return new _Key(field);
}
export const FILTER_OPERATIONS = {
    ">": (field_value, value) => { return field_value > value; },
    "<": (field_value, value) => { return field_value < value; },
    ">=": (field_value, value) => { return field_value >= value; },
    "<=": (field_value, value) => { return field_value <= value; },
    "==": (field_value, value) => { return field_value == value; },
    "!=": (field_value, value) => { return field_value != value; },
    "===": (field_value, value) => { return field_value === value; },
    "!==": (field_value, value) => { return field_value !== value; },
    "in": (field_value, value) => {
        if (value instanceof Set) {
            return value.has(field_value);
        }
        else if (value.includes !== undefined) {
            return value.includes(field_value);
        }
        else {
            return value[field_value] !== undefined;
        }
    },
    "!in": (field_value, value) => {
        if (value instanceof Set) {
            return !value.has(field_value);
        }
        else if (value.includes !== undefined) {
            return !value.includes(field_value);
        }
        else {
            return value[field_value] === undefined;
        }
    },
    "contains": (field_value, value) => {
        if (field_value instanceof Set) {
            return field_value.has(value);
        }
        else if (field_value.includes !== undefined) {
            return field_value.includes(value);
        }
        else {
            return field_value[value] !== undefined;
        }
    },
    "!contains": (field_value, value) => {
        if (field_value instanceof Set) {
            return !field_value.has(value);
        }
        else if (field_value.includes !== undefined) {
            return !field_value.includes(value);
        }
        else {
            return field_value[value] === undefined;
        }
    },
    'subset': (fieldValue, value) => {
        const checker = (value instanceof Set)
            ? (v) => value.has(v)
            : (Array.isArray(value))
                ? (v) => value.includes(v)
                : (v) => value[v] !== undefined;
        let isSubset = true;
        ((Array.isArray(fieldValue) || fieldValue instanceof Set) ? [...fieldValue] : Object.keys(fieldValue))
            .forEach(v => {
            if (!checker(v)) {
                isSubset = false;
            }
        });
        return isSubset;
    },
    '!subset': (fieldValue, value) => {
        return !FILTER_OPERATIONS.subset(fieldValue, value);
    },
    'superset': (fieldValue, value) => {
        return FILTER_OPERATIONS.subset(value, fieldValue);
    },
    '!superset': (fieldValue, value) => {
        return !FILTER_OPERATIONS.superset(fieldValue, value);
    },
    "interval": (field_value, value) => { return value[0] <= field_value && field_value <= value[1]; },
    "!interval": (field_value, value) => { return field_value < value[0] || value[1] < field_value; },
    "startswith": (field_value, value) => { return field_value.startsWith(value); },
    "endswith": (field_value, value) => { return field_value.endsWith(value); },
    "present": (field_value, _) => { return field_value !== null && field_value !== undefined && field_value !== MISSING; },
    "!present": (field_value, _) => { return field_value === null || field_value === undefined || field_value === MISSING; }
};
const MISSING = "__missing__";
export default class Filter {
    /**
     * Prepare a filter object from a list of filters, or from a condition object
     * @param filters The filters
     * @param empty_filters_response What is returned if there are no filters. Makes the difference between
     * returning all items for empty filters, or returning none.
     * @param missing_field_response What is returned for a filter if the field was not present
     */
    constructor(filters, empty_filters_response = true, missing_field_response = false) {
        this.empty_filters_response = empty_filters_response;
        this.missing_field_response = missing_field_response;
        if (filters instanceof Condition) {
            this.filters = filters.toArray();
        }
        else {
            this.filters = filters;
        }
        this.queries = this._preprocess(this.filters);
    }
    _preprocess(filters) {
        const out = {};
        Condition.fromArray(filters).traverse((filter) => {
            if (out[filter.field] === undefined) {
                out[filter.field] = new Query(filter.field, MISSING);
            }
            if (filter.value && filter.value['query'] !== undefined && out[filter.value.query] === undefined) {
                out[filter.value.query] = new Query(filter.value.query, MISSING);
            }
        });
        return out;
    }
    _filter(item, filters = null, oring = false, context = {}) {
        if (filters === null) {
            filters = this.filters;
        }
        let overall = null;
        let c;
        let queryResult;
        for (let f of filters) {
            if (Array.isArray(f)) {
                c = this._filter(item, f, false, context);
            }
            else if (f.or !== undefined) {
                c = this._filter(item, f.or, true, context);
            }
            else if (f.not !== undefined) {
                c = !this._filter(item, f.not, false, context);
            }
            else {
                queryResult = this.queries[f.field].single(item, context);
                let value;
                if (f.value && f.value['query'] !== undefined) {
                    value = this.queries[f.value.query].single(item, context);
                }
                else {
                    value = f.value;
                }
                if (queryResult === MISSING && f.operator !== 'present' && f.operator !== '!present') {
                    c = this.missing_field_response;
                }
                else {
                    c = FILTER_OPERATIONS[f.operator](queryResult, value);
                }
            }
            if (overall === null) {
                overall = c;
            }
            else if (oring === true) {
                overall = c || overall;
                if (overall === true) { // shortcut or
                    return true;
                }
            }
            else {
                overall = c && overall;
                if (overall === false) { // shortcut and
                    return false;
                }
            }
        }
        return (overall === null) ? this.empty_filters_response : overall;
    }
    /**
     * Filter a single item
     * @param item The item to filter
     * @param context An additional namespace that will be passed to the field query
     * @returns Whether or not the item meets the filter
     */
    single(item, context = {}) {
        return this._filter(item, null, false, context);
    }
    /**
     * Filter the list of items
     * @param items The items to filter
     * @param context An additional namespace that will be passed to the field query
     * @returns Only the items that satisfy the filter
     */
    many(items, context = {}) {
        let out = [];
        items.forEach((item, index) => {
            if (this._filter(item, null, false, Object.assign({ INDEX: index }, context)) === true) {
                out.push(item);
            }
        });
        return out;
    }
    first(items, context = {}) {
        for (let i = 0; i < items.length; i++) {
            if (this._filter(items[i], null, false, Object.assign({ INDEX: i }, context))) {
                return items[i];
            }
        }
        return null;
    }
    last(items, context = {}) {
        for (let i = items.length - 1; i >= 0; i--) {
            if (this._filter(items[i], null, false, Object.assign({ INDEX: i }, context))) {
                return items[i];
            }
        }
        return null;
    }
    static register_filter(op, func) {
        if (FILTER_OPERATIONS[op] === undefined) {
            FILTER_OPERATIONS[op] = func;
            return true;
        }
        else {
            console.warn(`${op} is already registered as a filter`);
            return false;
        }
    }
}
export const FILTER_CACHE = {};
Query.register_special('filter', (value, context, args) => {
    let f;
    if (args.$args.length === 3) {
        f = [{ field: args.$args[0], operator: args.$args[1], value: args.$args[2] }];
    }
    else if (!Array.isArray(args.$args[0])) {
        f = [args.$args[0]];
    }
    else {
        f = args.$args[0];
    }
    const key = JSON.stringify(f);
    if (FILTER_CACHE[key] === undefined) {
        FILTER_CACHE[key] = new Filter(f);
    }
    if (args.single) {
        return FILTER_CACHE[key].single(value, context);
    }
    else {
        return FILTER_CACHE[key].many(value, context);
    }
}, ['$args', { name: 'single', default: true }]);
export { Filter };
