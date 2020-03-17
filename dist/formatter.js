import { Query } from "./query";
import { JQLMultiQueryBuilder } from "./grammar/antlr_jql";
import { JQLQuery } from "./grammar/jql";
const MISSING = "__missing__";
export class Formatter {
    constructor(spec, fallback = null) {
        this.spec = spec;
        this.fallback = fallback;
        try {
            let mq = new JQLMultiQueryBuilder(this.spec).get_built_query();
            this.multi_query = mq;
        }
        catch (JQLParseError) {
            this.multi_query = null;
        }
    }
    _format(mq, item) {
        if (mq === null) {
            return this.fallback;
        }
        else {
            let output = [];
            let v;
            let part;
            for (let i = 0; i < mq.queries.length; i++) {
                part = mq.queries[i];
                if (part instanceof JQLQuery) {
                    v = new Query(part, MISSING).single(item);
                }
                else {
                    v = part.text.replace("@@", "@");
                }
                if (v === MISSING) {
                    return this.fallback;
                }
                else {
                    output.push(v);
                }
            }
            return output.map(p => String(p)).join("");
        }
    }
    single(item) {
        return this._format(this.multi_query, item);
    }
    many(items) {
        return items.map(item => this._format(this.multi_query, item));
    }
}
