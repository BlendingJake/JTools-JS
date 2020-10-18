import { JQLQuery, JQLField, JQLSpecial, JQLList, JQLValue, JQLSet, JQLDict, JQLMultiQuery, JQLRawInput, JQLArgument, JQLKeywordArgument, JQLExpression } from "./jql";
import { JQLParser } from "./JQLParser";
import { DefaultErrorStrategy, CommonTokenStream, ANTLRInputStream, ConsoleErrorListener } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { InputMismatchException } from "antlr4ts";
import { JQLLexer } from "./JQLLexer";
class JQLQueryListener {
    constructor() {
        this.stack = [];
        this.root = null;
    }
    enterQuery(ctx) {
        const q = new JQLQuery();
        if (this.stack.length !== 0) {
            this.stack[this.stack.length - 1].add(q);
        }
        else {
            this.root = q;
        }
        this.stack.push(q);
    }
    exitQuery(ctx) {
        this.stack.pop();
    }
    exitQuery_field(ctx) {
        const f = new JQLField();
        f.set_field(ctx.text);
        this.stack[this.stack.length - 1].add(f);
    }
    enterSpecial(ctx) {
        const s = new JQLSpecial();
        this.stack[this.stack.length - 1].add(s);
        this.stack.push(s);
    }
    exitSpecial(ctx) {
        this.stack.pop();
    }
    exitSpecial_name(ctx) {
        this.stack[this.stack.length - 1].set_special(ctx.text);
    }
    enterArgument(ctx) {
        const arg = new JQLArgument();
        this.stack[this.stack.length - 1].add(arg);
        this.stack.push(arg);
    }
    exitArgument(ctx) {
        this.stack.pop();
    }
    enterKeyword_argument(ctx) {
        const arg = new JQLKeywordArgument();
        this.stack[this.stack.length - 1].add(arg);
        this.stack.push(arg);
    }
    exitKeyword_argument(ctx) {
        this.stack.pop();
    }
    enterName(ctx) {
        if (this.stack[this.stack.length - 1] instanceof JQLKeywordArgument) {
            this.stack[this.stack.length - 1].set_name(ctx.text);
        }
    }
    // EXPRESSIONS
    enterArith_expr() {
        this.enter_expr();
    }
    exitArith_expr() {
        this.stack.pop();
    }
    enterFactor_expr() {
        this.enter_expr();
    }
    exitFactor_expr() {
        this.stack.pop();
    }
    enterPower_expr() {
        this.enter_expr();
    }
    exitPower_expr() {
        this.stack.pop();
    }
    // EXPRESSION OPERATORS
    enterArith_operator(ctx) {
        this.stack[this.stack.length - 1].set_operator(ctx.text);
    }
    enterFactor_operator(ctx) {
        this.stack[this.stack.length - 1].set_operator(ctx.text);
    }
    enterPower_operator(ctx) {
        this.stack[this.stack.length - 1].set_operator(ctx.text);
    }
    enterNumber(ctx) {
        if (this.stack[this.stack.length - 1] instanceof JQLExpression) {
            const v = new JQLValue();
            v.value = JQLQueryListener.parse_primitive(ctx.text);
            this.stack[this.stack.length - 1].add(v);
        }
    }
    enterList_value(ctx) {
        this.enter_value(JQLList);
    }
    exitList_value() {
        this.stack.pop();
    }
    enterSet_value(ctx) {
        this.enter_value(JQLSet);
    }
    exitSet_value() {
        this.stack.pop();
    }
    enterObject_value(ctx) {
        this.enter_value(JQLDict);
    }
    exitObject_value() {
        this.stack.pop();
    }
    exitKey(ctx) {
        const txt = ctx.text;
        if (txt[0] !== '@') {
            const v = new JQLValue();
            v.value = JQLQueryListener.parse_primitive(txt);
            this.stack[this.stack.length - 1].add(v);
        }
    }
    exitPrimitive_value(ctx) {
        const text = ctx.text;
        const val = new JQLValue();
        val.value = JQLQueryListener.parse_primitive(text);
        this.stack[this.stack.length - 1].add(val);
    }
    static parse_primitive(text) {
        let value;
        if (text[0] === '"' || text[0] === "'") {
            value = text.substring(1, text.length - 1);
        }
        else if (text === "true") {
            value = true;
        }
        else if (text === "false") {
            value = false;
        }
        else if (text === "null") {
            value = null;
        }
        else if (text.includes(".")) {
            value = parseFloat(text);
        }
        else {
            value = parseInt(text);
        }
        return value;
    }
    enter_value(cls) {
        const v = new cls();
        this.stack[this.stack.length - 1].add(v);
        this.stack.push(v);
    }
    enter_expr() {
        const expr = new JQLExpression();
        this.stack[this.stack.length - 1].add(expr);
        this.stack.push(expr);
    }
    enterJql_multi_query(ctx) {
        return;
    }
    exitJql_multi_query(ctx) {
        return;
    }
    exitRaw_text(ctx) {
        return;
    }
}
class JQLMultiQueryListerner extends JQLQueryListener {
    constructor() {
        super();
    }
    enterJql_multi_query(ctx) {
        this.root = new JQLMultiQuery();
        this.stack.push(this.root);
    }
    exitJql_multi_query(ctx) {
        this.stack.pop();
    }
    exitRaw_text(ctx) {
        const raw = new JQLRawInput();
        raw.set_text(ctx.text);
        this.stack[this.stack.length - 1].add(raw);
    }
}
export class JQLParseError extends Error {
    constructor(e) {
        super(e);
    }
}
class JQLErrorStrategy extends DefaultErrorStrategy {
    reportError(recognizer, e) {
        if (e instanceof InputMismatchException) {
            throw new JQLParseError(e.toString());
        }
        else {
            super.reportError(recognizer, e);
        }
    }
}
class JQLSyntaxError extends ConsoleErrorListener {
    constructor() {
        super();
    }
    syntaxError() {
        throw new JQLParseError("Syntax error");
    }
}
class JQLCustomParser extends JQLParser {
    constructor(input) {
        super(input);
        this.removeErrorListeners();
        this.addErrorListener(new JQLSyntaxError());
        this._errHandler = new JQLErrorStrategy();
    }
}
class Builder {
    constructor(text) {
        this.text = text;
        this.input_stream = new ANTLRInputStream(this.text);
        this.lexer = new JQLLexer(this.input_stream);
        this.stream = new CommonTokenStream(this.lexer);
        this.parser = new JQLCustomParser(this.stream);
    }
}
export class JQLQueryBuilder extends Builder {
    constructor(text) {
        super(text);
        const tree = this.parser.jql_query();
        this.listener = new JQLQueryListener();
        this.walker = ParseTreeWalker.DEFAULT.walk(this.listener, tree);
    }
    get_built_query() {
        return this.listener.root;
    }
}
export class JQLMultiQueryBuilder extends Builder {
    constructor(text) {
        super(text);
        const tree = this.parser.jql_multi_query();
        this.listener = new JQLMultiQueryListerner();
        this.walker = ParseTreeWalker.DEFAULT.walk(this.listener, tree);
    }
    get_built_query() {
        return this.listener.root;
    }
}
