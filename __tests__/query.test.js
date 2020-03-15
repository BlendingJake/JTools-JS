import { Query } from "../dist";
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
    ).toStrictEqual(1579928400);
    expect(
        new Query('t.$strptime.$call("date")').single({t: "1995-12-25"})
    ).toStrictEqual(25);

});

test("$call('date')", () => {
    expect(
        new Query('t.$strptime("MM/DD/YYYY").$call("date")').single({t: "01/25/2020"})
    ).toStrictEqual(25);
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
    expect(new Query('pi.$round').single(data)).toStrictEqual("3.14");
    expect(new Query('pi.$round(4)').single(data)).toStrictEqual("3.1416");
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

test("list", () => {
    let data = {a: [43.2, -34, 54.2], b: {c: 4}, c: null};
    expect(
        new Query("a.$sum").single(data)
    ).toStrictEqual(data.a[0] + data.a[1] + data.a[2]);

    expect(
        new Query("a.$join").single(data)
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

test("$map and several more", () => {
    expect(
        new Query('friends.$map("values").$map("join", ": ").$join("\n")').single(small_data[0])
    ).toStrictEqual(
        small_data[0].friends.map(item => `${item.id}: ${item.name}`).join("\n")
    );
});

test("empty field", () => {
    expect(
        new Query("", "MISSING").single(small_data[0])
    ).toStrictEqual("MISSING");
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

test("wildcard", () => {
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
        new Query("", 'nope').single({})
    ).toStrictEqual('nope');

    expect(
        new Query("@invalid", 'nope').single({})
    ).toStrictEqual('nope');
});

test('null field', () => {
    expect(
        new Query('n.a', 'nope').single({n: null})
    ).toStrictEqual('nope');
});