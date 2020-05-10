import { Query } from "./query";
export declare type Operator = '>' | '<' | '>=' | '<=' | '==' | '!=' | '===' | '!==' | 'in' | '!in' | 'contains' | '!contains' | 'interval' | '!interval' | 'startswith' | 'endswith' | 'present' | '!present';
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
    value(value: any): Condition;
}
declare class _Key {
    private readonly field;
    constructor(field: string);
    gt(other: number): Condition;
    lt(other: number): Condition;
    gte(other: number): Condition;
    lte(other: number): Condition;
    eq(other: any): Condition;
    ne(other: any): Condition;
    seq(other: any): Condition;
    sne(other: any): Condition;
    in_(other: any): Condition;
    nin(other: any): Condition;
    contains(other: any): Condition;
    not_contains(other: any): Condition;
    interval(valuesOrMin: [number, number] | number, max?: number): Condition;
    not_interval(valuesOrMin: [number, number] | number, max?: number): Condition;
    startswith(prefix: string): Condition;
    endswith(suffix: string): Condition;
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
}
export { Filter };
