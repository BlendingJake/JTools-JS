import { JQLQuery, JQLValue } from "./grammar/jql";
export declare type SpecialFunction = (value: any, context: {
    [key: string]: any;
}, ...args: any[]) => any;
export default class Query {
    private readonly multiple;
    private readonly queries;
    private readonly fallback;
    private readonly parts;
    /**
     * Create a query object from a JQL query string, or a list of JQL query strings
     * @param query The JQL query string(s)
     * @param fallback A fallback vlaue that will be used if a field cannot be found
     */
    constructor(query: string | string[] | JQLQuery | JQLQuery[], fallback?: any);
    _query(value: any, query: JQLQuery, context: {
        [key: string]: any;
    }): any;
    _value(value: any, q_or_v: JQLQuery | JQLValue, context: {
        [key: string]: any;
    }): any;
    /**
     * Query the item
     * @param item The item to query
     * @param context An additional namespace that will be searched if a toplevel field name cannot
     *      be found on the item
     * @returns A value, or list of values, depending on whether one or multiple queries are present
     */
    single(item: any, context?: {
        [key in string | number]: any;
    }): any | any[];
    /**
     * Query the items
     * @param items The items to query
     * @param context An additional namespace that will be searched if a toplevel field name cannot
     *      be found on the item currently being queried
     * @returns A list of values or list of lists of values, depending on wehther one or multiple queries are present
     */
    many(items: any[], context?: {
        [key in string | number]: any;
    }): any[] | any[][];
    /**
     * Register a new special that can be accessed with $<name>.
     * The function should take at least one argument, which will be the current value in query.
     * @param name The name of the special - must only contain these characters: [-a-zA-Z0-9_]
     * @param func The function that will be applied to the value
     * @returns Whether or not the special could be registered
     */
    static register_special(name: string, func: SpecialFunction): boolean;
}
export { Query };
export declare class SpecialNotFoundError extends Error {
    constructor(special: string);
}
