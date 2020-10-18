// Generated from src/grammar/JQL.g4 by ANTLR 4.7.3-SNAPSHOT
import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { Token } from "antlr4ts/Token";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";
import * as Utils from "antlr4ts/misc/Utils";
export class JQLParser extends Parser {
    constructor(input) {
        super(input);
        this._interp = new ParserATNSimulator(JQLParser._ATN, this);
    }
    // @Override
    // @NotNull
    get vocabulary() {
        return JQLParser.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    // @Override
    get grammarFileName() { return "JQL.g4"; }
    // @Override
    get ruleNames() { return JQLParser.ruleNames; }
    // @Override
    get serializedATN() { return JQLParser._serializedATN; }
    // @RuleVersion(0)
    jql_multi_query() {
        let _localctx = new Jql_multi_queryContext(this._ctx, this.state);
        this.enterRule(_localctx, 0, JQLParser.RULE_jql_multi_query);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 59;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JQLParser.T__0) | (1 << JQLParser.T__1) | (1 << JQLParser.T__2) | (1 << JQLParser.T__3) | (1 << JQLParser.T__4) | (1 << JQLParser.T__5) | (1 << JQLParser.T__6) | (1 << JQLParser.T__7) | (1 << JQLParser.T__8) | (1 << JQLParser.PRIMITIVE) | (1 << JQLParser.LPAREN) | (1 << JQLParser.RPAREN) | (1 << JQLParser.DOT) | (1 << JQLParser.LBRACKET) | (1 << JQLParser.RBRACKET) | (1 << JQLParser.COMMA) | (1 << JQLParser.LBRACE) | (1 << JQLParser.RBRACE) | (1 << JQLParser.SEMI) | (1 << JQLParser.AT) | (1 << JQLParser.DOLLAR) | (1 << JQLParser.DIGITS) | (1 << JQLParser.LETTERS) | (1 << JQLParser.STRING) | (1 << JQLParser.WS) | (1 << JQLParser.LAST))) !== 0)) {
                    {
                        this.state = 57;
                        this._errHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this._input, 0, this._ctx)) {
                            case 1:
                                {
                                    this.state = 54;
                                    this.match(JQLParser.AT);
                                    this.state = 55;
                                    this.query();
                                }
                                break;
                            case 2:
                                {
                                    this.state = 56;
                                    this.raw_text();
                                }
                                break;
                        }
                    }
                    this.state = 61;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    jql_query() {
        let _localctx = new Jql_queryContext(this._ctx, this.state);
        this.enterRule(_localctx, 2, JQLParser.RULE_jql_query);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 65;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 62;
                                this.match(JQLParser.WS);
                            }
                        }
                    }
                    this.state = 67;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
                }
                this.state = 69;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JQLParser.T__2) | (1 << JQLParser.T__8) | (1 << JQLParser.PRIMITIVE) | (1 << JQLParser.DOLLAR) | (1 << JQLParser.DIGITS) | (1 << JQLParser.LETTERS))) !== 0)) {
                    {
                        this.state = 68;
                        this.query();
                    }
                }
                this.state = 74;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === JQLParser.WS) {
                    {
                        {
                            this.state = 71;
                            this.match(JQLParser.WS);
                        }
                    }
                    this.state = 76;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 77;
                this.match(JQLParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    query() {
        let _localctx = new QueryContext(this._ctx, this.state);
        this.enterRule(_localctx, 4, JQLParser.RULE_query);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 79;
                this.query_part();
                this.state = 90;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 83;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === JQLParser.WS) {
                                    {
                                        {
                                            this.state = 80;
                                            this.match(JQLParser.WS);
                                        }
                                    }
                                    this.state = 85;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                                this.state = 86;
                                this.match(JQLParser.DOT);
                                this.state = 87;
                                this.query_part();
                            }
                        }
                    }
                    this.state = 92;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    raw_text() {
        let _localctx = new Raw_textContext(this._ctx, this.state);
        this.enterRule(_localctx, 6, JQLParser.RULE_raw_text);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 101;
                this._errHandler.sync(this);
                _alt = 1;
                do {
                    switch (_alt) {
                        case 1:
                            {
                                this.state = 101;
                                this._errHandler.sync(this);
                                switch (this.interpreter.adaptivePredict(this._input, 8, this._ctx)) {
                                    case 1:
                                        {
                                            this.state = 94;
                                            this._errHandler.sync(this);
                                            _alt = 1;
                                            do {
                                                switch (_alt) {
                                                    case 1:
                                                        {
                                                            {
                                                                this.state = 93;
                                                                this.match(JQLParser.WS);
                                                            }
                                                        }
                                                        break;
                                                    default:
                                                        throw new NoViableAltException(this);
                                                }
                                                this.state = 96;
                                                this._errHandler.sync(this);
                                                _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
                                            } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
                                        }
                                        break;
                                    case 2:
                                        {
                                            {
                                                this.state = 98;
                                                this.match(JQLParser.AT);
                                                this.state = 99;
                                                this.match(JQLParser.AT);
                                            }
                                        }
                                        break;
                                    case 3:
                                        {
                                            this.state = 100;
                                            _la = this._input.LA(1);
                                            if (_la <= 0 || (_la === JQLParser.AT)) {
                                                this._errHandler.recoverInline(this);
                                            }
                                            else {
                                                if (this._input.LA(1) === Token.EOF) {
                                                    this.matchedEOF = true;
                                                }
                                                this._errHandler.reportMatch(this);
                                                this.consume();
                                            }
                                        }
                                        break;
                                }
                            }
                            break;
                        default:
                            throw new NoViableAltException(this);
                    }
                    this.state = 103;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
                } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    query_part() {
        let _localctx = new Query_partContext(this._ctx, this.state);
        this.enterRule(_localctx, 8, JQLParser.RULE_query_part);
        try {
            this.state = 107;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case JQLParser.T__2:
                case JQLParser.T__8:
                case JQLParser.PRIMITIVE:
                case JQLParser.DIGITS:
                case JQLParser.LETTERS:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 105;
                        this.query_field();
                    }
                    break;
                case JQLParser.DOLLAR:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 106;
                        this.special();
                    }
                    break;
                default:
                    throw new NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    query_field() {
        let _localctx = new Query_fieldContext(this._ctx, this.state);
        this.enterRule(_localctx, 10, JQLParser.RULE_query_field);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 109;
                this.name();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    special() {
        let _localctx = new SpecialContext(this._ctx, this.state);
        this.enterRule(_localctx, 12, JQLParser.RULE_special);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 111;
                this.match(JQLParser.DOLLAR);
                this.state = 112;
                this.special_name();
                this.state = 114;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 11, this._ctx)) {
                    case 1:
                        {
                            this.state = 113;
                            this.arguments();
                        }
                        break;
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    special_name() {
        let _localctx = new Special_nameContext(this._ctx, this.state);
        this.enterRule(_localctx, 14, JQLParser.RULE_special_name);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 116;
                this.name();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    arguments() {
        let _localctx = new ArgumentsContext(this._ctx, this.state);
        this.enterRule(_localctx, 16, JQLParser.RULE_arguments);
        let _la;
        try {
            let _alt;
            this.state = 209;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 25, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 118;
                        this.match(JQLParser.LPAREN);
                        this.state = 122;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 119;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 124;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 125;
                        this.argument();
                        this.state = 142;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 129;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 126;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 131;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 132;
                                        this.match(JQLParser.COMMA);
                                        this.state = 136;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 133;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 138;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 139;
                                        this.argument();
                                    }
                                }
                            }
                            this.state = 144;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
                        }
                        this.state = 161;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 148;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 145;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 150;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 151;
                                        this.match(JQLParser.COMMA);
                                        this.state = 155;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 152;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 157;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 158;
                                        this.keyword_argument();
                                    }
                                }
                            }
                            this.state = 163;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
                        }
                        this.state = 167;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 164;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 169;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 170;
                        this.match(JQLParser.RPAREN);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 172;
                        this.match(JQLParser.LPAREN);
                        this.state = 176;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 173;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 178;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 179;
                        this.keyword_argument();
                        this.state = 196;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.COMMA || _la === JQLParser.WS) {
                            {
                                {
                                    this.state = 183;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                    while (_la === JQLParser.WS) {
                                        {
                                            {
                                                this.state = 180;
                                                this.match(JQLParser.WS);
                                            }
                                        }
                                        this.state = 185;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                    }
                                    this.state = 186;
                                    this.match(JQLParser.COMMA);
                                    this.state = 190;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                    while (_la === JQLParser.WS) {
                                        {
                                            {
                                                this.state = 187;
                                                this.match(JQLParser.WS);
                                            }
                                        }
                                        this.state = 192;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                    }
                                    this.state = 193;
                                    this.keyword_argument();
                                }
                            }
                            this.state = 198;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 199;
                        this.match(JQLParser.RPAREN);
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 201;
                        this.match(JQLParser.LPAREN);
                        this.state = 205;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 202;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 207;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 208;
                        this.match(JQLParser.RPAREN);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    keyword_argument() {
        let _localctx = new Keyword_argumentContext(this._ctx, this.state);
        this.enterRule(_localctx, 18, JQLParser.RULE_keyword_argument);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 211;
                this.name();
                this.state = 215;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === JQLParser.WS) {
                    {
                        {
                            this.state = 212;
                            this.match(JQLParser.WS);
                        }
                    }
                    this.state = 217;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 218;
                this.match(JQLParser.T__0);
                this.state = 222;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === JQLParser.WS) {
                    {
                        {
                            this.state = 219;
                            this.match(JQLParser.WS);
                        }
                    }
                    this.state = 224;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 227;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 28, this._ctx)) {
                    case 1:
                        {
                            this.state = 225;
                            this.arith_expr();
                        }
                        break;
                    case 2:
                        {
                            this.state = 226;
                            this.value();
                        }
                        break;
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    argument() {
        let _localctx = new ArgumentContext(this._ctx, this.state);
        this.enterRule(_localctx, 20, JQLParser.RULE_argument);
        try {
            this.state = 231;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 29, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 229;
                        this.arith_expr();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 230;
                        this.value();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    arith_expr() {
        let _localctx = new Arith_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 22, JQLParser.RULE_arith_expr);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 233;
                this.factor_expr();
                this.state = 251;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 237;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === JQLParser.WS) {
                                    {
                                        {
                                            this.state = 234;
                                            this.match(JQLParser.WS);
                                        }
                                    }
                                    this.state = 239;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                                this.state = 240;
                                this.arith_operator();
                                this.state = 244;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === JQLParser.WS) {
                                    {
                                        {
                                            this.state = 241;
                                            this.match(JQLParser.WS);
                                        }
                                    }
                                    this.state = 246;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                                this.state = 247;
                                this.factor_expr();
                            }
                        }
                    }
                    this.state = 253;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    arith_operator() {
        let _localctx = new Arith_operatorContext(this._ctx, this.state);
        this.enterRule(_localctx, 24, JQLParser.RULE_arith_operator);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 254;
                _la = this._input.LA(1);
                if (!(_la === JQLParser.T__1 || _la === JQLParser.T__2)) {
                    this._errHandler.recoverInline(this);
                }
                else {
                    if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                    }
                    this._errHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    factor_expr() {
        let _localctx = new Factor_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 26, JQLParser.RULE_factor_expr);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 256;
                this.power_expr();
                this.state = 274;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 35, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 260;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === JQLParser.WS) {
                                    {
                                        {
                                            this.state = 257;
                                            this.match(JQLParser.WS);
                                        }
                                    }
                                    this.state = 262;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                                this.state = 263;
                                this.factor_operator();
                                this.state = 267;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === JQLParser.WS) {
                                    {
                                        {
                                            this.state = 264;
                                            this.match(JQLParser.WS);
                                        }
                                    }
                                    this.state = 269;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                                this.state = 270;
                                this.power_expr();
                            }
                        }
                    }
                    this.state = 276;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 35, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    factor_operator() {
        let _localctx = new Factor_operatorContext(this._ctx, this.state);
        this.enterRule(_localctx, 28, JQLParser.RULE_factor_operator);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 277;
                _la = this._input.LA(1);
                if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JQLParser.T__3) | (1 << JQLParser.T__4) | (1 << JQLParser.T__5) | (1 << JQLParser.T__6))) !== 0))) {
                    this._errHandler.recoverInline(this);
                }
                else {
                    if (this._input.LA(1) === Token.EOF) {
                        this.matchedEOF = true;
                    }
                    this._errHandler.reportMatch(this);
                    this.consume();
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    power_expr() {
        let _localctx = new Power_exprContext(this._ctx, this.state);
        this.enterRule(_localctx, 30, JQLParser.RULE_power_expr);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 279;
                this.math_value();
                this.state = 297;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 38, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 283;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === JQLParser.WS) {
                                    {
                                        {
                                            this.state = 280;
                                            this.match(JQLParser.WS);
                                        }
                                    }
                                    this.state = 285;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                                this.state = 286;
                                this.power_operator();
                                this.state = 290;
                                this._errHandler.sync(this);
                                _la = this._input.LA(1);
                                while (_la === JQLParser.WS) {
                                    {
                                        {
                                            this.state = 287;
                                            this.match(JQLParser.WS);
                                        }
                                    }
                                    this.state = 292;
                                    this._errHandler.sync(this);
                                    _la = this._input.LA(1);
                                }
                                this.state = 293;
                                this.math_value();
                            }
                        }
                    }
                    this.state = 299;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 38, this._ctx);
                }
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    power_operator() {
        let _localctx = new Power_operatorContext(this._ctx, this.state);
        this.enterRule(_localctx, 32, JQLParser.RULE_power_operator);
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 300;
                this.match(JQLParser.T__7);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    math_value() {
        let _localctx = new Math_valueContext(this._ctx, this.state);
        this.enterRule(_localctx, 34, JQLParser.RULE_math_value);
        let _la;
        try {
            this.state = 321;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case JQLParser.AT:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 302;
                        this.match(JQLParser.AT);
                        this.state = 303;
                        this.query();
                    }
                    break;
                case JQLParser.T__1:
                case JQLParser.T__2:
                case JQLParser.DIGITS:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 304;
                        this.number();
                    }
                    break;
                case JQLParser.LPAREN:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 305;
                        this.match(JQLParser.LPAREN);
                        this.state = 309;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 306;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 311;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 312;
                        this.arith_expr();
                        this.state = 316;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 313;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 318;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 319;
                        this.match(JQLParser.RPAREN);
                    }
                    break;
                default:
                    throw new NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    value() {
        let _localctx = new ValueContext(this._ctx, this.state);
        this.enterRule(_localctx, 36, JQLParser.RULE_value);
        try {
            this.state = 330;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 42, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 323;
                        this.match(JQLParser.AT);
                        this.state = 324;
                        this.query();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 325;
                        this.list_value();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 326;
                        this.set_value();
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 327;
                        this.object_value();
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 328;
                        this.arith_expr();
                    }
                    break;
                case 6:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 329;
                        this.primitive_value();
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    primitive_value() {
        let _localctx = new Primitive_valueContext(this._ctx, this.state);
        this.enterRule(_localctx, 38, JQLParser.RULE_primitive_value);
        try {
            this.state = 335;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case JQLParser.T__1:
                case JQLParser.T__2:
                case JQLParser.DIGITS:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 332;
                        this.number();
                    }
                    break;
                case JQLParser.STRING:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 333;
                        this.match(JQLParser.STRING);
                    }
                    break;
                case JQLParser.PRIMITIVE:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 334;
                        this.match(JQLParser.PRIMITIVE);
                    }
                    break;
                default:
                    throw new NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    list_value() {
        let _localctx = new List_valueContext(this._ctx, this.state);
        this.enterRule(_localctx, 40, JQLParser.RULE_list_value);
        let _la;
        try {
            let _alt;
            this.state = 380;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 50, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 337;
                        this.match(JQLParser.LBRACKET);
                        this.state = 341;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 338;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 343;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 344;
                        this.value();
                        this.state = 361;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 348;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 345;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 350;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 351;
                                        this.match(JQLParser.COMMA);
                                        this.state = 355;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 352;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 357;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 358;
                                        this.value();
                                    }
                                }
                            }
                            this.state = 363;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
                        }
                        this.state = 367;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 364;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 369;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 370;
                        this.match(JQLParser.RBRACKET);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 372;
                        this.match(JQLParser.LBRACKET);
                        this.state = 376;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 373;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 378;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 379;
                        this.match(JQLParser.RBRACKET);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    set_value() {
        let _localctx = new Set_valueContext(this._ctx, this.state);
        this.enterRule(_localctx, 42, JQLParser.RULE_set_value);
        let _la;
        try {
            let _alt;
            this.state = 425;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 57, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 382;
                        this.match(JQLParser.LBRACE);
                        this.state = 386;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 383;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 388;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 389;
                        this.value();
                        this.state = 406;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 54, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 393;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 390;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 395;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 396;
                                        this.match(JQLParser.COMMA);
                                        this.state = 400;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 397;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 402;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 403;
                                        this.value();
                                    }
                                }
                            }
                            this.state = 408;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 54, this._ctx);
                        }
                        this.state = 412;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 409;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 414;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 415;
                        this.match(JQLParser.RBRACE);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 417;
                        this.match(JQLParser.LBRACE);
                        this.state = 421;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 418;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 423;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 424;
                        this.match(JQLParser.RBRACE);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    object_value() {
        let _localctx = new Object_valueContext(this._ctx, this.state);
        this.enterRule(_localctx, 44, JQLParser.RULE_object_value);
        let _la;
        try {
            let _alt;
            this.state = 477;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 65, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 427;
                        this.match(JQLParser.LBRACE);
                        this.state = 431;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 428;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 433;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 434;
                        this.pair();
                        this.state = 451;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 61, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 438;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 435;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 440;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 441;
                                        this.match(JQLParser.COMMA);
                                        this.state = 445;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.WS) {
                                            {
                                                {
                                                    this.state = 442;
                                                    this.match(JQLParser.WS);
                                                }
                                            }
                                            this.state = 447;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 448;
                                        this.pair();
                                    }
                                }
                            }
                            this.state = 453;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 61, this._ctx);
                        }
                        this.state = 457;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 454;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 459;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 460;
                        this.match(JQLParser.RBRACE);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 462;
                        this.match(JQLParser.LBRACE);
                        this.state = 466;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 463;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 468;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 469;
                        this.match(JQLParser.SEMI);
                        this.state = 473;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.WS) {
                            {
                                {
                                    this.state = 470;
                                    this.match(JQLParser.WS);
                                }
                            }
                            this.state = 475;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 476;
                        this.match(JQLParser.RBRACE);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    pair() {
        let _localctx = new PairContext(this._ctx, this.state);
        this.enterRule(_localctx, 46, JQLParser.RULE_pair);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 479;
                this.key();
                this.state = 483;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === JQLParser.WS) {
                    {
                        {
                            this.state = 480;
                            this.match(JQLParser.WS);
                        }
                    }
                    this.state = 485;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 486;
                this.match(JQLParser.SEMI);
                this.state = 490;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === JQLParser.WS) {
                    {
                        {
                            this.state = 487;
                            this.match(JQLParser.WS);
                        }
                    }
                    this.state = 492;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 493;
                this.value();
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    key() {
        let _localctx = new KeyContext(this._ctx, this.state);
        this.enterRule(_localctx, 48, JQLParser.RULE_key);
        try {
            this.state = 500;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case JQLParser.AT:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 495;
                        this.match(JQLParser.AT);
                        this.state = 496;
                        this.query();
                    }
                    break;
                case JQLParser.STRING:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 497;
                        this.match(JQLParser.STRING);
                    }
                    break;
                case JQLParser.T__1:
                case JQLParser.T__2:
                case JQLParser.DIGITS:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 498;
                        this.number();
                    }
                    break;
                case JQLParser.PRIMITIVE:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 499;
                        this.match(JQLParser.PRIMITIVE);
                    }
                    break;
                default:
                    throw new NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    number() {
        let _localctx = new NumberContext(this._ctx, this.state);
        this.enterRule(_localctx, 50, JQLParser.RULE_number);
        let _la;
        try {
            this.state = 512;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 71, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 503;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === JQLParser.T__1 || _la === JQLParser.T__2) {
                            {
                                this.state = 502;
                                _la = this._input.LA(1);
                                if (!(_la === JQLParser.T__1 || _la === JQLParser.T__2)) {
                                    this._errHandler.recoverInline(this);
                                }
                                else {
                                    if (this._input.LA(1) === Token.EOF) {
                                        this.matchedEOF = true;
                                    }
                                    this._errHandler.reportMatch(this);
                                    this.consume();
                                }
                            }
                        }
                        this.state = 505;
                        this.match(JQLParser.DIGITS);
                        this.state = 506;
                        this.match(JQLParser.DOT);
                        this.state = 507;
                        this.match(JQLParser.DIGITS);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 509;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === JQLParser.T__1 || _la === JQLParser.T__2) {
                            {
                                this.state = 508;
                                _la = this._input.LA(1);
                                if (!(_la === JQLParser.T__1 || _la === JQLParser.T__2)) {
                                    this._errHandler.recoverInline(this);
                                }
                                else {
                                    if (this._input.LA(1) === Token.EOF) {
                                        this.matchedEOF = true;
                                    }
                                    this._errHandler.reportMatch(this);
                                    this.consume();
                                }
                            }
                        }
                        this.state = 511;
                        this.match(JQLParser.DIGITS);
                    }
                    break;
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    // @RuleVersion(0)
    name() {
        let _localctx = new NameContext(this._ctx, this.state);
        this.enterRule(_localctx, 52, JQLParser.RULE_name);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 515;
                this._errHandler.sync(this);
                _alt = 1;
                do {
                    switch (_alt) {
                        case 1:
                            {
                                {
                                    this.state = 514;
                                    _la = this._input.LA(1);
                                    if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JQLParser.T__2) | (1 << JQLParser.T__8) | (1 << JQLParser.PRIMITIVE) | (1 << JQLParser.DIGITS) | (1 << JQLParser.LETTERS))) !== 0))) {
                                        this._errHandler.recoverInline(this);
                                    }
                                    else {
                                        if (this._input.LA(1) === Token.EOF) {
                                            this.matchedEOF = true;
                                        }
                                        this._errHandler.reportMatch(this);
                                        this.consume();
                                    }
                                }
                            }
                            break;
                        default:
                            throw new NoViableAltException(this);
                    }
                    this.state = 517;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 72, this._ctx);
                } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            }
        }
        catch (re) {
            if (re instanceof RecognitionException) {
                _localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            }
            else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return _localctx;
    }
    static get _ATN() {
        if (!JQLParser.__ATN) {
            JQLParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(JQLParser._serializedATN));
        }
        return JQLParser.__ATN;
    }
}
JQLParser.T__0 = 1;
JQLParser.T__1 = 2;
JQLParser.T__2 = 3;
JQLParser.T__3 = 4;
JQLParser.T__4 = 5;
JQLParser.T__5 = 6;
JQLParser.T__6 = 7;
JQLParser.T__7 = 8;
JQLParser.T__8 = 9;
JQLParser.PRIMITIVE = 10;
JQLParser.LPAREN = 11;
JQLParser.RPAREN = 12;
JQLParser.DOT = 13;
JQLParser.LBRACKET = 14;
JQLParser.RBRACKET = 15;
JQLParser.COMMA = 16;
JQLParser.LBRACE = 17;
JQLParser.RBRACE = 18;
JQLParser.SEMI = 19;
JQLParser.AT = 20;
JQLParser.DOLLAR = 21;
JQLParser.DIGITS = 22;
JQLParser.LETTERS = 23;
JQLParser.STRING = 24;
JQLParser.WS = 25;
JQLParser.LAST = 26;
JQLParser.RULE_jql_multi_query = 0;
JQLParser.RULE_jql_query = 1;
JQLParser.RULE_query = 2;
JQLParser.RULE_raw_text = 3;
JQLParser.RULE_query_part = 4;
JQLParser.RULE_query_field = 5;
JQLParser.RULE_special = 6;
JQLParser.RULE_special_name = 7;
JQLParser.RULE_arguments = 8;
JQLParser.RULE_keyword_argument = 9;
JQLParser.RULE_argument = 10;
JQLParser.RULE_arith_expr = 11;
JQLParser.RULE_arith_operator = 12;
JQLParser.RULE_factor_expr = 13;
JQLParser.RULE_factor_operator = 14;
JQLParser.RULE_power_expr = 15;
JQLParser.RULE_power_operator = 16;
JQLParser.RULE_math_value = 17;
JQLParser.RULE_value = 18;
JQLParser.RULE_primitive_value = 19;
JQLParser.RULE_list_value = 20;
JQLParser.RULE_set_value = 21;
JQLParser.RULE_object_value = 22;
JQLParser.RULE_pair = 23;
JQLParser.RULE_key = 24;
JQLParser.RULE_number = 25;
JQLParser.RULE_name = 26;
// tslint:disable:no-trailing-whitespace
JQLParser.ruleNames = [
    "jql_multi_query", "jql_query", "query", "raw_text", "query_part", "query_field",
    "special", "special_name", "arguments", "keyword_argument", "argument",
    "arith_expr", "arith_operator", "factor_expr", "factor_operator", "power_expr",
    "power_operator", "math_value", "value", "primitive_value", "list_value",
    "set_value", "object_value", "pair", "key", "number", "name",
];
JQLParser._LITERAL_NAMES = [
    undefined, "'='", "'+'", "'-'", "'/'", "'//'", "'*'", "'%'", "'**'", "'_'",
    undefined, "'('", "')'", "'.'", "'['", "']'", "','", "'{'", "'}'", "':'",
    "'@'", "'$'",
];
JQLParser._SYMBOLIC_NAMES = [
    undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    undefined, undefined, undefined, "PRIMITIVE", "LPAREN", "RPAREN", "DOT",
    "LBRACKET", "RBRACKET", "COMMA", "LBRACE", "RBRACE", "SEMI", "AT", "DOLLAR",
    "DIGITS", "LETTERS", "STRING", "WS", "LAST",
];
JQLParser.VOCABULARY = new VocabularyImpl(JQLParser._LITERAL_NAMES, JQLParser._SYMBOLIC_NAMES, []);
JQLParser._serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1C\u020A\x04" +
    "\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
    "\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
    "\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
    "\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
    "\x04\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C" +
    "\x03\x02\x03\x02\x03\x02\x07\x02<\n\x02\f\x02\x0E\x02?\v\x02\x03\x03\x07" +
    "\x03B\n\x03\f\x03\x0E\x03E\v\x03\x03\x03\x05\x03H\n\x03\x03\x03\x07\x03" +
    "K\n\x03\f\x03\x0E\x03N\v\x03\x03\x03\x03\x03\x03\x04\x03\x04\x07\x04T" +
    "\n\x04\f\x04\x0E\x04W\v\x04\x03\x04\x03\x04\x07\x04[\n\x04\f\x04\x0E\x04" +
    "^\v\x04\x03\x05\x06\x05a\n\x05\r\x05\x0E\x05b\x03\x05\x03\x05\x03\x05" +
    "\x06\x05h\n\x05\r\x05\x0E\x05i\x03\x06\x03\x06\x05\x06n\n\x06\x03\x07" +
    "\x03\x07\x03\b\x03\b\x03\b\x05\bu\n\b\x03\t\x03\t\x03\n\x03\n\x07\n{\n" +
    "\n\f\n\x0E\n~\v\n\x03\n\x03\n\x07\n\x82\n\n\f\n\x0E\n\x85\v\n\x03\n\x03" +
    "\n\x07\n\x89\n\n\f\n\x0E\n\x8C\v\n\x03\n\x07\n\x8F\n\n\f\n\x0E\n\x92\v" +
    "\n\x03\n\x07\n\x95\n\n\f\n\x0E\n\x98\v\n\x03\n\x03\n\x07\n\x9C\n\n\f\n" +
    "\x0E\n\x9F\v\n\x03\n\x07\n\xA2\n\n\f\n\x0E\n\xA5\v\n\x03\n\x07\n\xA8\n" +
    "\n\f\n\x0E\n\xAB\v\n\x03\n\x03\n\x03\n\x03\n\x07\n\xB1\n\n\f\n\x0E\n\xB4" +
    "\v\n\x03\n\x03\n\x07\n\xB8\n\n\f\n\x0E\n\xBB\v\n\x03\n\x03\n\x07\n\xBF" +
    "\n\n\f\n\x0E\n\xC2\v\n\x03\n\x07\n\xC5\n\n\f\n\x0E\n\xC8\v\n\x03\n\x03" +
    "\n\x03\n\x03\n\x07\n\xCE\n\n\f\n\x0E\n\xD1\v\n\x03\n\x05\n\xD4\n\n\x03" +
    "\v\x03\v\x07\v\xD8\n\v\f\v\x0E\v\xDB\v\v\x03\v\x03\v\x07\v\xDF\n\v\f\v" +
    "\x0E\v\xE2\v\v\x03\v\x03\v\x05\v\xE6\n\v\x03\f\x03\f\x05\f\xEA\n\f\x03" +
    "\r\x03\r\x07\r\xEE\n\r\f\r\x0E\r\xF1\v\r\x03\r\x03\r\x07\r\xF5\n\r\f\r" +
    "\x0E\r\xF8\v\r\x03\r\x03\r\x07\r\xFC\n\r\f\r\x0E\r\xFF\v\r\x03\x0E\x03" +
    "\x0E\x03\x0F\x03\x0F\x07\x0F\u0105\n\x0F\f\x0F\x0E\x0F\u0108\v\x0F\x03" +
    "\x0F\x03\x0F\x07\x0F\u010C\n\x0F\f\x0F\x0E\x0F\u010F\v\x0F\x03\x0F\x03" +
    "\x0F\x07\x0F\u0113\n\x0F\f\x0F\x0E\x0F\u0116\v\x0F\x03\x10\x03\x10\x03" +
    "\x11\x03\x11\x07\x11\u011C\n\x11\f\x11\x0E\x11\u011F\v\x11\x03\x11\x03" +
    "\x11\x07\x11\u0123\n\x11\f\x11\x0E\x11\u0126\v\x11\x03\x11\x03\x11\x07" +
    "\x11\u012A\n\x11\f\x11\x0E\x11\u012D\v\x11\x03\x12\x03\x12\x03\x13\x03" +
    "\x13\x03\x13\x03\x13\x03\x13\x07\x13\u0136\n\x13\f\x13\x0E\x13\u0139\v" +
    "\x13\x03\x13\x03\x13\x07\x13\u013D\n\x13\f\x13\x0E\x13\u0140\v\x13\x03" +
    "\x13\x03\x13\x05\x13\u0144\n\x13\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14" +
    "\x03\x14\x03\x14\x05\x14\u014D\n\x14\x03\x15\x03\x15\x03\x15\x05\x15\u0152" +
    "\n\x15\x03\x16\x03\x16\x07\x16\u0156\n\x16\f\x16\x0E\x16\u0159\v\x16\x03" +
    "\x16\x03\x16\x07\x16\u015D\n\x16\f\x16\x0E\x16\u0160\v\x16\x03\x16\x03" +
    "\x16\x07\x16\u0164\n\x16\f\x16\x0E\x16\u0167\v\x16\x03\x16\x07\x16\u016A" +
    "\n\x16\f\x16\x0E\x16\u016D\v\x16\x03\x16\x07\x16\u0170\n\x16\f\x16\x0E" +
    "\x16\u0173\v\x16\x03\x16\x03\x16\x03\x16\x03\x16\x07\x16\u0179\n\x16\f" +
    "\x16\x0E\x16\u017C\v\x16\x03\x16\x05\x16\u017F\n\x16\x03\x17\x03\x17\x07" +
    "\x17\u0183\n\x17\f\x17\x0E\x17\u0186\v\x17\x03\x17\x03\x17\x07\x17\u018A" +
    "\n\x17\f\x17\x0E\x17\u018D\v\x17\x03\x17\x03\x17\x07\x17\u0191\n\x17\f" +
    "\x17\x0E\x17\u0194\v\x17\x03\x17\x07\x17\u0197\n\x17\f\x17\x0E\x17\u019A" +
    "\v\x17\x03\x17\x07\x17\u019D\n\x17\f\x17\x0E\x17\u01A0\v\x17\x03\x17\x03" +
    "\x17\x03\x17\x03\x17\x07\x17\u01A6\n\x17\f\x17\x0E\x17\u01A9\v\x17\x03" +
    "\x17\x05\x17\u01AC\n\x17\x03\x18\x03\x18\x07\x18\u01B0\n\x18\f\x18\x0E" +
    "\x18\u01B3\v\x18\x03\x18\x03\x18\x07\x18\u01B7\n\x18\f\x18\x0E\x18\u01BA" +
    "\v\x18\x03\x18\x03\x18\x07\x18\u01BE\n\x18\f\x18\x0E\x18\u01C1\v\x18\x03" +
    "\x18\x07\x18\u01C4\n\x18\f\x18\x0E\x18\u01C7\v\x18\x03\x18\x07\x18\u01CA" +
    "\n\x18\f\x18\x0E\x18\u01CD\v\x18\x03\x18\x03\x18\x03\x18\x03\x18\x07\x18" +
    "\u01D3\n\x18\f\x18\x0E\x18\u01D6\v\x18\x03\x18\x03\x18\x07\x18\u01DA\n" +
    "\x18\f\x18\x0E\x18\u01DD\v\x18\x03\x18\x05\x18\u01E0\n\x18\x03\x19\x03" +
    "\x19\x07\x19\u01E4\n\x19\f\x19\x0E\x19\u01E7\v\x19\x03\x19\x03\x19\x07" +
    "\x19\u01EB\n\x19\f\x19\x0E\x19\u01EE\v\x19\x03\x19\x03\x19\x03\x1A\x03" +
    "\x1A\x03\x1A\x03\x1A\x03\x1A\x05\x1A\u01F7\n\x1A\x03\x1B\x05\x1B\u01FA" +
    "\n\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u0200\n\x1B\x03\x1B\x05" +
    "\x1B\u0203\n\x1B\x03\x1C\x06\x1C\u0206\n\x1C\r\x1C\x0E\x1C\u0207\x03\x1C" +
    "\x02\x02\x02\x1D\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10" +
    "\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02" +
    "$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x02\x02\x06\x03\x02\x16" +
    "\x16\x03\x02\x04\x05\x03\x02\x06\t\x05\x02\x05\x05\v\f\x18\x19\x02\u0241" +
    "\x02=\x03\x02\x02\x02\x04C\x03\x02\x02\x02\x06Q\x03\x02\x02\x02\bg\x03" +
    "\x02\x02\x02\nm\x03\x02\x02\x02\fo\x03\x02\x02\x02\x0Eq\x03\x02\x02\x02" +
    "\x10v\x03\x02\x02\x02\x12\xD3\x03\x02\x02\x02\x14\xD5\x03\x02\x02\x02" +
    "\x16\xE9\x03\x02\x02\x02\x18\xEB\x03\x02\x02\x02\x1A\u0100\x03\x02\x02" +
    "\x02\x1C\u0102\x03\x02\x02\x02\x1E\u0117\x03\x02\x02\x02 \u0119\x03\x02" +
    "\x02\x02\"\u012E\x03\x02\x02\x02$\u0143\x03\x02\x02\x02&\u014C\x03\x02" +
    "\x02\x02(\u0151\x03\x02\x02\x02*\u017E\x03\x02\x02\x02,\u01AB\x03\x02" +
    "\x02\x02.\u01DF\x03\x02\x02\x020\u01E1\x03\x02\x02\x022\u01F6\x03\x02" +
    "\x02\x024\u0202\x03\x02\x02\x026\u0205\x03\x02\x02\x0289\x07\x16\x02\x02" +
    "9<\x05\x06\x04\x02:<\x05\b\x05\x02;8\x03\x02\x02\x02;:\x03\x02\x02\x02" +
    "<?\x03\x02\x02\x02=;\x03\x02\x02\x02=>\x03\x02\x02\x02>\x03\x03\x02\x02" +
    "\x02?=\x03\x02\x02\x02@B\x07\x1B\x02\x02A@\x03\x02\x02\x02BE\x03\x02\x02" +
    "\x02CA\x03\x02\x02\x02CD\x03\x02\x02\x02DG\x03\x02\x02\x02EC\x03\x02\x02" +
    "\x02FH\x05\x06\x04\x02GF\x03\x02\x02\x02GH\x03\x02\x02\x02HL\x03\x02\x02" +
    "\x02IK\x07\x1B\x02\x02JI\x03\x02\x02\x02KN\x03\x02\x02\x02LJ\x03\x02\x02" +
    "\x02LM\x03\x02\x02\x02MO\x03\x02\x02\x02NL\x03\x02\x02\x02OP\x07\x02\x02" +
    "\x03P\x05\x03\x02\x02\x02Q\\\x05\n\x06\x02RT\x07\x1B\x02\x02SR\x03\x02" +
    "\x02\x02TW\x03\x02\x02\x02US\x03\x02\x02\x02UV\x03\x02\x02\x02VX\x03\x02" +
    "\x02\x02WU\x03\x02\x02\x02XY\x07\x0F\x02\x02Y[\x05\n\x06\x02ZU\x03\x02" +
    "\x02\x02[^\x03\x02\x02\x02\\Z\x03\x02\x02\x02\\]\x03\x02\x02\x02]\x07" +
    "\x03\x02\x02\x02^\\\x03\x02\x02\x02_a\x07\x1B\x02\x02`_\x03\x02\x02\x02" +
    "ab\x03\x02\x02\x02b`\x03\x02\x02\x02bc\x03\x02\x02\x02ch\x03\x02\x02\x02" +
    "de\x07\x16\x02\x02eh\x07\x16\x02\x02fh\n\x02\x02\x02g`\x03\x02\x02\x02" +
    "gd\x03\x02\x02\x02gf\x03\x02\x02\x02hi\x03\x02\x02\x02ig\x03\x02\x02\x02" +
    "ij\x03\x02\x02\x02j\t\x03\x02\x02\x02kn\x05\f\x07\x02ln\x05\x0E\b\x02" +
    "mk\x03\x02\x02\x02ml\x03\x02\x02\x02n\v\x03\x02\x02\x02op\x056\x1C\x02" +
    "p\r\x03\x02\x02\x02qr\x07\x17\x02\x02rt\x05\x10\t\x02su\x05\x12\n\x02" +
    "ts\x03\x02\x02\x02tu\x03\x02\x02\x02u\x0F\x03\x02\x02\x02vw\x056\x1C\x02" +
    "w\x11\x03\x02\x02\x02x|\x07\r\x02\x02y{\x07\x1B\x02\x02zy\x03\x02\x02" +
    "\x02{~\x03\x02\x02\x02|z\x03\x02\x02\x02|}\x03\x02\x02\x02}\x7F\x03\x02" +
    "\x02\x02~|\x03\x02\x02\x02\x7F\x90\x05\x16\f\x02\x80\x82\x07\x1B\x02\x02" +
    "\x81\x80\x03\x02\x02\x02\x82\x85\x03\x02\x02\x02\x83\x81\x03\x02\x02\x02" +
    "\x83\x84\x03\x02\x02\x02\x84\x86\x03\x02\x02\x02\x85\x83\x03\x02\x02\x02" +
    "\x86\x8A\x07\x12\x02\x02\x87\x89\x07\x1B\x02\x02\x88\x87\x03\x02\x02\x02" +
    "\x89\x8C\x03\x02\x02\x02\x8A\x88\x03\x02\x02\x02\x8A\x8B\x03\x02\x02\x02" +
    "\x8B\x8D\x03\x02\x02\x02\x8C\x8A\x03\x02\x02\x02\x8D\x8F\x05\x16\f\x02" +
    "\x8E\x83\x03\x02\x02\x02\x8F\x92\x03\x02\x02\x02\x90\x8E\x03\x02\x02\x02" +
    "\x90\x91\x03\x02\x02\x02\x91\xA3\x03\x02\x02\x02\x92\x90\x03\x02\x02\x02" +
    "\x93\x95\x07\x1B\x02\x02\x94\x93\x03\x02\x02\x02\x95\x98\x03\x02\x02\x02" +
    "\x96\x94\x03\x02\x02\x02\x96\x97\x03\x02\x02\x02\x97\x99\x03\x02\x02\x02" +
    "\x98\x96\x03\x02\x02\x02\x99\x9D\x07\x12\x02\x02\x9A\x9C\x07\x1B\x02\x02" +
    "\x9B\x9A\x03\x02\x02\x02\x9C\x9F\x03\x02\x02\x02\x9D\x9B\x03\x02\x02\x02" +
    "\x9D\x9E\x03\x02\x02\x02\x9E\xA0\x03\x02\x02\x02\x9F\x9D\x03\x02\x02\x02" +
    "\xA0\xA2\x05\x14\v\x02\xA1\x96\x03\x02\x02\x02\xA2\xA5\x03\x02\x02\x02" +
    "\xA3\xA1\x03\x02\x02\x02\xA3\xA4\x03\x02\x02\x02\xA4\xA9\x03\x02\x02\x02" +
    "\xA5\xA3\x03\x02\x02\x02\xA6\xA8\x07\x1B\x02\x02\xA7\xA6\x03\x02\x02\x02" +
    "\xA8\xAB\x03\x02\x02\x02\xA9\xA7\x03\x02\x02\x02\xA9\xAA\x03\x02\x02\x02" +
    "\xAA\xAC\x03\x02\x02\x02\xAB\xA9\x03\x02\x02\x02\xAC\xAD\x07\x0E\x02\x02" +
    "\xAD\xD4\x03\x02\x02\x02\xAE\xB2\x07\r\x02\x02\xAF\xB1\x07\x1B\x02\x02" +
    "\xB0\xAF\x03\x02\x02\x02\xB1\xB4\x03\x02\x02\x02\xB2\xB0\x03\x02\x02\x02" +
    "\xB2\xB3\x03\x02\x02\x02\xB3\xB5\x03\x02\x02\x02\xB4\xB2\x03\x02\x02\x02" +
    "\xB5\xC6\x05\x14\v\x02\xB6\xB8\x07\x1B\x02\x02\xB7\xB6\x03\x02\x02\x02" +
    "\xB8\xBB\x03\x02\x02\x02\xB9\xB7\x03\x02\x02\x02\xB9\xBA\x03\x02\x02\x02" +
    "\xBA\xBC\x03\x02\x02\x02\xBB\xB9\x03\x02\x02\x02\xBC\xC0\x07\x12\x02\x02" +
    "\xBD\xBF\x07\x1B\x02\x02\xBE\xBD\x03\x02\x02\x02\xBF\xC2\x03\x02\x02\x02" +
    "\xC0\xBE\x03\x02\x02\x02\xC0\xC1\x03\x02\x02\x02\xC1\xC3\x03\x02\x02\x02" +
    "\xC2\xC0\x03\x02\x02\x02\xC3\xC5\x05\x14\v\x02\xC4\xB9\x03\x02\x02\x02" +
    "\xC5\xC8\x03\x02\x02\x02\xC6\xC4\x03\x02\x02\x02\xC6\xC7\x03\x02\x02\x02" +
    "\xC7\xC9\x03\x02\x02\x02\xC8\xC6\x03\x02\x02\x02\xC9\xCA\x07\x0E\x02\x02" +
    "\xCA\xD4\x03\x02\x02\x02\xCB\xCF\x07\r\x02\x02\xCC\xCE\x07\x1B\x02\x02" +
    "\xCD\xCC\x03\x02\x02\x02\xCE\xD1\x03\x02\x02\x02\xCF\xCD\x03\x02\x02\x02" +
    "\xCF\xD0\x03\x02\x02\x02\xD0\xD2\x03\x02\x02\x02\xD1\xCF\x03\x02\x02\x02" +
    "\xD2\xD4\x07\x0E\x02\x02\xD3x\x03\x02\x02\x02\xD3\xAE\x03\x02\x02\x02" +
    "\xD3\xCB\x03\x02\x02\x02\xD4\x13\x03\x02\x02\x02\xD5\xD9\x056\x1C\x02" +
    "\xD6\xD8\x07\x1B\x02\x02\xD7\xD6\x03\x02\x02\x02\xD8\xDB\x03\x02\x02\x02" +
    "\xD9\xD7\x03\x02\x02\x02\xD9\xDA\x03\x02\x02\x02\xDA\xDC\x03\x02\x02\x02" +
    "\xDB\xD9\x03\x02\x02\x02\xDC\xE0\x07\x03\x02\x02\xDD\xDF\x07\x1B\x02\x02" +
    "\xDE\xDD\x03\x02\x02\x02\xDF\xE2\x03\x02\x02\x02\xE0\xDE\x03\x02\x02\x02" +
    "\xE0\xE1\x03\x02\x02\x02\xE1\xE5\x03\x02\x02\x02\xE2\xE0\x03\x02\x02\x02" +
    "\xE3\xE6\x05\x18\r\x02\xE4\xE6\x05&\x14\x02\xE5\xE3\x03\x02\x02\x02\xE5" +
    "\xE4\x03\x02\x02\x02\xE6\x15\x03\x02\x02\x02\xE7\xEA\x05\x18\r\x02\xE8" +
    "\xEA\x05&\x14\x02\xE9\xE7\x03\x02\x02\x02\xE9\xE8\x03\x02\x02\x02\xEA" +
    "\x17\x03\x02\x02\x02\xEB\xFD\x05\x1C\x0F\x02\xEC\xEE\x07\x1B\x02\x02\xED" +
    "\xEC\x03\x02\x02\x02\xEE\xF1\x03\x02\x02\x02\xEF\xED\x03\x02\x02\x02\xEF" +
    "\xF0\x03\x02\x02\x02\xF0\xF2\x03\x02\x02\x02\xF1\xEF\x03\x02\x02\x02\xF2" +
    "\xF6\x05\x1A\x0E\x02\xF3\xF5\x07\x1B\x02\x02\xF4\xF3\x03\x02\x02\x02\xF5" +
    "\xF8\x03\x02\x02\x02\xF6\xF4\x03\x02\x02\x02\xF6\xF7\x03\x02\x02\x02\xF7" +
    "\xF9\x03\x02\x02\x02\xF8\xF6\x03\x02\x02\x02\xF9\xFA\x05\x1C\x0F\x02\xFA" +
    "\xFC\x03\x02\x02\x02\xFB\xEF\x03\x02\x02\x02\xFC\xFF\x03\x02\x02\x02\xFD" +
    "\xFB\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFE\x19\x03\x02\x02\x02\xFF" +
    "\xFD\x03\x02\x02\x02\u0100\u0101\t\x03\x02\x02\u0101\x1B\x03\x02\x02\x02" +
    "\u0102\u0114\x05 \x11\x02\u0103\u0105\x07\x1B\x02\x02\u0104\u0103\x03" +
    "\x02\x02\x02\u0105\u0108\x03\x02\x02\x02\u0106\u0104\x03\x02\x02\x02\u0106" +
    "\u0107\x03\x02\x02\x02\u0107\u0109\x03\x02\x02\x02\u0108\u0106\x03\x02" +
    "\x02\x02\u0109\u010D\x05\x1E\x10\x02\u010A\u010C\x07\x1B\x02\x02\u010B" +
    "\u010A\x03\x02\x02\x02\u010C\u010F\x03\x02\x02\x02\u010D\u010B\x03\x02" +
    "\x02\x02\u010D\u010E\x03\x02\x02\x02\u010E\u0110\x03\x02\x02\x02\u010F" +
    "\u010D\x03\x02\x02\x02\u0110\u0111\x05 \x11\x02\u0111\u0113\x03\x02\x02" +
    "\x02\u0112\u0106\x03\x02\x02\x02\u0113\u0116\x03\x02\x02\x02\u0114\u0112" +
    "\x03\x02\x02\x02\u0114\u0115\x03\x02\x02\x02\u0115\x1D\x03\x02\x02\x02" +
    "\u0116\u0114\x03\x02\x02\x02\u0117\u0118\t\x04\x02\x02\u0118\x1F\x03\x02" +
    "\x02\x02\u0119\u012B\x05$\x13\x02\u011A\u011C\x07\x1B\x02\x02\u011B\u011A" +
    "\x03\x02\x02\x02\u011C\u011F\x03\x02\x02\x02\u011D\u011B\x03\x02\x02\x02" +
    "\u011D\u011E\x03\x02\x02\x02\u011E\u0120\x03\x02\x02\x02\u011F\u011D\x03" +
    "\x02\x02\x02\u0120\u0124\x05\"\x12\x02\u0121\u0123\x07\x1B\x02\x02\u0122" +
    "\u0121\x03\x02\x02\x02\u0123\u0126\x03\x02\x02\x02\u0124\u0122\x03\x02" +
    "\x02\x02\u0124\u0125\x03\x02\x02\x02\u0125\u0127\x03\x02\x02\x02\u0126" +
    "\u0124\x03\x02\x02\x02\u0127\u0128\x05$\x13\x02\u0128\u012A\x03\x02\x02" +
    "\x02\u0129\u011D\x03\x02\x02\x02\u012A\u012D\x03\x02\x02\x02\u012B\u0129" +
    "\x03\x02\x02\x02\u012B\u012C\x03\x02\x02\x02\u012C!\x03\x02\x02\x02\u012D" +
    "\u012B\x03\x02\x02\x02\u012E\u012F\x07\n\x02\x02\u012F#\x03\x02\x02\x02" +
    "\u0130\u0131\x07\x16\x02\x02\u0131\u0144\x05\x06\x04\x02\u0132\u0144\x05" +
    "4\x1B\x02\u0133\u0137\x07\r\x02\x02\u0134\u0136\x07\x1B\x02\x02\u0135" +
    "\u0134\x03\x02\x02\x02\u0136\u0139\x03\x02\x02\x02\u0137\u0135\x03\x02" +
    "\x02\x02\u0137\u0138\x03\x02\x02\x02\u0138\u013A\x03\x02\x02\x02\u0139" +
    "\u0137\x03\x02\x02\x02\u013A\u013E\x05\x18\r\x02\u013B\u013D\x07\x1B\x02" +
    "\x02\u013C\u013B\x03\x02\x02\x02\u013D\u0140\x03\x02\x02\x02\u013E\u013C" +
    "\x03\x02\x02\x02\u013E\u013F\x03\x02\x02\x02\u013F\u0141\x03\x02\x02\x02" +
    "\u0140\u013E\x03\x02\x02\x02\u0141\u0142\x07\x0E\x02\x02\u0142\u0144\x03" +
    "\x02\x02\x02\u0143\u0130\x03\x02\x02\x02\u0143\u0132\x03\x02\x02\x02\u0143" +
    "\u0133\x03\x02\x02\x02\u0144%\x03\x02\x02\x02\u0145\u0146\x07\x16\x02" +
    "\x02\u0146\u014D\x05\x06\x04\x02\u0147\u014D\x05*\x16\x02\u0148\u014D" +
    "\x05,\x17\x02\u0149\u014D\x05.\x18\x02\u014A\u014D\x05\x18\r\x02\u014B" +
    "\u014D\x05(\x15\x02\u014C\u0145\x03\x02\x02\x02\u014C\u0147\x03\x02\x02" +
    "\x02\u014C\u0148\x03\x02\x02\x02\u014C\u0149\x03\x02\x02\x02\u014C\u014A" +
    "\x03\x02\x02\x02\u014C\u014B\x03\x02\x02\x02\u014D\'\x03\x02\x02\x02\u014E" +
    "\u0152\x054\x1B\x02\u014F\u0152\x07\x1A\x02\x02\u0150\u0152\x07\f\x02" +
    "\x02\u0151\u014E\x03\x02\x02\x02\u0151\u014F\x03\x02\x02\x02\u0151\u0150" +
    "\x03\x02\x02\x02\u0152)\x03\x02\x02\x02\u0153\u0157\x07\x10\x02\x02\u0154" +
    "\u0156\x07\x1B\x02\x02\u0155\u0154\x03\x02\x02\x02\u0156\u0159\x03\x02" +
    "\x02\x02\u0157\u0155\x03\x02\x02\x02\u0157\u0158\x03\x02\x02\x02\u0158" +
    "\u015A\x03\x02\x02\x02\u0159\u0157\x03\x02\x02\x02\u015A\u016B\x05&\x14" +
    "\x02\u015B\u015D\x07\x1B\x02\x02\u015C\u015B\x03\x02\x02\x02\u015D\u0160" +
    "\x03\x02\x02\x02\u015E\u015C\x03\x02\x02\x02\u015E\u015F\x03\x02\x02\x02" +
    "\u015F\u0161\x03\x02\x02\x02\u0160\u015E\x03\x02\x02\x02\u0161\u0165\x07" +
    "\x12\x02\x02\u0162\u0164\x07\x1B\x02\x02\u0163\u0162\x03\x02\x02\x02\u0164" +
    "\u0167\x03\x02\x02\x02\u0165\u0163\x03\x02\x02\x02\u0165\u0166\x03\x02" +
    "\x02\x02\u0166\u0168\x03\x02\x02\x02\u0167\u0165\x03\x02\x02\x02\u0168" +
    "\u016A\x05&\x14\x02\u0169\u015E\x03\x02\x02\x02\u016A\u016D\x03\x02\x02" +
    "\x02\u016B\u0169\x03\x02\x02\x02\u016B\u016C\x03\x02\x02\x02\u016C\u0171" +
    "\x03\x02\x02\x02\u016D\u016B\x03\x02\x02\x02\u016E\u0170\x07\x1B\x02\x02" +
    "\u016F\u016E\x03\x02\x02\x02\u0170\u0173\x03\x02\x02\x02\u0171\u016F\x03" +
    "\x02\x02\x02\u0171\u0172\x03\x02\x02\x02\u0172\u0174\x03\x02\x02\x02\u0173" +
    "\u0171\x03\x02\x02\x02\u0174\u0175\x07\x11\x02\x02\u0175\u017F\x03\x02" +
    "\x02\x02\u0176\u017A\x07\x10\x02\x02\u0177\u0179\x07\x1B\x02\x02\u0178" +
    "\u0177\x03\x02\x02\x02\u0179\u017C\x03\x02\x02\x02\u017A\u0178\x03\x02" +
    "\x02\x02\u017A\u017B\x03\x02\x02\x02\u017B\u017D\x03\x02\x02\x02\u017C" +
    "\u017A\x03\x02\x02\x02\u017D\u017F\x07\x11\x02\x02\u017E\u0153\x03\x02" +
    "\x02\x02\u017E\u0176\x03\x02\x02\x02\u017F+\x03\x02\x02\x02\u0180\u0184" +
    "\x07\x13\x02\x02\u0181\u0183\x07\x1B\x02\x02\u0182\u0181\x03\x02\x02\x02" +
    "\u0183\u0186\x03\x02\x02\x02\u0184\u0182\x03\x02\x02\x02\u0184\u0185\x03" +
    "\x02\x02\x02\u0185\u0187\x03\x02\x02\x02\u0186\u0184\x03\x02\x02\x02\u0187" +
    "\u0198\x05&\x14\x02\u0188\u018A\x07\x1B\x02\x02\u0189\u0188\x03\x02\x02" +
    "\x02\u018A\u018D\x03\x02\x02\x02\u018B\u0189\x03\x02\x02\x02\u018B\u018C" +
    "\x03\x02\x02\x02\u018C\u018E\x03\x02\x02\x02\u018D\u018B\x03\x02\x02\x02" +
    "\u018E\u0192\x07\x12\x02\x02\u018F\u0191\x07\x1B\x02\x02\u0190\u018F\x03" +
    "\x02\x02\x02\u0191\u0194\x03\x02\x02\x02\u0192\u0190\x03\x02\x02\x02\u0192" +
    "\u0193\x03\x02\x02\x02\u0193\u0195\x03\x02\x02\x02\u0194\u0192\x03\x02" +
    "\x02\x02\u0195\u0197\x05&\x14\x02\u0196\u018B\x03\x02\x02\x02\u0197\u019A" +
    "\x03\x02\x02\x02\u0198\u0196\x03\x02\x02\x02\u0198\u0199\x03\x02\x02\x02" +
    "\u0199\u019E\x03\x02\x02\x02\u019A\u0198\x03\x02\x02\x02\u019B\u019D\x07" +
    "\x1B\x02\x02\u019C\u019B\x03\x02\x02\x02\u019D\u01A0\x03\x02\x02\x02\u019E" +
    "\u019C\x03\x02\x02\x02\u019E\u019F\x03\x02\x02\x02\u019F\u01A1\x03\x02" +
    "\x02\x02\u01A0\u019E\x03\x02\x02\x02\u01A1\u01A2\x07\x14\x02\x02\u01A2" +
    "\u01AC\x03\x02\x02\x02\u01A3\u01A7\x07\x13\x02\x02\u01A4\u01A6\x07\x1B" +
    "\x02\x02\u01A5\u01A4\x03\x02\x02\x02\u01A6\u01A9\x03\x02\x02\x02\u01A7" +
    "\u01A5\x03\x02\x02\x02\u01A7\u01A8\x03\x02\x02\x02\u01A8\u01AA\x03\x02" +
    "\x02\x02\u01A9\u01A7\x03\x02\x02\x02\u01AA\u01AC\x07\x14\x02\x02\u01AB" +
    "\u0180\x03\x02\x02\x02\u01AB\u01A3\x03\x02\x02\x02\u01AC-\x03\x02\x02" +
    "\x02\u01AD\u01B1\x07\x13\x02\x02\u01AE\u01B0\x07\x1B\x02\x02\u01AF\u01AE" +
    "\x03\x02\x02\x02\u01B0\u01B3\x03\x02\x02\x02\u01B1\u01AF\x03\x02\x02\x02" +
    "\u01B1\u01B2\x03\x02\x02\x02\u01B2\u01B4\x03\x02\x02\x02\u01B3\u01B1\x03" +
    "\x02\x02\x02\u01B4\u01C5\x050\x19\x02\u01B5\u01B7\x07\x1B\x02\x02\u01B6" +
    "\u01B5\x03\x02\x02\x02\u01B7\u01BA\x03\x02\x02\x02\u01B8\u01B6\x03\x02" +
    "\x02\x02\u01B8\u01B9\x03\x02\x02\x02\u01B9\u01BB\x03\x02\x02\x02\u01BA" +
    "\u01B8\x03\x02\x02\x02\u01BB\u01BF\x07\x12\x02\x02\u01BC\u01BE\x07\x1B" +
    "\x02\x02\u01BD\u01BC\x03\x02\x02\x02\u01BE\u01C1\x03\x02\x02\x02\u01BF" +
    "\u01BD\x03\x02\x02\x02\u01BF\u01C0\x03\x02\x02\x02\u01C0\u01C2\x03\x02" +
    "\x02\x02\u01C1\u01BF\x03\x02\x02\x02\u01C2\u01C4\x050\x19\x02\u01C3\u01B8" +
    "\x03\x02\x02\x02\u01C4\u01C7\x03\x02\x02\x02\u01C5\u01C3\x03\x02\x02\x02" +
    "\u01C5\u01C6\x03\x02\x02\x02\u01C6\u01CB\x03\x02\x02\x02\u01C7\u01C5\x03" +
    "\x02\x02\x02\u01C8\u01CA\x07\x1B\x02\x02\u01C9\u01C8\x03\x02\x02\x02\u01CA" +
    "\u01CD\x03\x02\x02\x02\u01CB\u01C9\x03\x02\x02\x02\u01CB\u01CC\x03\x02" +
    "\x02\x02\u01CC\u01CE\x03\x02\x02\x02\u01CD\u01CB\x03\x02\x02\x02\u01CE" +
    "\u01CF\x07\x14\x02\x02\u01CF\u01E0\x03\x02\x02\x02\u01D0\u01D4\x07\x13" +
    "\x02\x02\u01D1\u01D3\x07\x1B\x02\x02\u01D2\u01D1\x03\x02\x02\x02\u01D3" +
    "\u01D6\x03\x02\x02\x02\u01D4\u01D2\x03\x02\x02\x02\u01D4\u01D5\x03\x02" +
    "\x02\x02\u01D5\u01D7\x03\x02\x02\x02\u01D6\u01D4\x03\x02\x02\x02\u01D7" +
    "\u01DB\x07\x15\x02\x02\u01D8\u01DA\x07\x1B\x02\x02\u01D9\u01D8\x03\x02" +
    "\x02\x02\u01DA\u01DD\x03\x02\x02\x02\u01DB\u01D9\x03\x02\x02\x02\u01DB" +
    "\u01DC\x03\x02\x02\x02\u01DC\u01DE\x03\x02\x02\x02\u01DD\u01DB\x03\x02" +
    "\x02\x02\u01DE\u01E0\x07\x14\x02\x02\u01DF\u01AD\x03\x02\x02\x02\u01DF" +
    "\u01D0\x03\x02\x02\x02\u01E0/\x03\x02\x02\x02\u01E1\u01E5\x052\x1A\x02" +
    "\u01E2\u01E4\x07\x1B\x02\x02\u01E3\u01E2\x03\x02\x02\x02\u01E4\u01E7\x03" +
    "\x02\x02\x02\u01E5\u01E3\x03\x02\x02\x02\u01E5\u01E6\x03\x02\x02\x02\u01E6" +
    "\u01E8\x03\x02\x02\x02\u01E7\u01E5\x03\x02\x02\x02\u01E8\u01EC\x07\x15" +
    "\x02\x02\u01E9\u01EB\x07\x1B\x02\x02\u01EA\u01E9\x03\x02\x02\x02\u01EB" +
    "\u01EE\x03\x02\x02\x02\u01EC\u01EA\x03\x02\x02\x02\u01EC\u01ED\x03\x02" +
    "\x02\x02\u01ED\u01EF\x03\x02\x02\x02\u01EE\u01EC\x03\x02\x02\x02\u01EF" +
    "\u01F0\x05&\x14\x02\u01F01\x03\x02\x02\x02\u01F1\u01F2\x07\x16\x02\x02" +
    "\u01F2\u01F7\x05\x06\x04\x02\u01F3\u01F7\x07\x1A\x02\x02\u01F4\u01F7\x05" +
    "4\x1B\x02\u01F5\u01F7\x07\f\x02\x02\u01F6\u01F1\x03\x02\x02\x02\u01F6" +
    "\u01F3\x03\x02\x02\x02\u01F6\u01F4\x03\x02\x02\x02\u01F6\u01F5\x03\x02" +
    "\x02\x02\u01F73\x03\x02\x02\x02\u01F8\u01FA\t\x03\x02\x02\u01F9\u01F8" +
    "\x03\x02\x02\x02\u01F9\u01FA\x03\x02\x02\x02\u01FA\u01FB\x03\x02\x02\x02" +
    "\u01FB\u01FC\x07\x18\x02\x02\u01FC\u01FD\x07\x0F\x02\x02\u01FD\u0203\x07" +
    "\x18\x02\x02\u01FE\u0200\t\x03\x02\x02\u01FF\u01FE\x03\x02\x02\x02\u01FF" +
    "\u0200\x03\x02\x02\x02\u0200\u0201\x03\x02\x02\x02\u0201\u0203\x07\x18" +
    "\x02\x02\u0202\u01F9\x03\x02\x02\x02\u0202\u01FF\x03\x02\x02\x02\u0203" +
    "5\x03\x02\x02\x02\u0204\u0206\t\x05\x02\x02\u0205\u0204\x03\x02\x02\x02" +
    "\u0206\u0207\x03\x02\x02\x02\u0207\u0205\x03\x02\x02\x02\u0207\u0208\x03" +
    "\x02\x02\x02\u02087\x03\x02\x02\x02K;=CGLU\\bgimt|\x83\x8A\x90\x96\x9D" +
    "\xA3\xA9\xB2\xB9\xC0\xC6\xCF\xD3\xD9\xE0\xE5\xE9\xEF\xF6\xFD\u0106\u010D" +
    "\u0114\u011D\u0124\u012B\u0137\u013E\u0143\u014C\u0151\u0157\u015E\u0165" +
    "\u016B\u0171\u017A\u017E\u0184\u018B\u0192\u0198\u019E\u01A7\u01AB\u01B1" +
    "\u01B8\u01BF\u01C5\u01CB\u01D4\u01DB\u01DF\u01E5\u01EC\u01F6\u01F9\u01FF" +
    "\u0202\u0207";
