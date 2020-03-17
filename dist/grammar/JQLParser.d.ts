import { ATN } from "antlr4ts/atn/ATN";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { JQLListener } from "./JQLListener";
export declare class JQLParser extends Parser {
    static readonly T__0 = 1;
    static readonly T__1 = 2;
    static readonly T__2 = 3;
    static readonly PRIMITIVE = 4;
    static readonly LPAREN = 5;
    static readonly RPAREN = 6;
    static readonly DOT = 7;
    static readonly LBRACKET = 8;
    static readonly RBRACKET = 9;
    static readonly COMMA = 10;
    static readonly LBRACE = 11;
    static readonly RBRACE = 12;
    static readonly SEMI = 13;
    static readonly AT = 14;
    static readonly DOLLAR = 15;
    static readonly DIGITS = 16;
    static readonly LETTERS = 17;
    static readonly STRING = 18;
    static readonly SPACE = 19;
    static readonly WS = 20;
    static readonly IDENTIFIER = 21;
    static readonly LAST = 22;
    static readonly RULE_jql_multi_query = 0;
    static readonly RULE_jql_query = 1;
    static readonly RULE_query = 2;
    static readonly RULE_raw_text = 3;
    static readonly RULE_query_part = 4;
    static readonly RULE_query_field = 5;
    static readonly RULE_special = 6;
    static readonly RULE_special_name = 7;
    static readonly RULE_arguments = 8;
    static readonly RULE_value = 9;
    static readonly RULE_list_value = 10;
    static readonly RULE_set_value = 11;
    static readonly RULE_object_value = 12;
    static readonly RULE_pair = 13;
    static readonly RULE_key = 14;
    static readonly RULE_number = 15;
    static readonly RULE_name = 16;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    get vocabulary(): Vocabulary;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    constructor(input: TokenStream);
    jql_multi_query(): Jql_multi_queryContext;
    jql_query(): Jql_queryContext;
    query(): QueryContext;
    raw_text(): Raw_textContext;
    query_part(): Query_partContext;
    query_field(): Query_fieldContext;
    special(): SpecialContext;
    special_name(): Special_nameContext;
    arguments(): ArgumentsContext;
    value(): ValueContext;
    list_value(): List_valueContext;
    set_value(): Set_valueContext;
    object_value(): Object_valueContext;
    pair(): PairContext;
    key(): KeyContext;
    number(): NumberContext;
    name(): NameContext;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static get _ATN(): ATN;
}
export declare class Jql_multi_queryContext extends ParserRuleContext {
    AT(): TerminalNode[];
    AT(i: number): TerminalNode;
    query(): QueryContext[];
    query(i: number): QueryContext;
    raw_text(): Raw_textContext[];
    raw_text(i: number): Raw_textContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Jql_queryContext extends ParserRuleContext {
    EOF(): TerminalNode;
    query(): QueryContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class QueryContext extends ParserRuleContext {
    query_part(): Query_partContext[];
    query_part(i: number): Query_partContext;
    DOT(): TerminalNode[];
    DOT(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Raw_textContext extends ParserRuleContext {
    AT(): TerminalNode[];
    AT(i: number): TerminalNode;
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Query_partContext extends ParserRuleContext {
    query_field(): Query_fieldContext | undefined;
    special(): SpecialContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Query_fieldContext extends ParserRuleContext {
    name(): NameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class SpecialContext extends ParserRuleContext {
    DOLLAR(): TerminalNode;
    special_name(): Special_nameContext;
    arguments(): ArgumentsContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Special_nameContext extends ParserRuleContext {
    name(): NameContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class ArgumentsContext extends ParserRuleContext {
    LPAREN(): TerminalNode;
    value(): ValueContext[];
    value(i: number): ValueContext;
    RPAREN(): TerminalNode;
    SPACE(): TerminalNode[];
    SPACE(i: number): TerminalNode;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class ValueContext extends ParserRuleContext {
    AT(): TerminalNode | undefined;
    query(): QueryContext | undefined;
    list_value(): List_valueContext | undefined;
    set_value(): Set_valueContext | undefined;
    object_value(): Object_valueContext | undefined;
    number(): NumberContext | undefined;
    STRING(): TerminalNode | undefined;
    PRIMITIVE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class List_valueContext extends ParserRuleContext {
    LBRACKET(): TerminalNode;
    value(): ValueContext[];
    value(i: number): ValueContext;
    RBRACKET(): TerminalNode;
    SPACE(): TerminalNode[];
    SPACE(i: number): TerminalNode;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Set_valueContext extends ParserRuleContext {
    LBRACE(): TerminalNode;
    value(): ValueContext[];
    value(i: number): ValueContext;
    RBRACE(): TerminalNode;
    SPACE(): TerminalNode[];
    SPACE(i: number): TerminalNode;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Object_valueContext extends ParserRuleContext {
    LBRACE(): TerminalNode;
    pair(): PairContext[];
    pair(i: number): PairContext;
    RBRACE(): TerminalNode;
    SPACE(): TerminalNode[];
    SPACE(i: number): TerminalNode;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    SEMI(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class PairContext extends ParserRuleContext {
    key(): KeyContext;
    SEMI(): TerminalNode;
    value(): ValueContext;
    SPACE(): TerminalNode[];
    SPACE(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class KeyContext extends ParserRuleContext {
    AT(): TerminalNode | undefined;
    query(): QueryContext | undefined;
    STRING(): TerminalNode | undefined;
    number(): NumberContext | undefined;
    PRIMITIVE(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class NumberContext extends ParserRuleContext {
    DIGITS(): TerminalNode[];
    DIGITS(i: number): TerminalNode;
    DOT(): TerminalNode | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class NameContext extends ParserRuleContext {
    PRIMITIVE(): TerminalNode[];
    PRIMITIVE(i: number): TerminalNode;
    DIGITS(): TerminalNode[];
    DIGITS(i: number): TerminalNode;
    LETTERS(): TerminalNode[];
    LETTERS(i: number): TerminalNode;
    LBRACKET(): TerminalNode[];
    LBRACKET(i: number): TerminalNode;
    RBRACKET(): TerminalNode[];
    RBRACKET(i: number): TerminalNode;
    LBRACE(): TerminalNode[];
    LBRACE(i: number): TerminalNode;
    RBRACE(): TerminalNode[];
    RBRACE(i: number): TerminalNode;
    SEMI(): TerminalNode[];
    SEMI(i: number): TerminalNode;
    IDENTIFIER(): TerminalNode[];
    IDENTIFIER(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
