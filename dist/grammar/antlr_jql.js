import { JQLQuery, JQLField, JQLSpecial, JQLList, JQLValue, JQLSet, JQLDict, JQLMultiQuery, JQLRawInput } from "./jql";
import { JQLParser } from "./JQLParser";
import { DefaultErrorStrategy, CommonTokenStream, ANTLRInputStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { InputMismatchException } from "antlr4ts";
import { JQLLexer } from "./JQLLexer";
class JQLQueryListener {
    constructor(convert_ints = true) {
        this.stack = [];
        this.convert_ints = convert_ints;
        this.root = null;
    }
    enterQuery(ctx) {
        let q = new JQLQuery();
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
        let f = new JQLField();
        f.set_field(ctx.text);
        if (this.convert_ints === true) {
            let fi = parseInt(f.field.toString());
            if (!isNaN(fi)) {
                f.set_field(fi);
            }
        }
        this.stack[this.stack.length - 1].add(f);
    }
    enterSpecial(ctx) {
        let s = new JQLSpecial();
        this.stack[this.stack.length - 1].add(s);
        this.stack.push(s);
    }
    exitSpecial(ctx) {
        this.stack.pop();
    }
    exitSpecial_name(ctx) {
        this.stack[this.stack.length - 1].set_special(ctx.text);
    }
    enterList_value(ctx) {
        this.enter_value(JQLList);
    }
    enterSet_value(ctx) {
        this.enter_value(JQLSet);
    }
    enterObject_value(ctx) {
        this.enter_value(JQLDict);
    }
    exitKey(ctx) {
        let txt = ctx.text;
        if (txt[0] !== '@') {
            let v = new JQLValue();
            v.value = JQLQueryListener.parse_primitive(txt);
            this.stack[this.stack.length - 1].add(v);
        }
    }
    exitValue(ctx) {
        let text = ctx.text;
        if (text[0] === "[" || text[0] === "{") {
            this.stack.pop();
        }
        else if (text[0] !== "@") {
            let val = new JQLValue();
            val.value = JQLQueryListener.parse_primitive(text);
            this.stack[this.stack.length - 1].add(val);
        }
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
        let v = new cls();
        this.stack[this.stack.length - 1].add(v);
        this.stack.push(v);
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
    constructor(convert_ints = true) {
        super(convert_ints);
    }
    enterJql_multi_query(ctx) {
        this.root = new JQLMultiQuery();
        this.stack.push(this.root);
    }
    exitJql_multi_query(ctx) {
        this.stack.pop();
    }
    exitRaw_text(ctx) {
        let raw = new JQLRawInput();
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
class JQLCustomParser extends JQLParser {
    constructor(input) {
        super(input);
        this._errHandler = new JQLErrorStrategy();
    }
}
class Builder {
    constructor(text, convert_ints = true) {
        this.convert_ints = convert_ints;
        this.text = text;
        this.input_stream = new ANTLRInputStream(this.text);
        this.lexer = new JQLLexer(this.input_stream);
        this.stream = new CommonTokenStream(this.lexer);
        this.parser = new JQLCustomParser(this.stream);
    }
}
export class JQLQueryBuilder extends Builder {
    constructor(text, convert_ints = true) {
        super(text, convert_ints);
        let tree = this.parser.jql_query();
        this.listener = new JQLQueryListener(this.convert_ints);
        this.walker = ParseTreeWalker.DEFAULT.walk(this.listener, tree);
    }
    get_built_query() {
        return this.listener.root;
    }
}
export class JQLMultiQueryBuilder extends Builder {
    constructor(text, convert_ints = true) {
        super(text, convert_ints);
        let tree = this.parser.jql_multi_query();
        this.listener = new JQLMultiQueryListerner(this.convert_ints);
        this.walker = ParseTreeWalker.DEFAULT.walk(this.listener, tree);
    }
    get_built_query() {
        return this.listener.root;
    }
}
