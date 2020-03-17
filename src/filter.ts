import { Query } from "./query";

type Operator = '>' | '<' | '>=' | '<=' | '==' | '!=' | '===' | '!==' | 'in' | '!in' |
    'contains' | '!contains' | 'interval' | '!interval' | 'startswith' |
    'endswith' | 'present' | '!present';

interface FilterCondition {
    field: string
    operator: Operator
    value: any
}

interface NotCondition {
    not: ConditionType[]
}

interface OrCondition {
    or: ConditionType[]
}

type ConditionType = FilterCondition | NotCondition | OrCondition | ConditionType[];

export class Condition {
    private output: ConditionType[];
    constructor(field: string, operator: Operator, value: string) {
        this.output = [
            {field: field, operator: operator, value: value}
        ];
    }

    toString(): string {
        return this.output.toString();
    }

    and_(...args: Condition[]): Condition {
        for (let a of args) {
            this.output.push(...a.output);
        }

        return this;
    }

    or_(...args: Condition[]): Condition {
        let temp: ConditionType[];
        for (let a of args) {
            temp = [];
            [this, a].forEach(item => {
                if (item.output.length === 1) {
                    if ((item.output[0] as OrCondition).or) {
                        temp.push(...(item.output[0] as OrCondition).or);
                    } else {
                        temp.push(item.output);
                    }
                } else {
                    temp.push(item.output);
                }
            });

            this.output = [{or: temp}];
        }

        return this;
    }

    not_(): Condition {
        this.output = [{not: this.output}];
        return this;
    }

    filters(): ConditionType[] {
        return this.output;
    }
}

class ValueLessCondition {
    private field: string;
    private op: Operator;

    constructor(field: string, op: Operator) {
        this.field = field;
        this.op = op;
    }

    value(value: any) {
        return new Condition(this.field, this.op, value);
    }
}

class _Key {
    private readonly field: string;
    constructor(field: string) {
        this.field = field;
    }

    gt(other: any): Condition {
        return new Condition(this.field, ">", other);
    }

    lt(other: any): Condition {
        return new Condition(this.field, "<", other);
    }

    gte(other: any): Condition {
        return new Condition(this.field, ">=", other);
    }

    lte(other: any): Condition {
        return new Condition(this.field, "<=", other);
    }

    eq(other: any): Condition {
        return new Condition(this.field, "==", other);
    }

    ne(other: any): Condition {
        return new Condition(this.field, "!=", other);
    }

    seq(other: any): Condition {
        return new Condition(this.field, "===", other);
    }

    sne(other: any): Condition {
        return new Condition(this.field, "!==", other);
    }

    in_(other: any): Condition {
        return new Condition(this.field, "in", other);
    }

    nin(other: any): Condition {
        return new Condition(this.field, "!in", other);
    }

    contains(other: any): Condition {
        return new Condition(this.field, "contains", other);
    }

    not_contains(other: any): Condition {
        return new Condition(this.field, "!contains", other);
    }

    interval(other: any): Condition {
        return new Condition(this.field, "interval", other);
    }

    not_interval(other: any): Condition {
        return new Condition(this.field, "!interval", other);
    }

    startswith(other: any): Condition {
        return new Condition(this.field, "startswith", other);
    }

    endswith(other: any): Condition {
        return new Condition(this.field, "endswith", other);
    }

    present(): Condition {
        return new Condition(this.field, "present", null);
    }

    not_present(): Condition {
        return new Condition(this.field, "!present", null);
    }

    operator(op: Operator): ValueLessCondition {
        return new ValueLessCondition(this.field, op);
    }
}

export function Key(field: string): _Key {
    return new _Key(field);
}

type FilterFunction = {
    [key in Operator]: (field_value: any, value: any) => any;
};

