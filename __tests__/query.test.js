import { Filter, Key, Query, SpecialNotFoundError } from "../dist";
let small_data = require("./data/20.json");

test(".single() for single field", () => {
    expect(
        new Query("guid").single(small_data[0])
    ).toStrictEqual(small_data[0].guid);
});

test(".single() for capital field", () => {
    let data = {outer: {INNER: "test"}};
    expect(
        new Query("outer.INNER").single(data)
    ).toStrictEqual(data.outer.INNER);
});

test(".single() for single missing field", () => {
    expect(
        new Query("null", "MISSING").single(small_data[0])
    ).toStrictEqual("MISSING");
});

test(".many() for single missing field", () => {
    expect(
        new Query("null", "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual(["MISSING", "MISSING", "MISSING"]);
});

test(".single() for many missing fields", () => {
    expect(
        new Query(["null", "missing"], "MISSING").single(small_data[0])
    ).toStrictEqual(["MISSING", "MISSING"]);
});

test(".many() for many missing fields", () => {
    expect(
        new Query(["null", "missing"], "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual([["MISSING", "MISSING"], ["MISSING", "MISSING"], ["MISSING", "MISSING"]]);
});

test(".single() for multiple fields, one of which is missing", () => {
    expect(
        new Query(["isactive", "balance"], "MISSING").single(small_data[0])
    ).toStrictEqual( ["MISSING", small_data[0].balance]);
});

test(".many() for multiple fields, one of which is missing", () => {
    expect(
        new Query(["isactive", "balance"], "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual(small_data.slice(0, 3).map(item => { return ["MISSING", item.balance]; }));
});

test(".single() for missing nested field", () => {
    expect(
        new Query("null.null", "MISSING").single(small_data[1])
    ).toStrictEqual("MISSING");
});

test(".many() for missing nested field", () => {
    expect(
        new Query("null.null", "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual(["MISSING", "MISSING", "MISSING"]);
});

test('.single() second level missing', () => {
    expect(
        new Query('null.3', 'MISSING').single({ 'null': [0, 1] })
    ).toStrictEqual('MISSING');
});

test(".many() for single field", () => {
    expect(
        new Query("age", "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual(small_data.slice(0, 3).map(item => item.age));
});

test(".many() for many fields", () => {
    expect(
        new Query(["eyeColor", "gender"], "MISSING").many(small_data.slice(1, 3))
    ).toStrictEqual(small_data.slice(1, 3).map(item => [item.eyeColor, item.gender]));
});

test(".single() for many fields", () => {
    expect(
        new Query(["age", "email"], "MISSING").single(small_data[0])
    ).toStrictEqual([small_data[0].age, small_data[0].email]);
});

test("starting with special keys", () => {
    expect(
        new Query("$keys.$length", "MISSING").single(small_data[0])
    ).toStrictEqual(Object.keys(small_data[0]).length);
});

test("special followed by field", () => {
    expect(
        new Query("$values.0").single(small_data[0])
    ).toStrictEqual(small_data[0]["_id"]);
});

test("testing indexing map and list", () => {
    expect(
        new Query("friends.0.name").single(small_data[0])
    ).toStrictEqual(small_data[0].friends[0].name);
});

test("test splitting string dollar amount, replacing commas, and converting to float", () => {
    expect(
        new Query('balance.$split("$").1.$replace(",", "").$float').single(small_data[0])
    ).toStrictEqual(parseFloat(small_data[0].balance.substring(1).replace(",", "")));
});

test("test getting substring dollar amount, replacing commas, and converting to float", () => {
    expect(
        new Query('balance.$range(1).$replace(",", "").$float').single(small_data[0])
    ).toStrictEqual(parseFloat(small_data[0].balance.substring(1).replace(",", "")));
});

test('test arithmatic in args', () => {
    const data = { a: 4, b: -4, c: 2.5, d: [3, 4], e: 0, pi: 3.1415926 };
    expect(
        new Query('$inject(@a / (@b + @c) - @pi)').single(data)
    ).toStrictEqual(data.a / (data.b + data.c) - data.pi);
    expect(
        new Query('$inject(@a + @b * @c ** @e)').single(data)
    ).toStrictEqual(data.a + data.b * Math.pow(data.c, data.e));
    expect(
        new Query('$inject((@a + @b) * @c ** @e)').single(data)
    ).toStrictEqual((data.a + data.b) * Math.pow(data.c, data.e));
});

test("$length of string", () => {
    expect(
        new Query('_id.$length').single(small_data[0])
    ).toStrictEqual(small_data[0]._id.length);
});

test("$length of array", () => {
    expect(
        new Query('friends.$length').single(small_data[0])
    ).toStrictEqual(small_data[0].friends.length);

    expect(
        new Query('friends.$attr("length")').single(small_data[0])
    ).toStrictEqual(small_data[0].friends.length);
});

test("$length of map", () => {
    expect(
        new Query('favoriteFruit.$length').single(small_data[0])
    ).toStrictEqual(Object.keys(small_data[0]["favoriteFruit"]).length);
});

test("$length of set", () => {
    let set = new Set([1, 2, 3]);
    expect(
        new Query('set.$length').single({set: set})
    ).toStrictEqual(set.size);
});

test('$lookup', () => {
    const data = { a: 'query', b: 'filter' };
    expect(
        new Query(`field.$lookup(${JSON.stringify(data)})`).single({ field: 'a' })
    ).toStrictEqual(data.a);
    expect(
        new Query(`field.$lookup(${JSON.stringify(data)}, 'missing')`).single({ field: 'c' })
    ).toStrictEqual('missing');
});

test('$print', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    new Query('$inject("message").$print').single({});
    expect(consoleSpy).toHaveBeenCalledWith('message');
});

test('keyword arguments', () => {
    const data = small_data[0];
    expect(
        new Query('$index("balance")').single(data)
    ).toStrictEqual(data.balance);
    expect(
        new Query('$index("nope")').single(data)
    ).toStrictEqual(null);
    expect(
        new Query('$index("nope", "nope")').single(data)
    ).toStrictEqual("nope");
    expect(
        new Query('$index("nope", fallback="nope")').single(data)
    ).toStrictEqual("nope");
    expect(
        new Query('$index("tags.0", extended=true, fallback="nope")').single(data)
    ).toStrictEqual(data.tags[0]);
    expect(
        new Query('$index("tags.0", extended=true, fallback="nope")').single(data)
    ).toStrictEqual(data.tags[0]);
})

test("$keys", () => {
    expect(
        new Query('favoriteFruit.$keys').single(small_data[0])
    ).toStrictEqual(Object.keys(small_data[0].favoriteFruit));
});

test("$values", () => {
    expect(
        new Query('favoriteFruit.$values').single(small_data[1])
    ).toStrictEqual(Object.values(small_data[1].favoriteFruit));
});

test("$items", () => {
    expect(
        new Query('favoriteFruit.$items').single(small_data[2])
    ).toStrictEqual(Object.keys(small_data[2].favoriteFruit).map(key => [key, small_data[2].favoriteFruit[key]]));
});

test("$wildcard", () => {
    let data = {
        "a": {"key": 8, "other": 8},
        "b": {"key": 4},
        "c": {"value": 5},
        "d": 0,
        "e": "daf",
        "f": null,
        "g": ["john", "susan", "carl"],
        "h": true
    };
    let Q = (q) => { return new Query(q).single(data); };

    expect(Q("$wildcard('key')")).toStrictEqual([data.a.key, data.b.key]);
    expect(Q("$wildcard('key', false)")).toStrictEqual([data.a, data.b]);
    expect(Q("$wildcard(0)")).toStrictEqual([data.e[0], data.g[0]]);
    expect(Q("$wildcard(0, false)")).toStrictEqual([data.e, data.g]);
});

test('key_of variants', () => {
    const data = {};
    for (let i=0; i<=10; i++) { data[Math.floor(Math.random() * 100)] = i; }

    let min = null;
    let max = null;
    Object.keys(data).forEach(key => {
        if (min === null || data[key] < data[min]) { min = key; }
        if (max === null || data[key] > data[max]) { max = key; }
    });

    const Q = (q) => { return new Query(q).single(data); };
    expect(Q('$key_of_max_value')).toStrictEqual(max);
    expect(Q('$key_of_max_value(just_key=false)')).toStrictEqual([max, data[max]]);
    expect(Q('$key_of_min_value')).toStrictEqual(min);
    expect(Q('$key_of_min_value(just_key=false)')).toStrictEqual([min, data[min]]);
})


test("$set", () => {
    expect(
        new Query("gender.$set.$length").single(small_data[0])
    ).toStrictEqual(small_data[0].gender.length);
});

test("$string", () => {
    expect(
        new Query("gender.$set.$length.$string").single(small_data[0])
    ).toStrictEqual(small_data[0].gender.length.toString());
});

test("$fallback", () => {
    expect(
        new Query('isActive.$fallback("NOT ACTIVE")').single(small_data[0])
    ).toStrictEqual("NOT ACTIVE");
});

test("$ternary", () => {
    expect(
        new Query('isActive.$ternary("TRUE", "FALSE")').single({isActive: false})
    ).toStrictEqual("FALSE");
});

test("$not.$ternary", () => {
    expect(
        new Query('isActive.$not.$ternary("TRUE", "FALSE")').single({isActive: false})
    ).toStrictEqual("TRUE");
});

test("$ternary strict", () => {
    expect(
        new Query('isActive.$ternary("TRUE", "FALSE", true)').single({isActive: ""})
    ).toStrictEqual("FALSE");
    expect(
        new Query('isActive.$ternary("TRUE", "FALSE", true)').single({isActive: true})
    ).toStrictEqual("TRUE");
});

test("$ternary not strict", () => {
    expect(
        new Query('isActive.$ternary("TRUE", "FALSE", false)').single({isActive: "a"})
    ).toStrictEqual("TRUE");
    expect(
        new Query('isActive.$ternary("TRUE", "FALSE", false)').single({isActive: ""})
    ).toStrictEqual("FALSE");
});

test("$parse_timestamp then $timestamp", () => {
    expect(
        new Query("t.$parse_timestamp.$timestamp").single({t: 1579967518.232})
    ).toStrictEqual(1579967518);
});

test("$parse_timestamp then $strftime default", () => {
    expect(
        new Query("t.$parse_timestamp.$strftime").single({t: 1579967518.232})
    ).toStrictEqual("2020-01-25T15:51:58Z");
});

test("$parse_timestamp then $strftime", () => {
    expect(
        new Query('t.$parse_timestamp.$strftime("MM/DD/YYYY")').single({t: 1579967518.232})
    ).toStrictEqual("01/25/2020");
});

test("$strptime", () => {
    expect(
        new Query('t.$strptime("MM/DD/YYYY").$timestamp').single({t: "01/25/2020"})
    ).toStrictEqual(1579910400);
    expect(
        new Query('t.$strptime.$call("date")').single({t: "1995-12-25"})
    ).toStrictEqual(25);

});

test("$call('date')", () => {
    expect(
        new Query('t.$strptime("MM/DD/YYYY").$call("date")').single({t: "01/25/2020"})
    ).toStrictEqual(25);
});


test('$time_part', () => {
    const dt = "2020-05-23T10:11:12.123+00:00";
    expect(new Query('$strptime.$time_part("year")').single(dt)).toStrictEqual(2020);
    expect(new Query('$strptime.$time_part("month")').single(dt)).toStrictEqual(5);
    expect(new Query('$strptime.$time_part("day")').single(dt)).toStrictEqual(23);
    expect(new Query('$strptime.$time_part("hour")').single(dt)).toStrictEqual(10);
    expect(new Query('$strptime.$time_part("minute")').single(dt)).toStrictEqual(11);
    expect(new Query('$strptime.$time_part("second")').single(dt)).toStrictEqual(12);
    expect(new Query('$strptime.$time_part("millisecond")').single(dt)).toStrictEqual(123);
    expect(new Query('$strptime.$time_part("dayOfWeek")').single(dt)).toStrictEqual(5);
    expect(new Query('$strptime.$time_part("dayOfYear")').single(dt)).toStrictEqual(144);
});

test("arithmetic", () => {
    let data = {a: 4, b: -4, c: 2.5, d: [3, 4], e: 0, pi: 3.1415926};
    expect(new Query("a.$add(2)").single(data)).toStrictEqual(6);
    expect(new Query("b.$add(4)").single(data)).toStrictEqual(0);
    expect(new Query("b.$abs").single(data)).toStrictEqual(4);
    expect(new Query("c.$subtract(-2.5)").single(data)).toStrictEqual(5.0);
    expect(new Query("a.$multiply(4)").single(data)).toStrictEqual(16);
    expect(new Query("b.$divide(2)").single(data)).toStrictEqual(-2.0);
    expect(new Query("a.$pow(2)").single(data)).toStrictEqual(16.0);
    expect(new Query("b.$pow(2)").single(data)).toStrictEqual(16.0);
    expect(new Query("d.$distance([0, 0])").single(data)).toStrictEqual(5.0);
    expect(new Query('e.$math("cos")').single(data)).toStrictEqual(1.0);
    expect(new Query("a.$math('min', 3, 6)").single(data)).toStrictEqual(3);
    expect(new Query("a.$math('min', @b, @e)").single(data)).toStrictEqual(data.b);
    expect(new Query('pi.$round').single(data)).toStrictEqual("3.14");
    expect(new Query('pi.$round(4)').single(data)).toStrictEqual("3.1416");
});

test('$arith', () => {
    const data = {"a": 4, "b": -4, "c": 2.5, "d": [3, 4], "e": 0, "pi": 3.1415926};
    expect(new Query('a.$arith("+", @b + @c)').single(data)).toStrictEqual(data.a + data.b + data.c);
    expect(new Query('a.$arith("+", @b - @c)').single(data)).toStrictEqual(data.a + data.b - data.c);
    expect(new Query('a.$arith("+", @b * @c)').single(data)).toStrictEqual(data.a + data.b * data.c);
    expect(new Query('a.$arith("+", @b / @c)').single(data)).toStrictEqual(data.a + data.b / data.c);
    expect(new Query('a.$arith("+", @b ** @c)').single(data)).toStrictEqual(data.a + Math.pow(data.b ,data.c));
    expect(new Query('a.$arith("+", @b // @c)').single(data)).toStrictEqual(data.a + Math.floor(data.b / data.c));
    expect(new Query('a.$arith("+", @b % @c)').single(data)).toStrictEqual(data.a + data.b % data.c);
});

test('min & max', () => {
    const data = [];
    for (let i=0; i<100; i++) { data.push(Math.floor(Math.random() * 100)); }
    expect(new Query('$min').single(data)).toStrictEqual(Math.min(...data));
    expect(new Query('$max').single(data)).toStrictEqual(Math.max(...data));
});

test("strings", () => {
    expect(
        new Query('age.$prefix("Age: ")').single(small_data[0])
    ).toStrictEqual(`Age: ${small_data[0]['age']}`);

    expect(
        new Query('tags.$length.$suffix(" tags found")').single(small_data[0])
    ).toStrictEqual(`${small_data[0]['tags'].length} tags found`);

    expect(
        new Query("a.$strip").single({"a": "     test            "})
    ).toStrictEqual("test");

    expect(
        new Query('balance.$replace(",", "")').single(small_data[10])
    ).toStrictEqual(small_data[10]["balance"].replace(",", ""))

    expect(
        new Query("about.$trim").single(small_data[0])
    ).toStrictEqual(small_data[0]["about"].substring(0, 47) + "...");

    expect(
        new Query("about.$trim").single({about: "short"})
    ).toStrictEqual("short");

    expect(
        new Query('about.$trim(25, "")').single(small_data[0])
    ).toStrictEqual(small_data[0]["about"].substring(0, 25));

    let data = "test 1";
    expect(
        new Query('test.$split').single({test: data})
    ).toStrictEqual(data.split(" "));

    expect(
        new Query('guid.$split("-")').single(small_data[0])
    ).toStrictEqual(small_data[0]["guid"].split("-"));
});

test('string cases', () => {
    const item = "here IS sOmEtHiNg";
    expect(new Query('$uppercase').single(item)).toStrictEqual('HERE IS SOMETHING');
    expect(new Query('$lowercase').single(item)).toStrictEqual('here is something');
    expect(new Query('$titlecase').single(item)).toStrictEqual('Here Is Something');
});

test("list", () => {
    let data = {a: [43.2, -34, 54.2], b: {c: 4}, c: null};
    expect(
        new Query("a.$sum").single(data)
    ).toStrictEqual(data.a[0] + data.a[1] + data.a[2]);

    expect(
        new Query("a.$join").single(data)
    ).toStrictEqual(data.a.join(", "));

    expect(
        new Query("$join_arg(@a)").single(data)
    ).toStrictEqual(data.a.join(", "));

    expect(
        new Query("a.$index(2)").single(data)
    ).toStrictEqual(data.a[2]);

    expect(
        new Query("a.$index(4, 'nope')").single(data)
    ).toStrictEqual('nope');

    expect(
        new Query("c.$index(2, 'nada')").single(data)
    ).toStrictEqual('nada');

    expect(
        new Query('b.$index("c")').single(data)
    ).toStrictEqual(data.b.c);

    expect(
        new Query("a.$range(1)").single(data)
    ).toStrictEqual(data.a.slice(1));

    expect(
        new Query("a.$range(0, 2)").single(data)
    ).toStrictEqual(data.a.slice(0, 2));

    expect(
        new Query("a.$range(1, -1)").single(data)
    ).toStrictEqual([data.a[1], data.a[2]]);
});

test("$value_map", () => {
    const data = { a: [1, 2, 3], b: [1, 2], c: [3, 5, 3], d: [1, 2, 5, 3, 4] };
    expect(new Query("$value_map('length').$values").single(data)).toStrictEqual(
        Object.keys(data).map(key => data[key].length)
    );
});

test("$map and several more", () => {
    expect(
        new Query('friends.$map("values").$map("join", ": ").$join("\n")').single(small_data[0])
    ).toStrictEqual(
        small_data[0].friends.map(item => `${item.id}: ${item.name}`).join("\n")
    );
});

test("empty field", () => {
    expect(
        new Query("").single(small_data[0])
    ).toStrictEqual(small_data[0]);
});

test("register special", () => {
    expect(
        Query.register_special("cube", (value) => Math.pow(value, 3))
    ).toStrictEqual(true);

    expect(
        new Query("a.$cube").single({a: 2})
    ).toStrictEqual(8);

    expect(
        Query.register_special("cube", (value) => Math.pow(value, 3))
    ).toStrictEqual(false);
});

test("complex argument", () => {
    expect(
        new Query("a.$distance([0, 0])").single({a: [3, 4]})
    ).toStrictEqual(5);
});

test("nested query", () => {
    let params = {
        "index": "name",
        "origin": [0, 0],
        "name": small_data[0]["name"],
        "company": small_data[0]["company"],
        "lookup": {
            [small_data[0]["name"]]: small_data[0]["company"]
        }
    };

    expect(
        new Query("data.friends.$map('index', @params.index)").single({data: small_data[0], params: params})
    ).toStrictEqual(small_data[0].friends.map(f => f.name));

    let lat = small_data[0].latitude;
    let lon = small_data[0].longitude;
    expect(
        new Query("params.origin.$distance([@data.latitude, @data.longitude]).$round").single({
            data: small_data[0], params: params
        })
    ).toStrictEqual(Math.sqrt(
        Math.pow(params.origin[0]-lat, 2) + Math.pow(params.origin[1]-lon, 2)
    ).toFixed(2));

    expect(
        new Query("data.name.$lookup(@params.lookup)").single({"data": small_data[0], "params": params})
    ).toStrictEqual(params.lookup[small_data[0].name]);

    expect(
        new Query("data.name.$lookup({@params.name: @params.company})").single(
            {"data": small_data[0], "params": params}
        )
    ).toStrictEqual(params.lookup[small_data[0].name]);

    expect(
        new Query('latitude.$wrap("Lat=", @longitude.$prefix(" & Lon="))').single(small_data[0])
    ).toStrictEqual(`Lat=${small_data[0].latitude} & Lon=${small_data[0].longitude}`);
});

test("tripled nested", () => {
    const data = {
        data: "test",

        keys: {
            key1: "data"
        },

        key1: "key1"
    };

    expect(
        new Query("$index(@keys.$index(@key1))").single(data)
    ).toStrictEqual(data.data);
});

test("inject", () => {
    let Q = (q) => { return new Query(q).single({}); };
    
    expect(Q("$inject(3)")).toStrictEqual(3);
    expect(Q("$inject(3.14)")).toStrictEqual(3.14);
    expect(Q("$inject(true)")).toStrictEqual(true);
    expect(Q("$inject(false)")).toStrictEqual(false);
    expect(Q("$inject(null)")).toStrictEqual(null);
    expect(Q("$inject('null')")).toStrictEqual('null');
    expect(Q('$inject("null")')).toStrictEqual('null');

    expect(Q('$inject([])')).toStrictEqual([]);
    expect(Q('$inject([1, "2"])')).toStrictEqual([1, "2"]);
    expect(Q('$inject({1, "2"})')).toStrictEqual(new Set([1, "2"]));
    expect(Q('$inject({"bob": "rick"})')).toStrictEqual({bob: "rick"});

    expect(Q('$inject([{"bob": "rick"}, false])')).toStrictEqual([{bob: "rick"}, false]);
});

test("remove_nulls", () => {
    expect(
        new Query("$remove_nulls").single([1, null, "true", undefined])
    ).toStrictEqual([1, "true"]);

    expect(
        new Query("$remove_nulls").single([1, "true"])
    ).toStrictEqual([1, "true"]);
});

test("no query", () => {
    expect(
        new Query("").single({})
    ).toStrictEqual({});

    expect(
        new Query("@invalid", 'nope').single({})
    ).toStrictEqual('nope');
});

test('null field', () => {
    expect(
        new Query('n.a', 'nope').single({n: null})
    ).toStrictEqual('nope');
});

test('valid names', () => {
    let keys = ["_", "-", "23", "123asdf", "bill_1234_asdf-24234"];
    let value = [1, 2];

    keys.forEach(key => {
        expect(
            new Query(key).single({[key]: value})
        ).toStrictEqual(value);
    })
});

test('missing fields', () => {
    expect(
        new Query("a").single({b: [1, 2]})
    ).toStrictEqual(null);

    expect(
        new Query("b.3").single({b: [1, 2]})
    ).toStrictEqual(null);

    expect(
        new Query("b.3", "MISSING").single({b: [1, 2]})
    ).toStrictEqual("MISSING");

    expect(
        new Query("b.2.$fallback(4).$divide(2)").single({b: [1, 2]})
    ).toStrictEqual(2.0);

    expect(
        new Query("b.1.$fallback(4).$divide(2)").single({b: [1, 6]})
    ).toStrictEqual(3.0);
});

test('store as int', () => {
    const raw = {value: 5};
    expect(
        new Query("value.$store_as('temp').$inject(@temp)").single(raw)
    ).toStrictEqual(raw.value);
});

test('store as dict', () => {
    const store = {field: "value"};
    expect(
        new Query("$inject({'field': 'value'}).$store_as('temp').$inject(@temp)").single(store)
    ).toStrictEqual(store);
});

test('store as with later use', () => {
    const d = small_data[0];
    expect(
        new Query(
            "greeting.$split('You have ').1.$split(' unread').0.$int.$store_as('unread')" +
            ".$join_arg([@name, 'is', @age, 'and has', @unread, 'messages'], ' ')"
        ).single(small_data[0])
    ).toStrictEqual(
        `${d.name} is ${d.age} and has 5 messages`
    );
});

test('group by flat', () => {
    const l = [];
    const val = {};
    for (let i = 0; i < 12; i += 1) {
        l.push(i % 3);

        if (val[i % 3] !== undefined) {
            val[i % 3].push(i % 3);
        } else {
            val[i % 3] = [i % 3];
        }
    }

    expect(
        new Query("$group_by").single(l)
    ).toStrictEqual(val);
});

test('group by number', () => {
    const data = Array(10).fill(0).map((_, index) => [index, index]);
    const val = {};
    data.forEach(pair => val[pair[0]] = [pair]);

    expect(new Query('$group_by(0)').single(data)).toStrictEqual(val);
});

test('group by nested', () => {
    const val = {};
    small_data.forEach(item => {
        const v = item.favoriteFruit.apple.toFixed(1);
        if (val[v] === undefined) {
            val[v] = [item];
        } else {
            val[v].push(item);
        }
    });

    expect(
        new Query("$group_by('favoriteFruit.apple.$round(1)')").single(small_data)
    ).toStrictEqual(val);
});

test('group by nested count', () => {
    const val = {};
    small_data.forEach(item => {
        const v = item.favoriteFruit.apple.toFixed(1);
        if (val[v] === undefined) {
            val[v] = 1;
        } else {
            val[v] += 1;
        }
    });

    expect(
        new Query("$group_by('favoriteFruit.apple.$round(1)', true)").single(small_data)
    ).toStrictEqual(val);
});

test('sort flat', () => {
    const items = [];
    for (let i = 0; i < 10; i++) {
        items.push(Math.floor(Math.random() * 100));
    }
    
    const result = new Query('$sort').single(items);
    items.sort((a, b) => {
        return a - b;
    });
    expect(
        result
    ).toStrictEqual(items);
});

test('sort number', () => {
    const items = [];
    for (let i = 0; i < 10; i++) {
        items.push([Math.floor(Math.random() * 100), i]);
    }

    const copy = [...items];
    expect(new Query('$sort(0)').single(items)).toStrictEqual(
        copy.sort((a, b) => a[0] - b[0])
    );
}); 

test('sort age', () => {    
    expect(
        new Query('$sort("age")').single(small_data)
    ).toStrictEqual(small_data.map(item => item).sort((a, b) => {
        return (a.age < b.age) ? -1 : 1
    }));
});

test('sort nested', () => {    
    expect(
        new Query("$sort('favoriteFruit.banana.$multiply(-0.5)')").single(small_data)
    ).toStrictEqual(small_data.map(item => item).sort((a, b) => {
        return (a.favoriteFruit.banana * -0.5 < b.favoriteFruit.banana * -0.5) ? -1 : 1;
    }));
});

test('sort nested reverse', () => {    
    expect(
        new Query("$sort('favoriteFruit.banana.$multiply(-0.5)', true)").single(small_data)
    ).toStrictEqual(small_data.map(item => item).sort((a, b) => {
        return (a.favoriteFruit.banana * -0.5 < b.favoriteFruit.banana * -0.5) ? 1 : -1;
    }));
});

test('special not found error', () => {
    expect(() => {
        new Query("age.$mixedup").single(small_data[0])
    }).toThrow(SpecialNotFoundError);
});

test('dict from items', () => {
    expect(
        new Query('favoriteFruit.$items.$dict').single(small_data[0])
    ).toStrictEqual(small_data[0].favoriteFruit);
});

test('context', () => {
    expect(
        new Query('context').single({}, { context: 5 })
    ).toStrictEqual(5);

    expect(
        new Query('context.nested').single({}, { context: { nested: 5 } })
    ).toStrictEqual(5);

    expect(
        new Query('overlapping').single({ overlapping: 5 }, { overlapping: "nope" })
    ).toStrictEqual(5);
});

test('$pipeline', () => {
    const min = Math.min(...small_data.map(item => {
        return parseFloat(item['balance'].slice(1).replace(',', ''))
    }));
    expect(new Query(`
        $map(
            'pipeline',
            [
                [ 'index', 'balance' ],
                [ 'range', 1 ],
                [ 'replace', { 'old': ',', 'new': '' } ],
                'float'
            ]
        ).$min
    `).single(small_data)).toStrictEqual(min);
});

test('bad query', () => {
    expect(new Query('$length(4*)').single({})).toStrictEqual(null);
});

test('field after special', () => {
    const data = { a: { b: 35 } };
    expect(new Query('a.$values.0').single(data)).toStrictEqual(data.a.b);
});

test('make object special', () => {
    Query.register_special('makeObject', (value, context, args) => {
        const object = {...args.$kwargs};
        args.$args.forEach((arg, index) => {
            object[index] = arg;
        });
        return object;
    }, ['$args', '$kwargs']);

    expect(new Query('$makeObject(true, false, null, 3, bob="chill", jill=[1, 2])').single({})).toStrictEqual({
        0: true,
        1: false,
        2: null,
        3: 3,
        bob: 'chill',
        jill: [1, 2]
    });
});

test('filter special', () => {
    expect(
        new Query('$filter("latitude", "<", { "query": "longitude" }, single=false)').single(small_data)
    ).toStrictEqual(new Filter(Key('latitude').lt(Key('longitude'))).many(small_data));

    // expect(
    //     new Query('$filter({ "field": "latitude", "operator": "<", "value": { "query": "longitude" }}, single=false)').single(small_data)
    // ).toStrictEqual(new Filter(Key('latitude').lt(Key('longitude'))).many(small_data));

    // expect(
    //     new Query('$filter([{ "field": "latitude", "operator": "<", "value": { "query": "longitude" }}], single=false)').single(small_data)
    // ).toStrictEqual(new Filter(Key('latitude').lt(Key('longitude'))).many(small_data));

    // expect(
    //     new Query('$filter([{ "field": "latitude", "operator": "<", "value": { "query": "longitude" }}])').single(small_data[1])
    // ).toStrictEqual(new Filter(Key('latitude').lt(Key('longitude'))).single(small_data[1]));
});
