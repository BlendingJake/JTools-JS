export declare class JQLQueryPart {
    constructor();
}
export declare class JQLField extends JQLQueryPart {
    field: null | string | number;
    constructor();
    set_field(field: string | number): void;
}
export declare class JQLSpecial extends JQLQueryPart {
    special: null | string;
    arguments: any[];
    constructor();
    set_special(special: string): void;
    add(argument: any): void;
}
export declare class JQLQuery {
    parent: any;
    parts: JQLQueryPart[];
    constructor();
    add(part: JQLQueryPart): void;
}
export declare class JQLRawInput {
    text: string | null;
    constructor();
    set_text(text: string): void;
}
export declare class JQLMultiQuery {
    queries: (JQLQuery | JQLRawInput)[];
    constructor();
    add(query: JQLQuery | JQLRawInput): void;
}
export declare class JQLValue {
    parent: any;
    value: any;
    constructor();
    add(value: any): void;
}
export declare class JQLList extends JQLValue {
    constructor();
    add(value: any): void;
}
export declare class JQLSet extends JQLValue {
    constructor();
    add(value: any): void;
}
export declare class JQLDict extends JQLValue {
    private key;
    constructor();
    add(value: any): void;
}
export declare class JQLExpression {
    operator: string | null;
    first: JQLExpression | JQLQuery | JQLValue | null;
    second: JQLExpression | JQLQuery | JQLValue | null;
    constructor();
    set_operator(op: string): void;
    add(value: JQLExpression | JQLQuery | JQLValue): void;
}
export declare class JQLArgument {
    value: JQLValue | JQLExpression | null;
    constructor();
    add(value: JQLValue | JQLExpression): void;
    set_value(value: JQLValue | JQLExpression): void;
}
export declare class JQLKeywordArgument extends JQLArgument {
    name: string | null;
    constructor();
    set_name(name: string): void;
}
