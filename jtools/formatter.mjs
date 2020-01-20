import { Getter } from "./getter.mjs";

const _full_replacement = new RegExp("(?!\\\\){{\\s*" + Getter.full_regex() + "\\s*(?<!\\\\)}}");

export class Formatter {
    constructor(spec) {
        this.spec = spec;
    }

    format(item) {
        return this._replace(this.spec, item);
    }

    _replace(spec, item) {
        let updated = spec.replace(_full_replacement, (match, ...args) => {
            return this._replacer(args, item);
        });

        if (updated !== spec) {
            return this._replace(updated, item);
        } else {
            return updated;
        }
    }

    _replacer(match, item) {
        let field = match[0];
        if (match[1] !== "") {
            field += match[1];
        }

        return (new Getter(field)).get(item).toString();
    }
}
