# @blending_jake/jtools
>JTools is a robust library for interacting with JSON-like objects,
>focusing on providing an easy way to filter, 
>format, and extract fields from JSON-like data.
>
>A companion to the Python version of this package: JTools (https://pypi.org/project/jtools/).
>The Python version supports almost the exact same specials, filters, and formatting specification, with the
>goal of making it a seamless experience to go from accessing/filtering/formatting in Python to JavaScript and back.
>The joint development is why `!in` is accessed with the `.in_` method even in JavaScript, despite `in` not being a 
>reserved keyword in JavaScript as it is in Python. The goal is to make the two versions work as identically as 
>possible.
>
>This module is written originally in TypeScript and declaration files are included in the distribution.
>The module is transpiled to ES6.

##### Difference from JTools-Py
 * In JTools-Py, `==` and `===` will behave the same, as well as `!=` and `!==`. 
 * JTools-Py uses the `datetime` package, while this version uses `moment`
 * JTools-Py replicates JavaScript's default lack of differentiation between `item[0]` and `item["0"]` by default. 
 However, this can be changed in the Python version by setting `Getter(..., convert_ints=False)`. 
 If that argument is set to `False` in Python, then `item.0` would work on `{"item": {"0": ...}}`, 
 but not on `{"item": {0: ...}}`. The JavaScript version essentially always has `convert_ints=True`. 

## Changelog
 * `1.0.6`
   * Migrate to TypeScript, so a declaration file is now included in the distribution
   * Add this `README`
   * Add `===` and `!==` filters for strict equality checking. The methods `seq` and `sne` have
   been added to `Key` to correspond with the new filters.
   * Rename `null` -> `!present` and `!null` -> `present`. Corresponding methods have been renamed
   to `not_present` and `present`. This filter will catch values that are `null` or `undefined`.
   * Make membership filters (`in`, `contains`, `!in` and `!contains`) work properly with 
   strings, arrays, associative arrays, and sets.
   * Remove `$datetime`. See below for replacement.
   * Add `$call` and `$attr` for calling a function and accessing an attribute. Can be used to replace
   `$datetime` functionality.
   * Remove `Formatter.format` and add `Formatter.single` and `Formatter.many` to be consistent across
   other classes and support formatting arrays of items.
   * Add more tests to increase coverage and do basic performance testing

## Glossary
 * [`Installation`](#install)
 * [`Getter`](#getter)
   * [`Specials`](#specials)
 * [`Formatter`](#formatter)
 * [`Filter`](#filter)
   * [`Key`](#key)
   * [`Condition`](#condition)
 * [`Performance`](#performance)
   
## <a name="install">Installation</a>
`npm i @blending_jake/jtools`
```ecmascript 6
// import
import { Getter, Filter, Key, Condition, Formatter } from "@blending_jake/jtools";
```

## <a name="getter">Getter</a>
>`Getter` on the surface is very simple: you give it a field query string (or several)
>and it returns the value (or values) at that path(s) from a given an item or list of items. 
>Example: `new Getter("name").single({name: "John"})` will return `"John"`.
>However, there are many more cool features, like supporting dot-notation,
>having the ability to transform values with specials, and even the ability 
>to drill down into lists. Below is a fuller list of the features.

 * `.single(item)` can be used to get field(s) from a single item, or 
 `.many(items)` can be used to get field(s) from a list of items
 
 * The `Getter` constructor accepts a second argument, `fallback`, which is `null` by default.
 The `fallback` value will be returned if the any part of the query string did not exist.
 A different fallback value can be specified with `new Getter(field(s), <fallback>)`
 
 * Multiple fields can be retrieved at once by passing a list of query strings, like
 `new Getter(["name", "age"])`. Resulting values from `.single` and `.many` will be
 lists of corresponding length.
 
 * Dot-notation is supported and can be used to access nested values. For
 example, `meta.id` can be used to get the `id` field from the item
 `{meta: {id: 1}}`, resulting in the value of `1`. 
 
 * Integer paths can be used to index lists. This allows paths like `friends.0`.
 
 * Specials can be can be used to transform the queried value, and multiple
 specials can be used back to back, with the output of one being used in the next. 
 Specials are included in the field path and prefixed with `$`. For example, 
 if you have `{long_number: 3.1415926}`, you can use `long_number.$round`
 to round it to `2` decimal places, returning `3.14`. 
 
 * Arguments can be passed into these specials! For example, if you have
 `{email: "john_doe@gmail.com"}` and you want to get just the 
 email provider, then `email.$split("@").$index(-1)` can be used, which will
 return `gmail.com`. Equally, `email.$split("@").1` could be used. 
 
 * Arguments can be anything that can be represented in JSON. 
 **Note: JSON requires strings to be double-quoted, so 
 `email.$split('@')` would not work and `email.$split("@")` would have to be used instead.**
 
 * You don't have to use `()` at the end of a special if there aren't any 
 arguments, or the default arguments are acceptable.
 
 * More specials can be added by using the static method `.register_special()` 
 like so: `Getter.register_special(<name>, <func>)`. The function should take
 at least one argument, which is the current value in the query string: `(value, ...args) => { ... }`
 
#### <a name="specials">Specials</a>
General
  * `$length -> int`
  
Maps
  * `$keys -> []`
  * `$values -> []`
  * `$items -> [key, value][]`
  
Type Conversions
  * `$set -> Set`
  * `$float -> number`
  * `$string -> string`
  * `$int -> number`
  * `$not -> boolean`: Returns `!value`
  * `$fallback(fallback) -> value || fallback`
  * `$ternary(if_true, if_false, strict=false) -> Any`: Return `if_true` if the value is `truish`, otherwise,
  return `if_false`. Pass `true` for `strict` if the value must be `true` and not just `truish`.
  
Datetime 
  * `$parse_timestamp -> moment`: Take a Unix timestamp in seconds and return a corresponding moment object
  * `$strptime(fmt=None) -> moment`: Parse a datetime string and return a corresponding moment object.
  If `fmt=None`, then ISO formats will be tried. Refer to 
  https://momentjs.com/docs/#/parsing/string-format/ for formatting instructions
  * `$timestamp -> number`: Dump a moment object to a UTC timestamp as the number of seconds since the Unix Epoch
  * `$strftime(fmt="YYYY-MM-DD[T]HH:mm:ss[Z]") -> str`: Format a moment object as a string using `fmt`.
  Refer to https://momentjs.com/docs/#/displaying/format/ for formatting instructions
  
Math / Numbers
  * `$add(num) -> number`
  * `$subtract(num) -> number`
  * `$multiply(num) -> number`
  * `$divide(num) -> number`
  * `$pow(num) -> number`
  * `$abs(num) -> number`
  * `$distance(other) -> number`: Euler distance in N-dimensions
  * `$math(attr) -> any`: Returns `math[attr](value)`, which can be used for
  operations like `floor`, `cos`, `sin`, etc.
  * `$round(n=2) -> number`
  
Strings
  * `$prefix(prefix) -> string`: Prefix the value with the specified string
  * `$suffix(suffix) -> string`: Concatenate a string to the end of the value
  * `$strip -> string`: Strip leading and trailing whitespace
  * `$replace(old, new) -> string`: Replace all occurrences of a string 
  * `$trim(length=50, suffix="...") -> string`: Trim the length of a string
  * `$split(on=" ") -> string[]`: Split a string
  
Lists
  * `$sum -> number`: Return the sum of the items in the value
  * `$join(sep=", ") -> string`: Join a list using the specified separator
  * `$index(index) -> any`: Index a list. Negative indices are allowed.
  * `$range(start, end=undefined) -> `: Get a sublist. Defaults to `value.slice(start)`, 
  but an end value can be specified. Negative indices are allowed. 
  * `$map(special, ...args) -> any[]`: Apply `special` to every element in the 
  value. Arguments can be passed through to the special being used.
  
 Attributes
  * `$call(func, ...args) -> any`: Call a function that is on the current value, implemented as `value[func](...args)`
  * `$attr(attr) -> any`: Access an attribute of the given object, implemented as `value[attr]`
  
## <a name="formatter">Formatter</a>
> `Formatter` allows fields to be taken from an object and then formatted
>into a string. The basic usage is `new Formatter(<spec>).single(<item>)`.
>However, `.many` is supported as well.
>Fields to be replaced should be wrapped in `{{}}` and any valid
>field query string for `Getter` can be used. For example, 
>`new Formatter('Name: {{name}}').single({name: "John Smith"})` results in
>`Name: John Smith`. Below are some specific details.

 * The field specifications from `Getter` are valid here, so the above example
 could instead be `'First Name: {{name.$split(" ").0}}'` to get `First Name: John`
 instead.
 
 * A fallback value can be specified for a the formatter which will be returned if any of the fields
 being formatted do not exist. Specify using `new Formatter(spec, <fallback>)`.
 
 * **Field paths can be nested!!!!** - this allows values from one field to be 
 passed as the arguments to another, allowing complex queries. For example,
 `new Formatter("Balance: ${{balance.$subtract({{pending_charges}})}}").format({balance: 1000, pending_charges: 250})`
 which results in `Balance: $750`.
 
 * Whitespace is allowed inside of the curly braces before and after the field query string. 
 `{{   a  }}` is just as valid as `{{a}}`. 

 * **IMPORTANT:** Nested fields that return strings which are then used as arguments 
must be manually double-quoted. For example, lets say we want to replace the domain `gmail`
with `<domain>` in `let item = {email: "john_doe@gmail.com"}`. We want to determine the 
current domain, which we can do with `email.$split("@").1.$split(".").0`, and then
we want to pass that as an argument into `$replace`. To do so, we need to surround the nested
field with double-quotes so it will be properly recognized as an argument in the `$replace` special.
`new Formatter('Generic Email: {{  email.$replace("{{  email.$split("@").1.$split(".").0  }}", "<domain>")  }}').single(item)`
 
Example (flattening operations):
```ecmascript 6
let errors = {
    errors: {
        "Process Error": "Could not communicate with the subprocess",
        "Connection Error": "Could not connect with the database instance"
    }
};

new Formatter('{errors.$items.$map("join", ": \\n\\t").$join("\\n")}').single(errors);
// Process Error: 
//   Could not communicate with the subprocess
// Connection Error: 
//   Could not connect with the database instance
```
>The above example shows a powerful usage of flattening `errors` into its items,
>then joining each item; splitting the error name and message between lines, then
>joining all the errors together.

Example (nested replacement):
```ecmascript 6
let item = {
    x1: 1,
    y1: 1,
    x2: 12,
    y2: 54
};

new Formatter(
    "Midpoint: [{{x2.$subtract({{x1}}).$divide(2)}}, {y2.$subtract({{y1}}).$divide(2)}}]"
).single(item);
// Midpoint: [5.5, 26.5]
```

## <a name="filter">Filter</a>
>`Filter` takes the field querying capabilities of `Getter` and combines it with 
>filtering conditions to allow lists of items to be filtered down to just those of 
>interest. The basic usage is: `Filter(<filters>).many(<list of items>)`, although
>`.single` can also be used to get a boolean answer of whether the item matches the filter or not.
>The filters can be manually built, or the `Key` and `Condition` classes can 
>be used to simplify your code. 

Filter Schema:
```
[
    {"field": <field>, "operator": <op>, "value": <value>},

    OR

    {"or": <nested outer structure>},
    
    OR

    {"not": <nested outer structure>},

    ...
]
<field>: anything Getter accepts
<op>: See list below
<value>: Anything that makes sense for the operator
``` 

> Note on `or`:
```
{"or": [ 
    [ {filter1}, {filter2} ], 
    {filter3} 
]}
``` 
>is the same as `(filter1 AND filter2) OR filter3`. Nesting in an `or` will cause those filters
>to be `AND'd` and then everything in the toplevel of that `or` will be `OR'd`.

Operators:
 * `>`
 * `<`
 * `>=`
 * `<=`
 * `==`
 * `!=`
 * `===`
 * `!==`
 * `in`: `<field> in <value>`
 * `!in`
 * `contains`: `<value> in <field>`
 * `!contains`
 * `interval`: `<field> in interval [value[0], value[1]]` (closed/inclusive interval)
 * `!interval`: `<field> not in interval [value[0], value[1]]` 
 * `startswith`
 * `endswith`
 * `present`
 * `!present`
 
 The `Filter` constructor can take an object with parameters, by passing it after the filters: 
 `new Filter(filter(s), <params>)`. The accepted parameters are:
  * `empty_filters_response: true`: Whether to return `true` or `false` if there are no filters. Makes the difference
  between returning all items or no items if no filters are passed.

#### <a name="key">Key</a>
>Intended to simplify having to write `{field: <field>, operator: <operator>, value: value}` 
>a lot. The basic usage is: `Key(<field>).<op>(<value>)`.

Operators: 

| underlying operator | `Key` function |
| ------------------- | -------- |
| `>` | `gt` | 
| `<` | `lt` |
| `<=` | `lte` |
| `>=` | `gte` |
| `==` | `eq` |
| `!=` | `ne` |
| `===` | `seq` |
| `!==` | `sne` |
| `in` | `in_` |
| `!in` | `nin` |
| `contains` | `contains` | 
| `!contains` | `not_contains` |
| `interval` | `interval` |
| `!interval` | `not_interval` |
| `startswith` | `startswith` |
| `endswith` | `endswith` |
| `present` | `present` |
| `!present` | `not_present` |

#### <a name="condition">Condition</a>
>Intended to be used in combination with `Key` to make creating filters
>easier than manually creating the `JSON`. There are three conditions supported:
>`and`, `or`, and `not`. They can be manually accessed via `and_(*args)`, `or_(*args)`, and `not_()`.

>Examples
```ecmascript 6
Key('creation_time.$parse_timestamp.$call("year")').lt(2005).or_(
    Key('creation_time.$parse_timestamp.$call("year")').gt(2015)
).and_(
    Key("product_id").seq(15)
);
```

## <a name="performance">Performance</a>
>There are several ways to increase the performance of filtering and getting. The query strings within filters
>or those being passed directly to a `Getter` are parsed when the object is created. This means that using a `Getter`
>or `Filter` object multiple times will be faster then creating a new object every time. 
>
>For example:
```ecmascript 6
// slower
items.forEach(item => {
    let f = new Getter("timestamp.$parse_timestamp").single(item);
    /* more stuff */
});

// faster
let getter = new Getter("timestamp.$parse_timestamp");
items.forEach(item => {
    let f = getter.single(item);
    /* more stuff */
})
```

>Specifically, reusing a `Getter` can improve performance by 8-9x and reusing a `Filter` can improve
>by 5-6x.