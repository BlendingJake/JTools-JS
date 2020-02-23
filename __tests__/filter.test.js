import { Filter, Key } from "../dist";
let small_data = require("./data/20.json");

test("test nested", () => {
    let items = new Filter(Key("friends.0.name").eq("Webster Green")).many(small_data);
    expect(items.length).toStrictEqual(1);
    expect(items[0]._id).toStrictEqual("5e2797c05aa0585816ce8b8c");
});

test("test eye color", () => {
    let items = new Filter(Key("eyeColor").eq("brown")).many(small_data);
    expect(items.length).toStrictEqual(6);
});

test("test eye color - raw filters", () => {
    let items = new Filter([{field: "eyeColor", operator: "==", value: "brown"}]).many(small_data);
    expect(items.length).toStrictEqual(6);
});

test("test split convert", () => {
    let items = new Filter(Key('balance.$range(1).$replace(",", "").$float').gt(3800)).many(small_data);
    let not_items = new Filter(Key('balance.$range(1).$replace(",", "").$float').lt(3800)).many(small_data);
    expect(items.length).toStrictEqual(2);
    expect(not_items.length).toStrictEqual(18);
});

test("test nested map", () => {
    let items = new Filter(Key("favoriteFruit.strawberry").eq(0.4242)).many(small_data);
    expect(items.length).toStrictEqual(1);
    expect(items[0]._id).toStrictEqual("5e2797c0efc296e33c198e4c");
});

test("test or", () => {
    let items = new Filter(
        Key("address").contains("Texas").or_(
            Key("address").contains("West Virginia")
        )).many(small_data);
    expect(items.length).toStrictEqual(2);
});

test("test or + and", () => {
    let items = new Filter(
        Key("address").contains("Texas").or_(
            Key("address").contains("West Virginia")
        ).and_(
            Key("company").eq("XYLAR")
        )).many(small_data);
    expect(items.length).toStrictEqual(1);
    expect(items[0]._id).toStrictEqual("5e2797c05aa0585816ce8b8c");
});

test("test basic not", () => {
    let items = new Filter(Key("company").eq("XYLAR").not_()).many(small_data);
    expect(items.length).toStrictEqual(small_data.length - 1);
});

test("test not + or", () => {
    let items = new Filter(
        Key("address").contains("Texas").or_(
            Key("address").contains("West Virginia")
        ).not_()).many(small_data);
    expect(items.length).toStrictEqual(small_data.length - 2);
});

test("test filtering on datetime specials", () => {
    let items = new Filter(Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$strftime("YYYY").$int').gte(2017)).many(small_data);
    let items2 = new Filter(Key('registered.$split("-").0.$int').gt(2017)).many(small_data);
    let items3 = new Filter(Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$call("year")').gte(2016)).many(small_data);

    expect(items.length).toStrictEqual(9);
    expect(items2.length).toStrictEqual(6);
    expect(items3.length).toStrictEqual(13);
});

test("test interval", () => {
    let key = Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$call("year")');
    let items = new Filter(key.interval([2016, 2017])).many(small_data);
    let items2 = new Filter(
        key.gte(2016).and_(key.lte(2017))
    ).many(small_data);

    expect(items.length).toStrictEqual(7);
    expect(items2.length).toStrictEqual(items.length);
});

test("test not interval", () => {
    let key = Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$call("year")');
    let items = new Filter(key.not_interval([2016, 2017])).many(small_data);
    let items2 = new Filter(
        key.lt(2016).or_(key.gt(2017))
    ).many(small_data);

    expect(items.length).toStrictEqual(13);
    expect(items2.length).toStrictEqual(items.length);
});

test("test set with membership operators", () => {
    let data = {
        container: new Set([1, 2, 3]),
        value: 3
    };

    // contains T/F
    expect(
        new Filter(Key("container").contains(2)).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("container").contains(4)).single(data)
    ).toStrictEqual(false);

    // !contains T/F
    expect(
        new Filter(Key("container").not_contains(2)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("container").not_contains(4)).single(data)
    ).toStrictEqual(true);

    // in T/F
    expect(
        new Filter(Key("value").in_(new Set([1, 2, 3]))).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("value").in_(new Set([1, 2]))).single(data)
    ).toStrictEqual(false);

    // !in T/F
    expect(
        new Filter(Key("value").nin(new Set([1, 2, 3]))).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("value").nin(new Set([1, 2]))).single(data)
    ).toStrictEqual(true);
});

