import { Query } from "./query";
export declare type Operator = '>' | '<' | '>=' | '<=' | '==' | '!=' | '===' | '!==' | 'in' | '!in' | 'contains' | '!contains' | 'interval' | '!interval' | 'startswith' | 'endswith' | 'present' | '!present' | 'subset' | '!subset' | 'superset' | '!superset';
export interface SingleFilter {
    field: string;
    operator: Operator;
    value: any;
}
export interface NotCondition {
    not: FilterCondition[];
}
export interface OrCondition {
    or: FilterCondition[];
}
export declare type FilterCondition = SingleFilter | NotCondition | OrCondition | FilterCondition[];
export declare class Condition {
    private output;
    constructor(field: string, operator: Operator, value: any);
    static fromArray(conditions: FilterCondition[]): Condition;
    toArray(): FilterCondition[];
    clone(deep?: boolean): Condition;
    private deepClone;
    /**
     * Traverse through the original current structure, or a duplicate one. If traversing through a duplicate,
     * then the duplicate will be returned at the end of the call, otherwise, this will be returned.
     * This is comparable to a .forEach()
     */
    traverse(callback: (filter: SingleFilter) => void, onDuplicate?: boolean): Condition;
    private traverser;
    toString(): string;
    and_(...args: Condition[]): Condition;
    static ander(cond1: Condition, cond2: Condition, ...conditions: Condition[]): Condition;
    or_(...args: Condition[]): Condition;
    static orer(cond1: Condition, cond2: Condition, ...conditions: Condition[]): Condition;
    not_(): Condition;
}
export declare class ValueLessCondition {
    private field;
    private op;
    constructor(field: string, op: Operator);
    value(value: any | _Key): Condition;
}
declare class _Key {
    readonly field: string;
    constructor(field: string);
    protected build(op: Operator, other: any | _Key): Condition;
    gt(other: number | _Key): Condition;
    lt(other: number | _Key): Condition;
    gte(other: number | _Key): Condition;
    lte(other: number | _Key): Condition;
    eq(other: any | _Key): Condition;
    ne(other: any | _Key): Condition;
    seq(other: any | _Key): Condition;
    sne(other: any | _Key): Condition;
    is_true(): Condition;
    is_false(): Condition;
    is_null(): Condition;
    in_(other: any | _Key): Condition;
    nin(other: any | _Key): Condition;
    contains(other: any | _Key): Condition;
    not_contains(other: any | _Key): Condition;
    subset(other: any | _Key): Condition;
    not_subset(other: any | _Key): Condition;
    superset(other: any | _Key): Condition;
    not_superset(other: any | _Key): Condition;
    interval(valuesOrMinOrKey: [number, number] | number | _Key, max?: number): Condition;
    not_interval(valuesOrMinOrKey: [number, number] | number | _Key, max?: number): Condition;
    startswith(prefix: string | _Key): Condition;
    endswith(suffix: string | _Key): Condition;
    present(): Condition;
    not_present(): Condition;
    operator(op: Operator): ValueLessCondition;
}
export declare function Key(field: string): _Key;
export declare type FilterFunction = {
    [key in Operator]: (field_value: any, value: any) => any;
};
export declare const FILTER_OPERATIONS: FilterFunction;
export default class Filter {
    private readonly filters;
    private readonly queries;
    private readonly empty_filters_response;
    private readonly missing_field_response;
    /**
     * Prepare a filter object from a list of filters, or from a condition object
     * @param filters The filters
     * @param empty_filters_response What is returned if there are no filters. Makes the difference between
     * returning all items for empty filters, or returning none.
     * @param missing_field_response What is returned for a filter if the field was not present
     */
    constructor(filters: Condition | FilterCondition[], empty_filters_response?: boolean, missing_field_response?: boolean);
    _preprocess(filters: FilterCondition[]): {
        [key: string]: Query;
    };
    _filter(item: any, filters?: FilterCondition[], oring?: boolean, context?: {
        [key in string | number]: any;
    }): boolean;
    /**
     * Filter a single item
     * @param item The item to filter
     * @param context An additional namespace that will be passed to the field query
     * @returns Whether or not the item meets the filter
     */
    single(item: any, context?: {
        [key in string | number]: any;
    }): boolean;
    /**
     * Filter the list of items
     * @param items The items to filter
     * @param context An additional namespace that will be passed to the field query
     * @returns Only the items that satisfy the filter
     */
    many(items: any[], context?: {
        [key in string | number]: any;
    }): any[];
    first(items: any[], context?: {
        [key in string | number]: any;
    }): any | null;
    last(items: any[], context?: {
        [key in string | number]: any;
    }): any | null;
    static register_filter(op: string, func: (fieldValue: any, value: any) => boolean): boolean;
}
export declare const FILTER_CACHE: {
    [key: string]: Filter;
};
export { Filter };
