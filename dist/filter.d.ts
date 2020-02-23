import { Getter } from "./getter";
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
}
export declare function Key(field: string): _Key;
export declare class Filter {
    private readonly filters;
    private readonly getters;
    private readonly empty_filters_response;
    constructor(filters: Condition | ConditionType[], params?: {
        empty_filters_response?: boolean;
    });
    _preprocess(filters: ConditionType[]): {
        [key: string]: Getter;
    };
    _filter(item: any, filters?: ConditionType[], oring?: boolean): boolean;
    many(items: any[]): any[];
    single(item: any): boolean;
}
export {};
