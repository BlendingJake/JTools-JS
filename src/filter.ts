import { Query } from "./query";

export type Operator = '>' | '<' | '>=' | '<=' | '==' | '!=' | '===' | '!==' | 'in' | '!in' |
    'contains' | '!contains' | 'interval' | '!interval' | 'startswith' |
    'endswith' | 'present' | '!present' | 'subset' | '!subset' | 'superset' | '!superset';

export interface SingleFilter {
    field: string
    operator: Operator
    value: any
}

export interface NotCondition {
    not: FilterCondition[]
}

export interface OrCondition {
    or: FilterCondition[]
}

export type FilterCondition = SingleFilter | NotCondition | OrCondition | FilterCondition[];

export class Condition {
    private output: FilterCondition[];
    constructor(field: string, operator: Operator, value: any) {
        this.output = [
            {field: field, operator: operator, value: value}
        ];
    }

    static fromArray(conditions: FilterCondition[]): Condition {
        const cond = new Condition("", "==", "");
        cond.output = conditions;
        return cond;
    }

    toArray(): FilterCondition[] {
        return this.output;
    }

    clone(deep: boolean = false): Condition {
        const cond = new Condition("", "==", "");
        if (deep) {
            cond.output = this.deepClone(this.output);
        } else {
            cond.output = [...this.output];
        }
        return cond;
    }

    private deepClone(conditions: FilterCondition[]): FilterCondition[] {
        return conditions.map((cond: FilterCondition): FilterCondition => {
            if ((cond as NotCondition).not !== undefined) {
                return { not: this.deepClone((cond as NotCondition).not) };
            } else if ((cond as OrCondition).or !== undefined) {
                return { or: this.deepClone((cond as OrCondition).or) };
            } else if (Array.isArray(cond)) {
                return this.deepClone(cond);
            } else {
                return { ...(cond as SingleFilter) };
            }
        });
    }
    
    /**
     * Traverse through the original current structure, or a duplicate one. If traversing through a duplicate,
     * then the duplicate will be returned at the end of the call, otherwise, this will be returned. 
     * This is comparable to a .forEach()
     */
    traverse(callback: (filter: SingleFilter) => void, onDuplicate: boolean = false): Condition {
        const data = (onDuplicate === true) ? this.clone(true) : this;
        this.traverser(data.output, callback);
        return data;
    }

