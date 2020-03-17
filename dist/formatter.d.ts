import { JQLMultiQuery } from "./grammar/jql";
export declare class Formatter {
    private readonly spec;
    private readonly fallback;
    private readonly multi_query;
    constructor(spec: string, fallback?: any);
    _format(mq: JQLMultiQuery, item: any): any;
    single(item: any): string | any;
    many(items: any[]): (string | any)[];
}
