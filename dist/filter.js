import { Getter } from "./getter";
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
    "present": (field_value, _) => { return field_value !== null && field_value !== undefined; },
    "!present": (field_value, _) => { return field_value === null || field_value === undefined; }
};
export class Filter {
    constructor(filters, params = {}) {
        if (filters instanceof Condition) {
            this.filters = filters.filters();
        }
        else {
            this.filters = filters;
        }
        this.getters = this._preprocess(this.filters);
        this.empty_filters_response = params.empty_filters_response || true;
    }
    _preprocess(filters) {
        let out = {};
        filters.forEach(f => {
            if (f.length !== undefined) {
                out = Object.assign(Object.assign({}, out), this._preprocess(f));
            }
            else if (f.or !== undefined) {
                out = Object.assign(Object.assign({}, out), this._preprocess(f.or));
            }
            else if (f.not !== undefined) {
                out = Object.assign(Object.assign({}, out), this._preprocess(f.not));
            }
            else if (out[f.field] === undefined) {
                out[f.field] = new Getter(f.field);
            }
        });
        return out;
    }
    _filter(item, filters = null, oring = false) {
        if (filters === null) {
            filters = this.filters;
        }
        let overall = null;
        for (let f of filters) {
            let c;
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
                c = _filters[f.operator](this.getters[f.field].single(item), f.value);
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
    many(items) {
        let out = [];
        items.forEach(item => {
            if (this._filter(item) === true) {
                out.push(item);
            }
        });
        return out;
    }
    single(item) {
        return this._filter(item);
    }
}
