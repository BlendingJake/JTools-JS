import moment from "moment";
import { JQLQuery, JQLField, JQLSpecial, JQLValue, JQLList, JQLDict, JQLSet, JQLArgument, JQLKeywordArgument, JQLExpression } from "./grammar/jql";
import { JQLQueryBuilder, JQLParseError } from "./grammar/antlr_jql";

export type Args = {
    $args: any[],
    $kwargs: {[key: string]: any},
    [key: string]: any
};
export type SpecialFunction = (value: any, context: {[key: string]: any}, args?: Args) => any;

export type ArgumentDefinition = ('$args' | '$kwargs' | string | { name: string, default: any })[];
export interface ParsedArgDef {
    args: ArgumentDefinition,
    lookup: {[key in string|number]: { name: string|number, default?: any, index: number }},
    defaults: {[key: string]: any},
    argsPosition: number | null,
    kwargsPosition: number | null
};

const SPECIALS: {[key: string]: { function: SpecialFunction, args: ParsedArgDef | null }} = {};
const MATH_OPERATIONS: {[key: string]: (a: number, b: number) => number } = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '//': (a, b) => Math.floor(a / b),
    '**': (a, b) => Math.pow(a, b),
    '%': (a, b) => a % b
};

export const QUERY_CACHE: {[key: string]: Query} = {};
   
export default class Query {
    private readonly multiple: boolean;
    private readonly queries: string[] | JQLQuery[];
    private readonly fallback: any;
    private readonly parts: (null | JQLQuery)[];

    /**
     * Create a query object from a JQL query string, or a list of JQL query strings
     * @param query The JQL query string(s)
     * @param fallback A fallback vlaue that will be used if a field cannot be found
     */
    constructor(query: string | string[] | JQLQuery | JQLQuery[], fallback: any=null) {
        this.multiple = Array.isArray(query);
        //@ts-ignore We know from the line above whether this is going to be a single string or array of strings
        this.queries = (this.multiple === true) ? query : [query];
        this.fallback = fallback;

        this.parts = [];
        this.queries.forEach((f: string | JQLQuery) => {
            if (f instanceof JQLQuery) {
                this.parts.push(f);
            } else {
                try {
                    let p: JQLQuery;
                    if (f === "") {
                        p = new JQLQuery();
                    } else if (!f.includes('$')) {
                        p = this.manuallyParse(f);
                    } else {
                        p = new JQLQueryBuilder(f).get_built_query();
                    }
                    this.parts.push(p);
                } catch (e) {
                    console.log(e);
                    this.parts.push(null);
                }
            }
        });
    }

    protected manuallyParse(queryString: string): JQLQuery {
        const query = new JQLQuery();
        queryString.split('.').forEach(part => {
            const field = new JQLField();
            field.set_field(part);
            query.add(field);
        });

        return query;
    }

    protected query(value: any, query: JQLQuery, context: {[key: string]: any}) {
        let og = value;
        query.parts.forEach((part, i) => {
            if (part instanceof JQLField) {
                if (value !== this.fallback) {
                    try {
                        if (value[part.field] !== undefined) {
                            value = value[part.field];
                        } else if (i === 0 && context[part.field] !== undefined) {
                            value = context[part.field];
                        } else {
                            value = this.fallback;
                        }
                    } catch (TypeError) {
                        if (i === 0 && context[part.field] !== undefined) {
                            value = context[part.field];
                        } else {
                            value = this.fallback;
                        }
                    }                
                }
            }  else if (part instanceof JQLSpecial) {
                if (SPECIALS[part.special] !== undefined) {
                    value = SPECIALS[part.special].function(
                        value, context, this.arguments(part.arguments, og, context, part.special)
                    );
                } else {
                    throw new SpecialNotFoundError(part.special);
                }
                
            }
        });

        return value;
    }

