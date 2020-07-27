export class JQLQueryPart {
    constructor() {

    }
}

export class JQLField extends JQLQueryPart {
    public field: null | string | number;

    constructor() {
        super();
        this.field = null;
    }

    set_field(field: string | number) {
        this.field = field;
    }
}

export class JQLSpecial extends JQLQueryPart {
    public special: null | string;
    public arguments: any[];

    constructor() {
        super();
        this.special = null;
        this.arguments = [];
    }

    set_special(special: string) {
        this.special = special;
    }

    add(argument: any) {
        this.arguments.push(argument);
    }
}

export class JQLQuery {
    public parent: any;
    public parts: JQLQueryPart[];

    constructor() {
        this.parent = null;
        this.parts = [];
    }

    add(part: JQLQueryPart) {
        this.parts.push(part);
    }
}

export class JQLRawInput {
    public text: string | null;

    constructor() {
        this.text = null;
    }

    set_text(text: string) {
        this.text = text;
    }
}

export class JQLMultiQuery {
    public queries: (JQLQuery | JQLRawInput)[];

    constructor() {
        this.queries = [];
    }

    add(query: JQLQuery | JQLRawInput) {
        this.queries.push(query);
    }
}

export class JQLValue {
    public parent: any;
    public value: any;

    constructor() {
        this.parent = null;
        this.value = null;
    }

    add(value: any) {
        return;
    }
}

export class JQLList extends JQLValue {
    constructor() {
        super();
        this.value = [];
    }

    add(value: any) {
        this.value.push(value);
    }
}

export class JQLSet extends JQLValue {
    constructor() {
        super();
        this.value = [];
    }

    add(value: any) {
        this.value.push(value);
    }
}

export class JQLDict extends JQLValue {
    private key: any;

    constructor() {
        super();
        this.value = [];
        this.key = undefined;
    }

    add(value: any) {
        if (this.key === undefined) {
            this.key = value;
        } else {
            this.value.push([this.key, value]);
            this.key = undefined;
        }
    }
}

export class JQLExpression {
    public operator: string | null;
    public first: JQLExpression | JQLQuery | JQLValue | null;
    public second: JQLExpression | JQLQuery | JQLValue | null;

    constructor() {
        this.operator = null;
        this.first = null;
        this.second = null;
    }
    
    set_operator(op: string) {
        this.operator = op;
    }

    add(value: JQLExpression | JQLQuery | JQLValue) {
        if (this.first === null) {
            this.first = value;
        } else {
            this.second = value;
        }
    }
}

export class JQLArgument {
    public value: JQLValue | JQLExpression | null;

    constructor() {
        this.value = null;
    }

    add(value: JQLValue | JQLExpression) {
        this.value = value;
    }

    set_value(value: JQLValue | JQLExpression) {
        this.value = value;
    }
}

export class JQLKeywordArgument extends JQLArgument {
    public name: string | null;

    constructor() {
        super();
        this.name = null;
    }

    set_name(name: string) {
        this.name = name;
    }
}