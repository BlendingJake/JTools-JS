import { Getter } from "../jtools";
import moment from "moment";
let small_data = require("./data/20.json");

test(".single() for single field", () => {
    expect(
        new Getter("guid").single(small_data[0])
    ).toStrictEqual(small_data[0].guid);
});

test(".single() for capital field", () => {
    let data = {outer: {INNER: "test"}};
    expect(
        new Getter("outer.INNER").single(data)
    ).toStrictEqual(data.outer.INNER);
});

test(".single() for single missing field", () => {
    expect(
        new Getter("null", "MISSING").single(small_data[0])
    ).toStrictEqual("MISSING");
});

test(".many() for single missing field", () => {
    expect(
        new Getter("null", "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual(["MISSING", "MISSING", "MISSING"]);
});

test(".single() for many missing fields", () => {
    expect(
        new Getter(["null", "missing"], "MISSING").single(small_data[0])
    ).toStrictEqual(["MISSING", "MISSING"]);
});

test(".many() for many missing fields", () => {
    expect(
        new Getter(["null", "missing"], "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual([["MISSING", "MISSING"], ["MISSING", "MISSING"], ["MISSING", "MISSING"]]);
});

test(".single() for multiple fields, one of which is missing", () => {
    expect(
        new Getter(["isactive", "balance"], "MISSING").single(small_data[0])
    ).toStrictEqual( ["MISSING", small_data[0].balance]);
});

test(".many() for multiple fields, one of which is missing", () => {
    expect(
        new Getter(["isactive", "balance"], "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual(small_data.slice(0, 3).map(item => { return ["MISSING", item.balance]; }));
});

test(".single() for missing nested field", () => {
    expect(
        new Getter("null.null", "MISSING").single(small_data[1])
    ).toStrictEqual("MISSING");
});

test(".many() for missing nested field", () => {
    expect(
        new Getter("null.null", "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual(["MISSING", "MISSING", "MISSING"]);
});

test(".many() for single field", () => {
    expect(
        new Getter("age", "MISSING").many(small_data.slice(0, 3))
    ).toStrictEqual(small_data.slice(0, 3).map(item => item.age));
});

test(".many() for many fields", () => {
    expect(
        new Getter(["eyeColor", "gender"], "MISSING").many(small_data.slice(1, 3))
    ).toStrictEqual(small_data.slice(1, 3).map(item => [item.eyeColor, item.gender]));
});

test(".single() for many fields", () => {
    expect(
        new Getter(["age", "email"], "MISSING").single(small_data[0])
    ).toStrictEqual([small_data[0].age, small_data[0].email]);
});

test("starting with special keys", () => {
    expect(
        new Getter("$keys.$length", "MISSING").single(small_data[0])
    ).toStrictEqual(Object.keys(small_data[0]).length);
});

test("special followed by field", () => {
    expect(
        new Getter("$values.0").single(small_data[0])
    ).toStrictEqual(small_data[0]["_id"]);
});

test("testing indexing map and list", () => {
    expect(
        new Getter("friends.0.name").single(small_data[0])
    ).toStrictEqual(small_data[0].friends[0].name);
});

test("test splitting string dollar amount, replacing commas, and converting to float", () => {
    expect(
        new Getter('balance.$split("$").1.$replace(",", "").$float').single(small_data[0])
    ).toStrictEqual(parseFloat(small_data[0].balance.substring(1).replace(",", "")));
});

test("test getting substring dollar amount, replacing commas, and converting to float", () => {
    expect(
        new Getter('balance.$range(1).$replace(",", "").$float').single(small_data[0])
    ).toStrictEqual(parseFloat(small_data[0].balance.substring(1).replace(",", "")));
});

test("$length of string", () => {
    expect(
        new Getter('_id.$length').single(small_data[0])
    ).toStrictEqual(small_data[0]._id.length);
});

test("$length of array", () => {
    expect(
        new Getter('friends.$length').single(small_data[0])
    ).toStrictEqual(small_data[0].friends.length);
});

test("$length of map", () => {
    expect(
        new Getter('favoriteFruit.$length').single(small_data[0])
    ).toStrictEqual(Object.keys(small_data[0]["favoriteFruit"]).length);
});

test("$keys", () => {
    expect(
        new Getter('favoriteFruit.$keys').single(small_data[0])
    ).toStrictEqual(Object.keys(small_data[0].favoriteFruit));
});

test("$values", () => {
    expect(
        new Getter('favoriteFruit.$values').single(small_data[1])
    ).toStrictEqual(Object.values(small_data[1].favoriteFruit));
});

test("$items", () => {
    expect(
        new Getter('favoriteFruit.$items').single(small_data[2])
    ).toStrictEqual(Object.keys(small_data[2].favoriteFruit).map(key => [key, small_data[2].favoriteFruit[key]]));
});

test("$fallback", () => {
    expect(
        new Getter('isActive.$fallback("NOT ACTIVE")').single(small_data[0])
    ).toStrictEqual("NOT ACTIVE");
});

test("$ternary", () => {
    expect(
        new Getter('isActive.$ternary("TRUE", "FALSE")').single(small_data[0])
    ).toStrictEqual("FALSE");
});

test("$not.$ternary", () => {
    expect(
        new Getter('isActive.$not.$ternary("TRUE", "FALSE")').single(small_data[0])
    ).toStrictEqual("TRUE");
});

test("$ternary strict", () => {
    expect(
        new Getter('index.$ternary("TRUE", "FALSE", true)').single(small_data[1])
    ).toStrictEqual("FALSE");
});

test("$ternary not strict", () => {
    expect(
        new Getter('index.$ternary("TRUE", "FALSE", false)').single(small_data[1])
    ).toStrictEqual("TRUE");
});

test("$parse_timestamp then $timestamp", () => {
    expect(
        new Getter("t.$parse_timestamp.$timestamp").single({t: 1579967518.232})
    ).toStrictEqual(1579967518);
});

test("$parse_timestamp then $strftime default", () => {
    expect(
        new Getter("t.$parse_timestamp.$strftime").single({t: 1579967518.232})
    ).toStrictEqual("2020-01-25T15:51:58Z");
});

test("$parse_timestamp then $strftime", () => {
    expect(
        new Getter('t.$parse_timestamp.$strftime("MM/DD/YYYY")').single({t: 1579967518.232})
    ).toStrictEqual("01/25/2020");
});

test("$strptime then $timestamp", () => {
    expect(
        new Getter('t.$strptime("MM/DD/YYYY").$timestamp').single({t: "01/25/2020"})
    ).toStrictEqual(1579928400);
});

test("datetime('day')", () => {
    expect(
        new Getter('t.$strptime("MM/DD/YYYY").$datetime("date")').single({t: "01/25/2020"})
    ).toStrictEqual(25);
});

test("arithmetic", () => {
    let data = {a: 4, b: -4, c: 2.5, d: [3, 4], e: 0, pi: 3.1415926};
    expect(new Getter("a.$add(2)").single(data)).toStrictEqual(6);
    expect(new Getter("b.$add(4)").single(data)).toStrictEqual(0);
    expect(new Getter("b.$abs").single(data)).toStrictEqual(4);
    expect(new Getter("c.$subtract(-2.5)").single(data)).toStrictEqual(5.0);
    expect(new Getter("a.$multiply(4)").single(data)).toStrictEqual(16);
    expect(new Getter("b.$divide(2)").single(data)).toStrictEqual(-2.0);
    expect(new Getter("a.$pow(2)").single(data)).toStrictEqual(16.0);
    expect(new Getter("b.$pow(2)").single(data)).toStrictEqual(16.0);
    expect(new Getter("d.$distance([0, 0])").single(data)).toStrictEqual(5.0);
    expect(new Getter('e.$math("cos")').single(data)).toStrictEqual(1.0);
    expect(new Getter('pi.$round').single(data)).toStrictEqual("3.14");
    expect(new Getter('pi.$round(4)').single(data)).toStrictEqual("3.1416");
});

test("strings", () => {
    expect(
        new Getter('age.$prefix("Age: ")').single(small_data[0])
    ).toStrictEqual(`Age: ${small_data[0]['age']}`);

    expect(
        new Getter('tags.$length.$suffix(" tags found")').single(small_data[0])
    ).toStrictEqual(`${small_data[0]['tags'].length} tags found`);

    expect(
        new Getter("a.$strip").single({"a": "     test            "})
    ).toStrictEqual("test");

    expect(
        new Getter('balance.$replace(",", "")').single(small_data[10])
    ).toStrictEqual(small_data[10]["balance"].replace(",", ""))

    expect(
        new Getter("about.$trim").single(small_data[0])
    ).toStrictEqual(small_data[0]["about"].substring(0, 47) + "...");

    expect(
        new Getter('about.$trim(25, "")').single(small_data[0])
    ).toStrictEqual(small_data[0]["about"].substring(0, 25));

    expect(
        new Getter('guid.$split("-")').single(small_data[0])
    ).toStrictEqual(small_data[0]["guid"].split("-"));
});

test("list", () => {
    let data = {a: [43.2, -34, 54.2]};
    expect(
        new Getter("a.$sum").single(data)
    ).toStrictEqual(data.a[0] + data.a[1] + data.a[2]);

    expect(
        new Getter("a.$join").single(data)
    ).toStrictEqual(data.a.join(", "));

    expect(
        new Getter("a.$index(2)").single(data)
    ).toStrictEqual(data.a[2]);

    expect(
        new Getter("a.$range(1)").single(data)
    ).toStrictEqual(data.a.slice(1));

    expect(
        new Getter("a.$range(1, -1)").single(data)
    ).toStrictEqual([data.a[1], data.a[2]]);
});

test("$map and several more", () => {
    expect(
        new Getter('friends.$map("values").$map("join", ": ").$join("\\n")').single(small_data[0])
    ).toStrictEqual(
        small_data[0].friends.map(item => `${item.id}: ${item.name}`).join("\n")
    );
});

// test("register special", () => {
//     Getter.register_special("cube", (value) => Math.pow(value, 3));
//     expect(
//         new Getter("a.$cube").single({a: 2})
//     ).toStrictEqual(8);
// });