    /**
     * Collect the actual values for each argument and split them
     * into a list for positional arguments and a map for keyword arguments.
     * Then, evaluate that against the original definition to
     * build the Args object which will be passed to the specials.
     */
    protected arguments(
        args: (JQLArgument | JQLKeywordArgument)[],
        value: any,
        context: {[key: string]: any},
        special: string
    ): Args {
        const $args = [];
        const $kwargs = {};

        args.forEach(arg => {
            const v = this.value(value, arg.value, context);
            if (arg instanceof JQLKeywordArgument) {
                $kwargs[arg.name] = v;
            } else {
                $args.push(v);
            }
        });

        return Query.parseArgs(
            $args,
            $kwargs,
            special
        );
    }

    /**
     * Take list of arguments and map of keyword arguments and
     * map them to the original argument defintion, if one was provided.
     */
    static parseArgs(
        args: any[], 
        kwargs: {[key: string]: any}, 
        special: string
    ): Args {
        const argDef = SPECIALS[special].args;
        const parsedArgs: Args = { $args: [], $kwargs: {}, ...((argDef) ? argDef.defaults : {}) };

        args.forEach((arg, index) => {
            if (argDef.argsPosition !== null && argDef.argsPosition <= index) {
                parsedArgs.$args.push(arg);
            } else if (argDef.lookup[index] !== undefined) {
                parsedArgs[argDef.lookup[index].name] = arg;
            } else {
                throw new UnexpectedPositionalArgument(index, special);
            }
        });

        Object.keys(kwargs).forEach(key => {
            if (argDef.lookup[key] !== undefined) {
                parsedArgs[key] = kwargs[key];
            } else if (argDef.kwargsPosition !== null) {
                parsedArgs.$kwargs[key] = kwargs[key];
            } else {
                throw new UnepectedKeywordArgument(key, special); 
            }
        });

        return parsedArgs;
    }

    protected value(value: any, qve: JQLQuery | JQLValue | JQLExpression, context: {[key: string]: any}) {
        if (qve instanceof JQLQuery) {
            return this.query(value, qve, context);
        } else if (qve instanceof JQLExpression) {
            if (qve.second === null) {
                return this.value(value, qve.first, context);
            } else {
                return MATH_OPERATIONS[qve.operator](
                    this.value(value, qve.first, context),
                    this.value(value, qve.second, context)
                )
            }
        } else if (qve instanceof JQLList) {
            return qve.value.map(part => this.value(value, part, context));
        } else if (qve instanceof JQLDict) {
            let out = {};
            qve.value.forEach(kv => {
                out[this.value(value, kv[0], context)] = this.value(value, kv[1], context);
            });
            return out;
        } else if (qve instanceof JQLSet) {
            let out = new Set();
            qve.value.forEach(v => {
                out.add(this.value(value, v, context));
            });
            return out;
        } else {
            return qve.value;
        }
    }

    /**
     * Query the item
     * @param item The item to query
     * @param context An additional namespace that will be searched if a toplevel field name cannot
     *      be found on the item
     * @returns A value, or list of values, depending on whether one or multiple queries are present
     */
    single(item: any, context: {[key in string | number]: any} = {}): any | any[] {
        let values = [];
        this.parts.forEach(query => {
            if (query !== null) {
                values.push(this.query(item, query, context));
            } else {
                values.push(this.fallback);
            }
        });

        return (this.multiple === true) ? values : values[0];
    }

    /**
     * Query the items
     * @param items The items to query
     * @param context An additional namespace that will be searched if a toplevel field name cannot
     *      be found on the item currently being queried
     * @returns A list of values or list of lists of values, depending on wehther one or multiple queries are present
     */
    many(items: any[], context: {[key in string | number]: any} = {}): any[] | any[][] {
        return items.map(item => this.single(item, context));
    }

