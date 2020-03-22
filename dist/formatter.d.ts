import { JQLMultiQuery } from "./grammar/jql";
export declare class Formatter {
    private readonly spec;
    private readonly fallback;
    private readonly multi_query;
    /**
     * Create a new Formatter for a spec string which can contain multiple JQL queries, prefixed with '@',
     * which will be used to format the output string(s).
     * @param spec The specification string
     * @param fallback The value that will replace any query that could not be performed
     */
    constructor(spec: string, fallback?: string);
    _format(mq: JQLMultiQuery, item: any): string;
    /**
     * Format a single item
     * @param item The item to format
     * @returns The formatted string
     */
    single(item: any): string;
    /**
     * Format a list of items
     * @param items The items to format
     * @returns A list of formatted strings
     */
    many(items: any[]): string[];
}
