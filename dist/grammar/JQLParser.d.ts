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
    static readonly T__3 = 4;
    static readonly T__4 = 5;
    static readonly T__5 = 6;
    static readonly T__6 = 7;
    static readonly T__7 = 8;
    static readonly T__8 = 9;
    static readonly PRIMITIVE = 10;
    static readonly LPAREN = 11;
    static readonly RPAREN = 12;
    static readonly DOT = 13;
    static readonly LBRACKET = 14;
    static readonly RBRACKET = 15;
    static readonly COMMA = 16;
    static readonly LBRACE = 17;
    static readonly RBRACE = 18;
    static readonly SEMI = 19;
    static readonly AT = 20;
    static readonly DOLLAR = 21;
    static readonly DIGITS = 22;
    static readonly LETTERS = 23;
    static readonly STRING = 24;
    static readonly WS = 25;
    static readonly LAST = 26;
    static readonly RULE_jql_multi_query = 0;
    static readonly RULE_jql_query = 1;
    static readonly RULE_query = 2;
    static readonly RULE_raw_text = 3;
    static readonly RULE_query_part = 4;
    static readonly RULE_query_field = 5;
    static readonly RULE_special = 6;
    static readonly RULE_special_name = 7;
    static readonly RULE_arguments = 8;
    static readonly RULE_keyword_argument = 9;
    static readonly RULE_argument = 10;
    static readonly RULE_arith_expr = 11;
    static readonly RULE_arith_operator = 12;
    static readonly RULE_factor_expr = 13;
    static readonly RULE_factor_operator = 14;
    static readonly RULE_power_expr = 15;
    static readonly RULE_power_operator = 16;
    static readonly RULE_math_value = 17;
    static readonly RULE_value = 18;
    static readonly RULE_primitive_value = 19;
    static readonly RULE_list_value = 20;
    static readonly RULE_set_value = 21;
    static readonly RULE_object_value = 22;
    static readonly RULE_pair = 23;
    static readonly RULE_key = 24;
    static readonly RULE_number = 25;
    static readonly RULE_name = 26;
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
    keyword_argument(): Keyword_argumentContext;
    argument(): ArgumentContext;
    arith_expr(): Arith_exprContext;
    arith_operator(): Arith_operatorContext;
    factor_expr(): Factor_exprContext;
    factor_operator(): Factor_operatorContext;
    power_expr(): Power_exprContext;
    power_operator(): Power_operatorContext;
    math_value(): Math_valueContext;
    value(): ValueContext;
    primitive_value(): Primitive_valueContext;
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
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
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
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
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
    argument(): ArgumentContext[];
    argument(i: number): ArgumentContext;
    RPAREN(): TerminalNode;
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
    COMMA(): TerminalNode[];
    COMMA(i: number): TerminalNode;
    keyword_argument(): Keyword_argumentContext[];
    keyword_argument(i: number): Keyword_argumentContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Keyword_argumentContext extends ParserRuleContext {
    name(): NameContext;
    arith_expr(): Arith_exprContext | undefined;
    value(): ValueContext | undefined;
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class ArgumentContext extends ParserRuleContext {
    arith_expr(): Arith_exprContext | undefined;
    value(): ValueContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Arith_exprContext extends ParserRuleContext {
    factor_expr(): Factor_exprContext[];
    factor_expr(i: number): Factor_exprContext;
    arith_operator(): Arith_operatorContext[];
    arith_operator(i: number): Arith_operatorContext;
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Arith_operatorContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Factor_exprContext extends ParserRuleContext {
    power_expr(): Power_exprContext[];
    power_expr(i: number): Power_exprContext;
    factor_operator(): Factor_operatorContext[];
    factor_operator(i: number): Factor_operatorContext;
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Factor_operatorContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Power_exprContext extends ParserRuleContext {
    math_value(): Math_valueContext[];
    math_value(i: number): Math_valueContext;
    power_operator(): Power_operatorContext[];
    power_operator(i: number): Power_operatorContext;
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Power_operatorContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Math_valueContext extends ParserRuleContext {
    AT(): TerminalNode | undefined;
    query(): QueryContext | undefined;
    number(): NumberContext | undefined;
    LPAREN(): TerminalNode | undefined;
    arith_expr(): Arith_exprContext | undefined;
    RPAREN(): TerminalNode | undefined;
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
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
    arith_expr(): Arith_exprContext | undefined;
    primitive_value(): Primitive_valueContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
export declare class Primitive_valueContext extends ParserRuleContext {
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
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
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
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
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
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
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
    WS(): TerminalNode[];
    WS(i: number): TerminalNode;
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
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: JQLListener): void;
    exitRule(listener: JQLListener): void;
}
