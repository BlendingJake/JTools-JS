import { JQLListener } from "./JQLListener";
import { JQLQuery, JQLField, JQLSpecial, JQLList, JQLValue, JQLSet, JQLDict, JQLMultiQuery, JQLRawInput } from "./jql";
import { QueryContext, Query_fieldContext, SpecialContext, Special_nameContext, List_valueContext, Set_valueContext, Object_valueContext, KeyContext, ValueContext, Jql_multi_queryContext, Raw_textContext, JQLParser } from "./JQLParser";
import { DefaultErrorStrategy, Parser, RecognitionException, CommonTokenStream, ANTLRInputStream, ConsoleErrorListener } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { InputMismatchException } from "antlr4ts";
import { JQLLexer } from "./JQLLexer";

class JQLQueryListener implements JQLListener {
    public stack: any[];
    public root: null | JQLQuery | JQLMultiQuery;

    constructor() {
        this.stack = [];
        this.root = null;
    }

    enterQuery(ctx: QueryContext) {
        let q = new JQLQuery();

        if (this.stack.length !== 0) {
            this.stack[this.stack.length-1].add(q);
        } else {
            this.root = q;
        }

        this.stack.push(q);
    }

    exitQuery(ctx: QueryContext) {
        this.stack.pop();
    }

    exitQuery_field(ctx: Query_fieldContext) {
        let f = new JQLField();
        f.set_field(ctx.text);
        this.stack[this.stack.length-1].add(f);
    }

    enterSpecial(ctx: SpecialContext) {
        let s = new JQLSpecial();
        this.stack[this.stack.length-1].add(s)
        this.stack.push(s);
    }

    exitSpecial(ctx: SpecialContext) {
        this.stack.pop();
    }

    exitSpecial_name(ctx: Special_nameContext) {
        this.stack[this.stack.length-1].set_special(ctx.text);
    }

    enterList_value(ctx: List_valueContext) {
        this.enter_value(JQLList);
    }

    enterSet_value(ctx: Set_valueContext) {
        this.enter_value(JQLSet);
    }

    enterObject_value(ctx: Object_valueContext) {
        this.enter_value(JQLDict);
    }

    exitKey(ctx: KeyContext) {
        let txt: string = ctx.text;
        if (txt[0] !== '@') {
            let v = new JQLValue();
            v.value = JQLQueryListener.parse_primitive(txt);
            this.stack[this.stack.length-1].add(v);
        }
    }

    exitValue(ctx: ValueContext) {
        let text: string = ctx.text;
        if (text[0] === "[" || text[0] === "{") {
            this.stack.pop();
        } else if (text[0] !== "@") {
            let val = new JQLValue();
            val.value = JQLQueryListener.parse_primitive(text);
            this.stack[this.stack.length-1].add(val);
        }
    }

    static parse_primitive(text: string): null | string | number | boolean {
        let value: null | string | number | boolean;
        if (text[0] === '"' || text[0] === "'") {
            value = text.substring(1, text.length-1);
        } else if (text === "true") {
            value = true;
        } else if (text === "false") {
            value = false;
        } else if (text === "null") {
            value = null;
        } else if (text.includes(".")) {
            value = parseFloat(text);
        } else {
            value = parseInt(text);
        }

        return value;
    }

    enter_value(cls: {new(): JQLValue}) {
        let v = new cls();
        this.stack[this.stack.length-1].add(v);
        this.stack.push(v);
    }

    enterJql_multi_query(ctx: Jql_multi_queryContext) {
        return;
    }

    exitJql_multi_query(ctx: Jql_multi_queryContext) {
        return;
    }

    exitRaw_text(ctx: Raw_textContext) {
        return;
    }
}

class JQLMultiQueryListerner extends JQLQueryListener {
    constructor() {
        super();
    }

    enterJql_multi_query(ctx: Jql_multi_queryContext) {
        this.root = new JQLMultiQuery();
        this.stack.push(this.root);
    }

    exitJql_multi_query(ctx: Jql_multi_queryContext) {
        this.stack.pop();
    }

    exitRaw_text(ctx: Raw_textContext) {
        let raw = new JQLRawInput();
        raw.set_text(ctx.text);
        this.stack[this.stack.length-1].add(raw);
    }
}

export class JQLParseError extends Error {
    constructor(e: string) {
        super(e);
    }
}

class JQLErrorStrategy extends DefaultErrorStrategy {
    reportError(recognizer: Parser, e: RecognitionException) {
        if (e instanceof InputMismatchException) {
            throw new JQLParseError(e.toString());
        } else {
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
    constructor(input: CommonTokenStream) {
        super(input);

        this.removeErrorListeners();
        this.addErrorListener(new JQLSyntaxError());
        this._errHandler = new JQLErrorStrategy();
    }
}

class Builder {
    protected text: string;
    protected input_stream: ANTLRInputStream;
    protected lexer: JQLLexer;
    protected stream: CommonTokenStream;
    protected parser: JQLParser;

    constructor(text: string) {
        this.text = text;

        this.input_stream = new ANTLRInputStream(this.text);
        this.lexer = new JQLLexer(this.input_stream);
        this.stream = new CommonTokenStream(this.lexer);
        this.parser = new JQLCustomParser(this.stream);
    }
}

export class JQLQueryBuilder extends Builder {
    protected listener: any;
    protected walker: any;

    constructor(text: string) {
        super(text);
        
        let tree = this.parser.jql_query();
        this.listener = new JQLQueryListener();
        this.walker = ParseTreeWalker.DEFAULT.walk(this.listener, tree);
    }

    get_built_query(): JQLQuery {
        return (this.listener.root as JQLQuery);
    }
}

export class JQLMultiQueryBuilder extends Builder {
    protected listener: any;
    protected walker: any;

    constructor(text: string) {
        super(text);

        let tree = this.parser.jql_multi_query();
        this.listener = new JQLMultiQueryListerner();
        this.walker = ParseTreeWalker.DEFAULT.walk(this.listener, tree);        
    }

    get_built_query(): JQLMultiQuery {
        return (this.listener.root as JQLMultiQuery);
    }
}