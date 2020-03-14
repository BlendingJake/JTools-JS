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
                this.state = 39;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JQLParser.T__0) | (1 << JQLParser.T__1) | (1 << JQLParser.T__2) | (1 << JQLParser.PRIMITIVE) | (1 << JQLParser.LPAREN) | (1 << JQLParser.RPAREN) | (1 << JQLParser.DOT) | (1 << JQLParser.LBRACKET) | (1 << JQLParser.RBRACKET) | (1 << JQLParser.COMMA) | (1 << JQLParser.LBRACE) | (1 << JQLParser.RBRACE) | (1 << JQLParser.SEMI) | (1 << JQLParser.AT) | (1 << JQLParser.DOLLAR) | (1 << JQLParser.DIGITS) | (1 << JQLParser.LETTERS) | (1 << JQLParser.STRING) | (1 << JQLParser.SPACE) | (1 << JQLParser.WS) | (1 << JQLParser.IDENTIFIER) | (1 << JQLParser.LAST))) !== 0)) {
                    {
                        this.state = 37;
                        this._errHandler.sync(this);
                        switch (this.interpreter.adaptivePredict(this._input, 0, this._ctx)) {
                            case 1:
                                {
                                    this.state = 34;
                                    this.match(JQLParser.AT);
                                    this.state = 35;
                                    this.query();
                                }
                                break;
                            case 2:
                                {
                                    this.state = 36;
                                    this.raw_text();
                                }
                                break;
                        }
                    }
                    this.state = 41;
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
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 43;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JQLParser.T__0) | (1 << JQLParser.T__2) | (1 << JQLParser.PRIMITIVE) | (1 << JQLParser.LBRACKET) | (1 << JQLParser.RBRACKET) | (1 << JQLParser.LBRACE) | (1 << JQLParser.RBRACE) | (1 << JQLParser.SEMI) | (1 << JQLParser.DOLLAR) | (1 << JQLParser.DIGITS) | (1 << JQLParser.LETTERS) | (1 << JQLParser.IDENTIFIER))) !== 0)) {
                    {
                        this.state = 42;
                        this.query();
                    }
                }
                this.state = 45;
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
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 47;
                this.query_part();
                this.state = 52;
                this._errHandler.sync(this);
                _alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
                while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                    if (_alt === 1) {
                        {
                            {
                                this.state = 48;
                                this.match(JQLParser.DOT);
                                this.state = 49;
                                this.query_part();
                            }
                        }
                    }
                    this.state = 54;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
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
                this.state = 63;
                this._errHandler.sync(this);
                _alt = 1;
                do {
                    switch (_alt) {
                        case 1:
                            {
                                this.state = 63;
                                this._errHandler.sync(this);
                                switch (this.interpreter.adaptivePredict(this._input, 5, this._ctx)) {
                                    case 1:
                                        {
                                            this.state = 56;
                                            this._errHandler.sync(this);
                                            _alt = 1;
                                            do {
                                                switch (_alt) {
                                                    case 1:
                                                        {
                                                            {
                                                                this.state = 55;
                                                                this.match(JQLParser.WS);
                                                            }
                                                        }
                                                        break;
                                                    default:
                                                        throw new NoViableAltException(this);
                                                }
                                                this.state = 58;
                                                this._errHandler.sync(this);
                                                _alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
                                            } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
                                        }
                                        break;
                                    case 2:
                                        {
                                            {
                                                this.state = 60;
                                                this.match(JQLParser.AT);
                                                this.state = 61;
                                                this.match(JQLParser.AT);
                                            }
                                        }
                                        break;
                                    case 3:
                                        {
                                            this.state = 62;
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
                    this.state = 65;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
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
            this.state = 69;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case JQLParser.T__0:
                case JQLParser.T__2:
                case JQLParser.PRIMITIVE:
                case JQLParser.LBRACKET:
                case JQLParser.RBRACKET:
                case JQLParser.LBRACE:
                case JQLParser.RBRACE:
                case JQLParser.SEMI:
                case JQLParser.DIGITS:
                case JQLParser.LETTERS:
                case JQLParser.IDENTIFIER:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 67;
                        this.query_field();
                    }
                    break;
                case JQLParser.DOLLAR:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 68;
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
                this.state = 71;
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
                this.state = 73;
                this.match(JQLParser.DOLLAR);
                this.state = 74;
                this.special_name();
                this.state = 76;
                this._errHandler.sync(this);
                switch (this.interpreter.adaptivePredict(this._input, 8, this._ctx)) {
                    case 1:
                        {
                            this.state = 75;
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
                this.state = 78;
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
            this.state = 123;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 15, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 80;
                        this.match(JQLParser.LPAREN);
                        this.state = 84;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 81;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 86;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 87;
                        this.value();
                        this.state = 104;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 91;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.SPACE) {
                                            {
                                                {
                                                    this.state = 88;
                                                    this.match(JQLParser.SPACE);
                                                }
                                            }
                                            this.state = 93;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 94;
                                        this.match(JQLParser.COMMA);
                                        this.state = 98;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.SPACE) {
                                            {
                                                {
                                                    this.state = 95;
                                                    this.match(JQLParser.SPACE);
                                                }
                                            }
                                            this.state = 100;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 101;
                                        this.value();
                                    }
                                }
                            }
                            this.state = 106;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
                        }
                        this.state = 110;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 107;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 112;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 113;
                        this.match(JQLParser.RPAREN);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 115;
                        this.match(JQLParser.LPAREN);
                        this.state = 119;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 116;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 121;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 122;
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
    value() {
        let _localctx = new ValueContext(this._ctx, this.state);
        this.enterRule(_localctx, 18, JQLParser.RULE_value);
        try {
            this.state = 133;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 16, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 125;
                        this.match(JQLParser.AT);
                        this.state = 126;
                        this.query();
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 127;
                        this.list_value();
                    }
                    break;
                case 3:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 128;
                        this.set_value();
                    }
                    break;
                case 4:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 129;
                        this.object_value();
                    }
                    break;
                case 5:
                    this.enterOuterAlt(_localctx, 5);
                    {
                        this.state = 130;
                        this.number();
                    }
                    break;
                case 6:
                    this.enterOuterAlt(_localctx, 6);
                    {
                        this.state = 131;
                        this.match(JQLParser.STRING);
                    }
                    break;
                case 7:
                    this.enterOuterAlt(_localctx, 7);
                    {
                        this.state = 132;
                        this.match(JQLParser.PRIMITIVE);
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
    list_value() {
        let _localctx = new List_valueContext(this._ctx, this.state);
        this.enterRule(_localctx, 20, JQLParser.RULE_list_value);
        let _la;
        try {
            let _alt;
            this.state = 178;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 23, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 135;
                        this.match(JQLParser.LBRACKET);
                        this.state = 139;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 136;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 141;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 142;
                        this.value();
                        this.state = 159;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 146;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.SPACE) {
                                            {
                                                {
                                                    this.state = 143;
                                                    this.match(JQLParser.SPACE);
                                                }
                                            }
                                            this.state = 148;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 149;
                                        this.match(JQLParser.COMMA);
                                        this.state = 153;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.SPACE) {
                                            {
                                                {
                                                    this.state = 150;
                                                    this.match(JQLParser.SPACE);
                                                }
                                            }
                                            this.state = 155;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 156;
                                        this.value();
                                    }
                                }
                            }
                            this.state = 161;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
                        }
                        this.state = 165;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 162;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 167;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 168;
                        this.match(JQLParser.RBRACKET);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 170;
                        this.match(JQLParser.LBRACKET);
                        this.state = 174;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 171;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 176;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 177;
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
        this.enterRule(_localctx, 22, JQLParser.RULE_set_value);
        let _la;
        try {
            let _alt;
            this.state = 223;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 30, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 180;
                        this.match(JQLParser.LBRACE);
                        this.state = 184;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 181;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 186;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 187;
                        this.value();
                        this.state = 204;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 27, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 191;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.SPACE) {
                                            {
                                                {
                                                    this.state = 188;
                                                    this.match(JQLParser.SPACE);
                                                }
                                            }
                                            this.state = 193;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 194;
                                        this.match(JQLParser.COMMA);
                                        this.state = 198;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.SPACE) {
                                            {
                                                {
                                                    this.state = 195;
                                                    this.match(JQLParser.SPACE);
                                                }
                                            }
                                            this.state = 200;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 201;
                                        this.value();
                                    }
                                }
                            }
                            this.state = 206;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 27, this._ctx);
                        }
                        this.state = 210;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 207;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 212;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 213;
                        this.match(JQLParser.RBRACE);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 215;
                        this.match(JQLParser.LBRACE);
                        this.state = 219;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 216;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 221;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 222;
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
        this.enterRule(_localctx, 24, JQLParser.RULE_object_value);
        let _la;
        try {
            let _alt;
            this.state = 275;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 38, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 225;
                        this.match(JQLParser.LBRACE);
                        this.state = 229;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 226;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 231;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 232;
                        this.pair();
                        this.state = 249;
                        this._errHandler.sync(this);
                        _alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
                        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
                            if (_alt === 1) {
                                {
                                    {
                                        this.state = 236;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.SPACE) {
                                            {
                                                {
                                                    this.state = 233;
                                                    this.match(JQLParser.SPACE);
                                                }
                                            }
                                            this.state = 238;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 239;
                                        this.match(JQLParser.COMMA);
                                        this.state = 243;
                                        this._errHandler.sync(this);
                                        _la = this._input.LA(1);
                                        while (_la === JQLParser.SPACE) {
                                            {
                                                {
                                                    this.state = 240;
                                                    this.match(JQLParser.SPACE);
                                                }
                                            }
                                            this.state = 245;
                                            this._errHandler.sync(this);
                                            _la = this._input.LA(1);
                                        }
                                        this.state = 246;
                                        this.pair();
                                    }
                                }
                            }
                            this.state = 251;
                            this._errHandler.sync(this);
                            _alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
                        }
                        this.state = 255;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 252;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 257;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 258;
                        this.match(JQLParser.RBRACE);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 260;
                        this.match(JQLParser.LBRACE);
                        this.state = 264;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 261;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 266;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 267;
                        this.match(JQLParser.SEMI);
                        this.state = 271;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        while (_la === JQLParser.SPACE) {
                            {
                                {
                                    this.state = 268;
                                    this.match(JQLParser.SPACE);
                                }
                            }
                            this.state = 273;
                            this._errHandler.sync(this);
                            _la = this._input.LA(1);
                        }
                        this.state = 274;
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
        this.enterRule(_localctx, 26, JQLParser.RULE_pair);
        let _la;
        try {
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 277;
                this.key();
                this.state = 281;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === JQLParser.SPACE) {
                    {
                        {
                            this.state = 278;
                            this.match(JQLParser.SPACE);
                        }
                    }
                    this.state = 283;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 284;
                this.match(JQLParser.SEMI);
                this.state = 288;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while (_la === JQLParser.SPACE) {
                    {
                        {
                            this.state = 285;
                            this.match(JQLParser.SPACE);
                        }
                    }
                    this.state = 290;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
                this.state = 291;
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
        this.enterRule(_localctx, 28, JQLParser.RULE_key);
        try {
            this.state = 298;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
                case JQLParser.AT:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 293;
                        this.match(JQLParser.AT);
                        this.state = 294;
                        this.query();
                    }
                    break;
                case JQLParser.STRING:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 295;
                        this.match(JQLParser.STRING);
                    }
                    break;
                case JQLParser.T__0:
                case JQLParser.T__1:
                case JQLParser.DIGITS:
                    this.enterOuterAlt(_localctx, 3);
                    {
                        this.state = 296;
                        this.number();
                    }
                    break;
                case JQLParser.PRIMITIVE:
                    this.enterOuterAlt(_localctx, 4);
                    {
                        this.state = 297;
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
        this.enterRule(_localctx, 30, JQLParser.RULE_number);
        let _la;
        try {
            this.state = 310;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 44, this._ctx)) {
                case 1:
                    this.enterOuterAlt(_localctx, 1);
                    {
                        this.state = 301;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === JQLParser.T__0 || _la === JQLParser.T__1) {
                            {
                                this.state = 300;
                                _la = this._input.LA(1);
                                if (!(_la === JQLParser.T__0 || _la === JQLParser.T__1)) {
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
                        this.state = 303;
                        this.match(JQLParser.DIGITS);
                        this.state = 304;
                        this.match(JQLParser.DOT);
                        this.state = 305;
                        this.match(JQLParser.DIGITS);
                    }
                    break;
                case 2:
                    this.enterOuterAlt(_localctx, 2);
                    {
                        this.state = 307;
                        this._errHandler.sync(this);
                        _la = this._input.LA(1);
                        if (_la === JQLParser.T__0 || _la === JQLParser.T__1) {
                            {
                                this.state = 306;
                                _la = this._input.LA(1);
                                if (!(_la === JQLParser.T__0 || _la === JQLParser.T__1)) {
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
                        this.state = 309;
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
        this.enterRule(_localctx, 32, JQLParser.RULE_name);
        let _la;
        try {
            let _alt;
            this.enterOuterAlt(_localctx, 1);
            {
                this.state = 313;
                this._errHandler.sync(this);
                _alt = 1;
                do {
                    switch (_alt) {
                        case 1:
                            {
                                {
                                    this.state = 312;
                                    _la = this._input.LA(1);
                                    if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JQLParser.T__0) | (1 << JQLParser.T__2) | (1 << JQLParser.PRIMITIVE) | (1 << JQLParser.LBRACKET) | (1 << JQLParser.RBRACKET) | (1 << JQLParser.LBRACE) | (1 << JQLParser.RBRACE) | (1 << JQLParser.SEMI) | (1 << JQLParser.DIGITS) | (1 << JQLParser.LETTERS) | (1 << JQLParser.IDENTIFIER))) !== 0))) {
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
                    this.state = 315;
                    this._errHandler.sync(this);
                    _alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
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
JQLParser.PRIMITIVE = 4;
JQLParser.LPAREN = 5;
JQLParser.RPAREN = 6;
JQLParser.DOT = 7;
JQLParser.LBRACKET = 8;
JQLParser.RBRACKET = 9;
JQLParser.COMMA = 10;
JQLParser.LBRACE = 11;
JQLParser.RBRACE = 12;
JQLParser.SEMI = 13;
JQLParser.AT = 14;
JQLParser.DOLLAR = 15;
JQLParser.DIGITS = 16;
JQLParser.LETTERS = 17;
JQLParser.STRING = 18;
JQLParser.SPACE = 19;
JQLParser.WS = 20;
JQLParser.IDENTIFIER = 21;
JQLParser.LAST = 22;
JQLParser.RULE_jql_multi_query = 0;
JQLParser.RULE_jql_query = 1;
JQLParser.RULE_query = 2;
JQLParser.RULE_raw_text = 3;
JQLParser.RULE_query_part = 4;
JQLParser.RULE_query_field = 5;
JQLParser.RULE_special = 6;
JQLParser.RULE_special_name = 7;
JQLParser.RULE_arguments = 8;
JQLParser.RULE_value = 9;
JQLParser.RULE_list_value = 10;
JQLParser.RULE_set_value = 11;
JQLParser.RULE_object_value = 12;
JQLParser.RULE_pair = 13;
JQLParser.RULE_key = 14;
JQLParser.RULE_number = 15;
JQLParser.RULE_name = 16;
// tslint:disable:no-trailing-whitespace
JQLParser.ruleNames = [
    "jql_multi_query", "jql_query", "query", "raw_text", "query_part", "query_field",
    "special", "special_name", "arguments", "value", "list_value", "set_value",
    "object_value", "pair", "key", "number", "name",
];
JQLParser._LITERAL_NAMES = [
    undefined, "'-'", "'+'", "'_'", undefined, "'('", "')'", "'.'", "'['",
    "']'", "','", "'{'", "'}'", "':'", "'@'", "'$'",
];
JQLParser._SYMBOLIC_NAMES = [
    undefined, undefined, undefined, undefined, "PRIMITIVE", "LPAREN", "RPAREN",
    "DOT", "LBRACKET", "RBRACKET", "COMMA", "LBRACE", "RBRACE", "SEMI", "AT",
    "DOLLAR", "DIGITS", "LETTERS", "STRING", "SPACE", "WS", "IDENTIFIER",
    "LAST",
];
JQLParser.VOCABULARY = new VocabularyImpl(JQLParser._LITERAL_NAMES, JQLParser._SYMBOLIC_NAMES, []);
JQLParser._serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x18\u0140\x04" +
    "\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
    "\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
    "\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
    "\x03\x02\x03\x02\x03\x02\x07\x02(\n\x02\f\x02\x0E\x02+\v\x02\x03\x03\x05" +
    "\x03.\n\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x07\x045\n\x04\f\x04" +
    "\x0E\x048\v\x04\x03\x05\x06\x05;\n\x05\r\x05\x0E\x05<\x03\x05\x03\x05" +
    "\x03\x05\x06\x05B\n\x05\r\x05\x0E\x05C\x03\x06\x03\x06\x05\x06H\n\x06" +
    "\x03\x07\x03\x07\x03\b\x03\b\x03\b\x05\bO\n\b\x03\t\x03\t\x03\n\x03\n" +
    "\x07\nU\n\n\f\n\x0E\nX\v\n\x03\n\x03\n\x07\n\\\n\n\f\n\x0E\n_\v\n\x03" +
    "\n\x03\n\x07\nc\n\n\f\n\x0E\nf\v\n\x03\n\x07\ni\n\n\f\n\x0E\nl\v\n\x03" +
    "\n\x07\no\n\n\f\n\x0E\nr\v\n\x03\n\x03\n\x03\n\x03\n\x07\nx\n\n\f\n\x0E" +
    "\n{\v\n\x03\n\x05\n~\n\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03" +
    "\v\x05\v\x88\n\v\x03\f\x03\f\x07\f\x8C\n\f\f\f\x0E\f\x8F\v\f\x03\f\x03" +
    "\f\x07\f\x93\n\f\f\f\x0E\f\x96\v\f\x03\f\x03\f\x07\f\x9A\n\f\f\f\x0E\f" +
    "\x9D\v\f\x03\f\x07\f\xA0\n\f\f\f\x0E\f\xA3\v\f\x03\f\x07\f\xA6\n\f\f\f" +
    "\x0E\f\xA9\v\f\x03\f\x03\f\x03\f\x03\f\x07\f\xAF\n\f\f\f\x0E\f\xB2\v\f" +
    "\x03\f\x05\f\xB5\n\f\x03\r\x03\r\x07\r\xB9\n\r\f\r\x0E\r\xBC\v\r\x03\r" +
    "\x03\r\x07\r\xC0\n\r\f\r\x0E\r\xC3\v\r\x03\r\x03\r\x07\r\xC7\n\r\f\r\x0E" +
    "\r\xCA\v\r\x03\r\x07\r\xCD\n\r\f\r\x0E\r\xD0\v\r\x03\r\x07\r\xD3\n\r\f" +
    "\r\x0E\r\xD6\v\r\x03\r\x03\r\x03\r\x03\r\x07\r\xDC\n\r\f\r\x0E\r\xDF\v" +
    "\r\x03\r\x05\r\xE2\n\r\x03\x0E\x03\x0E\x07\x0E\xE6\n\x0E\f\x0E\x0E\x0E" +
    "\xE9\v\x0E\x03\x0E\x03\x0E\x07\x0E\xED\n\x0E\f\x0E\x0E\x0E\xF0\v\x0E\x03" +
    "\x0E\x03\x0E\x07\x0E\xF4\n\x0E\f\x0E\x0E\x0E\xF7\v\x0E\x03\x0E\x07\x0E" +
    "\xFA\n\x0E\f\x0E\x0E\x0E\xFD\v\x0E\x03\x0E\x07\x0E\u0100\n\x0E\f\x0E\x0E" +
    "\x0E\u0103\v\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x07\x0E\u0109\n\x0E\f" +
    "\x0E\x0E\x0E\u010C\v\x0E\x03\x0E\x03\x0E\x07\x0E\u0110\n\x0E\f\x0E\x0E" +
    "\x0E\u0113\v\x0E\x03\x0E\x05\x0E\u0116\n\x0E\x03\x0F\x03\x0F\x07\x0F\u011A" +
    "\n\x0F\f\x0F\x0E\x0F\u011D\v\x0F\x03\x0F\x03\x0F\x07\x0F\u0121\n\x0F\f" +
    "\x0F\x0E\x0F\u0124\v\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10" +
    "\x03\x10\x05\x10\u012D\n\x10\x03\x11\x05\x11\u0130\n\x11\x03\x11\x03\x11" +
    "\x03\x11\x03\x11\x05\x11\u0136\n\x11\x03\x11\x05\x11\u0139\n\x11\x03\x12" +
    "\x06\x12\u013C\n\x12\r\x12\x0E\x12\u013D\x03\x12\x02\x02\x02\x13\x02\x02" +
    "\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16" +
    "\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02\x02\x05\x03\x02\x10\x10" +
    "\x03\x02\x03\x04\b\x02\x03\x03\x05\x06\n\v\r\x0F\x12\x13\x17\x17\x02\u0164" +
    "\x02)\x03\x02\x02\x02\x04-\x03\x02\x02\x02\x061\x03\x02\x02\x02\bA\x03" +
    "\x02\x02\x02\nG\x03\x02\x02\x02\fI\x03\x02\x02\x02\x0EK\x03\x02\x02\x02" +
    "\x10P\x03\x02\x02\x02\x12}\x03\x02\x02\x02\x14\x87\x03\x02\x02\x02\x16" +
    "\xB4\x03\x02\x02\x02\x18\xE1\x03\x02\x02\x02\x1A\u0115\x03\x02\x02\x02" +
    "\x1C\u0117\x03\x02\x02\x02\x1E\u012C\x03\x02\x02\x02 \u0138\x03\x02\x02" +
    "\x02\"\u013B\x03\x02\x02\x02$%\x07\x10\x02\x02%(\x05\x06\x04\x02&(\x05" +
    "\b\x05\x02\'$\x03\x02\x02\x02\'&\x03\x02\x02\x02(+\x03\x02\x02\x02)\'" +
    "\x03\x02\x02\x02)*\x03\x02\x02\x02*\x03\x03\x02\x02\x02+)\x03\x02\x02" +
    "\x02,.\x05\x06\x04\x02-,\x03\x02\x02\x02-.\x03\x02\x02\x02./\x03\x02\x02" +
    "\x02/0\x07\x02\x02\x030\x05\x03\x02\x02\x0216\x05\n\x06\x0223\x07\t\x02" +
    "\x0235\x05\n\x06\x0242\x03\x02\x02\x0258\x03\x02\x02\x0264\x03\x02\x02" +
    "\x0267\x03\x02\x02\x027\x07\x03\x02\x02\x0286\x03\x02\x02\x029;\x07\x16" +
    "\x02\x02:9\x03\x02\x02\x02;<\x03\x02\x02\x02<:\x03\x02\x02\x02<=\x03\x02" +
    "\x02\x02=B\x03\x02\x02\x02>?\x07\x10\x02\x02?B\x07\x10\x02\x02@B\n\x02" +
    "\x02\x02A:\x03\x02\x02\x02A>\x03\x02\x02\x02A@\x03\x02\x02\x02BC\x03\x02" +
    "\x02\x02CA\x03\x02\x02\x02CD\x03\x02\x02\x02D\t\x03\x02\x02\x02EH\x05" +
    "\f\x07\x02FH\x05\x0E\b\x02GE\x03\x02\x02\x02GF\x03\x02\x02\x02H\v\x03" +
    "\x02\x02\x02IJ\x05\"\x12\x02J\r\x03\x02\x02\x02KL\x07\x11\x02\x02LN\x05" +
    "\x10\t\x02MO\x05\x12\n\x02NM\x03\x02\x02\x02NO\x03\x02\x02\x02O\x0F\x03" +
    "\x02\x02\x02PQ\x05\"\x12\x02Q\x11\x03\x02\x02\x02RV\x07\x07\x02\x02SU" +
    "\x07\x15\x02\x02TS\x03\x02\x02\x02UX\x03\x02\x02\x02VT\x03\x02\x02\x02" +
    "VW\x03\x02\x02\x02WY\x03\x02\x02\x02XV\x03\x02\x02\x02Yj\x05\x14\v\x02" +
    "Z\\\x07\x15\x02\x02[Z\x03\x02\x02\x02\\_\x03\x02\x02\x02][\x03\x02\x02" +
    "\x02]^\x03\x02\x02\x02^`\x03\x02\x02\x02_]\x03\x02\x02\x02`d\x07\f\x02" +
    "\x02ac\x07\x15\x02\x02ba\x03\x02\x02\x02cf\x03\x02\x02\x02db\x03\x02\x02" +
    "\x02de\x03\x02\x02\x02eg\x03\x02\x02\x02fd\x03\x02\x02\x02gi\x05\x14\v" +
    "\x02h]\x03\x02\x02\x02il\x03\x02\x02\x02jh\x03\x02\x02\x02jk\x03\x02\x02" +
    "\x02kp\x03\x02\x02\x02lj\x03\x02\x02\x02mo\x07\x15\x02\x02nm\x03\x02\x02" +
    "\x02or\x03\x02\x02\x02pn\x03\x02\x02\x02pq\x03\x02\x02\x02qs\x03\x02\x02" +
    "\x02rp\x03\x02\x02\x02st\x07\b\x02\x02t~\x03\x02\x02\x02uy\x07\x07\x02" +
    "\x02vx\x07\x15\x02\x02wv\x03\x02\x02\x02x{\x03\x02\x02\x02yw\x03\x02\x02" +
    "\x02yz\x03\x02\x02\x02z|\x03\x02\x02\x02{y\x03\x02\x02\x02|~\x07\b\x02" +
    "\x02}R\x03\x02\x02\x02}u\x03\x02\x02\x02~\x13\x03\x02\x02\x02\x7F\x80" +
    "\x07\x10\x02\x02\x80\x88\x05\x06\x04\x02\x81\x88\x05\x16\f\x02\x82\x88" +
    "\x05\x18\r\x02\x83\x88\x05\x1A\x0E\x02\x84\x88\x05 \x11\x02\x85\x88\x07" +
    "\x14\x02\x02\x86\x88\x07\x06\x02\x02\x87\x7F\x03\x02\x02\x02\x87\x81\x03" +
    "\x02\x02\x02\x87\x82\x03\x02\x02\x02\x87\x83\x03\x02\x02\x02\x87\x84\x03" +
    "\x02\x02\x02\x87\x85\x03\x02\x02\x02\x87\x86\x03\x02\x02\x02\x88\x15\x03" +
    "\x02\x02\x02\x89\x8D\x07\n\x02\x02\x8A\x8C\x07\x15\x02\x02\x8B\x8A\x03" +
    "\x02\x02\x02\x8C\x8F\x03\x02\x02\x02\x8D\x8B\x03\x02\x02\x02\x8D\x8E\x03" +
    "\x02\x02\x02\x8E\x90\x03\x02\x02\x02\x8F\x8D\x03\x02\x02\x02\x90\xA1\x05" +
    "\x14\v\x02\x91\x93\x07\x15\x02\x02\x92\x91\x03\x02\x02\x02\x93\x96\x03" +
    "\x02\x02\x02\x94\x92\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95\x97\x03" +
    "\x02\x02\x02\x96\x94\x03\x02\x02\x02\x97\x9B\x07\f\x02\x02\x98\x9A\x07" +
    "\x15\x02\x02\x99\x98\x03\x02\x02\x02\x9A\x9D\x03\x02\x02\x02\x9B\x99\x03" +
    "\x02\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\x9E\x03\x02\x02\x02\x9D\x9B\x03" +
    "\x02\x02\x02\x9E\xA0\x05\x14\v\x02\x9F\x94\x03\x02\x02\x02\xA0\xA3\x03" +
    "\x02\x02\x02\xA1\x9F\x03\x02\x02\x02\xA1\xA2\x03\x02\x02\x02\xA2\xA7\x03" +
    "\x02\x02\x02\xA3\xA1\x03\x02\x02\x02\xA4\xA6\x07\x15\x02\x02\xA5\xA4\x03" +
    "\x02\x02\x02\xA6\xA9\x03\x02\x02\x02\xA7\xA5\x03\x02\x02\x02\xA7\xA8\x03" +
    "\x02\x02\x02\xA8\xAA\x03\x02\x02\x02\xA9\xA7\x03\x02\x02\x02\xAA\xAB\x07" +
    "\v\x02\x02\xAB\xB5\x03\x02\x02\x02\xAC\xB0\x07\n\x02\x02\xAD\xAF\x07\x15" +
    "\x02\x02\xAE\xAD\x03\x02\x02\x02\xAF\xB2\x03\x02\x02\x02\xB0\xAE\x03\x02" +
    "\x02\x02\xB0\xB1\x03\x02\x02\x02\xB1\xB3\x03\x02\x02\x02\xB2\xB0\x03\x02" +
    "\x02\x02\xB3\xB5\x07\v\x02\x02\xB4\x89\x03\x02\x02\x02\xB4\xAC\x03\x02" +
    "\x02\x02\xB5\x17\x03\x02\x02\x02\xB6\xBA\x07\r\x02\x02\xB7\xB9\x07\x15" +
    "\x02\x02\xB8\xB7\x03\x02\x02\x02\xB9\xBC\x03\x02\x02\x02\xBA\xB8\x03\x02" +
    "\x02\x02\xBA\xBB\x03\x02\x02\x02\xBB\xBD\x03\x02\x02\x02\xBC\xBA\x03\x02" +
    "\x02\x02\xBD\xCE\x05\x14\v\x02\xBE\xC0\x07\x15\x02\x02\xBF\xBE\x03\x02" +
    "\x02\x02\xC0\xC3\x03\x02\x02\x02\xC1\xBF\x03\x02\x02\x02\xC1\xC2\x03\x02" +
    "\x02\x02\xC2\xC4\x03\x02\x02\x02\xC3\xC1\x03\x02\x02\x02\xC4\xC8\x07\f" +
    "\x02\x02\xC5\xC7\x07\x15\x02\x02\xC6\xC5\x03\x02\x02\x02\xC7\xCA\x03\x02" +
    "\x02\x02\xC8\xC6\x03\x02\x02\x02\xC8\xC9\x03\x02\x02\x02\xC9\xCB\x03\x02" +
    "\x02\x02\xCA\xC8\x03\x02\x02\x02\xCB\xCD\x05\x14\v\x02\xCC\xC1\x03\x02" +
    "\x02\x02\xCD\xD0\x03\x02\x02\x02\xCE\xCC\x03\x02\x02\x02\xCE\xCF\x03\x02" +
    "\x02\x02\xCF\xD4\x03\x02\x02\x02\xD0\xCE\x03\x02\x02\x02\xD1\xD3\x07\x15" +
    "\x02\x02\xD2\xD1\x03\x02\x02\x02\xD3\xD6\x03\x02\x02\x02\xD4\xD2\x03\x02" +
    "\x02\x02\xD4\xD5\x03\x02\x02\x02\xD5\xD7\x03\x02\x02\x02\xD6\xD4\x03\x02" +
    "\x02\x02\xD7\xD8\x07\x0E\x02\x02\xD8\xE2\x03\x02\x02\x02\xD9\xDD\x07\r" +
    "\x02\x02\xDA\xDC\x07\x15\x02\x02\xDB\xDA\x03\x02\x02\x02\xDC\xDF\x03\x02" +
    "\x02\x02\xDD\xDB\x03\x02\x02\x02\xDD\xDE\x03\x02\x02\x02\xDE\xE0\x03\x02" +
    "\x02\x02\xDF\xDD\x03\x02\x02\x02\xE0\xE2\x07\x0E\x02\x02\xE1\xB6\x03\x02" +
    "\x02\x02\xE1\xD9\x03\x02\x02\x02\xE2\x19\x03\x02\x02\x02\xE3\xE7\x07\r" +
    "\x02\x02\xE4\xE6\x07\x15\x02\x02\xE5\xE4\x03\x02\x02\x02\xE6\xE9\x03\x02" +
    "\x02\x02\xE7\xE5\x03\x02\x02\x02\xE7\xE8\x03\x02\x02\x02\xE8\xEA\x03\x02" +
    "\x02\x02\xE9\xE7\x03\x02\x02\x02\xEA\xFB\x05\x1C\x0F\x02\xEB\xED\x07\x15" +
    "\x02\x02\xEC\xEB\x03\x02\x02\x02\xED\xF0\x03\x02\x02\x02\xEE\xEC\x03\x02" +
    "\x02\x02\xEE\xEF\x03\x02\x02\x02\xEF\xF1\x03\x02\x02\x02\xF0\xEE\x03\x02" +
    "\x02\x02\xF1\xF5\x07\f\x02\x02\xF2\xF4\x07\x15\x02\x02\xF3\xF2\x03\x02" +
    "\x02\x02\xF4\xF7\x03\x02\x02\x02\xF5\xF3\x03\x02\x02\x02\xF5\xF6\x03\x02" +
    "\x02\x02\xF6\xF8\x03\x02\x02\x02\xF7\xF5\x03\x02\x02\x02\xF8\xFA\x05\x1C" +
    "\x0F\x02\xF9\xEE\x03\x02\x02\x02\xFA\xFD\x03\x02\x02\x02\xFB\xF9\x03\x02" +
    "\x02\x02\xFB\xFC\x03\x02\x02\x02\xFC\u0101\x03\x02\x02\x02\xFD\xFB\x03" +
    "\x02\x02\x02\xFE\u0100\x07\x15\x02\x02\xFF\xFE\x03\x02\x02\x02\u0100\u0103" +
    "\x03\x02\x02\x02\u0101\xFF\x03\x02\x02\x02\u0101\u0102\x03\x02\x02\x02" +
    "\u0102\u0104\x03\x02\x02\x02\u0103\u0101\x03\x02\x02\x02\u0104\u0105\x07" +
    "\x0E\x02\x02\u0105\u0116\x03\x02\x02\x02\u0106\u010A\x07\r\x02\x02\u0107" +
    "\u0109\x07\x15\x02\x02\u0108\u0107\x03\x02\x02\x02\u0109\u010C\x03\x02" +
    "\x02\x02\u010A\u0108\x03\x02\x02\x02\u010A\u010B\x03\x02\x02\x02\u010B" +
    "\u010D\x03\x02\x02\x02\u010C\u010A\x03\x02\x02\x02\u010D\u0111\x07\x0F" +
    "\x02\x02\u010E\u0110\x07\x15\x02\x02\u010F\u010E\x03\x02\x02\x02\u0110" +
    "\u0113\x03\x02\x02\x02\u0111\u010F\x03\x02\x02\x02\u0111\u0112\x03\x02" +
    "\x02\x02\u0112\u0114\x03\x02\x02\x02\u0113\u0111\x03\x02\x02\x02\u0114" +
    "\u0116\x07\x0E\x02\x02\u0115\xE3\x03\x02\x02\x02\u0115\u0106\x03\x02\x02" +
    "\x02\u0116\x1B\x03\x02\x02\x02\u0117\u011B\x05\x1E\x10\x02\u0118\u011A" +
    "\x07\x15\x02\x02\u0119\u0118\x03\x02\x02\x02\u011A\u011D\x03\x02\x02\x02" +
    "\u011B\u0119\x03\x02\x02\x02\u011B\u011C\x03\x02\x02\x02\u011C\u011E\x03" +
    "\x02\x02\x02\u011D\u011B\x03\x02\x02\x02\u011E\u0122\x07\x0F\x02\x02\u011F" +
    "\u0121\x07\x15\x02\x02\u0120\u011F\x03\x02\x02\x02\u0121\u0124\x03\x02" +
    "\x02\x02\u0122\u0120\x03\x02\x02\x02\u0122\u0123\x03\x02\x02\x02\u0123" +
    "\u0125\x03\x02\x02\x02\u0124\u0122\x03\x02\x02\x02\u0125\u0126\x05\x14" +
    "\v\x02\u0126\x1D\x03\x02\x02\x02\u0127\u0128\x07\x10\x02\x02\u0128\u012D" +
    "\x05\x06\x04\x02\u0129\u012D\x07\x14\x02\x02\u012A\u012D\x05 \x11\x02" +
    "\u012B\u012D\x07\x06\x02\x02\u012C\u0127\x03\x02\x02\x02\u012C\u0129\x03" +
    "\x02\x02\x02\u012C\u012A\x03\x02\x02\x02\u012C\u012B\x03\x02\x02\x02\u012D" +
    "\x1F\x03\x02\x02\x02\u012E\u0130\t\x03\x02\x02\u012F\u012E\x03\x02\x02" +
    "\x02\u012F\u0130\x03\x02\x02\x02\u0130\u0131\x03\x02\x02\x02\u0131\u0132" +
    "\x07\x12\x02\x02\u0132\u0133\x07\t\x02\x02\u0133\u0139\x07\x12\x02\x02" +
    "\u0134\u0136\t\x03\x02\x02\u0135\u0134\x03\x02\x02\x02\u0135\u0136\x03" +
    "\x02\x02\x02\u0136\u0137\x03\x02\x02\x02\u0137\u0139\x07\x12\x02\x02\u0138" +
    "\u012F\x03\x02\x02\x02\u0138\u0135\x03\x02\x02\x02\u0139!\x03\x02\x02" +
    "\x02\u013A\u013C\t\x04\x02\x02\u013B\u013A\x03\x02\x02\x02\u013C\u013D" +
    "\x03\x02\x02\x02\u013D\u013B\x03\x02\x02\x02\u013D\u013E\x03\x02\x02\x02" +
    "\u013E#\x03\x02\x02\x020\')-6<ACGNV]djpy}\x87\x8D\x94\x9B\xA1\xA7\xB0" +
    "\xB4\xBA\xC1\xC8\xCE\xD4\xDD\xE1\xE7\xEE\xF5\xFB\u0101\u010A\u0111\u0115" +
    "\u011B\u0122\u012C\u012F\u0135\u0138\u013D";
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
    value(i) {
        if (i === undefined) {
            return this.getRuleContexts(ValueContext);
        }
        else {
            return this.getRuleContext(i, ValueContext);
        }
    }
    RPAREN() { return this.getToken(JQLParser.RPAREN, 0); }
    SPACE(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.SPACE);
        }
        else {
            return this.getToken(JQLParser.SPACE, i);
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
    number() {
        return this.tryGetRuleContext(0, NumberContext);
    }
    STRING() { return this.tryGetToken(JQLParser.STRING, 0); }
    PRIMITIVE() { return this.tryGetToken(JQLParser.PRIMITIVE, 0); }
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
    SPACE(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.SPACE);
        }
        else {
            return this.getToken(JQLParser.SPACE, i);
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
    SPACE(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.SPACE);
        }
        else {
            return this.getToken(JQLParser.SPACE, i);
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
    SPACE(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.SPACE);
        }
        else {
            return this.getToken(JQLParser.SPACE, i);
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
    SPACE(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.SPACE);
        }
        else {
            return this.getToken(JQLParser.SPACE, i);
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
    LBRACKET(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.LBRACKET);
        }
        else {
            return this.getToken(JQLParser.LBRACKET, i);
        }
    }
    RBRACKET(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.RBRACKET);
        }
        else {
            return this.getToken(JQLParser.RBRACKET, i);
        }
    }
    LBRACE(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.LBRACE);
        }
        else {
            return this.getToken(JQLParser.LBRACE, i);
        }
    }
    RBRACE(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.RBRACE);
        }
        else {
            return this.getToken(JQLParser.RBRACE, i);
        }
    }
    SEMI(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.SEMI);
        }
        else {
            return this.getToken(JQLParser.SEMI, i);
        }
    }
    IDENTIFIER(i) {
        if (i === undefined) {
            return this.getTokens(JQLParser.IDENTIFIER);
        }
        else {
            return this.getToken(JQLParser.IDENTIFIER, i);
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
