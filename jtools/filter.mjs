import { Getter } from "./getter.mjs";

export class Condition {
    constructor(field, operator, value) {
        this.output = [
            {field: field, operator: operator, value: value}
        ];
    }

    toString() {
        return this.output.toString();
    }

    and_(other) {
        this.output.push(...other.output);
    }

    or_(other) {
        let temp = [];
        [this, other].forEach(item => {
            if (item.output.length === 1) {
                if (item.output[0].or !== undefined) {
                    temp.push(...item.output[0].or);
                } else {
                    temp.push(item.output);
                }
            } else {
                temp.push(item.output);
            }
        });

        this.output = [{or: temp}];
        return this;
    }

    not_() {
        this.output = [{not: this.output}];
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

    in(other) {
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

    none(other) {
        return new Condition(this.field, "null", other);
    }

    not_none(other) {
        return new Condition(this.field, "!null", other);
    }
}

export function Key(other) {
    return new _Key(other);
}

const _filters = {
    ">": (field, value) => { return field > value; },
    "<": (field, value) => { return field < value; },
    ">=": (field, value) => { return field >= value; },
    "<=": (field, value) => { return field <= value; },
    "==": (field, value) => { return field === value; },
    "!=": (field, value) => { return field !== value; },

    "in": (field, value) => { return field.includes(value); },
    "!in": (field, value) => { return !field.includes(value); },
    "contains": (field, value) => { return value.includes(field); },
    "!contains": (field, value) => { return !value.includes(field); },

    "startswith": (field, value) => { return field.startsWith(value); },
    "endswith": (field, value) => { return field.endsWith(value); },

    "null": (field, value) => { return field === null || field === undefined; },
    "!null": (field, value) => { return field !== null && field !== undefined; }
};

export class Filter {
    constructor(filters) {
        if (filters instanceof Condition) {
            this.filters = filters.filters();
        } else {
            this.filters = filters;
        }

        this.getters = this._preprocess(this.filters);
    }

    _preprocess(filters) {
        let out = {};
        filters.forEach(f => {
            if (f.length !== undefined) {
                out = {...out, ...this._preprocess(f)};
            } else if (f.or !== undefined) {
                out = {...out, ...this._preprocess(f.or)};
            } else if (out[f.field] === undefined) {
                out[f.field] = new Getter(f.field);
            }
        });

        return out;
    }

    _filter(item, filters=null, oring=false) {
        if (filters === null) {
            filters = this.filters;
        }

        let overall = null;
        for (let f of filters) {
            let c;
            if (f.length !== undefined) {
                c = this._filter(item, f);
            } else if (f.or !== undefined) {
                c = this._filter(item, f.or, true);
            } else if (f.not !== undefined) {
                c = !this._filter(item, f.not);
            } else {
                c = _filters[f.operator](this.getters[f.field].get(item), f.value);
            }

            if (overall === null) {
                overall = c;
            } else if (f.or !== undefined && oring === true) {
                overall = c || overall;

                if (overall === true) {  // shortcut or
                    return true;
                }
            } else {
                overall = c && overall;

                if (overall === false) {  // shortcut and
                    return false;
                }
            }
        }

        return overall || false;
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