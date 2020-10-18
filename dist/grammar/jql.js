export class JQLQueryPart {
    constructor() {
    }
}
export class JQLField extends JQLQueryPart {
    constructor() {
        super();
        this.field = null;
    }
    set_field(field) {
        this.field = field;
    }
}
export class JQLSpecial extends JQLQueryPart {
    constructor() {
        super();
        this.special = null;
        this.arguments = [];
    }
    set_special(special) {
        this.special = special;
    }
    add(argument) {
        this.arguments.push(argument);
    }
}
export class JQLQuery {
    constructor() {
        this.parent = null;
        this.parts = [];
    }
    add(part) {
        this.parts.push(part);
    }
}
export class JQLRawInput {
    constructor() {
        this.text = null;
    }
    set_text(text) {
        this.text = text;
    }
}
export class JQLMultiQuery {
    constructor() {
        this.queries = [];
    }
    add(query) {
        this.queries.push(query);
    }
}
export class JQLValue {
    constructor() {
        this.parent = null;
        this.value = null;
    }
    add(value) {
        return;
    }
}
export class JQLList extends JQLValue {
    constructor() {
        super();
        this.value = [];
    }
    add(value) {
        this.value.push(value);
    }
}
export class JQLSet extends JQLValue {
    constructor() {
        super();
        this.value = [];
    }
    add(value) {
        this.value.push(value);
    }
}
export class JQLDict extends JQLValue {
    constructor() {
        super();
        this.value = [];
        this.key = undefined;
    }
    add(value) {
        if (this.key === undefined) {
            this.key = value;
        }
        else {
            this.value.push([this.key, value]);
            this.key = undefined;
        }
    }
}
export class JQLExpression {
    constructor() {
        this.operator = null;
        this.first = null;
        this.second = null;
    }
    set_operator(op) {
        this.operator = op;
    }
    add(value) {
        if (this.first === null) {
            this.first = value;
        }
        else {
            this.second = value;
        }
    }
}
export class JQLArgument {
    constructor() {
        this.value = null;
    }
    add(value) {
        this.value = value;
    }
    set_value(value) {
        this.value = value;
    }
}
export class JQLKeywordArgument extends JQLArgument {
    constructor() {
        super();
        this.name = null;
    }
    set_name(name) {
        this.name = name;
    }
}