const _filters: FilterFunction = {
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
        } else if (value.includes !== undefined) {
            return value.includes(field_value);
        } else {
            return value[field_value] !== undefined;
        }
    },
    "!in": (field_value, value) => {
        if (value instanceof Set) {
            return !value.has(field_value);
        } else if (value.includes !== undefined) {
            return !value.includes(field_value);
        } else {
            return value[field_value] === undefined;
        }
    },
    "contains": (field_value, value) => {
        if (field_value instanceof Set) {
            return field_value.has(value);
        } else if (field_value.includes !== undefined) {
            return field_value.includes(value);
        } else {
            return field_value[value] !== undefined;
        }
    },
    "!contains": (field_value, value) => {
        if (field_value instanceof Set) {
            return !field_value.has(value);
        } else if (field_value.includes !== undefined) {
            return !field_value.includes(value);
        } else {
            return field_value[value] === undefined;
        }
    },

    "interval": (field_value, value) => { return value[0] <= field_value && field_value <= value[1]; },
    "!interval": (field_value, value) => { return field_value < value[0] || value[1] < field_value; },

    "startswith": (field_value, value) => { return field_value.startsWith(value); },
    "endswith": (field_value, value) => { return field_value.endsWith(value); },

    "present": (field_value, _) => { return field_value !== null && field_value !== undefined  && field_value !== MISSING; },
    "!present": (field_value, _) => { return field_value === null || field_value === undefined || field_value === MISSING; }
};

const MISSING = "__missing__";

export class Filter {
    private readonly filters: ConditionType[];
    private readonly queries: {[key: string]: Query};
    private readonly empty_filters_response: boolean;
    private readonly missing_field_response: boolean;

    constructor(filters: Condition | ConditionType[], empty_filters_response: boolean=true, 
        missing_field_response: boolean=false) {
        this.empty_filters_response = empty_filters_response;
        this.missing_field_response = missing_field_response;

        if (filters instanceof Condition) {
            this.filters = filters.filters();
        } else {
            this.filters = filters;
        }

        this.queries = this._preprocess(this.filters);
    }

    _preprocess(filters: ConditionType[]): {[key: string]: Query} {
        let out = {};
        filters.forEach(f => {
            if (Array.isArray(f)) {
                out = {...out, ...this._preprocess((f as ConditionType[]))};
            } else if ((f as OrCondition).or !== undefined) {
                out = {...out, ...this._preprocess((f as OrCondition).or)};
            } else if ((f as NotCondition).not !== undefined) {
                out = {...out, ...this._preprocess((f as NotCondition).not)};
            } else if (out[(f as FilterCondition).field] === undefined) {
                out[(f as FilterCondition).field] = new Query((f as FilterCondition).field, MISSING);
            }
        });

        return out;
    }

    _filter(item: any, filters: ConditionType[]=null, oring=false): boolean {
        if (filters === null) {
            filters = this.filters;
        }

        let overall = null;
        let c: boolean;
        let query_result: any;
        for (let f of filters) {
            if ((f as ConditionType[]).length !== undefined) {
                c = this._filter(item, (f as ConditionType[]));
            } else if ((f as OrCondition).or !== undefined) {
                c = this._filter(item, (f as OrCondition).or, true);
            } else if ((f as NotCondition).not !== undefined) {
                c = !this._filter(item, (f as NotCondition).not);
            } else {
                query_result = this.queries[(f as FilterCondition).field].single(item);
                if (query_result === MISSING && (f as FilterCondition).operator !== 'present' && (f as FilterCondition).operator !== '!present') {
                    c = this.missing_field_response;
                } else {
                    c = _filters[(f as FilterCondition).operator](
                        query_result,
                        (f as FilterCondition).value
                    );
                }                
            }

            if (overall === null) {
                overall = c;
            } else if ((f as OrCondition).or !== undefined || oring === true) {
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

        return (overall === null) ? this.empty_filters_response : overall;
    }

    many(items: any[]): any[] {
        let out = [];
        items.forEach(item => {
            if (this._filter(item) === true) {
                out.push(item);
            }
        });

        return out;
    }

    single(item: any): boolean {
        return this._filter(item);
    }
}