import { Getter } from "./getter";

const MISSING = "__missing__";
const _full_replacement = new RegExp("{{\\s*" + Getter.full_regex() + "\\s*}}");

export class Formatter {
    private readonly spec: string;
    private readonly fallback: any;
    private failed: boolean;

    constructor(spec: string, fallback: any=null) {
        this.spec = spec;
        this.fallback = fallback;
        this.failed = false;
    }

    single(item: any): string | any {
        return this._replace(this.spec, item);
    }

    many(items: any[]): (string | any)[] {
        return items.map(item => this._replace(this.spec, item));
    }

    _replace(spec: string, item: any): string | any {
        let updated = spec.replace(_full_replacement, (match, ...args) => {
            return this._replacer(args, item);
        });

        if (this.failed === true) {
            return this.fallback;
        } else {
            if (updated !== spec) {
                return this._replace(updated, item);
            } else {
                return updated;
            }
        }
    }

    _replacer(match: any[], item: any): string {
        let field = match[0];
        if (match[2] !== "") {
            field += match[2];
        }

        let result = new Getter(field, MISSING).single(item);
        if (result === MISSING) {
            this.failed = true;
            return "";
        } else {
            if (Array.isArray(result) || typeof(result) === "object") {
                return JSON.stringify(result);
            } else {
                return (result !== null && result !== undefined) ? result.toString() : "null";
            }
        }
    }
}
