import { Query } from "./query";
declare type Operator = '>' | '<' | '>=' | '<=' | '==' | '!=' | '===' | '!==' | 'in' | '!in' | 'contains' | '!contains' | 'interval' | '!interval' | 'startswith' | 'endswith' | 'present' | '!present';
interface FilterCondition {
    field: string;
    operator: Operator;
    value: any;
}
interface NotCondition {
    not: ConditionType[];
}
interface OrCondition {
    or: ConditionType[];
}
declare type ConditionType = FilterCondition | NotCondition | OrCondition | ConditionType[];
export declare class Condition {
    private output;
    constructor(field: string, operator: Operator, value: string);
    toString(): string;
    and_(...args: Condition[]): Condition;
    or_(...args: Condition[]): Condition;
    not_(): Condition;
    filters(): ConditionType[];
}
declare class ValueLessCondition {
    private field;
    private op;
    constructor(field: string, op: Operator);
    value(value: any): Condition;
}
declare class _Key {
    private readonly field;
    constructor(field: string);
    gt(other: any): Condition;
    lt(other: any): Condition;
    gte(other: any): Condition;
    lte(other: any): Condition;
    eq(other: any): Condition;
    ne(other: any): Condition;
    seq(other: any): Condition;
    sne(other: any): Condition;
    in_(other: any): Condition;
    nin(other: any): Condition;
    contains(other: any): Condition;
    not_contains(other: any): Condition;
    interval(other: any): Condition;
    not_interval(other: any): Condition;
    startswith(other: any): Condition;
    endswith(other: any): Condition;
    present(): Condition;
    not_present(): Condition;
    operator(op: Operator): ValueLessCondition;
}
export declare function Key(field: string): _Key;
export declare class Filter {
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
    constructor(filters: Condition | ConditionType[], empty_filters_response?: boolean, missing_field_response?: boolean);
    _preprocess(filters: ConditionType[]): {
        [key: string]: Query;
    };
    _filter(item: any, filters?: ConditionType[], oring?: boolean): boolean;
    /**
     * Filter a single item
     * @param item The item to filter
     * @returns Whether or not the item meets the filter
     */
    single(item: any): boolean;
    /**
     * Filter the list of items
     * @param items The items to filter
     * @returns Only the items that satisfy the filter
     */
    many(items: any[]): any[];
}
export {};
