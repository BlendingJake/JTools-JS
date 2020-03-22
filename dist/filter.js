import { Query } from "./query";
export class Condition {
    constructor(field, operator, value) {
        this.output = [
            { field: field, operator: operator, value: value }
        ];
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
    not_() {
        this.output = [{ not: this.output }];
        return this;
    }
    filters() {
        return this.output;
    }
}
class ValueLessCondition {
    constructor(field, op) {
        this.field = field;
        this.op = op;
    }
    value(value) {
        return new Condition(this.field, this.op, value);
    }
}
class _Key {
    constructor(field) {
        this.field = field;
    }
    gt(other) {
        return new Condition(this.field, ">", other);
    }
    lt(other) {
        return new Condition(this.field, "<", other);
    }
    gte(other) {
        return new Condition(this.field, ">=", other);
    }
    lte(other) {
        return new Condition(this.field, "<=", other);
    }
    eq(other) {
        return new Condition(this.field, "==", other);
    }
    ne(other) {
        return new Condition(this.field, "!=", other);
    }
    seq(other) {
        return new Condition(this.field, "===", other);
    }
    sne(other) {
        return new Condition(this.field, "!==", other);
    }
    in_(other) {
        return new Condition(this.field, "in", other);
    }
    nin(other) {
        return new Condition(this.field, "!in", other);
    }
    contains(other) {
        return new Condition(this.field, "contains", other);
    }
    not_contains(other) {
        return new Condition(this.field, "!contains", other);
    }
    interval(other) {
        return new Condition(this.field, "interval", other);
    }
    not_interval(other) {
        return new Condition(this.field, "!interval", other);
    }
    startswith(other) {
        return new Condition(this.field, "startswith", other);
    }
    endswith(other) {
        return new Condition(this.field, "endswith", other);
    }
    present() {
        return new Condition(this.field, "present", null);
    }
    not_present() {
        return new Condition(this.field, "!present", null);
    }
    operator(op) {
        return new ValueLessCondition(this.field, op);
    }
}
export function Key(field) {
    return new _Key(field);
}
const _filters = {
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
    "interval": (field_value, value) => { return value[0] <= field_value && field_value <= value[1]; },
    "!interval": (field_value, value) => { return field_value < value[0] || value[1] < field_value; },
    "startswith": (field_value, value) => { return field_value.startsWith(value); },
    "endswith": (field_value, value) => { return field_value.endsWith(value); },
    "present": (field_value, _) => { return field_value !== null && field_value !== undefined && field_value !== MISSING; },
    "!present": (field_value, _) => { return field_value === null || field_value === undefined || field_value === MISSING; }
};
const MISSING = "__missing__";
export class Filter {
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
            this.filters = filters.filters();
        }
        else {
            this.filters = filters;
        }
        this.queries = this._preprocess(this.filters);
    }
    _preprocess(filters) {
        let out = {};
        filters.forEach(f => {
            if (Array.isArray(f)) {
                out = Object.assign(Object.assign({}, out), this._preprocess(f));
            }
            else if (f.or !== undefined) {
                out = Object.assign(Object.assign({}, out), this._preprocess(f.or));
            }
            else if (f.not !== undefined) {
                out = Object.assign(Object.assign({}, out), this._preprocess(f.not));
            }
            else if (out[f.field] === undefined) {
                out[f.field] = new Query(f.field, MISSING);
            }
        });
        return out;
    }
    _filter(item, filters = null, oring = false) {
        if (filters === null) {
            filters = this.filters;
        }
        let overall = null;
        let c;
        let query_result;
        for (let f of filters) {
            if (f.length !== undefined) {
                c = this._filter(item, f);
            }
            else if (f.or !== undefined) {
                c = this._filter(item, f.or, true);
            }
            else if (f.not !== undefined) {
                c = !this._filter(item, f.not);
            }
            else {
                query_result = this.queries[f.field].single(item);
                if (query_result === MISSING && f.operator !== 'present' && f.operator !== '!present') {
                    c = this.missing_field_response;
                }
                else {
                    c = _filters[f.operator](query_result, f.value);
                }
            }
            if (overall === null) {
                overall = c;
            }
            else if (f.or !== undefined || oring === true) {
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
     * @returns Whether or not the item meets the filter
     */
    single(item) {
        return this._filter(item);
    }
    /**
     * Filter the list of items
     * @param items The items to filter
     * @returns Only the items that satisfy the filter
     */
    many(items) {
        let out = [];
        items.forEach(item => {
            if (this._filter(item) === true) {
                out.push(item);
            }
        });
        return out;
    }
}