    /**
     * Register a new special that can be accessed with $<name>.
     * The function should take at least one argument, which will be the current value in query.
     * @param name The name of the special - must only contain these characters: [-a-zA-Z0-9_]
     * @param func The function that will be applied to the value
     * @param argDef A way to specify how the function will recieve its arguments to support
     *      keyword arguments
     * @returns Whether or not the special could be registered
     */
    static register_special(name: string, func: SpecialFunction, argDef?: ArgumentDefinition): boolean {
        if (SPECIALS[name] === undefined) {
            SPECIALS[name] = {
                function: func,
                args: (argDef) ? Query.parseArgDef(argDef) : null
            };
            return true;
        } else {
            console.warn(`${name} is already registered as a special value`);
            return false;
        }
    }

    static parseArgDef(argDef: ArgumentDefinition): ParsedArgDef {
        const parsedDef: ParsedArgDef = {
            args: argDef,
            lookup: {},
            defaults: {},
            argsPosition: null,
            kwargsPosition: null
        };
        argDef.forEach((arg, index) => {
            if (arg === '$args') {
                parsedDef.argsPosition = index;
            } else if (arg === '$kwargs') {
                parsedDef.kwargsPosition = index;
            } else {
                const entry = {
                    name: (arg['name'] !== undefined) ? arg['name'] : arg,
                    default: arg['default'],
                    index: index
                };
                parsedDef.lookup[entry.name] = entry;
                parsedDef.lookup[entry.index] = entry;

                if (arg['default'] !== undefined) {
                    parsedDef.defaults[entry.name] = arg['default'];
                }
            }
        });

        return parsedDef;
    }
}

export { Query };

export class SpecialNotFoundError extends Error {
    constructor(special: string) {
        super(
            `'${special}' is not a valid special. Valid options are ${Object.keys(SPECIALS)}`
        );
    }
}

export class UnepectedKeywordArgument extends Error {
    constructor(name: string, special: string) {
        super(
            `Unexpected keyword argument '${name}' in special $${special}`
        );
    }
}

export class UnexpectedPositionalArgument extends Error {
    constructor(position: number, special: string) {
        super(
            `Unexpected positional argument at ${position + 1} in special $${special}`
        );
    }
}

