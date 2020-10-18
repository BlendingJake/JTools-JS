import { JQLQuery, JQLValue, JQLArgument, JQLKeywordArgument, JQLExpression } from "./grammar/jql";
export declare type Args = {
    $args: any[];
    $kwargs: {
        [key: string]: any;
    };
    [key: string]: any;
};
export declare type SpecialFunction = (value: any, context: {
    [key: string]: any;
}, args?: Args) => any;
export declare type ArgumentDefinition = ('$args' | '$kwargs' | string | {
    name: string;
    default: any;
})[];
export interface ParsedArgDef {
    args: ArgumentDefinition;
    lookup: {
        [key in string | number]: {
            name: string | number;
            default?: any;
            index: number;
        };
    };
    defaults: {
        [key: string]: any;
    };
    argsPosition: number | null;
    kwargsPosition: number | null;
}
export declare const QUERY_CACHE: {
    [key: string]: Query;
};
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
    protected manuallyParse(queryString: string): JQLQuery;
    protected query(value: any, query: JQLQuery, context: {
        [key: string]: any;
    }): any;
    /**
     * Collect the actual values for each argument and split them
     * into a list for positional arguments and a map for keyword arguments.
     * Then, evaluate that against the original definition to
     * build the Args object which will be passed to the specials.
     */
    protected arguments(args: (JQLArgument | JQLKeywordArgument)[], value: any, context: {
        [key: string]: any;
    }, special: string): Args;
    /**
     * Take list of arguments and map of keyword arguments and
     * map them to the original argument defintion, if one was provided.
     */
    static parseArgs(args: any[], kwargs: {
        [key: string]: any;
    }, special: string): Args;
    protected value(value: any, qve: JQLQuery | JQLValue | JQLExpression, context: {
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
     * @param argDef A way to specify how the function will recieve its arguments to support
     *      keyword arguments
     * @returns Whether or not the special could be registered
     */
    static register_special(name: string, func: SpecialFunction, argDef?: ArgumentDefinition): boolean;
    static parseArgDef(argDef: ArgumentDefinition): ParsedArgDef;
}
export { Query };
export declare class SpecialNotFoundError extends Error {
    constructor(special: string);
}
export declare class UnepectedKeywordArgument extends Error {
    constructor(name: string, special: string);
}
export declare class UnexpectedPositionalArgument extends Error {
    constructor(position: number, special: string);
}
export declare function REGISTER_DEFAULTS(): void;