export class Jql_multi_queryContext extends ParserRuleContext {
    AT(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.AT);
        }
        else {
            return this.getToken(JQLParser.AT, i);
        }
    }
    query(i) {
        if (i === undefined) {
            return this.getRuleContexts(QueryContext);
        }
        else {
            return this.getRuleContext(i, QueryContext);
        }
    }
    raw_text(i) {
        if (i === undefined) {
            return this.getRuleContexts(Raw_textContext);
        }
        else {
            return this.getRuleContext(i, Raw_textContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_jql_multi_query; }
    // @Override
    enterRule(listener) {
        if (listener.enterJql_multi_query) {
            listener.enterJql_multi_query(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitJql_multi_query) {
            listener.exitJql_multi_query(this);
        }
    }
}
export class Jql_queryContext extends ParserRuleContext {
    EOF() { return this.getToken(JQLParser.EOF, 0); }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    query() {
        return this.tryGetRuleContext(0, QueryContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_jql_query; }
    // @Override
    enterRule(listener) {
        if (listener.enterJql_query) {
            listener.enterJql_query(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitJql_query) {
            listener.exitJql_query(this);
        }
    }
}
export class QueryContext extends ParserRuleContext {
    query_part(i) {
        if (i === undefined) {
            return this.getRuleContexts(Query_partContext);
        }
        else {
            return this.getRuleContext(i, Query_partContext);
        }
    }
    DOT(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.DOT);
        }
        else {
            return this.getToken(JQLParser.DOT, i);
        }
    }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_query; }
    // @Override
    enterRule(listener) {
        if (listener.enterQuery) {
            listener.enterQuery(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitQuery) {
            listener.exitQuery(this);
        }
    }
}
export class Raw_textContext extends ParserRuleContext {
    AT(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.AT);
        }
        else {
            return this.getToken(JQLParser.AT, i);
        }
    }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_raw_text; }
    // @Override
    enterRule(listener) {
        if (listener.enterRaw_text) {
            listener.enterRaw_text(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitRaw_text) {
            listener.exitRaw_text(this);
        }
    }
}
export class Query_partContext extends ParserRuleContext {
    query_field() {
        return this.tryGetRuleContext(0, Query_fieldContext);
    }
    special() {
        return this.tryGetRuleContext(0, SpecialContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_query_part; }
    // @Override
    enterRule(listener) {
        if (listener.enterQuery_part) {
            listener.enterQuery_part(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitQuery_part) {
            listener.exitQuery_part(this);
        }
    }
}
export class Query_fieldContext extends ParserRuleContext {
    name() {
        return this.getRuleContext(0, NameContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_query_field; }
    // @Override
    enterRule(listener) {
        if (listener.enterQuery_field) {
            listener.enterQuery_field(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitQuery_field) {
            listener.exitQuery_field(this);
        }
    }
}
export class SpecialContext extends ParserRuleContext {
    DOLLAR() { return this.getToken(JQLParser.DOLLAR, 0); }
    special_name() {
        return this.getRuleContext(0, Special_nameContext);
    }
    arguments() {
        return this.tryGetRuleContext(0, ArgumentsContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_special; }
    // @Override
    enterRule(listener) {
        if (listener.enterSpecial) {
            listener.enterSpecial(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSpecial) {
            listener.exitSpecial(this);
        }
    }
}
export class Special_nameContext extends ParserRuleContext {
    name() {
        return this.getRuleContext(0, NameContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_special_name; }
    // @Override
    enterRule(listener) {
        if (listener.enterSpecial_name) {
            listener.enterSpecial_name(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSpecial_name) {
            listener.exitSpecial_name(this);
        }
    }
}
export class ArgumentsContext extends ParserRuleContext {
    LPAREN() { return this.getToken(JQLParser.LPAREN, 0); }
    argument(i) {
        if (i === undefined) {
            return this.getRuleContexts(ArgumentContext);
        }
        else {
            return this.getRuleContext(i, ArgumentContext);
        }
    }
    RPAREN() { return this.getToken(JQLParser.RPAREN, 0); }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.COMMA);
        }
        else {
            return this.getToken(JQLParser.COMMA, i);
        }
    }
    keyword_argument(i) {
        if (i === undefined) {
            return this.getRuleContexts(Keyword_argumentContext);
        }
        else {
            return this.getRuleContext(i, Keyword_argumentContext);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_arguments; }
    // @Override
    enterRule(listener) {
        if (listener.enterArguments) {
            listener.enterArguments(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArguments) {
            listener.exitArguments(this);
        }
    }
}
export class Keyword_argumentContext extends ParserRuleContext {
    name() {
        return this.getRuleContext(0, NameContext);
    }
    arith_expr() {
        return this.tryGetRuleContext(0, Arith_exprContext);
    }
    value() {
        return this.tryGetRuleContext(0, ValueContext);
    }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_keyword_argument; }
    // @Override
    enterRule(listener) {
        if (listener.enterKeyword_argument) {
            listener.enterKeyword_argument(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitKeyword_argument) {
            listener.exitKeyword_argument(this);
        }
    }
}
export class ArgumentContext extends ParserRuleContext {
    arith_expr() {
        return this.tryGetRuleContext(0, Arith_exprContext);
    }
    value() {
        return this.tryGetRuleContext(0, ValueContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_argument; }
    // @Override
    enterRule(listener) {
        if (listener.enterArgument) {
            listener.enterArgument(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArgument) {
            listener.exitArgument(this);
        }
    }
}
export class Arith_exprContext extends ParserRuleContext {
    factor_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Factor_exprContext);
        }
        else {
            return this.getRuleContext(i, Factor_exprContext);
        }
    }
    arith_operator(i) {
        if (i === undefined) {
            return this.getRuleContexts(Arith_operatorContext);
        }
        else {
            return this.getRuleContext(i, Arith_operatorContext);
        }
    }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_arith_expr; }
    // @Override
    enterRule(listener) {
        if (listener.enterArith_expr) {
            listener.enterArith_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArith_expr) {
            listener.exitArith_expr(this);
        }
    }
}
export class Arith_operatorContext extends ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_arith_operator; }
    // @Override
    enterRule(listener) {
        if (listener.enterArith_operator) {
            listener.enterArith_operator(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitArith_operator) {
            listener.exitArith_operator(this);
        }
    }
}
export class Factor_exprContext extends ParserRuleContext {
    power_expr(i) {
        if (i === undefined) {
            return this.getRuleContexts(Power_exprContext);
        }
        else {
            return this.getRuleContext(i, Power_exprContext);
        }
    }
    factor_operator(i) {
        if (i === undefined) {
            return this.getRuleContexts(Factor_operatorContext);
        }
        else {
            return this.getRuleContext(i, Factor_operatorContext);
        }
    }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_factor_expr; }
    // @Override
    enterRule(listener) {
        if (listener.enterFactor_expr) {
            listener.enterFactor_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFactor_expr) {
            listener.exitFactor_expr(this);
        }
    }
}
export class Factor_operatorContext extends ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_factor_operator; }
    // @Override
    enterRule(listener) {
        if (listener.enterFactor_operator) {
            listener.enterFactor_operator(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitFactor_operator) {
            listener.exitFactor_operator(this);
        }
    }
}
export class Power_exprContext extends ParserRuleContext {
    math_value(i) {
        if (i === undefined) {
            return this.getRuleContexts(Math_valueContext);
        }
        else {
            return this.getRuleContext(i, Math_valueContext);
        }
    }
    power_operator(i) {
        if (i === undefined) {
            return this.getRuleContexts(Power_operatorContext);
        }
        else {
            return this.getRuleContext(i, Power_operatorContext);
        }
    }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_power_expr; }
    // @Override
    enterRule(listener) {
        if (listener.enterPower_expr) {
            listener.enterPower_expr(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPower_expr) {
            listener.exitPower_expr(this);
        }
    }
}
export class Power_operatorContext extends ParserRuleContext {
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_power_operator; }
    // @Override
    enterRule(listener) {
        if (listener.enterPower_operator) {
            listener.enterPower_operator(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPower_operator) {
            listener.exitPower_operator(this);
        }
    }
}
export class Math_valueContext extends ParserRuleContext {
    AT() { return this.tryGetToken(JQLParser.AT, 0); }
    query() {
        return this.tryGetRuleContext(0, QueryContext);
    }
    number() {
        return this.tryGetRuleContext(0, NumberContext);
    }
    LPAREN() { return this.tryGetToken(JQLParser.LPAREN, 0); }
    arith_expr() {
        return this.tryGetRuleContext(0, Arith_exprContext);
    }
    RPAREN() { return this.tryGetToken(JQLParser.RPAREN, 0); }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_math_value; }
    // @Override
    enterRule(listener) {
        if (listener.enterMath_value) {
            listener.enterMath_value(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitMath_value) {
            listener.exitMath_value(this);
        }
    }
}
export class ValueContext extends ParserRuleContext {
    AT() { return this.tryGetToken(JQLParser.AT, 0); }
    query() {
        return this.tryGetRuleContext(0, QueryContext);
    }
    list_value() {
        return this.tryGetRuleContext(0, List_valueContext);
    }
    set_value() {
        return this.tryGetRuleContext(0, Set_valueContext);
    }
    object_value() {
        return this.tryGetRuleContext(0, Object_valueContext);
    }
    arith_expr() {
        return this.tryGetRuleContext(0, Arith_exprContext);
    }
    primitive_value() {
        return this.tryGetRuleContext(0, Primitive_valueContext);
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_value; }
    // @Override
    enterRule(listener) {
        if (listener.enterValue) {
            listener.enterValue(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitValue) {
            listener.exitValue(this);
        }
    }
}
export class Primitive_valueContext extends ParserRuleContext {
    number() {
        return this.tryGetRuleContext(0, NumberContext);
    }
    STRING() { return this.tryGetToken(JQLParser.STRING, 0); }
    PRIMITIVE() { return this.tryGetToken(JQLParser.PRIMITIVE, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_primitive_value; }
    // @Override
    enterRule(listener) {
        if (listener.enterPrimitive_value) {
            listener.enterPrimitive_value(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPrimitive_value) {
            listener.exitPrimitive_value(this);
        }
    }
}
export class List_valueContext extends ParserRuleContext {
    LBRACKET() { return this.getToken(JQLParser.LBRACKET, 0); }
    value(i) {
        if (i === undefined) {
            return this.getRuleContexts(ValueContext);
        }
        else {
            return this.getRuleContext(i, ValueContext);
        }
    }
    RBRACKET() { return this.getToken(JQLParser.RBRACKET, 0); }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.COMMA);
        }
        else {
            return this.getToken(JQLParser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_list_value; }
    // @Override
    enterRule(listener) {
        if (listener.enterList_value) {
            listener.enterList_value(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitList_value) {
            listener.exitList_value(this);
        }
    }
}
export class Set_valueContext extends ParserRuleContext {
    LBRACE() { return this.getToken(JQLParser.LBRACE, 0); }
    value(i) {
        if (i === undefined) {
            return this.getRuleContexts(ValueContext);
        }
        else {
            return this.getRuleContext(i, ValueContext);
        }
    }
    RBRACE() { return this.getToken(JQLParser.RBRACE, 0); }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.COMMA);
        }
        else {
            return this.getToken(JQLParser.COMMA, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_set_value; }
    // @Override
    enterRule(listener) {
        if (listener.enterSet_value) {
            listener.enterSet_value(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitSet_value) {
            listener.exitSet_value(this);
        }
    }
}
export class Object_valueContext extends ParserRuleContext {
    LBRACE() { return this.getToken(JQLParser.LBRACE, 0); }
    pair(i) {
        if (i === undefined) {
            return this.getRuleContexts(PairContext);
        }
        else {
            return this.getRuleContext(i, PairContext);
        }
    }
    RBRACE() { return this.getToken(JQLParser.RBRACE, 0); }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    COMMA(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.COMMA);
        }
        else {
            return this.getToken(JQLParser.COMMA, i);
        }
    }
    SEMI() { return this.tryGetToken(JQLParser.SEMI, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_object_value; }
    // @Override
    enterRule(listener) {
        if (listener.enterObject_value) {
            listener.enterObject_value(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitObject_value) {
            listener.exitObject_value(this);
        }
    }
}
export class PairContext extends ParserRuleContext {
    key() {
        return this.getRuleContext(0, KeyContext);
    }
    SEMI() { return this.getToken(JQLParser.SEMI, 0); }
    value() {
        return this.getRuleContext(0, ValueContext);
    }
    WS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.WS);
        }
        else {
            return this.getToken(JQLParser.WS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_pair; }
    // @Override
    enterRule(listener) {
        if (listener.enterPair) {
            listener.enterPair(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitPair) {
            listener.exitPair(this);
        }
    }
}
export class KeyContext extends ParserRuleContext {
    AT() { return this.tryGetToken(JQLParser.AT, 0); }
    query() {
        return this.tryGetRuleContext(0, QueryContext);
    }
    STRING() { return this.tryGetToken(JQLParser.STRING, 0); }
    number() {
        return this.tryGetRuleContext(0, NumberContext);
    }
    PRIMITIVE() { return this.tryGetToken(JQLParser.PRIMITIVE, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_key; }
    // @Override
    enterRule(listener) {
        if (listener.enterKey) {
            listener.enterKey(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitKey) {
            listener.exitKey(this);
        }
    }
}
export class NumberContext extends ParserRuleContext {
    DIGITS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.DIGITS);
        }
        else {
            return this.getToken(JQLParser.DIGITS, i);
        }
    }
    DOT() { return this.tryGetToken(JQLParser.DOT, 0); }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_number; }
    // @Override
    enterRule(listener) {
        if (listener.enterNumber) {
            listener.enterNumber(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitNumber) {
            listener.exitNumber(this);
        }
    }
}
export class NameContext extends ParserRuleContext {
    PRIMITIVE(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.PRIMITIVE);
        }
        else {
            return this.getToken(JQLParser.PRIMITIVE, i);
        }
    }
    DIGITS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.DIGITS);
        }
        else {
            return this.getToken(JQLParser.DIGITS, i);
        }
    }
    LETTERS(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.LETTERS);
        }
        else {
            return this.getToken(JQLParser.LETTERS, i);
        }
    }
    constructor(parent, invokingState) {
        super(parent, invokingState);
    }
    // @Override
    get ruleIndex() { return JQLParser.RULE_name; }
    // @Override
    enterRule(listener) {
        if (listener.enterName) {
            listener.enterName(this);
        }
    }
    // @Override
    exitRule(listener) {
        if (listener.exitName) {
            listener.exitName(this);
        }
    }
}