export function REGISTER_DEFAULTS() {
    // general
     Query.register_special('length', (value) => {
        if (value.size !== undefined) {
            return value.size;
        } else if (value.length !== undefined) {
            return value.length;
        } else {
            return Object.keys(value).length;
        }
    });
    Query.register_special('lookup', (value, _, args) => {
            return (args.mp[value] !== undefined) ? args.mp[value] : args.fallback;
        },
        ['mp', { name: 'fallback', default: null }]
    );
    Query.register_special('inject', (_, context, args) => { return args.value }, ['value']),
    Query.register_special('print', (value) => { console.log(value); return value; }),
    Query.register_special('store_as', (value, context, args) => {
            context[args.name] = value;
            return value;
        },
        ['name']
    );
    Query.register_special(
        'group_by', (value, _, args) => {
            let getValue: (value: any) => any;
            if (typeof(args.key) === 'number') {
                getValue = (value) => value[args.key];
            } else {
                let query: Query;
                if (QUERY_CACHE[args.key] !== undefined) {
                    query = QUERY_CACHE[args.key];
                } else {
                    query = new Query(args.key);
                    QUERY_CACHE[args.key] = query;
                }
                getValue = (value) => query.single(value);
            }

            const out = {};
            value.map(v => {
                const part = getValue(v);
    
                if (out[part] !== undefined) {
                    if (args.count) {
                        out[part] += 1;
                    } else {
                        out[part].push(v);
                    }
                } else {
                    if (args.count) {
                        out[part] = 1;
                    } else {
                        out[part] = [v];
                    }
                }
            });
    
            return out;
        },
        [{ name: 'key', default: '' }, { name: 'count', default: false }]
    );
    Query.register_special(
        'pipeline', 
        /**
         * @param args: {
         *      pipeline: [
         *          str - The name of the special
         *          [str, *args] - The name of the special, followed by positional arguments
         *          [str, dict] - The name of the special, followed by a dict of keyword arguments
         *          [str, *args, dict] - The name of the special, followed by positional and then a dict of keyword arguments
         *      ]
         * }
         */
        (value, context, args) => {
            let localValue = value;
            args.pipeline.forEach(stage => {
                if ( typeof(stage) === 'string' ) {
                    localValue = SPECIALS[stage].function(localValue, context, { $args: [], $kwargs: {} });
                } else if ( 
                    !((stage[stage.length-1]) instanceof Set)
                    && typeof(stage[stage.length-1]) === 'object' 
                    && !Array.isArray(stage[stage.length-1]) 
                ) {
                    localValue = SPECIALS[stage[0]].function(
                        localValue, context,
                        Query.parseArgs(stage.slice(1, stage.length-1), stage[stage.length-1], stage[0])
                    );
                } else {
                    localValue = SPECIALS[stage[0]].function(
                        localValue, context,
                        Query.parseArgs(stage.slice(1), {}, stage[0])
                    );
                }
            });

            return localValue;
        }, ['pipeline']
    )
    
    // maps/objects
    Query.register_special(
        'keys', (value) => { return Object.keys(value); }
    );
    Query.register_special(
        'values', (value) => { return Object.keys(value).map(key => value[key]); }
    );
    Query.register_special(
        'items', (value) => { return Object.keys(value).map(key => [key, value[key]]); }
    );
    Query.register_special(
        'wildcard', (value, _, args) => {
            let out = [];
            Object.keys(value).forEach(key => {
                try {
                    if (value[key][args.nxt] !== undefined) {
                        out.push((args.just_field) ? value[key][args.nxt] : value[key]);
                    }
                } catch (TypeError) {
    
                }           
            });
            return out;
        }, ['nxt', { name: 'just_field', default: true }]
    );
    Query.register_special(
        'value_map', (value, context, args) => {
            let data = value;
            if (args.duplicate) {
                data = { ...value };
            }
    
            Object.keys(data).forEach(key => {
                data[key] = SPECIALS[args.special].function(
                    data[key], context, 
                    Query.parseArgs(
                        args.$args, args.$kwargs, args.special
                    )
                );
            });
            return data;
        }, ['special', { name: 'duplicate', default: true }, '$args', '$kwargs']
    );
    Query.register_special(
        'key_of_min_value', (value, _, args) => {
            let key = null;
            Object.keys(value).forEach(k => {
                if (key === null || value[k] < value[key]) {
                    key = k;
                }
            });

            return (args.just_key) ? key : [key, value[key]];
        }, [{ name: 'just_key', default: true }]
    );
    Query.register_special(
        'key_of_max_value', (value, _, args) => {
            let key = null;
            Object.keys(value).forEach(k => {
                if (key === null || value[k] > value[key]) {
                    key = k;
                }
            });

            return (args.just_key) ? key : [key, value[key]];
        }, [{ name: 'just_key', default: true }]
    );
    
    // type conversions
    Query.register_special('set', (value) => { return new Set(value); });
    Query.register_special('float', (value) => { return parseFloat(value); });
    Query.register_special('string', (value) => { return value.toString(); });
    Query.register_special('dict', (value) => {
            const out = {};
            value.forEach(v => {
                out[v[0]] = v[1];
            });
            return out;
        }
    );
    Query.register_special('int', (value) => { return parseInt(value); });
    Query.register_special('not', (value) => { return !value; });
    Query.register_special(
        'fallback', (value, _, args) => { return value || args.fallback; }, 
        [ 'fallback' ]
    );
    Query.register_special('ternary', (value, _, args) => {
            if ( (value && args.strict === false) || (value === true && args.strict === true) ) {
                return args.if_true;
            } else {
                return args.if_false;
            }
        }, ['if_true', 'if_false', { name: 'strict', default: false }]
    );
    
    // datetime
    Query.register_special('parse_timestamp', (value) => { return moment.unix(value).utc(); });
    Query.register_special(
        'strptime', (value, _, args) => { return (args.fmt === null) ? moment.parseZone(value) : moment.parseZone(value, args.fmt); },
        [{ name: 'fmt', default: null }]
    );
    Query.register_special('timestamp', (value) => { return value.utc().unix(); });
    Query.register_special(
        'strftime', (value, _, args) => {
            return value.format(args.fmt);
        }, [{ name: 'fmt', default: 'YYYY-MM-DD[T]HH:mm:ss[Z]' }]
    );
    Query.register_special(
        'time_part', (value: moment.Moment, _, args) => {
            switch (args.part) {
                case 'millisecond':
                    return value.milliseconds();
                case 'second':
                    return value.seconds();
                case 'minute':
                    return value.minutes();
                case 'hour':
                    return value.hours();
                case 'day': 
                    return value.date();
                case 'month':
                    return value.month() + 1;
                case 'year':
                    return value.year();
                case 'dayOfWeek':
                    return (value.days() + 6) % 7;
                case 'dayOfYear':
                    return value.dayOfYear();
            }
        }, ['part']
    );
    
    // math / numeric
    Query.register_special('add', (value, _, args) => { return value + args.num; }, ['num']);
    Query.register_special('subtract', (value, _, args) => { return value - args.num; }, ['num']);
    Query.register_special('multiply', (value, _, args) => { return value * args.num; }, ['num']);
    Query.register_special('divide', (value, _, args) => { return value / args.num; }, ['num']);
    Query.register_special('pow', (value, _, args) => { return Math.pow(value, args.num); }, ['num']);
    Query.register_special('abs', (value) => { return Math.abs(value); });
    Query.register_special(
        'distance', (value, _, args) => {
            let sum = 0;
            for (let i=0; i<value.length; i++) {
                sum += Math.pow(args.other[i] - value[i], 2);
            }
            return Math.sqrt(sum);
        }, ['other']
    );
    Query.register_special(
        'math', (value, _, args) => { return Math[args.attr](value, ...args.$args); },
        ['attr', '$args']
    );
    Query.register_special(
        'round', (value, _, args) => { return value.toFixed(args.n); },
        [ { name: 'n', default: 2 }]
    );
    Query.register_special(
        'arith', (value, _, args) => {
            return MATH_OPERATIONS[args.op](value, args.arg_value);
        }, ['op', 'arg_value']
    );
    
    // string
    Query.register_special('lowercase', (value: string) => value.toLowerCase());
    Query.register_special('uppercase', (value: string) => value.toUpperCase());
    Query.register_special('titlecase', (value: string) => {
        return [...value].map((letter, index, array) => {
            if (index === 0 || array[index-1] === ' ') {
                return letter.toUpperCase();
            } else {
                return letter.toLowerCase();
            }
        }).join('');
    });
    Query.register_special(
        'prefix', (value, _, args) => { return `${args.prefix}${value}`; },
        ['prefix']
    );
    Query.register_special(
        'suffix', (value, _, args) => { return `${value}${args.suffix}`; },
        ['suffix']
    );
    Query.register_special(
        'wrap', (value, _, args) => { return `${args.prefix}${value}${args.suffix}`},
        ['prefix', 'suffix']
    );
    Query.register_special('strip', (value) => { return value.trim(); });
    Query.register_special(
        'replace', (value, _, args) => { return value.replace(args.old, args.new); },
        ['old', 'new']
    );
    Query.register_special(
        'trim', (value, _, args) => {
            let trimmed = value.substring(0, args.length-args.suffix.length);
            if (value.length > args.length-args.suffix.length) {
                trimmed += args.suffix;
            }
            return trimmed;
        }, [{ name: 'length', default: 50 }, { name: 'suffix', default: '...' }]
    );
    Query.register_special(
        'split', (value, _, args) => { return value.split(args.on); },
        [{ name: 'on', default: ' '}]
    );
    
    // list
    Query.register_special('min', (value) => Math.min(...value));
    Query.register_special('max', (value) => Math.max(...value));
    Query.register_special(
        'sum', (value) => {
            let sum = 0;
            value.forEach(item => { sum += item; });
            return sum;
        }
    );
    Query.register_special(
        'join', (value, _, args) => { return value.join(args.sep); },
        [{ name: 'sep', default: ', ' }]
    );
    Query.register_special(
        'join_arg', (value, _, args) => {
            return args.arg.join(args.sep);
        }, ['arg', { name: 'sep', default: ', ' }]
    );
    Query.register_special(
        'index', (value, context, args) => {
            const multiple = Array.isArray(args.key);

            if (args.extended === true) {
                const queryKey = args.key.toString() + (args.fallback) ? args.fallback.toString() : "";
                let query: Query;
                if (QUERY_CACHE[queryKey] !== undefined) {
                    query = QUERY_CACHE[queryKey];
                } else {
                    query = new Query(
                        (multiple) ? args.key.map(k => k.toString()) : args.key.toString(),
                        args.fallback
                    );
                    QUERY_CACHE[queryKey] = query;
                }

                return query.single(value, context);
            } else {
                const out = [];
                ((multiple) ? args.key : [args.key]).forEach(k => {
                    try {
                        if (value[k] === undefined) {
                            if (context[k] === undefined) {
                                out.push(args.fallback);
                            } else {
                                out.push(context[k]);
                            }
                        } else {
                            out.push(value[k]);
                        }
                    } catch (TypeError) {
                        out.push(args.fallback);
                    }       
                });

                return (multiple) ? out : out[0];
            }
        }, ['key', { name: 'fallback', default: null }, { name: 'extended', default: false }]
    );
    Query.register_special(
        'range', (value, _, args) => {
            if (args.end !== null) {
                if (args.end < 0) {  // support negative indices
                    return value.slice(args.start, value.length-args.end);
                } else {
                    return value.slice(args.start, args.end);
                }
            } else {
                return value.slice(args.start);
            }
        }, ['start', { name: 'end', default: null }]
    );
    Query.register_special(
        'remove_nulls', (value) => {
            let out = [];
            value.forEach(value => {
                if (value !== null && value !== undefined) {
                    out.push(value);
                }
            });
            return out;
        }
    );
    Query.register_special(
        'sort', (value, _, args) => {
            const multi = (args.reverse) ? -1 : 1;
            if (typeof (args.key) === 'number') {
                return value.map(v => v).sort((a, b) => {
                    return (a[args.key] < b[args.key]) ? -1 * multi : multi;
                });
            } else {
                let query: Query;
                if (QUERY_CACHE[args.key] !== undefined) {
                    query = QUERY_CACHE[args.key];
                } else {
                    query = new Query(args.key);
                    QUERY_CACHE[args.key] = query; 
                }  

                return value.map(v => v).sort((a, b) => {
                    return (query.single(a) < query.single(b)) ? -1 * multi : multi;
                });
            }
        }, [{ name: 'key', default: '' }, { name: 'reverse', default: false }]
    );
    Query.register_special(
        'map', (value, context, args) => { return value.map(item => {
            return SPECIALS[args.special].function(
                item, context, Query.parseArgs(
                    args.$args, args.$kwargs, args.special
                ));
        })}, ['special', '$args', '$kwargs']
    );
    
    // attribute accessing
    Query.register_special(
        'call', (value, _, args) => {
            return value[args.func](...args.$args);
        }, ['func', '$args']
    );
    Query.register_special(
        'attr', (value, _, args) => {
            return value[args.attr];
        }, ['attr']
    );
}

REGISTER_DEFAULTS();