    private traverser(conditions: FilterCondition[], callback: (filter: SingleFilter) => void) {
        conditions.forEach((cond: FilterCondition) => {
            if ((cond as NotCondition).not !== undefined) {
                this.traverser((cond as NotCondition).not, callback);
            } else if ((cond as OrCondition).or !== undefined) {
                this.traverser((cond as OrCondition).or, callback);
            } else if (Array.isArray(cond)) {
                this.traverser(cond, callback);
            } else {
                callback(cond as SingleFilter);
            }
        });
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

    static ander(cond1: Condition, cond2: Condition, ...conditions: Condition[]): Condition {
        return cond1.clone().and_(cond2, ...conditions);
    }

    or_(...args: Condition[]): Condition {
        let temp: FilterCondition[];
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

    static orer(cond1: Condition, cond2: Condition, ...conditions: Condition[]): Condition {
        return cond1.clone().or_(cond2, ...conditions);
    }

    not_(): Condition {
        // If trying to double-negate
        if (this.output.length === 1 && (this.output[0] as NotCondition).not !== undefined) {
            this.output = (this.output[0] as NotCondition).not;
        } else {
            this.output = [{not: this.output}];
        }

        return this;
    }
}

export class ValueLessCondition {
    private field: string;
    private op: Operator;

    constructor(field: string, op: Operator) {
        this.field = field;
        this.op = op;
    }

    value(value: any | _Key) {
        return new Condition(
            this.field, this.op, 
            (value instanceof _Key) ? { query: value.field } : value
        );
    }
}

class _Key {
    readonly field: string;
    constructor(field: string) {
        this.field = field;
    }

    protected build(op: Operator, other: any | _Key) : Condition {
        if (other instanceof _Key) {
            return new Condition(this.field, op, { query: other.field });
        } else {
            return new Condition(this.field, op, other);
        }
    }

    gt(other: number | _Key): Condition {
        return this.build('>', other);
    }

    lt(other: number | _Key): Condition {
        return this.build('<', other);
    }

    gte(other: number | _Key): Condition {
        return this.build('>=', other);
    }

    lte(other: number | _Key): Condition {
        return this.build('<=', other);
    }

    eq(other: any | _Key): Condition {
        return this.build('==', other);
    }

    ne(other: any | _Key): Condition {
        return this.build('!=', other);
    }

    seq(other: any | _Key): Condition {
        return this.build('===', other);
    }

    sne(other: any | _Key): Condition {
        return this.build('!==', other);
    }

    is_true(): Condition {
        return this.build('===', true);
    }

    is_false(): Condition {
        return this.build('===', false);
    }

    is_null(): Condition {
        return this.build('===', null);
    }

    in_(other: any | _Key): Condition {
        return this.build('in', other);
    }

    nin(other: any | _Key): Condition {
        return this.build('!in', other);
    }

    contains(other: any | _Key): Condition {
        return this.build('contains', other);
    }

    not_contains(other: any | _Key): Condition {
        return this.build('!contains', other);
    }

    subset(other: any | _Key): Condition {
        return this.build('subset', other);
    }

    not_subset(other: any | _Key): Condition {
        return this.build('!subset', other);
    }

    superset(other: any | _Key): Condition {
        return this.build('superset', other);
    }

    not_superset(other: any | _Key): Condition {
        return this.build('!superset', other);
    }

    interval(valuesOrMinOrKey: [number, number] | number | _Key, max: number = null): Condition {
        return this.build(
            'interval', 
            (Array.isArray(valuesOrMinOrKey) || valuesOrMinOrKey instanceof _Key) 
            ? valuesOrMinOrKey
            : [valuesOrMinOrKey, max]
        );
    }

    not_interval(valuesOrMinOrKey: [number, number] | number | _Key, max: number = null): Condition {
        return this.build(
            '!interval', 
            (Array.isArray(valuesOrMinOrKey) || valuesOrMinOrKey instanceof _Key) 
            ? valuesOrMinOrKey
            : [valuesOrMinOrKey, max]
        );
    }

    startswith(prefix: string | _Key): Condition {
        return this.build('startswith', prefix);
    }

    endswith(suffix: string | _Key): Condition {
        return this.build('endswith', suffix);
    }

    present(): Condition {
        return this.build('present', null);
    }

    not_present(): Condition {
        return this.build('!present', null);
    }

    operator(op: Operator): ValueLessCondition {
        return new ValueLessCondition(this.field, op);
    }
}

export function Key(field: string): _Key {
    return new _Key(field);
}

export type FilterFunction = {
    [key in Operator]: (field_value: any, value: any) => any;
};

export const FILTER_OPERATIONS: FilterFunction = {
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

    "present": (field_value, _) => { return field_value !== null && field_value !== undefined  && field_value !== MISSING; },
    "!present": (field_value, _) => { return field_value === null || field_value === undefined || field_value === MISSING; }
};

const MISSING = "__missing__";

export default class Filter {
    private readonly filters: FilterCondition[];
    private readonly queries: {[key: string]: Query};
    private readonly empty_filters_response: boolean;
    private readonly missing_field_response: boolean;

    /**
     * Prepare a filter object from a list of filters, or from a condition object
     * @param filters The filters
     * @param empty_filters_response What is returned if there are no filters. Makes the difference between
     * returning all items for empty filters, or returning none.
     * @param missing_field_response What is returned for a filter if the field was not present
     */
    constructor(
        filters: Condition | FilterCondition[], 
        empty_filters_response: boolean=true, 
        missing_field_response: boolean=false
    ) {
        this.empty_filters_response = empty_filters_response;
        this.missing_field_response = missing_field_response;

        if (filters instanceof Condition) {
            this.filters = filters.toArray();
        } else {
            this.filters = filters;
        }

        this.queries = this._preprocess(this.filters);
    }

    _preprocess(filters: FilterCondition[]): {[key: string]: Query} {
        const out: {[key: string]: Query} = {};
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

    _filter(item: any, filters: FilterCondition[]=null, oring=false, context: {[key in string | number]: any} = {}): boolean {
        if (filters === null) {
            filters = this.filters;
        }

        let overall = null;
        let c: boolean;
        let queryResult: any;
        for (let f of filters) {
            if (Array.isArray(f)) {
                c = this._filter(item, (f as FilterCondition[]), false, context);
            } else if ((f as OrCondition).or !== undefined) {
                c = this._filter(item, (f as OrCondition).or, true, context);
            } else if ((f as NotCondition).not !== undefined) {
                c = !this._filter(item, (f as NotCondition).not, false, context);
            } else {
                queryResult = this.queries[(f as SingleFilter).field].single(item, context);
                let value: any;
                if ((f as SingleFilter).value && (f as SingleFilter).value['query'] !== undefined) {
                    value = this.queries[(f as SingleFilter).value.query].single(item, context);
                } else {
                    value = (f as SingleFilter).value;
                }

                if (queryResult === MISSING && (f as SingleFilter).operator !== 'present' && (f as SingleFilter).operator !== '!present') {
                    c = this.missing_field_response;
                } else {
                    c = FILTER_OPERATIONS[(f as SingleFilter).operator](
                        queryResult,
                        value
                    );
                }                
            }

            if (overall === null) {
                overall = c;
            } else if (oring === true) {
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

    /**
     * Filter a single item
     * @param item The item to filter
     * @param context An additional namespace that will be passed to the field query
     * @returns Whether or not the item meets the filter
     */
    single(item: any, context: {[key in string | number]: any} = {}): boolean {
        return this._filter(item, null, false, context);
    }

    /**
     * Filter the list of items
     * @param items The items to filter
     * @param context An additional namespace that will be passed to the field query
     * @returns Only the items that satisfy the filter
     */
    many(items: any[], context: {[key in string | number]: any} = {}): any[] {
        let out = [];
        items.forEach((item, index) => {
            if (this._filter(item, null, false, { INDEX: index, ...context }) === true) {
                out.push(item);
            }
        });

        return out;
    }

    first(items: any[], context: {[key in string | number]: any} = {}): any | null {
        for (let i=0; i<items.length; i++) {
            if (this._filter(items[i], null, false, { INDEX: i, ...context })) {
                return items[i];
            }
        }
        return null;
    }

    last(items: any[], context: {[key in string | number]: any} = {}): any | null {
        for (let i=items.length-1; i>=0; i--) {
            if (this._filter(items[i], null, false, { INDEX: i, ...context })) {
                return items[i];
            }
        }
        return null;
    }

    static register_filter(op: string, func: (fieldValue: any, value: any) => boolean): boolean {
        if (FILTER_OPERATIONS[op] === undefined) {
            FILTER_OPERATIONS[op] = func;
            return true;
        } else {
            console.warn(`${op} is already registered as a filter`);
            return false;
        }
    }
}

export const FILTER_CACHE: {[key: string]: Filter} = {};

Query.register_special(
    'filter',
    (value, context, args) => {
        let f: { field: string, operator: Operator, value: any }[];
        if (args.$args.length === 3) {
            f = [{ field: args.$args[0], operator: args.$args[1], value: args.$args[2] }];
        } else if (!Array.isArray(args.$args[0])) {
            f = [args.$args[0]];
        } else {
            f = args.$args[0];
        }

        const key = JSON.stringify(f);
        if (FILTER_CACHE[key] === undefined) {
            FILTER_CACHE[key] = new Filter(f);
        }

        if (args.single) {
            return FILTER_CACHE[key].single(value, context);
        } else {
            return FILTER_CACHE[key].many(value, context);
        }
    },
    ['$args', { name: 'single', default: true }]
)

export { Filter };