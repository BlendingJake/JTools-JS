import { ATN } from "antlr4ts/atn/ATN";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { Vocabulary } from "antlr4ts/Vocabulary";
export declare class JQLLexer extends Lexer {
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
    static readonly channelNames: string[];
    static readonly modeNames: string[];
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    get vocabulary(): Vocabulary;
    constructor(input: CharStream);
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    get channelNames(): string[];
    get modeNames(): string[];
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static get _ATN(): ATN;
}