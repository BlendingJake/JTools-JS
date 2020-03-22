import { Query } from "./query";
import { JQLMultiQueryBuilder } from "./grammar/antlr_jql";
import { JQLQuery } from "./grammar/jql";
const MISSING = "__missing__";
export class Formatter {
    /**
     * Create a new Formatter for a spec string which can contain multiple JQL queries, prefixed with '@',
     * which will be used to format the output string(s).
     * @param spec The specification string
     * @param fallback The value that will replace any query that could not be performed
     */
    constructor(spec, fallback = "<missing>") {
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
                    output.push(this.fallback);
                }
                else {
                    output.push(v);
                }
            }
            return output.map(p => String(p)).join("");
        }
    }
    /**
     * Format a single item
     * @param item The item to format
     * @returns The formatted string
     */
    single(item) {
        return this._format(this.multi_query, item);
    }
    /**
     * Format a list of items
     * @param items The items to format
     * @returns A list of formatted strings
     */
    many(items) {
        return items.map(item => this._format(this.multi_query, item));
    }
}
