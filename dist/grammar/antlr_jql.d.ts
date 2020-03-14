import { JQLQuery, JQLMultiQuery } from "./jql";
import { JQLParser } from "./JQLParser";
import { CommonTokenStream, ANTLRInputStream } from "antlr4ts";
import { JQLLexer } from "./JQLLexer";
export declare class JQLParseError extends Error {
    constructor(e: string);
}
declare class Builder {
    protected convert_ints: boolean;
    protected text: string;
    protected input_stream: ANTLRInputStream;
    protected lexer: JQLLexer;
    protected stream: CommonTokenStream;
    protected parser: JQLParser;
    constructor(text: string, convert_ints?: boolean);
}
export declare class JQLQueryBuilder extends Builder {
    protected listener: any;
    protected walker: any;
    constructor(text: string, convert_ints?: boolean);
    get_built_query(): JQLQuery;
}
export declare class JQLMultiQueryBuilder extends Builder {
    protected listener: any;
    protected walker: any;
    constructor(text: string, convert_ints?: boolean);
    get_built_query(): JQLMultiQuery;
}
export {};
