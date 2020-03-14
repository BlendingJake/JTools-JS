import { JQLQuery, JQLValue } from "./grammar/jql";
declare type SpecialFunction = (value: any, ...args: any[]) => any;
export declare class Query {
    private readonly multiple;
    private readonly queries;
    private readonly fallback;
    private readonly convert_ints;
    private readonly parts;
    constructor(query: string | string[] | JQLQuery | JQLQuery[], convert_ints?: boolean, fallback?: any);
    static register_special(name: string, func: SpecialFunction): boolean;
    _query(value: any, query: JQLQuery): any;
    _value(value: any, q_or_v: JQLQuery | JQLValue): any;
    single(item: any): any | any[];
    many(items: any[]): any[] | any[][];
}
export {};