test("test array with membership operators", () => {
    let data = {
        container: [1, 2, 3],
        value: 3
    };

    // contains T/F
    expect(
        new Filter(Key("container").contains(2)).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("container").contains(4)).single(data)
    ).toStrictEqual(false);

    // !contains T/F
    expect(
        new Filter(Key("container").not_contains(2)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("container").not_contains(4)).single(data)
    ).toStrictEqual(true);

    // in T/F
    expect(
        new Filter(Key("value").in_([1, 2, 3])).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("value").in_([1, 2])).single(data)
    ).toStrictEqual(false);

    // !in T/F
    expect(
        new Filter(Key("value").nin([1, 2, 3])).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("value").nin([1, 2])).single(data)
    ).toStrictEqual(true);
});

test("test string with membership operators", () => {
    let data = {
        container: "123",
        value: 3
    };

    // contains T/F
    expect(
        new Filter(Key("container").contains(2)).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("container").contains(4)).single(data)
    ).toStrictEqual(false);

    // !contains T/F
    expect(
        new Filter(Key("container").not_contains(2)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("container").not_contains(4)).single(data)
    ).toStrictEqual(true);

    // in T/F
    expect(
        new Filter(Key("value").in_("123")).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("value").in_("12")).single(data)
    ).toStrictEqual(false);

    // !in T/F
    expect(
        new Filter(Key("value").nin("123")).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("value").nin("12")).single(data)
    ).toStrictEqual(true);
});

test("test associative array with membership operators", () => {
    let data = {
        container: {1: 1, 2: 2, 3: 3},
        value: 3
    };

    // contains T/F
    expect(
        new Filter(Key("container").contains(2)).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("container").contains(4)).single(data)
    ).toStrictEqual(false);

    // !contains T/F
    expect(
        new Filter(Key("container").not_contains(2)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("container").not_contains(4)).single(data)
    ).toStrictEqual(true);

    // in T/F
    expect(
        new Filter(Key("value").in_({1: 1, 2: 2, 3: 3})).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("value").in_({1: 1, 2: 2})).single(data)
    ).toStrictEqual(false);

    // !in T/F
    expect(
        new Filter(Key("value").nin({1: 1, 2: 2, 3: 3})).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("value").nin({1: 1, 2: 2})).single(data)
    ).toStrictEqual(true);
});

test("test strict vs not strict equality checking", () => {
    let data = {
        num_value: 1,
        str_value: "1"
    };

    expect(
        new Filter(Key("num_value").eq("1")).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("num_value").seq("1")).single(data)
    ).toStrictEqual(false);

    expect(
        new Filter(Key("str_value").ne(1)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("str_value").sne(1)).single(data)
    ).toStrictEqual(true);
});

test("test startswith + endswith", () => {
    let items = new Filter(Key("address").startswith("6")).many(small_data);
    expect(items.length).toStrictEqual(2);

    let items2 = new Filter(Key("registered").endswith("+04:00")).many(small_data);
    expect(items2.length).toStrictEqual(15);
});

test("test present + !present", () => {
    let data = {
        present: 5,
        nested_present: {
            present: 5
        }
    };

    expect(
        new Filter(Key("present").present()).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("not_present").present()).single(data)
    ).toStrictEqual(false);

    expect(
        new Filter(Key("present").not_present()).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("not_present").not_present()).single(data)
    ).toStrictEqual(true);

    expect(
        new Filter(Key("nested_present.present").present()).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("nested_present.not_present").present()).single(data)
    ).toStrictEqual(false);

    expect(
        new Filter(Key("nested_present.present").not_present()).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("nested_present.not_present").not_present()).single(data)
    ).toStrictEqual(true);
});